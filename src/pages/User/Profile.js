import { useEffect, useState } from "react";
import { account } from '../../db/config';

const Profile = () => {
  const [userInfo, setUserInfo] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getUserInfo = async () => {
      try {
        const user = await account.get();
        console.log(user); 
        setUserInfo(user);
      } catch (error) {
        console.error('Error fetching user info:', error);
        setError(error.message); 
      }
    };

    getUserInfo();
  }, []);

  return (
    <div>
      {error ? (
        <p>Error: {error}</p>
      ) : userInfo ? (
        <>
          <h2>Welcome, {userInfo.name}</h2>
          <p>Email: {userInfo.email}</p>
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default Profile;
