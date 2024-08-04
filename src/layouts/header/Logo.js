import React from "react";
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

export default function Logo() {
  return (
    <Wrapper>
     <h1>נמ</h1>
    </Wrapper>
  );
}
