import React from "react";
import { FaDownload, FaExternalLinkAlt } from "react-icons/fa";
import "../BookList.css"; // Import the CSS file

const downloadPDF = (url, filename) => {
  console.log(url)
  fetch(url)
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.blob();
    })
    .then(blob => {
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.style.display = 'none';
      a.href = url;
      a.download = filename;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    })
    .catch(error => {
      console.error('There has been a problem with your fetch operation:', error);
    });
};

const BookList = ({ books }) => {
  return (
    <div className="book-list">
      {books.map((book) => (
        <div className="book-card">
          <div className="book-details">
            <div className="book-name">{book.name}</div>
            <div className="book-authors">{book.author}</div>
          </div>
          <div className="book-actions">
            <button
              className="action-button"
              onClick={() => downloadPDF(book.link, `${book.name}.pdf`)}
              title="Download"
            >
              <FaDownload />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default BookList;
