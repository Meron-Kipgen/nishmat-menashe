import React, { useRef, useState, useEffect } from "react";
import Logo from "../header/Logo";
import RightNavbar from "../header/RightNavbar";
import styled from "styled-components";
import MobileSearch from "../../Features/Search/MobileSearch";
import LeftSidebar from "../sidebar/LeftSidebar";
import RightSidebar from "../sidebar/RightSidebar";

const Container = styled.nav`
  display: flex;
  width: 100%;
  background: #04252f;
  height: 45px;
  justify-content: space-between;
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1000;
  background: #142b42;
  transition: transform 0.3s ease-in-out;
  padding: 0 10px;
`;

const RightSide = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
`;

const SidebarContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background: #fff;
  transform: ${({ isOpen }) =>
    isOpen ? "translateX(0)" : "translateX(-100%)"};
  transition: transform 0.3s ease-in-out;
  z-index: 999;
`;

const ToggleMenu = styled.div`
  display: flex;
  align-items: center;
`;

const LeftSide = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 20px;
`;

const RightToggleMenu = styled.div`
  margin-top: 3px;
`;

const RightSidebarContainer = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  width: 100%;
  height: 100vh;
  background: #fff;
  transform: ${({ isOpen }) => (isOpen ? "translateX(0)" : "translateX(100%)")};
  transition: transform 0.3s ease-in-out;
  z-index: 999;
`;

export default function HeaderMenu() {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [isRightSidebarOpen, setRightSidebarOpen] = useState(false);
  const sidebarRef = useRef(null);
  const rightSidebarRef = useRef(null);
  const touchStartX = useRef(0);
  const touchDeltaX = useRef(0);

  const toggleSidebar = () => {
    setSidebarOpen((prevState) => {
      if (isRightSidebarOpen) {
        setRightSidebarOpen(false);
      }
      return !prevState;
    });
  };

  const toggleRightSidebar = () => {
    setRightSidebarOpen((prevState) => {
      if (isSidebarOpen) {
        setSidebarOpen(false);
      }
      return !prevState;
    });
  };

  const handleClickOutside = (event) => {
    if (
      sidebarRef.current &&
      !sidebarRef.current.contains(event.target) &&
      rightSidebarRef.current &&
      !rightSidebarRef.current.contains(event.target) &&
      !event.target.closest(".toggle-menu") &&
      !event.target.closest(".right-toggle-menu")
    ) {
      setSidebarOpen(false);
      setRightSidebarOpen(false);
    }
  };

  const handleTouchStart = (event) => {
    touchStartX.current = event.touches[0].clientX;
    touchDeltaX.current = 0;
  };

  const handleTouchMove = (event) => {
    touchDeltaX.current = event.touches[0].clientX - touchStartX.current;
  };

  const handleTouchEnd = () => {
    const swipeThreshold = 100; // Minimum swipe distance to trigger sidebar close

    if (touchDeltaX.current > swipeThreshold && isRightSidebarOpen) {
      setRightSidebarOpen(false);
    } else if (touchDeltaX.current < -swipeThreshold && isSidebarOpen) {
      setSidebarOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("touchstart", handleTouchStart);
    document.addEventListener("touchmove", handleTouchMove);
    document.addEventListener("touchend", handleTouchEnd);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("touchstart", handleTouchStart);
      document.removeEventListener("touchmove", handleTouchMove);
      document.removeEventListener("touchend", handleTouchEnd);
    };
  }, [isSidebarOpen, isRightSidebarOpen]);

  return (
    <>
      <Container>
        <LeftSide>
          <ToggleMenu className="toggle-menu" onClick={toggleSidebar}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="icon icon-tabler icon-tabler-menu-2"
              width="40"
              height="40"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="#fff"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path stroke="none" d="M0 0h24v24H0z" fill="none" />
              <path d="M4 6l16 0" />
              <path d="M4 12l16 0" />
              <path d="M4 18l16 0" />
            </svg>
          </ToggleMenu>
          <Logo />
        </LeftSide>

        <RightSide>
          <MobileSearch />
          <RightToggleMenu
            className="right-toggle-menu"
            onClick={toggleRightSidebar}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="icon-tabler icon-tabler-layout-grid"
              width="35"
              height="35"
              viewBox="0 0 24 24"
              strokeWidth="2"
              stroke="#fff"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path stroke="none" d="M0 0h24v24H0z" fill="none" />
              <path d="M4 4m0 1a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v4a1 1 0 0 1 -1 1h-4a1 1 0 0 1 -1 -1z" />
              <path d="M14 4m0 1a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v4a1 1 0 0 1 -1 1h-4a1 1 0 0 1 -1 -1z" />
              <path d="M4 14m0 1a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v4a1 1 0 0 1 -1 1h-4a1 1 0 0 1 -1 -1z" />
              <path d="M14 14m0 1a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v4a1 1 0 0 1 -1 1h-4a1 1 0 0 1 -1 -1z" />
            </svg>
          </RightToggleMenu>
          <RightNavbar />
        </RightSide>
      </Container>
      <SidebarContainer
        ref={sidebarRef}
        isOpen={isSidebarOpen}
      >
        <LeftSidebar toggleSidebar={toggleSidebar} />
      </SidebarContainer>
      <RightSidebarContainer
        ref={rightSidebarRef}
        isOpen={isRightSidebarOpen}
      >
        <RightSidebar />
      </RightSidebarContainer>
    </>
  );
}
