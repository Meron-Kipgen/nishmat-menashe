import React from 'react';
import useNotifications from './useNotifications'; // Import the custom hook

const Notification = () => {
  const { notifications, loading, error } = useNotifications();

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error loading notifications: {error.message}</div>;

  return (
    <div>
      <h2>Notifications ({notifications.length})</h2>
      <ul>
        {notifications.map(notification => (
          <li key={notification.$id}>{notification.message}</li>
        ))}
      </ul>
    </div>
  );
};

export default Notification;
