import React, { useEffect, useState } from 'react';

const TimeAgo = ({ createdAt }) => {
  const [timeAgo, setTimeAgo] = useState('');

  const calculateTimeAgo = (createdAt) => {
    const seconds = Math.floor((new Date() - new Date(createdAt)) / 1000);
    let interval = Math.floor(seconds / 31536000);

    if (interval >= 1) {
      return `${interval} year${interval === 1 ? "" : "s"} ago`;
    }
    interval = Math.floor(seconds / 2592000);
    if (interval >= 1) {
      return `${interval} month${interval === 1 ? "" : "s"} ago`;
    }
    interval = Math.floor(seconds / 86400);
    if (interval >= 1) {
      return `${interval} day${interval === 1 ? "" : "s"} ago`;
    }
    interval = Math.floor(seconds / 3600);
    if (interval >= 1) {
      return `${interval} hour${interval === 1 ? "" : "s"} ago`;
    }
    interval = Math.floor(seconds / 60);
    if (interval >= 1) {
      return `${interval} minute${interval === 1 ? "" : "s"} ago`;
    }
    return `${Math.floor(seconds)} second${seconds === 1 ? "" : "s"} ago`;
  };

  useEffect(() => {
    const updateTimeAgo = () => {
      setTimeAgo(calculateTimeAgo(createdAt));
    };

    // Update the time ago immediately when the component mounts
    updateTimeAgo();

    // Set up the interval to update the time ago every minute
    const intervalId = setInterval(updateTimeAgo, 60000);

    // Cleanup the interval on component unmount
    return () => clearInterval(intervalId);
  }, [createdAt]);

  return <span>{timeAgo}</span>;
};

export default TimeAgo;
