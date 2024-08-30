import React from 'react';
import styled from 'styled-components';
import AnswerForm from './AnswerForm';

const AnswerContainer = styled.div`
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
  p {
    font-size: ${({ fontSize }) => fontSize || '1rem'};
  }
`;

const AnswerSection = ({ question, isEditingAnswer, handleSubmitAnswer, loading, setIsEditingAnswer, isAdmin, handleDelete, deletingQuestion, fontSize }) => (
  <AnswerContainer fontSize={fontSize}>
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
              disabled={deletingQuestion}
            >
              {deletingQuestion ? 'Deleting...' : 'Delete Question'}
            </button>
          </>
        )}
      </div>
    )}
  </AnswerContainer>
);

export default AnswerSection;
