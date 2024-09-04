import React, { useContext, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { useSermonsData } from "./useSermonsData";
import AudioPlayer from "../../../Features/AudioPlayer/AudioPlayer";
import playerVars from "../../../Features/AudioPlayer/PlayerVars";
import EditSermonForm from "./EditSermonForm";
import CommentsSection from "../../../Features/Comment/CommentSection";
import useCommentsData from "../../../Features/Comment/useCommentsData";
import { UserContext } from "../../../contexts/UserContext";
import TimeAgo from "../../../utils/TimeAgo";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 700px;
  padding: 20px 0;
  background-color: #ffffff;

  box-shadow: 0 8px 15px rgba(0, 0, 0, 0.1);
`;
const DetailsSection = styled.div`
`
const Thumbnail = styled.div`
  width: 100%;
  margin-bottom: 30px;
  display: flex;
  justify-content: center;
  img {
    width: 80%;
    height: auto;
    border-radius: 12px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
    transition: transform 0.3s ease;

    &:hover {
      transform: scale(1.05);
    }
  }
`;

const Title = styled.h1`
  font-size: 32px;
  color: #333;
  margin-bottom: 15px;
  text-align: center;
  font-weight: 700;
`;

const Rabbi = styled.h5`
  font-size: 20px;
  color: #777;
  margin-bottom: 25px;
  text-align: center;
  font-style: italic;
`;

const Category = styled.p`
  font-size: 18px;
  color: #555;
  margin-bottom: 35px;
  text-align: center;

  span {
    font-weight: bold;
    color: #007bff;
  }
`;

const Description = styled.p`
  font-size: 20px;
  color: #444;
  margin-bottom: 40px;
  line-height: 1.8;
  text-align: justify;
`;

const AudioPlayerContainer = styled.div`
  width: 100%;


`;

const ButtonContainer = styled.div`
  display: flex;
  gap: 15px;
  margin-top: 30px;
`;

const Button = styled.button`
  background: ${props => props.bgColor || "#007bff"};
  color: #fff;
  border: none;
  border-radius: 8px;
  padding: 12px 25px;
  cursor: pointer;
  font-size: 16px;
  font-weight: bold;
  transition: background-color 0.3s ease;

  &:hover {
    background: ${props => props.hoverColor || "#0056b3"};
  }
`;
const CommentsContainer = styled.div`
width: 100%;
`

const SermonDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { deleteSermon, sermonData } = useSermonsData();
  const [isEditFormVisible, setIsEditFormVisible] = useState(false);
  const post = sermonData.find(sermon => sermon.$id === id);
  const {
    comments,
    loading,
    error,
    updateComment,
    deleteComment,
    createComment,
  } = useCommentsData(post?.$id);
  const { isAdmin } = useContext(UserContext);
  if (!sermonData || sermonData.length === 0) {
    return <div>Loading audio data...</div>;
  }

  if (!post) {
    return <div>Sermon not found</div>;
  }

  const handleEditClick = () => {
    setIsEditFormVisible(true);
  };

  const handleCloseForm = () => {
    setIsEditFormVisible(false);
  };

  const handleDeleteClick = async () => {
    if (window.confirm("Are you sure you want to delete this audio?")) {
      try {
        await deleteSermon(post.$id);
        navigate("/Audio/Sermon");
      } catch (error) {
        alert("Failed to delete audio. Please try again.");
      }
    }
  };

  return (
    <Container>
      <DetailsSection>
        <Thumbnail>
          <img src={post.thumbnail} alt={`${post.title} thumbnail`} />
        </Thumbnail>
        <Title>{post.title}</Title>
        <Rabbi>By: {post.rabbi} - Played {post.played}</Rabbi>
        <Category>
        {post.category} | {post.subcategory} | <TimeAgo createdAt={post.$createdAt}/>
        </Category>
        <Description>{post.description}</Description>
      </DetailsSection>

      <AudioPlayerContainer>
        <AudioPlayer
          key={post.$id}
          audioUrl={post.audioUrl}
          playerVars={playerVars}
          shouldPlay={true}
        />
      </AudioPlayerContainer>
      {isAdmin && (
        <ButtonContainer>
          <Button
            onClick={handleEditClick}
            bgColor="#007bff"
            hoverColor="#0056b3"
          >
            Edit Audio
          </Button>
          <Button
            onClick={handleDeleteClick}
            bgColor="#ff4d4d"
            hoverColor="#e60000"
          >
            Delete Audio
          </Button>
        </ButtonContainer>
      )}

      {isEditFormVisible && (
        <EditSermonForm audio={post} onClose={handleCloseForm} />
      )}
<CommentsContainer>
   <CommentsSection
        postId={post.$id}
        comments={comments}
        loading={loading}
        error={error}
        createComment={createComment}
        updateComment={updateComment}
        deleteComment={deleteComment}
        maxPosts={comments.length}
      />
</CommentsContainer>
     
    </Container>
  );
};

export default SermonDetails;
