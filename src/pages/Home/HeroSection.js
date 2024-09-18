import React from 'react';
import styled from 'styled-components';

const HeroContainer = styled.section`
  height: 100vh;
  background: url('/yesmalot.png') no-repeat center center/cover;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  text-align: center;
`;

const HeroText = styled.div`
  width: 100%;
  height: 100%;
  padding: 30px;
  box-sizing: border-box;
  background-color: rgba(0, 0, 0, 0.4);
  img{
    margin-top: 50px;
    width: 45%;
    height: auto;
  }
  @media (max-width: 768px) {
  img{
    margin-top: 50%;
    width: 90%;
  }
  }
`;
const ButtonContainer = styled.div`
margin-top: 50px;
@media (max-width: 768px) {
   margin-top: 40%;
  }
`
const Button = styled.button`
  margin: 10px;
  padding: 15px 30px;
  font-size: 1.5rem;
  font-weight: bold;
  color: white;
  background: transparent;
  border: 2px solid white;
  border-radius: 50px;
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
  z-index: 1;

  &:before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(255, 255, 255, 0.2);
    z-index: -1;
    transition: transform 0.3s ease;
    transform: scale(0);
    border-radius: 50px;
  }

  &:hover:before {
    transform: scale(1);
  }

  &:hover {
    color: black;
    background-color: white;
  }

  &:active {
    transform: scale(0.95);
  }

  &:focus {
    outline: none;
  }
`;

function HeroSection({ aboutUsRef}) {
  const scrollToSection = (ref) => {
    ref.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <HeroContainer>
      <HeroText>
       <img src='../nmlogo.png' alt='nishmat menashe'/>
        <ButtonContainer>
          <Button onClick={() => scrollToSection(aboutUsRef)}>About us </Button>
        </ButtonContainer>
      </HeroText>
    </HeroContainer>
  );
}

export default HeroSection;
