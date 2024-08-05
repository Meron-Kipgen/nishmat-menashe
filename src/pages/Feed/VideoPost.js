import React from 'react';
import styled from 'styled-components';
import Player from '../../Features/VideoPlayer/Player';

const Container = styled.div`

`
const VideoPost = ({ post }) => (
  <Container>
    <Player src={post.videoUrl} poster={post.poster} />
    <h2>{post.title}</h2>
    <p>{post.description}</p>
  </Container>
);

export default VideoPost;
