// ArticlePost.js
import React from 'react';

const ArticlePost = ({ post }) => (
  <div>
    <h2>{post.title}</h2>
    <p>{post.content}</p>
  </div>
);

export default ArticlePost;
