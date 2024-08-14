import React, { createContext, useContext, useState, useEffect } from 'react';
import { db, ID, client } from '../../../db/config'; // Import your DB and client configurations

const databaseId = '666aff03003ba124b787';
const episodeCollectionId = '66bb12500015fb5fbf27';

const EpisodeDataContext = createContext();

export const useEpisodeData = () => {
    const context = useContext(EpisodeDataContext);
    if (!context) {
        throw new Error('useEpisodeData must be used within an EpisodeDataProvider');
    }
    return context;
};

export const EpisodeDataProvider = ({ children }) => {
    const [episodeData, setEpisodeData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchEpisodes = async () => {
        setLoading(true);
        try {
            const response = await db.listDocuments(databaseId, episodeCollectionId);
            setEpisodeData(response.documents);
        } catch (err) {
            setError(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchEpisodes();

        const episodeSubscription = client.subscribe(`databases.${databaseId}.collections.${episodeCollectionId}.documents`, (response) => {
            const { events, payload } = response;

            if (events.includes('databases.*.collections.*.documents.*.create')) {
                setEpisodeData(prevData => {
                    if (prevData.find(episode => episode.$id === payload.$id)) {
                        return prevData;
                    }
                    return [...prevData, payload];
                });
            }

            if (events.includes('databases.*.collections.*.documents.*.update')) {
                setEpisodeData(prevData => prevData.map(episode => episode.$id === payload.$id ? payload : episode));
            }

            if (events.includes('databases.*.collections.*.documents.*.delete')) {
                setEpisodeData(prevData => prevData.filter(episode => episode.$id !== payload.$id));
            }
        });

        return () => {
            if (episodeSubscription) {
                episodeSubscription();
            }
        };
    }, []);

    const addEpisode = async (newEpisode) => {
        try {
            // Create the new episode document
            const createdEpisode = await db.createDocument(databaseId, episodeCollectionId, ID.unique(), newEpisode);
    
            // Find the podcast that should be updated with the new episode
            const podcast = podcastData.find(podcast => podcast.$id === newEpisode.podcastId);
    
            if (!podcast) {
                throw new Error('Podcast not found');
            }
    
            // Update the podcast's episodes array with the new episode ID
            const updatedEpisodes = [...(podcast.episodes || []), createdEpisode.$id];
    
            // Update the podcast document with the new episodes array
            await db.updateDocument(databaseId, podcastCollectionId, podcast.$id, {
                episodes: updatedEpisodes
            });
    
            // Update the local state to include the new episode
            setPodcastData(prevData =>
                prevData.map(p =>
                    p.$id === podcast.$id ? { ...p, episodes: updatedEpisodes } : p
                )
            );
    
            // Update the episode data state
            setEpisodeData(prevData => [...prevData, createdEpisode]);
    
        } catch (err) {
            setError(err);
            throw err;
        }
    };
    

    const updateEpisode = async (episodeId, updatedEpisode) => {
        try {
            await db.updateDocument(databaseId, episodeCollectionId, episodeId, updatedEpisode);
            setEpisodeData(prevData => prevData.map(episode =>
                episode.$id === episodeId ? { ...episode, ...updatedEpisode } : episode
            ));
        } catch (err) {
            setError(err);
            throw err;
        }
    };

    const deleteEpisode = async (episodeId) => {
        try {
            await db.deleteDocument(databaseId, episodeCollectionId, episodeId);
            setEpisodeData(prevData => prevData.filter(episode => episode.$id !== episodeId));
        } catch (err) {
            setError(err);
            throw err;
        }
    };

    return (
        <EpisodeDataContext.Provider
            value={{
                episodeData,
                loading,
                error,
                addEpisode,
                updateEpisode,
                deleteEpisode,
            }}
        >
            {children}
        </EpisodeDataContext.Provider>
    );
};
