// UserProfile.js

import React, { useState, useEffect } from 'react';
import { account } from '../db/config';  // Adjust the path based on your file structure

function UserProfile() {
    const [userInfo, setUserInfo] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await account.get(); // Fetch user data from Appwrite
                setUserInfo(response); // Update state with user data
            } catch (error) {
                setError(error); // Handle errors
            } finally {
                setLoading(false); // Update loading state
            }
        };

        fetchUserData(); // Call the function when component mounts
    }, []);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error.message}</p>;

    return (
        <div>
            <h2>User Profile</h2>
            {userInfo && (
                <div>
                    <p>Name: {userInfo.name}</p>
                    <p>Email: {userInfo.email}</p>
                    {/* Add more user details as needed */}
                </div>
            )}
        </div>
    );
}

export default UserProfile;
