import React from "react";
import styled from "styled-components";
import Loading from "../../components/Loading";

const ControlsContainer = styled.div`
  padding: 16px;
  width: 100%;
`;

const TopSection = styled.section`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 20px;
  margin-bottom: 16px;
`;

const SliderSection = styled.section`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const PlayBtn = styled.div`
  padding: 20px;
  border-radius: 50%;
  background-color: #142b42;
  display: flex;
  align-items: center;
  justify-content: center;

  cursor: pointer;
  transition: background-color 0.3s ease, transform 0.2s ease;

  &:hover {
    background-color: #0056b3;
    transform: scale(1.1);
  }
`;

const MuteBtn = styled.div`
  padding: 10px;
  border-radius: 50%;
  background-color: #142b42;
  display: flex;
  align-items: center;
  justify-content: center;

  cursor: pointer;
  transition: background-color 0.3s ease, transform 0.2s ease;

  &:hover {
    transform: scale(1.1); /* Slightly enlarge on hover */
  }
`;

const TimeDisplay = styled.span`
  font-size: 18px;
  color: #333; 
  width: 100px;
  text-align: center;
`;

const Slider = styled.input`
  -webkit-appearance: none; /* Remove default styling */
  appearance: none;
  height: 8px;
  background: #ddd; /* Track background */
  border-radius: 5px;
  cursor: pointer;
  width: 100%; /* Full width */
  margin: 0 10px; /* Spacing around sliders */

  &::-webkit-slider-thumb {
    -webkit-appearance: none;
    appearance: none;
    height: 24px;
    width: 24px;
    border-radius: 50%;
    background: #007bff; /* Thumb color */
    cursor: pointer;
  }

  &::-moz-range-thumb {
    height: 24px;
    width: 24px;
    border-radius: 50%;
    background: #007bff; /* Thumb color */
    cursor: pointer;
  }
`;

const VolumeSlider = styled(Slider)`
  width: 150px;
  @media (max-width: 768px) {
    display: none;
  }
`;

const Controls = ({
  isPlaying,
  isLoading,
  currentTime,
  duration,
  progress,
  volume,
  isMuted,
  onPlayPause,
  onSliderChange,
  onVolumeChange,
  onMuteUnmute,
}) => (
  <ControlsContainer>
    <TopSection>
      <TimeDisplay>{formatTime(currentTime)}</TimeDisplay>
      <PlayBtn onClick={onPlayPause}>
        {isLoading ? (
          <Loading size={"44px"} />
        ) : isPlaying ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="icon icon-tabler icon-tabler-player-pause"
            width="44"
            height="44"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="#ffffff"
            fill="#fff"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <path d="M6 5m0 1a1 1 0 0 1 1 -1h2a1 1 0 0 1 1 1v12a1 1 0 0 1 -1 1h-2a1 1 0 0 1 -1 -1z" />
            <path d="M14 5m0 1a1 1 0 0 1 1 -1h2a1 1 0 0 1 1 1v12a1 1 0 0 1 -1 1h-2a1 1 0 0 1 -1 -1z" />
          </svg>
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="icon icon-tabler icon-tabler-player-play"
            width="44"
            height="44"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="#ffffff"
            fill="#fff"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <path d="M7 4v16l13 -8z" />
          </svg>
        )}
      </PlayBtn>
      <TimeDisplay>{formatTime(duration)}</TimeDisplay>
    </TopSection>

    <SliderSection>
      <Slider
        type="range"
        min="0"
        max="100"
        value={progress}
        onChange={onSliderChange}
      />
      <VolumeSlider
        type="range"
        min="0"
        max="100"
        value={volume}
        onChange={onVolumeChange}
      />
      <MuteBtn onClick={onMuteUnmute}>
        {isMuted ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="icon icon-tabler icon-tabler-volume-off"
            width="30"
            height="30"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="#fff"
            fill="none"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <path d="M15 8a5 5 0 0 1 1.912 4.934m-1.377 2.602a5 5 0 0 1 -.535 .464" />
            <path d="M17.7 5a9 9 0 0 1 2.362 11.086m-1.676 2.299a9 9 0 0 1 -.686 .615" />
            <path d="M9.069 5.054l.431 -.554a.8 .8 0 0 1 1.5 .5v2m0 4v8a.8 .8 0 0 1 -1.5 .5l-3.5 -4.5h-2a1 1 0 0 1 -1 -1v-4a1 1 0 0 1 1 -1h2l1.294 -1.664" />
            <path d="M3 3l18 18" />
          </svg>
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="icon icon-tabler icon-tabler-volume"
            width="30"
            height="30"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="#fff"
            fill="none"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <path d="M15 8a5 5 0 0 1 0 8" />
            <path d="M17.7 5a9 9 0 0 1 0 14" />
            <path d="M6 15h-2a1 1 0 0 1 -1 -1v-4a1 1 0 0 1 1 -1h2l3.5 -4.5a.8 .8 0 0 1 1.5 .5v14a.8 .8 0 0 1 -1.5 .5l-3.5 -4.5" />
          </svg>
        )}
      </MuteBtn>
    </SliderSection>
  </ControlsContainer>
);

const formatTime = time => {
  const minutes = Math.floor(time / 60);
  const seconds = Math.floor(time % 60);
  return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
};

export default Controls;
