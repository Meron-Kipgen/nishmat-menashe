// VideoPost.js
import React from 'react';

const VideoPost = ({ post }) => (
  <div>
    <h2>{post.title}</h2>
    <video src={post.videoUrl} controls />
    <p>{post.description}</p>
  </div>
);

export default VideoPost;
