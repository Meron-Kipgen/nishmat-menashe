import React from 'react';
import styled from 'styled-components';
import { BackwardIcon } from '../../../Assets/Icons';

const SeekButton = styled.div`
  margin-left: 10px;


  cursor: pointer;

`;

const BackwardSeekButton = ({ onSeekBackward }) => {
  const handleSeekBackward = () => {
    onSeekBackward();
  };

  return (
    <SeekButton onClick={handleSeekBackward}><BackwardIcon height={30} width={30}/></SeekButton>
  );
};

export default BackwardSeekButton;
