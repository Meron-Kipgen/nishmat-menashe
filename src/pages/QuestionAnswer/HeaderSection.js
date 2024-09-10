import React from "react";
import Avatar from "../../Features/User/Avatar";
import TimeAgo from "../../utils/TimeAgo";
import styled from "styled-components";
import BackButton from "../../components/BackButton";

const HeaderContainer = styled.section`
  display: flex;
  align-items: center;
  gap: 20px;
  margin-bottom: 20px;
  margin-top: 10px;
  width: 100%;

  p {
    font-size: 1rem;
    @media (max-width: 768px) {
      font-size: 1.2em;
    }
  }
`;

const ActionButton = styled.div`
  position: absolute;
  top: 20px;
  right: 10px;
  padding: 10px;
  cursor: pointer;
  :hover{
    background: #ccc;
    border-radius: 10%;
  }

`;

const DropdownMenu = styled.div`
  position: absolute;
  top: 20px;
  right: 10px;
  background-color: #ffffff;
  border: 1px solid #ddd;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
  border-radius: 5px;
  display: ${({ open }) => (open ? "block" : "none")};
  z-index: 1000;

  button {
    display: block;
    width: 100%;
    padding: 10px;
    border: none;
    background: none;
    text-align: left;
    cursor: pointer;
    &:hover {
      background-color: #f0f0f0;
    }
  }
`;

const HeaderSection = ({
  question,
  dropdownOpen,
  toggleDropdown,
  increaseFontSize,
  decreaseFontSize,
  shareContent,
  dropdownRef,
}) => (
  <>
    <HeaderContainer>
      <BackButton/>
      <Avatar src={question.avatarUrl} />
      <div>
        <p>{question.userName}</p>
        <p>
          <TimeAgo createdAt={question.$createdAt} /> | {question.views} views
        </p>
      </div>
    </HeaderContainer>
    <ActionButton onClick={toggleDropdown}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="icon icon-tabler icon-tabler-dots-vertical"
        width="30"
        height="30"
        viewBox="0 0 24 24"
        stroke-width="1.5"
        stroke="#000000"
        fill="none"
        stroke-linecap="round"
        stroke-linejoin="round"
      >
        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
        <path d="M12 12m-1 0a1 1 0 1 0 2 0a1 1 0 1 0 -2 0" />
        <path d="M12 19m-1 0a1 1 0 1 0 2 0a1 1 0 1 0 -2 0" />
        <path d="M12 5m-1 0a1 1 0 1 0 2 0a1 1 0 1 0 -2 0" />
      </svg>
    </ActionButton>
    <DropdownMenu ref={dropdownRef} open={dropdownOpen}>
      <button onClick={increaseFontSize}>Increase Font Size</button>
      <button onClick={decreaseFontSize}>Decrease Font Size</button>
      <button onClick={shareContent}>Share</button>
    </DropdownMenu>
  </>
);

export default HeaderSection;
