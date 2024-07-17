import React, { useState } from "react";
import styled from "styled-components";
import { useDataContext } from "../../contexts/DataContextProvider";

const FormContainer = styled.form`
 position: absolute;
  top: 60px;
  width: 800px;
  z-index: 1000;
  margin: 0 auto;
  padding: 20px;
  background-color: #f8f9fa;
  border: 1px solid #ced4da;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
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
const CloseButton = styled.button`
  background-color: #dc3545;
  color: white;
  border: none;
  padding: 10px 20px;
  font-size: 18px;
  border-radius: 4px;
  cursor: pointer;
  margin-right: 10px;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #bd2130;
  }
`;

const VideoForm = ({onClose}) => {
  const { createVideo } = useDataContext();
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

  const handleChange = e => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  const handleCancel = () => {
    onClose(); 
  };
  const handleSubmit = async e => {
    e.preventDefault();
    try {
      await createVideo(formData);

      // Clear form fields after submission
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
    } catch (error) {
      console.error("Error adding video:", error);
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
        <Label>subCategory:</Label>
        <Input
          type="text"
          name="subcategory"
          value={formData.subcategory}
          onChange={handleChange}
          required
        />
      </FormGroup>
      <Button type="submit">Add Video</Button>
      <CloseButton type="button" onClick={handleCancel}>
        Cancel
      </CloseButton>
    </FormContainer>
  );
};

export default VideoForm;
