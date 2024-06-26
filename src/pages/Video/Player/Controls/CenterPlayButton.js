import React from 'react';
import styled from 'styled-components';

const Button = styled.button`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  border: 6px solid white;
  background: none;
  border-radius: 50%;
  padding: 9px;
  cursor: pointer;

  /* Ensure the button is always visible */
  display: ${(props) => (props.isPlaying ? 'none' : 'block')};
`;

const CenterPlayButton = ({ onClick, isPlaying }) => (
  <Button onClick={onClick} isPlaying={isPlaying}>
    <img src={isPlaying ? "/icons/video/pause.svg" : "/icons/video/play.svg"} alt={isPlaying ? "pause" : "play"} />
  </Button>
);

export default CenterPlayButton;
