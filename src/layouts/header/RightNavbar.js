import React, { useState, useContext, useRef, useEffect } from "react";
import styled from "styled-components";
import User from "../../Features/User/User";
import { UserContext } from "../../contexts/UserContext";
import Avatar from "../../Features/User/Avatar";

const Container = styled.div`
  margin-right: 100px;
  cursor: pointer;
  position: relative;
`;

const RightNavbar = () => {
  const { userAvatarUrl, username } = useContext(UserContext);
  const [userMenu, setUserMenu] = useState(false);
  const containerRef = useRef(null);

  const handleShowMenu = (event) => {
    event.stopPropagation();
    setUserMenu(!userMenu);
  };

  const handleClickOutside = (event) => {
    if (containerRef.current && !containerRef.current.contains(event.target)) {
      setUserMenu(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <Container ref={containerRef} onClick={handleShowMenu}>
      <Avatar src={userAvatarUrl} name={username} height={"35px"} width={"35px"} border={"2px solid white"}/>
      {userMenu && <User />}
    </Container>
  );
};

export default RightNavbar;
