import React, { useContext, useState } from 'react';
import styled from 'styled-components';
import { FaPaperPlane } from 'react-icons/fa';
import Avatar from '../User/Avatar';
import { UserContext } from '../../contexts/UserContext';
import useCommentsData from './useCommentsData'; // Import the hook

const Container = styled.div`
  display: flex;
  align-items: flex-start;
  padding: 10px;
  background-color: #f7f7f7;
  border-radius: 8px;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
  width: 100%;
`;

const TextAreaContainer = styled.div`
  position: relative;
  width: 100%;
`;

const TextArea = styled.textarea`
  width: 100%;
  height: 50px;
  padding: 10px;
  padding-right: 40px;
  border: 1px solid #ccc;
  border-radius: 8px;
  resize: none;
  font-size: 14px;
  line-height: 1.5;
  outline: none;
  transition: box-shadow 0.3s ease;

  &:focus {
    box-shadow: 0px 0px 5px rgba(0, 123, 255, 0.5);
  }
`;

const SendButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  background: none;
  border: none;
  color: #007bff;
  font-size: 18px;
  cursor: pointer;
`;

const CommentBox = ({ postId }) => {
  const { userId, username, userAvatarUrl } = useContext(UserContext);
  const [comment, setComment] = useState('');
  const { createComment } = useCommentsData(postId);

  const handleSendComment = async () => {
    if (comment.trim() === '') return;

    try {
      await createComment(userId, username, userAvatarUrl, comment);
      setComment(''); // Clear the textarea after sending the comment
    } catch (error) {
      console.error('Error adding comment:', error);
    }
  };

  return (
    <Container>
      <Avatar src={userAvatarUrl} name={username} />
      <TextAreaContainer>
        <TextArea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="Write a comment..."
        />
        <SendButton onClick={handleSendComment}>
          <FaPaperPlane />
        </SendButton>
      </TextAreaContainer>
    </Container>
  );
};

export default CommentBox;
