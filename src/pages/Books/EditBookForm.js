import React, { useState } from "react";
import styled from "styled-components";

const FormContainer = styled.div`
  margin-top: 20px;
  padding: 20px;
  background-color: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

const Input = styled.input`
  display: block;
  width: 100%;
  padding: 10px;
  margin-bottom: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

const TextArea = styled.textarea`
  display: block;
  width: 100%;
  padding: 10px;
  margin-bottom: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

const ButtonGroup = styled.div`
  margin-top: 10px;
`;

const Button = styled.button`
  padding: 8px 16px;
  margin-right: 10px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background-color: #0056b3;
  }
`;

const CancelButton = styled(Button)`
  background-color: #6c757d;

  &:hover {
    background-color: #5a6268;
  }
`;

const EditBookForm = ({ book, saveEditedBook }) => {
  const [editedData, setEditedData] = useState({
    title: book.title,
    author: book.author,
    category: book.category,
    subcategory: book.subcategory,
    message: book.message,
    thumbnail: book.thumbnail,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedData({ ...editedData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    saveEditedBook(editedData); // Call saveEditedBook with editedData
  };
  

  return (
    <FormContainer>
      <h3>Edit Book</h3>
      <form onSubmit={handleSubmit}>
        <Input
          type="text"
          name="title"
          value={editedData.title}
          onChange={handleChange}
          placeholder="Title"
          required
        />
        <Input
          type="text"
          name="author"
          value={editedData.author}
          onChange={handleChange}
          placeholder="Author"
          required
        />
        <Input
          type="text"
          name="category"
          value={editedData.category}
          onChange={handleChange}
          placeholder="Category"
          required
        />
        <Input
          type="text"
          name="subcategory"
          value={editedData.subcategory}
          onChange={handleChange}
          placeholder="Subcategory"
        />
        <TextArea
          name="message"
          value={editedData.message}
          onChange={handleChange}
          placeholder="Message"
          rows="4"
          required
        />
        <Input
          type="text"
          name="thumbnail"
          value={editedData.thumbnail}
          onChange={handleChange}
          placeholder="Thumbnail URL"
          required
        />
        <ButtonGroup>
          <Button type="submit">Save</Button>
          <CancelButton type="button">Cancel</CancelButton>
        </ButtonGroup>
      </form>
    </FormContainer>
  );
};

export default EditBookForm;
