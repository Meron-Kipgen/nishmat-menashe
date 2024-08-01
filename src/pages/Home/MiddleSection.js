import React from 'react';
import styled, { keyframes } from 'styled-components';

const fadeInUp = keyframes`
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const MiddleContainer = styled.section`
  padding: 50px 20px;
  text-align: center;
  background-color: #f9f9f9;
`;

const FeaturesRow = styled.div`
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
`;

const Feature = styled.div`
  flex: 0 1 30%;
  margin: 20px 10px;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 10px;
  background-color: #fff;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s, box-shadow 0.3s;
  animation: ${fadeInUp} 0.5s ease-out;

  &:hover {
    transform: translateY(-10px);
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
  }
`;

const FeatureImage = styled.img`
  width: 100%;
  height: 200px;
  object-fit: cover;
  border-radius: 10px 10px 0 0;
`;

const FeatureContent = styled.div`
  padding: 10px;
`;

const FeatureTitle = styled.h3`
  color: #333;
`;

const FeatureText = styled.p`
  color: #777;
`;

function MiddleSection() {
  return (
    <MiddleContainer>
      <h2>Our Projects</h2>
      <FeaturesRow>
        <Feature>
          <FeatureImage src="https://via.placeholder.com/300" alt="Project One" />
          <FeatureContent>
            <FeatureTitle>Project One</FeatureTitle>
            <FeatureText>Website</FeatureText>
          </FeatureContent>
        </Feature>
        <Feature>
          <FeatureImage src="https://via.placeholder.com/300" alt="Project Two" />
          <FeatureContent>
            <FeatureTitle>Project Two</FeatureTitle>
            <FeatureText>Weekly Alon</FeatureText>
          </FeatureContent>
        </Feature>
        <Feature>
          <FeatureImage src="https://via.placeholder.com/300" alt="Project Three" />
          <FeatureContent>
            <FeatureTitle>Project Three</FeatureTitle>
            <FeatureText>Books</FeatureText>
          </FeatureContent>
        </Feature>
      </FeaturesRow>
    </MiddleContainer>
  );
}

export default MiddleSection;
