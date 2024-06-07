import React, { useState, useEffect } from "react";
import BookForm from "./BookForm";
import BookList from "./BookList";
import LogoutButton from "./LogoutButton"; // Import LogoutButton component

const HomePage = () => {
  const [books, setBooks] = useState([]);
  const [isAdmin, setIsAdmin] = useState(false);
  const [token, setToken] = useState(null);
  const [searchQuery, setSearchQuery] = useState(""); // State for search query
  const [users, setUsers] = useState([]); // State for users
  const [showUsers, setShowUsers] = useState(false); // State to toggle visibility of user list

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await fetch(
          "https://university-project-backend.vercel.app//books",
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
          "https://university-project-backend.vercel.app//users/getAll",
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
        fetchUsers(); // Fetch users if the user is an admin
      }
    }
  }, [isAdmin]); // Fetch users only when isAdmin state changes

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleToggleUsers = () => {
    setShowUsers(!showUsers); // Toggle visibility of user list
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
          <LogoutButton /> {/* Add LogoutButton component */}
        </div>
        <input
          type="text"
          placeholder="Search books..."
          value={searchQuery}
          onChange={handleSearchChange}
          style={{ margin: "20px 0", padding: "10px", width: "100%" }}
        />
        <BookList books={filteredBooks} />
        {isAdmin && ( // Render the button only if the user is an admin
          <button onClick={handleToggleUsers}>
            {showUsers ? "Hide Users" : "Show Users"}
          </button>
        )}
        {showUsers && isAdmin && ( // Render the list of users only if the user is an admin and showUsers state is true
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
