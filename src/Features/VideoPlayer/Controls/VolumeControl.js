
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { MuteIcon, VolumeIcon} from '../../../Assets/Icons';
const VolumeContainer = styled.div`
  display: flex;
  align-items: center;
`;

const Icons = styled.div`
  margin-right: 5px;
  cursor: pointer;
`;

const VolumeSlider = styled.input`
  -webkit-appearance: none;
  width: 100px;
  height: 5px;
  background: linear-gradient(to right, red ${(props) => props.value * 100}%, white ${(props) => props.value * 100}%);
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

  /* Hide on mobile */
  @media (max-width: 768px) {
    display: none;
  }
`;

const VolumeControl = ({ videoRef }) => {
  const [volume, setVolume] = useState(1); // Default volume is 100%
  const [isMuted, setIsMuted] = useState(false); // Default is not muted

  useEffect(() => {
    // Set default volume to 100% on mobile
    if (window.innerWidth <= 768) {
      setVolume(1);
      if (videoRef.current) {
        videoRef.current.volume = 1;
      }
    }
  }, []);

  const handleVolumeChange = (e) => {
    const newVolume = e.target.value;
    setVolume(newVolume);
    if (videoRef.current) {
      videoRef.current.volume = newVolume;
    }
    if (isMuted && newVolume > 0) {
      setIsMuted(false); 
    }
  };

  const toggleMute = () => {
    const newMutedState = !isMuted;
    setIsMuted(newMutedState);
    if (videoRef.current) {
      videoRef.current.muted = newMutedState;
      if (newMutedState) {
        setVolume(0); 
      } else {
        setVolume(videoRef.current.volume); 
      }
    }
  };

  return (
    <VolumeContainer>
      <Icons>
        {isMuted ? (
          <span onClick={toggleMute}>
            <MuteIcon height={30} width={30}   />
          </span>
        ) : (
          <span onClick={toggleMute}>
            <VolumeIcon height={30} width={30} />
          </span>
        )}
      </Icons>
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
