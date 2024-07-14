// BookDetail.js

import React from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import Layout from "./Layout";
import Menu from "./Menu";
import { useBookData } from "./useBookData";
import ChapterForm from "./ChapterForm";
import EditBookForm from "./EditBookForm";

const Container = styled.div`
  max-width: 800px;
  margin: 20px auto;
  padding: 20px;
  background-color: #f0f0f0;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

const BookTitle = styled.h2`
  font-size: ${({ fontSize }) => `${fontSize}px`};
  margin-bottom: 10px;
`;

const Author = styled.p`
  font-size: ${({ fontSize }) => `${fontSize}px`};
  margin-bottom: 10px;
`;

const BookDetail = () => {
  const { id } = useParams();
  const { books, loading, editBook } = useBookData(); // Ensure editBook is obtained from useBookData

  const book = books.find((book) => book.$id === id);

  const [fontSize, setFontSize] = React.useState(16);
  const [showEn, setShowEn] = React.useState(true);
  const [showHe, setShowHe] = React.useState(true);
  const [gridLayout, setGridLayout] = React.useState(false);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!book) {
    return <div>Book not found.</div>;
  }

  const increaseFontSize = () => {
    setFontSize((prevSize) => prevSize + 2);
  };

  const decreaseFontSize = () => {
    if (fontSize > 8) {
      setFontSize((prevSize) => prevSize - 2);
    }
  };

  const toggleEnVisibility = () => {
    setShowEn((prev) => !prev);
  };

  const toggleHeVisibility = () => {
    setShowHe((prev) => !prev);
  };

  const toggleBothVisibility = () => {
    setShowEn(true);
    setShowHe(true);
  };

  const toggleGridLayout = () => {
    setGridLayout((prev) => !prev);
  };

  const saveEditedBook = async (editedData) => {
    try {
      await editBook(book.$id, editedData); // Call editBook with book.$id and editedData
      // Optionally handle success or navigate somewhere
    } catch (error) {
      console.error("Failed to save edited book:", error);
      // Optionally handle error state or show a message
    }
  };

  return (
    <Container>
      <Menu
        onIncreaseFontSize={increaseFontSize}
        onDecreaseFontSize={decreaseFontSize}
        onToggleEnVisibility={toggleEnVisibility}
        onToggleHeVisibility={toggleHeVisibility}
        onToggleBothVisibility={toggleBothVisibility}
        onToggleGridLayout={toggleGridLayout}
        showEn={showEn}
        showHe={showHe}
        gridLayout={gridLayout}
      />

      <BookTitle fontSize={fontSize}>{book.title}</BookTitle>
      <Author fontSize={fontSize}>by {book.author}</Author>

      <EditBookForm book={book} saveEditedBook={saveEditedBook} />

      <Layout
        chapters={book.chapters || []}
        showEn={showEn}
        showHe={showHe}
        fontSize={fontSize}
        gridLayout={gridLayout}
      />

      <ChapterForm bookId={book.$id} />
    </Container>
  );
};

export default BookDetail;
