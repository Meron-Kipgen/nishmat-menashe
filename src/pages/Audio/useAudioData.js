import React, { createContext, useContext, useState, useEffect } from "react";
import { db, ID, client } from "../../db/config";

const databaseId = "666aff03003ba124b787";
const audioCollectionId = "66af4006003ae36a8486";

const AudioDataContext = createContext();

export const useAudioData = () => {
  const context = useContext(AudioDataContext);
  if (!context) {
    throw new Error("useAudioData must be used within an AudioDataProvider");
  }
  return context;
};

export const AudioDataProvider = ({ children }) => {
  const [audioData, setAudioData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchAudio = async () => {
    setLoading(true);
    try {
      const response = await db.listDocuments(databaseId, audioCollectionId);
      setAudioData(response.documents);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAudio();

    const audioSubscription = client.subscribe(
      `databases.${databaseId}.collections.${audioCollectionId}.documents`,
      response => {
        const { events, payload } = response;

        if (events.includes("databases.*.collections.*.documents.*.create")) {
          setAudioData(prevData => {
            if (prevData.find(audio => audio.$id === payload.$id)) {
              return prevData;
            }
            return [...prevData, payload];
          });
        }

        if (events.includes("databases.*.collections.*.documents.*.update")) {
          setAudioData(prevData =>
            prevData.map(audio => (audio.$id === payload.$id ? payload : audio))
          );
        }

        if (events.includes("databases.*.collections.*.documents.*.delete")) {
          setAudioData(prevData =>
            prevData.filter(audio => audio.$id !== payload.$id)
          );
        }
      }
    );

    return () => {
      if (audioSubscription) {
        audioSubscription();
      }
    };
  }, []);

  const addAudio = async newAudio => {
    try {
      await db.createDocument(
        databaseId,
        audioCollectionId,
        ID.unique(),
        newAudio
      );
    } catch (err) {
      setError(err);
      throw err;
    }
  };

  const updatePlayed = async audioUrl => {
    try {
      const audioToUpdate = audioData.find(
        audio => audio.audioUrl === audioUrl
      );
      if (!audioToUpdate) {
        throw new Error("Audio not found");
      }

      const updatedAudio = {
        ...audioToUpdate,
        played: (audioToUpdate.played || 0) + 1,
      };

      await db.updateDocument(
        databaseId,
        audioCollectionId,
        audioToUpdate.$id,
        {
          played: updatedAudio.played,
        }
      );

      setAudioData(prevData =>
        prevData.map(audio =>
          audio.audioUrl === audioUrl ? updatedAudio : audio
        )
      );
    } catch (err) {
      setError(err);
      throw err;
    }
  };
  const updateAudio = async (audioId, updatedAudio) => {
    try {
      await db.updateDocument(
        databaseId,
        audioCollectionId,
        audioId,
        updatedAudio
      );
      setAudioData(prevData =>
        prevData.map(audio =>
          audio.$id === audioId ? { ...audio, ...updatedAudio } : audio
        )
      );
    } catch (err) {
      setError(err);
      throw err;
    }
  };

  const deleteAudio = async audioUrl => {
    try {
      const documentId = audioData.find(
        audio => audio.audioUrl === audioUrl
      ).$id;
      await db.deleteDocument(databaseId, audioCollectionId, documentId);
      setAudioData(audioData.filter(audio => audio.$id !== documentId)); // Update local state
    } catch (error) {
      throw new Error("Failed to delete audio");
    }
  };

  const contextValue = {
    audioData,
    loading,
    error,
    addAudio,
    updatePlayed,
    updateAudio,
    deleteAudio,
  };

  return (
    <AudioDataContext.Provider value={contextValue}>
      {children}
    </AudioDataContext.Provider>
  );
};
