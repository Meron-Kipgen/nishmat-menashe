// VideosDataProvider.jsx
import React, { createContext, useContext, useState, useEffect } from "react";
import { db, ID, client } from "../../db/config";

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
  const [videoData, setVideoData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchVideos = async () => {
    setLoading(true);
    try {
      const response = await db.listDocuments(DatabaseId, CollectionId);
      setVideoData(response.documents);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchVideos();

    const videosSubscription = client.subscribe(`databases.${DatabaseId}.collections.${CollectionId}.documents`, (response) => {
      const { events, payload } = response;

      if (events.includes('databases.*.collections.*.documents.*.create')) {
        setVideoData(prevData => {
          if (prevData.find(video => video.$id === payload.$id)) {
            return prevData;
          }
          return [...prevData, payload];
        });
      }

      if (events.includes('databases.*.collections.*.documents.*.update')) {
        setVideoData(prevData => prevData.map(video => video.$id === payload.$id ? payload : video));
      }

      if (events.includes('databases.*.collections.*.documents.*.delete')) {
        setVideoData(prevData => prevData.filter(video => video.$id !== payload.$id));
      }
    });

    return () => {
      if (videosSubscription) {
        videosSubscription();
      }
    };
  }, []);

  const addVideo = async (newVideo) => {
    try {
      await db.createDocument(DatabaseId, CollectionId, ID.unique(), newVideo);
    } catch (err) {
      setError(err);
      throw err;
    }
  };

  const updateViews = async (videoId) => {
    try {
      const videoToUpdate = videoData.find(video => video.$id === videoId);
      if (!videoToUpdate) {
        throw new Error("Video not found");
      }

      const updatedVideo = {
        ...videoToUpdate,
        views: (videoToUpdate.views || 0) + 1
      };

      await db.updateDocument(DatabaseId, CollectionId, videoId, {
        views: updatedVideo.views
      });

      setVideoData(prevData => prevData.map(video =>
        video.$id === videoId ? updatedVideo : video
      ));
    } catch (err) {
      setError(err);
      throw err;
    }
  };

  const updateVideo = async (videoId, updatedData) => {
    try {
      await db.updateDocument(DatabaseId, CollectionId, videoId, updatedData);
      setVideoData(prevData => prevData.map(video =>
        video.$id === videoId ? { ...video, ...updatedData } : video
      ));
    } catch (err) {
      setError(err);
      throw err;
    }
  };

  const deleteVideo = async (videoId) => {
    try {
      await db.deleteDocument(DatabaseId, CollectionId, videoId);
      setVideoData(prevData => prevData.filter(video => video.$id !== videoId));
    } catch (err) {
      setError(err);
      throw err;
    }
  };

  const contextValue = {
    videoData,
    loading,
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
