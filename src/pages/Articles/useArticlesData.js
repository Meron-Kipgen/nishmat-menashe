import React, { createContext, useContext, useState, useEffect } from 'react';
import { db, ID } from '../../db/config'; // Ensure that ID and db are correctly imported

const databaseId = '666aff03003ba124b787';
const articlesCollectionId = '666b0186000007f47da9';
const commentsCollectionId = '6693e16d0015537405c2'; // Replace with your comments collection ID

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

        fetchArticles();
    }, []);

    const addArticle = async (newArticle) => {
        try {
            const addedArticle = await db.createDocument(databaseId, articlesCollectionId, ID.unique(), newArticle);
            setArticleData(prevData => [...prevData, addedArticle]);
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

            const response = await db.listDocuments(databaseId, articlesCollectionId);
            setArticleData(response.documents);
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
            // Fetch and delete all comments related to the article
            const commentsResponse = await db.listDocuments(databaseId, commentsCollectionId);
            const commentsToDelete = commentsResponse.documents.filter(comment => comment.articleId === articleId);

            await Promise.all(commentsToDelete.map(comment => db.deleteDocument(databaseId, commentsCollectionId, comment.$id)));

            // Delete the article itself
            await db.deleteDocument(databaseId, articlesCollectionId, articleId);
            setArticleData(prevData => prevData.filter(article => article.$id !== articleId));
        } catch (err) {
            setError(err);
            throw err;
        }
    };

    const addComment = async (articleId, newComment) => {
        try {
            // Ensure newComment includes articleId
            const commentData = {
                ...newComment,
                articleId  // Include the articleId in the comment
            };
        
            // Create the new comment document
            const addedComment = await db.createDocument(databaseId, commentsCollectionId, ID.unique(), commentData);
        
            // Optionally update the article document if you maintain a list of comment IDs
            const articleToUpdate = articleData.find(article => article.$id === articleId);
            if (articleToUpdate) {
                const updatedComments = [...(articleToUpdate.comments || []), addedComment.$id];
                await db.updateDocument(databaseId, articlesCollectionId, articleId, {
                    comments: updatedComments
                });
            }
        } catch (err) {
            setError(err);
            throw err;
        }
    };
    
    const deleteComment = async (commentId) => {
        try {
            // Fetch the comment to get its associated article ID
            const commentResponse = await db.getDocument(databaseId, commentsCollectionId, commentId);
            const articleId = commentResponse.articleId;

            // Delete the comment
            await db.deleteDocument(databaseId, commentsCollectionId, commentId);

            // Optionally update the article document if needed
            const articleToUpdate = articleData.find(article => article.$id === articleId);
            if (articleToUpdate) {
                // Logic for updating the article's comments array if necessary
            }

            // Refresh the articles data
            const response = await db.listDocuments(databaseId, articlesCollectionId);
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
        updateArticle,
        deleteArticle,
        addComment,
        deleteComment
    };

    return (
        <ArticlesDataContext.Provider value={contextValue}>
            {children}
        </ArticlesDataContext.Provider>
    );
};
