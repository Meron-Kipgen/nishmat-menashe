import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import Avatar from '../../Features/User/Avatar';
import TimeAgo from '../../utils/TimeAgo';

const CardContainer = styled.div`
  padding: 20px;
  margin-bottom: 16px;
  background: #ffffff;
  width: 100%;
  border-radius: 8px;
 
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

const FooterText = styled.section`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 16px;

  p {
    margin: 0;
    color: #777;
    font-size: 0.9rem;
  }
`;

const AnswerButton = styled.button`
  background-color: #007bff;
  color: white;
  padding: 8px 16px;
  font-size: 0.9rem;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #0056b3;
  }
`;
const UserInfo = styled.div`
display: flex;
gap: 10px;
`
const UserName = styled.div`
h4{
  font-size: 1rem;
}
p{
  font-size:0.9rem;
}

`

export default function Card({post}) {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/QuestionAnswer/${post.$id}`);
  };

  return (
    <CardContainer>
     
      <TopText>
        <UserInfo>
          <Avatar src={post.avatarUrl}/> 
          <UserName>
             <h4>{post.userName}</h4>
           <p> <TimeAgo createdAt={post.$createdAt}/> ⁃  33 views </p>
          </UserName>
         
        </UserInfo>
       
        <p>{post.category} ⁃ {post.subcategory}</p>
       
      </TopText>
      <QuestionContainer> 
        <p>{post.title}</p>
        <p>{post.question}</p>
      </QuestionContainer>
      <FooterText>
        
        <AnswerButton onClick={handleClick}>Answer</AnswerButton>
      </FooterText>
    </CardContainer>
  );
}
