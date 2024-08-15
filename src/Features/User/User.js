import React, { useContext } from 'react';
import styled from 'styled-components';
import { UserContext } from '../../contexts/UserContext';
import Logout from './Logout';
import GoogleLogin from './GoogleLogin';
import Avatar from './Avatar';
import { NavLink } from 'react-router-dom';

const Container = styled.section`
  position: absolute;
  top: 100%; /* Adjust position relative to parent */
  right: 0;
  background-color: white;
  border-radius: 8px;
  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.1);
  padding: 16px;
  z-index: 1000;
  width: 220px;
  border: 1px solid #e0e0e0;
  cursor: default;
`;

const TopContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 20px;

  svg {
    width: 60px;
    height: 60px;
    color: #4A6E71;
  }
`;

const Username = styled.h3`
  text-align: center;
  font-size: 18px;
  color: #333;
  margin-bottom: 16px;
`;

const MenuItem = styled.p`
  margin: 8px 0;
  padding: 8px;
  border-radius: 4px;
  font-size: 14px;
  color: #333;
  cursor: pointer;
  transition: background-color 0.3s ease, color 0.3s ease;

  &:hover {
    background-color: #f0f0f0;
    color: #4A6E71; /* Complementary hover color */
  }
`;

const User = () => {
  const { isLogin, username, userAvatarUrl } = useContext(UserContext);

  const handleUserClick = (event) => {
    event.stopPropagation();
  };

  return (
    <Container onClick={handleUserClick}>
      <TopContainer>
        <Avatar src={userAvatarUrl} name={username} width={"60px"} height={"60px"} />
        <Username>{username ? username : "Guest"}</Username>
      </TopContainer>

      <NavLink to="/profile">Edit Profile</NavLink>
      <MenuItem>Video Save</MenuItem>
      <MenuItem>
        {isLogin ? <Logout /> : <GoogleLogin />}
      </MenuItem>
    </Container>
  );
};

export default User;
