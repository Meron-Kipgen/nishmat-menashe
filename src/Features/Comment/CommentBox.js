import React, { useContext, useState } from 'react';
import styled from 'styled-components';
import { FaPaperPlane } from 'react-icons/fa';
import Avatar from '../User/Avatar';
import { UserContext } from '../../contexts/UserContext';
import useCommentsData from './useCommentsData'; // Import the hook

const Container = styled.div`
  display: flex;
  align-items: center;
  padding: 0 30px;
  width: 100%;
  gap: 10px;
  @media (max-width: 768px) {
   padding: 10px;
    }
`;

const TextAreaContainer = styled.div`
  position: relative;
  width: 100%;
  top: 2px;
`;

const TextArea = styled.textarea`
  width: 100%;
  height: 35px;
  padding: 6px 40px 6px 10px ;
  border: 1px solid #ccc;
  border-radius: 30px;
  resize: none;
  font-size: 14px;
  line-height: 1.5;
  outline: none;
  transition: box-shadow 0.3s ease;

  &:focus {
    box-shadow: 0px 0px 5px rgba(0, 123, 255, 0.5);
  }

  /* Hide scrollbar in WebKit browsers (Chrome, Safari) */
  &::-webkit-scrollbar {
    display: none;
  }

  /* Hide scrollbar in Firefox */
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
`;

const SendButton = styled.button`
  position: absolute;
  top: 8px;
  right: 15px;
  background: none;
  border: none;
  color: #007bff;
  font-size: 18px;
  cursor: pointer;
`;

const LoginMessage = styled.div`
  padding: 10px 30px;
  color: #777;
  font-size: 14px;
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
    <>
      {userId ? (
        <Container>
          <Avatar src={userAvatarUrl} name={username} width="40px" height="35px" border="none"/>
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
      ) : (
        <LoginMessage>Please log in to comment</LoginMessage>
      )}
    </>
  );
};

export default CommentBox;
