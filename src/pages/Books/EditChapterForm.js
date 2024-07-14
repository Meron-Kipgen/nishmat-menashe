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

const EditChapterForm = ({ chapter, saveEditedChapter, onCancel }) => {
  const [editedData, setEditedData] = useState({
    $id: chapter.$id,
    titleEn: chapter.titleEn,
    titleHe: chapter.titleHe,
    subTitleEn: chapter.subTitleEn,
    subTitleHe: chapter.subTitleHe,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedData({ ...editedData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    saveEditedChapter(editedData); // Call saveEditedChapter with editedData
  };

  return (
    <FormContainer>
      <h3>Edit chapter</h3>
      <form onSubmit={handleSubmit}>
        <Input
          type="text"
          name="titleEn"
          value={editedData.titleEn}
          onChange={handleChange}
          placeholder="Title (English)"
          required
        />
        <Input
          type="text"
          name="titleHe"
          value={editedData.titleHe}
          onChange={handleChange}
          placeholder="Title (Hebrew)"
          required
        />
        <Input
          type="text"
          name="subTitleEn"
          value={editedData.subTitleEn}
          onChange={handleChange}
          placeholder="Subtitle (English)"
          required
        />
        <Input
          type="text"
          name="subTitleHe"
          value={editedData.subTitleHe}
          onChange={handleChange}
          placeholder="Subtitle (Hebrew)"
          required
        />
        <ButtonGroup>
          <Button type="submit">Save</Button>
          <CancelButton type="button" onClick={onCancel}>
            Cancel
          </CancelButton>
        </ButtonGroup>
      </form>
    </FormContainer>
  );
};

export default EditChapterForm;
