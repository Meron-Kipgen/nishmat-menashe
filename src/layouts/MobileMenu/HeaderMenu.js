import React, { useState } from "react";
import Logo from "../header/Logo";
import Search from "../../Features/Search/Search";
import RightNavbar from "../header/RightNavbar";
import styled from "styled-components";
import MobileSearch from "../../Features/Search/MobileSearch";
import LeftSidebar from "../sidebar/LeftSidebar";

const Container = styled.nav`
  display: flex;
  width: 100%;
  background: #04252f;
  height: 45px;
  justify-content: space-between;
  align-items: center;
  position: fixed; /* Make the navbar fixed */
  top: 0;
  left: 0;
  z-index: 1000;
  background: #142b42; /* Ensure background color is set */
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
  width: 100%; /* Adjust width as needed */
  height: 100vh;
  background: #fff; /* Adjust background color as needed */
  transform: ${({ isOpen }) =>
    isOpen ? "translateX(0)" : "translateX(-100%)"};
  transition: transform 0.3s ease-in-out;
  z-index: 999; /* Ensure it appears above other content */
  
`;
const ToggleMenu = styled.div`
display: flex;
align-items: center;
`
const LeftSide = styled.div`
display: flex;
align-items: center;
justify-content: flex-start;
gap:20px;

`
export default function HeaderMenu() {
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  return (
    <>
      <Container>
        <LeftSide>
          <ToggleMenu onClick={toggleSidebar}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="icon icon-tabler icon-tabler-menu"
            width="40"
            height="40"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="#ffffff"
            fill="none"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <path d="M4 8l16 0" />
            <path d="M4 16l16 0" />
          </svg>
        </ToggleMenu>
        <Logo />
        </LeftSide>
        
        <RightSide>
          <MobileSearch />
          <RightNavbar />
        </RightSide>
      </Container>
      <SidebarContainer isOpen={isSidebarOpen}>
        <LeftSidebar />
      </SidebarContainer>
    </>
  );
}
