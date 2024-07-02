import React from 'react';
import styled from 'styled-components';

const PlayPauseButton = styled.div`
  cursor: pointer;
`;

const PlayButton = ({ onClick, isplaying }) => (
  <PlayPauseButton onClick={onClick}>
    {isplaying ? <img src="/icons/video/pause.svg" alt='pause'/> : <img src="/icons/video/play.svg" alt='play'/> }
  </PlayPauseButton>
);

export default PlayButton;
