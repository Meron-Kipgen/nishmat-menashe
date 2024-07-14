import React from 'react';
import styled from 'styled-components';

const Button = styled.button`
  margin: 20px;
  padding: 10px 20px;
  cursor: pointer;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  font-size: 16px;
`;

const SidebarToggleBtn = ({ showCategories, toggleCategories }) => {
  return (
    <Button onClick={toggleCategories}>
      {showCategories ? "Hide Categories" : "Show Categories"}
    </Button>
  );
};

export default SidebarToggleBtn;
