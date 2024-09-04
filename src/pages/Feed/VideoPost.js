import React from 'react';
import styled from 'styled-components';
import Player from '../../Features/VideoPlayer/Player';
import { useNavigate } from 'react-router-dom';
import { useVideosData } from '../Video/useVideosData';
import useCommentsData from '../../Features/Comment/useCommentsData';
import CommentBox from '../../Features/Comment/CommentBox';
import { CommentIcon } from '../../Assets/Icons';

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
const CommentBoxContainer = styled.div`
  border-top: 1px solid #ccc;
`;
const VideoPost = ({ post, maxPosts = 1 }) => {
  const navigate = useNavigate();
  const { updateViews } = useVideosData();
  const { comments, loading, error, createComment, updateComment, deleteComment } = useCommentsData(post.$id);


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

  return (
    <Container>
      <Player src={post.videoUrl} poster={post.poster} />
      <TextWrapper onClick={handleClick}>
        <h2>{post.title}</h2>
        <p>{post.category} ⁃ {post.subcategory} ⁃ {post.views} views</p>
        <p>{post.description} |  <CommentIcon height="20px" width="20px" stroke="red" /> {comments.length} {comments.length > 0 ? "Comments": "Comment"}</p>
      </TextWrapper>
      <CommentBoxContainer>
        <CommentBox postId={post.$id} createComment={createComment} />
      </CommentBoxContainer>
    </Container>
  );
};

export default VideoPost;
