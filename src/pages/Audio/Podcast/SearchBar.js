import React, { useState } from 'react';
import styled from 'styled-components';

const SearchContainer = styled.div`
  position: relative;
  width: 200px;
  margin-left: 10px;
`;

const SearchInput = styled.input`
  width: 100%;
  padding: 5px 5px 5px 10px;
  border: none;
  outline: none;
  background: #D6D6D6;
  border-radius: 30px;
`;

const ClearButton = styled.button`
  position: absolute;
  right: 6px;
  top: 50%;
  transform: translateY(-50%);
  background: transparent;
  border: none;
  font-size: 20px;
  cursor: pointer;
  color: red;
  
  &:hover {
    color: #000;
  }
`;

const AutocompleteList = styled.ul`
  position: absolute;
  top: 30px;
  left: 0;
  background: white;
  width: 100%;
  max-height: 150px;
  overflow-y: auto;
  border: 1px solid #ccc;
  border-radius: 5px;
  list-style: none;
  padding: 0;
  margin: 0;
  z-index: 10;
`;

const AutocompleteItem = styled.li`
  padding: 5px;
  cursor: pointer;

  &:hover {
    background: #f0f0f0;
  }
`;

export default function SearchBar({ podcastData = [], searchTerm, setSearchTerm }) {
  const [suggestions, setSuggestions] = useState([]);

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);

    if (value) {
      const filteredSuggestions = podcastData
        .filter(item => item.title.toLowerCase().includes(value.toLowerCase()))
        .map(item => item.title);

      setSuggestions(filteredSuggestions);
    } else {
      setSuggestions([]);
    }
  };

  const handleSuggestionClick = (suggestion) => {
    setSearchTerm(suggestion);
    setSuggestions([]);
  };

  const handleClearInput = () => {
    setSearchTerm('');
    setSuggestions([]);
  };

  return (
    <SearchContainer>
      <SearchInput
        type="text"
        placeholder="Search..."
        value={searchTerm}
        onChange={handleSearchChange}
      />
      {searchTerm && (
        <ClearButton onClick={handleClearInput}>×</ClearButton>
      )}
      {suggestions.length > 0 && (
        <AutocompleteList>
          {suggestions.map((suggestion, index) => (
            <AutocompleteItem
              key={index}
              onClick={() => handleSuggestionClick(suggestion)}
            >
              {suggestion}
            </AutocompleteItem>
          ))}
        </AutocompleteList>
      )}
    </SearchContainer>
  );
}
