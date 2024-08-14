import React, { useState, useContext } from 'react';
import styled from 'styled-components';
import { Outlet, useOutlet } from 'react-router-dom';
import { UserContext } from '../../contexts/UserContext';
import { useFeedbackData } from './useFeedbackData';
import Loading from '../../components/Loading';
import Avatar from '../../Features/User/Avatar';

const Container = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0 20px 20px 20px;
`;

const FeedbackContainer = styled.section`
  position: relative;
  background-color: white;
  display: flex;
  align-items: center;
  width: 700px;
  padding: 20px;
  border-radius: 8px;
  gap: 20px;

  textarea {
    flex: 1;
    padding: 15px 50px 0 20px;
    border-radius: 30px;
    background-color: #D6D6D6;
    font-size: 16px;
    outline: none;
    border: none;
    resize: none;
    height: 50px;
    overflow: hidden;
  }

  button {
    position: absolute;
    right: 25px;
    top: 50%;
    transform: translateY(-50%);
    width: 40px; 
    height: 40px; 
    border-radius: 30px; 
    background-color: #142B42;
    display: flex;
    align-items: center;
    justify-content: center;
    border: none;
    cursor: pointer;
    padding: 0;

    svg {
      width: 24px;
      height: 24px;
      color: #fff;
    }
  }
`;

const ErrorMessage = styled.p`
  color: red;
  margin-top: 10px;
`;

export default function Feedback() {
  const [feedback, setFeedback] = useState('');
  const [loading, setLoading] = useState(false);
  const [editingFeedback, setEditingFeedback] = useState(null);
  const [error, setError] = useState('');
  const outlet = useOutlet();
  const { userAvatarUrl,username, userId, isLogin, } = useContext(UserContext); // Ensure userInfo is included
  const { addFeedback, updateFeedback } = useFeedbackData();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isLogin) {
      if (!feedback.trim()) {
        setError('Please write something');
        return;
      }

      setLoading(true);
      try {
        if (editingFeedback) {
          await updateFeedback(editingFeedback.$id, { feedback });
          setEditingFeedback(null);
        } else {
          await addFeedback({
            feedback,
            userAvatarUrl: userAvatarUrl,
            userId,
            userName: username,
          });
        }
        setFeedback('');
        setError('');
      } catch (error) {
        console.error('Error submitting feedback:', error);
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <Container>
      {!outlet && (
        <>
          {isLogin ? (
            <FeedbackContainer>
              <Avatar src={userAvatarUrl} name={username} />
              <textarea
                placeholder="Any feedback?"
                value={feedback}
                onChange={(e) => {
                  setFeedback(e.target.value);
                  setError('');
                }}
              />
              <button type="submit" onClick={handleSubmit} disabled={loading}>
                {loading ? <Loading /> : (
                  <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-send" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
                    <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                    <path d="M10 14l11 -11" />
                    <path d="M21 3l-6.5 18a.55 .55 0 0 1 -1 0l-3.5 -7l-7 -3.5a.55 .55 0 0 1 0 -1l18 -6.5" />
                  </svg>
                )}
              </button>
            </FeedbackContainer>
          ) : (
            <p>Please log in to submit feedback.</p>
          )}
          {error && <ErrorMessage>{error}</ErrorMessage>}
        </>
      )}
      <Outlet />
    </Container>
  );
}
