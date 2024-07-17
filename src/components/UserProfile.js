import React, { useContext } from 'react';
import styled from 'styled-components';
import { UserContext } from '../contexts/UserContext';

const ProfileCard = styled.div`
  position: absolute;
  top: 60px;
  right: 20px;
  width: 300px;
  margin: 20px auto;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  background-color: #fff;
  text-align: center;
`;

const Avatar = styled.img`
  width: 80px;
  height: 80px;
  border-radius: 50%;
  margin-bottom: 15px;
`;

const UserInfo = styled.div`
  margin-top: 15px;
`;

const UserName = styled.h2`
  margin: 10px 0;
  font-size: 1.5em;
  color: #333;
`;

const UserDetail = styled.p`
  margin: 5px 0;
  font-size: 1em;
  color: #666;
`;

const Error = styled.p`
  color: red;
`;

const Profile = () => {
  const { userInfo, error, isLogin, isAdmin } = useContext(UserContext);

  return (
    <ProfileCard>
      {error ? (
        <Error>Error: {error}</Error>
      ) : userInfo ? (
        <>
          <Avatar src={userInfo.avatar} alt="Avatar" />
          <UserInfo>
            <UserName>Welcome, {userInfo.name}</UserName>
            <UserDetail>Email: {userInfo.email}</UserDetail>
            <UserDetail>Username: {userInfo.name}</UserDetail>
            <UserDetail>Logged In: {isLogin ? 'Yes' : 'No'}</UserDetail>
            <UserName>isAdmin: {isAdmin ? 'Yes' : 'No'}</UserName>
          </UserInfo>
        </>
      ) : (
        <UserDetail>Loading...</UserDetail>
      )}
    </ProfileCard>
  );
};

export default Profile;
