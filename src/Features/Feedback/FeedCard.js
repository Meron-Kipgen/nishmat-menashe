import React, { useState, useContext, useRef, useEffect } from 'react';
import styled from 'styled-components';
import { useFeedbackData } from './useFeedbackData';
import useCommentsData from '../../Features/Comment/useCommentsData';
import { UserContext } from '../../contexts/UserContext';
import Avatar from '../../Features/User/Avatar';
import TimeAgo from '../../utils/TimeAgo';
import { DotHorizon, SaveIcon, CancelIcon, EditIcon, DeleteIcon, CommentIcon, ShareIcon } from '../../Assets/Icons'; 
import { useNavigate } from 'react-router-dom';

const PostContainer = styled.div`
  display: flex;
  flex-direction: column;
  background: #f9f9f9;
  position: relative; 
  padding:10px 20px 0 20px;
  margin-top: 10px;
  @media (max-width: 768px) {
    margin: 10px 0;
  }
`;

const TopSection = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 5px;
  position: relative; 
`;

const AvatarWrapper = styled.div`
  margin-right: 10px;

  @media (max-width: 768px) {
    margin-left: 0;
  }
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



const DropdownButton = styled.button`
  background: transparent;
  border: none;
  cursor: pointer;
  font-size: 16px;
  color: #000;
  position: absolute;
  top: 0px;
  right: -7px;

  
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
  background-color: white;
  color: white;
  cursor: pointer;
  display: flex;
  color: black;
  align-items: center;
  gap: 5px;

  &:hover {
    color: red;
  }
`;

const ActionBtnContainer = styled.div`
  display: flex;
  justify-content: flex-end;
`;

const FeedbackContainer = styled.div`
  word-wrap: break-word;
  overflow-wrap: break-word;
  word-break: break-word;
  cursor: pointer;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
  -webkit-line-clamp: 10; /* Limit to 10 lines */
  @media (max-width: 768px) {  
    padding: 0;
  }
`;




const FeedbackPost = ({userAvatarUrl,feedback,feedUserId, userName, id, createdAt}) => {
  const { deleteFeedback, updateFeedback } = useFeedbackData();
  const { userId } = useContext(UserContext);
  const { comments } = useCommentsData(id);
    const navigate = useNavigate()
  const [isEditing, setIsEditing] = useState(false);
  const [editedFeedback, setEditedFeedback] = useState(feedback);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);


const handleClick = ()=>{
    navigate(`/feedback/${id}`)
}
  const handleEditClick = () => {
    setIsEditing(true);
    setDropdownOpen(false);
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditedFeedback(feedback);
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

  return (
    <>
      <PostContainer>
        <TopSection>
          <AvatarWrapper>
            <Avatar src={userAvatarUrl} name={userName}/>
          </AvatarWrapper>
          <ContentWrapper>
            <Username>
              <strong>{userName}</strong>
              <p><TimeAgo createdAt={createdAt} /> - {` ${comments.length} Comment${comments.length > 1 ? 's' : ''}`}</p>
            </Username>
           
          </ContentWrapper>
          {feedUserId === userId && (
            <DropdownButton onClick={() => setDropdownOpen(!dropdownOpen)}>
              <DotHorizon width="20px" height="20px" />
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
            <FeedbackContainer  onClick={handleClick}>
             <p>{feedback}</p>
            </FeedbackContainer>
          )}
        </PostContent>
      </PostContainer>
    </>
  );
};

export default FeedbackPost;
