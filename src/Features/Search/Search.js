import React, { useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useAllPosts } from "../../pages/Feed/useAllPost"; // Update the import path
import { SearchIcon } from "../../Assets/Icons";

const Wrapper = styled.section`
  width: 500px;
  position: relative;
`;

const GlassInput = styled.input`
  position: relative;
  width: 100%;
  padding: 6px 16px;
  padding-right: 40px;
  border: none;
  border-radius: 20px;
  background: rgba(255, 255, 255, 0.8);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.3);
  transition: width 0.3s ease-in-out, box-shadow 0.3s ease;
  @media (max-width: 760px) {
    background: transparent;
    border: none;
    border-radius: 0;
    padding: 6px 30px 6px 0;
 
  }

  &:focus {
    box-shadow: 0 1px 1px rgba(0, 0, 0, 0.2);
    outline: none;
    @media (max-width: 760px) {
     
      box-shadow: none;
    }
  }

  &::placeholder {
    color: black;
  }

  &::-webkit-search-cancel-button {
    -webkit-appearance: none;
    appearance: none;
  }

  &::-webkit-search-cancel-button {
    height: 16px;
    width: 16px;
    background: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="%2304252F" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>')
      no-repeat center center;
    background-size: contain;
    cursor: pointer;
  }
`;

const SearchButton = styled.button`
  position: absolute;
  right: 10px;
  top: 16px;
  transform: translateY(-50%);
  border: none;
  background: none;
  padding: 0;
  cursor: pointer;
  outline: none;

  svg {
    color: #04252f;
    font-size: 20px;
  }
`;

const SuggestionsList = styled.ul`
  position: absolute;
  width: 96%;
  background: white;
  border: 1px solid #ddd;
  border-radius: 0 0 20px 20px;
  max-height: 200px;
  overflow-y: auto;
  list-style: none;
  margin: 0 0 0 12px;
  background: rgba(255, 255, 255, 0.8);
  backdrop-filter: blur(10px);
  padding: 0;
  cursor: pointer;
  z-index: 40;

  &::-webkit-scrollbar {
    display: none;
  }

  -ms-overflow-style: none;
  scrollbar-width: none;

  @media (max-width: 768px) {
    right: 0;
    top: 40;
    width: 100vw;
    height: 100vh;
    margin: 0;
    border-radius: 0;
    max-height: none;
    border: none;
  }
`;

const SuggestionItem = styled.li`
  display: flex;
  align-items: center;
  gap: 20px;
  padding: 8px 16px;
  cursor: pointer;
  padding: 10px 10px;
  &:hover {
    background: #f0f0f0;
  }
`;
const Lists = styled.div`
display: flex;
align-items: center;
gap: 10px;
`
export default function Search({ onClose }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const { posts, loading } = useAllPosts(); // Use useAllPosts to get all posts
  const navigate = useNavigate();

  const handleSearchChange = event => {
    const value = event.target.value.trim(); // Trim whitespace
    setSearchTerm(value);

    if (value.length > 0) {
      const filteredSuggestions = posts.filter(item => {
        return (
          item &&
          item.title &&
          typeof item.title === "string" &&
          item.title.toLowerCase().includes(value.toLowerCase())
        );
      });
      setSuggestions(filteredSuggestions);
    } else {
      setSuggestions([]);
    }
  };

  const handleSuggestionClick = suggestion => {
    setSearchTerm(suggestion.title);
    setSuggestions([]);
    navigate(`/search?q=${suggestion.title}`);
    if (onClose) onClose(); // Close the search overlay
  };

  const handleSearchButtonClick = () => {
    if (searchTerm.trim()) {
      navigate(`/search?q=${searchTerm}`);
      if (onClose) onClose(); // Close the search overlay
    }
  };

  const handleKeyDown = event => {
    if (event.key === "Enter") {
      handleSearchButtonClick();
    }
  };

  if (loading) return <p>Loading...</p>;

  return (
    <Wrapper>
      <GlassInput
        type="search"
        placeholder="Search here"
        value={searchTerm}
        onChange={handleSearchChange}
        onKeyDown={handleKeyDown}
      />
      <SearchButton onClick={handleSearchButtonClick}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="icon icon-tabler icon-tabler-search"
          width="20"
          height="20"
          viewBox="0 0 24 24"
          stroke-width="3.5"
          stroke="#04252F"
          fill="none"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <path stroke="none" d="M0 0h24v24H0z" fill="none" />
          <path d="M10 10m-7 0a7 7 0 1 0 14 0a7 7 0 1 0 -14 0" />
          <path d="M21 21l-6 -6" />
        </svg>
      </SearchButton>
      {suggestions.length > 0 && (
        <SuggestionsList>
          {suggestions.map((suggestion, index) => (
            <SuggestionItem
              key={index}
              onClick={() => handleSuggestionClick(suggestion)}
            >
              <Lists>
                <SearchIcon height="15px" width="15px" stroke="black"/>   {suggestion.title} ({suggestion.type})
              </Lists>
             
            </SuggestionItem>
          ))}
        </SuggestionsList>
      )}
    </Wrapper>
  );
}
