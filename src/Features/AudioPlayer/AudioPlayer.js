import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';

const PlayerContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
`;

const HiddenVideo = styled.div`
  width: 0;
  height: 0;
  overflow: hidden;
`;

const Controls = styled.div`
  display: flex;
  align-items: center;
  margin-top: 10px;
`;

const Button = styled.button`
  padding: 10px;
  margin-right: 10px;
  cursor: pointer;
  border: none;
  background-color: #333;
  color: white;
  border-radius: 5px;

  &:hover {
    background-color: #555;
  }

  &:disabled {
    background-color: #888;
    cursor: not-allowed;
  }
`;

const Slider = styled.input`
  width: 100%;
  margin: 0 10px;
`;

const AudioPlayer = ({ audioId, playerVars = {} }) => {
  const playerRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [isPlayerReady, setIsPlayerReady] = useState(false);
  const [isLoading, setIsLoading] = useState(false); // Track loading state

  useEffect(() => {
    const loadYouTubeAPI = () => {
      const tag = document.createElement('script');
      tag.src = 'https://www.youtube.com/iframe_api';
      const firstScriptTag = document.getElementsByTagName('script')[0];
      firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

      window.onYouTubeIframeAPIReady = () => {
        playerRef.current = new window.YT.Player('youtube-player', {
          videoId: audioId,
          playerVars: playerVars,
          events: {
            onReady: onPlayerReady,
            onStateChange: onPlayerStateChange,
          },
        });
      };
    };

    if (!window.YT || !window.YT.Player) {
      loadYouTubeAPI();
    } else {
      playerRef.current = new window.YT.Player('youtube-player', {
        videoId: audioId,
        playerVars: playerVars,
        events: {
          onReady: onPlayerReady,
          onStateChange: onPlayerStateChange,
        },
      });
    }

    return () => {
      if (playerRef.current) {
        playerRef.current.destroy();
        playerRef.current = null;
      }
    };
  }, [audioId, playerVars]);

  const onPlayerReady = (event) => {
    setIsPlayerReady(true);
    if (isLoading) {
      setIsLoading(false);
    }
    updateProgress();
  };

  const onPlayerStateChange = (event) => {
    if (event.data === window.YT.PlayerState.PLAYING) {
      setIsPlaying(true);
      setIsLoading(false); // Reset loading when video starts playing
      updateProgress();
    } else if (event.data === window.YT.PlayerState.PAUSED) {
      setIsPlaying(false);
      setIsLoading(false); // Reset loading when video is paused
    } else if (event.data === window.YT.PlayerState.ENDED) {
      setIsPlaying(false);
      setIsLoading(false); // Reset loading when video ends
    }
  };

  const updateProgress = () => {
    if (playerRef.current && playerRef.current.getDuration) {
      const duration = playerRef.current.getDuration();
      const currentTime = playerRef.current.getCurrentTime();
      setProgress((currentTime / duration) * 100);
      if (isPlaying) {
        requestAnimationFrame(updateProgress);
      }
    }
  };

  const handlePlayPause = () => {
    if (isPlayerReady && playerRef.current) {
      if (!isPlaying) {
        setIsLoading(true); // Set loading state when play is clicked
        playerRef.current.playVideo();
      } else {
        playerRef.current.pauseVideo();
      }
    } else {
      console.error('playerRef.current is not initialized or does not have playVideo method');
    }
  };

  const handleSliderChange = (e) => {
    if (isPlayerReady && playerRef.current && playerRef.current.getDuration) {
      const newTime = (e.target.value / 100) * playerRef.current.getDuration();
      playerRef.current.seekTo(newTime);
      setProgress(e.target.value);
    }
  };

  return (
    <PlayerContainer>
      <HiddenVideo>
        <div id="youtube-player" />
      </HiddenVideo>
      <Controls>
        <Button
          onClick={handlePlayPause}
        
        >
          {isLoading ? 'Loading...' : (isPlaying ? 'Pause' : 'Play')}
        </Button>
        <Slider
          type="range"
          min="0"
          max="100"
          value={progress}
          onChange={handleSliderChange}
        
        />
      </Controls>
    </PlayerContainer>
  );
};

export default AudioPlayer;
