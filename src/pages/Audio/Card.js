import React from 'react';
import styled from 'styled-components';

// Container for the card
const CardContainer = styled.div`
  display: flex;
  background: #fff;
  border-radius: 8px;
  width: 440px;
  height: 150px;
  margin: 10px;
  padding: 15px;
`;

// Thumbnail container
const Thumbnail = styled.div`
  width: 120px;
  height: 120px;
  background: #ddd;
  border-radius: 8px;
  overflow: hidden;
  margin-right: 10px;
`;

// Thumbnail image
const ThumbnailImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

// Content container
const Content = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

// Title
const Title = styled.h3`
  margin: 0 0 10px;
  font-size: 18px;
  color: #333;
`;

// Description
const Description = styled.p`
  margin: 0 0 15px;
  color: #666;
  font-size: 14px;
`;

// Play button
const PlayButton = styled.button`
  padding: 10px 20px;
  background: #007bff;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background: #0056b3;
  }
`;

const Card = ({ title, description, audioId, onPlay, thumbnailUrl }) => (
  <CardContainer>
    <Thumbnail>
      <ThumbnailImage src={thumbnailUrl} alt={`${title} thumbnail`} />
    </Thumbnail>
    <Content>
      <Title>{title}</Title>
      <Description>{description}</Description>
      <PlayButton onClick={() => onPlay(audioId)}>Play</PlayButton>
    </Content>
  </CardContainer>
);

export default Card;
