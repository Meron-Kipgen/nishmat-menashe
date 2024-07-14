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

const ContentForm = ({ chapterId }) => {
  const { addContentToChapter } = useBookData(); // Use context hook
  const [formData, setFormData] = useState({
    headingEn: "",
    headingHe: "",
    bodyEn: "",
    bodyHe: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleAddContent = async () => {
    const newContent = {
      headingEn: formData.headingEn,
      headingHe: formData.headingHe,
      bodyEn: formData.bodyEn,
      bodyHe: formData.bodyHe
    };
    
    try {
      await addContentToChapter(chapterId, newContent);
      // Optionally clear form data or perform other actions after adding content
      setFormData({
        headingEn: "",
        headingHe: "",
        bodyEn: "",
        bodyHe: ""
      });
    } catch (error) {
      console.error("Error adding content:", error);
      // Handle error (e.g., display error message)
    }
  };

  return (
    <>
      <Label>English heading</Label>
      <Input
        type="text"
        name="headingEn"
        value={formData.headingEn}
        onChange={handleChange}
      />

      <Label>Hebrew heading</Label>
      <Input
        type="text"
        name="headingHe"
        value={formData.headingHe}
        onChange={handleChange}
      />

      <Label>English body</Label>
      <Input
        type="text"
        name="bodyEn"
        value={formData.bodyEn}
        onChange={handleChange}
      />

      <Label>Hebrew body</Label>
      <Input
        type="text"
        name="bodyHe"
        value={formData.bodyHe}
        onChange={handleChange}
      />

      <button onClick={handleAddContent}>Add content</button>
    </>
  );
};

export default ContentForm;
