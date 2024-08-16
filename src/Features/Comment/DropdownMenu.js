import React from 'react';
import styled from 'styled-components';
import { EditIcon, DeleteIcon } from '../../Assets/Icons';
const DropdownMenuContainer = styled.div`
  display: flex;
  flex-direction: column;
  position: absolute;
  top: 0; 
  right: 10px;
  background: white;
  border: 1px solid #ddd;
  border-radius: 4px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
  z-index: 900;

  button {
    display: flex;
    align-items: center;
    gap: 20px;
    width: 100%;
    padding: 10px;
    border: none;
    background: transparent;
    text-align: left;
    cursor: pointer;

    &:hover {
      background-color: #f0f0f0;
    }
  }
`;

const DropdownMenu = ({ onEditClick, onDeleteClick }) => (
  <DropdownMenuContainer>
    <button onClick={onEditClick}>
              <EditIcon /> Edit
            </button>
            <button onClick={onDeleteClick}>
              <DeleteIcon /> Delete
            </button>
  </DropdownMenuContainer>
);

export default DropdownMenu;
