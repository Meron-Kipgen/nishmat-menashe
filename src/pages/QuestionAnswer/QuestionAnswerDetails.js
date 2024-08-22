import React, { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useQuestionAnswerData } from './useQuestionAnswerData';
import styled from 'styled-components';
import Avatar from '../../Features/User/Avatar';
import TimeAgo from '../../utils/TimeAgo';
import AnswerForm from './AnswerForm'; 
import QuestionEditForm from './QuestionEditForm';
import { UserContext } from '../../contexts/UserContext';

// Styled components
const Container = styled.div`
  padding: 20px;
  max-width: 900px;
  margin: 0 auto;
  background-color: #ffffff;
  margin-top: 20px;

  @media (max-width: 768px) {
  width: 100%;
  }
`;

const HeaderSection = styled.section`
  display: flex;
  align-items: center;
  gap: 20px;
  margin-bottom: 20px;

  @media (max-width: 768px) {
 
  }

  p {
    font-size: 1rem;

    @media (max-width: 768px) {
      font-size: 1.2em;
    }
  }
`;

const QuestionSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
  margin-bottom: 20px;

  h1 {
    font-size: 1.5rem;
    margin-bottom: 10px;

    @media (max-width: 768px) {
      font-size: 1.2rem;
    }
  }

  p {
    font-size: 1rem;
    
    @media (max-width: 768px) {
      font-size: 1em;
    }
  }

  button {
    align-self: start;
    margin-top: 10px;

    @media (max-width: 768px) {
      margin-top: 5px;
    }
  }
`;
const QuestionConatiner = styled.div`
  word-wrap: break-word;     
  overflow-wrap: break-word;
  word-break: break-word; 
`
const AnswerSection = styled.div`
  padding: 20px;
  background-color: #f3f4f6;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  word-wrap: break-word;     
  overflow-wrap: break-word;
  word-break: break-word; 
  @media (max-width: 768px) {
    padding: 15px;
  }

  button {
    margin-top: 10px;

    @media (max-width: 768px) {
      margin-top: 5px;
    }
  }
`;

const ErrorMessage = styled.p`
  color: #ef4444;
  font-size: 1em;
  margin-top: 20px;
  text-align: center;

  @media (max-width: 768px) {
    font-size: 0.9em;
  }
`;

export default function QuestionAnswerDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { QuestionAnswerData, updateQuestionAnswer, deleteQuestionAnswer } = useQuestionAnswerData();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isEditingQuestion, setIsEditingQuestion] = useState(false);
  const [isEditingAnswer, setIsEditingAnswer] = useState(false);
  const { userId, isAdmin } = useContext(UserContext);
  const [question, setQuestion] = useState(null);
  const [editFields, setEditFields] = useState({
    category: '',
    subcategory: '',
    title: '',
    question: '',
  });

  useEffect(() => {
    if (QuestionAnswerData.length) {
      const foundQuestion = QuestionAnswerData.find((qna) => qna.$id === id);
      if (foundQuestion) {
        setQuestion(foundQuestion);
        setEditFields({
          category: foundQuestion.category || '',
          subcategory: foundQuestion.subcategory || '',
          title: foundQuestion.title || '',
          question: foundQuestion.question || '',
        });
      }
    }
  }, [QuestionAnswerData, id]);

  if (!question) {
    return <div>Question not found</div>;
  }

  const handleSubmitQuestion = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      await updateQuestionAnswer(question.$id, editFields);
      setIsEditingQuestion(false);
    } catch (error) {
      console.error('Error updating question:', error);
      setError('Failed to update question.');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmitAnswer = async (answer) => {
    setLoading(true);
    setError(null);
    try {
      await updateQuestionAnswer(question.$id, { answer });
      setIsEditingAnswer(false);
    } catch (error) {
      console.error('Error updating answer:', error);
      setError('Failed to update answer.');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this question?')) {
      setLoading(true);
      setError(null);
      try {
        await deleteQuestionAnswer(question.$id);
        navigate('/QuestionAnswer');
      } catch (error) {
        console.error('Error deleting question:', error);
        setError('Failed to delete question.');
      } finally {
        setLoading(false);
      }
    }
  };

  const handleFieldChange = (e) => {
    const { name, value } = e.target;
    setEditFields((prevFields) => ({
      ...prevFields,
      [name]: value,
    }));
  };

  // Determine if the user can edit the question
  const canEditQuestion = userId === question.userId && !question.answer;

  return (
    <Container>
      <HeaderSection>
        <Avatar src={question.avatarUrl} />
        <div>
          <p>{question.userName}</p>
          <p>
            <TimeAgo createdAt={question.$createdAt} /> | {question.views} views
          </p>
        </div>
      </HeaderSection>

      <QuestionSection>
        {isEditingQuestion ? (
          <QuestionEditForm
            editFields={editFields}
            handleFieldChange={handleFieldChange}
            handleSubmit={handleSubmitQuestion}
            loading={loading}
            setIsEditing={setIsEditingQuestion}
          />
        ) : (
          <QuestionConatiner>
            <p>{question.category} - {question.subcategory}</p>
            <h1>{question.title}</h1>
            <p>{question.question}</p>
            {canEditQuestion && (
              <button
                type="button"
                onClick={() => setIsEditingQuestion(true)}
              >
                Edit Question
              </button>
            )}
          </QuestionConatiner>
        )}
      </QuestionSection>

      <AnswerSection>
        <h1>Answer:</h1>
        {isEditingAnswer ? (
          <AnswerForm
            initialAnswer={question.answer}
            onSubmit={handleSubmitAnswer}
            onCancel={() => setIsEditingAnswer(false)}
            loading={loading}
          />
        ) : (
          <div>
            <p>{question.answer || 'No answer provided yet.'}</p>
            {isAdmin && (
              <>
                <button
                  type="button"
                  onClick={() => setIsEditingAnswer(true)}
                >
                  Edit Answer
                </button>
                <button
                  type="button"
                  onClick={handleDelete}
                  disabled={loading}
                >
                  {loading ? 'Deleting...' : 'Delete Question'}
                </button>
              </>
            )}
          </div>
        )}
      </AnswerSection>

      {error && <ErrorMessage>{error}</ErrorMessage>}
    </Container>
  );
}
