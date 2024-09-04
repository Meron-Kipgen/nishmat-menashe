import React, { useState, useContext, useRef, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Avatar from '../User/Avatar';
import { useFeedbackData } from './useFeedbackData';
import styled from 'styled-components';
import TimeAgo from '../../utils/TimeAgo';
import CommentsSection from '../Comment/CommentSection';
import useCommentsData from '../Comment/useCommentsData';
import { UserContext } from '../../contexts/UserContext';
import { SaveIcon, CancelIcon, EditIcon, DeleteIcon, DotHorizon } from '../../Assets/Icons'; 

const Container = styled.div`
  display: flex;
  flex-direction: column;
  background-color: #fff;
  width: 600px;
  max-width: 100%; /* Ensures it doesn't overflow on smaller screens */
  margin: 0 auto; /* Centers the container horizontally on larger screens */

  @media (max-width: 600px) {
    width: 100%;
    padding: 0;
  }
`;

const TopSection = styled.div`
  width: 100%;
  display: flex;
  gap: 20px;
  padding: 10px;
  position: relative; /* Ensure dropdown is positioned relative to this container */
`;

const Username = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const Text = styled.p`
  font-size: 16px;
  line-height: 1.5;
  padding: 10px;
  word-wrap: break-word;     
  overflow-wrap: break-word;
  word-break: break-word; 
  @media (max-width: 600px) {
    font-size: 14px;
    margin: 4px 0;
  }
`;

const DropdownButton = styled.button`
  background: transparent;
  border: none;
  cursor: pointer;
  font-size: 16px;
  color: #000;
  position: absolute;
  top: 0;
  right: 10px;

  &:hover {
    background: #D6D6D6;
    border-radius: 50%;
    width: 25px;
    height: 25px;
  }
`;

const DropdownMenu = styled.div`
  display: ${({ open }) => (open ? 'block' : 'none')};
  position: absolute;
  top: 30px; /* Adjust as needed */
  right: 10px;
  background: white;
  border: 1px solid #ddd;
  border-radius: 4px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
  z-index: 900;
  width: 120px; /* Adjust as needed */

  button {
    display: flex;
    align-items: center;
    gap: 10px;
    width: 100%;
    padding: 10px;
    border: none;
    background: transparent;
    text-align: left;
    cursor: pointer;

    &:hover {
      background-color: #f0f0f0;
    }
  }
`;

const ActionBtnContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 10px;
`;

const ActionButton = styled.button`
  padding: 5px 10px;
  border: none;
  border-radius: 4px;
  background-color: white;
  color: black;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 5px;

  &:hover {
    background-color: #f0f0f0;
  }
`;

const FeedbackDetails = () => {
  const { id } = useParams();
  const { feedbackData, updateFeedback, deleteFeedback } = useFeedbackData();
  const { comments, loading, error, createComment, updateComment, deleteComment } = useCommentsData(id);
  const { userId } = useContext(UserContext);
  const [isEditing, setIsEditing] = useState(false);
  const [editedFeedback, setEditedFeedback] = useState('');
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const feed = feedbackData.find((feed) => feed.$id === id);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    if (feed) {
      setEditedFeedback(feed.feedback);
    }
  }, [feed]);

  const handleEditClick = () => {
    setIsEditing(true);
    setDropdownOpen(false);
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditedFeedback(feed.feedback);
  };

  const handleSave = async () => {
    try {
      await updateFeedback(id, { feedback: editedFeedback });
      setIsEditing(false);
    } catch (error) {
      console.error('Error updating feedback:', error);
    }
  };

  const handleDelete = async () => {
    try {
      await deleteFeedback(id);
    } catch (error) {
      console.error('Error deleting feedback:', error);
    }
  };

  if (!feed) {
    return <p>Feedback not found</p>;
  }

  return (
    <Container>
      <TopSection>
        <Avatar src={feed.userAvatarUrl} />
        <Username>
          <p>{feed.userName}</p>
          <TimeAgo createdAt={feed.$createdAt} />
        </Username>
        {userId === feed.userId && (
          <div ref={dropdownRef}>
            <DropdownButton onClick={() => setDropdownOpen(!dropdownOpen)}>
              <DotHorizon width="20px" height="20px" />
            </DropdownButton>
            <DropdownMenu open={dropdownOpen}>
              <button onClick={handleEditClick}>
                <EditIcon /> Edit
              </button>
              <button onClick={handleDelete}>
                <DeleteIcon /> Delete
              </button>
            </DropdownMenu>
          </div>
        )}
      </TopSection>
      {isEditing ? (
        <>
          <textarea
            value={editedFeedback}
            onChange={(e) => setEditedFeedback(e.target.value)}
            rows="4"
            style={{
              width: '100%',
              padding: '8px',
              borderRadius: '4px',
              border: 'none',
              outline: 'none',
              resize: 'none',
              overflow: 'hidden',
              boxSizing: 'border-box',
              fontSize: 16,
              background: "#D6D6D6",
            }}
          />
          <ActionBtnContainer>
            <ActionButton onClick={handleSave}>
              <SaveIcon height="20px" width="20px" stroke="green" /> Save
            </ActionButton>
            <ActionButton onClick={handleCancel}>
              <CancelIcon height="20px" width="20px" stroke="red" /> Cancel
            </ActionButton>
          </ActionBtnContainer>
        </>
      ) : (
        <Text>{feed.feedback}</Text>
      )}
      <CommentsSection
        postId={feed.$id}
        comments={comments}
        loading={loading}
        error={error}
        createComment={createComment}
        updateComment={updateComment}
        deleteComment={deleteComment}
      />
    </Container>
  );
};

export default FeedbackDetails;
