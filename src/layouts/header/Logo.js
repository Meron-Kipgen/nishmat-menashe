import React from "react";
import styled from "styled-components";

const Wrapper = styled.section`
  
  font-size: 1.3rem;
  img {
    height: 35px;
    width: 35px;
    margin-top: 6px;
  }
  @media (max-width: 768px) {
    height: 25px;
    width: 25px;
    margin-top: -15px;
  }
`;

export default function Logo() {
  return (
    <Wrapper>
     <img src="/icons/logo.png"></img>
    </Wrapper>
  );
}
