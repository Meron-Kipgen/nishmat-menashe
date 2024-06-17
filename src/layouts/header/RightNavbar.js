import React from "react";
import { IoNotifications } from "react-icons/io5";
import { FaUserCircle } from "react-icons/fa";
import styled from "styled-components";
import GoogleLogin from "../../components/GoogleLogin";

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
export default function RightNavbar() {
  return (
    <Container>
      <Button>
        <IoNotifications />

        <FaUserCircle />
      </Button>
    </Container>
  );
}
