import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import SubcategoryPoster from "./SubcategoryPoster"; // Import the SubcategoryPoster component

const PostItemContainer = styled.div`
  width: 350px;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  cursor: pointer;
  background: white;
  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 6px 15px rgba(0, 0, 0, 0.15);
  }
`;

const Title = styled.h2`
  font-size: 18px;
  font-weight: 600;
  color: #333;
  margin-bottom: 10px;
`;

const Excerpt = styled.p`
  font-size: 14px;
  color: #666;
  line-height: 1.6;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
`;

const ReadMoreButton = styled.button`
  margin-top: auto;
  padding: 10px 20px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #0056b3;
  }
`;

const PostItem = ({ id, title, excerpt, subcategory }) => {
  const navigate = useNavigate();

  const handleReadMore = () => {
    navigate(`/posts/${id}`);
  };

  return (
    <PostItemContainer>
      <SubcategoryPoster subcategory={subcategory}>{subcategory}</SubcategoryPoster>
      <Title>{title}</Title>
      <Excerpt>{excerpt}</Excerpt>
      <ReadMoreButton onClick={handleReadMore}>Read More</ReadMoreButton>
    </PostItemContainer>
  );
};

export default PostItem;
