// QnA.js
import React, { useState } from 'react';
import styled from 'styled-components';

const QnAContainer = styled.div`
  width: 60%;
  margin: auto;
  padding: 20px;
  background-color: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

const QuestionContainer = styled.div`
  margin-bottom: 20px;
`;

const Question = styled.div`
  background-color: #007BFF;
  color: #fff;
  padding: 15px;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #0056b3;
  }
`;

const Answer = styled.div`
  margin-top: 10px;
  padding: 15px;
  background-color: #e9ecef;
  border-radius: 5px;
`;

const QnAItem = ({ question, answer }) => {
  const [showAnswer, setShowAnswer] = useState(false);

  return (
    <QuestionContainer>
      <Question onClick={() => setShowAnswer(!showAnswer)}>
        {question}
      </Question>
      {showAnswer && <Answer>{answer}</Answer>}
    </QuestionContainer>
  );
};

const QnA = () => {
  const qaData = [
    { question: "What is React?", answer: "React is a JavaScript library for building user interfaces." },
    { question: "What is styled-components?", answer: "styled-components is a library for React and React Native that allows you to use component-level styles in your application." },
    // Add more QnA items here
  ];

  return (
    <QnAContainer>
      {qaData.map((item, index) => (
        <QnAItem key={index} question={item.question} answer={item.answer} />
      ))}
    </QnAContainer>
  );
};

export default QnA;
