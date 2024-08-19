import React from 'react';
import styled from 'styled-components';
import Player from '../../Features/VideoPlayer/Player';
import { useNavigate } from 'react-router-dom';
import { useVideosData } from '../Video/useVideosData';
import CommentBox from '../../Features/Comment/CommentBox';
import CommentList from '../../Features/Comment/CommentList';
import useCommentsData from '../../Features/Comment/useCommentsData';

const Container = styled.div``;

const TextWrapper = styled.section`
  padding: 10px 15px;
  cursor: pointer;
`;

const CommentContainer = styled.section`
  border-top: 1px solid #ccc;
`;
const CommentButton = styled.section`
display: flex;
align-items: center;
justify-content: space-between;
padding: 10px 40px;
color: blue;
cursor: pointer;
&:hover{
  color: darkblue;
}
`

const VideoPost = ({ post, maxPosts = 2 }) => {
  const navigate = useNavigate();
  const { updateViews } = useVideosData();
  const { comments, loading, error, createComment, updateComment, deleteComment } = useCommentsData(post.$id);

  // Sort comments and select the last maxPosts comments
  const sortedComments = [...comments]
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

  const latestComments = sortedComments.slice(
    Math.max(sortedComments.length - maxPosts, 0)
  );

  if (!post) {
    return <div>Loading...</div>; // Handle undefined post gracefully
  }

  const handleClick = () => {
    try {
      navigate(`/video/${post.$id}`);
      updateViews(post.$id);
    } catch (error) {
      console.error('Error navigating to video:', error);
    }
  };
   console.log(comments.length)
  return (
    <Container>
      <Player src={post.videoUrl} poster={post.poster} />
      <TextWrapper onClick={handleClick}>
        <h2>{post.title}</h2>
        <p>{post.category} ⁃ {post.subcategory} ⁃ {post.views} views</p>
        <p>{post.description}</p>
      </TextWrapper>
      <CommentContainer>
        <CommentButton onClick={handleClick}>{comments.length} {comments.length > 0 ? "comments": "comment"}  </CommentButton> 
        <CommentBox postId={post.$id} />
        <CommentList
          comments={latestComments}
          loading={loading}
          error={error}
          updateComment={updateComment}
          deleteComment={deleteComment}
          createComment={createComment}
        />
    
      </CommentContainer>
    </Container>
  );
};

export default VideoPost;
