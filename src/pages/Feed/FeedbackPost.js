import React from "react";
import styled from "styled-components";
import useCommentsData from "../../Features/Comment/useCommentsData";
import CommentBox from "../../Features/Comment/CommentBox";
import FeedCard from "../../Features/Feedback/FeedCard";

const PostContainer = styled.div`
  display: flex;
  flex-direction: column;
  background: #f9f9f9;
  border-bottom: 1px solid #ddd;
`;
const CommentBoxContainer = styled.div`
  border-top: 1px solid #ccc;
`;

const FeedbackPost = ({ post }) => {
  const { createComment } = useCommentsData(post.$id);

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

      <CommentBoxContainer>
        <CommentBox postId={post.$id} createComment={createComment} />
      </CommentBoxContainer>
    </>
  );
};

export default FeedbackPost;
