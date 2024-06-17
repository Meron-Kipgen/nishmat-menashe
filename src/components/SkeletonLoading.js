import React from "react";
import styled, { keyframes } from "styled-components";

// Keyframe animation for loading effect
const loadingAnimation = keyframes`
  0% { background-position: -200px 0; }
  100% { background-position: calc(200px + 100%) 0; }
`;

// Styled component for the skeleton loading
const SkeletonLoadingWrapper = styled.div`
  background-color: #f0f0f0;
  border-radius: 5px;
  padding: 20px;
  margin-bottom: 20px;
`;

const SkeletonHeader = styled.div`
  width: 100%;
  height: 30px;
  background: linear-gradient(to right, #dcdcdc 8%, #e0e0e0 18%, #dcdcdc 33%);
  background-size: 800px 104px;
  animation: ${loadingAnimation} 1.5s infinite;
  margin-bottom: 20px;
`;

const SkeletonContent = styled.div`
  width: 100%;
  height: 15px;
  background: linear-gradient(to right, #dcdcdc 8%, #e0e0e0 18%, #dcdcdc 33%);
  background-size: 800px 104px;
  animation: ${loadingAnimation} 1.5s infinite;
  margin-bottom: 10px;
`;

const SkeletonLoading = () => {
  return (
    <SkeletonLoadingWrapper>
      <SkeletonHeader />
      <SkeletonContent />
      <SkeletonContent />
      <SkeletonContent />
      <SkeletonContent />
    </SkeletonLoadingWrapper>
  );
};

export default SkeletonLoading;
