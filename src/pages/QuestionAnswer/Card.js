import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

const CardContainer = styled.div`
  padding: 20px;
  margin-bottom: 16px;
  background: #ffffff;
  width: 700px;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out;
  
  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
  }
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
  color: #555;
  font-size: 1.1rem;
  line-height: 1.6rem;
  margin-bottom: 16px;
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

export default function Card({ id, userName, question }) {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/QuestionAnswer/${id}`);
  };

  return (
    <CardContainer>
      <TopText>
        <h4>{userName} asked:</h4>
        <p>category | subcategory</p>
        <p> 2 months ago |  33 views </p>
      </TopText>
      <QuestionContainer>
        <p>{question}</p>
      </QuestionContainer>
      <FooterText>
        
        <AnswerButton onClick={handleClick}>Answer</AnswerButton>
      </FooterText>
    </CardContainer>
  );
}
