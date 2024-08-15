import React from 'react';
import styled from 'styled-components';
import ProfileAvatar from './ProfileAvatar';

const Container = styled.section`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const Mainsection = styled.section`
  display: flex;
  flex-direction: row;
  gap: 40px;
  margin: 90px 0;
`;

const Leftside = styled.div`
  width: 20%;
  background: #f4f4f4;
  padding: 20px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const MiddleSection = styled.div`
  flex: 1;
  background: #fff;
  padding: 20px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const Rightside = styled.div`
  width: 25%;
  background: #f4f4f4;
  padding: 20px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

export default function Profile() {
  return (
    <Container>
      <ProfileAvatar/>
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
    </Container>
  );
}
