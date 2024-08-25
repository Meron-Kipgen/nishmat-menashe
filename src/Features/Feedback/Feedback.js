import React from 'react';
import FeedbackForm from './FeedbackForm';
import styled from 'styled-components';
import { useFeedbackData } from './useFeedbackData';
import FeedCard from './FeedCard';
import { Outlet, useOutlet } from 'react-router-dom';

const Container = styled.section`
  margin-top: 50px;
  width: 700px;
  margin: 50px auto; /* Center horizontally */
  display: flex;
  flex-direction: column;
  align-items: center; /* Center children horizontally */
`;

const FeedbackPost = styled.div`
  width: 100%;
`;

export default function Feedback() {
  const { feedbackData } = useFeedbackData();
const outlet = useOutlet()

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
            feedback={feed.feedback} 
            createdAt={feed.$createdAt}
            userName={feed.userName}
            userAvatarUrl={feed.userAvatarUrl}
          />
        ))}
      </FeedbackPost>  
      </>
      )}
    <Outlet/>
    </Container>
  );
}
