// src/components/TaskCard.jsx
import React from "react";
import "./TaskCard.css";

/**
 * Props:
 * - task {id,title,description,category,dueDate,status,completed}
 * - onEdit(task)
 * - deleteTask(id)
 * - onMark(id, newStatus)
 */
export default function TaskCard({ task, onEdit, deleteTask, onMark }) {
  const categoryColor = task.category === "work" ? "#6366f1" : "#10b981";

  return (
    <div className="task-card">
      <div className="task-top">
        <div className="task-title">{task.title}</div>

        <div style={{ display: "flex", gap: 8 }}>
          <button className="icon-btn" onClick={() => onEdit(task)} title="Edit">
            ✏️
          </button>
          <button className="icon-btn" onClick={() => deleteTask(task.id)} title="Delete">
            🗑️
          </button>
        </div>
      </div>

      {task.description ? <div className="task-description">{task.description}</div> : null}

      <div className="task-tags">
        <span className="category-tag" style={{ background: categoryColor }}>
          {task.category}
        </span>

        {task.dueDate ? <div className="due-date">📅 {task.dueDate}</div> : <div /> }
      </div>

      <div className="task-actions">
        {task.status !== "todo" && (
          <button className="status-btn" onClick={() => onMark(task.id, "todo")}>
            To Do
          </button>
        )}
        {task.status !== "inprogress" && (
          <button className="status-btn inprogress" onClick={() => onMark(task.id, "inprogress")}>
            In Progress
          </button>
        )}
        {task.status !== "done" && (
          <button className="status-btn done" onClick={() => onMark(task.id, "done")}>
            Done
          </button>
        )}
      </div>
    </div>
  );
}
