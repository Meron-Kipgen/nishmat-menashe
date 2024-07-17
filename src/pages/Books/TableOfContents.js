import React from "react";
import styled from "styled-components";

const TableOfContentsContainer = styled.div`
  flex: 1;
  width: 400px;
  padding: 20px;
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);

`;

const TableOfContentsTitle = styled.h2`
  font-size: 1.5rem;
  margin-bottom: 20px;
  color: #333;
  text-align: center;
  font-weight: 600;
`;

const TableOfContentsList = styled.ul`
  list-style-type: none;
  padding: 0;
  margin: 0;
`;

const TableOfContentsItem = styled.li`
  font-size: 1.2rem;
  margin-bottom: 10px;
  cursor: pointer;
  color: ${({ active }) => (active ? "#ff0000" : "#333")};
  transition: all 0.3s ease;
  padding: 10px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  background-color: ${({ active }) => (active ? "#fff0f0" : "white")};
  box-shadow: ${({ active }) =>
    active ? "0 2px 4px rgba(255, 0, 0, 0.2)" : "none"};

  &:hover {
    color: #007bff;
    background-color: #f0f0f0;
    box-shadow: 0 2px 4px rgba(0, 123, 255, 0.2);
  }
`;

const TableOfContents = ({ selectedBook, handleChapterClick }) => (
  <TableOfContentsContainer>
    <TableOfContentsTitle>Table of Contents</TableOfContentsTitle>
    {selectedBook && (
      <TableOfContentsList>
        {selectedBook.chapters.map((chapter, index) => (
          <TableOfContentsItem
            key={index}
            active={index === selectedBook.activeChapterIndex}
            onClick={() => handleChapterClick(index)}
          >
            {chapter.titleEn} {/* Display the chapter title */}
          </TableOfContentsItem>
        ))}
      </TableOfContentsList>
    )}
  </TableOfContentsContainer>
);

export default TableOfContents;
