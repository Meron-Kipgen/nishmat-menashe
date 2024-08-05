import React from 'react';
import styled from 'styled-components';

const ExploreContainer = styled.div`
  margin-left: 30px;
  cursor: pointer;
  margin-top: 5px;
  perspective: 1000px; 
`;

const StyledSVG = styled.svg`
  width: 30px;
  height: 35px;
  vertical-align: middle;
  fill: white;
  overflow: hidden;
  transition: transform 0.6s; 
  transform-style: preserve-3d; 
  transform: ${({ flipped }) => (flipped ? 'rotateY(180deg)' : 'rotateY(0deg)')}; 
`;

const ExploreBtn = ({ onClick, flipped }) => (
  <ExploreContainer onClick={onClick}>
    <StyledSVG flipped={flipped} viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg">
      <path d="M127.6 259h768.9c35.4 0 64.1-28.7 64.1-64.1s-28.7-64.1-64.1-64.1H127.6c-35.4 0-64.1 28.7-64.1 64.1S92.2 259 127.6 259zM896.4 765H127.6c-35.4 0-64.1 28.7-64.1 64.1s28.7 64.1 64.1 64.1h768.9c35.4 0 64.1-28.7 64.1-64.1S931.8 765 896.4 765zM127.6 576.1H512c35.4 0 64.1-28.7 64.1-64.1s-28.7-64-64.1-64H127.6c-35.4 0-64.1 28.7-64.1 64.1s28.7 64 64.1 64zM938.8 477l-159.1-88.4c-28.2-15.6-62.8 4.7-62.7 36.9v176.7c0 32.2 34.6 52.6 62.8 36.9l159.1-88.4c28.8-15.9 28.8-57.6-0.1-73.7z"/>
    </StyledSVG>
  </ExploreContainer>
);

export default ExploreBtn;
