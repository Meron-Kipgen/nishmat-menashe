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

const AddNewBookForm = ({ addBook, setShowAddBookForm }) => {
  const [formData, setFormData] = useState({
    title: "",
    author: "",
    category: "",
    subcategory: "",
    message: "",
    thumbnail: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newBook = {
      title: formData.title,
      author: formData.author,
      category: formData.category,
      subcategory: formData.subcategory,
      message: formData.message,
      thumbnail: formData.thumbnail,
      chapters: []
    };

    try {
      await addBook(newBook);
      setShowAddBookForm(false);
      setFormData({
        title: "",
        author: "",
        category: "",
        subcategory: "",
        message: "",
        thumbnail: ""
      });
    } catch (error) {
      console.error("Failed to add book:", error);
      // Handle error state or logging as needed
    }
  };

  return (
    <FormContainer>
      <h3>Add New Book</h3>
      <form onSubmit={handleSubmit}>
        <Input
          type="text"
          name="title"
          placeholder="Title"
          value={formData.title}
          onChange={handleChange}
          required
        />
        <Input
          type="text"
          name="author"
          placeholder="Author"
          value={formData.author}
          onChange={handleChange}
          required
        />
        <Input
          type="text"
          name="category"
          placeholder="Category"
          value={formData.category}
          onChange={handleChange}
          required
        />
        <Input
          type="text"
          name="subcategory"
          placeholder="Subcategory"
          value={formData.subcategory}
          onChange={handleChange}
        />
        <Input
          type="text"
          name="message"
          placeholder="Message"
          value={formData.message}
          onChange={handleChange}
        />
        <Input
          type="text"
          name="thumbnail"
          placeholder="Thumbnail URL"
          value={formData.thumbnail}
          onChange={handleChange}
        />
        <Button type="submit">Add Book</Button>
      </form>
    </FormContainer>
  );
};

export default AddNewBookForm;
