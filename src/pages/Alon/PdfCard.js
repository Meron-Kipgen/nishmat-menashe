import React from "react";
import styled from "styled-components";

const Thumbnail = styled.div`
  border-radius: 10px;
  overflow: hidden; /* Ensures that the image does not overflow the border-radius */
  transition: transform 0.3s ease; /* Smooth scaling transition */

  img {
    height: 120px;
    width: 120px;
    transition: transform 0.3s ease; /* Smooth scaling transition for the image */
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
  position: relative; /* Ensure to position the container for the hover effect to work */
  
  &:hover ${Thumbnail},
  &:focus-within ${Thumbnail} {
    transform: scale(1.1); /* Scale up the thumbnail */
  }
`;

const InfoSection = styled.div`
  /* Additional styling for InfoSection if needed */
`;

const DownloadBtn = styled.div`
  margin-top: 5px;
  display: flex;
  justify-content: center;
  width: 100px;
  background: #142B42;
  padding: 5px;
  color: white;
  border-radius: 40px;
`;

export default function PdfCard({ volume, parasha, yearHe, yearEn, download, issue }) {
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
        <DownloadBtn onClick={download}>Download</DownloadBtn>
      </InfoSection>
    </Container>
  );
}
