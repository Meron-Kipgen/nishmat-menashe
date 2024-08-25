import React, { useState, useContext, useRef, useEffect } from 'react';
import styled from 'styled-components';
import { useFeedbackData } from '../../Features/Feedback/useFeedbackData';
import useCommentsData from '../../Features/Comment/useCommentsData';
import { UserContext } from '../../contexts/UserContext';
import Avatar from '../../Features/User/Avatar';
import TimeAgo from '../../utils/TimeAgo';
import { DotHorizon, SaveIcon, CancelIcon, EditIcon, DeleteIcon, CommentIcon, ShareIcon } from '../../Assets/Icons'; 
import CommentsSection from '../../Features/Comment/CommentSection';
import FeedCard from "../../Features/Feedback/FeedCard"

const PostContainer = styled.div`
  display: flex;
  flex-direction: column;
  background: #f9f9f9;
  position: relative; 
  padding:10px 20px 0 20px;
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
  @media (max-width: 768px) {  
    padding:0 ;
  }
`;

const FeedbackPost = ({ post, maxPosts = 1}) => {
  const { deleteFeedback, updateFeedback } = useFeedbackData();
  const { userId } = useContext(UserContext);
  const { comments, loading, error, updateComment, deleteComment, createComment } = useCommentsData(post.$id);

  const [isEditing, setIsEditing] = useState(false);
  const [editedFeedback, setEditedFeedback] = useState(post.feedback);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [expandedLength, setExpandedLength] = useState(1000);


  const MAX_FEEDBACK_LENGTH = post.feedback.length;
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


  if (!post) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <PostContainer>
      <FeedCard
            id={post.$id}
            key={post.$id} 
            feedback={post.feedback} 
            createdAt={post.$createdAt}
            userName={post.userName}
            userAvatarUrl={post.userAvatarUrl}
          />
        <CommentsSection
        postId={post.$id}
        comments={comments}
        loading={loading}
        error={error}
        createComment={createComment}
        updateComment={updateComment}
        deleteComment={deleteComment}
        maxPosts={maxPosts}
      />
      </PostContainer>
    </>
  );
};

export default FeedbackPost;
