import React, { useState, useContext } from "react";
import styled from "styled-components";
import User from "../../Features/User/User"
import { UserContext } from "../../contexts/UserContext";
import Avatar from "../../Features/User/Avatar";
import { UserPic } from "../../Assets/Icons";
const Container = styled.div`
  margin-right: 100px;
border: 2px solid white;
border-radius: 50%;
cursor: pointer;
`;

const Menu = styled.div`

  &:hover {
    color: #4A6E71;
  }
`;

const RightNavbar = () => {
  const { userAvatarUrl, isLogin, username } = useContext(UserContext);

  const [UserMenu, setUserMenu] = useState(false);

  const handleShowMenu = () => {
    setUserMenu(!UserMenu);
  };

  return (
    <Container onClick={handleShowMenu}>
   
         {isLogin ? <Avatar src={userAvatarUrl} name={username}/>: <UserPic/>
          }

      {UserMenu && <User/>}
    </Container>
  );
};

export default RightNavbar;
