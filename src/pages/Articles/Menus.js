import React, { useState } from "react";
import styled from "styled-components";
import { useArticlesData } from "./useArticlesData";
import { useNavigate } from "react-router-dom";
import WarningDelete from "../../components/WarningDelete"; // Assuming WarningDelete component file path

const MenuContainerWrapper = styled.div`
  position: relative;
  background: #f0efef;
  width: 100%;
  padding: 10px 20px; /* Adjusted padding for better spacing on mobile */
  display: flex;
  flex-direction: column; /* Stack elements vertically on mobile */
  align-items: flex-start;

  @media (min-width: 769px) {
   width: 100%;
    flex-direction: row; /* Default row layout on larger screens */
    justify-content: space-between;
    padding: 5px 30px;
  }
`;

const Menu = styled.button`
  display: flex;
  align-items: center;
  gap: 8px;
  outline: none;
  border: none;
  padding: 8px;
  cursor: pointer;
  font-size: 14px;
  background: none;

  &:hover {
    border-radius: 30px;
    background-color: lightgray;
  }

  svg {
    width: 20px;
    height: 20px;
  }

  @media (min-width: 769px) {
    svg {
      width: 24px;
      height: 24px;
    }
  }
  &.hide-on-mobile {
    @media (max-width: 768px) {
      display: none;
    }
  }
`;


const ForUsers = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 100%;

  @media (min-width: 769px) {
    flex-direction: row;
    gap: 30px;
  }
`;

const ForAdmin = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 100%;

  @media (min-width: 769px) {
    flex-direction: row;
    gap: 30px;
  }
`;

const Menus = ({
  articleId,
  handleBack,
  increaseFont,
  decreaseFont,
  onShowUpdateForm,

}) => {
  const { deleteArticle } = useArticlesData();
  const navigate = useNavigate();
  const [showWarning, setShowWarning] = useState(false);

  const handleDelete = async () => {
    setShowWarning(true);
  };

  const handleConfirmDelete = async () => {
    try {
      await deleteArticle(articleId);
      navigate(-1);
    } catch (err) {
      console.error("Error deleting article:", err);
    }
    setShowWarning(false);
  };

  const handleCancelDelete = () => {
    setShowWarning(false);
  };

  const handleIncreaseFont = () => {
    if (increaseFont) {
      increaseFont();
    }
  };

  const handleDecreaseFont = () => {
    if (decreaseFont) {
      decreaseFont();
    }
  };

  const handleShowUpdateForm = () => {
    if (onShowUpdateForm) {
      onShowUpdateForm();
    }
  };

  return (
    <MenuContainerWrapper>
      <ForUsers>
        <Menu onClick={handleBack} className="hide-on-mobile">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M15 6l-6 6l6 6" />
          </svg>
          Back
        </Menu>
        <Menu onClick={handleIncreaseFont}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M4 19v-10.5a3.5 3.5 0 1 1 7 0v10.5" />
            <path d="M4 13h7" />
            <path d="M18 9v6" />
            <path d="M21 12h-6" />
          </svg>
         
        </Menu>
        <Menu onClick={handleDecreaseFont}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M4 19v-10.5a3.5 3.5 0 1 1 7 0v10.5" />
            <path d="M4 13h7" />
            <path d="M21 12h-6" />
          </svg>
         
        </Menu>
        <Menu>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M18 7v14l-6 -4l-6 4v-14a4 4 0 0 1 4 -4h4a4 4 0 0 1 4 4z" />
          </svg>
          Save
        </Menu>
        <Menu >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M6 12m-3 0a3 3 0 1 0 6 0a3 3 0 1 0 -6 0" />
            <path d="M18 6m-3 0a3 3 0 1 0 6 0a3 3 0 1 0 -6 0" />
            <path d="M18 18m-3 0a3 3 0 1 0 6 0a3 3 0 1 0 -6 0" />
            <path d="M8.7 10.7l6.6 -3.4" />
            <path d="M8.7 13.3l6.6 3.4" />
          </svg>
          Share
        </Menu>
        
      </ForUsers>
      <ForAdmin>
        <Menu onClick={handleShowUpdateForm}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="green"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M7 7h-1a2 2 0 0 0 -2 2v9a2 2 0 0 0 2 2h9a2 2 0 0 0 2 -2v-1" />
            <path d="M14 8v3" />
            <path d="M17 8v3" />
          </svg>
          Edit
        </Menu>
        <Menu onClick={handleDelete}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="red"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M4 7h16" />
            <path d="M10 11v6" />
            <path d="M14 11v6" />
            <path d="M5 6h14a1 1 0 0 1 1 1v1h-16v-1a1 1 0 0 1 1 -1" />
            <path d="M6 6v14a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2v-14" />
          </svg>
          Delete
        </Menu>
      </ForAdmin>
      {showWarning && (
        <WarningDelete
          onConfirm={handleConfirmDelete}
          onCancel={handleCancelDelete}
        />
      )}
    </MenuContainerWrapper>
  );
};

export default Menus;
