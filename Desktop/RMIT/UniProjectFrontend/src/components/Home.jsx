import React, { useState, useEffect } from "react";
import BookForm from "./BookForm";
import BookList from "./BookList";
import LogoutButton from "./LogoutButton"; // Import LogoutButton component

const HomePage = () => {
  const [books, setBooks] = useState([]);
  const [isAdmin, setIsAdmin] = useState(false);
  const [token, setToken] = useState(null);
  const [searchQuery, setSearchQuery] = useState(""); // State for search query

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await fetch(
          "https://itis-assignment.vercel.app/books",
          {
            headers: { Authorization: localStorage.getItem("token") },
          }
        );
        const data = await response.json();
        setBooks(data.books);
      } catch (error) {
        console.error("Error fetching books:", error);
      }
    };

    const token = localStorage.getItem("token");
    const userRole = localStorage.getItem("userRole");
    console.log(userRole);
    if (token) {
      setToken(token);
      setIsAdmin(userRole === "Admin");
      fetchBooks();
    }
  }, []);

  const addBook = (newBook) => {
    newBook.link = newBook.bookLink
    setBooks((prevBooks) => [...prevBooks, newBook]);
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const filteredBooks = searchQuery
    ? books.filter((book) =>
        book.bookName.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : books;

  if (!token) {
    return <div>Please log in to view this page.</div>;
  }

  return (
    <div>
      <div className="App">
        <div className="top-right">
          <LogoutButton /> {/* Add LogoutButton component */}
        </div>
        <input
          type="text"
          placeholder="Search books..."
          value={searchQuery}
          onChange={handleSearchChange}
          style={{ margin: "20px 0", padding: "10px", width: "100%" }}
        />
        {isAdmin && <BookForm addBook={addBook} />}
        <BookList books={filteredBooks} />
      </div>
    </div>
  );
};

export default HomePage;
