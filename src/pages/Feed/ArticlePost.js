import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import SubcategoryPoster from "../Articles/SubcategoryPoster";
import { useArticlesData } from "../Articles/useArticlesData";
import DOMPurify from "dompurify";
import TimeAgo from "../../utils/TimeAgo";
import useCommentsData from "../../Features/Comment/useCommentsData";
import CommentBox from "../../Features/Comment/CommentBox";

const truncateText = (text, wordCount) => {
  const words = text.split(' ');
  if (words.length <= wordCount) return text;
  return words.slice(0, wordCount).join(' ') + '...';
};

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
  height: auto;
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

const CommentBoxContainer = styled.div`
border-top: 1px solid #ccc;
`

const ArticlePost = ({ post}) => {
  const { comments, loading, error, createComment} = useCommentsData(post.$id);
  const navigate = useNavigate();
  const { updateViews } = useArticlesData();

  if (!post) {
    return <div>Loading...</div>; 
  }

  const handleReadMore = () => {
    try {
      navigate(`/Articles/${post.$id}`);
      updateViews(post.$id);
    } catch (error) {
      console.error('Error navigating to Articles:', error);
    }
  };

  const truncatedBody = truncateText(post.body, 260);

  return (
    <>
      <PostItemContainer onClick={handleReadMore}>
        <SubcategoryPoster subcategory={post.subcategory}>
          {post.subcategory}
        </SubcategoryPoster>
        <Title>{post.title}</Title>
        {post.category}
        <Wrapper>
         By: {post.author} ⁃ <TimeAgo createdAt={post.$createdAt} /> ⁃ views: {post.views}
          <p>
           {post.description} {comments.length} {comments.length > 0 ? "Comments" : "Comment"}
          </p>
        </Wrapper>
        <Body dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(truncatedBody) }} />
    
      </PostItemContainer>
      <CommentBoxContainer>
          <CommentBox postId={post.$id} createComment={createComment} />
      </CommentBoxContainer>
    
    </>
  );
};

export default ArticlePost;
