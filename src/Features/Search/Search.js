import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { fetchDataFromCollections } from '../../utils/allData';

const collections = [
  { name: 'video', databaseId: '666aff03003ba124b787', collectionId: '666aff1400318bf6aa6f' },
  { name: 'audio', databaseId: '666aff03003ba124b787', collectionId: 'YOUR_AUDIO_COLLECTION_ID' },
  { name: 'library', databaseId: '666aff03003ba124b787', collectionId: '668d39710005c04f99c6' },
  { name: 'questionAndAnswer', databaseId: '666aff03003ba124b787', collectionId: 'YOUR_QA_COLLECTION_ID' },
  { name: 'article', databaseId: '666aff03003ba124b787', collectionId: '666b0186000007f47da9' },
];

const Wrapper = styled.section`
  width: 500px;
  position: relative;
`;

const GlassInput = styled.input`
  width: 100%;
  padding: 6px 16px;
  padding-right: 40px;
  border: none;
  border-radius: 20px;
  background: rgba(255, 255, 255, 0.8);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.3);
  transition: width 0.3s ease-in-out, box-shadow 0.3s ease;

  &:focus {
    box-shadow: 0 1px 1px rgba(0, 0, 0, 0.2);
    outline: none;
  }

  &::placeholder {
    color: black;
  }

  /* Hide the default clear button */
  &::-webkit-search-cancel-button {
    -webkit-appearance: none;
    appearance: none;
  }

  /* Custom clear button styles */
  &::-webkit-search-cancel-button {
    height: 16px;
    width: 16px;
    background: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="%2304252F" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>') no-repeat center center;
    background-size: contain;
    cursor: pointer;
  }
`;

const SearchButton = styled.button`
  position: absolute;
  right: 10px;
  top: 55%;
  transform: translateY(-50%);
  border: none;
  background: none;
  padding: 0;
  cursor: pointer;
  outline: none;

  svg {
    color: #04252F;
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
  
  /* Hide scrollbar */
  &::-webkit-scrollbar {
    display: none;
  }
  
  -ms-overflow-style: none;  /* IE and Edge */
  scrollbar-width: none;  /* Firefox */
`;

const SuggestionItem = styled.li`
  padding: 8px 16px;
  cursor: pointer;

  &:hover {
    background: #f0f0f0;
  }
`;

export default function Search() {
  const [searchTerm, setSearchTerm] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [data, setData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      const fetchedData = await fetchDataFromCollections(collections);
      setData(fetchedData);
    };

    fetchData();
  }, []);

  const handleSearchChange = (event) => {
    const value = event.target.value;
    setSearchTerm(value);

    if (value.length > 0) {
      const filteredSuggestions = data.filter((item) =>
        item.title.toLowerCase().includes(value.toLowerCase())
      );
      setSuggestions(filteredSuggestions);
    } else {
      setSuggestions([]);
    }
  };

  const handleSuggestionClick = (suggestion) => {
    setSearchTerm(suggestion.title);
    setSuggestions([]);
    navigate(`/search?q=${suggestion.title}`);
  };

  const handleSearchButtonClick = () => {
    if (searchTerm.trim()) {
      navigate(`/search?q=${searchTerm}`);
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      handleSearchButtonClick();
    }
  };

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
        <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-search" width="20" height="20" viewBox="0 0 24 24" stroke-width="3.5" stroke="#04252F" fill="none" stroke-linecap="round" stroke-linejoin="round">
          <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
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
              {suggestion.title} ({suggestion.collection})
            </SuggestionItem>
          ))}
        </SuggestionsList>
      )}
    </Wrapper>
  );
}
