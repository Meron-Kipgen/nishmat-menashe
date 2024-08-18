import React, { useState, useContext, useRef, useEffect } from 'react';
import styled from 'styled-components';
import { useFeedbackData } from '../../Features/Feedback/useFeedbackData';
import useCommentsData from '../../Features/Comment/useCommentsData';
import { UserContext } from '../../contexts/UserContext';
import Avatar from '../../Features/User/Avatar';
import TimeAgo from '../../utils/TimeAgo';
import { DotHorizon, SaveIcon, CancelIcon, EditIcon, DeleteIcon, CommentIcon, ShareIcon } from '../../Assets/Icons'; 
import CommentBox from '../../Features/Comment/CommentBox';
import CommentList from '../../Features/Comment/CommentList';

const PostContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 10px;
  background: #f9f9f9;
  position: relative; 
  padding: 15px;
  border-bottom: 1px solid #ccc;
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

const ActionSection = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 10px;
  padding: 0 20px 0 20px;
`;

const DropdownButton = styled.button`
  background: transparent;
  border: none;
  cursor: pointer;
  font-size: 16px;
  color: #000;
  position: absolute;
  top: -10px;
  right: -7px;
  z-index: 10;
  
  &:hover {
    background: #D6D6D6;
    border-radius: 50%;
    width: 20px;
    height: 20px;
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
  display: flex;
  align-items: center;

  &:hover {
    color: red;
  }
`;

const ActionBtnContainer = styled.div`
  display: flex;
  justify-content: flex-end;
`;

const FeedbackContainer = styled.div`
 
  padding: 0 30px 0 30px;
  word-wrap: break-word;     
  overflow-wrap: break-word;
  word-break: break-word; 
  @media (max-width: 768px) {  
    padding:0 ;
  }
`;

const FeedbackPost = ({ post }) => {
  const { deleteFeedback, updateFeedback } = useFeedbackData();
  const { userId } = useContext(UserContext);
  const { comments, loading, error, updateComment, deleteComment, createComment } = useCommentsData(post.$id);

  const [isEditing, setIsEditing] = useState(false);
  const [editedFeedback, setEditedFeedback] = useState(post.feedback);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [expandedLength, setExpandedLength] = useState(700); // Start with 400 characters

  const MAX_FEEDBACK_LENGTH = post.feedback.length; // Maximum length of the feedback

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

  const handleShowMore = () => {
    setExpandedLength((prevLength) => Math.min(prevLength + 700, MAX_FEEDBACK_LENGTH));
  };

  return (
    <>
      <PostContainer>
        <TopSection>
          <AvatarWrapper>
            <Avatar src={post.userAvatarUrl} name={post.userName}/>
          </AvatarWrapper>
          <ContentWrapper>
            <Username>
              <strong>{post.userName}</strong>
              <p><TimeAgo createdAt={post.$createdAt} /></p>
            </Username>
          </ContentWrapper>
          {post.userId === userId && (
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
            <FeedbackContainer>
              {post.feedback.length > expandedLength
                ? `${post.feedback.slice(0, expandedLength)}...`
                : post.feedback}
              {post.feedback.length > expandedLength && (
                <ActionButton onClick={handleShowMore}>
                  Show More
                </ActionButton>
              )}
            </FeedbackContainer>
          )}
        </PostContent>
        <ActionSection>
          <ActionButton>
            <CommentIcon height="20px" width="20px" stroke="black" /> {comments.length} Comments
          </ActionButton>
          <ActionButton>
            <ShareIcon height="20px" width="20px" stroke="black" /> Share
          </ActionButton>
        </ActionSection>
      </PostContainer>
      <CommentBox postId={post.$id} />
      <CommentList
        comments={comments}
        loading={loading}
        error={error}
        updateComment={updateComment}
        deleteComment={deleteComment}
        createComment={createComment}
      />
    </>
  );
};

export default FeedbackPost;
