import { createContext, useContext, useEffect, useState } from "react";
import { db, ID } from "../../db/config";

const DatabaseId = "666aff03003ba124b787";
const CollectionId = "668d39710005c04f99c6";
const ChapterCollectionId = "668d3ed8002531a7bd85";
const ContentCollectionId = "668d41d50036906fc093";

const BookDataContext = createContext();

export const useBookData = () => {
  return useContext(BookDataContext);
};

export const BookDataProvider = ({ children }) => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    try {
      const response = await db.listDocuments(DatabaseId, CollectionId);
      setBooks(response.documents);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching books:", error);
      throw new Error("Failed to fetch books");
    }
  };

  const addBook = async (newBook) => {
    try {
      const response = await db.createDocument(DatabaseId, CollectionId, ID.unique(), newBook);
      fetchBooks();
      return response;
    } catch (error) {
      console.error("Error adding book:", error);
      throw new Error("Failed to add book: " + error.message);
    }
  };

  const editBook = async (id, updatedBook) => {
    try {
      await db.updateDocument(DatabaseId, CollectionId, id, updatedBook);
      fetchBooks();
    } catch (error) {
      console.error("Error editing book:", error);
      throw new Error("Failed to edit book");
    }
  };

  const addChapterToBook = async (bookId, newChapter) => {
    try {
      const currentBook = books.find((book) => book.$id === bookId);
      if (!currentBook) {
        throw new Error(`Book with ID ${bookId} not found.`);
      }

      const updatedChapters = [...currentBook.chapters, newChapter];
      const updatedBook = { ...currentBook, chapters: updatedChapters };

      await db.updateDocument(DatabaseId, CollectionId, bookId, updatedBook);
      fetchBooks();
    } catch (error) {
      console.error("Error adding chapter to book:", error);
      throw new Error("Failed to add chapter to book");
    }
  };

  const addContentToChapter = async (chapterId, newContent) => {
    try {
      const currentBook = books.find((book) =>
        book.chapters.some((chapter) => chapter.$id === chapterId)
      );
      if (!currentBook) {
        throw new Error(`Chapter with ID ${chapterId} not found in any book.`);
      }

      const updatedChapters = currentBook.chapters.map((chapter) => {
        if (chapter.$id === chapterId) {
          const updatedContents = [...chapter.contents, newContent];
          return { ...chapter, contents: updatedContents };
        }
        return chapter;
      });

      const updatedBook = { ...currentBook, chapters: updatedChapters };

      await db.updateDocument(DatabaseId, CollectionId, currentBook.$id, updatedBook);
      fetchBooks();
    } catch (error) {
      console.error("Error adding content to chapter:", error);
      throw new Error("Failed to add content to chapter");
    }
  };

  const editChapter = async (chapterId, updatedChapter) => {
    try {
      await db.updateDocument(DatabaseId, ChapterCollectionId, chapterId, updatedChapter);
      fetchBooks();
    } catch (error) {
      console.error("Error editing chapter:", error);
      throw new Error(`Failed to edit chapter: ${error.message}`);
    }
  };

  const editContent = async (contentId, updatedContent) => {
    try {
      await db.updateDocument(DatabaseId, ContentCollectionId, contentId, updatedContent);
      fetchBooks();
    } catch (error) {
      console.error("Error editing content:", error);
      throw new Error(`Failed to edit content: ${error.message}`);
    }
  };

  const deleteContent = async (contentId) => {
    try {
      await db.deleteDocument(DatabaseId, ContentCollectionId, contentId);
      fetchBooks();
    } catch (error) {
      console.error("Error deleting content:", error);
      throw new Error(`Failed to delete content: ${error.message}`);
    }
  };

  const deleteChapter = async (chapterId) => {
    try {
      await db.deleteDocument(DatabaseId, ChapterCollectionId, chapterId);
      fetchBooks();
    } catch (error) {
      console.error("Error deleting chapter:", error);
      throw new Error(`Failed to delete chapter: ${error.message}`);
    }
  };

  return (
    <BookDataContext.Provider
      value={{
        books,
        loading,
        addBook,
        editBook,
        addChapterToBook,
        addContentToChapter,
        editChapter,
        editContent,
        deleteContent,
        deleteChapter,
      }}
    >
      {children}
    </BookDataContext.Provider>
  );
};
