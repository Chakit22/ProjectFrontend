import React, { useState, useEffect } from "react";
import BookList from "./BookList";
import LogoutButton from "./LogoutButton"; 

const HomePage = () => {
  const [books, setBooks] = useState([]);
  const [isAdmin, setIsAdmin] = useState(false);
  const [token, setToken] = useState(null);
  const [searchQuery, setSearchQuery] = useState(""); 
  const [users, setUsers] = useState([]);
  const [showUsers, setShowUsers] = useState(false); 

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await fetch(
          "https://university-project-backend.vercel.app/books",
          {
            headers: { Authorization: localStorage.getItem("token") },
          }
        );
        const data = await response.json();
        setBooks(data);
        console.log(data);
      } catch (error) {
        console.error("Error fetching books:", error);
      }
    };

    const fetchUsers = async () => {
      try {
        const response = await fetch(
          "https://university-project-backend.vercel.app/users/getAll",
          {
            headers: { Authorization: localStorage.getItem("token") },
          }
        );
        const data = await response.json();
        setUsers(data);
        console.log(data);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    const token = localStorage.getItem("token");
    const userRole = localStorage.getItem("userRole");
    console.log(userRole);
    if (token) {
      setToken(token);
      setIsAdmin(userRole === "admin");
      fetchBooks();
      if (isAdmin) {
        console.log("ef")
        fetchUsers(); 
      }
    }
  }, [isAdmin]); 

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleToggleUsers = () => {
    setShowUsers(!showUsers); 
  };

  const filteredBooks = searchQuery
    ? books.filter((book) =>
        book.name.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : books;

  console.log(filteredBooks);

  if (!token) {
    return <div>Please log in to view this page.</div>;
  }

  return (
    <div>
      <div className="App">
        <div className="top-right">
          <LogoutButton /> 
        </div>
        <input
          type="text"
          placeholder="Search books..."
          value={searchQuery}
          onChange={handleSearchChange}
          style={{ margin: "20px 0", padding: "10px", width: "100%" }}
        />
        <BookList books={filteredBooks} />
        {isAdmin && ( 
          <button onClick={handleToggleUsers}>
            {showUsers ? "Hide Users" : "Show Users"}
          </button>
        )}
        {showUsers && isAdmin && (
          <div>
            <h2>List of Users:</h2>
            <ul>
              {users.map((user) => (
                <li key={user.id}>{user.firstname} {user.lastname} - {user.email}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default HomePage;
