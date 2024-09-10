import React, { createContext, useContext, useState, useEffect } from 'react';
import { db, ID } from '../../../db/config';
import useRealTimeSubscription from '../../../db/useRealTimeSubscription'; 
import { Query } from 'appwrite';

const databaseId = '666aff03003ba124b787';
const podcastCollectionId = '66b8c030003510531dba';
const episodesCollectionId = "66dd4aca0014a7cf6151";
const PodcastDataContext = createContext();

export const usePodcastData = () => {
    const context = useContext(PodcastDataContext);
    if (!context) {
        throw new Error('usePodcastData must be used within a PodcastDataProvider');
    }
    return context;
};

export const PodcastDataProvider = ({ children }) => {
    const [podcastData, setPodcastData] = useRealTimeSubscription(databaseId, podcastCollectionId);
    const [episodeData, setEpisodeData] = useRealTimeSubscription(databaseId, episodesCollectionId);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchPodcast = async () => {
        setLoading(true);
        try {
            const response = await db.listDocuments(databaseId, podcastCollectionId);
            setPodcastData(response.documents);
        } catch (err) {
            setError(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchPodcast();
    }, []);

    const addPodcast = async (newPodcast) => {
        try {
            await db.createDocument(databaseId, podcastCollectionId, ID.unique(), newPodcast);
        } catch (err) {
            setError(err);
            throw err;
        }
    };

    const updatePlayed = async (podcastUrl) => {
        try {
            const podcastToUpdate = podcastData.find(podcast => podcast.PodcastUrl === podcastUrl);
            if (!podcastToUpdate) {
                throw new Error('Podcast not found');
            }
            
            const updatedPodcast = {
                ...podcastToUpdate,
                played: (podcastToUpdate.played || 0) + 1
            };
            
            await db.updateDocument(databaseId, podcastCollectionId, podcastToUpdate.$id, {
                played: updatedPodcast.played
            });
            
            setPodcastData(prevData => prevData.map(podcast =>
                podcast.PodcastUrl === podcastUrl ? updatedPodcast : podcast
            ));
        } catch (err) {
            setError(err);
            throw err;
        }
    };

    const updatePodcast = async (podcastId, updatedPodcast) => {
        try {
            await db.updateDocument(databaseId, podcastCollectionId, podcastId, updatedPodcast);
            setPodcastData(prevData => prevData.map(podcast =>
                podcast.$id === podcastId ? { ...podcast, ...updatedPodcast } : podcast
            ));
        } catch (err) {
            setError(err);
            throw err;
        }
    };

    const deletePodcast = async (podcastId) => {
        try {
            await db.deleteDocument(databaseId, podcastCollectionId, podcastId);
            setPodcastData(podcastData.filter(podcast => podcast.$id !== podcastId));
        } catch (error) {
            setError(error);
            throw new Error('Failed to delete Podcast');
        }
    };

    const fetchEpisodes = async (podcastId) => {
        try {
            const response = await db.listDocuments(databaseId, episodesCollectionId, [
                Query.equal('podcastId', podcastId) // Filter episodes by podcastId
            ]);
            return response.documents;
        } catch (err) {
            setError(err);
            throw err;
        }
    };
    
    const addEpisode = async (podcastId, title, audioId,episodeNum) => {
        try {
            await db.createDocument(databaseId, episodesCollectionId, ID.unique(), {
                title,
                audioId,
                podcastId ,
                episodeNum
            });
            // Optionally update local state here if needed
        } catch (err) {
            setError(err);
            throw err;
        }
    };
    
    const updateEpisode = async (episodeId, updatedFields) => {
        try {
            await db.updateDocument(databaseId, episodesCollectionId, episodeId, updatedFields);
            // Optionally update local state here if needed
        } catch (err) {
            setError(err);
            throw err;
        }
    };
    
    const deleteEpisode = async (episodeId) => {
        try {
            await db.deleteDocument(databaseId, episodesCollectionId, episodeId);
            // Optionally update local state here if needed
        } catch (err) {
            setError(err);
            throw err;
        }
    };
    
    return (
        <PodcastDataContext.Provider
        value={{
            podcastData,
            episodeData, // Provide episode data here
            loading,
            error,
            addPodcast,
            updatePlayed,
            updatePodcast,
            deletePodcast,
            fetchEpisodes,
            addEpisode,
            updateEpisode,
            deleteEpisode,
        }}
    >
        {children}
    </PodcastDataContext.Provider>
    );
};
