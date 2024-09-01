import React from "react";
import { useParams } from "react-router-dom";
import Avatar from "../User/Avatar";
import { useFeedbackData } from "./useFeedbackData";
import styled from "styled-components";
import TimeAgo from "../../utils/TimeAgo";
import CommentsSection from "../Comment/CommentSection";
import useCommentsData from "../Comment/useCommentsData";

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

  @media (max-width: 600px) {
    font-size: 14px;
    margin: 4px 0;
  }
`;

export default function FeedbackDetails() {
  const { id } = useParams();
  const { feedbackData } = useFeedbackData();

  const feed = feedbackData.find((feed) => feed.$id === id);
  const { comments, loading, error, createComment, updateComment, deleteComment } = useCommentsData(feed.$id);

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
      </TopSection>
      <Text>{feed.feedback}</Text>

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
}
