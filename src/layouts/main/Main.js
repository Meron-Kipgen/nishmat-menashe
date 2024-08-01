import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Outlet } from "react-router-dom";
import styled from "styled-components";

const Wrapper = styled.section`

`;

export default function Main() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <Wrapper>
      <Outlet />
    </Wrapper>
  );
}
