import React from "react";
import styled from "styled-components";
import PdfCard from "./PdfCard";


const Section = styled.section`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  width: 60%;

  @media (max-width: 768px) {
    width: 100%;
  }
`;

export default function MainSection({ filteredPdfData, handleDownloadClick }) {
  return (
    <Section>
      {filteredPdfData.map((pdf) => (
        <PdfCard
          key={pdf.$id}
          volume={pdf.volume}
          issue={pdf.issue}
          parasha={pdf.parasha}
          yearHe={pdf.yearHe}
          yearEn={pdf.yearEn}
          download={() => handleDownloadClick(pdf.pdfUrl)}
          pdfUrl={pdf.pdfUrl}
          pdfId={pdf.$id}
        />
      ))}
    </Section>
  );
}
