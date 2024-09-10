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

const animateImage = keyframes`
  0% { transform: scale(1); }
  50% { transform: scale(1.1); }
  100% { transform: scale(1); }
`;

const MiddleContainer = styled.section`
  padding: 50px 20px;
  text-align: center;
  background-color: #f9f9f9;

  h2 {
    margin-bottom: 40px;
    font-size: 2rem;
    color: #333;
  }
`;

const FeaturesRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
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

    img {
      animation: ${animateImage} 1s infinite; /* Trigger animation on hover */
    }
  }

  @media (max-width: 768px) {
    flex: 0 1 45%;
  }

  @media (max-width: 480px) {
    flex: 0 1 100%;
  }
`;

const FeatureImage = styled.img`
  width: 70%;
  height: auto; 
  object-fit: cover;
  border-radius: 10px 10px 0 0;

  transition: transform 0.3s; /* Smooth transition for the hover effect */

  /* Animation only on hover */
  animation: none;
`;

const FeatureContent = styled.div`
  padding: 10px;
`;

const FeatureTitle = styled.h3`
  color: #333;
  font-size: 1.25rem;
`;

const FeatureText = styled.p`
  color: #777;
  font-size: 1rem;
`;

function OurProjects() {
  return (
    <MiddleContainer>
      <h2>Our Projects</h2>
      <FeaturesRow>
        <Feature>
          <FeatureImage src="../animatedIcons/website.webp" alt="Website" />
          <FeatureContent>
            <FeatureTitle>Website</FeatureTitle>
            <FeatureText>Your website is a dynamic social network platform designed to foster connections and engagement among users through a variety of interactive features. It offers functionalities like posting, commenting, liking, and sharing, creating a vibrant community where users can express themselves and connect over shared interests. The platform also includes video components, allowing users to explore, watch, and interact with video content, including detailed pages for each video and related suggestions. With a modern design and user-friendly interface, your website provides a seamless experience, encouraging active participation and content discovery.</FeatureText>
          </FeatureContent>
        </Feature>
        <Feature>
          <FeatureImage src="../animatedIcons/alon.webp" alt="alon" />
          <FeatureContent>
            <FeatureTitle>Project Two</FeatureTitle>
            <FeatureText>Weekly Alon</FeatureText>
          </FeatureContent>
        </Feature>
        <Feature>
          <FeatureImage src="../animatedIcons/books.webp" alt="books" />
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
