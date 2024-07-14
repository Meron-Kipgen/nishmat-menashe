import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const HeaderContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
`;

const ButtonsContainer = styled.div`
  display: flex;
  gap: 10px;
`;

const Button = styled.button`
  padding: 8px 12px;
  font-size: 14px;
  border: none;
  border-radius: 4px;
  background-color: #4caf50;
  color: white;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: #45a049;
  }
`;

const Menu = ({
  onIncreaseFontSize,
  onDecreaseFontSize,
  onToggleEnVisibility,
  onToggleHeVisibility,
  onToggleBothVisibility,
  onToggleGridLayout,
  showEn,
  showHe,
  gridLayout,
}) => {
  return (
    <HeaderContainer>
      <div>
        <Link to="/Books">Go Back</Link>
      </div>
      <ButtonsContainer>
        <Button onClick={onIncreaseFontSize}>Increase Font Size</Button>
        <Button onClick={onDecreaseFontSize}>Decrease Font Size</Button>
        <Button onClick={onToggleEnVisibility}>
          {showEn ? "Hide En" : "Show En"}
        </Button>
        <Button onClick={onToggleHeVisibility}>
          {showHe ? "Hide He" : "Show He"}
        </Button>
        <Button onClick={onToggleBothVisibility}>Show Both</Button>
        <Button onClick={onToggleGridLayout}>
          {gridLayout ? "Disable Grid" : "Enable Grid"}
        </Button>
      </ButtonsContainer>
    </HeaderContainer>
  );
};

export default Menu;
