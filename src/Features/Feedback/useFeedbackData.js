import React, { createContext, useContext, useState, useEffect } from 'react';
import { db, ID } from '../../db/config';
import useRealTimeSubscription from '../../db/useRealTimeSubscription';

const databaseId = '666aff03003ba124b787';
const feedbackCollectionId = '66c5b8060028b077f63d';

const FeedbackDataContext = createContext();

export const useFeedbackData = () => {
    const context = useContext(FeedbackDataContext);
    if (!context) {
        throw new Error('useFeedbackData must be used within a FeedbackDataProvider');
    }
    return context;
};

export const FeedbackDataProvider = ({ children }) => {
    const [feedbackData, setFeedbackData] = useRealTimeSubscription(databaseId, feedbackCollectionId);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (feedbackData.length > 0) {
            setLoading(false);
        }
    }, [feedbackData]);

    const addFeedback = async (newFeedback) => {
        try {
            await db.createDocument(databaseId, feedbackCollectionId, ID.unique(), newFeedback);
        } catch (err) {
            setError(err);
            throw err;
        }
    };

    const updateFeedback = async (feedbackId, updatedData) => {
        try {
            await db.updateDocument(databaseId, feedbackCollectionId, feedbackId, updatedData);
            setFeedbackData(prevData =>
                prevData.map(feedback =>
                    feedback.$id === feedbackId ? { ...feedback, ...updatedData } : feedback
                )
            );
        } catch (err) {
            setError(err);
            throw err;
        }
    };

    const deleteFeedback = async (feedbackId) => {
        try {
            await db.deleteDocument(databaseId, feedbackCollectionId, feedbackId);
            setFeedbackData(prevData =>
                prevData.filter(feedback => feedback.$id !== feedbackId)
            );
        } catch (err) {
            setError(err);
            throw err;
        }
    };

    const contextValue = {
        feedbackData,
        loading,
        error,
        addFeedback,
        updateFeedback,
        deleteFeedback,
    };

    return (
        <FeedbackDataContext.Provider value={contextValue}>
            {children}
        </FeedbackDataContext.Provider>
    );
};
