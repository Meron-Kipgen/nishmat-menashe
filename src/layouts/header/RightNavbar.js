import React, { useState } from "react";
import styled from "styled-components";
import VideoForm from "../../pages/Video/VideoForm";

const Container = styled.div`
  margin-right: 30px;
`;

const Button = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 20px;
  font-size: 2rem;
  color: #df154d;
  img {
    height: 45px;
    cursor: pointer;
  }
`;

const MenuContainer = styled.ul`
  list-style: none;
  position: absolute;
  right: 0;
  height: 100px;
  width: 300px;
  background: white;
  padding: 10px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
  z-index: 9999;
  li {
    display: flex;
    align-items: center;
    gap: 10px;
    cursor: pointer;
    &:hover {
      color: red;
    }
  }
`;

const VideoFormContainer = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  z-index: 99999;
  width: 600px;
  background: white;
  padding: 20px;
  border-radius: 20px;
  box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
`;

const RightNavbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenMenu, setIsOpenMenu] = useState(false);

  const handleClick = () => {
    setIsOpen(!isOpen);
    setIsOpenMenu(false);
  };

  const handleOpenMenu = () => {
    setIsOpenMenu(!isOpenMenu);
    setIsOpen(false);
  };

  const handleCloseMenu = () => {
    setIsOpenMenu(false);
  };

  return (
    <Container>
      <Button>
        <img src="/icons/bell.svg" alt="bell" />
        <img src="/icons/user.svg" alt="user" />
        <img src="/icons/circle-plus.svg" alt="add new" onClick={handleClick} />
      </Button>

      {isOpen && (
        <MenuContainer>
          <li onClick={handleOpenMenu}>
            <img src="/icons/add-video.svg" alt="add video" /> Add Video
          </li>
        </MenuContainer>
      )}

      {isOpenMenu && (
        <VideoFormContainer>
          <VideoForm />
          <button onClick={handleCloseMenu}>Close</button>
        </VideoFormContainer>
      )}
    </Container>
  );
};

export default RightNavbar;
