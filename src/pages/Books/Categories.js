import React from "react";
import styled from "styled-components";

const CategoriesContainer = styled.div`
  flex: 1;
  padding: 20px;
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

const CategoriesTitle = styled.h2`
  font-size: 1.5rem;
  margin-bottom: 20px;
  color: #333;
  text-align: center;
  font-weight: 600;
`;

const CategoriesList = styled.ul`
  list-style-type: none;
  padding: 0;
  margin: 0;
`;

const CategoryItem = styled.li`
  font-size: 1.2rem;
  margin-bottom: 10px;
  cursor: pointer;
  color: #333;
  background-color: white;
  transition: all 0.3s ease;
  padding: 10px;
  border-radius: 8px;
  display: flex;
  flex-direction: column;

  &:hover {
    color: #007bff;
    background-color: #f0f0f0;
  }
`;

const SubcategoryList = styled.ul`
  list-style-type: none;
  padding-left: 20px;
  margin-top: 10px;
`;

const SubcategoryItem = styled.li`
  font-size: 1rem;
  margin-bottom: 5px;
  cursor: pointer;
  color: #666;
  transition: all 0.3s ease;
  padding: 5px 10px;
  border-radius: 6px;

  &:hover {
    color: red;
    background-color: #f0f0f0;
  }
`;

const Categories = ({
  categories,
  handleCategorySelect,
  handleSubcategorySelect,
}) => (
  <CategoriesContainer>
    <CategoriesTitle>Categories</CategoriesTitle>
    <CategoriesList>
      {categories.map((category, index) => (
        <CategoryItem
          key={index}
          onClick={() =>
            handleCategorySelect(
              category.name === "All" ? null : category.name
            )
          }
        >
          {category.name}
          {category.subcategories && category.subcategories.length > 0 && (
            <SubcategoryList>
              {category.subcategories.map((subcategory, subIndex) => (
                <SubcategoryItem
                  key={subIndex}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleSubcategorySelect(subcategory);
                  }}
                >
                  {subcategory}
                </SubcategoryItem>
              ))}
            </SubcategoryList>
          )}
        </CategoryItem>
      ))}
    </CategoriesList>
  </CategoriesContainer>
);

export default Categories;
