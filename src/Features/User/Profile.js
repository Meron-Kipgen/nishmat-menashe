import React, { useContext } from "react";
import styled from "styled-components";
import ProfileAvatar from "./ProfileAvatar";
import { UserContext } from "../../contexts/UserContext";
import GoogleLogin from "./GoogleLogin";

const Container = styled.section`
  display: flex;
  flex-direction: column;
  gap: 20px;
  margin: 45px 0;
  padding: 0 20px;

  @media (max-width: 768px) {
    padding: 0 10px;
  }
`;

const Mainsection = styled.section`
  display: flex;
  flex-direction: row;
  gap: 20px;
  margin: 90px 0;

  @media (max-width: 768px) {
    flex-direction: column;
    margin: 45px 0;
  }
`;

const Leftside = styled.div`
  width: 20%;
  background: #f4f4f4;
  padding: 20px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

  @media (max-width: 768px) {
    width: 100%;
    box-shadow: none;
    padding: 10px;
  }
`;

const MiddleSection = styled.div`
  flex: 1;
  background: #fff;
  padding: 20px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

  @media (max-width: 768px) {
    padding: 15px;
  }
`;

const Rightside = styled.div`
  width: 25%;
  background: #f4f4f4;
  padding: 20px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

  @media (max-width: 768px) {
    width: 100%;
    box-shadow: none;
    padding: 10px;
  }
`;

export default function Profile() {
  const { isLogin } = useContext(UserContext);
  return (
    <Container>
      {isLogin ? (
        <>
          <ProfileAvatar />
          <Mainsection>
            <Leftside>
              <h3>Menu</h3>
              {/* Add menu items here */}
            </Leftside>
            <MiddleSection>
              <h3>User Activity</h3>
              {/* Display user activities here */}
            </MiddleSection>
            <Rightside>
              <h3>Ads</h3>
              {/* Add ads here */}
            </Rightside>
          </Mainsection>
        </>
      ) : (
        <GoogleLogin />
      )}
    </Container>
  );
}
