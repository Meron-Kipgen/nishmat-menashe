import React from 'react';
import styled from 'styled-components';

const ExploreContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  background: #007bff;
  border-radius: 30px;
  height: 30px;
  padding: 5px 10px;
  cursor: pointer;
  color: white;
`;

const ExploreBtn = ({ onClick }) => (
  <ExploreContainer onClick={onClick}>
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="icon icon-tabler icons-tabler-outline icon-tabler-components"
    >
      <path d="M3 12l3 3l3 -3l-3 -3z" />
      <path d="M15 12l3 3l3 -3l-3 -3z" />
      <path d="M9 6l3 3l3 -3l-3 -3z" />
      <path d="M9 18l3 3l3 -3l-3 -3z" />
    </svg>
    <span>Explore</span>
  </ExploreContainer>
);

export default ExploreBtn;
