import styled from "styled-components";

const Container = styled.section`
  height: 60px;
  background: white;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 10px;
`;
const Comment = styled.div`
  border-radius: 20px;
  background: grey;
  height: 30px;
  width: 90%;
  color: black;
`;

export default function MobileCommentsBtn() {
  return (
    <Container>
      <Comment>
        <img src="#"></img> nice video i will keep comming back
      </Comment>
    </Container>
  );
}
