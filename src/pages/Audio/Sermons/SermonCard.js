import React, { useState, useRef, useEffect } from "react";
import styled from "styled-components";
import TimeAgo from "../../../utils/TimeAgo";

import WarningDelete from "../../../components/WarningDelete";
import { useNavigate } from "react-router-dom";
import { DotHorizon } from "../../../Assets/Icons";
// Container for the card
const CardContainer = styled.div`
  display: flex;
  background: #fff;
  border-radius: 8px;
  width: 450px;
  height: 150px;
  margin: 10px;
  padding: 15px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  position: relative;
  @media (max-width: 768px) {
    width: 100%;
    margin: 10px 0;
  }
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
  h5 {
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
 background-color: #142b42;
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
  display: ${({ isOpen }) => (isOpen ? "flex" : "none")};
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

const MenuWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  &:hover {
    background: #d6d6d6;
    border-radius: 5px;
  }
`;
const SermonCard = ({
  title,
  category,
  subcategory,
  rabbi,
  played,
  id,
  thumbnail,
  createdAt,
  onEdit, // onEdit function passed as a prop
  onDelete, // onDelete function passed as a prop
}) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [showWarning, setShowWarning] = useState(false);

  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const handleClickOutside = event => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleClick = () => {
    navigate(`/Audio/Sermon/${id}`);
  };

  const handleDropdownToggle = () => {
    setIsDropdownOpen(prev => !prev);
  };

  const handleDelete = () => {
    setShowWarning(true);
  };

  const handleConfirmDelete = () => {
    onDelete(id); // Pass the audio ID to the onDelete function
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
            <DotHorizon height={30} width={30} />
            <DropdownContent isOpen={isDropdownOpen}>
              <MenuWrapper
                onClick={() => {
                  onEdit(id); // Pass the audio ID to the onEdit function
                  setIsDropdownOpen(false);
                }}
              >
                Edit
              </MenuWrapper>
              <MenuWrapper
                onClick={() => {
                  handleDelete();
                  setIsDropdownOpen(false);
                }}
              >
                Delete
              </MenuWrapper>
            </DropdownContent>
          </DropMenu>
          <h1>{title}</h1>
          <h5>
            {category} ⁃ {subcategory}
          </h5>
          <p>
            By: {rabbi} ⁃ <TimeAgo createdAt={createdAt} />
          </p>
        </Header>
        <FooterContainer>
          <FooterText>{played} Played ⁃ 33 Comments</FooterText>
          <PlayButton onClick={handleClick}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="icon icon-tabler icon-tabler-player-play"
            width="44"
            height="44"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="#ffffff"
            fill="#fff"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <path d="M7 4v16l13 -8z" />
          </svg>
          </PlayButton>
        </FooterContainer>
      </Content>

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

export default SermonCard;
