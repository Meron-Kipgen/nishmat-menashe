import React from 'react';
import styled from 'styled-components';

const CategoryWrapper = styled.div`
  display: flex;
  flex-wrap: nowrap;
  height: 45px;
  gap: 10px;
  padding:8px;
  background-color: #f9f9f9;
  overflow-x: auto; 
  overflow-y: hidden; 
  

  &::-webkit-scrollbar {
    display: none;
  }
  
  scrollbar-width: none;
  p{
    color: red;
  }
`;

const CategoryButton = styled.div`
  padding: 7px 13px;
  border-radius: 30px;
  background-color: ${({ isSelected }) => (isSelected ? '#142B42' : '#e0e0e0')};
  color: ${({ isSelected }) => (isSelected ? 'white' : '#333')};
  border: none;
  cursor: pointer;
  font-size: 14px;
  transition: background-color 0.3s ease, transform 0.3s ease;

  &:hover {
    background-color: ${({ isSelected }) => (isSelected ? '#0056b3' : '#c0c0c0')};
    transform: scale(1.05);
  }

  &:focus {
    outline: none;
    box-shadow: 0 0 0 2px rgba(0, 123, 255, 0.5);
  }
`;

const CategorySelector = ({ categories, selectedCategories, onSelectCategory }) => (
  <CategoryWrapper>
    
    <CategoryButton
      key="all"
      isSelected={selectedCategories.length === 0}
      onClick={() => onSelectCategory([])}
    >
      All
    </CategoryButton>
    {categories.map((category) => (
      <CategoryButton
        key={category}
        isSelected={selectedCategories.includes(category)}
        onClick={() => onSelectCategory(
          selectedCategories.includes(category)
            ? selectedCategories.filter(cat => cat !== category)
            : [...selectedCategories, category]
        )}
      >
        {category}
      </CategoryButton>
    ))}
  </CategoryWrapper>
);

export default CategorySelector;
