import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import Loading from '../../components/Loading';

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

const Button = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 50px;
  height: 50px;
  cursor: pointer;
  border-radius: 50%;
  background-color: #333;
  color: white;
  margin-right: 20px;

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

const VolumeSlider = styled.input`
  width: 100px;
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

const AudioPlayer = ({ audioUrl, shouldPlay, playerVars = {} }) => {
  const playerRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [isPlayerReady, setIsPlayerReady] = useState(false);
  const [isLoading, setIsLoading] = useState(true); // Initially set loading to true
  const [volume, setVolume] = useState(50); // Volume level (0-100)
  const [isMuted, setIsMuted] = useState(false);

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
          videoId: audioUrl,
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
  }, [audioUrl, playerVars]);

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
  }, [isPlayerReady, shouldPlay, audioUrl]);

  useEffect(() => {
    if (isPlayerReady && playerRef.current) {
      playerRef.current.setVolume(volume);
      playerRef.current.isMuted() ? setIsMuted(true) : setIsMuted(false);
    }
    if (volume === 0) {
      setIsMuted(true);
    }
  }, [volume, isPlayerReady]);

  const onPlayerReady = (event) => {
    setIsPlayerReady(true);
    setIsLoading(false); // Set loading to false when the player is ready
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
    if (event.data === window.YT.PlayerState.BUFFERING) {
      setIsLoading(true); // Show loading spinner when buffering
    } else if (event.data === window.YT.PlayerState.PLAYING) {
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

  const handleVolumeChange = (e) => {
    const newVolume = e.target.value;
    setVolume(newVolume);
  };

  const handleMuteUnmute = () => {
    if (isPlayerReady && playerRef.current) {
      if (isMuted) {
        playerRef.current.unMute();
        setIsMuted(false);
      } else {
        playerRef.current.mute();
        setIsMuted(true);
      }
    }
  };

  return (
    <PlayerContainer>
      <HiddenVideo>
        <div id="youtube-player" />
      </HiddenVideo>
      <Controls>
        <Button onClick={handlePlayPause}>
          {isLoading ? (
            <Loading />
          ) : (
            isPlaying ? (
              <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-player-pause-filled" width="30" height="30" viewBox="0 0 24 24" strokeWidth="1.5" stroke="#000000" fill="none" strokeLinecap="round" strokeLinejoin="round">
                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                <path d="M9 4h-2a2 2 0 0 0 -2 2v12a2 2 0 0 0 2 2h2a2 2 0 0 0 2 -2v-12a2 2 0 0 0 -2 -2z" fill="currentColor" />
                <path d="M15 4h-2a2 2 0 0 0 -2 2v12a2 2 0 0 0 2 2h2a2 2 0 0 0 2 -2v-12a2 2 0 0 0 -2 -2z" fill="currentColor" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-player-play" width="30" height="30" viewBox="0 0 24 24" strokeWidth="1.5" stroke="#000000" fill="none" strokeLinecap="round" strokeLinejoin="round">
                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                <path d="M5 4l14 8l-14 8z" fill="none" />
              </svg>
            )
          )}
        </Button>
        <Slider
          type="range"
          min="0"
          max="100"
          value={progress}
          onChange={handleSliderChange}
        />
        <VolumeSlider
          type="range"
          min="0"
          max="100"
          value={volume}
          onChange={handleVolumeChange}
        />
        <Button onClick={handleMuteUnmute}>
          {isMuted ? (
            <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-volume-mute" width="30" height="30" viewBox="0 0 24 24" strokeWidth="1.5" stroke="#000000" fill="none" strokeLinecap="round" strokeLinejoin="round">
              <path stroke="none" d="M0 0h24v24H0z" fill="none" />
              <path d="M15 8l-6 6" />
              <path d="M9 8l6 6" />
              <path d="M3 12l6 6v-12l-6 6" />
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-volume" width="30" height="30" viewBox="0 0 24 24" strokeWidth="1.5" stroke="#000000" fill="none" strokeLinecap="round" strokeLinejoin="round">
              <path stroke="none" d="M0 0h24v24H0z" fill="none" />
              <path d="M15 8l-6 6" />
              <path d="M9 8l6 6" />
              <path d="M3 12l6 6v-12l-6 6" />
              <path d="M21 12l-6 6v-12l6 6" />
            </svg>
          )}
        </Button>
        <TimeDisplay>
          {formatTime(currentTime)} / {formatTime(duration)}
        </TimeDisplay>
      </Controls>
      {isLoading && <Loading />}
    </PlayerContainer>
  );
};

export default AudioPlayer;
