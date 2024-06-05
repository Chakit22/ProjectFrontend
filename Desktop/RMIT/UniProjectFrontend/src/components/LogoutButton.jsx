import React from 'react';

const LogoutButton = () => {
  const handleLogout = () => {
    // Remove token and user role from localStorage
    localStorage.removeItem('token');
    localStorage.removeItem('userRole');
    // Redirect to login page
    window.location.href = `${window.location.origin}/login`;
  };

  return (
    <button className="logout-button" onClick={handleLogout}>
      Logout
    </button>
  );
};

export default LogoutButton;
