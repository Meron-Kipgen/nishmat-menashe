import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { FaCalendarAlt, FaHashtag, FaStar, FaBell } from 'react-icons/fa';
import Khagim from '../../Features/Events/Khagim';

const SidebarContainer = styled.div`
  background: white;
  display: flex;
  flex-direction: column;
  gap: 20px;
  height: 100vh; /* Adjust the height as needed */
  overflow-y: auto; /* Enable vertical scrolling */
  
  /* Hide scrollbar for WebKit browsers */
  &::-webkit-scrollbar {
    display: none;
  }
  
  /* Hide scrollbar for other browsers */
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
  
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

const RightSidebar = () => {
 

  return (
    <SidebarContainer>
      <div>
       <Khagim/>
      </div>

      

    </SidebarContainer>
  );
};

export default RightSidebar;
