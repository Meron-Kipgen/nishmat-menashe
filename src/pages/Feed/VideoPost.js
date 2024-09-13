import React from 'react';
import styled from 'styled-components';
import Player from '../../Features/VideoPlayer/Player';
import { useNavigate } from 'react-router-dom';
import { useVideosData } from '../Video/useVideosData';
import useCommentsData from '../../Features/Comment/useCommentsData';
import CommentBox from '../../Features/Comment/CommentBox';

const TextWrapper = styled.section`
  padding: 10px 15px;
  cursor: pointer;
`;

const CommentBoxContainer = styled.div`
  border-top: 1px solid #ccc;
`;
const VideoPost = ({ post}) => {
  const navigate = useNavigate();
  const { updateViews } = useVideosData();
  const { comments, loading, error, createComment } = useCommentsData(post.$id);


  if (!post) {
    return <div>Loading...</div>; 
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
    <>
      <Player src={post.videoUrl} poster={post.poster} />
      <TextWrapper onClick={handleClick}>
        <h2>{post.title}</h2>
        <p>{post.category} ⁃ {post.subcategory} ⁃ {post.views} views</p>
        <p>{post.description} |  {comments.length} {comments.length > 0 ? "Comments": "Comment"}</p>
      </TextWrapper>
      <CommentBoxContainer>
        <CommentBox postId={post.$id} createComment={createComment} />
      </CommentBoxContainer>
    </>
  );
};

export default VideoPost;
