import React from 'react';
import styled from 'styled-components';
import CommentBox from './CommentBox';
import CommentList from './CommentList';

const CommentContainer = styled.section`
  border-top: 1px solid #ccc;
  
`;

const CommentsSection = ({ postId, comments, loading, error, createComment, updateComment, deleteComment, maxPosts = 1 }) => {
  const latestComments = comments.slice(Math.max(comments.length - maxPosts, 0));

  return (
    <CommentContainer>
      <CommentBox postId={postId} />
      <CommentList
        comments={latestComments}
        loading={loading}
        error={error}
        updateComment={updateComment}
        deleteComment={deleteComment}
        createComment={createComment}
      />
    </CommentContainer>
  );
};

export default CommentsSection;
