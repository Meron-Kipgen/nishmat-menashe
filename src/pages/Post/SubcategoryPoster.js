import React, { useEffect } from "react";
import styled from "styled-components";
import postData from "./postData";

// Extract unique subcategories from postData
const subcategories = [...new Set(postData.map(item => item.subcategory))];

// Function to retrieve gradients from localStorage or generate new ones
const getStoredGradientForSubcategory = (subcategory) => {
  const storedGradients = JSON.parse(localStorage.getItem("subcategoryGradients")) || {};
  if (storedGradients[subcategory]) {
    return storedGradients[subcategory];
  } else {
    const newGradient = generateRandomGradient();
    storedGradients[subcategory] = newGradient;
    localStorage.setItem("subcategoryGradients", JSON.stringify(storedGradients));
    return newGradient;
  }
};

// Function to generate random linear gradient with reduced opacity
const generateRandomGradient = () => {
  const angle = Math.random() * 360;
  const color1 = getRandomColor();
  const color2 = getRandomColor();
  // Adjust opacity (last value in rgba) to make it less opaque
  return `linear-gradient(${angle}deg, rgba(${hexToRgb(color1)}, 0.5), rgba(${hexToRgb(color2)}, 0.3))`;
};

// Function to convert hexadecimal color to rgb
const hexToRgb = (hex) => {
  const bigint = parseInt(hex.slice(1), 16);
  const r = (bigint >> 16) & 255;
  const g = (bigint >> 8) & 255;
  const b = bigint & 255;
  return `${r}, ${g}, ${b}`;
};

// Function to generate random color
const getRandomColor = () => {
  const letters = "0123456789ABCDEF";
  let color = "#";
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
};

// Styled component for the subcategory container with linear gradient
const SubcategoryContainer = styled.div`
  height: 100px;
  background: ${({ subcategory }) => getStoredGradientForSubcategory(subcategory)};
  border-radius: 10px;
  color: white;
  font-size: 1.4rem;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  margin-bottom: 10px;
`;

// SubcategoryPoster component
const SubcategoryPoster = ({ children, subcategory }) => {
  // UseEffect to ensure localStorage is initialized on component mount
  useEffect(() => {
    if (!localStorage.getItem("subcategoryGradients")) {
      localStorage.setItem("subcategoryGradients", JSON.stringify({}));
    }
  }, []);

  return <SubcategoryContainer subcategory={subcategory}>{children}</SubcategoryContainer>;
};

export default SubcategoryPoster;
