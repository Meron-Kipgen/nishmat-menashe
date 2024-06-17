import React, { useState } from "react";
import { BiMenuAltLeft } from "react-icons/bi";
import styled from "styled-components";
import LeftSidebar from "./../sidebar/LeftSidebar";

const Container = styled.div`
  margin-left: 30px;
  @media (max-width: 768px){
    margin-left: 10px;
  }
`;
const Button = styled.div`
  margin-top: 10px;
  color:#DF154D;
  font-size: 2.5rem;
  cursor: pointer;
`;

const SidebarContainer = styled.div`
  position: fixed;
  z-index: 3;
  top: 0;
  left: ${(props) =>
    props.isToggle ? "0" : "-300px"}; /* Hide sidebar by default */
  transition: left 0.3s ease-in-out; /* Smooth transition */
`;

export default function UserMenu() {
  const [isToggle, setIsToggle] = useState(false);

  const handleToggle = () => {
    setIsToggle(!isToggle);
  };

  return (
    <Container>
      <Button onClick={handleToggle}>
        <BiMenuAltLeft />
      </Button>

      <SidebarContainer isToggle={isToggle}>
        <LeftSidebar />
      </SidebarContainer>
    </Container>
  );
}
