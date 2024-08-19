import React from 'react';
import styled, { keyframes } from 'styled-components';

const fadeInUp = keyframes`
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const TeamContainer = styled.section`
  padding: 50px 20px;
  background-color: #fff;
  text-align: center;

  @media (max-width: 768px) {
    padding: 40px 15px;
  }

  @media (max-width: 480px) {
    padding: 30px 10px;
  }
`;

const TeamTitle = styled.h2`
  font-size: 2.5em;
  margin-bottom: 20px;

  @media (max-width: 768px) {
    font-size: 2em;
  }

  @media (max-width: 480px) {
    font-size: 1.75em;
  }
`;

const TeamMembers = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
`;

const Member = styled.div`
  flex: 0 1 30%;
  margin: 20px;
  padding: 0;
  border: 1px solid #ddd;
  border-radius: 10px;
  background-color: #fff;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s, box-shadow 0.3s;
  animation: ${fadeInUp} 0.5s ease-out;

  &:hover {
    transform: translateY(-10px);
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
  }

  @media (max-width: 768px) {
    flex: 0 1 45%;
  }

  @media (max-width: 480px) {
    flex: 0 1 100%;
  }
`;

const MemberImage = styled.img`
  width: 100%;
  height: 200px;
  object-fit: cover;
  border-radius: 10px 10px 0 0;

  @media (max-width: 768px) {
    height: 150px;
  }

  @media (max-width: 480px) {
    height: 120px;
  }
`;

const MemberContent = styled.div`
  padding: 10px;
`;

const MemberName = styled.h3`
  color: #333;
  font-size: 1.25em;

  @media (max-width: 768px) {
    font-size: 1.1em;
  }

  @media (max-width: 480px) {
    font-size: 1em;
  }
`;

const MemberPosition = styled.p`
  color: #777;
  font-size: 1em;

  @media (max-width: 768px) {
    font-size: 0.9em;
  }

  @media (max-width: 480px) {
    font-size: 0.8em;
  }
`;

function OurTeam() {
  return (
    <TeamContainer>
      <TeamTitle>Our Team</TeamTitle>
      <TeamMembers>
        <Member>
          <MemberImage src="https://via.placeholder.com/300" alt="Team Member 1" />
          <MemberContent>
            <MemberName>John Doe</MemberName>
            <MemberPosition>CEO</MemberPosition>
          </MemberContent>
        </Member>
        <Member>
          <MemberImage src="https://via.placeholder.com/300" alt="Team Member 2" />
          <MemberContent>
            <MemberName>Jane Smith</MemberName>
            <MemberPosition>CTO</MemberPosition>
          </MemberContent>
        </Member>
        <Member>
          <MemberImage src="https://via.placeholder.com/300" alt="Team Member 3" />
          <MemberContent>
            <MemberName>Mike Johnson</MemberName>
            <MemberPosition>CFO</MemberPosition>
          </MemberContent>
        </Member>
      </TeamMembers>
    </TeamContainer>
  );
}

export default OurTeam;
