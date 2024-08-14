import React, { useContext } from 'react';
import styled from 'styled-components';
import { UserContext } from '../../contexts/UserContext';
import GoogleLogin from './GoogleLogin';
import Logout from './Logout';
import Avatar from './Avatar';
import UploadProfile from './UploadProfile';

const ProfileWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  max-width: 800px;
  margin: auto;
  background: #f9f9f9;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

const CoverPhoto = styled.div`
  width: 100%;
  height: 200px;
  background: url('https://via.placeholder.com/800x200') no-repeat center center;
  background-size: cover;
  border-radius: 10px 10px 0 0;
  margin-bottom: 20px;
`;

const ProfileInfo = styled.div`
  text-align: center;
  width: 100%;
`;

const UserName = styled.h2`
  font-size: 2rem;
  margin: 10px 0;
  color: #333;
`;

const UserDetails = styled.p`
  font-size: 1rem;
  color: #666;
  margin: 5px 0;
`;

const FeatureList = styled.div`
  display: flex;
  justify-content: space-around;
  margin-top: 20px;
`;

const FeatureItem = styled.div`
  text-align: center;
  padding: 10px;
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  width: 100px;
`;

const FeatureTitle = styled.p`
  font-size: 0.875rem;
  color: #999;
  margin-bottom: 5px;
`;

const FeatureValue = styled.p`
  font-size: 1.25rem;
  color: #333;
  font-weight: bold;
`;

const Profile = () => {
  const { userAvatarUrl, isLogin, username,email } = useContext(UserContext);

  return (
    <ProfileWrapper>
      <CoverPhoto />
      <ProfileInfo>
        {isLogin && (
          <>
            <Avatar src={userAvatarUrl} name={username} />
            <UserName>{username}</UserName>
            <UserDetails>Email: {email}</UserDetails>
            <UserDetails>Username: {username}</UserDetails>
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
            {isLogin && (
              <>
                <Logout />
                <UploadProfile />
              </>
            )}
          </>
        )}
      </ProfileInfo>
      {!isLogin && <GoogleLogin />}
    </ProfileWrapper>
  );
};

export default Profile;
