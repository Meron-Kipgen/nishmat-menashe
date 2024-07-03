import React, { createContext, useContext } from "react";
import { useQueryClient, useMutation, useQuery } from "@tanstack/react-query";
import { db, ID } from "../db/config"; // Assuming db and ID are imported correctly

const DataContext = createContext();

const fetchDocuments = async () => {
  const response = await db.listDocuments("666aff03003ba124b787", "666aff1400318bf6aa6f");
  return response.documents;
};

const fetchDocument = async (videoId) => {
  const response = await db.getDocument("666aff03003ba124b787", "666aff1400318bf6aa6f", videoId);
  return response;
};

const updateViewCount = async (videoId) => {
  const video = await fetchDocument(videoId);
  const newViewCount = (video.views || 0) + 1;
  await db.updateDocument("666aff03003ba124b787", "666aff1400318bf6aa6f", videoId, {
    views: newViewCount,
  });
  return { ...video, views: newViewCount };
};

const updateLikeCount = async (videoId) => {
  const video = await fetchDocument(videoId);
  const newLikeCount = (video.likes || 0) + 1;
  await db.updateDocument("666aff03003ba124b787", "666aff1400318bf6aa6f", videoId, {
    likes: newLikeCount,
  });
  return { ...video, likes: newLikeCount };
};

const deleteVideo = async (videoId) => {
  await db.deleteDocument("666aff03003ba124b787", "666aff1400318bf6aa6f", videoId);
};

const createVideo = async (formData) => {
  const response = await db.createDocument(
    "666aff03003ba124b787", // databaseId
    "666aff1400318bf6aa6f", // collectionId
    ID.unique(),
    formData
  );
  return response;
};

const updateVideo = async ({ videoId, updatedData }) => {
  const response = await db.updateDocument(
    "666aff03003ba124b787", // databaseId
    "666aff1400318bf6aa6f", // collectionId
    videoId,
    updatedData
  );
  return response;
};

const DataContextProvider = ({ children }) => {
  const queryClient = useQueryClient();

  const { data, isLoading, isError } = useQuery({
    queryKey: ["Videos"],
    queryFn: fetchDocuments,
    staleTime: 5 * 60 * 1000, // 5 minutes
    cacheTime: 30 * 60 * 1000, // 30 minutes
  });

  const viewMutation = useMutation({
    mutationFn: updateViewCount,
    onSuccess: () => {
      queryClient.invalidateQueries(["Videos"]);
    },
  });

  const likeMutation = useMutation({
    mutationFn: updateLikeCount,
    onSuccess: () => {
      queryClient.invalidateQueries(["Videos"]);
    },
  });

  const deleteMutation = useMutation({
    mutationFn: deleteVideo,
    onSuccess: () => {
      queryClient.invalidateQueries(["Videos"]);
    },
  });

  const createMutation = useMutation({
    mutationFn: createVideo,
    onSuccess: () => {
      queryClient.invalidateQueries(["Videos"]);
    },
  });

  const updateMutation = useMutation({
    mutationFn: updateVideo,
    onSuccess: () => {
      queryClient.invalidateQueries(["Videos"]);
    },
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error loading videos.</div>;
  }

  return (
    <DataContext.Provider
      value={{
        videoLists: data,
        updateViewCount: viewMutation.mutate,
        updateLikeCount: likeMutation.mutate,
        deleteVideo: deleteMutation.mutate,
        createVideo: createMutation.mutate,
        updateVideo: updateMutation.mutate,
        getDocument: fetchDocument, // Provide fetchDocument method
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export const useDataContext = () => {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error("useDataContext must be used within a DataContextProvider");
  }
  return context;
};

export default DataContextProvider;
