import React, { useState } from "react";
import styled from "styled-components";
import Profile from "../../Features/User/User";

const Container = styled.div`
  margin-right: 100px;
  margin-top: 10px;
`;

const Button = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 20px;
  font-size: 2rem;
  color: white;
`;

const Notification = styled.div`
  svg {
    height: 30px;
    cursor: pointer;
  }
  &.active,
  &:hover {
    color: #4A6E71;
  }
`;

const User = styled.div`
  svg {
    height: 30px;
    cursor: pointer;
  }
  &.active,
  &:hover {
    color: #4A6E71;
  }
`;

const RightNavbar = () => {
  const [profileVisible, setProfileVisible] = useState(false);

  const handleProfile = () => {
    setProfileVisible(!profileVisible);
  };

  return (
    <Container>
      <Button>
       
        <User onClick={handleProfile}>
        <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-user-filled" width="30" height="30" viewBox="0 0 24 24" stroke-width="1.5" stroke="#00bfd8" fill="none" stroke-linecap="round" stroke-linejoin="round">
  <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
  <path d="M12 2a5 5 0 1 1 -5 5l.005 -.217a5 5 0 0 1 4.995 -4.783z" stroke-width="0" fill="currentColor" />
  <path d="M14 14a5 5 0 0 1 5 5v1a2 2 0 0 1 -2 2h-10a2 2 0 0 1 -2 -2v-1a5 5 0 0 1 5 -5h4z" stroke-width="0" fill="currentColor" />
</svg>
        </User>
      </Button>

      {profileVisible && <Profile/>}
    </Container>
  );
};

export default RightNavbar;
