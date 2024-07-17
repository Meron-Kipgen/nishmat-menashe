import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';

const ProgressContainer = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  z-index: 3;
  display: flex;
  align-items: center;
`;

const ProgressSlider = styled.input`
  width: 100%;
  appearance: none;
  background: transparent;
  cursor: pointer;
  position: relative;
  height: 5px; /* Adjusted height */

  &::-webkit-slider-runnable-track {
    width: 100%;
    height: 100%;
    background: red; /* Red color fills the track */
    border-radius: 0; /* No border radius */
    position: relative;
    z-index: 1;
  }

  &::-moz-range-track {
    width: 100%;
    height: 100%;
    background: white; /* Red color fills the track */
    border-radius: 0; /* No border radius */
  }

  &::-webkit-slider-thumb {
    appearance: none;
    width: 20px; /* Larger thumb */
    height: 20px; /* Larger thumb */
    background: white; /* Thumb color */
    border-radius: 50%;
    margin-top: -8px; /* Center the thumb */
    position: relative;
    z-index: 2;
    box-shadow: 0 0 2px rgba(0, 0, 0, 0.5);
    transition: background 0.2s ease;
  }

  &::-moz-range-thumb {
    width: 6px; /* Larger thumb */
    height: 6px; /* Larger thumb */
    background: orange; /* Thumb color */

    border: none;
    position: relative;
    z-index: 2;
    box-shadow: 0 0 2px rgba(0, 0, 0, 0.5);
    transition: background 0.2s ease;
   
  }
 
  &:focus::-webkit-slider-runnable-track {
    background: white;
  }

  &:focus::-moz-range-track {
    background: white;
  }
  &::-moz-range-progress {
    background: red;
    height: 100%;
    border-radius: 0; /* No border radius */
  }
`;

const Tooltip = styled.div`
  position: absolute;
  bottom: 20px;
  left: ${({ left }) => left}px;
  transform: translateX(-50%);
  background: #000;
  color: #fff;
  padding: 5px;
  border-radius: 3px;
  font-size: 12px;
  visibility: ${({ visible }) => (visible ? 'visible' : 'hidden')};
`;

const ProgressBar = ({ videoRef, src }) => {
  const [progress, setProgress] = useState(0);
  const [buffered, setBuffered] = useState(0);
  const [tooltip, setTooltip] = useState({ visible: false, left: 0, time: '0:00' });
  const progressBarRef = useRef(null);

  useEffect(() => {
    setProgress(0);
    setBuffered(0);
  }, [src]);

  useEffect(() => {
    const handleTimeUpdate = () => {
      if (videoRef.current) {
        const currentProgress = (videoRef.current.currentTime / videoRef.current.duration) * 100;
        setProgress(currentProgress);
      }
    };

    const handleProgress = () => {
      if (videoRef.current) {
        const bufferedTime = videoRef.current.buffered.length
          ? videoRef.current.buffered.end(videoRef.current.buffered.length - 1)
          : 0;
        const currentBuffered = (bufferedTime / videoRef.current.duration) * 100;
        setBuffered(currentBuffered);
      }
    };

    const videoElement = videoRef.current;
    if (videoElement) {
      videoElement.addEventListener('timeupdate', handleTimeUpdate);
      videoElement.addEventListener('progress', handleProgress);
      if (videoElement.readyState >= 2) {
        handleTimeUpdate();
        handleProgress();
      }
    }

    return () => {
      if (videoElement) {
        videoElement.removeEventListener('timeupdate', handleTimeUpdate);
        videoElement.removeEventListener('progress', handleProgress);
      }
    };
  }, [videoRef]);

  const handleSeek = (e) => {
    if (videoRef.current) {
      const newTime = (e.target.value / 100) * videoRef.current.duration;
      videoRef.current.currentTime = newTime;
    }
  };

  const handleMouseMove = (e) => {
    if (videoRef.current && progressBarRef.current) {
      const rect = progressBarRef.current.getBoundingClientRect();
      const offsetX = e.clientX - rect.left;
      const hoverTime = (offsetX / rect.width) * videoRef.current.duration;
      setTooltip({
        visible: true,
        left: offsetX,
        time: formatTime(hoverTime),
      });
    }
  };

  const handleMouseLeave = () => {
    setTooltip({ ...tooltip, visible: false });
  };

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60).toString().padStart(2, '0');
    return `${minutes}:${seconds}`;
  };

  return (
    <ProgressContainer
      ref={progressBarRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <ProgressSlider
        type="range"
        min="0"
        max="100"
        value={progress}
        buffered={buffered}
        onChange={handleSeek}
      />
      <Tooltip visible={tooltip.visible} left={tooltip.left}>
        {tooltip.time}
      </Tooltip>
    </ProgressContainer>
  );
};

export default ProgressBar;
