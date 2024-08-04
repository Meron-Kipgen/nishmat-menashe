import React, { useState } from "react";
import styled from "styled-components";
import Profile from "../../Features/User/User";

const Container = styled.div`
  margin-right: 30px;
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
        <Notification>
        <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-bell-filled" width="30" height="30" viewBox="0 0 24 24" stroke-width="1.5" stroke="#00bfd8" fill="none" stroke-linecap="round" stroke-linejoin="round">
  <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
  <path d="M14.235 19c.865 0 1.322 1.024 .745 1.668a3.992 3.992 0 0 1 -2.98 1.332a3.992 3.992 0 0 1 -2.98 -1.332c-.552 -.616 -.158 -1.579 .634 -1.661l.11 -.006h4.471z" stroke-width="0" fill="currentColor" />
  <path d="M12 2c1.358 0 2.506 .903 2.875 2.141l.046 .171l.008 .043a8.013 8.013 0 0 1 4.024 6.069l.028 .287l.019 .289v2.931l.021 .136a3 3 0 0 0 1.143 1.847l.167 .117l.162 .099c.86 .487 .56 1.766 -.377 1.864l-.116 .006h-16c-1.028 0 -1.387 -1.364 -.493 -1.87a3 3 0 0 0 1.472 -2.063l.021 -.143l.001 -2.97a8 8 0 0 1 3.821 -6.454l.248 -.146l.01 -.043a3.003 3.003 0 0 1 2.562 -2.29l.182 -.017l.176 -.004z" stroke-width="0" fill="currentColor" />
</svg>
        </Notification>
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
