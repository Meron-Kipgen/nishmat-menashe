import React, { useRef, useEffect, useState } from 'react';
import Hls from 'hls.js';
import styled from 'styled-components';

const VideoContainer = styled.div`
  position: relative;
  width: 100%;
  max-width: 800px;
`;

const Video = styled.video`
  width: 100%;
`;

const CustomControls = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: space-between;
  padding: 10px;
  z-index: 1;
  visibility: ${props => (props.visible ? 'visible' : 'hidden')};
  opacity: ${props => (props.visible ? 1 : 0)};
  transition: visibility 0.3s, opacity 0.3s;
`;

const ControlButton = styled.button`
  background: none;
  border: none;
  color: white;
  font-size: 1.5rem;
  cursor: pointer;
  outline: none;
`;

const FullScreenButton = styled(ControlButton)`
  font-size: 1rem;
`;

const Player = ({ src }) => {
  const videoRef = useRef(null);
  const hlsRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showControls, setShowControls] = useState(true);

  useEffect(() => {
    // Function to initialize video playback
    const initializeVideo = () => {
      if (Hls.isSupported()) {
        hlsRef.current = new Hls();
        hlsRef.current.loadSource(src);
        hlsRef.current.attachMedia(videoRef.current);
        hlsRef.current.on(Hls.Events.MANIFEST_PARSED, () => {
          videoRef.current.play();
          setIsPlaying(true);
        });

        return () => {
          if (hlsRef.current) {
            hlsRef.current.destroy();
          }
        };
      } else if (videoRef.current.canPlayType('application/vnd.apple.mpegurl')) {
        videoRef.current.src = src;
        videoRef.current.addEventListener('loadedmetadata', () => {
          videoRef.current.play();
          setIsPlaying(true);
        });
      }
    };

    initializeVideo();

    // Cleanup function
    return () => {
      if (hlsRef.current) {
        hlsRef.current.destroy();
      }
    };
  }, [src]);

  useEffect(() => {
    // Event listener for full-screen change
    const handleFullscreenChange = () => {
      setShowControls(!document.fullscreenElement);
    };

    document.addEventListener('fullscreenchange', handleFullscreenChange);

    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
    };
  }, []);

  const togglePlay = () => {
    if (videoRef.current.paused) {
      videoRef.current.play();
      setIsPlaying(true);
    } else {
      videoRef.current.pause();
      setIsPlaying(false);
    }
  };

  const toggleFullScreen = () => {
    if (!document.fullscreenElement) {
      if (videoRef.current.requestFullscreen) {
        videoRef.current.requestFullscreen();
      } else if (videoRef.current.webkitRequestFullscreen) {
        videoRef.current.webkitRequestFullscreen();
      } else if (videoRef.current.mozRequestFullScreen) {
        videoRef.current.mozRequestFullScreen();
      } else if (videoRef.current.msRequestFullscreen) {
        videoRef.current.msRequestFullscreen();
      }
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
      } else if (document.mozCancelFullScreen) {
        document.mozCancelFullScreen();
      } else if (document.msExitFullscreen) {
        document.msExitFullscreen();
      }
    }
  };

  return (
    <VideoContainer>
      <Video
        ref={videoRef}
        controls={false}
        onMouseMove={() => setShowControls(true)}
        onMouseLeave={() => setShowControls(false)}
      />
      <CustomControls visible={showControls}>
        <ControlButton onClick={togglePlay}>
          {isPlaying ? 'Pause' : 'Play'}
        </ControlButton>
        <FullScreenButton onClick={toggleFullScreen}>
          Full Screen
        </FullScreenButton>
      </CustomControls>
    </VideoContainer>
  );
};

export default Player;
