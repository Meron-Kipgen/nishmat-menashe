import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import Avatar from '../../Features/User/Avatar';
import TimeAgo from '../../utils/TimeAgo';
import { useQuestionAnswerData } from './useQuestionAnswerData';

const CardContainer = styled.div`
  margin-bottom: 16px;
  background: #ffffff;
  width: 100%;
  max-width: 700px;
  padding: 20px;

  @media (max-width: 768px) {
    padding: 12px;
    margin-bottom: 12px;
    width: 100%;
  }
`;

const TopText = styled.section`
  margin-bottom: 16px;

  h4 {
    font-size: 20px;
    color: #333;
    margin: 0 0 8px 0;

    @media (max-width: 768px) {
      font-size: 18px;
    }
  }

  p {
    color: #777;
    font-size: 1rem;
    margin: 4px 0;

    @media (max-width: 768px) {
      font-size: 0.9rem;
    }
  }
`;

const QuestionContainer = styled.section`
  color: #555;
  font-size: 1.1rem;
  line-height: 1.6rem;
  margin-bottom: 16px;
  word-wrap: break-word;
  overflow-wrap: break-word;
  word-break: break-word;

  p {
    margin: 0 0 8px;

    @media (max-width: 768px) {
      font-size: 1rem;
    }
  }
`;

const FooterText = styled.section`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  margin-top: 16px;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
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

  &:hover {
    background-color: #0056b3;
  }
`;

const UserInfo = styled.div`
  display: flex;
  gap: 10px;
  align-items: center;

  @media (max-width: 768px) {
    align-items: flex-start;
  }
`;

const UserName = styled.div`
  display: flex;
  flex-direction: column;
  align-self: center;

  h1 {
    font-size: 1rem;

    @media (max-width: 768px) {
      font-size: 0.9rem;
    }
  }

  p {
    font-size: 0.9rem;

    @media (max-width: 768px) {
      font-size: 0.8rem;
    }
  }
`;

const IsAnswered = styled.div`
  background: ${props => props.isAnswered ? '#28a745' : '#142B42'};
  width: 100px;
  padding: 5px;
  text-align: center;
  border-radius: 50px;
  font-size: 0.8rem;
  color: white;
`;

export default function Card({ id, avatarUrl, createdAt, userName, question, views, title, category, subcategory, isAnswered }) {
  const navigate = useNavigate();
  const { updateViews } = useQuestionAnswerData();
  
  const handleClick = () => {
    navigate(`/QuestionAnswer/${id}`);
    updateViews(id);
  };

  return (
    <CardContainer onClick={handleClick}>
      <TopText>
        <UserInfo>
          <Avatar src={avatarUrl} />
          <UserName>
            <h1>{userName}</h1>
            <p><TimeAgo createdAt={createdAt} /> ⁃ {views} views</p>
          </UserName>
        </UserInfo>
        <p>{category} ⁃ {subcategory}</p>
        <IsAnswered isAnswered={isAnswered}>{isAnswered ? 'Answered' : 'Not Answered'}</IsAnswered>
      </TopText>
      <QuestionContainer>
        <p>{title}</p>
        <p>{question}</p>
      </QuestionContainer>
    </CardContainer>
  );
}
