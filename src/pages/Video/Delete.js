import React, { useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useVideosData } from "./useVideosData";
import WarningDelete from "../../components/WarningDelete"; 

const Button = styled.div`
  padding: 0.75rem 1rem;
  cursor: pointer;
  border-radius: 4px;
`;

const Delete = ({ videoId }) => {
  const [showWarning, setShowWarning] = useState(false);
  const navigate = useNavigate();
  const { deleteVideo } = useVideosData();

  const handleDelete = async () => {
    try {
      await deleteVideo(videoId);
      navigate(`/Video`); 
    } catch (error) {
      console.error("Error deleting video:", error);
     
    }
  };

  const handleConfirmDelete = () => {
    setShowWarning(false); 
    handleDelete(); 
  };

  const handleCancelDelete = () => {
    setShowWarning(false); 
  };

  return (
    <>
      <Button onClick={() => setShowWarning(true)}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="icon icon-tabler icon-tabler-trash"
          width="30"
          height="30"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="#fd0061"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path stroke="none" d="M0 0h24v24H0z" fill="none" />
          <path d="M4 7l16 0" />
          <path d="M10 11l0 6" />
          <path d="M14 11l0 6" />
          <path d="M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12" />
          <path d="M9 7v-3a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3" />
        </svg>
      </Button>

      {showWarning && (
        <WarningDelete
          message="Are you sure you want to delete this video?"
          onConfirm={handleConfirmDelete}
          onCancel={handleCancelDelete}
        />
      )}
    </>
  );
};

export default Delete;
