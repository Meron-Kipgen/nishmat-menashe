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

const EditContentForm = ({ content, saveEditedContent, onCancel }) => {
  const [editedData, setEditedData] = useState({
    $id: content.$id,
   headingEn: content.headingEn,
   headingHe: content.headingHe,
    bodyEn: content.bodyEn,
    bodyHe: content.bodyHe,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedData({ ...editedData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    saveEditedContent(editedData); // Call saveEditedcontent with editedData
  };

  return (
    <FormContainer>
      <h3>Edit content</h3>
      <form onSubmit={handleSubmit}>
        <Input
          type="text"
          name="headingEn"
          value={editedData.headingEn}
          onChange={handleChange}
          placeholder="heading (English)"
          required
        />
        <Input
          type="text"
          name="headingHe"
          value={editedData.headingHe}
          onChange={handleChange}
          placeholder="Title (Hebrew)"
          required
        />
        <Input
          type="text"
          name="bodyEn"
          value={editedData.bodyEn}
          onChange={handleChange}
          placeholder="body (English)"
          required
        />
        <Input
          type="text"
          name="bodyHe"
          value={editedData.bodyHe}
          onChange={handleChange}
          placeholder="body (Hebrew)"
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

export default EditContentForm;
