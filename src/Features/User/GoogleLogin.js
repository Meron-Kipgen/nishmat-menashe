import React from 'react';
import { account } from '../../db/config';

const GoogleLogin = () => {
  const handleGoogleLogin = async () => {
    console.log('Handle Google login called');
    try {
      const currentUrl = window.location.href;
      const res = await account.createOAuth2Session('google', currentUrl, currentUrl);
    } catch (error) {
      console.error('Error during Google login:', error);
    }
  };

  return (
    <button onClick={handleGoogleLogin}>Login with Google</button>
  );
};

export default GoogleLogin;
