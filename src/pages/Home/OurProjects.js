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

  h2 {
    margin-bottom: 40px;
    font-size: 2rem; /* Adjusted font size */
    color: #333;
  }
`;

const FeaturesRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center; /* Center items */
`;

const Feature = styled.div`
  flex: 0 1 30%;
  margin: 20px;
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

  @media (max-width: 768px) {
    flex: 0 1 45%; /* Adjust to 2 items per row */
  }

  @media (max-width: 480px) {
    flex: 0 1 100%; /* Adjust to 1 item per row */
  }
`;

const FeatureImage = styled.img`
  width: 70%;
  height: auto; 
  object-fit: cover;
  border-radius: 10px 10px 0 0;
  margin-top: -90px;
`;

const FeatureContent = styled.div`
  padding: 10px;
`;

const FeatureTitle = styled.h3`
  color: #333;
  font-size: 1.25rem; /* Adjusted font size */
`;

const FeatureText = styled.p`
  color: #777;
  font-size: 1rem; /* Adjusted font size */
`;

function OurProjects() {
  return (
    <MiddleContainer>
      <h2>Our Projects</h2>
      <FeaturesRow>
        <Feature>
          <FeatureImage src="../worldwide.gif" alt="Project One" />
          <FeatureContent>
            <FeatureTitle>Website</FeatureTitle>
            <FeatureText>Your website is a dynamic social network platform designed to foster connections and engagement among users through a variety of interactive features. It offers functionalities like posting, commenting, liking, and sharing, creating a vibrant community where users can express themselves and connect over shared interests. The platform also includes video components, allowing users to explore, watch, and interact with video content, including detailed pages for each video and related suggestions. With a modern design and user-friendly interface, your website provides a seamless experience, encouraging active participation and content discovery.</FeatureText>
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

export default OurProjects;
