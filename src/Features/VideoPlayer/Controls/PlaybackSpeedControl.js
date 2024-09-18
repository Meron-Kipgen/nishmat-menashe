import React, { useState } from 'react';
import styled from 'styled-components';

const SpeedButton = styled.div`
  padding: 2px;
  background: white;
  color: black;
  font-size: 12px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  width: 40px;
  border-radius: 5px;
  background: white;
`;

const DropdownMenu = styled.div`
  position: absolute;
  bottom: 120%; // Default position above the button
  left: 0;
  background: rgba(0, 0, 0, 0.8);
  border-radius: 5px;
  padding: 5px 0;
  display: ${({ show }) => (show ? 'block' : 'none')};
  z-index: 10;
  max-height: 200px; // Set maximum height for dropdown
  overflow-y: auto;  // Enable scrolling if content exceeds max-height

  @media (max-width: 768px) {
    width: 100px;
    top: 100%; // Dropdown below the button for mobile
    bottom: unset; // Remove bottom positioning
    max-height: 150px; // Smaller max-height for mobile
   
  }

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
  padding: 8px 12px;
  color: white;
  cursor: pointer;
  &:hover {
    background: rgba(255, 255, 255, 0.1);
  }
`;

const speeds = [0.5, 0.75, 1, 1.5, 2];

const PlaybackSpeedControl = ({ currentSpeed, onChange }) => {
  const [showDropdown, setShowDropdown] = useState(false);

  const handleButtonClick = () => {
    setShowDropdown(!showDropdown);
  };

  const handleItemClick = (speed) => {
    setShowDropdown(false);
    onChange(speed);
  };

  return (
    <div style={{ position: 'relative' }}>
      <SpeedButton onClick={handleButtonClick}>
        {`${currentSpeed}x`}
      </SpeedButton>
      <DropdownMenu show={showDropdown}>
        {speeds.map((speed) => (
          <DropdownItem key={speed} onClick={() => handleItemClick(speed)}>
            {speed}x
          </DropdownItem>
        ))}
      </DropdownMenu>
    </div>
  );
};

export default PlaybackSpeedControl;
