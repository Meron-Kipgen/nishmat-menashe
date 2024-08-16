import React from 'react';
import styled from 'styled-components';

const Button = styled.button`
  margin-top: 10px;
  padding: 5px 10px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
  &:hover {
    background-color: #0056b3;
  }
`;

const Textarea = styled.textarea`
  width: 100%;
  padding: 10px;
  margin-top: 10px;
  font-size: 14px;
  border: 1px solid #ccc;
  border-radius: 4px;
  outline: none;
  resize: none; /* Hide resize control */
  overflow-y: hidden; /* Hide scrollbar */
  box-shadow: inset 0 2px 4px rgba(0, 0, 0, 0.1);
  &:focus {
    border-color: #007bff;
    box-shadow: 0 0 5px rgba(0, 123, 255, 0.5);
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  gap: 10px;
`;

const CancelButton = styled(Button)`
  background-color: #6c757d;
  &:hover {
    background-color: #5a6268;
  }
`;

const CommentActions = ({ 
  isEditing, 
  newCommentText, 
  onSaveEdit, 
  onChange, 
  onCancelEdit, 
  onShowMore, 
  onShowLess, 
  commentId, 
  commentLength, 
  maxLength, 
  expandedLength 
}) => (
  <>
    {isEditing ? (
      <>
        <Textarea 
          value={newCommentText} 
          onChange={onChange} 
          rows={4} // Set initial height
        />
        <ButtonContainer>
          <Button onClick={() => onSaveEdit(commentId)}>Save</Button>
          <CancelButton onClick={onCancelEdit}>Cancel</CancelButton>
        </ButtonContainer>
      </>
    ) : (
      <>
        {commentLength > maxLength && (
          <Button onClick={onShowMore}>Show More</Button>
        )}
        {expandedLength > maxLength && (
          <Button onClick={onShowLess}>Show Less</Button>
        )}
      </>
    )}
  </>
);

export default CommentActions;
