import React, { useState } from 'react';
import styled from 'styled-components';
import { usePodcastData } from './usePodcastData';

const FormContainer = styled.div`
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
  background-color: #f4f4f4;
  border-radius: 10px;
  position: relative;
`;

const FormTitle = styled.h2`
  text-align: center;
  margin-bottom: 20px;
`;

const CloseButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  background-color: transparent;
  border: none;
  font-size: 20px;
  cursor: pointer;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const Label = styled.label`
  font-size: 16px;
  margin-bottom: 5px;
  color: #333;
`;

const Input = styled.input`
  padding: 10px;
  margin-bottom: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 16px;
`;

const Button = styled.button`
  padding: 10px;
  font-size: 16px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  
  &:hover {
    background-color: #0056b3;
  }
`;

const AddEpisode = ({ podcastId, onClose }) => {
  const { addEpisode } = usePodcastData();
  const [title, setTitle] = useState('');
  const [audioId, setAudioId] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const newEpisode = {
        title,
        audioId,
        podcastId, 
      };

      await addEpisode(newEpisode);

      setTitle('');
      setAudioId('');
      onClose(); // Close the form after submission
    } catch (err) {
      console.error('Error adding episode:', err);
    }
  };

  return (
    <FormContainer>
      <CloseButton onClick={onClose}>&times;</CloseButton>
      <FormTitle>Add New Episode</FormTitle>
      <Form onSubmit={handleSubmit}>
        <Label htmlFor="title">Episode Title</Label>
        <Input
          type="text"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />

        <Label htmlFor="audioId">Audio Id</Label>
        <Input
          type="text"
          id="audioId"
          value={audioId}
          onChange={(e) => setAudioId(e.target.value)}
          required
        />

        <Button type="submit">Add Episode</Button>
      </Form>
    </FormContainer>
  );
};

export default AddEpisode;
