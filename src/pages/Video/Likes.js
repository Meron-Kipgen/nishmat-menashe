import React, { useState, useEffect } from "react";
import styled from "styled-components";

const Button = styled.button`
  background-color: ${({ liked }) => (liked ? "#007bff" : "transparent")};
  color: ${({ liked }) => (liked ? "white" : "#007bff")};
  border: 1px solid #007bff;
  padding: 0.75rem 1rem;
  font-size: 1rem;
  cursor: pointer;
  border-radius: 4px;
`;

// Function to check if a video is liked by the current user
const isVideoLiked = (videoId) => {
  const likedVideos = JSON.parse(localStorage.getItem("likedVideos")) || [];
  return likedVideos.includes(videoId);
};

// Function to add a video to the liked videos list
const addToLikedVideos = (videoId) => {
  let likedVideos = JSON.parse(localStorage.getItem("likedVideos")) || [];
  likedVideos = [...likedVideos, videoId];
  localStorage.setItem("likedVideos", JSON.stringify(likedVideos));
};

const Likes = ({ videoId, updateLikeCount }) => {
  const [liked, setLiked] = useState(false);

  useEffect(() => {
    setLiked(isVideoLiked(videoId));
  }, [videoId]);

  const handleLike = () => {
    if (!liked) {
      updateLikeCount(videoId);
      addToLikedVideos(videoId); // Add video to liked videos list in local storage
      setLiked(true);
    } else {
      console.log("You have already liked this video.");
      // Optionally show a message or disable the like button
    }
  };

  return (
    <Button onClick={handleLike} liked={liked}>
      Like{" "}
      <span role="img" aria-label="like">
        👍
      </span>
    </Button>
  );
};

export default Likes;
