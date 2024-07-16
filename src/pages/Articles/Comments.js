import React from "react";
import styled from "styled-components";

const Container = styled.div`
  margin-top: 20px;
  padding: 20px;
`;

const CommentBox = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
  background: #fff;
  padding: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  border-radius: 10px;
`;

const CommentContainer = styled.div`
  display: flex;
  align-items: flex-start;
  margin-bottom: 20px;
`;

const Comment = styled.div`
  flex: 1;
  padding: 15px;
  background: #f0f0f0;
  border-radius: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  position: relative;
  margin-left: 10px;

  &::before {
    content: "";
    position: absolute;
    top: 15px;
    left: -10px;
    width: 0;
    height: 0;
    border-top: 10px solid transparent;
    border-bottom: 10px solid transparent;
    border-right: 10px solid #f0f0f0;
  }
`;

const RepliesContainer = styled.div`
  margin-left: 20px;
  margin-top: 10px;
`;

const Reply = styled.div`
  padding: 10px;
  background: #e0e0e0;
  border-radius: 8px;
  margin-top: 10px;
`;

const Avatar = styled.div`
  width: 45px;
  height: 45px;
  border-radius: 50%;
  background: #007bff;
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  font-size: 1.2rem;
`;

const UserContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 8px;
`;

const UserName = styled.p`
  font-weight: bold;
  margin-left: 10px;
`;

const CommentText = styled.p`
  margin: 10px 0;
`;

const Input = styled.input`
  flex: 1;
  margin-left: 10px;
  padding: 10px;
  border: none;
  border-bottom: 2px solid #ccc;
  font-size: 14px;
  outline: none;

  &:focus {
    border-bottom: 2px solid #007bff;
  }
`;

const Button = styled.button`
  margin-left: 10px;
  padding: 10px 15px;
  border-radius: 8px;
  border: none;
  background-color: #007bff;
  color: #fff;
  font-size: 14px;
  cursor: pointer;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

  &:hover {
    background-color: #0056b3;
  }
`;

const Comments = ({ comments }) => {
  return (
    <Container>
      <CommentBox>
        <Avatar>MK</Avatar>
        <Input type="text" placeholder="Add a comment..." />
        <Button>Add Comment</Button>
      </CommentBox>
      {comments.length > 0 ? (
        comments.map((comment, index) => (
          <CommentContainer key={index}>
            <Avatar>MK</Avatar>
            <Comment>
              <UserContainer>
                <UserName>User Name</UserName>
              </UserContainer>
              <CommentText>{comment.comment}</CommentText>
              {comment.reply.length > 0 && (
                <RepliesContainer>
                  <ul>
                    {comment.reply.map((reply, idx) => (
                      <Reply key={idx}>
                        <UserContainer>
                          <Avatar>{reply.userName.charAt(0)}</Avatar>
                          <UserName>{reply.userName}</UserName>
                        </UserContainer>
                        <p>{reply.replytext}</p>
                      </Reply>
                    ))}
                  </ul>
                </RepliesContainer>
              )}
            </Comment>
          </CommentContainer>
        ))
      ) : (
        <p>No comments yet.</p>
      )}
    </Container>
  );
};

export default Comments;
