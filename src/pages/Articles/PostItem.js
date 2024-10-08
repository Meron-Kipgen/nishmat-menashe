import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import SubcategoryPoster from "./SubcategoryPoster";
import DOMPurify from "dompurify";
import TimeAgo from "../../utils/TimeAgo";

const PostItemContainer = styled.div`
position: relative;
  width: 350px;
  padding: 20px;
  border-radius: 5px;
  height: 400px;
  background: white;

  @media (max-width: 768px) {
    width: 95%;
    padding: 10px;
  }
`;

const Title = styled.h2`
  font-size: 18px;
  font-weight: 600;
  color: #333;
  margin-bottom: 10px;
  height: auto;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
`;

const Body = styled.div`
  font-size: 15px;
  color: #666;
  line-height: 1.6;
  text-align: justify;
  height: auto;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 6;
  -webkit-box-orient: vertical;
  
`;

const Wrapper = styled.div`
  font-size: 13px;
  padding-bottom: 10px;
  color: grey;
`;

const ReadMoreButton = styled.button`
 position: absolute;
 right: 20px;
 bottom: 10px;
  padding: 10px 20px;
  background-color: #142b42;
  color: white;
  border: none;
  border-radius: 40px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #0056b3;
  }
`;

const truncateText = (text, wordLimit) => {
  const words = text.split(" ");
  if (words.length > wordLimit) {
    return words.slice(0, wordLimit).join(" ") + "...";
  }
  return text;
};

const PostItem = ({
  id,
  title,
  body,
  subcategory,
  author,
  views,
  createdAt,
  onClick,
  updateViews, 
}) => {
  const navigate = useNavigate();

  const handleReadMore = () => {
    if (updateViews) {
      updateViews(id); 
    }
    navigate(`/Articles/${id}`);
    
    if (onClick) onClick();
  };

  const sanitizedBody = DOMPurify.sanitize(body);
  const truncatedBody = truncateText(sanitizedBody, 100); 

  return (
    <PostItemContainer>
      <SubcategoryPoster subcategory={subcategory}>
        {subcategory}
      </SubcategoryPoster>
      <Title>{title}</Title>
      <Wrapper>
       By: {author} ⁃ <TimeAgo createdAt={createdAt} /> ⁃ views: {views}
      </Wrapper>
      <Body dangerouslySetInnerHTML={{ __html: truncatedBody }} />

      <ReadMoreButton onClick={handleReadMore}>Read More</ReadMoreButton>
    </PostItemContainer>
  );
};
export default PostItem;