import React from 'react';
import styled from 'styled-components';

// Container for the Podcast
const Container = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  background: #fff;
  border-radius: 8px;

  overflow: hidden;

  margin: 10px;
height:300px;
width: 200px;
max-width: 200px;
  padding: 15px;
  gap: 15px;
`;

// Thumbnail container
const Thumbnail = styled.div`
  flex: 0 0 auto;
  width: 120px;
  height: 120px;
  background: #ddd;
  border-radius: 8px;
  overflow: hidden;
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

const Podcast = ({ title, description, thumbnailUrl }) => (
  <Container>
  
      <ThumbnailImage src={thumbnailUrl} alt={`${title} thumbnail`} />

      <Title>{title}</Title>
      <Description>{description}</Description>
      

  </Container>
);

export default Podcast;
