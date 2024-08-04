import React from "react";
import Logo from "../header/Logo";
import Search from "../../Features/Search/Search";
import RightNavbar from "../header/RightNavbar";
import styled from "styled-components";

const Container = styled.nav`
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: #04252F;
`;
export default function NavMenu() {
  return (
    <Container>
      <Logo />
      <Search />
      <RightNavbar />
    </Container>
  );
}
