import React from "react";
import Logo from "../header/Logo";
import Search from "../../Features/Search/Search";
import RightNavbar from "../header/RightNavbar";
import styled from "styled-components";
import MobileSearch from "../../Features/Search/MobileSearch";

const Container = styled.nav`
  display: flex;
  width: 100%;
  background: #04252F;
  height: 45px;
justify-content: space-between;
  align-items: center;


  position: fixed; /* Make the navbar fixed */
  top: 0;
  left: 0;

  z-index: 1000;
  background: #142B42; /* Ensure background color is set */
  transition: transform 0.3s ease-in-out;
`;




const RightSide = styled.div`
display: flex;
align-items: center;
gap: 10px;
`
export default function HeaderMenu() {
  return (
    <Container>
      <Logo />
      <RightSide>
         <MobileSearch />
      <RightNavbar />
      </RightSide>
     
    </Container>
  );
}
