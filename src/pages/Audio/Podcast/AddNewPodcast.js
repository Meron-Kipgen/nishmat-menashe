import React, { useState } from 'react';
import styled from 'styled-components';
import { usePodcastData } from './usePodcastData';

const FormContainer = styled.div`
  position: absolute;
  background: white;
  padding: 20px;
  top: 70px;
  right: 10px;
  z-index: 993;
  border-radius: 10px;
  box-shadow: rgba(0, 0, 0, 0.56) 0px 22px 70px 4px;
  width: 600px;
  margin: 20px auto;

  // Media query for mobile devices
  @media (max-width: 600px) {
    width: 100%;
    top: 40;
    right: 0;
    border-radius: 0;
    box-shadow: none;
    padding: 10px;
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

const FormField = styled.div`
  margin-bottom: 15px;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 5px;
  font-weight: bold;
`;

const Input = styled.input`
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
`;

const TextArea = styled.textarea`
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
`;

const Button = styled.button`
  background: #007bff;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-weight: bold;
  margin-top: 10px;

  &:hover {
    background: #0056b3;
  }
`;

const AddNewPodcast = ({ onClose }) => {
  const { addPodcast } = usePodcastData();
  const [newPodcast, setNewPodcast] = useState({
    title: '',
    description: '',
    rabbi: '',
    season: '', // Ensure season is treated as a text
    isComplete: false,
    thumbnail: '',
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setNewPodcast({
      ...newPodcast,
      [name]: type === 'checkbox' ? checked : value, // Handle season as text
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addPodcast(newPodcast);
      setNewPodcast({
        title: '',
        description: '',
        rabbi: '',
        season: '', // Reset season as text
        isComplete: false,
        thumbnail: '',
      });
      onClose();
    } catch (error) {
      console.error('Failed to add podcast', error);
    }
  };

  return (
    <FormContainer>
      <CloseButton onClick={onClose}>&times;</CloseButton>
      <form onSubmit={handleSubmit}>
        <FormField>
          <Label>Title</Label>
          <Input
            type="text"
            name="title"
            value={newPodcast.title}
            onChange={handleChange}
          />
        </FormField>
        <FormField>
          <Label>Description</Label>
          <TextArea
            name="description"
            value={newPodcast.description}
            onChange={handleChange}
          />
        </FormField>
        <FormField>
          <Label>Rabbi</Label>
          <Input
            type="text"
            name="rabbi"
            value={newPodcast.rabbi}
            onChange={handleChange}
          />
        </FormField>
        <FormField>
          <Label>Season</Label>
          <Input
            type="text"
            name="season"
            value={newPodcast.season}
            onChange={handleChange}
          />
        </FormField>
        <FormField>
          <Label>Is Complete</Label>
          <Input
            type="checkbox"
            name="isComplete"
            checked={newPodcast.isComplete}
            onChange={handleChange}
          />
        </FormField>
        <FormField>
          <Label>Thumbnail URL</Label>
          <Input
            type="text"
            name="thumbnail"
            value={newPodcast.thumbnail}
            onChange={handleChange}
          />
        </FormField>
        <Button type="submit">Add Podcast</Button>
      </form>
    </FormContainer>
  );
};

export default AddNewPodcast;
