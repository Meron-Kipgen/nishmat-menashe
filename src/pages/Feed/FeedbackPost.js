import React from 'react';
import styled from 'styled-components';

import useCommentsData from '../../Features/Comment/useCommentsData';
import CommentsSection from '../../Features/Comment/CommentSection';
import FeedCard from "../../Features/Feedback/FeedCard"

const PostContainer = styled.div`
  display: flex;
  flex-direction: column;
  background: #f9f9f9;
  border-bottom: 1px solid #ddd;
`;



const FeedbackPost = ({ post, maxPosts = 1}) => {

  const { comments, loading, error, updateComment, deleteComment, createComment } = useCommentsData(post.$id);


  if (!post) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <PostContainer>
      <FeedCard
            id={post.$id}
            key={post.$id} 
            feedback={post.feedback} 
            createdAt={post.$createdAt}
            userName={post.userName}
            userAvatarUrl={post.userAvatarUrl}
          />
       
      </PostContainer> 
      <CommentsSection
        postId={post.$id}
        comments={comments}
        loading={loading}
        error={error}
        createComment={createComment}
        updateComment={updateComment}
        deleteComment={deleteComment}
        maxPosts={maxPosts}
      />
    </>
  );
};

export default FeedbackPost;
