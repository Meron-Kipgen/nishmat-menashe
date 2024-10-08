import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { usePodcastData } from './usePodcastData'; // Adjust import path as needed

const FormContainer = styled.div`
  position: absolute;
  top: 60px;
  right: 10px;
  padding: 20px;
  background-color: white;
  border-radius: 15px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 500px; // Fixed width for larger screens
  z-index: 1000; // Ensure it appears above other elements

  @media (max-width: 768px) {
    width: 100%; // Full width on mobile devices
    right: 0; // Adjust right position for mobile
    left: 0; // Adjust left position for mobile
    border-radius: 0; // Optional: remove border radius on mobile for a full-width look
  }
`;

const CloseButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  background: none;
  border: none;
  font-size: 20px;
  cursor: pointer;
  color: #333;

  &:hover {
    color: #ff0000;
  }
`;

const Input = styled.input`
  width: 100%;
  padding: 10px;
  margin-bottom: 15px;
  border: 1px solid #ddd;
  border-radius: 5px;
`;

const Button = styled.button`
  padding: 10px 20px;
  font-size: 16px;
  color: #ffffff;
  background-color: #007bff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #0056b3;
  }

  &:not(:last-child) {
    margin-bottom: 10px;
  }
`;

const UpdateEpisodeForm = ({ episodeId, onClose }) => {
  const { episodeData, updateEpisode } = usePodcastData(); // Adjust if using different data fetching
  const episode = episodeData.find(episode => episode.$id === episodeId);

  const [title, setTitle] = useState('');
  const [audioId, setAudioId] = useState('');

  useEffect(() => {
    if (episode) {
      setTitle(episode.title || '');
      setAudioId(episode.audioId || '');
    }
  }, [episode]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateEpisode(episodeId, { title, audioId });
      onClose();
    } catch (err) {
      console.error('Failed to update episode:', err);
    }
  };

  return (
    <FormContainer>
      <CloseButton onClick={onClose}>&times;</CloseButton>
      <h2>Update Episode</h2>
      <form onSubmit={handleSubmit}>
        <Input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Title"
        />
        <Input
          type="text"
          value={audioId}
          onChange={(e) => setAudioId(e.target.value)}
          placeholder="Audio ID"
        />
        <Button type="submit">Update Episode</Button>
        <Button type="button" onClick={onClose}>Cancel</Button>
      </form>
    </FormContainer>
  );
};

export default UpdateEpisodeForm;
