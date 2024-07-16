import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  width: 140px;
  align-items: center;
  justify-content: center;
  gap: 10px;
  font-size: 15px;
  background: #06a40c;
  border-radius: 30px;
  height: 30px;
  padding: 5px 10px;
  cursor: pointer;
  color: white;
`;

const ExploreBtn = ({ onClick }) => (
  <Container onClick={onClick}>
  <svg  xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  fill="currentColor"  class="icon icon-tabler icons-tabler-filled icon-tabler-circle-plus"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M4.929 4.929a10 10 0 1 1 14.141 14.141a10 10 0 0 1 -14.14 -14.14zm8.071 4.071a1 1 0 1 0 -2 0v2h-2a1 1 0 1 0 0 2h2v2a1 1 0 1 0 2 0v-2h2a1 1 0 1 0 0 -2h-2v-2z" /></svg>
    <span>Add New</span>
  </Container>
);

export default ExploreBtn;
