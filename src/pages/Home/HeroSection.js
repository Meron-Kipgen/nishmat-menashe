import React from 'react';
import styled from 'styled-components';

const HeroContainer = styled.section`
  height: 100vh;
  background: url('/yesmalot.jpg') no-repeat center center/cover;
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  text-align: center;
`;

const HeroText = styled.div`
 width: 100%;
 height: 100%;
background-color: rgba(0, 0, 0, 0.5);
backdrop-filter: blur(3px);
  padding: 70px;

  h1{
    font-size: 8rem;
  }
`;

function HeroSection() {
  return (
    <HeroContainer>
      <HeroText>
        <h1>Kahinlem uve</h1>
        <p>Your success starts here. Join us and achieve your goals!</p>
      </HeroText>
    </HeroContainer>
  );
}

export default HeroSection;
