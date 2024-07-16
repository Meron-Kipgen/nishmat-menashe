import React, { useState } from 'react';
import styled from 'styled-components';
import { useArticlesData } from './useArticlesData';
import TextEditor from '../../components/TextEditor';

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
  margin-bottom: 20px;

  label {
    display: block;
    font-weight: bold;
    margin-bottom: 5px;
  }

  input,
  textarea {
    width: 100%;
    padding: 8px;
    font-size: 16px;
    border: 1px solid #ced4da;
    border-radius: 4px;
    box-sizing: border-box;
  }

  textarea {
    height: 150px;
  }
`;

const SubmitButton = styled.button`
  background-color: #007bff;
  color: white;
  border: none;
  padding: 10px 20px;
  font-size: 18px;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s ease;

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

const AddArticleForm = ({ onClose }) => {
  const { addArticle } = useArticlesData();
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('');
  const [subcategory, setSubcategory] = useState('');
  const [writer, setWriter] = useState('');
  const [body, setBody] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newPost = {
      title,
      category,
      subcategory,
      body,
      writer,
      comments: [],
    };

    try {
      await addArticle(newPost);
      setTitle('');
      setCategory('');
      setSubcategory('');
      setBody('');
      setWriter('');
      onClose(); // Close the form
    } catch (error) {
      console.error('Failed to add article:', error);
    }
  };

  const handleCancel = () => {
    onClose(); // Close the form
  };

  return (
    <FormContainer onSubmit={handleSubmit}>
      <FormGroup>
        <label>Title:</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </FormGroup>
      <FormGroup>
        <label>Category:</label>
        <input
          type="text"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          required
        />
      </FormGroup>
      <FormGroup>
        <label>Subcategory:</label>
        <input
          type="text"
          value={subcategory}
          onChange={(e) => setSubcategory(e.target.value)}
          required
        />
      </FormGroup>
      <FormGroup>
        <label>Writer:</label>
        <input
          type="text"
          value={writer}
          onChange={(e) => setWriter(e.target.value)}
          required
        />
      </FormGroup>
      <FormGroup>
        <label>Body:</label>
        <TextEditor value={body} onChange={(value) => setBody(value)} />
      </FormGroup>
      
      <SubmitButton type="submit">Add Article</SubmitButton>
      <CloseButton type="button" onClick={handleCancel}>
        Cancel
      </CloseButton>
    </FormContainer>
  );
};

export default AddArticleForm;
