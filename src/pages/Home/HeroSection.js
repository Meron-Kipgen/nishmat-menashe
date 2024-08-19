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
  width: 90%;
  max-width: 1200px;
  height: auto;
  background-color: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(3px);
  padding: 70px;
  box-sizing: border-box;

  h1 {
    font-size: 4rem; /* Adjusted size for better responsiveness */
    margin: 0;
  }

  p {
    font-size: 1.5rem; /* Adjusted size for better readability on mobile */
    margin: 20px 0 0;
  }

  @media (max-width: 768px) {
    padding: 40px;
    
    h1 {
      font-size: 2.5rem; /* Smaller font size for mobile */
    }

    p {
      font-size: 1rem; /* Smaller font size for mobile */
    }
  }

  @media (max-width: 480px) {
    padding: 20px;
    
    h1 {
      font-size: 1.5rem; /* Even smaller font size for very small screens */
    }

    p {
      font-size: 0.875rem; /* Even smaller font size for very small screens */
    }
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
