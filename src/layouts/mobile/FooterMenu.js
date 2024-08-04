import styled from "styled-components";
import NavMenu from "../header/NavMenu";

const Container = styled.footer`
  background: #04252F;
  position: fixed;
  bottom: 0;
  width: 100%;
  height: 50px;
  padding-top: 5px;
  z-index: 999;
`;

export default function FooterMenu() {
  return (
    <Container>
      <NavMenu />
    </Container>
  );
}
