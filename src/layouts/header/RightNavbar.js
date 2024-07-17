import React, { useState } from "react";
import styled from "styled-components";
import UserProfile from "../../components/UserProfile";

const Container = styled.div`
  margin-right: 30px;
`;

const Button = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 20px;
  font-size: 2rem;
  color: #df154d;
`;

const Notification = styled.div`
  img {
    height: 30px;
  }
`;

const User = styled.div`
  img {
    height: 30px;
    cursor: pointer;
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
          <img src="/icons/bell.svg" alt="bell" />
        </Notification>
        <User onClick={handleProfile}>
          <img src="/icons/user.svg" alt="user" />
        </User>
      </Button>

      {profileVisible && <UserProfile/>}
    </Container>
  );
};

export default RightNavbar;
