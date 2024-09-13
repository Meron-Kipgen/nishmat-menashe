import React, { useContext, useState } from "react";
import styled from "styled-components";
import { useLocation } from "react-router-dom";

import Filter from "./Filter";
import MainSection from "./MainSection";
import SideSection from "./SideSection";
import useMediaQuery from "../../hooks/useMediaQuery";
import AddNewForm from "./AddNewForm";
import { usePdfData } from "./usePdfData";
import { UserContext } from "../../contexts/UserContext";

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

const AddNewButton = styled.div`
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  right: 0;
  margin-right: 30px;
  background-color: #28a745;
  color: white;
  font-size: 1rem;
  width: 120px;
  height: 50px;
  border-radius: 30px;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);

  &:hover {
    background-color: #218838;
    transform: scale(1.05);
    box-shadow: 0 6px 8px rgba(0, 0, 0, 0.15);
  }

  &:active {
    transform: scale(0.98);
    box-shadow: 0 3px 5px rgba(0, 0, 0, 0.1);
  }
  
  @media (max-width: 768px) {
    top: 50px;
    margin-right: 10px;
    height: 40px;
  }
`;

const ToggleButton = styled.div`
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  left: 0;
  top: 50px;
  margin-left: 10px;
  background-color: #28a745;
  color: white;
  font-size: 1rem;
  width: 120px;
  height: 40px;
  border-radius: 30px;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);

  &:hover {
    background-color: #218838;
    transform: scale(1.05);
    box-shadow: 0 6px 8px rgba(0, 0, 0, 0.15);
  }

  &:active {
    transform: scale(0.98);
    box-shadow: 0 3px 5px rgba(0, 0, 0, 0.1);
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
    margin-top: 60px;
  }
`;

const MainWrapper = styled.section`
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-end;
`;

export default function Alon() {
  const { pdfData } = usePdfData();
  const [filters, setFilters] = useState({
    volume: "",
    issue: "",
    parasha: "",
  });
  const [isSideSectionVisible, setSideSectionVisible] = useState(false);
  const [addnew, setAddnew] = useState(false);
  const location = useLocation();
  const currentUrl = window.location.origin + location.pathname;
  const isMobile = useMediaQuery("(max-width: 768px)");
  const { isAdmin } = useContext(UserContext);

  const handleInputChange = e => {
    const { name, value } = e.target;
    setFilters(prevFilters => ({
      ...prevFilters,
      [name]: value,
    }));
  };

  const handleDownloadClick = pdfUrl => {
    const link = document.createElement("a");
    link.href = pdfUrl;
    link.setAttribute("download", "");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Ensure pdfData is defined before filtering and sorting
  const filteredPdfData =
    pdfData
      ?.filter(pdf => {
        return (
          (filters.volume === "" || pdf.volume.toString().includes(filters.volume)) &&
          (filters.issue === "" || pdf.issue.toString().includes(filters.issue)) &&
          (filters.parasha === "" || pdf.parasha.toLowerCase().includes(filters.parasha.toLowerCase()))
        );
      })
      .sort((a, b) => new Date(b.$createdAt) - new Date(a.$createdAt)) || [];

  const toggleSideSection = () => {
    setSideSectionVisible(prev => !prev);
  };

  const addnewtoggle = () => {
    setAddnew(prev => !prev);
  };

  return (
    <Container>
      {isAdmin && <AddNewButton onClick={addnewtoggle}>Add New</AddNewButton>}
     
      {addnew && <AddNewForm onCancel={() => setAddnew(false)} />}

      {isMobile && (
        <>
          <ToggleButton onClick={toggleSideSection}>
            {isSideSectionVisible ? "Hide QR" : "Show QR"}
          </ToggleButton>
          {isSideSectionVisible && <SideSection currentUrl={currentUrl} />}
        </>
      )}
      <Title>Nishmat Menashe Alon Pdf</Title>
      <Filter filters={filters} onInputChange={handleInputChange} />
      <MainWrapper>
        <MainSection
          filteredPdfData={filteredPdfData}
          handleDownloadClick={handleDownloadClick}
        />
        {!isMobile && <SideSection currentUrl={currentUrl} />}
      </MainWrapper>
    </Container>
  );
}
