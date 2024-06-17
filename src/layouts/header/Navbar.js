import React, { useState, useEffect } from "react";
import styled from "styled-components";
import NavMenu from "./NavMenu";
import LeftNavbar from "./LeftNavbar";
import RightNavbar from "./RightNavbar";

const Wrapper = styled.div`
  position: sticky;
  top: 0;
  width: 100%;
  z-index: 1000;
  backdrop-filter: blur(20px);
  transform: ${(props) => (props.hide ? "translateY(-100%)" : "translateY(0)")};
  transition: transform 0.3s ease-in-out;
`;

const Container = styled.nav`
  width: 100%;
  background-color: rgba(255, 255, 255, 0.7);
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Navbar = () => {
  const [hide, setHide] = useState(false);
  const [prevScrollPos, setPrevScrollPos] = useState(0);

  const handleScroll = () => {
    const currentScrollPos = window.pageYOffset;
    if (currentScrollPos > prevScrollPos) {
      setHide(true);
    } else {
      setHide(false);
    }
    setPrevScrollPos(currentScrollPos);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [prevScrollPos]);

  return (
    <Wrapper hide={hide}>
        <Container>
          <LeftNavbar />
          <NavMenu />
          <RightNavbar />
        </Container>
    </Wrapper>
  );
};

export default Navbar;
