import React, { createContext, useContext, useState, useEffect } from 'react';
import { db, ID, client } from '../../db/config'; 

const databaseId = '666aff03003ba124b787';
const QuestionAnswerCollectionId = '66ba303a002c4c5a6d6a';

const QuestionAnswerDataContext = createContext();

export const useQuestionAnswerData = () => {
    const context = useContext(QuestionAnswerDataContext);
    if (!context) {
        throw new Error('useQuestionAnswerData must be used within an QuestionAnswerDataProvider');
    }
    return context;
};

export const QuestionAnswerDataProvider = ({ children }) => {
    const [QuestionAnswerData, setQuestionAnswerData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

   
        const fetchQuestionAnswer = async () => {
            setLoading(true);
            try {
                const response = await db.listDocuments(databaseId, QuestionAnswerCollectionId);
                setQuestionAnswerData(response.documents);
            } catch (err) {
                setError(err);
            } finally {
                setLoading(false);
            }
        };
 useEffect(() => {
        fetchQuestionAnswer();

        const QuestionAnswerSubscription = client.subscribe(`databases.${databaseId}.collections.${QuestionAnswerCollectionId}.documents`, (response) => {
            const { events, payload } = response;

            if (events.includes('databases.*.collections.*.documents.*.create')) {
                setQuestionAnswerData(prevData => {
                    if (prevData.find(QuestionAnswer => QuestionAnswer.$id === payload.$id)) {
                        return prevData;
                    }
                    return [...prevData, payload];
                });
            }

            if (events.includes('databases.*.collections.*.documents.*.update')) {
                setQuestionAnswerData(prevData => prevData.map(QuestionAnswer => QuestionAnswer.$id === payload.$id ? payload : QuestionAnswer));
            }

            if (events.includes('databases.*.collections.*.documents.*.delete')) {
                setQuestionAnswerData(prevData => prevData.filter(QuestionAnswer => QuestionAnswer.$id !== payload.$id));
            }
        });

        return () => {
            if (QuestionAnswerSubscription) {
                QuestionAnswerSubscription();
            }
        };
    }, []);

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
          console.error('Error updating question and answer:', err);
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
