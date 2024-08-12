import styled from "styled-components";

const Container = styled.footer`
  height: 80px;
  margin-top: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  background:  #142B42;
  color: #ffffff;
  font-size: 1.2rem;
  position: relative;
  overflow: hidden;
  z-index: 1;

  @media (max-width: 768px) {
    height: auto;
    padding: 20px;
  }
`;

const Content = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 80%;
  max-width: 1200px;
  position: relative;
  z-index: 2;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
  }
`;

const FooterText = styled.p`
  margin: 0;
`;

const Link = styled.a`
  color: #ffffff;
  text-decoration: none;
  margin-left: 20px;
  transition: color 0.3s ease;

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
      <Content>
        <FooterText>© 2024 Nishmat Menashe. All rights reserved.</FooterText>
        <div>
          <Link href="/privacy-policy">Privacy Policy</Link>
          <Link href="/terms-and-conditions">Terms and Conditions</Link>
        </div>
      </Content>
      
    </Container>
  );
}
