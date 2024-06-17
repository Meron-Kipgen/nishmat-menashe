import styled from "styled-components";

const Container = styled.footer`
height: 40px;

background-color: rgba(0, 0, 0, 0.1);
backdrop-filter: blur(50px);
@media (max-width: 768px) {
  margin-bottom: 50px;
}
`

export default function Footer() {
  return <Container>Footer</Container>;
}
