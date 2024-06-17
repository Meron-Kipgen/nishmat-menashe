import React from "react";
import styled from "styled-components";
import { NavLink } from "react-router-dom";
import {
  AiOutlineHome,
  AiOutlineVideoCamera,
  AiOutlineAudio,
  AiOutlineFileText,
} from "react-icons/ai";
import { TbBooks } from "react-icons/tb";

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

  a {
    text-decoration: none;
    color: inherit;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 40px;
    height: 40px;
    border-radius: 5px;
    backdrop-filter: blur(16px) saturate(180%);
    -webkit-backdrop-filter: blur(16px) saturate(180%);
    background-color: rgba(255, 255, 255, 0.75);
    border: 1px solid rgba(209, 213, 219, 0.3);
    transition: background-color 0.3s, box-shadow 0.3s;
  }

  a.active {
    background-color: rgb(68, 174, 98);
    color: white;
  }

  a:hover {
    background-color: rgb(68, 174, 98);
    color: white;
  }
`;

export default function NavMenu() {
  return (
    <Wrapper>
      <ul>
        <li>
          <NavLink to="/Feed" activeClassName="active">
            <AiOutlineHome size={24} />
          </NavLink>
        </li>
        <li>
          <NavLink to="/Video" activeClassName="active">
            <AiOutlineVideoCamera size={24} />
          </NavLink>
        </li>
        <li>
          <NavLink to="/Audio" activeClassName="active">
            <AiOutlineAudio size={24} />
          </NavLink>
        </li>
        <li>
          <NavLink to="/Text" activeClassName="active">
            <AiOutlineFileText size={24} />
          </NavLink>
        </li>
        <li>
          <NavLink to="/Books" activeClassName="active">
            <TbBooks size={24}/>
          </NavLink>
        </li>
      </ul>
    </Wrapper>
  );
}
