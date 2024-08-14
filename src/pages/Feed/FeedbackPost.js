import React, { useState, useContext, useRef, useEffect } from 'react';
import styled from 'styled-components';
import { useFeedbackData } from '../../Features/Feedback/useFeedbackData';
import { UserContext } from '../../contexts/UserContext';
import Avatar from '../../Features/User/Avatar';
import TimeAgo from '../../utils/TimeAgo';
import { DotHorizon, SaveIcon, CancelIcon, EditIcon, DeleteIcon } from '../../Assets/Icons'; 

const PostContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 10px;
  background: #f9f9f9;
  position: relative; 
  padding: 15px;
`;

const TopSection = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 5px;
  position: relative; 
`;

const AvatarWrapper = styled.div`
  margin-right: 20px;
  margin-left: 25px;
`;

const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const PostContent = styled.div`
  padding: 10px 0;
  word-wrap: break-word;
  
  p {
    margin: 0;
  }
`;

const ActionSection = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 10px;
`;

const DropdownButton = styled.button`
  background: transparent;
  border: none;
  cursor: pointer;
  font-size: 16px;
  color: #000;
  position: absolute;
  top:-10px;
  right: -7px;
  z-index: 10;
  &:hover{
background: #D6D6D6;
border-radius: 50%;
width: 30px;
height: 30px;
  }
`;

const DropdownMenu = styled.div`
  display: ${({ open }) => (open ? 'block' : 'none')};
  position: absolute;
  top: 0; 
  right: 10px;
  background: white;
  border: 1px solid #ddd;
  border-radius: 4px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
  z-index: 900;

  button {

    display: flex;
    align-items: center;
    gap: 20px;
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

const Username = styled.div`
  font-size: 1rem;
  margin-top: 5px;
  p {
    color: grey;
    font-size: 0.8rem;
    margin: 5px 0;
  }
`;

const ActionButton = styled.button`
  margin-right: 10px;
  padding: 5px 10px;
  border: none;
  border-radius: 4px;
  background-color: #007BFF;
  color: white;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 5px;

  &:hover {
    background-color: #0056b3;
  }

  svg {
    width: 16px;
    height: 16px;
  }
`;

const FeedbackPost = ({ post }) => {
  const { deleteFeedback, updateFeedback } = useFeedbackData();
  const { userId } = useContext(UserContext);

  const [isEditing, setIsEditing] = useState(false);
  const [editedFeedback, setEditedFeedback] = useState(post.feedback);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const dropdownRef = useRef(null);

  const handleEditClick = () => {
    setIsEditing(true);
    setDropdownOpen(false);
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditedFeedback(post.feedback);
  };

  const handleSave = async () => {
    try {
      await updateFeedback(post.$id, { feedback: editedFeedback });
      setIsEditing(false);
    } catch (error) {
      console.error('Error updating feedback:', error);
    }
  };

  const handleDelete = async () => {
    try {
      await deleteFeedback(post.$id);
    } catch (error) {
      console.error('Error deleting feedback:', error);
    }
  };

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setDropdownOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <PostContainer>
      <TopSection>
        <AvatarWrapper>
          <Avatar src={post.userAvatarUrl} name={post.userName} />
        </AvatarWrapper>
        <ContentWrapper>
          <Username>
            <strong>{post.userName}</strong>
            <p><TimeAgo createdAt={post.$createdAt}/></p>
          </Username>
        </ContentWrapper>
        {post.userId === userId && (
          <DropdownButton onClick={() => setDropdownOpen(!dropdownOpen)}>
            <DotHorizon width="30px" height="30px"/>
          </DropdownButton>
        )}
        <DropdownMenu ref={dropdownRef} open={dropdownOpen}>
          <button onClick={handleEditClick}>
            <EditIcon /> Edit
          </button>
          <button onClick={handleDelete}>
            <DeleteIcon /> Delete
          </button>
        </DropdownMenu>
      </TopSection>
      <PostContent>
        {isEditing ? (
          <>
            <textarea
              value={editedFeedback}
              onChange={(e) => setEditedFeedback(e.target.value)}
              rows="4"
              style={{ width: '100%', padding: '8px', borderRadius: '4px' }}
            />
            <div>
              <ActionButton onClick={handleSave}>
                <SaveIcon /> Save
              </ActionButton>
              <ActionButton onClick={handleCancel}>
                <CancelIcon /> Cancel
              </ActionButton>
            </div>
          </>
        ) : (
          <p>{post.feedback}</p>
        )}
      </PostContent>
     
        <ActionSection>
          <ActionButton>
            <SaveIcon /> Comment
          </ActionButton>
          <ActionButton>
            <SaveIcon /> Share
          </ActionButton>
        </ActionSection>
     
    </PostContainer>
  );
};

export default FeedbackPost;
