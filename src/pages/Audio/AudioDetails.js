import React from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { useAudioData } from "./useAudioData";
import AudioPlayer from "../../Features/AudioPlayer/AudioPlayer";
import playerVars from '../../Features/AudioPlayer/PlayerVars';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
  background-color: #f9f9f9;
  border-radius: 10px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
`;

const Thumbnail = styled.div`
  width: 100%;
  margin-bottom: 20px;

  img {
    width: 50%;
    height: auto;
    border-radius: 10px;
  }
`;

const Title = styled.h1`
  font-size: 28px;
  color: #333;
  margin-bottom: 10px;
  text-align: center;
`;

const Rabbi = styled.h5`
  font-size: 18px;
  color: #777;
  margin-bottom: 20px;
  text-align: center;
`;

const Category = styled.p`
  font-size: 16px;
  color: #555;
  margin-bottom: 30px;
  text-align: center;

  span {
    font-weight: bold;
  }
`;

const Description = styled.p`
  font-size: 18px;
  color: #444;
  margin-bottom: 30px;
  line-height: 1.6;
`;

const AudioPlayerContainer = styled.div`
  width: 100%;
  margin-top: 20px;
`;

const AudioDetails = () => {
  const { id } = useParams();
  const { audioData } = useAudioData();

  if (!audioData || audioData.length === 0) {
    return <div>Loading audio data...</div>;
  }

  const post = audioData.find((audio) => audio.$id === id);

  if (!post) {
    return <div>Audio not found</div>;
  }

  return (
    <Container>
      <Thumbnail>
        <img src={post.thumbnail} alt={`${post.title} thumbnail`} />
      </Thumbnail>
      <Title>{post.title}</Title>
      <Rabbi>{post.rabbi}</Rabbi>
      <Category>
        <span>Category:</span> {post.category} | <span>Subcategory:</span> {post.subcategory}
      </Category>
      <Description>{post.description}</Description>
      <AudioPlayerContainer>
      <AudioPlayer 
          key={post.audioUrl} 
          audioUrl={post.audioUrl} 
          playerVars={playerVars} 
        />
      </AudioPlayerContainer>
    </Container>
  );
};

export default AudioDetails;
