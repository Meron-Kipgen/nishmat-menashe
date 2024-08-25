import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import SubcategoryPoster from "./SubcategoryPoster";
import DOMPurify from "dompurify";
import TimeAgo from "../../utils/TimeAgo";

const PostItemContainer = styled.div`
  width: 350px;
  padding: 20px;
  border-radius: 5px;

  background: white;

  @media (max-width: 768px) {
    width: 100%;
   padding: 10px;

   
  }
`;

const Title = styled.h2`
  font-size: 18px;
  font-weight: 600;
  color: #333;
  margin-bottom: 10px;
`;

const Body = styled.div`
  font-size: 15px;
  color: #666;
  line-height: 1.6;
  height: 160px;
  text-align: justify;
`;

const Wrapper = styled.div`
  font-size: 13px;
  padding-bottom: 10px;
  color: grey;
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

const PostItem = ({
  id,
  title,
  body,
  subcategory,
  writer,
  views,
  createdAt,
  onClick, // Accept onClick handler
}) => {
  const navigate = useNavigate();

  const handleReadMore = () => {
    navigate(`/Articles/${id}`);
    if (onClick) onClick(); // Call onClick handler
  };

  return (
    <PostItemContainer>
      <SubcategoryPoster subcategory={subcategory}>
        {subcategory}
      </SubcategoryPoster>
      <Title>{title}</Title>
      <Wrapper>
        {writer} ⁃ <TimeAgo createdAt={createdAt} /> ⁃ views: {views}
      </Wrapper>
      <Body dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(body) }} />
      <ReadMoreButton onClick={handleReadMore}>Read More</ReadMoreButton>
    </PostItemContainer>
  );
};

export default PostItem;
