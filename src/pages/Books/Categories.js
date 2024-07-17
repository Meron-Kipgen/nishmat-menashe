import React, { useState } from 'react';
import styled from 'styled-components';

const CategoryContainer = styled.div`
  margin-bottom: 20px;
  width: 300px;
  background: white;
`;

const CategoryItem = styled.div`
  padding: 10px;
  cursor: pointer;
  background-color: ${({ selected }) => (selected ? '#007bff' : '#f0f0f0')};
  color: ${({ selected }) => (selected ? 'white' : 'black')};
  border-radius: 4px;
  margin-bottom: 5px;

  &:hover {
    background-color: #007bff;
    color: white;
  }
`;

const SubcategoryItem = styled.div`
  padding: 10px;
  cursor: pointer;
  background-color: ${({ selected }) => (selected ? '#6c757d' : '#f0f0f0')};
  color: ${({ selected }) => (selected ? 'white' : 'black')};
  border-radius: 4px;
  margin-bottom: 5px;

  &:hover {
    background-color: #6c757d;
    color: white;
  }
`;

const BackButton = styled.button`
  padding: 10px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  margin-bottom: 10px;
`;

const Categories = ({
  categories,
  selectedCategory,
  selectedSubcategory,
  handleCategorySelect,
  handleSubcategorySelect,
}) => {
  const [showSubcategories, setShowSubcategories] = useState(false);

  const toggleSubcategories = () => {
    setShowSubcategories(!showSubcategories);
  };

  return (
    <CategoryContainer>
      {showSubcategories && (
        <>
          <BackButton onClick={toggleSubcategories}>Back</BackButton>
          {categories
            .find((category) => category.name === selectedCategory)
            ?.subcategories.map((subcategory) => (
              <SubcategoryItem
                key={subcategory}
                selected={selectedSubcategory === subcategory}
                onClick={() => handleSubcategorySelect(subcategory)}
              >
                {subcategory}
              </SubcategoryItem>
            ))}
        </>
      )}
      {!showSubcategories && (
        <>
          {categories.map((category) => (
            <CategoryItem
              key={category.name}
              selected={selectedCategory === category.name}
              onClick={() => {
                if (category.name === 'All') {
                  handleCategorySelect(null); // Set selectedCategory to null for "All Categories"
                } else {
                  handleCategorySelect(category.name);
                  setShowSubcategories(true); // Show subcategories when a category is selected
                }
              }}
            >
              {category.name === 'All' ? 'All Categories' : category.name}
            </CategoryItem>
          ))}
        </>
      )}
    </CategoryContainer>
  );
};

export default Categories;
