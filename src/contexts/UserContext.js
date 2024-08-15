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
  const [username, setUsername] = useState('');
  const [userId, setUserId] = useState('');
  const [userAvatarUrl, setUserAvatarUrl] = useState('');

  useEffect(() => {
    let isMounted = true; // Flag to prevent setting state on unmounted component

    const getUserInfo = async () => {
      try {
        const user = await account.get();
        if (isMounted) {
          setUserInfo(user);
          setIsLogin(true);

          if (user.labels && user.labels.includes("admin")) {
            setIsAdmin(true);
          }

          setUsername(user.name || '');
          setUserId(user.$id || '');

          if (user.prefs && user.prefs.avatar) {
            setUserAvatarUrl(user.prefs.avatar);
          } 
        }
      } catch (error) {
        if (isMounted) {
          console.error('Error fetching user info:', error);
          setError(error.message);
        }
      }
    };

    getUserInfo();

    return () => {
      isMounted = false; // Cleanup flag to prevent state update on unmount
    };
  }, []);

  return (
    <UserContext.Provider
      value={{
        userInfo,
        setUserInfo,
        isLogin,
        setIsLogin,
        isAdmin,
        username,
        userId,
        userAvatarUrl,
        error,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export { UserContext, UserProvider };
