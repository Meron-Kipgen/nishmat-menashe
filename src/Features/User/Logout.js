import React, { useContext } from 'react';
import { UserContext } from '../../contexts/UserContext';
import { account } from '../../db/config'; // Ensure this import is correct

const Logout = () => {
  const { setUserInfo, setIsLogin } = useContext(UserContext);

  const handleLogout = async () => {
    try {

      await account.deleteSession('current');

      setUserInfo(null);
      setIsLogin(false);

      localStorage.removeItem('userToken'); 
     
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  return (
    <button onClick={handleLogout}>Logout</button>
  );
};

export default Logout;
