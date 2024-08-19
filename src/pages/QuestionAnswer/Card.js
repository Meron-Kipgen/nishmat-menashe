import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import Avatar from '../../Features/User/Avatar';
import TimeAgo from '../../utils/TimeAgo';

const CardContainer = styled.div`
  padding: 16px;
  margin-bottom: 16px;
  background: #ffffff;
  width: 100%;
  max-width: 700px;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out;

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
  }

  @media (max-width: 768px) {
    padding: 12px;
    margin-bottom: 12px;
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
  transition: background-color 0.3s ease;

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

export default function Card({ id, avatarUrl, createdAt, userName, question, title, category, subcategory }) {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate(`/QuestionAnswer/${id}`);
  };

  return (
    <CardContainer>
      <TopText>
        <UserInfo>
          <Avatar src={avatarUrl} />
          <UserName>
            <h1>{userName}</h1>
            <p><TimeAgo createdAt={createdAt} /> ⁃ 33 views</p>
          </UserName>
        </UserInfo>
        <p>{category} ⁃ {subcategory}</p>
      </TopText>
      <QuestionContainer>
        <p>{title}</p>
        <p>{question}</p>
      </QuestionContainer>
      <FooterText>
        <AnswerButton onClick={handleClick}>Answer</AnswerButton>
      </FooterText>
    </CardContainer>
  );
}
