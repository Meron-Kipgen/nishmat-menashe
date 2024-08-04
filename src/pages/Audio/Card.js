import React from 'react';
import styled from 'styled-components';

const CardContainer = styled.div`
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  max-width: 600px;
  margin: 10px;
  padding: 15px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Title = styled.h3`
  margin: 0 0 10px;
  font-size: 18px;
  color: #333;
`;

const Description = styled.p`
  margin: 0 0 15px;
  color: #666;
  font-size: 14px;
  text-align: center;
`;

const PlayButton = styled.button`
  margin-top: 10px;
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

const Card = ({ title, description, audioId, onPlay }) => (
  <CardContainer>
    <Title>{title}</Title>
    <Description>{description}</Description>
    <PlayButton onClick={() => onPlay(audioId)}>Play</PlayButton>
  </CardContainer>
);

export default Card;
