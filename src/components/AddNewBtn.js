import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  background: #9e6605;
  height: 45px;
  padding: 5px;
  cursor: pointer;
  color: white;
  white-space: nowrap; 
`;

const Icon = styled.svg`
  width: 35px;
  height: 35px;
  fill: currentColor;
`;

const ExploreBtn = ({ onClick }) => (
  <Container onClick={onClick}>
    <Icon xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
      <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
      <path d="M4.929 4.929a10 10 0 1 1 14.141 14.141a10 10 0 0 1 -14.14 -14.14zm8.071 4.071a1 1 0 1 0 -2 0v2h-2a1 1 0 1 0 0 2h2v2a1 1 0 1 0 2 0v-2h2a1 1 0 1 0 0 -2h-2v-2z" />
    </Icon>
  </Container>
);

export default ExploreBtn;
