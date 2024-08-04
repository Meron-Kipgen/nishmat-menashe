import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const Wrapper = styled.section`
  font-size: 2.7rem;
  color: white;
  margin-top: -8px;
  @media (max-width: 768px) {
    height: 25px;
    width: 25px;
    margin-top: -20px;
  }
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  color: inherit; /* Ensure link inherits color from Wrapper */
`;

export default function Logo() {
  return (
    <Wrapper>
      <StyledLink to="/">
        <h1>נמ</h1>
      </StyledLink>
    </Wrapper>
  );
}
