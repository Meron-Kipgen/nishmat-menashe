import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

// Styled components for PodcastCard
const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background: #ffffff;
  border-radius: 12px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  margin: 15px;
  width: 230px; /* Default width for desktop */
  max-width: 100%;
  padding: 20px;
  gap: 10px;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  cursor: pointer;

  @media (max-width: 768px) {
    width: 300px; /* Full width on smaller screens */
    /* Maximum width on smaller screens */
    flex-direction: column; /* Ensure items stack vertically */
    padding: 10px; /* Adjust padding for mobile */
  }

  @media (max-width: 480px) {
    width: 100%; /* Full width on very small screens */
    max-width: 100%; /* Ensures full width is used */
    padding: 8px; /* Smaller padding for very small screens */
  }

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
  }
`;

const ThumbnailImage = styled.img`
  width: 100%;
  height: 150px;
  object-fit: cover;
  border-radius: 8px;
`;

const Title = styled.h3`
  margin: 0;
  font-size: 20px;
  color: #333;
  font-family: 'Arial', sans-serif;
`;

const Description = styled.p`
  margin: 0;
  color: #666;
  font-size: 15px;
  font-family: 'Arial', sans-serif;
  text-align: center;
`;

const Info = styled.p`
  margin: 0;
  font-size: 14px;
  color: #444;
  font-family: 'Arial', sans-serif;
  text-align: center;
`;

const EpisodeInfo = styled.p`
  margin: 0;
  font-size: 14px;
  color: #333;
  font-family: 'Arial', sans-serif;
  text-align: center;
  font-weight: bold;
`;

// PodcastCard component
const PodcastCard = ({ id, title, description, thumbnail, rabbi, season, isComplete, played }) => {
  const navigate = useNavigate();

  const handleCardClick = () => {
    navigate(`podcast/${id}`);
  };

  return (
    <Container onClick={handleCardClick}>
      <ThumbnailImage src={thumbnail} alt={`${title} thumbnail`} />
      <Title>{title}</Title>
      <Description>{description}</Description>
      <Info>Rabbi: {rabbi}</Info>
      <Info>Season: {season}</Info>
      <Info>Played: {played}</Info>
      <Info>Status: {isComplete ? 'Completed' : 'Running'}</Info>
    </Container>
  );
};

export default PodcastCard;
