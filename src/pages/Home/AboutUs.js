import React from 'react';
import styled from 'styled-components';

const AboutContainer = styled.section`
  padding: 50px 20px;
  background-color: #fff;
  text-align: center;
  color: #333;
`;

const AboutContent = styled.div`
  max-width: 800px;
  margin: 0 auto;
`;

const AboutTitle = styled.h2`
  font-size: 2.5em;
  margin-bottom: 20px;
`;

const AboutText = styled.p`
  font-size: 1.2em;
  line-height: 1.6;
`;

function AboutUs() {
  return (
    <AboutContainer>
      <AboutContent>
        <AboutTitle>About Us</AboutTitle>
        <AboutText>
          We are a team dedicated to providing the best services to our clients.
          Our mission is to deliver high-quality projects that exceed expectations.
          With years of experience and a passion for excellence, we strive to make a
          positive impact in everything we do. Join us on our journey to success.
        </AboutText>
      </AboutContent>
    </AboutContainer>
  );
}

export default AboutUs;
