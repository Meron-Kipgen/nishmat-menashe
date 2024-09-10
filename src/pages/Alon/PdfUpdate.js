import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { usePdfData } from "./usePdfData"; // Import the custom hook for accessing PDF data

const FormContainer = styled.form`
  position: absolute;
  top: 0;
  right: 0;
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

  input {
    width: 100%;
    padding: 8px;
    font-size: 16px;
    border: 1px solid #ced4da;
    border-radius: 4px;
    box-sizing: border-box;
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

const CancelButton = styled.button`
  background-color: #ffc107;
  color: white;
  border: none;
  padding: 10px 20px;
  font-size: 18px;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  margin-left: 10px;

  &:hover {
    background-color: #e0a800;
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

export default function PdfUpdate({ pdfId, onUpdate, onCancel }) {
  const { pdfData, updatePdf } = usePdfData(); // Access PDF data and update function from the hook
  const [pdfDetails, setPdfDetails] = useState({
    volume: '',
    parasha: '',
    yearHe: '',
    yearEn: '',
    issue: '',
    pdfUrl: '',
  });

  useEffect(() => {
    const pdf = pdfData.find(pdf => pdf.$id === pdfId);
    if (pdf) {
        setPdfDetails({
            volume: pdf.volume || '',
            parasha: pdf.parasha || '',
            yearHe: pdf.yearHe || '',
            yearEn: pdf.yearEn || '',
            issue: pdf.issue || '',
            pdfUrl: pdf.pdfUrl || '',
        });
    }
}, [pdfId, pdfData]);


  const handleUpdateChange = (e) => {
    const { name, value } = e.target;
    setPdfDetails((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updatePdf(pdfId, pdfDetails);
      onUpdate(); // Trigger update on form submit
    } catch (error) {
      console.error('Failed to update PDF data:', error);
    }
  };

  return (
    <FormContainer onSubmit={handleSubmit}>
      <CloseButton onClick={onCancel}>&times;</CloseButton>
      <h2>Update PDF Details</h2>
      <FormGroup>
        <label>Volume:</label>
        <input
          type="text"
          name="volume"
          value={pdfDetails.volume}
          onChange={handleUpdateChange}
        />
      </FormGroup>
      <FormGroup>
        <label>Issue:</label>
        <input
          type="text"
          name="issue"
          value={pdfDetails.issue}
          onChange={handleUpdateChange}
        />
      </FormGroup>
      <FormGroup>
        <label>Parasha:</label>
        <input
          type="text"
          name="parasha"
          value={pdfDetails.parasha}
          onChange={handleUpdateChange}
        />
      </FormGroup>
      <FormGroup>
        <label>Year (Hebrew):</label>
        <input
          type="text"
          name="yearHe"
          value={pdfDetails.yearHe}
          onChange={handleUpdateChange}
        />
      </FormGroup>
      <FormGroup>
        <label>Year (English):</label>
        <input
          type="text"
          name="yearEn"
          value={pdfDetails.yearEn}
          onChange={handleUpdateChange}
        />
      </FormGroup>
      <FormGroup>
        <label>Pdf Url :</label>
        <input
          type="text"
          name="pdfUrl"
          value={pdfDetails.pdfUrl}
          onChange={handleUpdateChange}
        />
      </FormGroup>
      <SubmitButton type="submit">Update</SubmitButton>
      <CancelButton type="button" onClick={onCancel}>Cancel</CancelButton>
    </FormContainer>
  );
}
