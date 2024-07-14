import React from "react";
import styled from "styled-components";

const PostInfo = ({ post }) => {
  return (
    <div>
      <p>
        <strong>Views:</strong> {post.views}
      </p>
      <p>Posted at: 3 months ago</p>
      <p>By: {post.writer}</p>
    </div>
  );
};

export default PostInfo;
