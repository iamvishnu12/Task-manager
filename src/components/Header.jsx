
import React from "react";
import "./Header.css";

export default function Header({ user, onLogout, searchTerm, setSearchTerm }) {
  return (
    <header className="header">
      <div className="header-left">
        <h2 className="app-title">Task Manager</h2>
      </div>

      <div className="header-center">
        <input
          className="search-input"
          type="text"
          placeholder="Search tasks..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="header-right">
        <span className="user-email">👋 {user.email}</span>
        <button className="logout-btn" onClick={onLogout}>
          Logout
        </button>
      </div>
    </header>
  );
}
