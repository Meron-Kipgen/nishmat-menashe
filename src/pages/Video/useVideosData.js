import React, { createContext, useContext, useState } from "react";
import { db, ID } from "../../db/config";
import useRealTimeSubscription from "../../db/useRealTimeSubscription";

const DatabaseId = "666aff03003ba124b787";
const CollectionId = "666aff1400318bf6aa6f";

const VideosDataContext = createContext();

export const useVideosData = () => {
  const context = useContext(VideosDataContext);
  if (!context) {
    throw new Error("useVideosData must be used within a VideosDataProvider");
  }
  return context;
};

export const VideosDataProvider = ({ children }) => {
  const [videoData, setVideoData] = useRealTimeSubscription(DatabaseId, CollectionId);
  const [error, setError] = useState(null);

  const addVideo = async (newVideo) => {
    try {
      const createdVideo = await db.createDocument(
        DatabaseId,
        CollectionId,
        ID.unique(),
        newVideo
      );
      setVideoData((prevData) => [...prevData, createdVideo]);
    } catch (err) {
      setError(err);
      throw err;
    }
  };

  const updateViews = async (videoId) => {
    try {
      const videoToUpdate = videoData.find((video) => video.$id === videoId);
      if (!videoToUpdate) {
        throw new Error("Video not found");
      }

      const updatedVideo = {
        ...videoToUpdate,
        views: (videoToUpdate.views || 0) + 1,
      };

      await db.updateDocument(DatabaseId, CollectionId, videoId, {
        views: updatedVideo.views,
      });

      setVideoData((prevData) =>
        prevData.map((video) =>
          video.$id === videoId ? updatedVideo : video
        )
      );
    } catch (err) {
      setError(err);
      throw err;
    }
  };

  const updateVideo = async (videoId, updatedData) => {
    try {
      await db.updateDocument(DatabaseId, CollectionId, videoId, updatedData);
      setVideoData((prevData) =>
        prevData.map((video) =>
          video.$id === videoId ? { ...video, ...updatedData } : video
        )
      );
    } catch (err) {
      setError(err);
      throw err;
    }
  };

  const deleteVideo = async (videoId) => {
    try {
      await db.deleteDocument(DatabaseId, CollectionId, videoId);
      setVideoData((prevData) =>
        prevData.filter((video) => video.$id !== videoId)
      );
    } catch (err) {
      setError(err);
      throw err;
    }
  };

  const contextValue = {
    videoData,
    error,
    addVideo,
    updateVideo,
    updateViews,
    deleteVideo,
  };

  return (
    <VideosDataContext.Provider value={contextValue}>
      {children}
    </VideosDataContext.Provider>
  );
};
