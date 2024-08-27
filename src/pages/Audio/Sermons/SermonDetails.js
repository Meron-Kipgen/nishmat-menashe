import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { useSermonsData } from "./useSermonsData";
import AudioPlayer from "../../../Features/AudioPlayer/AudioPlayer";
import playerVars from '../../../Features/AudioPlayer/PlayerVars';
import EditSermonForm from "./EditSermonForm";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
  background-color: #f9f9f9;
  border-radius: 10px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
`;

const Thumbnail = styled.div`
  width: 100%;
  margin-bottom: 20px;

  img {
    width: 50%;
    height: auto;
    border-radius: 10px;
  }
`;

const Title = styled.h1`
  font-size: 28px;
  color: #333;
  margin-bottom: 10px;
  text-align: center;
`;

const Rabbi = styled.h5`
  font-size: 18px;
  color: #777;
  margin-bottom: 20px;
  text-align: center;
`;

const Category = styled.p`
  font-size: 16px;
  color: #555;
  margin-bottom: 30px;
  text-align: center;

  span {
    font-weight: bold;
  }
`;

const Description = styled.p`
  font-size: 18px;
  color: #444;
  margin-bottom: 30px;
  line-height: 1.6;
`;

const AudioPlayerContainer = styled.div`
  width: 100%;
  margin-top: 20px;
`;

const ButtonContainer = styled.div`
  display: flex;
  gap: 10px;
  margin-top: 20px;
`;

const EditButton = styled.button`
  background: #007bff;
  color: #fff;
  border: none;
  border-radius: 4px;
  padding: 10px 20px;
  cursor: pointer;

  &:hover {
    background: #0056b3;
  }
`;

const DeleteButton = styled.button`
  background: #ff4d4d;
  color: #fff;
  border: none;
  border-radius: 4px;
  padding: 10px 20px;
  cursor: pointer;

  &:hover {
    background: #e60000;
  }
`;

const AudioDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { deleteSermon, sermonData } = useSermonsData();
  const [isEditFormVisible, setIsEditFormVisible] = useState(false);

  if (!sermonData || sermonData.length === 0) {
    return <div>Loading audio data...</div>;
  }

  const post = sermonData.find((sermon) => sermon.$id === id);

  if (!post) {
    return <div>sermon not found</div>;
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
        console.log("Attempting to delete sermon with ID:", post.$id);
        await deleteSermon(post.$id); // Make sure post.$id is the correct ID
        console.log("Sermon deleted successfully");
        navigate("/Audio/Sermon");
      } catch (error) {
        console.error("Error deleting audio:", error);
        alert("Failed to delete audio. Please try again.");
      }
    }
  };
  
  
  return (
    <Container>
      <Thumbnail>
        <img src={post.thumbnail} alt={`${post.title} thumbnail`} />
      </Thumbnail>
      <Title>{post.title}</Title>
      <Rabbi>{post.rabbi}</Rabbi>
      <Category>
        <span>Category:</span> {post.category} | <span>Subcategory:</span> {post.subcategory}
      </Category>
      <Description>{post.description}</Description>
      <AudioPlayerContainer>
        <AudioPlayer 
          key={post.$id} 
          audioUrl={post.audioUrl} 
          playerVars={playerVars} 
        
        />
        {console.log(post.audioUrl)}
      </AudioPlayerContainer>
      <ButtonContainer>
        <EditButton onClick={handleEditClick}>Edit Audio</EditButton>
        <DeleteButton onClick={handleDeleteClick}>Delete Audio</DeleteButton>
      </ButtonContainer>

      {isEditFormVisible && (
        <EditSermonForm audio={post} onClose={handleCloseForm} />
      )}
    </Container>
  );
};

export default AudioDetails;
