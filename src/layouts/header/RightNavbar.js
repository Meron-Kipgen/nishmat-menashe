import React, { useState, useContext, useRef, useEffect } from "react";
import styled from "styled-components";
import User from "../../Features/User/User";
import { UserContext } from "../../contexts/UserContext";
import Avatar from "../../Features/User/Avatar";
import { GuestIcon } from "../../Assets/Icons";

const Container = styled.div`
  margin-right: 40px;
  cursor: pointer;
  position: relative;
  @media (max-width: 768px) {
   margin-right: 15px;
  }
`;

const RightNavbar = () => {
  const { userAvatarUrl, username, isLogin } = useContext(UserContext);
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
      {isLogin ?<Avatar src={userAvatarUrl} name={username} height={"35px"} width={"35px"} border={"2px solid white"}/>  : <GuestIcon width="35px" height="35px"  />}
      
      {userMenu && <User />}
    </Container>
  );
};

export default RightNavbar;
