import React, { useState, useEffect } from 'react';
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
  @media (max-width: 768px) {
    width: 100%;
  }
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
  background-color: #28a745;
  color: white;
  border: none;
  padding: 10px 20px;
  font-size: 18px;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #218838;
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

const UpdateArticleForm = ({ articleId, onClose }) => {
  const { updateArticle, articleData } = useArticlesData();
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('');
  const [subcategory, setSubcategory] = useState('');
  const [body, setBody] = useState('');
  const [author, setAuthor] = useState('');

  useEffect(() => {
    const article = articleData.find(article => article.$id === articleId);
    if (article) {
      setTitle(article.title || '');
      setCategory(article.category || '');
      setSubcategory(article.subcategory || '');
      setBody(article.body || '');
      setAuthor(article.author || '');
    }
  }, [articleId, articleData]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const article = articleData.find(article => article.$id === articleId);
    if (article && article.$id) {
      const updatedArticle = {
        title,
        category,
        subcategory,
        body,
        author,
      };

      try {
        await updateArticle(article.$id, updatedArticle);
        onClose(); // Close the form after successful update
      } catch (error) {
        console.error('Failed to update article:', error);
      }
    } else {
      console.error('Article or article.$id is missing or undefined.');
    }
  };

  return (
 
    <FormContainer onSubmit={handleSubmit}>
      <CloseButton onClick={onClose}>&times;</CloseButton>
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
        <label>author:</label>
        <input
          type="text"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          required
        />
      </FormGroup>
      <FormGroup>
        <label>Body:</label>
        <TextEditor value={body} onChange={(value) => setBody(value)} />
      </FormGroup>
      
      <SubmitButton type="submit">Update Article</SubmitButton>
    </FormContainer>

  );
};

export default UpdateArticleForm;
