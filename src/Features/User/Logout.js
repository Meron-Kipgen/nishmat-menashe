import React, { useContext } from 'react';
import { UserContext } from '../../contexts/UserContext';
import { account } from '../../db/config'; // Ensure this import is correct

const Logout = () => {
  const { setUserInfo, setIsLogin } = useContext(UserContext);

  const handleLogout = async (event) => {
    event.preventDefault(); // Prevent default behavior

    try {
      await account.deleteSession('current');

      setUserInfo(null);
      setIsLogin(false);

      window.location.reload();

    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  return (
    <button type="button" onClick={handleLogout}>Logout</button>
  );
};

export default Logout;
