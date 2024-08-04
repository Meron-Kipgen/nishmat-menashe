// AudioPost.js
import React from 'react';

const AudioPost = ({ post }) => (
  <div>
    <h2>{post.title}</h2>
    <audio src={post.audioUrl} controls />
    <p>{post.description}</p>
  </div>
);

export default AudioPost;
