import React from 'react';
import styled from 'styled-components';

const ExploreContainer = styled.div`
display: flex;
  cursor: pointer;
align-items: center;
background: white;
height: 45px;
`;



const ExploreBtn = ({ onClick }) => (
  <ExploreContainer onClick={onClick}>
<svg height="40" viewBox="0 0 48 48" width="40" xmlns="http://www.w3.org/2000/svg"><path d="M24 21.8c-1.21 0-2.2.99-2.2 2.2s.99 2.2 2.2 2.2c1.22 0 2.2-.99 2.2-2.2s-.98-2.2-2.2-2.2zm0-17.8c-11.05 0-20 8.95-20 20 0 11.04 8.95 20 20 20s20-8.96 20-20c0-11.05-8.95-20-20-20zm4.38 24.38l-16.38 7.62 7.62-16.38 16.38-7.62-7.62 16.38z"/><path d="M0 0h48v48h-48z" fill="none"/></svg>
  </ExploreContainer>
);

export default ExploreBtn;
