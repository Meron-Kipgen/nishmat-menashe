import React from "react";
import styled from "styled-components";

const Wrapper = styled.section`
  position: absolute;
  left: 0;
  top: 60px;
  background-color: rgba(255, 255, 255, 0.6);
  backdrop-filter: blur(10px);
  transition: width 0.3s;
  width: 300px;
  ul{
    list-style-type: none;
  }
  li{
    padding: 10px;

  }
`;

export default function LeftSidebar() {
  return (
    <Wrapper>
      <ul>
        <li>one</li>
        <li>one</li>
        <li>one</li>
        <li>one</li>
        <li>one</li>
        <li>one</li>
        <li>one</li>
        <li>one</li>
        <li>one</li>
        <li>one</li>
        <li>one</li>
      </ul>
    </Wrapper>
  );
}
