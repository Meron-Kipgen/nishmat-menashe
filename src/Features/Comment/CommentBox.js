import React, { useContext, useState } from 'react';
import styled from 'styled-components';
import { FaPaperPlane, FaSpinner } from 'react-icons/fa';
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
  padding: 6px 40px 6px 10px;
  border: 1px solid #ccc;
  border-radius: 30px;
  resize: none;
  font-size: 14px;
  line-height: 1.5;
  font-family: Arial, Helvetica, sans-serif;
  outline: none;
  transition: box-shadow 0.3s ease;
  direction: ${(props) => (props.dir ? props.dir : 'ltr')}; // Set text direction

  &:focus {
    box-shadow: 0px 0px 5px rgba(0, 123, 255, 0.5);
  }

  &::-webkit-scrollbar {
    display: none;
  }

  -ms-overflow-style: none;
  scrollbar-width: none;
`;

const SendButton = styled.button`
  position: absolute;
  top: 8px;
  right: 15px;
  background: none;
  border: none;
  color: #007bff;
  font-size: 18px;
  cursor: ${(props) => (props.disabled ? 'not-allowed' : 'pointer')};
  opacity: ${(props) => (props.disabled ? 0.5 : 1)};
  display: flex;
  align-items: center;
`;

const LoadingSpinner = styled(FaSpinner)`
  animation: spin 1s linear infinite;
  font-size: 18px;
  margin-right: 5px;
  
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;

const LoginMessage = styled.div`
  padding: 10px 30px;
  color: #777;
  font-size: 14px;
`;

const WarningMessage = styled.div`
  color: red;
  font-size: 12px;
  padding: 5px;
`;

const CommentBox = ({ postId }) => {
  const { userId, username, userAvatarUrl } = useContext(UserContext);
  const [comment, setComment] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { createComment } = useCommentsData(postId);

  const handleSendComment = async () => {
    if (comment.trim() === '') return;

    setIsLoading(true);

    try {
      await createComment(userId, username, userAvatarUrl, comment);
      setComment(''); // Clear the textarea after sending the comment
    } catch (error) {
      console.error('Error adding comment:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e) => {
    setComment(e.target.value);
  };

  const remainingChars = 1000 - comment.length;
  const isNearLimit = remainingChars <= 100;

  // Determine direction based on the content or language
  const detectDirection = (text) => {
    const rtlPattern = /[\u0600-\u06FF\u0750-\u077F\u08A0-\u08FF\uFB00-\uFB4F\uFE70-\uFEFF]/;
    return rtlPattern.test(text) ? 'rtl' : 'ltr';
  };

  return (
    <>
      {userId ? (
        <Container>
          <Avatar src={userAvatarUrl} name={username} width="40px" height="35px" border="none"/>
          <TextAreaContainer>
            <TextArea
              value={comment}
              onChange={handleChange}
              placeholder="Write a comment..."
              maxLength="1000"
              dir={detectDirection(comment)} // Set text direction dynamically
            />
            {isNearLimit && <WarningMessage>{remainingChars} characters remaining</WarningMessage>}
            <SendButton onClick={handleSendComment} disabled={isLoading}>
              {isLoading ? <LoadingSpinner /> : <FaPaperPlane />}
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
