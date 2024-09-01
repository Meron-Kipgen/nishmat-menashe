import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import Controls from './Controls';

const HiddenVideo = styled.div`
  display: none;
`;

const PlayerContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const AudioPlayer = ({ audioUrl, shouldPlay, playerVars = {} }) => {
  const playerRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [isPlayerReady, setIsPlayerReady] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [volume, setVolume] = useState(50); 
  const [isMuted, setIsMuted] = useState(false);
  const [isDataLoaded, setIsDataLoaded] = useState(false); // Track data loading

  useEffect(() => {
    const loadYouTubeAPI = () => {
      const tag = document.createElement('script');
      tag.src = 'https://www.youtube.com/iframe_api';
      const firstScriptTag = document.getElementsByTagName('script')[0];
      firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

      window.onYouTubeIframeAPIReady = () => initializePlayer();
    };

    const initializePlayer = () => {
      if (window.YT && window.YT.Player) {
        if (playerRef.current) {
          playerRef.current.destroy();
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
    if (isPlayerReady && isDataLoaded && shouldPlay) {
      try {
        playerRef.current.playVideo();
        setIsPlaying(true);
      } catch (error) {
        console.error('Error playing video:', error);
      }
    }
  }, [isPlayerReady, isDataLoaded, shouldPlay]);

  useEffect(() => {
    if (isPlaying) {
      const interval = requestAnimationFrame(updateProgress);
      return () => cancelAnimationFrame(interval);
    }
  }, [isPlaying]);

  useEffect(() => {
    if (isPlayerReady && playerRef.current) {
      if (typeof playerRef.current.setVolume === 'function') {
        playerRef.current.setVolume(volume);
        if (volume === 0) {
          playerRef.current.mute();
          setIsMuted(true);
        } else {
          playerRef.current.unMute();
          setIsMuted(false);
        }
      }
    }
  }, [volume, isPlayerReady]);

  const onPlayerReady = (event) => {
    setIsPlayerReady(true);
    const videoDuration = playerRef.current.getDuration();
    if (!isNaN(videoDuration) && videoDuration > 0) {
      setDuration(videoDuration);
    }
    updateProgress();
    setIsDataLoaded(true); // Set data loaded to true
  };

  const onPlayerStateChange = (event) => {
    if (event.data === window.YT.PlayerState.BUFFERING) {
      setIsLoading(true);
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
      <Controls
        isPlaying={isPlaying}
        isLoading={isLoading}
        currentTime={currentTime}
        duration={duration}
        progress={progress}
        volume={volume}
        isMuted={isMuted}
        onPlayPause={handlePlayPause}
        onSliderChange={handleSliderChange}
        onVolumeChange={handleVolumeChange}
        onMuteUnmute={handleMuteUnmute}
      />
    </PlayerContainer>
  );
};

export default AudioPlayer;
