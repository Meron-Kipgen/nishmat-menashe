import React, { useState } from "react";
import styled from "styled-components";
import { usePdfData } from "./usePdfData"; // Import the context

const FormContainer = styled.div`
  position: absolute;
  right: 0;
  margin-right: 200px;
  z-index: 200;
  display: flex;
  flex-direction: column;
  max-width: 500px;
  width: 100%;  // Ensure the form container can be 100% width
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  background: #f9f9f9;
  
  @media (max-width: 768px) {
    right: 0;
    width: 100%;
    margin-right: 0; // Remove right margin on small screens
  }
`;

const FormTitle = styled.h2`
  font-size: 24px;
  margin-bottom: 20px;
  text-align: center;
  color: #333;
`;

const FormField = styled.div`
  margin-bottom: 15px;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 8px;
  font-size: 14px;
  color: #555;
`;

const Input = styled.input`
  width: 100%;
  padding: 12px;
  font-size: 16px;
  border: 1px solid #ddd;
  border-radius: 5px;
  box-sizing: border-box;
  transition: border-color 0.3s ease;
  
  &:focus {
    border-color: #007bff;
    outline: none;
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
`;

const SubmitButton = styled.button`
  padding: 12px 20px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
  transition: background-color 0.3s ease;
  
  &:hover {
    background-color: #0056b3;
  }
`;

const CancelButton = styled.button`
  padding: 12px 20px;
  background-color: #f5f5f5;
  color: #333;
  border: 1px solid #ddd;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
  transition: background-color 0.3s ease;
  
  &:hover {
    background-color: #e0e0e0;
  }
`;

const ErrorMessage = styled.p`
  color: red;
  text-align: center;
  margin-bottom: 20px;
`;

export default function AddNewForm({ onCancel }) {
  const [formData, setFormData] = useState({
    volume: "",
    issue: "",
    parasha: "",
    yearHe: "",
    yearEn: "",
    pdfUrl: "",
  });

  const { addPdf, error } = usePdfData(); // Use the context

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await addPdf(formData); // Use the addPdf method from the context
      alert("PDF entry added successfully!");
      setFormData({
        volume: "",
        issue: "",
        parasha: "",
        yearHe: "",
        yearEn: "",
        pdfUrl: "",
      });
    } catch (error) {
      console.error("Failed to add PDF:", error);
    }
  };

  return (
    <FormContainer>
      <FormTitle>Add New PDF</FormTitle>
      {error && <ErrorMessage>Error: {error.message}</ErrorMessage>}
      <form onSubmit={handleSubmit}>
        <FormField>
          <Label htmlFor="volume">Volume</Label>
          <Input
            type="text"
            id="volume"
            name="volume"
            value={formData.volume}
            onChange={handleInputChange}
            required
          />
        </FormField>

        <FormField>
          <Label htmlFor="issue">Issue</Label>
          <Input
            type="text"
            id="issue"
            name="issue"
            value={formData.issue}
            onChange={handleInputChange}
            required
          />
        </FormField>

        <FormField>
          <Label htmlFor="parasha">Parasha</Label>
          <Input
            type="text"
            id="parasha"
            name="parasha"
            value={formData.parasha}
            onChange={handleInputChange}
            required
          />
        </FormField>

        <FormField>
          <Label htmlFor="yearHe">Year (Hebrew)</Label>
          <Input
            type="text"
            id="yearHe"
            name="yearHe"
            value={formData.yearHe}
            onChange={handleInputChange}
            required
          />
        </FormField>

        <FormField>
          <Label htmlFor="yearEn">Year (English)</Label>
          <Input
            type="text"
            id="yearEn"
            name="yearEn"
            value={formData.yearEn}
            onChange={handleInputChange}
            required
          />
        </FormField>

        <FormField>
          <Label htmlFor="pdfUrl">PDF URL</Label>
          <Input
            type="text"
            id="pdfUrl"
            name="pdfUrl"
            value={formData.pdfUrl}
            onChange={handleInputChange}
            required
          />
        </FormField>

        <ButtonGroup>
          <SubmitButton type="submit">Add PDF</SubmitButton>
          <CancelButton type="button" onClick={onCancel}>Cancel</CancelButton>
        </ButtonGroup>
      </form>
    </FormContainer>
  );
}
