import styled from "styled-components";

const Wrapper = styled.section`
  width: 350px;
  background: white;
  border-radius: 10px;
  box-shadow: rgba(0, 0, 0, 0.05) 0px 0px 0px 1px;
`;
export default function RightSidebar() {
  return (
    <Wrapper>
      {" "}
      <ul>
        <li>one</li>
        <li>one</li>
        <li>one</li>
        <li>one</li>
        <li>one</li>
        <li>one</li>
        <li>one</li>
        <li>one</li>
        <li>one</li>
        <li>one</li>
        <li>one</li>
      </ul>
    </Wrapper>
  );
}
