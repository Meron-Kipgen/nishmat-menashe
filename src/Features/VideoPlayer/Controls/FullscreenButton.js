import React, { useState, useEffect } from 'react';
import { MaximizeIcon, MinimizeIcon } from '../../../Assets/Icons';

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
      {isFullscreen ? <MinimizeIcon height={30} width={30}/> : <MaximizeIcon height={30} width={30}/> }
    </div>
  );
};

export default FullscreenButton;
