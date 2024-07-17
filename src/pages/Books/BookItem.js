import React from "react";
import styled from "styled-components";

const BookItemContainer = styled.div`
display: flex;
gap: 20px;
flex-wrap: wrap;
  padding: 15px;
  width: 300px;
  border-radius: 8px;
  background-color: ${({ active }) => (active ? "#007bff" : "#f8f9fa")};
  color: ${({ active }) => (active ? "white" : "inherit")};
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  text-align: center;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 6px 10px rgba(0, 0, 0, 0.2);
  }
`;

const BookImage = styled.img`
  width: 100%;
  height: auto;
  border-radius: 8px;
  margin-bottom: 10px;
`;

const BookTitle = styled.h3`
  font-size: 1.3rem;
  margin-bottom: 5px;
`;

const BookAuthor = styled.p`
  font-size: 1rem;
  color: ${({ active }) => (active ? "white" : "#666")};
`;

const BookItem = ({ book, active, onClick }) => (
  <BookItemContainer active={active} onClick={onClick}>
    <BookImage src={book.thumbnail} alt={book.title} />
    <BookTitle>{book.title}</BookTitle>
    <BookAuthor active={active}>by {book.author}</BookAuthor>
  </BookItemContainer>
);

export default BookItem;
