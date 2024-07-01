import React, { useState } from "react";
import styled from "styled-components";
import { db, ID } from "../../db/config"; // Import your Appwrite database configuration
import { useQueryClient } from '@tanstack/react-query'; // Import useQueryClient

const FormContainer = styled.form`
  max-width: 600px;
  margin: 0 auto;
`;

const FormGroup = styled.div`
  margin-bottom: 1rem;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 0.5rem;
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

  &:hover {
    background-color: #0056b3;
  }
`;

const VideoForm = ({ closeModal }) => {
  const queryClient = useQueryClient(); // Get the queryClient instance

  const [formData, setFormData] = useState({
    title: "",
    rabbi: "",
    thumbnail: "",
    poster: "",
    videoUrl: "",
    category: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const currentDate = new Date().toISOString(); // Get current date and time
      const response = await db.createDocument(
        "666aff03003ba124b787", // databaseId
        "666aff1400318bf6aa6f", // collectionId
        ID.unique(),
        {
          title: formData.title,
          rabbi: formData.rabbi,
          thumbnail: formData.thumbnail,
          poster: formData.poster,
          videoUrl: formData.videoUrl,
          category: formData.category,
      
        }
      );

      console.log("Video added successfully:", response);

      // Clear form fields after submission if needed
      setFormData({
        title: "",
        rabbi: "",
        thumbnail: "",
        poster: "",
        videoUrl: "",
        category: "",
      });

      // Close modal after successful submission
      closeModal();

      // Manually refetch data to update the cache
      await queryClient.invalidateQueries('documents');
    } catch (error) {
      console.error("Error adding video:", error);
      // Handle error states or feedback to user
    }
  };

  return (
    <FormContainer onSubmit={handleSubmit}>
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
      <Button type="submit">Add Video</Button>
    </FormContainer>
  );
};

export default VideoForm;
