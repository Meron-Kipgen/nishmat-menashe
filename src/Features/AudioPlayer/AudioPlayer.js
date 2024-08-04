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
  width: 400px;
  margin: 0 10px;
`;

const TimeDisplay = styled.div`
  font-size: 14px;
  margin: 0 10px;
`;

const formatTime = (seconds) => {
  if (isNaN(seconds) || seconds === Infinity) {
    return '00:00:00';
  }
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const secs = Math.floor(seconds % 60);
  return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
};

const AudioPlayer = ({ audioId, shouldPlay, playerVars = {} }) => {
  const playerRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [isPlayerReady, setIsPlayerReady] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const loadYouTubeAPI = () => {
      const tag = document.createElement('script');
      tag.src = 'https://www.youtube.com/iframe_api';
      const firstScriptTag = document.getElementsByTagName('script')[0];
      firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

      window.onYouTubeIframeAPIReady = () => {
        initializePlayer();
      };
    };

    const initializePlayer = () => {
      if (window.YT && window.YT.Player) {
        if (playerRef.current) {
          playerRef.current.destroy(); // Clean up the old player
        }
        playerRef.current = new window.YT.Player('youtube-player', {
          videoId: audioId,
          playerVars: playerVars,
          events: {
            onReady: onPlayerReady,
            onStateChange: onPlayerStateChange,
          },
        });
      } else {
        loadYouTubeAPI();
      }
    };

    initializePlayer();

    return () => {
      if (playerRef.current) {
        playerRef.current.destroy();
        playerRef.current = null;
      }
    };
  }, [audioId, playerVars]);

  useEffect(() => {
    if (isPlaying) {
      const interval = requestAnimationFrame(updateProgress);
      return () => cancelAnimationFrame(interval);
    }
  }, [isPlaying]);

  useEffect(() => {
    if (isPlayerReady && shouldPlay && playerRef.current) {
      try {
        playerRef.current.playVideo();
      } catch (error) {
        console.error('Error playing video:', error);
      }
    }
  }, [isPlayerReady, shouldPlay, audioId]);

  const onPlayerReady = (event) => {
    setIsPlayerReady(true);
    const videoDuration = playerRef.current.getDuration();
    if (!isNaN(videoDuration) && videoDuration > 0) {
      setDuration(videoDuration);
    }
    updateProgress();
    if (shouldPlay) {
      try {
        playerRef.current.playVideo();
      } catch (error) {
        console.error('Error playing video:', error);
      }
    }
  };

  const onPlayerStateChange = (event) => {
    if (event.data === window.YT.PlayerState.PLAYING) {
      setIsPlaying(true);
      setIsLoading(false);
    } else if (event.data === window.YT.PlayerState.PAUSED) {
      setIsPlaying(false);
      setIsLoading(false);
    } else if (event.data === window.YT.PlayerState.ENDED) {
      setIsPlaying(false);
      setIsLoading(false);
      setCurrentTime(0);
      setProgress(0);
    }
  };

  const updateProgress = () => {
    if (playerRef.current && playerRef.current.getDuration) {
      const videoDuration = playerRef.current.getDuration();
      const currentTime = playerRef.current.getCurrentTime();
      if (!isNaN(videoDuration) && videoDuration > 0) {
        setProgress((currentTime / videoDuration) * 100);
        setCurrentTime(currentTime);
      }
      if (isPlaying) {
        requestAnimationFrame(updateProgress);
      }
    }
  };

  const handlePlayPause = () => {
    if (isPlayerReady && playerRef.current) {
      if (!isPlaying) {
        setIsLoading(true);
        try {
          playerRef.current.playVideo();
        } catch (error) {
          console.error('Error playing video:', error);
        }
      } else {
        try {
          playerRef.current.pauseVideo();
        } catch (error) {
          console.error('Error pausing video:', error);
        }
      }
    } else {
      console.error('playerRef.current is not initialized or does not have playVideo method');
    }
  };

  const handleSliderChange = (e) => {
    if (isPlayerReady && playerRef.current && playerRef.current.getDuration) {
      const newTime = (e.target.value / 100) * duration;
      try {
        playerRef.current.seekTo(newTime);
      } catch (error) {
        console.error('Error seeking to time:', error);
      }
      setProgress(e.target.value);
      setCurrentTime(newTime);
    }
  };

  return (
    <PlayerContainer>
      <HiddenVideo>
        <div id="youtube-player" />
      </HiddenVideo>
      <Controls>
        <Button onClick={handlePlayPause}>
          {isLoading ? 'Loading...' : (isPlaying ? 'Pause' : 'Play')}
        </Button>
        <TimeDisplay>
          {formatTime(currentTime)} 
        </TimeDisplay>
        <Slider
          type="range"
          min="0"
          max="100"
          value={progress}
          onChange={handleSliderChange}
        />
         {formatTime(duration - 0.5)} 
      </Controls>
    </PlayerContainer>
  );
};

export default AudioPlayer;
