import React from "react";
import styled from "styled-components";
import { NavLink } from "react-router-dom";
import { ArticleIcon, AudioIcon, FeedIcon, LibraryIcon, QnAIcon, VideoIcon } from "../../Assets/Icons";

// Define variables for icon dimensions
const ICON_SIZE = 24; // Example size, adjust as needed

const Wrapper = styled.section`
  display: flex;
  justify-content: center;

  ul {
    display: flex;
    list-style: none;
    padding: 0;
    margin: 0;
    justify-content: space-between;
    gap: 30px;

  }

  li {
    flex: 1;
    display: flex;
    justify-content: center;
  }
`;

const StyledNavLink = styled(NavLink)`
  display: flex;
  flex-direction: column; /* Stack icon and text vertically */
  align-items: center;
  color: #CACECF;
  transition: color 0.3s;
  text-decoration: none;
  font-size: 0.9rem;
  @media (max-width: 768px) {
   font-size: 0.6rem;
  }
  &.active,
  &:hover {
    color: #FFA555;

    svg {
      stroke: #FFA555;
    }
  }

  svg {
    stroke: currentColor; /* Make sure the SVG stroke color follows the text color */
    transition: stroke 0.3s;
    height: ${ICON_SIZE}px; /* Apply icon size variable */
    width: ${ICON_SIZE}px; /* Apply icon size variable */
  }
`;

export default function NavMenu() {
  return (
    <Wrapper>
      <ul>
        <li>
          <StyledNavLink to="/Feed" activeClassName="active">
            <FeedIcon />
            feeds
          </StyledNavLink>
        </li>
        <li>
          <StyledNavLink to="/Video" activeClassName="active">
            <VideoIcon />
            videos
          </StyledNavLink>
        </li>
        <li>
          <StyledNavLink to="/Audio" activeClassName="active">
            <AudioIcon />
            audios
          </StyledNavLink>
        </li>
        <li>
          <StyledNavLink to="/Articles" activeClassName="active">
            <ArticleIcon />
            articles
          </StyledNavLink>
        </li>
        <li>
          <StyledNavLink to="/Books" activeClassName="active">
            <LibraryIcon />
            library
          </StyledNavLink>
        </li>
        <li>
          <StyledNavLink to="/QuestionAnswer" activeClassName="active">
            <QnAIcon />
            QnA
          </StyledNavLink>
        </li>
      </ul>
    </Wrapper>
  );
}
