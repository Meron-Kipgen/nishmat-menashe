// QuestionPost.js
import React from 'react';

const QnAPost = ({ post }) => (
  <div>
    <h2>{post.question}</h2>
    <p>{post.answer}</p>
  </div>
);

export default QnAPost;
