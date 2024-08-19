import React from "react";
import styled from "styled-components";
import NavMenu from "./NavMenu";
import LeftNavbar from "./LeftNavbar";
import RightNavbar from "./RightNavbar";

const Wrapper = styled.div`
  position: fixed; /* Make the navbar fixed */
  top: 0;
  left: 0;
  width: 100%;
  z-index: 1000;
  background: #142B42; /* Ensure background color is set */
  transition: transform 0.3s ease-in-out;
`;

const Container = styled.nav`
  height: 45px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Navbar = () => {
  return (
    <Wrapper>
      <Container>
        <LeftNavbar />
        <NavMenu />
        <RightNavbar />
      </Container>
    </Wrapper>
  );
};

export default Navbar;
