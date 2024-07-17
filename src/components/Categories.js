import React from "react";
import styled from "styled-components";

const CategoryContainer = styled.div`
  margin-right: 20px;
  background: rgba(255, 255, 255, 0.15); /* Semi-transparent white */
  backdrop-filter: blur(80px); /* Blur effect */
  padding-top: 10px;
  width: 300px;
  position: relative; /* Ensure relative positioning for absolute positioning of close button */
`;

const CloseButton = styled.span`
  position: absolute;
  top: 5px;
  right: 10px;
  cursor: pointer;
  color: #fff;
  font-size: 1.2rem;
  background: grey;
  padding: 5px 10px;
  border-radius: 50%;
`;

const CategoryItem = styled.div`
  font-weight: bold;
  margin-bottom: 10px;
  cursor: pointer;
  width: 300px;
  padding: 8px 16px;
  background-color: ${props => (props.active ? "rgba(0, 123, 255, 0.8)" : "transparent")}; /* Semi-transparent blue when active */
  color: ${props => (props.active ? "#fff" : "#333")}; /* White text when active */
  border-radius: 5px;
  transition: background-color 0.3s, color 0.3s;

  &:hover {
    background-color: ${props =>
      props.active ? "rgba(0, 123, 255, 0.8)" : "rgba(240, 240, 240, 0.3)"};
    /* Light blue or light grey on hover */
    color: ${props => (props.active ? "#fff" : "#007bff")}; /* White text or blue on hover */
  }
`;

const Categories = ({
  categories,
  selectedCategory,
  setSelectedCategory,
  onClose
}) => {
  const handleCategoryClick = category => {
    if (category !== selectedCategory) {
      setSelectedCategory(category);
    } else {
      setSelectedCategory(null);
    }
  };

  return (
    <CategoryContainer>
      <CloseButton onClick={onClose}>x</CloseButton>
      <h2>Categories</h2>
      <CategoryItem
        onClick={() => {
          setSelectedCategory(null);
        }}
        active={selectedCategory === null}
      >
        All
      </CategoryItem>
      {categories.map((category, index) => (
        <CategoryItem
          key={index}
          onClick={() => handleCategoryClick(category)}
          active={selectedCategory === category}
        >
          {category}
        </CategoryItem>
      ))}
    </CategoryContainer>
  );
};

export default Categories;
