import styled from "styled-components";

const Container = styled.footer`
  height: auto;
  display: flex;
  flex-direction: column;
  align-items: center;

  color: #000;
  font-size: 1rem;
  z-index: 1;
  padding: 20px;
  @media (max-width: 768px) {
    background: #142B42;
    color: white;
  }
`;

const LinksContainer = styled.div`  
display: flex;
margin-top: 30px;
justify-content: space-between;
gap: 30px;
`
const Link = styled.a`
  color: #000;
font-size: 0.8rem;
  text-decoration: none;
  transition: color 0.3s ease;
  @media (max-width: 768px) {
    color: white;
  }
  &:hover {
    color: #00ffff;
  }

  @media (max-width: 768px) {
    margin: 10px 0;
  }
`;

export default function Footer() {
  return (
    <Container>
      <p>Nishmat Menashe</p> 
      <p>© All rights reserved</p>
      <LinksContainer>     
        <Link href="/privacy-policy">Privacy Policy</Link>
        <Link href="/terms-and-conditions">Terms and Conditions</Link>
      </LinksContainer>
 
    </Container>
  );
}
