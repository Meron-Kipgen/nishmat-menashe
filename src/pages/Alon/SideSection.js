import React from "react";
import styled from "styled-components";
import QRCode from "qrcode.react";

const Section = styled.section`

  width: 30%;

  @media (max-width: 768px) {
    width: 100%;
    display: flex;
    justify-content: center;
    flex-direction: column-reverse;
    gap: 20px;
  }
`;

const QRContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 20px;

  @media (max-width: 768px) {
    margin-bottom: 10px;
  }
`;

const QRCodeFullWidth = styled(QRCode)`
  width: 100%;
  height: auto;

  @media (max-width: 768px) {
    width: 70%;
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

export default function SideSection({ currentUrl }) {
  return (
    <Section>
      <QRContainer>
        <QRCodeFullWidth value={currentUrl} size={300} />
      </QRContainer>
      <Title>Share and Save QR Code</Title>
    </Section>
  );
}
