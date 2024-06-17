// LogoutButton.js

import React from 'react';
import { account } from '../db/config';

const LogoutButton = () => {
  const logout = async () => {
    try {
      await account.deleteSession('current');
      // Redirect or handle logout success as needed
      window.location.href = '/';
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  return (
    <button onClick={logout}>Logout</button>
  );
};

export default LogoutButton;
