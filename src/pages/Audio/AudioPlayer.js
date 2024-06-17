import React, { useState } from "react";


const AudioPlayer = ({ audioSrc }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(null);
  const [volume, setVolume] = useState(0.5);
  const audioRef = React.createRef();

  const togglePlay = () => {
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handleTimeUpdate = () => {
    setCurrentTime(audioRef.current.currentTime);
  };

  const handleLoadedMetadata = () => {
    setDuration(audioRef.current.duration);
  };

  const handleSeek = (e) => {
    const seekTime = e.target.value;
    audioRef.current.currentTime = seekTime;
    setCurrentTime(seekTime);
  };

  const handleVolumeChange = (e) => {
    const newVolume = e.target.value;
    audioRef.current.volume = newVolume;
    setVolume(newVolume);
    if (newVolume === "0") {
      audioRef.current.muted = true;
    } else {
      audioRef.current.muted = false;
    }
  };

  const handleAudioEnd = () => {
    if (audioRef.current) {
      setIsPlaying(false);
      setCurrentTime(-0);
      audioRef.current.currentTime = 0;
    }
  };
  const getVolumeIcon = (volume) => {
    if (volume == 0) {
      return "mute.png";
    } else if (volume <= 0.4) {
      return "low-volume.png";
    } else if (volume <= 0.7) {
      return "medium-volume.png";
    } else {
      return "high-volume.png";
    }
  };


  return (
    <div>
      <input
        type="range"
        value={volume}
        min="0"
        max="1"
        step="0.01"
        onChange={handleVolumeChange}
      />

      <img
        src={`audioPlayer/${getVolumeIcon(volume)}`}
        alt="Volume Icon"
      />

      <audio
        ref={audioRef}
        src={audioSrc}
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
        onEnded={handleAudioEnd}
      />
      <span>{formatTime(duration)}</span>
      <input
        type="range"
        value={currentTime}
        max={duration || 0}
        onChange={handleSeek}
      />
      <span>{formatTime(currentTime)}</span>

      <button onClick={togglePlay}>
        {isPlaying ? (
          <img
            src="audioPlayer/pause.png"
            alt="Pause"
          />
        ) : (
          <img
            src="audioPlayer/play.png"
            alt="Play"
          />
        )}
      </button>
    </div>
  );
};

const formatTime = (time) => {
  if (isNaN(time)) {
    return "00:00";
  }
  const minutes = Math.floor(time / 60);
  const seconds = Math.floor(time % 60);
  return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
};

export default AudioPlayer;
