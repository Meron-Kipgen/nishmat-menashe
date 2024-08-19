import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import SubcategoryPoster from "../Articles/SubcategoryPoster";
import { useArticlesData } from "../Articles/useArticlesData";
import DOMPurify from "dompurify";
import TimeAgo from "../../utils/TimeAgo";

const PostItemContainer = styled.div`
  width: 100%;
  padding: 20px;
  border-radius: 8px;

  background: white;
 
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
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 5;
  -webkit-box-orient: vertical;

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

const ArticlePost = ({post}) => {
  const navigate = useNavigate();
  const { updateViews } = useArticlesData();

  if (!post) {
    return <div>Loading...</div>; // Handle undefined post gracefully
  }

  const handleReadMore = () => {
    try {
      navigate(`/Articles/${post.$id}`);
      updateViews(post.$id);
    } catch (error) {
      console.error('Error navigating to Articles:', error);
    }
  };

  return (
    <PostItemContainer>
      <SubcategoryPoster subcategory={post.subcategory}>
        {post.subcategory}
      </SubcategoryPoster>
      <Title>{post.title}</Title>
      {post.category}
      <Wrapper>
        {post.writer} ⁃ <TimeAgo createdAt={post.$createdAt} /> ⁃ views: {post.views}
      </Wrapper>
      <Body dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(post.body) }} />
      <ReadMoreButton onClick={handleReadMore}>Read More</ReadMoreButton>
    </PostItemContainer>
  );
};

export default ArticlePost;
