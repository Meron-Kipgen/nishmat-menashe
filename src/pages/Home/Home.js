import React, { useRef } from 'react';
import HeroSection from './HeroSection';
import styled from 'styled-components';
import AboutUs from './AboutUs';
import OurProjects from './OurProjects';


const Container = styled.div`
  font-family: Arial, Helvetica, sans-serif;
`;

function Home() {
  const aboutUsRef = useRef(null);
  const ourProjectRef = useRef(null);

  return (
    <Container>
      <HeroSection aboutUsRef={aboutUsRef} ourProjectRef={ourProjectRef} />
      <div ref={aboutUsRef}>
        <AboutUs />
      </div>
      <div ref={ourProjectRef}>
        <OurProjects />
      </div>

    </Container>
  );
}

export default Home;
