import React from "react";
import styled from "styled-components";

const WarningDeleteBackground = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 989999;
`;

const WarningDeleteContainer = styled.div`
  background-color: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  width: 300px;
`;

const WarningDeleteHeader = styled.h3`
  margin-top: 0;
`;

const ButtonGroup = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 20px;
`;

const Button = styled.button`
  padding: 8px 16px;
  margin-right: 10px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background-color: #0056b3;
  }
`;

const CancelButton = styled(Button)`
  background-color: #6c757d;

  &:hover {
    background-color: #5a6268;
  }
`;

const WarningDelete = ({ message, onConfirm, onCancel }) => {
  return (
    <WarningDeleteBackground>
      <WarningDeleteContainer>
        <WarningDeleteHeader>{message}</WarningDeleteHeader>
        <ButtonGroup>
          <Button onClick={onConfirm}>Confirm</Button>
          <CancelButton onClick={onCancel}>Cancel</CancelButton>
        </ButtonGroup>
      </WarningDeleteContainer>
    </WarningDeleteBackground>
  );
};

export default WarningDelete;
