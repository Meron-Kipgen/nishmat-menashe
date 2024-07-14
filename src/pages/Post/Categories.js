import React from "react";
import styled from "styled-components";

const CategoryContainer = styled.div`
  margin-right: 20px;
  background: grey;
  padding-top: 10px;
  width: 300px;
  h2 {
    margin: 0 10px;
    font-size: 1rem;
    padding-bottom: 5px;
  }
`;

const CategoryItem = styled.div`
  font-weight: bold;
  margin-bottom: 10px;
  cursor: pointer;
  width: 300px;
  padding: 8px 16px;
  background-color: ${props => (props.active ? "#007bff" : "transparent")};
  color: ${props => (props.active ? "#fff" : "#333")};
  transition: background-color 0.3s, color 0.3s;

  &:hover {
    background-color: ${props => (props.active ? "#007bff" : "#f0f0f0")};
    color: ${props => (props.active ? "#fff" : "#007bff")};
  }
`;

const Categories = ({ categories, selectedCategory, setSelectedCategory }) => {
  const handleCategoryClick = category => {
    
    if (category !== selectedCategory) {
      setSelectedCategory(category);
    } else {
      setSelectedCategory(null);
    }
  };

  return (
    <CategoryContainer>
      <h2>Categories</h2>
      <hr />
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
