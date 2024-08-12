import React from 'react';
import styled from 'styled-components';

const Spinner = styled.div`
  border: 2px solid red; /* Light grey */
  border-top: 2px solid white; /* Blue */
  border-radius: 50%;
  width: 30px;
  height: 30px;
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

const Loading = () => {
  return <Spinner />;
};

export default Loading;
