import React, { useEffect } from 'react';
import styled from 'styled-components';
import TimeAgo from '../../utils/TimeAgo';

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9898;
`;

const ModalContainer = styled.div`
  background: #fff;
  border-radius: 8px;
  width: 400px;
  padding: 20px;
  position: relative;
`;

const CloseButton = styled.div`
  position: absolute;
  top: 10px;
  right: 10px;
  background: #e74c3c; /* Red background */
  border-radius: 50%; /* Circular button */
  width: 30px;
  height: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  transition: background 0.3s ease;
  
  &:hover {
    background: #c0392b; /* Darker red on hover */
  }

  svg {
    stroke: #fff; /* White color for the icon */
  }
`;

const Thumbnail = styled.img`
  width: 100%;
  height: auto;
  border-radius: 8px;
`;

const Details = styled.div`
  margin-top: 10px;
  p {
    margin: 5px 0;
  }
`;

const AudioProperties = ({ title, category, subcategory, fileUrl, played, createdAt, thumbnail, onClose }) => {
  
  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    
    window.addEventListener('keydown', handleEscape);
    return () => {
      window.removeEventListener('keydown', handleEscape);
    };
  }, [onClose]);

  return (
    <ModalOverlay onClick={handleOverlayClick}>
      <ModalContainer>
        <CloseButton onClick={onClose}>
          <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-x" width="24" height="24" viewBox="0 0 24 24" strokeWidth="2" stroke="#ffffff" fill="none" strokeLinecap="round" strokeLinejoin="round">
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <path d="M18 6l-12 12" />
            <path d="M6 6l12 12" />
          </svg>
        </CloseButton>
        <Thumbnail src={thumbnail} alt={`${title} thumbnail`} />
        <Details>
          <p><strong>Title:</strong> {title}</p>
          <p><strong>Category:</strong> {category}</p>
          <p><strong>Subcategory:</strong> {subcategory}</p>
          <p><strong>Played:</strong> {played} times</p>
          <p><strong>Created At:</strong> <TimeAgo createdAt={createdAt} /></p>
        </Details>
      </ModalContainer>
    </ModalOverlay>
  );
};

export default AudioProperties;
