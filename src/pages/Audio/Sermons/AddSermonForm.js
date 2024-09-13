import React, { useState } from "react";
import styled from "styled-components";
import { useSermonsData } from "./useSermonsData"; // Adjust the path as necessary

const FormContainer = styled.div`
  background: #fff;
  border-radius: 8px;
  box-shadow: rgba(0, 0, 0, 0.56) 0px 22px 70px 4px;
  padding: 20px;
  max-width: 500px;
  margin: 20px auto;
  position: absolute;
  z-index: 9999;
  cursor: move; 
  @media (max-width: 768px) {
    width: 100%;

  }
`;

const CloseButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  background: #ff4d4d;
  color: #fff;
  border: none;
  border-radius: 50%;
  width: 30px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  font-size: 16px;
  &:hover {
    background: #e03e3e;
  }
`;

const Title = styled.h2`
  text-align: center;
  margin-bottom: 20px;
  color: #333;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const Label = styled.label`
  margin-bottom: 15px;
  font-weight: bold;
  color: #333;
`;

const Input = styled.input`
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 16px;
  width: 100%;
  box-sizing: border-box;
  margin-top: 5px;
`;

const Button = styled.button`
  padding: 10px;
  border: none;
  border-radius: 4px;
  background-color: #4caf50;
  color: #fff;
  font-size: 16px;
  cursor: pointer;
  margin-top: 10px;
  &:hover {
    background-color: #45a049;
  }
`;

const ErrorMessage = styled.p`
  color: #f44336;
  font-weight: bold;
  text-align: center;
`;

const AddSermonForm = ({ onClose }) => {
  const { addSermon} = useSermonsData();
  const [formData, setFormData] = useState({
    title: "",
    category: "",
    subcategory: "",
    rabbi: "",
    thumbnail: "",
    audioUrl: "",
  });
  const [error, setError] = useState(null);

  const handleChange = e => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      await addSermon(formData);
      onClose(); 
    } catch (err) {
      setError("Failed to add audio. Please try again.");
    }
  };

  return (

      <FormContainer>
        <CloseButton onClick={onClose}>×</CloseButton>
        <Title>Add New Audio</Title>
        {error && <ErrorMessage>{error}</ErrorMessage>}
        <Form onSubmit={handleSubmit}>
          <Label>
            Title:
            <Input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
            />
          </Label>
          <Label>
            Category:
            <Input
              type="text"
              name="category"
              value={formData.category}
              onChange={handleChange}
              required
            />
          </Label>
          <Label>
            Subcategory:
            <Input
              type="text"
              name="subcategory"
              value={formData.subcategory}
              onChange={handleChange}
            />
          </Label>
          <Label>
            Rabbi:
            <Input
              type="text"
              name="rabbi"
              value={formData.rabbi}
              onChange={handleChange}
            />
          </Label>
          <Label>
            Thumbnail URL:
            <Input
              type="text"
              name="thumbnail"
              value={formData.thumbnail}
              onChange={handleChange}
            />
          </Label>
          <Label>
            Audio Id:
            <Input
              type="text"
              name="audioUrl"
              value={formData.audioUrl}
              onChange={handleChange}
              required
            />
          </Label>
          <Button type="submit">Add Audio</Button>
        </Form>
      </FormContainer>
   
  );
};

export default AddSermonForm;
