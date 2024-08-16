import React, { useContext, useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import { UserContext } from '../../contexts/UserContext';
import AvatarSection from './AvatarSection';
import DropdownMenu from './DropdownMenu';
import CommentActions from './CommentActions';
import CommentContent from './CommentContent';
import { DotHorizon } from '../../Assets/Icons';

const Container = styled.div`
  margin-left: 90px;
  padding: 10px 0;
  width: 80%;

`;

const CommentItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-bottom: 10px;
  padding-bottom: 10px;
  border-bottom: 1px solid #ccc;
`;

const TopContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 15px;
  position: relative;
  width: 100%;

`;

const DropdownButton = styled.button`
 background: transparent;
  border: none;
  cursor: pointer;
  font-size: 16px;
  color: #000;
  position: absolute;
  top: -10px;
  right: 0;
  z-index: 10;
  
  &:hover {
    background: #D6D6D6;
    border-radius: 50%;
    width: 20px;
    height: 20px;
  }
`;

const CommentList = ({ comments, loading, error, updateComment, deleteComment }) => {
  const [visibleCount, setVisibleCount] = useState(2);
  const [editingCommentId, setEditingCommentId] = useState(null);
  const [newCommentText, setNewCommentText] = useState('');
  const { userId } = useContext(UserContext);
  const [dropdownOpen, setDropdownOpen] = useState(null);
  const dropdownRef = useRef(null);

  const MAX_COMMENT_LENGTH = 400;
  const [expandedComments, setExpandedComments] = useState({});

  const reversedComments = [...comments].reverse();
  const displayedComments = reversedComments.slice(0, visibleCount);

  const handleShowMore = () => {
    setVisibleCount(prevCount => prevCount + 5);
  };

  const handleShowLess = () => {
    setVisibleCount(2);
  };

  const handleEditClick = (commentId, commentText) => {
    setEditingCommentId(commentId);
    setNewCommentText(commentText);
    setDropdownOpen(null);
  };
  
  const handleCancelEdit = () => {
    setEditingCommentId(null);
    setNewCommentText('');
  };

  const handleSaveEdit = async (commentId) => {
    try {
      await updateComment(commentId, newCommentText);
      setEditingCommentId(null);
      setNewCommentText('');
    } catch (error) {
      console.error("Error updating comment:", error);
    }
 
  };
  
  const handleDeleteClick = async (commentId) => {
    try {
      if (window.confirm("Are you sure you want to delete this comment?")) {
        await deleteComment(commentId);
      }
      setDropdownOpen(null);
    } catch (error) {
      console.error("Error deleting comment:", error);
    }
  };
  
  

  const toggleExpandComment = (commentId) => {
    setExpandedComments((prev) => ({
      ...prev,
      [commentId]: (prev[commentId] || MAX_COMMENT_LENGTH) + MAX_COMMENT_LENGTH,
    }));
  };

  const handleThreeDotsClick = (commentId) => {
    setDropdownOpen(dropdownOpen === commentId ? null : commentId);
  };

  const handleClickOutside = (e) => {
    if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
      setDropdownOpen(null);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div>
      <Container>
        {displayedComments.map(comment => (
          <CommentItem key={comment.$id}>
            <TopContainer>
              <AvatarSection 
                avatarUrl={comment.avatarUrl} 
                userName={comment.userName} 
                createdAt={comment.$createdAt} 
              />
              {comment.userId === userId && (
                <div ref={dropdownRef}>
                  <DropdownButton onClick={() => handleThreeDotsClick(comment.$id)}>
                  <DotHorizon width="20px" height="20px" />
                  </DropdownButton>
                  {dropdownOpen === comment.$id && (
                    <DropdownMenu 
                      onEditClick={() => handleEditClick(comment.$id, comment.comment)} 
                      onDeleteClick={() => handleDeleteClick(comment.$id)} 
                    />
                  )}
                </div>
              )}
            </TopContainer>

            <CommentContent 
              text={comment.comment} 
              expandedLength={expandedComments[comment.$id]} 
              maxLength={MAX_COMMENT_LENGTH} 
            />

            <CommentActions 
              isEditing={editingCommentId === comment.$id}
              newCommentText={newCommentText}
              onSaveEdit={handleSaveEdit}
              onCancelEdit = {handleCancelEdit}
              onChange={(e) => setNewCommentText(e.target.value)}
              onShowMore={() => toggleExpandComment(comment.$id)}
              onShowLess={() => setExpandedComments((prev) => ({ ...prev, [comment.$id]: MAX_COMMENT_LENGTH }))}
              commentId={comment.$id}
              commentLength={comment.comment.length}
              maxLength={MAX_COMMENT_LENGTH}
              expandedLength={expandedComments[comment.$id]}
            />
          </CommentItem>
        ))}
      </Container>
      {comments.length > visibleCount && (
        <button onClick={handleShowMore}>Show More</button>
      )}
      {visibleCount > 2 && (
        <button onClick={handleShowLess}>Show Less</button>
      )}
    </div>
  );
};

export default CommentList;
