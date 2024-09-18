import React, { useState } from "react";
import styled from "styled-components";
import { useVideosData } from "../../pages/Video/useVideosData";

const FormContainer = styled.form`
  position: fixed;
  top: 50px;
  right: 0;
  width: 90%;
  max-width: 600px;
  z-index: 1000;
  margin: 0 auto;
  padding: 10px;
  background-color: #ffffff;
  border: 1px solid #ced4da;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;

  @media (max-width: 768px) {
    width: 100%;
    padding: 15px;
  }
`;

const FormGroup = styled.div`
  margin-bottom: 1rem;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 0.5rem;
  font-size: 0.9rem;
`;

const Input = styled.input`
  width: 100%;
  padding: 0.5rem;
  font-size: 1rem;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

const Button = styled.button`
  background-color: #007bff;
  color: white;
  border: none;
  padding: 0.75rem 1rem;
  font-size: 1rem;
  cursor: pointer;
  border-radius: 4px;
  margin-top: 1rem;

  &:hover {
    background-color: #0056b3;
  }

  @media (max-width: 768px) {
    padding: 0.5rem 0.75rem;
    font-size: 0.9rem;
  }
`;

const CloseButton = styled.button`
  background-color: #dc3545;
  color: white;
  border: none;
  padding: 5px 10px;
  font-size: 18px;
  border-radius: 50%;
  cursor: pointer;
  position: absolute;
  top: 10px;
  right: 10px;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #bd2130;
  }

  @media (max-width: 768px) {
    padding: 4px 8px;
    font-size: 16px;
  }
`;

const VideoForm = ({ onClose }) => {
  const { addVideo } = useVideosData();
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    rabbi: "",
    thumbnail: "",
    poster: "",
    videoUrl: "",
    category: "",
    subcategory: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addVideo(formData);
      setFormData({
        title: "",
        description: "",
        rabbi: "",
        thumbnail: "",
        poster: "",
        videoUrl: "",
        category: "",
        subcategory: "",
      });
      onClose(); // Close the form after successful submission
    } catch (error) {
      console.error("Error adding video:", error);
    }
  };

  return (
    <FormContainer onSubmit={handleSubmit}>
      <CloseButton type="button" onClick={onClose}>
        &times;
      </CloseButton>
      <FormGroup>
        <Label>Title:</Label>
        <Input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          required
        />
      </FormGroup>
      <FormGroup>
        <Label>Description:</Label>
        <Input
          type="text"
          name="description"
          value={formData.description}
          onChange={handleChange}
          required
        />
      </FormGroup>
      <FormGroup>
        <Label>Rabbi:</Label>
        <Input
          type="text"
          name="rabbi"
          value={formData.rabbi}
          onChange={handleChange}
          required
        />
      </FormGroup>
      <FormGroup>
        <Label>Thumbnail URL:</Label>
        <Input
          type="text"
          name="thumbnail"
          value={formData.thumbnail}
          onChange={handleChange}
          required
        />
      </FormGroup>
      <FormGroup>
        <Label>Poster URL:</Label>
        <Input
          type="text"
          name="poster"
          value={formData.poster}
          onChange={handleChange}
          required
        />
      </FormGroup>
      <FormGroup>
        <Label>Video URL:</Label>
        <Input
          type="text"
          name="videoUrl"
          value={formData.videoUrl}
          onChange={handleChange}
          required
        />
      </FormGroup>
      <FormGroup>
        <Label>Category:</Label>
        <Input
          type="text"
          name="category"
          value={formData.category}
          onChange={handleChange}
          required
        />
      </FormGroup>
      <FormGroup>
        <Label>SubCategory:</Label>
        <Input
          type="text"
          name="subcategory"
          value={formData.subcategory}
          onChange={handleChange}
          required
        />
      </FormGroup>
      <Button type="submit">Add Video</Button>
    </FormContainer>
  );
};

export default VideoForm;
