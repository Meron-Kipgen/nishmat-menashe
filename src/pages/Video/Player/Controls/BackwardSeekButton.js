import React from 'react';
import styled from 'styled-components';

const SeekButton = styled.div`
  margin-left: 10px;


  cursor: pointer;

`;

const BackwardSeekButton = ({ onSeekBackward }) => {
  const handleSeekBackward = () => {
    onSeekBackward();
  };

  return (
    <SeekButton onClick={handleSeekBackward}><img src="/icons/video/backward.svg" alt='backward'/></SeekButton>
  );
};

export default BackwardSeekButton;
