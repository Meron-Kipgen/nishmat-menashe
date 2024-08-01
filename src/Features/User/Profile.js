import React, { useContext } from 'react';
import styled from 'styled-components';
import { UserContext } from '../../contexts/UserContext';
import GoogleLogin from './GoogleLogin';
import Logout from './Logout';
import Avatar from './Avatar';


const ProfileWrapper = styled.div`
  position: absolute;
  top: 60px;
  right: 0;
  width: 300px;
  margin: 20px auto;
  border: 1px solid #ddd;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  overflow: hidden;
`;

const CoverPhoto = styled.div`
  height: 200px;
  background: url(${props => props.src}) center/cover no-repeat;
`;

const ProfileInfo = styled.div`
  padding: 20px;
  text-align: center;
`;

const UserName = styled.h2`
  margin: 10px 0;
  font-size: 24px;
`;

const UserDetails = styled.p`
  font-size: 16px;
  color: #555;
  margin: 5px 0;
`;

const FeatureList = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 20px;
`;

const FeatureItem = styled.div`
  margin: 0 15px;
  text-align: center;
`;

const FeatureTitle = styled.p`
  font-size: 16px;
  font-weight: bold;
  color: #333;
`;

const FeatureValue = styled.p`
  font-size: 18px;
  color: #777;
`;

const Profile = () => {
  const { userInfo, isLogin } = useContext(UserContext);

  return (
    <ProfileWrapper>
      <CoverPhoto src="https://via.placeholder.com/800x200" />
      <ProfileInfo>
        {userInfo && (
          <>
            <Avatar src={userInfo.avatar} name={userInfo.name} />
            <UserName>{userInfo.name}</UserName>
            <UserDetails>Email: {userInfo.email}</UserDetails>
            <UserDetails>Username: {userInfo.username}</UserDetails>
            <UserDetails>Logged In: {isLogin ? 'Yes' : 'No'}</UserDetails>
            <FeatureList>
              <FeatureItem>
                <FeatureTitle>Friends</FeatureTitle>
                <FeatureValue>123</FeatureValue>
              </FeatureItem>
              <FeatureItem>
                <FeatureTitle>Posts</FeatureTitle>
                <FeatureValue>456</FeatureValue>
              </FeatureItem>
              <FeatureItem>
                <FeatureTitle>Likes</FeatureTitle>
                <FeatureValue>789</FeatureValue>
              </FeatureItem>
            </FeatureList>
            {isLogin && <Logout />}
          </>
        )}
      </ProfileInfo>
      {!isLogin && <GoogleLogin />}
    </ProfileWrapper>
  );
};

export default Profile;
