// GoogleLogin.js

import React from 'react';
import { account } from '../db/config';

const GoogleLogin = () => {
  const login = async () => {
    try {
      await account.createOAuth2Session('google', 'http://localhost:3000');
    } catch (error) {
      console.error('Google login failed:', error);
    }
  };

  return (
    <button onClick={login}>Login with Google</button>
  );
};

export default GoogleLogin;
