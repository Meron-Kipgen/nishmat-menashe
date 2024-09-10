import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';


const Container = styled.div`
 display: flex;
 flex-direction: column;
 height: 350px;
 width: 200px;
 background: white;
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


const PodcastCard = ({ id, title, description, thumbnail, rabbi, season, isComplete, played }) => {
  const navigate = useNavigate();

  const handleCardClick = () => {
    navigate(`/Audio/Podcast/${id}`);
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
