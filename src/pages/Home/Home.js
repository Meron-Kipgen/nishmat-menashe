import React, { useRef } from 'react';
import HeroSection from './HeroSection';
import styled from 'styled-components';
import AboutUs from './AboutUs';


const Container = styled.div`
  font-family: Arial, Helvetica, sans-serif;
`;

function Home() {
  const aboutUsRef = useRef(null);


  return (
    <Container>
      <HeroSection aboutUsRef={aboutUsRef}/>
      <div ref={aboutUsRef}>
        <AboutUs />
      </div>
    </Container>
  );
}

export default Home;
