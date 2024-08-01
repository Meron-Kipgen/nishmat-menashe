import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useVideosData } from "./useVideosData";

const Button = styled.button`
  background-color: #dc3545;
  color: white;
  border: none;
  padding: 0.75rem 1rem;
  font-size: 1rem;
  cursor: pointer;
  border-radius: 4px;
`;

const Delete = ({ videoId }) => {
  const navigate = useNavigate();
  const { deleteVideo } = useVideosData();

  const handleDelete = async () => {
    try {
      await deleteVideo(videoId);
      navigate(`/Video`); // Redirect to video list or homepage after deletion
    } catch (error) {
      console.error("Error deleting video:", error);
      // Optionally handle errors or show an error message
    }
  };

  return <Button onClick={handleDelete}>Delete Video</Button>;
};

export default Delete;
