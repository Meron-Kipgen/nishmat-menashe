import React, { useState } from 'react';
import styled from 'styled-components';
import { useAudioData } from './useAudioData'; // Adjust the path as necessary
import Draggable from 'react-draggable';

const FormContainer = styled.div`
  background: #fff;
  border-radius: 8px;
  box-shadow: rgba(0, 0, 0, 0.56) 0px 22px 70px 4px;
  max-width: 500px;
  margin: 20px auto;
  padding: 20px;
  position: absolute;
  z-index: 9999;
  cursor:move;
`;

const CloseButton = styled.button`
  background: #ff4d4d;
  border: none;
  border-radius: 50%;
  color: #fff;
  cursor: pointer;
  font-size: 1.5rem;
  height: 30px;
  position: absolute;
  right: 10px;
  top: 10px;
  width: 30px;
  transition: background 0.3s ease;

  &:hover {
    background: #ff1a1a;
  }
`;

const Title = styled.h2`
  font-size: 1.5rem;
  margin-bottom: 20px;
  text-align: center;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

const Label = styled.label`
  font-weight: bold;
  margin-bottom: 5px;
`;

const Input = styled.input`
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1rem;
  padding: 10px;
  transition: border-color 0.3s ease;

  &:focus {
    border-color: #007bff;
    outline: none;
  }
`;

const Button = styled.button`
  background: #007bff;
  border: none;
  border-radius: 4px;
  color: #fff;
  cursor: pointer;
  font-size: 1rem;
  padding: 10px;
  transition: background 0.3s ease;

  &:hover {
    background: #0056b3;
  }
`;

const ErrorMessage = styled.p`
  background: #f8d7da;
  border: 1px solid #f5c6cb;
  border-radius: 4px;
  color: #721c24;
  margin: 0;
  padding: 10px;
  text-align: center;
`;

const EditAudioForm = ({ audio, onClose }) => {
  const { updateAudio } = useAudioData();
  const [formData, setFormData] = useState({
    title: audio.title,
    category: audio.category,
    subcategory: audio.subcategory,
    rabbi: audio.rabbi,
    thumbnail: audio.thumbnail,
    audioUrl: audio.audioUrl,
  });
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateAudio(audio.$id, formData);
      onClose();
    } catch (err) {
      setError('Failed to update audio. Please try again.');
    }
  };

  return (
    <Draggable>
    <FormContainer>
      <CloseButton onClick={onClose}>×</CloseButton>
      <Title>Edit Audio</Title>
      {error && <ErrorMessage>{error}</ErrorMessage>}
      <Form onSubmit={handleSubmit}>
        <Label>
          Title:
          <Input type="text" name="title" value={formData.title} onChange={handleChange} required />
        </Label>
        <Label>
          Category:
          <Input type="text" name="category" value={formData.category} onChange={handleChange} required />
        </Label>
        <Label>
          Subcategory:
          <Input type="text" name="subcategory" value={formData.subcategory} onChange={handleChange} />
        </Label>
        <Label>
          Rabbi:
          <Input type="text" name="rabbi" value={formData.rabbi} onChange={handleChange} />
        </Label>
        <Label>
          Thumbnail URL:
          <Input type="text" name="thumbnail" value={formData.thumbnail} onChange={handleChange} />
        </Label>
        <Label>
          Audio URL:
          <Input type="text" name="audioUrl" value={formData.audioUrl} onChange={handleChange} required />
        </Label>
        <Button type="submit">Update Audio</Button>
      </Form>
    </FormContainer>
    </Draggable>
  );
};

export default EditAudioForm;
