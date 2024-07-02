import React, { useRef, useEffect, useState } from "react";
import styled from "styled-components";
import Hls from "hls.js";
import PlayButton from "./Controls/PlayButton";
import FullscreenButton from "./Controls/FullscreenButton";
import VolumeControl from "./Controls/VolumeControl";
import ProgressBar from "./Controls/ProgressBar";
import QualitySelector from "./Controls/QualitySelector";
import PlaybackSpeedControl from "./Controls/PlaybackSpeedControl";
import ForwardSeekButton from "./Controls/ForwardSeekButton";
import BackwardSeekButton from "./Controls/BackwardSeekButton";
import DurationDisplay from "./Controls/DurationDisplay";
import CenterPlayButton from "./Controls/CenterPlayButton";

const Container = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  overflow: hidden; /* Ensure controls outside are hidden when not hovered */
`;

const Video = styled.video`
  width: 100%;
  height: 100%; /* Adjust height based on aspect ratio */
  object-fit: cover;
`;

const ControlsContainer = styled.div`
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  padding: 10px;
  background: rgba(0, 0, 0, 0.4);
  bottom: 0;
  left: 0;
  z-index: 1;
  opacity: ${(props) => (props.showControls ? 1 : 0)};
  transition: opacity 0.3s ease;
`;

const ControlTop = styled.div`
  width: 100%;
`;

const LeftControls = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const RightControls = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const CenterContol = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

const Player = ({
  src,
  poster,
  showPlay = true,
  showFullscreen = true,
  showVolume = true,
  showProgress = true,
  showQuality = true,
  showPlaybackSpeed = true,
  showBackwardSeekButton = true,
  showForwardSeekButton = true,
  showDuration = true,
  showCenterPlayButton = true,
}) => {
  const containerRef = useRef(null);
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showControls, setShowControls] = useState(false);
  const [qualities, setQualities] = useState([]);
  const [currentQuality, setCurrentQuality] = useState("auto");
  const [currentSpeed, setCurrentSpeed] = useState(1);
  const hlsRef = useRef(null);
  const controlTimeout = useRef(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.pause();
      setIsPlaying(false);
      setCurrentSpeed(1); // Reset speed to normal

      if (Hls.isSupported()) {
        const hls = new Hls();
        hls.loadSource(src);
        hls.attachMedia(videoRef.current);
        hlsRef.current = hls;

        hls.on(Hls.Events.MANIFEST_PARSED, () => {
          const availableQualities = hls.levels.map((level) => level.height);
          setQualities(availableQualities);
          setCurrentQuality("auto");
        });

        hls.on(Hls.Events.LEVEL_SWITCHED, (event, data) => {
          setCurrentQuality(hls.levels[data.level].height);
        });

        return () => {
          hls.destroy();
        };
      } else if (
        videoRef.current.canPlayType("application/vnd.apple.mpegurl")
      ) {
        videoRef.current.src = src;
        setCurrentQuality("auto");
      }
    }
  }, [src]);

  useEffect(() => {
    const handleMouseMove = () => {
      setShowControls(true);
      resetControlTimeout();
    };

    const handleMouseLeave = () => {
      resetControlTimeout();
    };

    const resetControlTimeout = () => {
      clearTimeout(controlTimeout.current);
      controlTimeout.current = setTimeout(() => {
        setShowControls(false);
      }, 3000); // Adjust timeout duration (in milliseconds) as needed
    };

    const container = containerRef.current; // Store current ref to prevent issues with cleanup

    if (container) {
      container.addEventListener("mousemove", handleMouseMove);
      container.addEventListener("mouseleave", handleMouseLeave);
    }

    return () => {
      if (container) {
        container.removeEventListener("mousemove", handleMouseMove);
        container.removeEventListener("mouseleave", handleMouseLeave);
      }
      clearTimeout(controlTimeout.current);
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

  const handleVideoClick = (event) => {
    event.preventDefault(); // Prevent default play/pause behavior on video click
  };

  const handleQualityChange = (quality) => {
    if (quality === "auto") {
      hlsRef.current.currentLevel = -1;
    } else {
      const selectedLevelIndex = qualities.findIndex(
        (q) => q === parseInt(quality, 10)
      );
      hlsRef.current.currentLevel = selectedLevelIndex;
    }
    setCurrentQuality(quality);
  };

  const handleSpeedChange = (speed) => {
    videoRef.current.playbackRate = speed;
    setCurrentSpeed(speed);
  };

  const handleSeekForward = () => {
    if (videoRef.current) {
      videoRef.current.currentTime += 15;
    }
  };

  const handleSeekBackward = () => {
    if (videoRef.current) {
      videoRef.current.currentTime -= 15;
    }
  };

  const resetControlTimeout = () => {
    clearTimeout(controlTimeout.current);
    if (isPlaying) {
      controlTimeout.current = setTimeout(() => {
        setShowControls(false);
      }, 3000); // Adjust timeout duration (in milliseconds) as needed
    }
  };

  return (
    <>
      <Container
        ref={containerRef}
        onMouseEnter={() => {
          setShowControls(true);
          resetControlTimeout();
        }}
        onMouseMove={() => {
          setShowControls(true);
          resetControlTimeout();
        }}
        onMouseLeave={() => {
          setShowControls(false);
        }}
      >
        <Video ref={videoRef} onClick={handleVideoClick} poster={poster} /> 
        <ControlTop>
            {showProgress && <ProgressBar videoRef={videoRef} src={src} />}
          </ControlTop>
        <ControlsContainer showControls={showControls}>
         
          <LeftControls>
            {showBackwardSeekButton && (
              <BackwardSeekButton onSeekBackward={handleSeekBackward} />
            )}
            {showPlay && (
              <PlayButton onClick={togglePlay} isplaying={isPlaying} />
            )}
            {showForwardSeekButton && (
              <ForwardSeekButton onSeekForward={handleSeekForward} />
            )}
            {showDuration && <DurationDisplay videoRef={videoRef} src={src} />}
            {showVolume && <VolumeControl videoRef={videoRef} />}
          </LeftControls>
          <RightControls>
            {showQuality && (
              <QualitySelector
                qualities={qualities}
                currentQuality={currentQuality}
                onChange={handleQualityChange}
              />
            )}
            {showPlaybackSpeed && (
              <PlaybackSpeedControl
                currentSpeed={currentSpeed}
                onChange={handleSpeedChange}
              />
            )}
            {showFullscreen && <FullscreenButton containerRef={containerRef} />}
          </RightControls>
        </ControlsContainer>
        <CenterContol>
          {showCenterPlayButton && (
            <CenterPlayButton onClick={togglePlay} isplaying={isPlaying} />
          )}
        </CenterContol>
      </Container>
    </>
  );
};

export default Player;
