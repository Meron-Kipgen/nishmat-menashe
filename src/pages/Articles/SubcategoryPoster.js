import React from "react";
import styled from "styled-components";

const subcategoryGradients = new Map();

const generateGradientForSubcategory = (subcategory) => {
  if (!subcategoryGradients.has(subcategory)) {
    const hash = hashCode(subcategory);
    const angle = hash % 360;
    const color1 = getColorFromHash(hash, 0);
    const color2 = getColorFromHash(hash, 1);
    const gradient = `linear-gradient(${angle}deg, ${color1}, ${color2})`;
    subcategoryGradients.set(subcategory, gradient);
  }
  return subcategoryGradients.get(subcategory);
};

const getColorFromHash = (hash, index) => {
  const hue = (hash + index * 100) % 360;
  return `hsl(${hue}, 70%, 60%)`;
};

const hashCode = (str) => {
  let hash = 0;
  if (str.length === 0) return hash;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash = hash & hash;
  }
  return Math.abs(hash);
};

const SubcategoryContainer = styled.div`
  height: 100px;
  background: ${({ subcategory }) => generateGradientForSubcategory(subcategory)};
  border-radius: 10px;
  color: white;
  font-size: 1.4rem;
  word-wrap: break-word;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  margin-bottom: 10px;
  backdrop-filter: blur(10px); /* Adjust blur effect */
  position: relative;
`;

const TextOverlay = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: white;
  font-size: 1.4rem;
  font-weight: bold;
  text-align: center;
`;

const SubcategoryPoster = ({ children, subcategory }) => {
  return (
    <SubcategoryContainer subcategory={subcategory}>
      <TextOverlay>{children}</TextOverlay>
    </SubcategoryContainer>
  );
};

export default SubcategoryPoster;
