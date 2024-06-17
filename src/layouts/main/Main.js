import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Outlet } from "react-router-dom";
import styled from "styled-components";

const Wrapper = styled.section`
padding: 10px 0;
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
