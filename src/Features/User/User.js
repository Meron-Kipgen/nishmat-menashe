import React from 'react';
import styled from 'styled-components';

const Container = styled.section`
  position: absolute;
  top: 100%; /* Adjust position relative to parent */
  right: 0;
  background-color: white;
  border-radius: 8px;
  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.1);
  padding: 16px;
  z-index: 1000;
  width: 200px;
  border: 1px solid #e0e0e0;
`;

const MenuItem = styled.p`
  margin: 8px 0;
  padding: 8px;
  border-radius: 4px;
  font-size: 14px;
  color: #333;
  cursor: pointer;
  transition: background-color 0.3s ease, color 0.3s ease;

  &:hover {
    background-color: #f0f0f0;
    color: #4A6E71; /* Complementary hover color */
  }
`;

export default function User() {
  return (
    <Container>
      <MenuItem>Username</MenuItem>
      <MenuItem>Edit Profile</MenuItem>
      <MenuItem>Video Save</MenuItem>
      <MenuItem>Logout</MenuItem>
    </Container>
  );
}
