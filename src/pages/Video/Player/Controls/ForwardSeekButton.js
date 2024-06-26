import React from "react";
import styled from "styled-components";

const SeekButton = styled.div`
  cursor: pointer;
`;

const ForwardSeekButton = ({ onSeekForward }) => {
  const handleSeekForward = () => {
    onSeekForward();
  };

  return (
    <SeekButton onClick={handleSeekForward}>
      <img src="/icons/video/forward.svg" alt="forward" />
    </SeekButton>
  );
};

export default ForwardSeekButton;
