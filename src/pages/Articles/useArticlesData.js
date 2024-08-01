import React, { createContext, useContext, useState, useEffect } from 'react';
import { db, ID, client } from '../../db/config'; 

const databaseId = '666aff03003ba124b787';
const articlesCollectionId = '666b0186000007f47da9';

const ArticlesDataContext = createContext();

export const useArticlesData = () => {
    const context = useContext(ArticlesDataContext);
    if (!context) {
        throw new Error('useArticlesData must be used within an ArticlesDataProvider');
    }
    return context;
};

export const ArticlesDataProvider = ({ children }) => {
    const [articleData, setArticleData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

   
        const fetchArticles = async () => {
            setLoading(true);
            try {
                const response = await db.listDocuments(databaseId, articlesCollectionId);
                setArticleData(response.documents);
            } catch (err) {
                setError(err);
            } finally {
                setLoading(false);
            }
        };
 useEffect(() => {
        fetchArticles();

        const articlesSubscription = client.subscribe(`databases.${databaseId}.collections.${articlesCollectionId}.documents`, (response) => {
            const { events, payload } = response;

            if (events.includes('databases.*.collections.*.documents.*.create')) {
                setArticleData(prevData => {
                    if (prevData.find(article => article.$id === payload.$id)) {
                        return prevData;
                    }
                    return [...prevData, payload];
                });
            }

            if (events.includes('databases.*.collections.*.documents.*.update')) {
                setArticleData(prevData => prevData.map(article => article.$id === payload.$id ? payload : article));
            }

            if (events.includes('databases.*.collections.*.documents.*.delete')) {
                setArticleData(prevData => prevData.filter(article => article.$id !== payload.$id));
            }
        });

        return () => {
            if (articlesSubscription) {
                articlesSubscription();
            }
        };
    }, []);

    const addArticle = async (newArticle) => {
        try {
            await db.createDocument(databaseId, articlesCollectionId, ID.unique(), newArticle);
        } catch (err) {
            setError(err);
            throw err;
        }
    };

    const updateViews = async (articleId) => {
        try {
            const articleToUpdate = articleData.find(article => article.$id === articleId);
            if (!articleToUpdate) {
                throw new Error('Article not found');
            }

            const updatedArticle = {
                ...articleToUpdate,
                views: (articleToUpdate.views || 0) + 1
            };

            await db.updateDocument(databaseId, articlesCollectionId, articleId, {
                views: updatedArticle.views
            });

            setArticleData(prevData => prevData.map(article =>
                article.$id === articleId ? updatedArticle : article
            ));
        } catch (err) {
            setError(err);
            throw err;
        }
    };

    const updateArticle = async (articleId, updatedData) => {
        try {
            await db.updateDocument(databaseId, articlesCollectionId, articleId, updatedData);
            setArticleData(prevData => prevData.map(article =>
                article.$id === articleId ? { ...article, ...updatedData } : article
            ));
        } catch (err) {
            setError(err);
            throw err;
        }
    };

    const deleteArticle = async (articleId) => {
        try {
            await db.deleteDocument(databaseId, articlesCollectionId, articleId);
            setArticleData(prevData => prevData.filter(article => article.$id !== articleId));
        } catch (err) {
            setError(err);
            throw err;
        }
    };

    const contextValue = {
        articleData,
        loading,
        error,
        addArticle,
        updateArticle,
        updateViews,
        deleteArticle,
    };

    return (
        <ArticlesDataContext.Provider value={contextValue}>
            {children}
        </ArticlesDataContext.Provider>
    );
};
