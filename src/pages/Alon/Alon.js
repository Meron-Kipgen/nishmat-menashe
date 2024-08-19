// Alon.js
import React from 'react';
import { useLocation } from 'react-router-dom';
import QRCode from 'qrcode.react';
import styled from 'styled-components';
import PdfData from './PdfData';
import PdfViewer from './PdfViewer';

const Container = styled.section`
  display: flex;
  justify-content: center;
  width: 100%;
  gap: 40px;
  padding: 20px;
  background-color: #f7f8fa;
`;

const MainSection = styled.section`
  width: 900px;
  border: 1px solid #ddd;
  background: white;
  padding: 20px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
`;

const LeftSection = styled.section`
  width: 200px;
  border: 1px solid #ddd;
  background: #fff;
  padding: 20px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
`;

const RightSection = styled.section`
  width: 300px;
  border: 1px solid #ddd;
  background: white;
  padding: 20px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
`;

const QRContainer = styled.div`
  width: 100%;
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
`;

const PdfTitle = styled.h3`
  margin-top: 0;
  color: #333;
`;

const PdfLink = styled.a`
  display: block;
  margin-top: 20px;
  text-align: center;
  color: #007bff;
  text-decoration: none;
  &:hover {
    text-decoration: underline;
  }
`;

export default function Alon() {
  const location = useLocation();
  const currentUrl = window.location.origin + location.pathname;

  return (
    <Container>
      <LeftSection>
        <Title>Year</Title>
      </LeftSection>
      <MainSection>
        {PdfData.map((pdf) => (
          <div key={pdf.id}>
            <PdfTitle>Issue {pdf.issue}</PdfTitle>
            <p>Year: {pdf.yearEn} - {pdf.yearHe}</p>
            <PdfViewer url={pdf.pdfUrl} />
          </div>
        ))}
      </MainSection>
      <RightSection>
        <QRContainer>
          <QRCodeFullWidth value={currentUrl} size={300} />
        </QRContainer>
        <Title>Nishmat Menashe Alon</Title>
      </RightSection>
    </Container>
  );
}
