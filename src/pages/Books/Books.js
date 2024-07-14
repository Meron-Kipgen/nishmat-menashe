import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import BookItem from "./BookItem";
import Categories from "./Categories";
import TableOfContents from "./TableOfContents";
import { useBookData } from "./useBookData"; // Import the context
import AddNewBookForm from "./AddNewBookForm"; // Import the AddNewBookForm component

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
`;

const BooksContainer = styled.div`
  flex: 2;
  padding: 0 20px;
`;

const BookList = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 20px;
`;

const AddBookButton = styled.button`
  margin-top: 20px;
  padding: 10px 20px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
`;

const Books = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { books, loading, addBook, editBook } = useBookData(); // Include editBook from context
  const [selectedBook, setSelectedBook] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedSubcategory, setSelectedSubcategory] = useState(null);
  const [showMiddleSection, setShowMiddleSection] = useState(true);
  const [showAddBookForm, setShowAddBookForm] = useState(false);

  useEffect(() => {
    if (location.pathname === "/Books") {
      setSelectedCategory(null);
      setSelectedSubcategory(null);
      setSelectedBook(null);
      setShowMiddleSection(true);
    } else {
      setShowMiddleSection(false);
    }
  }, [location.pathname]);

  const handleCategorySelect = (category) => {
    setSelectedCategory(category === "All" ? null : category);
    setSelectedSubcategory(null);
    setShowMiddleSection(true);
  };

  const handleSubcategorySelect = (subcategory) => {
    setSelectedSubcategory(subcategory === "All" ? null : subcategory);
    setShowMiddleSection(true);
  };

  const handleBookSelect = (book) => {
    setSelectedBook(book);
    setShowMiddleSection(false);
    navigate(`/Books/${book.$id}`);
  };

  const toggleAddBookForm = () => {
    setShowAddBookForm(!showAddBookForm);
  };

  const handleEditBook = (editedBook) => {
    // Assuming editBook directly modifies the book data in the context
    editBook(editedBook);
  };

  const addNewBook = async (newBook) => {
    try {
      await addBook(newBook);
      setShowAddBookForm(false);
    } catch (error) {
      console.error("Failed to add book:", error);
      // Handle error state or logging as needed
    }
  };

  const filteredBooks = books.filter(
    (book) =>
      (!selectedCategory || selectedCategory === "All" || book.category === selectedCategory) &&
      (!selectedSubcategory || book.subcategory === selectedSubcategory)
  );

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <Container>
      <Categories
        categories={[
          { name: "All", subcategories: [] },
          ...books.reduce((acc, book) => {
            const existingCategory = acc.find((item) => item.name === book.category);
            if (!existingCategory) {
              acc.push({ name: book.category, subcategories: [] });
            }
            const category = acc.find((cat) => cat.name === book.category);
            if (category && book.subcategory && !category.subcategories.includes(book.subcategory)) {
              category.subcategories.push(book.subcategory);
            }
            return acc;
          }, [])
        ]}
        selectedCategory={selectedCategory}
        selectedSubcategory={selectedSubcategory}
        handleCategorySelect={handleCategorySelect}
        handleSubcategorySelect={handleSubcategorySelect}
      />

      {showMiddleSection && (
        <BooksContainer>
          <h2>Books</h2>
          <BookList>
            {filteredBooks.map((book) => (
              <BookItem
                key={book.$id}
                book={book}
                active={selectedBook && selectedBook.$id === book.$id}
                onClick={() => handleBookSelect(book)}
                onEdit={handleEditBook} // Pass edit function to BookItem component
              />
            ))}
          </BookList>
          <AddBookButton onClick={toggleAddBookForm}>Add New Book</AddBookButton>
          {showAddBookForm && <AddNewBookForm addBook={addNewBook} setShowAddBookForm={setShowAddBookForm} />}
        </BooksContainer>
      )}

      {!showMiddleSection && <Outlet />}

      <TableOfContents selectedBook={selectedBook} />
    </Container>
  );
};

export default Books;
