import React, { useRef, useState, useEffect } from 'react';
import styled from 'styled-components';
import videoData from './videoData';
import { CiCircleChevRight, CiCircleChevLeft } from "react-icons/ci";

const Container = styled.section`
  position: sticky;
  top: 0;
  z-index: 2;
  margin-bottom: 10px;
  display: flex;
  align-items: center;
`;

const ScrollButton = styled.button`
  background-color: rgba(255, 255, 255, 0.5);
  border: none;
  cursor: pointer;
  font-size: 20px;
  height: 50px;
  width: 60px;
  z-index: 1;
  transition: background-color 0.3s;
  color: rgb(45,108,199);

  &:hover {
    background-color: rgba(255, 255, 255, 0.7);
  }

  &:disabled {
    background-color: rgba(255, 255, 255, 0.2);
    cursor: not-allowed;
  }
`;

const ScrollContainer = styled.div`
  overflow-x: auto;
  white-space: nowrap;
  flex-grow: 1;
  -ms-overflow-style: none;
  scrollbar-width: none;

  &::-webkit-scrollbar {
    display: none;
  }

  ul {
    list-style-type: none;
    display: inline-flex;
    align-items: center;
    justify-content: flex-start;
    height: 50px;
    backdrop-filter: blur(16px);
    -webkit-backdrop-filter: blur(16px) ;
    background-color: rgba(255, 255, 255, 0.5);
    padding: 0;
    margin: 0;
  }

  li {
    border-radius: 20px;
    position: relative;
    margin: 10px;
    text-decoration: none;
    padding: 8px 20px;
    display: inline-block;
    white-space: nowrap;
    transition: background-color 0.3s, border-color 0.3s;
    border: 1px solid transparent;

    &:hover {
      cursor: pointer;
      background-color: rgb(68, 174, 98);
      color: white;
    }

    &.active {
      background-color: rgb(68, 174, 98);
      color: white;
    }
  }
`;

export default function Filter({ selectedCategories, onCategoryChange }) {
  const categories = ['All', ...new Set(videoData.map(video => video.category))];
  const scrollContainerRef = useRef(null);
  const [showLeftButton, setShowLeftButton] = useState(false);
  const [showRightButton, setShowRightButton] = useState(false);

  const handleScroll = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
      setShowLeftButton(scrollLeft > 0);
      setShowRightButton(scrollLeft < scrollWidth - clientWidth - 1); // Adjusted logic to accurately hide the right scroll button
    }
  };

  useEffect(() => {
    handleScroll(); // Check initial scroll position
  }, []);

  const handleClick = (category) => {
    let updatedCategories;

    if (category === 'All') {
      updatedCategories = ['All'];
    } else {
      if (selectedCategories.includes(category)) {
        updatedCategories = selectedCategories.filter(cat => cat !== category);
        if (updatedCategories.length === 0) {
          updatedCategories = ['All'];
        }
      } else {
        updatedCategories = selectedCategories.filter(cat => cat !== 'All');
        updatedCategories.push(category);
      }
    }

    onCategoryChange(updatedCategories);
  };

  const handleScrollButton = (direction) => {
    if (scrollContainerRef.current) {
      const scrollAmount = direction === 'left' ? -200 : 200;
      scrollContainerRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <Container>
      {showLeftButton && (
        <ScrollButton onClick={() => handleScrollButton('left')}>
          <CiCircleChevLeft size={30} />
        </ScrollButton>
      )}
      <ScrollContainer ref={scrollContainerRef} onScroll={handleScroll}>
        <ul>
          {categories.map((category, index) => (
            <li key={index} onClick={() => handleClick(category)} className={selectedCategories.includes(category) ? 'active' : ''}>
              {category}
            </li>
          ))}
        </ul>
      </ScrollContainer>
      {showRightButton && (
        <ScrollButton onClick={() => handleScrollButton('right')}>
          <CiCircleChevRight size={30} />
        </ScrollButton>
      )}
    </Container>
  );
}
