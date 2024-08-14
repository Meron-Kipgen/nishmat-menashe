import React, { createContext, useContext, useState, useEffect } from 'react';
import { db, ID, client } from '../../../db/config'; // Import your DB and client configurations


const databaseId = '666aff03003ba124b787';
const podcastCollectionId = '66b8c030003510531dba';
const episodeCollectionId = '66bb12500015fb5fbf27';

const PodcastDataContext = createContext();

export const usePodcastData = () => {
    const context = useContext(PodcastDataContext);
    if (!context) {
        throw new Error('usePodcastData must be used within a PodcastDataProvider');
    }
    return context;
};

export const PodcastDataProvider = ({ children }) => {
    const [podcastData, setPodcastData] = useState([]);
    const [episodeData, setEpisodeData] = useState([]);
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
        fetchPodcast();
        fetchEpisodes();

        const podcastSubscription = client.subscribe(`databases.${databaseId}.collections.${podcastCollectionId}.documents`, (response) => {
            const { events, payload } = response;

            if (events.includes('databases.*.collections.*.documents.*.create')) {
                setPodcastData(prevData => {
                    if (prevData.find(podcast => podcast.$id === payload.$id)) {
                        return prevData;
                    }
                    return [...prevData, payload];
                });
            }

            if (events.includes('databases.*.collections.*.documents.*.update')) {
                setPodcastData(prevData => prevData.map(podcast => podcast.$id === payload.$id ? payload : podcast));
            }

            if (events.includes('databases.*.collections.*.documents.*.delete')) {
                setPodcastData(prevData => prevData.filter(podcast => podcast.$id !== payload.$id));
            }
        });

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
            if (podcastSubscription) {
                podcastSubscription();
            }
            if (episodeSubscription) {
                episodeSubscription();
            }
        };
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

    const deletePodcast = async (podcastUrl) => {
        try {
            const documentId = podcastData.find(podcast => podcast.PodcastUrl === podcastUrl).$id;
            await db.deleteDocument(databaseId, podcastCollectionId, documentId);
            setPodcastData(podcastData.filter(podcast => podcast.$id !== documentId));
        } catch (error) {
            setError(error);
            throw new Error('Failed to delete Podcast');
        }
    };

    const addEpisode = async (newEpisode) => {
        try {
            // Create the new episode document
            const createdEpisode = await db.createDocument(databaseId, episodeCollectionId, ID.unique(), newEpisode);
    
            // Fetch the current podcast document
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
        <PodcastDataContext.Provider
            value={{
                podcastData,
                episodeData,
                loading,
                error,
                addPodcast,
                updatePlayed,
                updatePodcast,
                deletePodcast,
                addEpisode,
                updateEpisode,
                deleteEpisode,
            }}
        >
            {children}
        </PodcastDataContext.Provider>
    );
};
