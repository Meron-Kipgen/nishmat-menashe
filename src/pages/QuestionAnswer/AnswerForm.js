import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';

const ButtonGroup = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 10px;
  margin-top: 15px;

  @media (min-width: 768px) {
    flex-direction: row;
    justify-content: flex-end;
  }
`;

const Button = styled.button`
  padding: 10px 16px;
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
  min-height: 100px;
  max-height: 300px;
  padding: 12px;
  border-radius: 6px;
  border: 1px solid #ccc;
  font-size: 1em;
  margin-bottom: 15px;
  box-sizing: border-box;
  resize: none;
  overflow-y: auto;
`;

const AnswerForm = ({ initialAnswer, onSubmit, onCancel, loading }) => {
  const [answer, setAnswer] = useState(initialAnswer);
  const textareaRef = useRef(null);

  useEffect(() => {
    const adjustHeight = () => {
      if (textareaRef.current) {
        textareaRef.current.style.height = 'auto';
        textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
      }
    };

    adjustHeight();
  }, [answer]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (answer.trim()) {
      await onSubmit(answer);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <Textarea
        ref={textareaRef}
        placeholder="Provide an answer..."
        value={answer}
        onChange={(e) => setAnswer(e.target.value)}
      />
      <ButtonGroup>
        <Button type="submit" variant="submit" disabled={loading}>
          {loading ? 'Submitting...' : 'Submit Answer'}
        </Button>
        <Button type="button" onClick={onCancel}>
          Cancel
        </Button>
      </ButtonGroup>
    </form>
  );
};

export default AnswerForm;
