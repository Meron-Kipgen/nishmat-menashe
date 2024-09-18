import React, { useState } from 'react';
import styled from 'styled-components';

const Container = styled.div`
  position: relative;
`;

const QualityButton = styled.div`
  margin-left: 10px;
  padding: 2px;
  background: white;
  color: black;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  border-radius: 5px;
  font-size: 12px;
`;

const DropdownMenu = styled.div`
  position: absolute;
  bottom: 120%; // Default dropdown position (above the button)
  left: 0;
  border-radius: 5px;
  background: rgba(0, 0, 0, 0.8);
  padding: 5px 0;
  display: ${({ show }) => (show ? 'block' : 'none')};
  z-index: 10;
  max-height: 200px; // Set a maximum height for the dropdown
  overflow-y: auto; // Enable scrolling if content exceeds max height

  @media (max-width: 768px) {
    top: 100%;  // Dropdown below the button for mobile
    bottom: unset; // Remove bottom positioning
    max-height: 150px; // Set a smaller max height for mobile devices
  }

  /* Optional styling for smoother scrolling */
  ::-webkit-scrollbar {
    width: 6px;
  }

  ::-webkit-scrollbar-track {
    background: rgba(0, 0, 0, 0.3);
  }

  ::-webkit-scrollbar-thumb {
    background: rgba(255, 255, 255, 0.6);
    border-radius: 5px;
  }
`;

const DropdownItem = styled.div`
  padding: 6px 12px;
  color: white;
  cursor: pointer;
  background: ${({ selected }) => (selected ? 'rgba(255, 255, 255, 0.2)' : 'transparent')};
  &:hover {
    background: rgba(255, 255, 255, 0.7);
    color: black;
  }
`;

const QualitySelector = ({ qualities, currentQuality, onChange }) => {
  const [showDropdown, setShowDropdown] = useState(false);

  const handleButtonClick = () => {
    setShowDropdown(!showDropdown);
  };

  const handleItemClick = (quality) => {
    setShowDropdown(false);
    onChange(quality);
  };

  return (
    <Container>
      <QualityButton onClick={handleButtonClick}>
        {currentQuality === 'auto' ? 'Auto' : `${currentQuality}p`}
      </QualityButton>
    
      <DropdownMenu show={showDropdown}>
        <DropdownItem
          selected={currentQuality === 'auto'}
          onClick={() => handleItemClick('auto')}
        >
          Auto
        </DropdownItem>
        {qualities.map((quality) => (
          <DropdownItem
            key={quality}
            selected={currentQuality === quality}
            onClick={() => handleItemClick(quality)}
          >
            {quality}p
          </DropdownItem>
        ))}
      </DropdownMenu>
    </Container>
  );
};

export default QualitySelector;
