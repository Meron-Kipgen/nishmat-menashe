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

const TextArea = styled.textarea`
  width: 100%;
  padding: 10px;
  margin-bottom: 15px;
  border: 1px solid #ddd;
  border-radius: 5px;
  resize: vertical;
`;

const Checkbox = styled.input`
  margin-right: 10px;
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
`;

const EditPodcast = ({ podcastId, onClose }) => {
  const { podcastData, updatePodcast } = usePodcastData();
  const podcast = podcastData.find(podcast => podcast.$id === podcastId);

  const [title, setTitle] = useState(podcast.title || '');
  const [rabbi, setRabbi] = useState(podcast.rabbi || '');
  const [description, setDescription] = useState(podcast.description || '');
  const [season, setSeason] = useState(podcast.season || '');
  const [isComplete, setIsComplete] = useState(podcast.isComplete || false);

  useEffect(() => {
    if (podcast) {
      setTitle(podcast.title || '');
      setRabbi(podcast.rabbi || '');
      setDescription(podcast.description || '');
      setSeason(podcast.season || '');
      setIsComplete(podcast.isComplete || false);
    }
  }, [podcast]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const updatedPodcast = { title, rabbi, description, season, isComplete };
    await updatePodcast(podcastId, updatedPodcast);
    onClose();
  };

  return (
    <FormContainer>
      <CloseButton onClick={onClose}>&times;</CloseButton>
      <h2>Update Podcast</h2>
      <form onSubmit={handleSubmit}>
        <Input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Title"
        />
        <Input
          type="text"
          value={rabbi}
          onChange={(e) => setRabbi(e.target.value)}
          placeholder="Rabbi"
        />
        <TextArea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Description"
        />
        <Input
          type="text"
          value={season}
          onChange={(e) => setSeason(e.target.value)}
          placeholder="Season"
        />
        <div>
          <Checkbox
            type="checkbox"
            checked={isComplete}
            onChange={() => setIsComplete(!isComplete)}
          />
          <label>Completed</label>
        </div>
        <Button type="submit">Update</Button>
      </form>
    </FormContainer>
  );
};

export default EditPodcast;
