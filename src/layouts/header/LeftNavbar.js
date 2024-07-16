import React from "react";
import Logo from "./Logo";
import styled from "styled-components";
import Search from "./Search";

const Container = styled.section`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 30px;
`;
export default function LeftNavbar() {
  return (
    <Container>
      <Logo />
      <Search/>
    </Container>
  );
}
