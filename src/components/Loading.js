import React from 'react';
import styled from 'styled-components';


const Spinner = styled.div`
  border: 2px solid red; 
  border-top: 2px solid white;
  border-radius: 50%;
  width: ${({ size }) => size || '30px'}; 
  height: ${({ size }) => size || '30px'};
  animation: spin 1s linear infinite;

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;

// Loading component that accepts size as a prop
const Loading = ({ size }) => {
  return <Spinner size={size} />;
};

export default Loading;
