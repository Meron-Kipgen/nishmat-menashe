import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import Avatar from "../../Features/User/Avatar";
import TimeAgo from "../../utils/TimeAgo";
import CommentBox from "../../Features/Comment/CommentBox";
import useCommentsData from "../../Features/Comment/useCommentsData";

const CardContainer = styled.div`
  padding: 20px;
  margin-bottom: 16px;
  background: #ffffff;
  width: 100%;
  border-radius: 8px;
  cursor: pointer;
  position: relative;
`;

const TopText = styled.section`
  margin-bottom: 16px;

  h4 {
    font-size: 20px;
    color: #333;
    margin: 0 0 8px 0;
  }

  p {
    color: #777;
    font-size: 1rem;
    margin: 4px 0;
  }
`;

const QuestionContainer = styled.section`
  word-wrap: break-word;
  overflow-wrap: break-word;
  word-break: break-word;
  margin-bottom: 16px;
  margin: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 10;
  -webkit-box-orient: vertical;
`;

const UserInfo = styled.div`
  display: flex;
  gap: 10px;
`;

const UserName = styled.div`
  h4 {
    font-size: 1rem;
  }
  p {
    font-size: 0.9rem;
  }
`;

const CommentBoxContainer = styled.div`
  border-top: 1px solid #ccc;
`;

const IsAnswered = styled.div`
  background: ${(props) => (props.isAnswered ? "#28a745" : "#142B42")};
  width: 100px;
  padding: 5px;
  text-align: center;
  border-radius: 50px;
  font-size: 0.8rem;
  color: white;
  position: absolute;
  top: 10px;
  right: 10px;
`;

export default function Card({ post, maxPosts = 1 }) {
  const { comments, createComment } = useCommentsData(post.$id);
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/QuestionAnswer/${post.$id}`);
  };

  return (
    <>
      <CardContainer onClick={handleClick}>
        <TopText>
          <UserInfo>
            <Avatar src={post.avatarUrl} name={post.userName} />
            <UserName>
              <h4>{post.userName}</h4>
              <p>
                <TimeAgo createdAt={post.$createdAt} /> ⁃ {post.views} views
              </p>
              <p>
                {comments.length}{" "}
                {comments.length > 0 ? "Comments" : "Comment"}
              </p>
            </UserName>
          </UserInfo>
          <p>
            {post.category} ⁃ {post.subcategory}
          </p>
        </TopText>
        <QuestionContainer>
          <p>{post.title}</p>
          <p>{post.question}</p>
        </QuestionContainer>
        <IsAnswered isAnswered={!!post.answer}>
          {post.answer ? "Answered" : "Not Answered"}
        </IsAnswered>
      </CardContainer>
      <CommentBoxContainer>
        <CommentBox postId={post.$id} createComment={createComment} />
      </CommentBoxContainer>
    </>
  );
}
