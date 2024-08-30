import React from 'react';
import styled from 'styled-components';
import { FaUsers, FaBell, FaCalendarAlt, FaHashtag, FaStar } from 'react-icons/fa';

const SidebarContainer = styled.div`
background: white;
  display: flex;
  flex-direction: column;
  gap: 20px;
  @media (max-width: 768px) {
    margin: 45px 0;
    
  }
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

const RightSidebar = (toggleRightSidebar) => {
  return (
    <SidebarContainer>
      <div>
        <SectionTitle>Upcoming Events</SectionTitle>
        <Item>
          <Icon><FaCalendarAlt /></Icon>
          <Text>khagim</Text>
        </Item>
        <Item>
          <Icon><FaCalendarAlt /></Icon>
          <Text>khagim</Text>
        </Item>
        <Item>
          <Icon><FaCalendarAlt /></Icon>
          <Text>khagim</Text>
        </Item>
      </div>

      <div>
        <SectionTitle>Related Topics</SectionTitle>
        <Item>
          <Icon><FaHashtag /></Icon>
          <Text>#khagim one</Text>
        </Item>
        <Item>
          <Icon><FaHashtag /></Icon>
          <Text>#khagim two</Text>
        </Item>
        <Item>
          <Icon><FaHashtag /></Icon>
          <Text>#khagim three</Text>
        </Item>
        <Item>
          <Icon><FaHashtag /></Icon>
          <Text>#khagim two</Text>
        </Item>
        <Item>
          <Icon><FaHashtag /></Icon>
          <Text>#khagim two</Text>
        </Item>
      </div>

      <div>
        <SectionTitle>Members</SectionTitle>
        <Item>
          <Icon><FaStar /></Icon>
          <Text>total: 12</Text>
        </Item>
        <Item>
          <Icon><FaStar /></Icon>
          <Text>online: 9</Text>
        </Item>
        {/* Add more recent activities as needed */}
      </div>

      
      <div>
        <SectionTitle>updates</SectionTitle>
        <Item>
          <Icon><FaBell /></Icon>
          <Text> version beta v1.20</Text>
          <p>bug fix </p>
        </Item>
        <Item>
          <Icon><FaBell /></Icon>
          <Text>version beta v1.00</Text>
          <p>bug fix </p>
        </Item>
        {/* Add more notifications as needed */}
      </div>
    </SidebarContainer>
  );
};

export default RightSidebar;
