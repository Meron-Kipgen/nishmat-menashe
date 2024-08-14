import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useQuestionAnswerData } from './useQuestionAnswerData'; // Adjust the import path as needed
import styled from 'styled-components';

const Container = styled.div`
  padding: 30px;
  width: 700px;
  background-color: #ffffff;
`;

const Title = styled.h2`
  font-size: 2em;
  color: #1d4ed8;
  margin-bottom: 20px;
  
`;

const QuestionText = styled.p`
  font-size: 1.4em;
  color: #333;
  margin-bottom: 30px;
  
`;

const AnswerSection = styled.div`
  margin-top: 30px;
  padding: 20px;
  background-color: #f3f4f6;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
`;

const AnswerTitle = styled.h3`
  font-size: 1.5em;
  color: #2563eb;
  margin-bottom: 15px;
`;

const AnswerText = styled.p`
  font-size: 1.2em;
  color: #333;
  margin-bottom: 20px;
  line-height: 1.6;
`;

const ButtonGroup = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 15px;
  margin-top: 20px;
`;

const Button = styled.button`
  padding: 12px 20px;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  background-color: ${({ variant }) => (variant === 'submit' ? '#2563eb' : variant === 'delete' ? '#ef4444' : '#9ca3af')};
  color: #ffffff;
  font-size: 1em;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: ${({ variant }) => (variant === 'submit' ? '#1d4ed8' : variant === 'delete' ? '#dc2626' : '#6b7280')};
  }

  &:disabled {
    background-color: #ccc;
    cursor: not-allowed;
  }
`;

const Textarea = styled.textarea`
  width: 100%;
  height: 120px;
  padding: 15px;
  border-radius: 6px;
  border: 1px solid #ccc;
  font-size: 1em;
  margin-bottom: 15px;
  box-sizing: border-box;
`;

const ErrorMessage = styled.p`
  color: #ef4444;
  font-size: 1em;
  margin-top: 20px;
  text-align: center;
`;

export default function QnADetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { QuestionAnswerData, updateQuestionAnswer, deleteQuestionAnswer } = useQuestionAnswerData();
  const [answer, setAnswer] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  const question = QuestionAnswerData.find((qna) => qna.$id === id);

  if (!question) {
    return (
      <Container>
        <div>Question not found</div>
      </Container>
    );
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (answer.trim()) {
      setLoading(true);
      setError(null);
      try {
        await updateQuestionAnswer(question.$id, { answer });
        setAnswer('');
        setIsEditing(false);
      } catch (error) {
        console.error('Error updating answer:', error);
        setError('Failed to update answer.');
      } finally {
        setLoading(false);
      }
    }
  };

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this question?')) {
      setLoading(true);
      setError(null);
      try {
        await deleteQuestionAnswer(question.$id);
        navigate('/questions');
      } catch (error) {
        console.error('Error deleting question:', error);
        setError('Failed to delete question.');
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <Container>
      <Title>{question.userName} asked:</Title>
      <p>category | subcategory</p>
      <p>2 months ago | 33 views</p>
      <QuestionText>{question.question}</QuestionText>
      <AnswerSection>
        <AnswerTitle>Answer:</AnswerTitle>
        {isEditing ? (
          <form onSubmit={handleSubmit}>
            <Textarea
              placeholder="Provide an answer..."
              value={answer || question.answer}
              onChange={(e) => setAnswer(e.target.value)}
            />
            <ButtonGroup>
              <Button type="submit" variant="submit" disabled={loading}>
                {loading ? 'Submitting...' : 'Submit Answer'}
              </Button>
              <Button type="button" onClick={() => setIsEditing(false)}>
                Cancel
              </Button>
            </ButtonGroup>
          </form>
        ) : (
          <div>
            <AnswerText>{question.answer || 'No answer provided yet.'}</AnswerText>
            <ButtonGroup>
              <Button
                type="button"
                onClick={() => {
                  setAnswer(question.answer || '');
                  setIsEditing(true);
                }}
              >
                Edit Answer
              </Button>
              <Button type="button" variant="delete" onClick={handleDelete} disabled={loading}>
                {loading ? 'Deleting...' : 'Delete Question'}
              </Button>
            </ButtonGroup>
          </div>
        )}
      </AnswerSection>

      {error && <ErrorMessage>{error}</ErrorMessage>}
    </Container>
  );
}
