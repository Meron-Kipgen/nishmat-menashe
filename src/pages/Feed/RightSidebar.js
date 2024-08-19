import React from 'react';
import styled from 'styled-components';
import { FaUsers, FaBell, FaCalendarAlt, FaHashtag, FaStar } from 'react-icons/fa';

const SidebarContainer = styled.div`
background: white;
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const SectionTitle = styled.h3`
  margin-bottom: 10px;
  font-size: 1.2em;
`;

const Item = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const Icon = styled.div`
  font-size: 1.5em;
`;

const Text = styled.span`
  font-size: 1em;
`;

const RightSidebar = () => {
  return (
    <SidebarContainer>
      <div>
        <SectionTitle>Friend Suggestions</SectionTitle>
        <Item>
          <Icon><FaUsers /></Icon>
          <Text>John Doe</Text>
        </Item>
        <Item>
          <Icon><FaUsers /></Icon>
          <Text>Jane Smith</Text>
        </Item>
        {/* Add more friend suggestions as needed */}
      </div>
      
      <div>
        <SectionTitle>Trending Topics</SectionTitle>
        <Item>
          <Icon><FaHashtag /></Icon>
          <Text>#TrendingTopic1</Text>
        </Item>
        <Item>
          <Icon><FaHashtag /></Icon>
          <Text>#TrendingTopic2</Text>
        </Item>
        {/* Add more trending topics as needed */}
      </div>

      <div>
        <SectionTitle>Recent Activities</SectionTitle>
        <Item>
          <Icon><FaStar /></Icon>
          <Text>Jane liked your post</Text>
        </Item>
        <Item>
          <Icon><FaStar /></Icon>
          <Text>John commented on your photo</Text>
        </Item>
        {/* Add more recent activities as needed */}
      </div>

      <div>
        <SectionTitle>Upcoming Events</SectionTitle>
        <Item>
          <Icon><FaCalendarAlt /></Icon>
          <Text>Meetup with friends on Aug 20</Text>
        </Item>
        <Item>
          <Icon><FaCalendarAlt /></Icon>
          <Text>Webinar on Social Media Marketing</Text>
        </Item>
        {/* Add more upcoming events as needed */}
      </div>

      <div>
        <SectionTitle>Notifications</SectionTitle>
        <Item>
          <Icon><FaBell /></Icon>
          <Text>New message from Alice</Text>
        </Item>
        <Item>
          <Icon><FaBell /></Icon>
          <Text>New friend request from Bob</Text>
        </Item>
        {/* Add more notifications as needed */}
      </div>
    </SidebarContainer>
  );
};

export default RightSidebar;
