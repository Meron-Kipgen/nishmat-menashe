import React, { createContext, useContext, useState, useEffect } from 'react';
import styled from 'styled-components';
import { db, ID } from '../../db/config'; // Assuming db and ID are correctly imported and configured

const databaseId = '666aff03003ba124b787';
const collectionId = '666b0186000007f47da9';

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

    useEffect(() => {
        const fetchPosts = async () => {
            setLoading(true);
            try {
                const response = await db.listDocuments(databaseId, collectionId);
                setArticleData(response.documents);
            } catch (err) {
                setError(err);
            } finally {
                setLoading(false);
            }
        };

        fetchPosts();
    }, []);

    const addArticle = async (newPost) => {
        try {
            const newArticle = await db.createDocument(databaseId, collectionId, ID.unique(), newPost);
            setArticleData(prevData => [...prevData, newArticle]);
        } catch (err) {
            setError(err);
            throw err;
        }
    };

    const updateViews = async (articleId) => {
        try {
            const updatedArticle = articleData.find(article => article.$id === articleId);
            updatedArticle.views = (updatedArticle.views || 0) + 1;
    
            await db.updateDocument(databaseId, collectionId, articleId, {
                views: updatedArticle.views
            });
    
            const response = await db.listDocuments(databaseId, collectionId);
            setArticleData(response.documents);
        } catch (err) {
            setError(err);
            throw err;
        }
    };

    const updateArticle = async (articleId, updatedData) => {
        try {
            await db.updateDocument(databaseId, collectionId, articleId, updatedData);
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
            await db.deleteDocument(databaseId, collectionId, articleId);
            setArticleData(prevData => prevData.filter(article => article.$id !== articleId));
        } catch (err) {
            setError(err);
            throw err;
        }
    };
    const addComment = async (articleId, newComment) => {
        try {
            const articleToUpdate = articleData.find(article => article.$id === articleId);
            if (!articleToUpdate.comments) {
                articleToUpdate.comments = []; // Initialize comments array if it doesn't exist
            }
            articleToUpdate.comments.push(newComment);

            await db.updateDocument(databaseId, collectionId, articleId, {
                comments: articleToUpdate.comments
            });

            // After updating the document, fetch the updated data again
            const response = await db.listDocuments(databaseId, collectionId);
            setArticleData(response.documents);
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
        updateViews,
        updateArticle,  // Adding the new updateArticle function here
        deleteArticle,
        addComment,
    };

    return (
        <ArticlesDataContext.Provider value={contextValue}>
            {children}
        </ArticlesDataContext.Provider>
    );
};
