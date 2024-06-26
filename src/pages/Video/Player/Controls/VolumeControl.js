import React, { useState } from 'react';
import styled from 'styled-components';

const VolumeContainer = styled.div`
  display: flex;
  align-items: center;
`;
const VolumeIcon = styled.div`
margin-right: 5px;
cursor: pointer;
`
const VolumeSlider = styled.input`
  -webkit-appearance: none;
  width: 100px;
  height: 5px;
  background: linear-gradient(to right, red ${props => props.value * 100}%, white ${props => props.value * 100}%);
  outline: none;

  &::-webkit-slider-thumb {
    -webkit-appearance: none;
    appearance: none;
    width: 15px;
    height: 15px;
    background: red;
    cursor: pointer;
    border-radius: 50%;
  }

  &::-moz-range-thumb {
    width: 15px;
    height: 15px;
    background: red;
    cursor: pointer;
    border-radius: 50%;
    border: none;
  }
`;

const VolumeControl = ({ videoRef }) => {
  const [volume, setVolume] = useState(1); // Default volume is 100%
  const [isMuted, setIsMuted] = useState(false); // Default is not muted

  const handleVolumeChange = (e) => {
    const newVolume = e.target.value;
    setVolume(newVolume);
    if (videoRef.current) {
      videoRef.current.volume = newVolume;
    }
    if (isMuted && newVolume > 0) {
      setIsMuted(false); // Unmute if volume is adjusted while muted
    }
  };

  const toggleMute = () => {
    const newMutedState = !isMuted;
    setIsMuted(newMutedState);
    if (videoRef.current) {
      videoRef.current.muted = newMutedState;
      if (newMutedState) {
        setVolume(0); // Set volume to 0 if muted
      } else {
        setVolume(videoRef.current.volume); // Restore previous volume
      }
    }
  };

  return (
    <VolumeContainer>
      <VolumeIcon>
           {isMuted ? (
        <span><img src='/icons/video/mute.svg' alt="Mute" onClick={toggleMute} /></span>
      ) : (
        <span><img src='/icons/video/volume-high.svg' alt="Unmute" onClick={toggleMute} /></span>
      )}
      </VolumeIcon>
   
      <VolumeSlider
        type="range"
        min="0"
        max="1"
        step="0.01"
        value={volume}
        onChange={handleVolumeChange}
      />
    </VolumeContainer>
  );
};

export default VolumeControl;
