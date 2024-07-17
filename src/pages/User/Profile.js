import React, { useContext } from 'react';
import { UserContext } from '../../contexts/UserContext';

const Profile = () => {
  const { userInfo, error, isLogin } = useContext(UserContext);

  return (
    <div>
      {error ? (
        <p>Error: {error}</p>
      ) : userInfo ? (
        <>
          <h2>Welcome, {userInfo.name}</h2>
          <p>Email: {userInfo.email}</p>
          <p>Avatar: <img src={userInfo.avatar} alt="Avatar" /></p>
          <p>Username: {userInfo.username}</p>
          <p>Logged In: {isLogin ? 'Yes' : 'No'}</p>
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default Profile;
