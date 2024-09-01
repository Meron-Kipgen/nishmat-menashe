import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { FaUser, FaInfoCircle, FaPodcast } from 'react-icons/fa'; 
import { GrArticle } from "react-icons/gr";
import Footer from '../../layouts/footer/Footer';
import { FcFeedback } from 'react-icons/fc';
import { MdAudiotrack } from 'react-icons/md';

const SidebarContainer = styled.section`
  width: 300px;
  height: 70vh;
  background: white;
  overflow-y: scroll;
  scrollbar-width: none;
  -ms-overflow-style: none;

  &::-webkit-scrollbar {
    display: none;
  }

`;

const SidebarNav = styled.nav`
  padding: 20px;
`;

const SidebarLink = styled(Link)`
  display: flex;
  align-items: center;
  margin-bottom: 15px;
  color: #333;
  text-decoration: none;
  font-size: 16px;
  font-weight: 500;
  padding: 10px 15px;
  border-radius: 5px;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #e2e6ea;
  }

  svg {
    margin-right: 10px;
  }
`;

const SidebarHeader = styled.h1`
  text-align: center;
  padding: 20px;
  font-size: 22px;
  @media (max-width: 768px) {
    margin-top: 45px;
    
  }
`;

const LeftSidebar = ({ toggleSidebar }) => (
  <>
    <SidebarContainer>
      <SidebarHeader>Application</SidebarHeader>
      <SidebarNav>
        <SidebarLink to="/Alon" onClick={toggleSidebar}>
          <GrArticle /> Nishmat Menashe Alon
        </SidebarLink>
        <SidebarLink to="/profile" onClick={toggleSidebar}>
          <FaUser /> Profile
        </SidebarLink>
        <SidebarLink to="/Audio/podcast" onClick={toggleSidebar}>
          <FaPodcast /> Audio Podcast
        </SidebarLink>
        <SidebarLink to="/Audio/Sermon" onClick={toggleSidebar}>
          <MdAudiotrack /> Audio Sermons
        </SidebarLink>
        <SidebarLink to="/" onClick={toggleSidebar}>
          <FaInfoCircle /> About
        </SidebarLink>
        <SidebarLink to="/feedback" onClick={toggleSidebar}>
          <FcFeedback /> Feedback
        </SidebarLink>
      </SidebarNav>
    </SidebarContainer>
    <Footer />
  </>
);

export default LeftSidebar;
