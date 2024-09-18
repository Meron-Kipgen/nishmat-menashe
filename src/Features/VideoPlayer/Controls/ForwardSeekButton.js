import React from "react";
import styled from "styled-components";
import { ForwardIcon } from "../../../Assets/Icons";

const SeekButton = styled.div`
  cursor: pointer;
`;

const ForwardSeekButton = ({ onSeekForward }) => {
  const handleSeekForward = () => {
    onSeekForward();
  };

  return (
    <SeekButton onClick={handleSeekForward}>
      <ForwardIcon height={30} width={30}/>
    </SeekButton>
  );
};

export default ForwardSeekButton;
