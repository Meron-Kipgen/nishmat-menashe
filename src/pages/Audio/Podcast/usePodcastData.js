import React, { createContext, useContext, useState, useEffect } from 'react';
import { db, ID, client } from '../../../db/config'; 

const databaseId = '666aff03003ba124b787';
const podcastCollectionId = '66b8c030003510531dba';

const PodcastDataContext = createContext();

export const usePodcastData = () => {
    const context = useContext(PodcastDataContext);
    if (!context) {
        throw new Error('usePodcastData must be used within an PodcastDataProvider');
    }
    return context;
};

export const PodcastDataProvider = ({ children }) => {
    const [podcastData, setPodcastData] = useState([]);
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

        const PodcastSubscription = client.subscribe(`databases.${databaseId}.collections.${podcastCollectionId}.documents`, (response) => {
            const { events, payload } = response;

            if (events.includes('databases.*.collections.*.documents.*.create')) {
                setPodcastData(prevData => {
                    if (prevData.find(Podcast => Podcast.$id === payload.$id)) {
                        return prevData;
                    }
                    return [...prevData, payload];
                });
            }

            if (events.includes('databases.*.collections.*.documents.*.update')) {
                setPodcastData(prevData => prevData.map(Podcast => Podcast.$id === payload.$id ? payload : Podcast));
            }

            if (events.includes('databases.*.collections.*.documents.*.delete')) {
                setPodcastData(prevData => prevData.filter(podcast => podcast.$id !== payload.$id));
            }
        });

        return () => {
            if (PodcastSubscription) {
                PodcastSubscription();
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
            setPodcastData(prevData => prevData.map(Podcast =>
                Podcast.$id === podcastId ? { ...Podcast, ...updatedPodcast } : Podcast
            ));
        } catch (err) {
            setError(err);
            throw err;
        }
    };
    
    const deletePodcast = async (podcastUrl) => {
        try {
          const documentId = podcastData.find(podcast => podcast.PodcastUrl === podcastUrl).$id;
          await db.deleteDocument(
            databaseId,
            podcastCollectionId,
            documentId
          );
          setPodcastData(podcastData.filter(podcast => podcast.$id !== documentId)); // Update local state
        } catch (error) {
          throw new Error('Failed to delete Podcast');
        }
      };
  

    const contextValue = {
        podcastData,
        loading,
        error,
        addPodcast,
        updatePlayed,
        updatePodcast,
        deletePodcast,
    };

    return (
        <PodcastDataContext.Provider value={contextValue}>
            {children}
        </PodcastDataContext.Provider>
    );
};
