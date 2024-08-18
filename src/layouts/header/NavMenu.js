import React from "react";
import styled from "styled-components";
import { NavLink } from "react-router-dom";

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
  align-items: center;
  color: #CACECF;
  transition: color 0.3s;

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
  }
`;

export default function NavMenu() {
  return (
    <Wrapper>
      <ul>
        <li>
          <StyledNavLink to="/Feed" activeClassName="active">
            <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-grid-3x3" width="30" height="30" viewBox="0 0 24 24" strokeWidth="2.3" stroke="#2c3e50" fill="none" strokeLinecap="round" strokeLinejoin="round">
              <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
              <path d="M3 8h18" />
              <path d="M3 16h18" />
              <path d="M8 3v18" />
              <path d="M16 3v18" />
            </svg>
          </StyledNavLink>
        </li>
        <li>
          <StyledNavLink to="/Video" activeClassName="active">
          <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-video" width="38" height="43" viewBox="0 0 24 24" stroke-width="1.8" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
  <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
  <path d="M15 10l4.553 -2.276a1 1 0 0 1 1.447 .894v6.764a1 1 0 0 1 -1.447 .894l-4.553 -2.276v-4z" />
  <path d="M3 6m0 2a2 2 0 0 1 2 -2h8a2 2 0 0 1 2 2v8a2 2 0 0 1 -2 2h-8a2 2 0 0 1 -2 -2z" />
</svg>
          </StyledNavLink>
        </li>
        <li>
          <StyledNavLink to="/Audio" activeClassName="active">
            <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-microphone" width="30" height="30" viewBox="0 0 24 24" strokeWidth="2.2" stroke="#2c3e50" fill="none" strokeLinecap="round" strokeLinejoin="round">
              <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
              <path d="M9 2m0 3a3 3 0 0 1 3 -3h0a3 3 0 0 1 3 3v5a3 3 0 0 1 -3 3h0a3 3 0 0 1 -3 -3z" />
              <path d="M5 10a7 7 0 0 0 14 0" />
              <path d="M8 21l8 0" />
              <path d="M12 17l0 4" />
            </svg>
          </StyledNavLink>
        </li>
        <li>
          <StyledNavLink to="/Articles" activeClassName="active">
            <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-text-grammar" width="30" height="30" viewBox="0 0 24 24" strokeWidth="2" stroke="#2c3e50" fill="none" strokeLinecap="round" strokeLinejoin="round">
              <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
              <path d="M14 9a3 3 0 1 0 6 0a3 3 0 0 0 -6 0" />
              <path d="M4 12v-5a3 3 0 1 1 6 0v5" />
              <path d="M4 9h6" />
              <path d="M20 6v6" />
              <path d="M4 16h12" />
              <path d="M4 20h6" />
              <path d="M14 20l2 2l5 -5" />
            </svg>
          </StyledNavLink>
        </li>
        <li>
          <StyledNavLink to="/Books" activeClassName="active">
            <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-books" width="30" height="30" viewBox="0 0 24 24" strokeWidth="2" stroke="#2c3e50" fill="none" strokeLinecap="round" strokeLinejoin="round">
              <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
              <path d="M5 4m0 1a1 1 0 0 1 1 -1h2a1 1 0 0 1 1 1v14a1 1 0 0 1 -1 1h-2a1 1 0 0 1 -1 -1z" />
              <path d="M9 4m0 1a1 1 0 0 1 1 -1h2a1 1 0 0 1 1 1v14a1 1 0 0 1 -1 1h-2a1 1 0 0 1 -1 -1z" />
              <path d="M5 8h4" />
              <path d="M9 16h4" />
              <path d="M13.803 4.56l2.184 -.53c.562 -.135 1.133 .19 1.282 .732l3.695 13.418a1.02 1.02 0 0 1 -.634 1.219l-.133 .041l-2.184 .53c-.562 .135 -1.133 -.19 -1.282 -.732l-3.695 -13.418a1.02 1.02 0 0 1 .634 -1.219l.133 -.041z" />
              <path d="M14 9l4 -1" />
              <path d="M16 16l3.923 -.98" />
            </svg>
          </StyledNavLink>
        </li>
        <li>
          <StyledNavLink to="/QuestionAnswer" activeClassName="active">
            <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-letter-q" width="30" height="30" viewBox="0 0 24 24" strokeWidth="2.5" stroke="#2c3e50" fill="none" strokeLinecap="round" strokeLinejoin="round">
              <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
              <path d="M18 9a5 5 0 0 0 -5 -5h-2a5 5 0 0 0 -5 5v6a5 5 0 0 0 5 5h2a5 5 0 0 0 5 -5v-6" />
              <path d="M13 15l5 5" />
            </svg>
          </StyledNavLink>
        </li>
      </ul>
    </Wrapper>
  );
}
