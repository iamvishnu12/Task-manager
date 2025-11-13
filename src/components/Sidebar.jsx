
import React from "react";
import "./Sidebar.css";

export default function Sidebar({ selectedCategory, onSelectCategory }) {
  const categories = [
    { id: "all", name: "All Tasks", icon: "📋" },
    { id: "work", name: "Work", icon: "💼" },
    { id: "personal", name: "Personal", icon: "🏠" },
    { id: "completed", name: "Completed", icon: "✅" },
  ];

  return (
    <aside className="sidebar">
      <h3 className="sidebar-title">My Tasks</h3>
      <nav className="sidebar-menu">
        {categories.map((cat) => (
          <button
            key={cat.id}
            className={`sidebar-item ${
              selectedCategory === cat.id ? "active" : ""
            }`}
            onClick={() => onSelectCategory(cat.id)}
          >
            <span className="icon">{cat.icon}</span>
            {cat.name}
          </button>
        ))}
      </nav>
    </aside>
  );
}

