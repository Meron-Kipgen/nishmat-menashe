import React from "react";
import styled from "styled-components";



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
  img {
    height: 45px;
    cursor: pointer;
  }
`;





const RightNavbar = () => {



  return (
    <Container>
      <Button>
        <img src="/icons/bell.svg" alt="bell" />
        <img src="/icons/user.svg" alt="user" />
      </Button>

    </Container>
  );
};

export default RightNavbar;
