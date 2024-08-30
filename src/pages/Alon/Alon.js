import React, { useState } from "react";
import styled from "styled-components";
import { useLocation } from "react-router-dom";
import PdfData from "./PdfData"; // Assuming your PdfData is imported
import Filter from "./Filter";
import MainSection from "./MainSection";
import SideSection from "./SideSection";

const Container = styled.section`
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 20px;
  padding: 20px;
  margin: 45px 0;
`;

const Title = styled.h2`
  text-align: center;
  color: #007bff;
  margin-top: 0;
  margin-bottom: 20px;

  @media (max-width: 768px) {
    font-size: 1.5rem;
    margin-bottom: 10px;
  }
`;

const MainWrapper = styled.section`
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-end;
`;

export default function Alon() {
  const [filters, setFilters] = useState({ volume: "", issue: "", parasha: "" });
  const location = useLocation();
  const currentUrl = window.location.origin + location.pathname;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: value,
    }));
  };

  const handleDownloadClick = (pdfUrl) => {
    const link = document.createElement("a");
    link.href = pdfUrl;
    link.setAttribute("download", "");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const filteredPdfData = PdfData.filter((pdf) => {
    return (
      (filters.volume === "" || pdf.volume.toString().includes(filters.volume)) &&
      (filters.issue === "" || pdf.issue.toString().includes(filters.issue)) &&
      (filters.parasha === "" || pdf.parasha.toLowerCase().includes(filters.parasha.toLowerCase()))
    );
  });

  return (
    <Container>
      <Title>Nishmat Menashe Alon Pdf</Title>
      <Filter filters={filters} onInputChange={handleInputChange} />
      <MainWrapper>
        <MainSection filteredPdfData={filteredPdfData} handleDownloadClick={handleDownloadClick} />
        <SideSection currentUrl={currentUrl} />
      </MainWrapper>
    </Container>
  );
}
