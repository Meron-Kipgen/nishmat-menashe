// DurationDisplay.js
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

const DurationContainer = styled.div`
  color: white;
  font-size: 14px;
`;

const formatTime = (time) => {
  const mins = Math.floor(time / 60);
  const secs = Math.floor(time % 60);
  return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
};

const DurationDisplay = ({ videoRef, src }) => {
  const [currentTime, setCurrentTime] = useState('00:00');
  const [duration, setDuration] = useState('00:00');

  useEffect(() => {
    const video = videoRef.current;

    const updateDuration = () => {
      if (video) {
        setDuration(formatTime(video.duration));
      }
    };

    const updateCurrentTime = () => {
      if (video) {
        setCurrentTime(formatTime(video.currentTime));
      }
    };

    if (video) {
      video.addEventListener('loadedmetadata', updateDuration);
      video.addEventListener('timeupdate', updateCurrentTime);
    }

    // Reset current time and duration when src changes
    setCurrentTime('00:00');
    setDuration('00:00');

    return () => {
      if (video) {
        video.removeEventListener('loadedmetadata', updateDuration);
        video.removeEventListener('timeupdate', updateCurrentTime);
      }
    };
  }, [videoRef, src]);

  return (
    <DurationContainer>
      {currentTime} / {duration}
    </DurationContainer>
  );
};

export default DurationDisplay;
