import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const Wrapper = styled.section`
  font-size: 2.7rem;
  color: white;
  margin-top: -8px;

  @media (max-width: 768px) {
    margin-top: -3px;
    margin-left: 60px;
    font-size: 2rem;
  }
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  color: inherit; 
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
