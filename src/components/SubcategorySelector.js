import React, { useState } from 'react';
import styled from 'styled-components';

const SubcategoryWrapper = styled.div`
  margin-bottom: 20px;
  display: flex;
  width: 300px;
  flex-direction: column;
  gap: 10px;
  padding: 10px;
  background-color: #f5f5f5;
  max-height: 80vh;
  overflow-y: scroll;
  
  scrollbar-width: none; /* Firefox */
  -ms-overflow-style: none;  /* IE and Edge */
  &::-webkit-scrollbar {
    width: 0;  /* Safari and Chrome */
    height: 0;
  }
`;

const CategoryButton = styled.button`
  padding: 12px 20px;
  border-radius: 6px;
  background-color: ${({ isSelected }) => (isSelected ? '#007BFF' : '#e0e0e0')};
  color: ${({ isSelected }) => (isSelected ? 'white' : '#333')};
  border: none;
  cursor: pointer;
  font-size: 14px;
  font-weight: 500;
  transition: background-color 0.3s ease, transform 0.3s ease;

  &:hover {
    background-color: ${({ isSelected }) => (isSelected ? '#0056b3' : '#c0c0c0')};
    transform: scale(1.0);
  }

  &:focus {
    outline: none;
    box-shadow: 0 0 0 2px rgba(0, 123, 255, 0.5);
  }
`;

const CloseButton = styled.button`
  background: transparent;
  border: none;
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;
  color: #333;
  position: absolute;
  top: 10px;
  right: 10px;

  &:hover {
    color: #007BFF;
  }

  &:focus {
    outline: none;
  }
`;

const SubcategorySelector = ({ subcategories, selectedSubcategories, onSelectSubcategory, onClose }) => {
  const [isVisible, setIsVisible] = useState(true);

  const handleClose = () => {
    setIsVisible(false);
    onClose(); // Call the onClose function passed as a prop
  };

  if (!isVisible) return null;



  return (
    <SubcategoryWrapper>
      <p>Subcategories</p>
      <span onClick={handleClose}>close</span>
      <CategoryButton
        key="all"
        isSelected={selectedSubcategories.length === 0}
        onClick={() => onSelectSubcategory([])}
      >
        All
      </CategoryButton>
      {subcategories.map((subcategory) => (
        <CategoryButton
          key={subcategory}
          isSelected={selectedSubcategories.includes(subcategory)}
          onClick={() => onSelectSubcategory(
            selectedSubcategories.includes(subcategory)
              ? selectedSubcategories.filter(sub => sub !== subcategory)
              : [...selectedSubcategories, subcategory]
          )}
        >
          {subcategory}
        </CategoryButton>
      ))}
    </SubcategoryWrapper>
  );
};

export default SubcategorySelector;
