import React from "react";
import "./Sidebar.css";

export default function Sidebar({ selectedCategory, onSelectCategory }) {
  const items = [
    { id: "all", label: "All Tasks", icon: "📋" },
    { id: "work", label: "Work", icon: "💼" },
    { id: "personal", label: "Personal", icon: "🏠" },
    { id: "completed", label: "Completed", icon: "✅" },
  ];

  return (
    <aside className="sidebar">
      <h3 className="sidebar-title">Categories</h3>

      <ul className="sidebar-list">
        {items.map((item) => (
          <li
            key={item.id}
            className={`sidebar-item ${
              selectedCategory === item.id ? "active" : ""
            }`}
            onClick={() => onSelectCategory(item.id)}
          >
            <span className="sidebar-icon">{item.icon}</span>
            {item.label}
          </li>
        ))}
      </ul>
    </aside>
  );
}
