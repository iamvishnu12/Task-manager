import React from "react";
import "./TaskCard.css";

export default function TaskCard({
  task,
  onEdit,
  deleteTask,
  onMark,
}) {

  return (
    <div className="task-card">

      
      <div className="task-top">
        <div className="task-title">{task.title}</div>

        
        <button className="icon-btn" onClick={() => onEdit(task)}>
          ✏️
        </button>

    
        <button className="icon-btn" onClick={() => deleteTask(task.id)}>
          🗑️
        </button>
      </div>

  
      {task.description && (
        <div className="task-description">
          {task.description}
        </div>
      )}

  
      <div className="task-tags">

        <span
          className="category-tag"
          style={{
            background: task.category === "work" ? "#6366f1" : "#10b981",
          }}
        >
          {task.category}
        </span>

        {task.dueDate && (
          <div className="due-date">
            📅 {task.dueDate}
          </div>
        )}
      </div>

      
      <div className="task-actions">

        {task.status !== "todo" && (
          <button
            className="status-btn"
            onClick={() => onMark(task.id, "todo")}
          >
            To Do
          </button>
        )}

        {task.status !== "inprogress" && (
          <button
            className="status-btn inprogress"
            onClick={() => onMark(task.id, "inprogress")}
          >
            In Progress
          </button>
        )}

        {task.status !== "done" && (
          <button
            className="status-btn done"
            onClick={() => onMark(task.id, "done")}
          >
            Done
          </button>
        )}

      </div>
    </div>
  );
}
