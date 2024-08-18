import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { BackIcon, SearchIcon } from '../../Assets/Icons'; // Ensure this path is correct
import Search from './Search';

const FullscreenOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  padding: 10px;
  background: white;
  width: 100%;
  height: 100%;
  display: flex;
  z-index: 10;
`;

const SearchButton = styled.div`
  /* Your styles */
`;

const CloseButton = styled.div`
  color: black;
  font-size: 24px;
  cursor: pointer;
  outline: none;
`;

const disableScroll = () => {
  document.body.style.overflow = 'hidden';
};

const enableScroll = () => {
  document.body.style.overflow = '';
};

export default function MobileSearch() {
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  useEffect(() => {
    if (isSearchOpen) {
      disableScroll();
    } else {
      enableScroll();
    }

    // Clean up function to enable scroll when the component unmounts
    return () => enableScroll();
  }, [isSearchOpen]);

  const handleSearchClick = () => {
    setIsSearchOpen(true);
  };

  const handleCloseClick = () => {
    setIsSearchOpen(false);
  };

  return (
    <>
      <SearchButton onClick={handleSearchClick}>
        <SearchIcon height="35px" width="35px" />
      </SearchButton>
      {isSearchOpen && (
        <FullscreenOverlay>
          <CloseButton onClick={handleCloseClick}>
            <BackIcon height="30px" width="30px"/>
          </CloseButton>
          <Search closeSearch={handleCloseClick} />
        </FullscreenOverlay>
      )}
    </>
  );
}
