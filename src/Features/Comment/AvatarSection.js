import React from 'react';
import styled from 'styled-components';
import Avatar from '../User/Avatar';
import TimeAgo from '../../utils/TimeAgo';

const AvatarContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 10px; /* Adjust gap as needed */
`;

const NameContainer = styled.section`
  display: flex;
  flex-direction: column;
`;

const Username = styled.h2`
  font-size: 1rem;
  margin: 0; /* Remove default margin if not needed */
  color: #333; /* Adjust color as needed */
`;

const Timestamp = styled.span`
  color: grey;
  font-size: 0.8rem;
`;

const AvatarSection = ({ avatarUrl, userName, createdAt }) => (
  <AvatarContainer>
    <Avatar src={avatarUrl} name={userName} />
    <NameContainer>
      <Username>{userName}</Username>
      <Timestamp><TimeAgo createdAt={createdAt} /></Timestamp>
    </NameContainer>
  </AvatarContainer>
);

export default AvatarSection;
