import React, { useContext, useState } from 'react';
import styled from 'styled-components';
import Avatar from '../User/Avatar';
import TimeAgo from '../../utils/TimeAgo';
import { UserContext } from '../../contexts/UserContext';

const CommentContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 50px;
  padding: 10px 0;
  border-top: 1px solid #ddd;
  width: 80%;
`;

const CommentItem = styled.div`
  display: flex;
  align-items: flex-start;
  margin-bottom: 10px;
`;

const CommentContent = styled.div`
  margin-left: 10px;
`;

const Button = styled.button`
  margin-top: 10px;
  padding: 5px 10px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
  &:hover {
    background-color: #0056b3;
  }
`;

const EditButton = styled(Button)`
  background-color: #ffc107;
  &:hover {
    background-color: #e0a800;
  }
`;

const DeleteButton = styled(Button)`
  background-color: #dc3545;
  &:hover {
    background-color: #c82333;
  }
`;

const CommentList = ({ comments, loading, error, updateComment, deleteComment }) => {
  const [visibleCount, setVisibleCount] = useState(2);
  const [editingCommentId, setEditingCommentId] = useState(null);
  const [newCommentText, setNewCommentText] = useState('');
  const {userId} = useContext(UserContext)

  if (loading) return <p>Loading comments...</p>;
  if (error) return <p>Error loading comments: {error.message}</p>;
  if (comments.length === 0) return <p>No comments yet.</p>;

  // Reverse the order of comments
  const reversedComments = [...comments].reverse();
  
  // Determine comments to display
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
  };

  const handleSaveEdit = async (commentId) => {
    await updateComment(commentId, newCommentText);
    setEditingCommentId(null);
    setNewCommentText('');
  };

  const handleDeleteClick = async (commentId) => {
    if (window.confirm("Are you sure you want to delete this comment?")) {
      await deleteComment(commentId);
    }
  };

  return (
    <div>
      <CommentContainer>
        {displayedComments.map(comment => (
          <CommentItem key={comment.$id}>
            <Avatar src={comment.avatarUrl} name={comment.userName} />
            <CommentContent>
              {editingCommentId === comment.$id ? (
                <>
                  <textarea
                    value={newCommentText}
                    onChange={(e) => setNewCommentText(e.target.value)}
                  />
                  <Button onClick={() => handleSaveEdit(comment.$id)}>Save</Button>
                </>
              ) : (
                <>
                  <p>{comment.comment}</p>
                  <TimeAgo createdAt={comment.$createdAt} />
                  {comment.userId === userId && (
                    <>
                      <EditButton onClick={() => handleEditClick(comment.$id, comment.comment)}>Edit</EditButton>
                      <DeleteButton onClick={() => handleDeleteClick(comment.$id)}>Delete</DeleteButton>
                    </>
                  )}
                </>
              )}
            </CommentContent>
          </CommentItem>
        ))}
      </CommentContainer>
      {comments.length > 2 && (
        <>
          {visibleCount < comments.length && (
            <Button onClick={handleShowMore}>Show More</Button>
          )}
          {visibleCount > 2 && (
            <Button onClick={handleShowLess}>Show Less</Button>
          )}
        </>
      )}
    </div>
  );
};

export default CommentList;
