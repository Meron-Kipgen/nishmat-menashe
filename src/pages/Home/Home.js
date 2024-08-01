import React from 'react';
import HeroSection from './HeroSection';
import MiddleSection from './MiddleSection';
import BottomSection from './BottomSection';
import styled from 'styled-components';
import AboutUs from './AboutUs';
import OurTeam from "./OurTeam"
const Container = styled.div`
  font-family: Arial, Helvetica, sans-serif;
`;

function Home() {
  return (
    <Container>
      <HeroSection />
      <AboutUs/>
      <MiddleSection />
      <BottomSection />
      <OurTeam/>
    </Container>
  );
}

export default Home;
