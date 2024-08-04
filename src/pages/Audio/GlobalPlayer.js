import React from 'react';
import styled from 'styled-components';
import AudioPlayer from '../../Features/AudioPlayer/AudioPlayer';
import playerVars from '../../Features/AudioPlayer/PlayerVars';

const Container = styled.div`
  width: 100%;
  position: fixed;
  bottom: 0;
  left: 0;
  z-index: 99999;
  background: #fff;
  padding: 10px 0;
  box-shadow: 0 -4px 8px rgba(0, 0, 0, 0.1);
  height: auto; /* Ensure height is appropriate */
  overflow: hidden; /* Prevent any overflow issues */
`;

const GlobalPlayer = ({ audioId, shouldPlay }) => {
  if (!audioId) return null; // Don't render the player if there's no audioId

  return (
    <Container>
      <AudioPlayer audioId={audioId} shouldPlay={shouldPlay} playerVars={playerVars} />
    </Container>
  );
};

export default GlobalPlayer;
