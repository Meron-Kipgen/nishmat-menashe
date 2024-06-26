import React, { useState, useEffect } from 'react';

const FullscreenButton = ({ containerRef }) => {
  const [isFullscreen, setIsFullscreen] = useState(false);

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };

    document.addEventListener('fullscreenchange', handleFullscreenChange);

    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
    };
  }, []);

  const toggleFullscreen = () => {
    if (!isFullscreen) {
      if (containerRef.current.requestFullscreen) {
        containerRef.current.requestFullscreen();
      }
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      }
    }
  };

  return (
    <div onClick={toggleFullscreen}>
      {isFullscreen ? <img src="/icons/video/minimize.svg" alt='minimize'/> : <img src="/icons/video/maximize.svg" alt='maximize'/> }
    </div>
  );
};

export default FullscreenButton;
