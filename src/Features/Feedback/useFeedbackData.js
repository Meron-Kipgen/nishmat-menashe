import React, { createContext, useContext, useState, useEffect } from 'react';
import { db, ID, client } from '../../db/config';

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
  const [feedbackData, setFeedbackData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchFeedback = async () => {
    setLoading(true);
    try {
      const response = await db.listDocuments(databaseId, feedbackCollectionId);
      setFeedbackData(response.documents);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFeedback();

    const FeedbackSubscription = client.subscribe(`databases.${databaseId}.collections.${feedbackCollectionId}.documents`, (response) => {
      const { events, payload } = response;

      if (events.includes('databases.*.collections.*.documents.*.create')) {
        setFeedbackData(prevData => {
          if (prevData.find(feedback => feedback.$id === payload.$id)) {
            return prevData;
          }
          return [...prevData, payload];
        });
      }

      if (events.includes('databases.*.collections.*.documents.*.update')) {
        setFeedbackData(prevData => prevData.map(feedback => feedback.$id === payload.$id ? payload : feedback));
      }

      if (events.includes('databases.*.collections.*.documents.*.delete')) {
        setFeedbackData(prevData => prevData.filter(feedback => feedback.$id !== payload.$id));
      }
    });

    return () => {
      if (FeedbackSubscription) {
        FeedbackSubscription();
      }
    };
  }, []);

  const addFeedback = async (newFeedback) => {
    try {
      const response = await db.createDocument(databaseId, feedbackCollectionId, ID.unique(), newFeedback);
      setFeedbackData(prevData => [...prevData, response]); // Add the new feedback directly to state
    } catch (err) {
      setError(err);
      throw err;
    }
  };

  const updateFeedback = async (feedbackId, updatedData) => {
    try {
      await db.updateDocument(databaseId, feedbackCollectionId, feedbackId, updatedData);
    } catch (err) {
      setError(err);
      throw err;
    }
  };

  const deleteFeedback = async (feedbackId) => {
    try {
      await db.deleteDocument(databaseId, feedbackCollectionId, feedbackId);
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
