import React, { useState } from "react";
import styled from "styled-components";
import { useBookData } from "./useBookData"; // Import the context

const Label = styled.label`
  display: block;
  margin-bottom: 5px;
`;

const Input = styled.input`
  width: 100%;
  padding: 8px;
  margin-bottom: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 16px;
`;

const ChapterForm = ({ bookId }) => {
  const { addChapterToBook } = useBookData(); // Use context hook
  const [formData, setFormData] = useState({
    titleEn: "",
    titleHe: "",
    subTitleEn: "",
    subTitleHe: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleAddChapter = async () => {
    const newChapter = {
      titleEn: formData.titleEn,
      titleHe: formData.titleHe,
      subTitleEn: formData.subTitleEn,
      subTitleHe: formData.subTitleHe,
      books: [bookId] // Add the ID of the current book
    };
    
    try {
      await addChapterToBook(bookId, newChapter);
      // Optionally clear form data or perform other actions after adding chapter
      setFormData({
        titleEn: "",
        titleHe: "",
        subTitleEn: "",
        subTitleHe: ""
      });
    } catch (error) {
      console.error("Error adding chapter:", error);
      // Handle error (e.g., display error message)
    }
  };

  return (
    <>
      <Label>English Title</Label>
      <Input
        type="text"
        name="titleEn"
        value={formData.titleEn}
        onChange={handleChange}
      />

      <Label>Hebrew Title</Label>
      <Input
        type="text"
        name="titleHe"
        value={formData.titleHe}
        onChange={handleChange}
      />

      <Label>English Subtitle</Label>
      <Input
        type="text"
        name="subTitleEn"
        value={formData.subTitleEn}
        onChange={handleChange}
      />

      <Label>Hebrew Subtitle</Label>
      <Input
        type="text"
        name="subTitleHe"
        value={formData.subTitleHe}
        onChange={handleChange}
      />

      <button onClick={handleAddChapter}>Add Chapter</button>
    </>
  );
};

export default ChapterForm;
