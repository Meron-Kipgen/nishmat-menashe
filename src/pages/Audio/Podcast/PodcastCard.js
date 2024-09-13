import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';


const Container = styled.div`
 display: flex;
 flex-direction: column;
 height: 350px;
 width: 240px;
 background: white;
 padding: 10px;
 border-radius: 8px;
 
 @media (max-width: 768px) {
  width: 45%;
  height: 320px;
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
  padding-top: 10px;
  font-size: 16px;
  color: #333;
  height: auto;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
`;

const Description = styled.p`
  margin: 0;
  color: #666;
  font-size: 15px;
  height: auto;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  @media (max-width: 768px) {
    height: auto;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  }
`;
const InfoContainer = styled.div`
display: flex;
flex-direction: column;
padding-top: 10px;
align-items: flex-start;
`
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
      <InfoContainer>
        <Info>Rabbi: {rabbi}</Info>
      <Info>Season: {season}</Info>
      <Info>Played: {played}</Info>
      <Info>Status: {isComplete ? 'Completed' : 'Running'}</Info>
      </InfoContainer>
      
    </Container>
  );
};

export default PodcastCard;
