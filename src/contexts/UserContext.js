// UserContext.js
import React, { createContext, useState, useEffect } from 'react';
import { account } from '../db/config';

// Create the UserContext
const UserContext = createContext();

// Create a UserProvider component
const UserProvider = ({ children }) => {
  const [userInfo, setUserInfo] = useState(null);
  const [error, setError] = useState(null);
  const [isLogin, setIsLogin] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const getUserInfo = async () => {
      try {
        const user = await account.get();
  
        setUserInfo(user);
        setIsLogin(true);
        if (user.labels && user.labels.includes("admin")) {
          setIsAdmin(true);
        }
      } catch (error) {
        console.error('Error fetching user info:', error);
        setError(error.message);
      }
    };

    getUserInfo();
  }, []);

  return (
    <UserContext.Provider value={{ userInfo, error, isLogin, isAdmin }}>
      {children}
    </UserContext.Provider>
  );
};

export { UserContext, UserProvider };
