import React, { useState, useEffect } from 'react';
import Draggable from 'react-draggable';
import styled from 'styled-components';
import { FaTimes, FaExpand, FaCompress } from 'react-icons/fa';
import playerVars from '../../Features/AudioPlayer/PlayerVars';
import AudioPlayer from '../../Features/AudioPlayer/AudioPlayer';

const GlobalPlayer = ({ audioUrl, shouldPlay, thumbnail, title, onClose, rabbi }) => {
  const [isVisible, setIsVisible] = useState(true);
  const [isMaximized, setIsMaximized] = useState(false);

  useEffect(() => {
    console.log('GlobalPlayer mounted or updated with audioUrl:', audioUrl);
    if (audioUrl) {
      setIsVisible(true);
    }
  }, [audioUrl]);

  useEffect(() => {
    console.log('GlobalPlayer shouldPlay:', shouldPlay);
  }, [shouldPlay]);

  const handleClose = () => {
    setIsVisible(false);
    onClose();
  };

  const handleToggle = () => {
    setIsMaximized(!isMaximized);
  };

  if (!audioUrl || !isVisible) return null;

  const PlayerContent = (
    <Container isMaximized={isMaximized}>
      <Thumbnail isMaximized={isMaximized}>
        <img src={thumbnail} alt="Thumbnail" />
      </Thumbnail>
      <Content isMaximized={isMaximized}>
        <Title>{title}</Title>
        <AudioContainer>
          <AudioPlayer 
            key={audioUrl} 
            audioUrl={audioUrl} 
            shouldPlay={shouldPlay} 
            playerVars={playerVars} 
          />
        </AudioContainer>
        <Rabbi>By: {rabbi}</Rabbi>
      </Content>
      <CloseButton onClick={handleClose}>
        <FaTimes />
      </CloseButton>
      <MaximizeButton onClick={handleToggle}>
        {isMaximized ? <FaCompress /> : <FaExpand />}
      </MaximizeButton>
    </Container>
  );

  return isMaximized ? (
    <Draggable>{PlayerContent}</Draggable>
  ) : (
    PlayerContent
  );
};

const Container = styled.div`
  position: fixed;
  bottom: 10px;
  right: 10px;
  display: flex;
  flex-direction: ${({ isMaximized }) => (isMaximized ? 'column' : 'row')};
  align-items: center;
  background-color: #fff;
  padding: ${({ isMaximized }) => (isMaximized ? '20px' : '10px')};
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  border-radius: 8px;
  z-index: 1000;
  cursor:${({ isMaximized }) => (isMaximized ? 'move' : '')};
`;

const Thumbnail = styled.div`
  margin-right: ${({ isMaximized }) => (isMaximized ? '0' : '10px')};
  margin-bottom: ${({ isMaximized }) => (isMaximized ? '10px' : '0')};

  img {
    width: ${({ isMaximized }) => (isMaximized ? '150px' : '50px')};
    height: ${({ isMaximized }) => (isMaximized ? '150px' : '50px')};
    border-radius: 8px;
  }
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: ${({ isMaximized }) => (isMaximized ? 'center' : 'flex-start')};
  flex: 1;
`;

const Title = styled.h3`
  margin: 0;
  font-size: ${({ isMaximized }) => (isMaximized ? '24px' : '16px')};
`;

const AudioContainer = styled.div`
  margin-top: ${({ isMaximized }) => (isMaximized ? '10px' : '5px')};
`;

const Rabbi = styled.p`
  margin: 0;
  font-size: ${({ isMaximized }) => (isMaximized ? '16px' : '12px')};
  color: #555;
`;

const CloseButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  background: none;
  border: none;
  font-size: 16px;
  cursor: pointer;
  color: #555;

  &:hover {
    color: #000;
  }
`;

const MaximizeButton = styled.button`
  position: absolute;
  bottom: 10px;
  right: 10px;
  background: none;
  border: none;
  font-size: 16px;
  cursor: pointer;
  color: #555;

  &:hover {
    color: #000;
  }
`;

export default GlobalPlayer;
