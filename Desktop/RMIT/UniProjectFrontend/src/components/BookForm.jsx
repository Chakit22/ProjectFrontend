import React, { useState } from "react";
import "../BookForm.css"; // Import the CSS file

const BookForm = ({ addBook }) => {
  const [name, setname] = useState("");
  const [bookAuthors, setBookAuthors] = useState("");
  const [bookLink, setBookLink] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const bookData = {
      name,
      authors: bookAuthors,
      bookLink,
    };

    try {
      const response = await fetch(
        "https://university-project-backend.vercel.app//books/addBook",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: localStorage.getItem("token")
          },
          body: JSON.stringify(bookData),
        }
      );

      if (response.ok) {
        // Assuming addBook function updates the state or performs necessary actions
        addBook(bookData);
        setname("");
        setBookAuthors("");
        setBookLink("");
      } else {
        console.error("Failed to add book:", response.statusText);
      }
    } catch (error) {
      console.error("Error adding book:", error);
    }
  };

  return (
    <form className="book-form" onSubmit={handleSubmit}>
      <h2 className="form-title">Add a New Book</h2>
      <div className="form-group">
        <label>Book Name:</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setname(e.target.value)}
          required
        />
      </div>
      <div className="form-group">
        <label>Book Authors:</label>
        <input
          type="text"
          value={bookAuthors}
          onChange={(e) => setBookAuthors(e.target.value)}
          required
        />
      </div>
      <div className="form-group">
        <label>Google Drive Link:</label>
        <input
          type="url"
          value={bookLink}
          onChange={(e) => setBookLink(e.target.value)}
          required
        />
      </div>
      <button className="submit-button" type="submit">
        Upload
      </button>
    </form>
  );
};

export default BookForm;
