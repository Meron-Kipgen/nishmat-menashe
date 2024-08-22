import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { FaUser, FaInfoCircle, FaPodcast } from 'react-icons/fa'; 
import { GrArticle } from "react-icons/gr";
import Footer from '../../layouts/footer/Footer';

const SidebarContainer = styled.section`
  width: 300px;
  height: 50vh;
 background: white;
 
  overflow: hidden;
  @media (max-width: 768px) {
    width: 100%;
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
`;

const SidebarLeft = () => (
  <div>
    <SidebarContainer>
      <SidebarHeader>Application</SidebarHeader>
      <SidebarNav>
        <SidebarLink to="/Alon">
        <GrArticle /> Nishmat Menashe Alon
        </SidebarLink>
        <SidebarLink to="/profile">
          <FaUser /> Profile
        </SidebarLink>
        <SidebarLink to="/Audio/podcast">
          <FaPodcast /> Audio Podcast
        </SidebarLink>
        <SidebarLink to="/about">
          <FaInfoCircle /> About
        </SidebarLink>
      </SidebarNav>
    </SidebarContainer>
    <Footer />
  </div>
);

export default SidebarLeft;
