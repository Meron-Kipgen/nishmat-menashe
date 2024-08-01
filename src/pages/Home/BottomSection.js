import React from 'react';
import styled from 'styled-components';

const BottomContainer = styled.section`
  padding: 50px 20px;
  background-color: #f8f8f8;
  text-align: center;
`;

const CallToAction = styled.button`
  padding: 10px 20px;
  font-size: 16px;
  color: white;
  background-color: #007bff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  &:hover {
    background-color: #0056b3;
  }
`;

function BottomSection() {
  return (
    <BottomContainer>
      <h2>Ready to Get Started?</h2>
      <CallToAction>Join Now</CallToAction>
    </BottomContainer>
  );
}

export default BottomSection;
