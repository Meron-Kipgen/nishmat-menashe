import React from "react";
import "@vidstack/react/player/styles/base.css";
import "@vidstack/react/player/styles/plyr/theme.css";
import { MediaPlayer, MediaProvider } from "@vidstack/react";
import { PlyrLayout, plyrLayoutIcons } from "@vidstack/react/player/layouts/plyr";
import styled from "styled-components";

// Define a styled component for the MediaPlayer
const StyledMediaPlayer = styled(MediaPlayer)`
  --plyr-border-radius: none;
`;

const Player = ({ videoUrl}) => {
  const videoId = `https://www.youtube.com/watch?v=${videoUrl}&hd=1`;

  return (
    <StyledMediaPlayer src={videoId} playsInline>
      <MediaProvider />
      <PlyrLayout icons={plyrLayoutIcons} />
    </StyledMediaPlayer>
  );
};

export default Player;
