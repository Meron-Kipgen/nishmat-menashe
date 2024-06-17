import React from "react";
import UserMenu from "../header/UserMenu";
import Logo from "../header/Logo";
import Search from "../header/Search";
import RightNavbar from "../header/RightNavbar";
import styled from "styled-components";

const Container = styled.nav`
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: white;
`;
export default function NavMenu() {
  return (
    <Container>
      <UserMenu />
      <Logo />
      <Search />
      <RightNavbar />
    </Container>
  );
}
