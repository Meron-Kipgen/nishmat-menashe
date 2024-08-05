import React from "react";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  overflow-x: auto;
  background: white;
  align-items: center;
  gap: 10px;
  width: 100%;
  height: 40px;
 padding: 0 20px;
  &::-webkit-scrollbar {
    display: none;
  }
`;

const Item = styled.div`
  display: flex;
align-items: center;
  padding: 6px 15px;
  cursor: pointer;
  transition: background-color 0.3s, color 0.3s, border-color 0.3s;
  white-space: nowrap;
  background-color: ${(props) => (props.active ? "rgb(20,43,66, 0.9)" : "transparent")};
  color: ${(props) => (props.active ? "white" : "#333")};
  border-radius: 20px;

  &:hover {
    background-color: rgb(20,43,66,0.9);
    color: white;
    
  }
`;

const Subcategories = ({
  subcategories,
  selectedSubcategories,
  setSelectedSubcategories,
}) => {
  const handleSubcategoryClick = (subcategory) => {
    if (subcategory === "All") {
      setSelectedSubcategories(["All"]);
    } else {
      setSelectedSubcategories((prevSelected) => {
        const newSelected = prevSelected.includes(subcategory)
          ? prevSelected.filter((item) => item !== subcategory)
          : prevSelected.filter((item) => item !== "All").concat(subcategory);
          
        // Automatically select "All" if no subcategories are selected
        return newSelected.length === 0 ? ["All"] : newSelected;
      });
    }
  };

  return (
    <Container>
      {subcategories.map((subcategory, index) => (
        <Item
          key={index}
          onClick={() => handleSubcategoryClick(subcategory)}
          active={selectedSubcategories.includes(subcategory)}
        >
          {subcategory}
        </Item>
      ))}
    </Container>
  );
};

export default Subcategories;
