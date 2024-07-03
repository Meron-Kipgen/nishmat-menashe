import React from 'react';
import { account } from '../../db/config';

const GoogleLogin = () => {
  const handleGoogleLogin = async () => {
    console.log('Handle Google login called');
    try {
      const res = await account.createOAuth2Session('google', 'http://localhost:3000/user', 'http://localhost:3000/login');
      
    } catch (error) {
      console.error('Error during Google login:', error);
    
    }
  };

  return (
    <button onClick={handleGoogleLogin}>Login with Google</button>
  );
};

export default GoogleLogin;
