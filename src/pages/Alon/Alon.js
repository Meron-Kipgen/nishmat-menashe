import React, { useState } from "react";
import styled from "styled-components";
import { useLocation } from "react-router-dom";
import PdfData from "./PdfData"; // Assuming your PdfData is imported
import Filter from "./Filter";
import MainSection from "./MainSection";
import SideSection from "./SideSection";
import useMediaQuery from "../../hooks/useMediaQuery";

const Container = styled.section`
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 20px;
  padding: 20px;
  margin: 45px 0;
  
  @media (max-width: 600px) {
    padding: 0 5px;
  }
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

const ToggleButton = styled.button`
  background-color: #007bff;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
  margin-bottom: 20px;

  &:hover {
    background-color: #0056b3;
  }
`;

export default function Alon() {
  const [filters, setFilters] = useState({ volume: "", issue: "", parasha: "" });
  const [isSideSectionVisible, setSideSectionVisible] = useState(false);
  const location = useLocation();
  const currentUrl = window.location.origin + location.pathname;
  const isMobile = useMediaQuery('(max-width: 768px)');

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

  const toggleSideSection = () => {
    setSideSectionVisible((prev) => !prev);
  };

  return (
    <Container>
      {isMobile && (
        <>
          <ToggleButton onClick={toggleSideSection}>
            {isSideSectionVisible ? "Hide QR Code" : "Show QR Code"}
          </ToggleButton>
          {isSideSectionVisible && <SideSection currentUrl={currentUrl} />}
        </>
      )}
      <Title>Nishmat Menashe Alon Pdf</Title>
      <Filter filters={filters} onInputChange={handleInputChange} />
      <MainWrapper>
        <MainSection filteredPdfData={filteredPdfData} handleDownloadClick={handleDownloadClick} />
        {!isMobile && <SideSection currentUrl={currentUrl} />}
      </MainWrapper>
    </Container>
  );
}
