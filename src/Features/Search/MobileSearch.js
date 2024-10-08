import React, { useState } from 'react';
import styled from 'styled-components';
import { BackIcon, SearchIcon } from '../../Assets/Icons'; // Ensure this path is correct
import Search from './Search';

const FullscreenOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
height: 47px;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  z-index: 1000;
 padding: 10px 0 0 0;
  background: white;
`;

const SearchIconContainer = styled.div`
margin-top: 3px;
`;

const CloseButton = styled.div`
  
  margin-right: 10px;
  background: none;
  border: none;

  cursor: pointer;
  outline: none;
`;

export default function MobileSearch() {
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const handleSearchClick = () => {
    setIsSearchOpen(true);
  };

  const handleCloseClick = () => {
    setIsSearchOpen(false);
  };

  return (
    <>
      <SearchIconContainer onClick={handleSearchClick}>
        <SearchIcon height="33px" width="33px" />
      </SearchIconContainer>
      {isSearchOpen && (
        <FullscreenOverlay>
          <CloseButton onClick={handleCloseClick}>
            <BackIcon height={30} width={30}/>
          </CloseButton>
          <Search onClose={handleCloseClick} />
        </FullscreenOverlay>
      )}
    </>
  );
}
