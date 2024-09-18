import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { useVideosData } from '../Video/useVideosData';
import useCommentsData from '../../Features/Comment/useCommentsData';
import CommentBox from '../../Features/Comment/CommentBox';
import { FaPlay } from 'react-icons/fa';

const Container = styled.div``;

const ThumbnailWrapper = styled.div`
  position: relative;
  width: 100%;
  cursor: pointer;
`;

const Thumbnail = styled.img`
  width: 100%;
  aspect-ratio: 16 / 9;
  object-fit: cover;
`;

const PlayIcon = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 48px;
  color: red;
  opacity: 0.8;
  transition: opacity 0.3s ease;

  &:hover {
    opacity: 1;
  }
`;

const TextWrapper = styled.section`
  padding: 10px 15px;
`;

const CommentBoxContainer = styled.div`
  border-top: 1px solid #ccc;
`;

const VideoPost = ({ post }) => {
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
    <Container>
      <ThumbnailWrapper onClick={handleClick}>
        <Thumbnail src={post.thumbnail} />
        <PlayIcon>
          <FaPlay />
        </PlayIcon>
      </ThumbnailWrapper>
      <TextWrapper>
        <h2>{post.title}</h2>
        <p>{post.category} ⁃ {post.subcategory} ⁃ {post.views} views</p>
        <p>{comments.length} {comments.length > 0 ? 'Comments' : 'Comment'}</p>
      </TextWrapper>
      <CommentBoxContainer>
        <CommentBox postId={post.$id} createComment={createComment} />
      </CommentBoxContainer>
    </Container>
  );
};

export default VideoPost;
