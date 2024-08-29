import React from 'react';
import { useLocation } from 'react-router-dom';
import QRCode from 'qrcode.react';
import styled from 'styled-components';
import PdfData from './PdfData';

const Container = styled.section`
  display: flex;
  justify-content: space-between;
  width: 100%;
  gap: 20px;
  padding: 20px;
  background-color: #f7f8fa;
`;

const Section = styled.section`
  border: 1px solid #ddd;
  background: white;
  padding: 20px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
`;

const MainSection = styled(Section)`
  width: 60%;
`;

const SideSection = styled(Section)`
  width: 30%;
`;

const QRContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
`;

const QRCodeFullWidth = styled(QRCode)`
  width: 100%;
  height: auto;
`;

const Title = styled.h2`
  text-align: center;
  color: #007bff;
  margin-top: 0;
  margin-bottom: 20px;
`;

const PdfTitle = styled.h3`
  margin-top: 0;
  color: #333;
  font-size: 1.2em;
`;

const PdfDetails = styled.p`
  margin: 5px 0;
  color: #555;
`;

const PdfLink = styled.a`
  display: block;
  margin-top: 10px;
  text-align: center;
  color: #007bff;
  text-decoration: none;
  font-weight: bold;
  &:hover {
    text-decoration: underline;
  }
`;

export default function Alon() {
  const location = useLocation();
  const currentUrl = window.location.origin + location.pathname;

  return (
    <Container>
      <SideSection>
        <Title>Volume List</Title>
        {PdfData.map((pdf) => (
          <div key={pdf.id}>
            <PdfTitle>Issue {pdf.issue}</PdfTitle>
            <PdfDetails>Volume: {pdf.volume}</PdfDetails>
            <PdfDetails>Parasha: {pdf.parasha}</PdfDetails>
            <PdfDetails>Year: {pdf.yearEn} - {pdf.yearHe}</PdfDetails>
            <PdfLink href={pdf.pdfUrl} target="_blank" rel="noopener noreferrer">
              View PDF
            </PdfLink>
          </div>
        ))}
      </SideSection>
      <MainSection>
        <QRContainer>
          <QRCodeFullWidth value={currentUrl} size={300} />
        </QRContainer>
        <Title>Nishmat Menashe Alon</Title>
      </MainSection>
    </Container>
  );
}
