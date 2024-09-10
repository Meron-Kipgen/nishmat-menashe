import React, { useState } from 'react';
import { usePodcastData } from './usePodcastData'; // Adjust import path as needed

const AddEpisodeForm = ({ podcastId, onClose }) => {
    const { addEpisode } = usePodcastData();
    const [title, setTitle] = useState('');
    const [audioId, setAudioId] = useState('');
    const [episodeNum, setEpisodeNum] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await addEpisode(podcastId, title, audioId,episodeNum);
            onClose();
        } catch (err) {
            console.error('Failed to add episode:', err);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
           <input
                type="text"
                placeholder="EpisodeNum"
                value={episodeNum}
                onChange={(e) => setEpisodeNum(e.target.value)}
                required
            /> 
             <input
                type="text"
                placeholder="Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
            />
            
            <input
                type="text"
                placeholder="Audio ID"
                value={audioId}
                onChange={(e) => setAudioId(e.target.value)}
                required
            />
            <button type="submit">Add Episode</button>
        </form>
    );
};

export default AddEpisodeForm;
