import React, { useState } from "react";
import styled from "styled-components";
import { useArticlesData } from "./useArticlesData";
import { useNavigate } from "react-router-dom";
import WarningDelete from "../../components/WarningDelete"; // Assuming WarningDelete component file path

const MenuContainerWrapper = styled.div`
  position: relative;
  background: #f0efef;
  width: 100%;
  padding: 5px 30px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Menu = styled.button`
  display: flex;
  align-items: center;
  gap: 5px;
  outline: none;
  border: none;
  padding: 5px;
  cursor: pointer;
  &:hover {
    border-radius: 30px;
    background-color: lightgray;
  }
`;

const Views = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
  padding: 5px;
`;

const ForUsers = styled.div`
  display: flex;
  gap: 30px;
`;

const ForAdmin = styled.div`
  display: flex;
  gap: 30px;
`;

const Menus = ({
  articleId,
  views,
  handleClose,
  increaseFont,
  decreaseFont,
  onShowUpdateForm,
handleShare
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
        <Menu onClick={handleClose}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="icon icon-tabler icon-tabler-chevron-left"
          >
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <path d="M15 6l-6 6l6 6" />
          </svg>
        </Menu>
        <Menu onClick={handleIncreaseFont}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="icon icon-tabler icon-tabler-text-increase"
          >
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <path d="M4 19v-10.5a3.5 3.5 0 1 1 7 0v10.5" />
            <path d="M4 13h7" />
            <path d="M18 9v6" />
            <path d="M21 12h-6" />
          </svg>
        </Menu>
        <Menu onClick={handleDecreaseFont}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="icon icon-tabler icon-tabler-text-decrease"
          >
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <path d="M4 19v-10.5a3.5 3.5 0 1 1 7 0v10.5" />
            <path d="M4 13h7" />
            <path d="M21 12h-6" />
          </svg>
        </Menu>
        <Menu>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="icon icon-tabler icon-tabler-bookmark"
          >
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <path d="M18 7v14l-6 -4l-6 4v-14a4 4 0 0 1 4 -4h4a4 4 0 0 1 4 4z" />
          </svg>
          Save
        </Menu>
        <Menu onClick={handleShare}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="icon icon-tabler icon-tabler-share"
          >
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <path d="M6 12m-3 0a3 3 0 1 0 6 0a3 3 0 1 0 -6 0" />
            <path d="M18 6m-3 0a3 3 0 1 0 6 0a3 3 0 1 0 -6 0" />
            <path d="M18 18m-3 0a3 3 0 1 0 6 0a3 3 0 1 0 -6 0" />
            <path d="M8.7 10.7l6.6 -3.4" />
            <path d="M8.7 13.3l6.6 3.4" />
          </svg>
          Share
        </Menu>
        <Views>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="icon icon-tabler icon-tabler-eye"
          >
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <path d="M10 12a2 2 0 1 0 4 0a2 2 0 0 0 -4 0" />
            <path d="M21 12c-2.4 4 -5.4 6 -9 6c-3.6 0 -6.6 -2 -9 -6c2.4 -4 5.4 -6 9 -6c3.6 0 6.6 2 9 6" />
          </svg>
          Views: {views}
        </Views>
      </ForUsers>
      <ForAdmin>
        <Menu onClick={handleShowUpdateForm}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="green"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="icon icon-tabler icon-tabler-edit"
          >
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <path d="M7 7h-1a2 2 0 0 0 -2 2v9a2 2 0 0 0 2 2h9a2 2 0 0 0 2 -2v-1" />
            <path d="M20.385 6.585a2.1 2.1 0 0 0 -2.97 -2.97l-8.415 8.385v3h3l8.385 -8.415z" />
            <path d="M16 5l3 3" />
          </svg>
        </Menu>
        <Menu onClick={handleDelete}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="red"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="icon icon-tabler icon-tabler-trash"
          >
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <path d="M4 7l16 0" />
            <path d="M10 11l0 6" />
            <path d="M14 11l0 6" />
            <path d="M5 7l1 12.056a2 2 0 0 0 1.995 1.944h8.01a2 2 0 0 0 1.995 -1.944l1 -12.056" />
            <path d="M18 7a2 2 0 0 0 -2 -2h-4a2 2 0 0 0 -2 2" />
          </svg>
        </Menu>
      </ForAdmin>
      {showWarning && (
        <WarningDelete
          message="Are you sure you want to delete this article?"
          onConfirm={handleConfirmDelete}
          onCancel={handleCancelDelete}
        />
      )}
    </MenuContainerWrapper>
  );
};

export default Menus;
