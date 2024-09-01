import React from "react";
import styled from "styled-components";

const Thumbnail = styled.div`
  border-radius: 10px;
  overflow: hidden;
  transition: transform 0.3s ease;

  img {
    height: 120px;
    width: 120px;
    transition: transform 0.3s ease;
  }
`;

const Container = styled.div`
  display: flex;
  gap: 20px;
  align-items: center;
  width: 400px;
  border: 1px solid #ddd;
  background: white;
  padding: 20px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  margin-bottom: 10px;
  position: relative;

  &:hover ${Thumbnail},
  &:focus-within ${Thumbnail} {
    transform: scale(1.1);
  }
  
  @media (max-width: 600px) {
    width: 100%;
  }
`;

const InfoSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const ButtonWrapper = styled.div`
  display: flex;
  gap: 10px;
`;

const DownloadBtn = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100px;
  background: #142b42;
  padding: 5px;
  color: white;
  border-radius: 40px;
  cursor: pointer;
  text-align: center;
`;

const ShareBtn = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100px;
  background: #007bff;
  padding: 5px;
  color: white;
  border-radius: 40px;
  cursor: pointer;
  text-align: center;
`;

export default function PdfCard({ volume, parasha, yearHe, yearEn, pdfUrl, issue }) {
  const handleShareClick = () => {
    if (navigator.share) {
      navigator.share({
    
        url: pdfUrl,
      }).catch(console.error);
    } else {
      alert("This browser doesn't support the Share API. Copy this link to share: " + pdfUrl);
    }
  };

  return (
    <Container>
      <Thumbnail>
        <img src="../alon.png" alt="Thumbnail" />
      </Thumbnail>
      <InfoSection>
        <h1>Vol.{volume} Issue.{issue}</h1>
        <h2>Parasha: {parasha}</h2>
        <p>
          Year: {yearHe} - {yearEn}
        </p>
        <ButtonWrapper>
          <DownloadBtn onClick={() => window.location.href = pdfUrl}>Download</DownloadBtn>
          <ShareBtn onClick={handleShareClick}>Share</ShareBtn>
        </ButtonWrapper>
      </InfoSection>
    </Container>
  );
}
