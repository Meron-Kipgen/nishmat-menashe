import React from 'react';
import FeedbackForm from './FeedbackForm';
import styled from 'styled-components';
import { useFeedbackData } from './useFeedbackData';
import FeedCard from './FeedCard';
import { Outlet, useOutlet } from 'react-router-dom';

const Container = styled.section`
  width: 600px;
  margin: 45px auto;
  display: flex;
  flex-direction: column;

  min-height: 100vh; /* Center vertically */
  
  @media (max-width: 768px) {
    width: 100%;
    margin: 45px auto;
  }
`;

const FeedbackPost = styled.div`
  width: 100%;
  margin-top: 10px;
  @media (max-width: 768px) {
    margin-top: 10px;
  }
`;

export default function Feedback() {
  const { feedbackData } = useFeedbackData();
  const outlet = useOutlet();

  return (
    <Container>
      {!outlet && (
        <>
          <FeedbackForm />
          <FeedbackPost>
            {feedbackData.map((feed) => (
              <FeedCard
                id={feed.$id}
                key={feed.$id}
                feedUserId = {feed.userId}
                feedback={feed.feedback}
                createdAt={feed.$createdAt}
                userName={feed.userName}
                userAvatarUrl={feed.userAvatarUrl}
              />
            ))}
          </FeedbackPost>
        </>
      )}
      <Outlet />
    </Container>
  );
}
