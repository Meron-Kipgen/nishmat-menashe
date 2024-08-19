import React, { useState, useRef, useEffect} from 'react';
import styled from 'styled-components';
import TimeAgo from '../../utils/TimeAgo';
import AudioProperties from './AudioProperties';
import WarningDelete from '../../components/WarningDelete';
// Container for the card
const CardContainer = styled.div`
  display: flex;
  background: #fff;
  border-radius: 8px;
  width: 400px;
  height: 150px;
  margin: 10px;
  padding: 15px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  position: relative;
`;

const Thumbnail = styled.div`
  width: 120px;
  height: 120px;
  background: #ddd;
  border-radius: 8px;
  overflow: hidden;
  margin-right: 10px;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const Content = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const Header = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;

  h1 {
    font-size: 16px;
    color: #333;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: normal;
    width: 250px;
  }
  h5{
    padding-top: 5px;
    display: -webkit-box;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: normal;
    width: 250px;
  }
  p {
    margin-top: 10px;
    color: #666;
    font-size: 12px;
    
  }
`;

const FooterContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const FooterText = styled.div`
  font-size: 0.8rem;
`;

const PlayButton = styled.div`
  position: absolute;
  display: flex;
  top: 80px;
  right: 20px;
  align-items: center;
  justify-content: center;
  width: 50px;
  height: 50px;
  border: 1px solid #142b42;
  border-radius: 50%;
  color: #142b42;
  cursor: pointer;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  transition: background 0.3s, transform 0.3s;

  &:hover {
    transform: scale(1.1);
  }

  svg {
    width: 24px;
    height: 24px;
  }
`;

const DropMenu = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  cursor: pointer;
  display: flex;
  border-radius: 50%;
  margin-top: -10px;
  margin-right: -10px;
`;

const DropdownContent = styled.div`
  display: ${({ isOpen }) => (isOpen ? 'flex' : 'none')};
  flex-direction: column;
  background: #fff;
  border: 1px solid #ddd;
  border-radius: 4px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  position: absolute;
  top: 35px;
  right: 0;
  width: 120px;
  z-index: 1000;
  padding: 10px;
`;

const MenuButton = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 30px;
  width: 30px;
  border-radius: 50%;
  cursor: pointer;
  &:hover {
    background: #D6D6D6;
    border-radius: 50%;
  }
  svg {
    pointer-events: none;
  }
`;
const MenuWrapper = styled.div`
display: flex;
align-items: center;
gap: 10px;
&:hover {
    background: #D6D6D6;
    border-radius: 5px;
  }
`
const Card = ({ title, category, subcategory, rabbi, played, audioUrl, onPlay, thumbnail, createdAt, onEdit, onDelete }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showWarning, setShowWarning] = useState(false);

  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);
  const handleDropdownToggle = () => {
    setIsDropdownOpen((prev) => !prev);
  };

  const handleShowDetails = () => {
    setIsModalOpen(true);
  };

  const handleCloseDetails = () => {
    setIsModalOpen(false);
  };
  const handleDelete = () => {
    setShowWarning(true);
  };
  
  const handleConfirmDelete = () => {
    onDelete();
    setShowWarning(false);
  };
  
  const handleCancelDelete = () => {
    setShowWarning(false);
  };
  

  return (
    <CardContainer>
      <Thumbnail>
        <img src={thumbnail} alt={`${title} thumbnail`} />
      </Thumbnail>
      <Content>
        <Header>
          <DropMenu ref={dropdownRef} onClick={handleDropdownToggle}>
            <MenuButton>
              <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-dots-vertical" width="35" height="35" viewBox="0 0 24 24" strokeWidth="1.5" stroke="#000000" fill="none" strokeLinecap="round" strokeLinejoin="round">
                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                <path d="M12 16l0 -1" />
                <path d="M12 12l0 -1" />
                <path d="M12 8l0 -1" />
              </svg>
            </MenuButton>
            <DropdownContent isOpen={isDropdownOpen}>
              <MenuWrapper onClick={() => { onEdit(); setIsDropdownOpen(false); }}>
              <MenuButton >
                <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-pencil" width="20" height="20" viewBox="0 0 24 24" strokeWidth="1.5" stroke="#000000" fill="none" strokeLinecap="round" strokeLinejoin="round">
                  <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                  <path d="M16 3l4 4l-11 11h-4v-4z" />
                  <path d="M13.5 6.5l4 4" />
                </svg>
                
              </MenuButton>Edit</MenuWrapper>
              <MenuWrapper onClick={() => { handleDelete(); setIsDropdownOpen(false); }}>
              <MenuButton >
                <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-trash" width="20" height="20" viewBox="0 0 24 24" strokeWidth="1.5" stroke="#000000" fill="none" strokeLinecap="round" strokeLinejoin="round">
                  <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                  <path d="M4 7l16 0" />
                  <path d="M10 11l0 6" />
                  <path d="M14 11l0 6" />
                  <path d="M5 7l1 -1a2 2 0 0 1 1.5 -.5l10 0a2 2 0 0 1 1.5 .5l1 1" />
                  <path d="M10 7l0 -2a2 2 0 0 1 4 0l0 2" />
                </svg>
              </MenuButton>Delete</MenuWrapper>

              <MenuWrapper onClick={() => { handleShowDetails(); setIsDropdownOpen(false); }}>
                <MenuButton>
                  <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-info-circle" width="20" height="20" viewBox="0 0 24 24" strokeWidth="1.5" stroke="#000000" fill="none" strokeLinecap="round" strokeLinejoin="round">
                    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                    <path d="M12 9l0 .01" />
                    <path d="M12 12l0 4" />
                    <path d="M3 12a9 9 0 1 1 18 0a9 9 0 0 1 -18 0" />
                  </svg>
                </MenuButton>Details</MenuWrapper>
            </DropdownContent>
          </DropMenu>
          <h1>{title}</h1>
          <h5>{category} ⁃ {subcategory}</h5>
          <p>By: {rabbi} ⁃ <TimeAgo createdAt={createdAt} /></p>
        </Header>
        <FooterContainer>
          <FooterText>{played} Played ⁃ 33 Comments</FooterText>
          <PlayButton onClick={() => onPlay(audioUrl)}>
            <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-player-play-filled" viewBox="0 0 24 24" strokeWidth="1.5" stroke="#ffffff" fill="none" strokeLinecap="round" strokeLinejoin="round">
              <path stroke="none" d="M0 0h24v24H0z" fill="none" />
              <path d="M6 4v16a1 1 0 0 0 1.524 .852l13 -8a1 1 0 0 0 0 -1.704l-13 -8a1 1 0 0 0 -1.524 .852z" strokeWidth="0" fill="currentColor" />
            </svg>
          </PlayButton>
        </FooterContainer>
      </Content>
    
      {isModalOpen && (
          <AudioProperties
            title={title}
            category={category}
            subcategory={subcategory}
            played={played}
            createdAt={createdAt}
            thumbnail={thumbnail}
            onClose={handleCloseDetails}
          />
        )}
        {showWarning && (
        <WarningDelete
          message="Are you sure you want to delete this Audio?"
          onConfirm={handleConfirmDelete}
          onCancel={handleCancelDelete}
        />
      )}
    </CardContainer>
  );
};

export default Card;
