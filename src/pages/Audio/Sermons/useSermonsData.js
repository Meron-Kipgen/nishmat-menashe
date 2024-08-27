import React, { createContext, useContext, useState } from "react";
import { db, ID } from "../../../db/config";
import useRealTimeSubscription from "../../../db/useRealTimeSubscription";

const databaseId = "666aff03003ba124b787";
const sermonCollectionId = "66af4006003ae36a8486";

const SermonDataContext = createContext();

export const useSermonsData = () => {
  const context = useContext(SermonDataContext);
  if (!context) {
    throw new Error("useSermonsData must be used within a SermonDataProvider");
  }
  return context;
};

export const SermonDataProvider = ({ children }) => {
  const [sermonData, setSermonData] = useRealTimeSubscription(databaseId, sermonCollectionId);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchSermon = async () => {
    setLoading(true);
    try {
      const response = await db.listDocuments(databaseId, sermonCollectionId);
      setSermonData(response.documents);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  const addSermon = async (newSermon) => {
    try {
      await db.createDocument(databaseId, sermonCollectionId, ID.unique(), newSermon);
    } catch (err) {
      setError(err);
      throw err;
    }
  };

  const updatePlayed = async (sermonId) => {
    try {
      const sermonToUpdate = sermonData.find(sermon => sermon.$id === sermonId);
      if (!sermonToUpdate) {
        throw new Error("Sermon not found");
      }

      const updatedSermon = {
        ...sermonToUpdate,
        played: (sermonToUpdate.played || 0) + 1,
      };

      await db.updateDocument(
        databaseId,
        sermonCollectionId,
        sermonToUpdate.$id,
        { played: updatedSermon.played }
      );

      setSermonData(prevData =>
        prevData.map(sermon => (sermon.$id === sermonId ? updatedSermon : sermon))
      );
    } catch (err) {
      setError(err);
      throw err;
    }
  };

  const updateSermon = async (sermonId, updatedSermon) => {
    try {
      await db.updateDocument(databaseId, sermonCollectionId, sermonId, updatedSermon);
      setSermonData(prevData =>
        prevData.map(sermon =>
          sermon.$id === sermonId ? { ...sermon, ...updatedSermon } : sermon
        )
      );
    } catch (err) {
      setError(err);
      throw err;
    }
  };

  const deleteSermon = async (sermonId) => {
    try {
      await db.deleteDocument(databaseId, sermonCollectionId, sermonId);
      setSermonData(prevData => prevData.filter(sermon => sermon.$id !== sermonId));
    } catch (err) {
      setError(err);
      throw err;
    }
  };

  const contextValue = {
    sermonData,
    loading,
    error,
    addSermon,
    updatePlayed,
    updateSermon,
    deleteSermon,
  };

  return (
    <SermonDataContext.Provider value={contextValue}>
      {children}
    </SermonDataContext.Provider>
  );
};
