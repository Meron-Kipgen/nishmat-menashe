import React, { createContext, useContext, useState, useEffect } from 'react';
import { db, ID } from '../../db/config'; 
import useRealTimeSubscription from '../../db/useRealTimeSubscription';

const databaseId = '666aff03003ba124b787';
const QuestionAnswerCollectionId = '66ba303a002c4c5a6d6a';

const QuestionAnswerDataContext = createContext();

export const useQuestionAnswerData = () => {
    const context = useContext(QuestionAnswerDataContext);
    if (!context) {
        throw new Error('useQuestionAnswerData must be used within a QuestionAnswerDataProvider');
    }
    return context;
};

export const QuestionAnswerDataProvider = ({ children }) => {
    const [QuestionAnswerData, setQuestionAnswerData] = useRealTimeSubscription(databaseId, QuestionAnswerCollectionId);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (QuestionAnswerData.length > 0) {
            setLoading(false);
        }
    }, [QuestionAnswerData]);

    const addQuestionAnswer = async (newQuestionAnswer) => {
        try {
            await db.createDocument(databaseId, QuestionAnswerCollectionId, ID.unique(), newQuestionAnswer);
        } catch (err) {
            setError(err);
            throw err;
        }
    };

    const updateViews = async (QuestionAnswerId) => {
        try {
            const QuestionAnswerToUpdate = QuestionAnswerData.find(QuestionAnswer => QuestionAnswer.$id === QuestionAnswerId);
            if (!QuestionAnswerToUpdate) {
                throw new Error('QuestionAnswer not found');
            }

            const updatedQuestionAnswer = {
                ...QuestionAnswerToUpdate,
                views: (QuestionAnswerToUpdate.views || 0) + 1
            };

            await db.updateDocument(databaseId, QuestionAnswerCollectionId, QuestionAnswerId, {
                views: updatedQuestionAnswer.views
            });

            setQuestionAnswerData(prevData => prevData.map(QuestionAnswer =>
                QuestionAnswer.$id === QuestionAnswerId ? updatedQuestionAnswer : QuestionAnswer
            ));
        } catch (err) {
            setError(err);
            throw err;
        }
    };

    const updateQuestionAnswer = async (QuestionAnswerId, updatedData) => {
        try {
            await db.updateDocument(databaseId, QuestionAnswerCollectionId, QuestionAnswerId, updatedData);
            setQuestionAnswerData(prevData => prevData.map(qna =>
                qna.$id === QuestionAnswerId ? { ...qna, ...updatedData } : qna
            ));
        } catch (err) {
            setError(err);
            throw err;
        }
    };

    const deleteQuestionAnswer = async (QuestionAnswerId) => {
        try {
            await db.deleteDocument(databaseId, QuestionAnswerCollectionId, QuestionAnswerId);
            setQuestionAnswerData(prevData => prevData.filter(QuestionAnswer => QuestionAnswer.$id !== QuestionAnswerId));
        } catch (err) {
            setError(err);
            throw err;
        }
    };

    const contextValue = {
        QuestionAnswerData,
        loading,
        error,
        addQuestionAnswer,
        updateQuestionAnswer,
        updateViews,
        deleteQuestionAnswer,
    };

    return (
        <QuestionAnswerDataContext.Provider value={contextValue}>
            {children}
        </QuestionAnswerDataContext.Provider>
    );
};
