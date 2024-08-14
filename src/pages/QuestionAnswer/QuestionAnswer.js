import React, { useState, useContext } from 'react';
import styled from 'styled-components';
import Card from './Card';
import { Outlet, useOutlet } from 'react-router-dom';
import { useQuestionAnswerData } from './useQuestionAnswerData'; // Adjust the import path as needed
import { UserContext } from '../../contexts/UserContext';

const Container = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
`;

const AskContainer = styled.section`
  background-color: aliceblue;
  display: flex;
  flex-direction: column;
  width: 700px;
  padding: 20px;
  border-radius: 8px;
  margin-bottom: 20px;

  input, textarea {
    margin-bottom: 10px;
    padding: 10px;
    border-radius: 4px;
    border: 1px solid #ccc;
    font-size: 16px;
  }

  button {
    padding: 10px 20px;
    background-color: #007BFF;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;

    &:hover {
      background-color: #0056b3;
    }
  }
`;

const QuestionAnswerContainer = styled.section`
  width: 600px;
  display: flex;
  flex-direction: column;
`;
export default function QuestionAnswer() {
  const { QuestionAnswerData, addQuestionAnswer } = useQuestionAnswerData();
  const [question, setQuestion] = useState('');
  const outlet = useOutlet();
const {isAdmin, username, userId, isLogin} = useContext(UserContext)
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (question.trim()) {
      try {
        await addQuestionAnswer({ 
          question, 
          userId: userId, 
          userName: username 
        }); 
        setQuestion(''); 
        
      } catch (error) {
        console.error('Error adding question:', error);
      }
    }
  };

  return (
    <Container>
      {!outlet && (
        <>
        {isLogin ?(
          <AskContainer>
            <textarea 
              placeholder="Ask anything..." 
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
            />
            <button type="submit" onClick={handleSubmit}>Ask</button>
          </AskContainer>
        ):
        (
          <p>please login to ask </p>
        )}
          
          <QuestionAnswerContainer>
            {[...QuestionAnswerData].reverse().map((QuestionAnswer) => (
              <Card
                key={QuestionAnswer.$id} 
                id={QuestionAnswer.$id} 
                userId={QuestionAnswer.userId}
                userName={QuestionAnswer.userName}
                question={QuestionAnswer.question}
              />
            ))}
          </QuestionAnswerContainer>
        </>
      )}
      
      <Outlet />
    </Container>
  );
}