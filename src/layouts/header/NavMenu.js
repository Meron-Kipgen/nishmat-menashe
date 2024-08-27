import React from "react";
import styled from "styled-components";
import { NavLink } from "react-router-dom";
import { ArticleIcon, AudioIcon, FeedIcon, LibraryIcon, QnAIcon, VideoIcon } from "../../Assets/Icons";

// Define variables for icon dimensions
const ICON_SIZE = 26; // Default icon size for desktop
const MOBILE_ICON_SIZE = 29; // Icon size for mobile devices

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

  svg {
    stroke: currentColor; /* Make sure the SVG stroke color follows the text color */
    transition: stroke 0.3s;
    height: ${ICON_SIZE}px; /* Apply default icon size */
    width: ${ICON_SIZE}px;  /* Apply default icon size */
    margin-bottom: 2px; /* Space between the icon and text */
  }

  &.active {
    color: #FFA555;
    svg {
      stroke: #FFA555;
    }
  }

  &:hover {
    @media (hover: hover) and (pointer: fine) {
      color: #FFA555;
      svg {
        stroke: #FFA555;
      }
    }
  }

  @media (max-width: 768px) {
    font-size: 0.6rem;

    svg {
      height: ${MOBILE_ICON_SIZE}px; /* Apply mobile icon size */
      width: ${MOBILE_ICON_SIZE}px;  /* Apply mobile icon size */
      margin-bottom: 3px; /* Reduce spacing between icon and text for mobile */
    }

    &:hover {
      color: #CACECF; /* Retain original color on touch devices */
    }
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
          <StyledNavLink to="/Articles" activeClassName="active">
            <ArticleIcon />
            articles
          </StyledNavLink>
        </li>
        <li>
          <StyledNavLink to="/Audio" activeClassName="active">
            <AudioIcon />
            audios
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
