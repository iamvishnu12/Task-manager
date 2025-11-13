// src/components/TaskFormModal.jsx
import React, { useState } from "react";
import "./TaskFormModal.css";

export default function TaskFormModal({ onClose, addTask }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("work");
  const [dueDate, setDueDate] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim()) return;

    await addTask({
      title: title.trim(),
      description: description.trim(),
      category: (category || "work").toLowerCase(),
      dueDate: dueDate || "",
      status: "todo",
      completed: false,
    });

    // clear & close
    setTitle("");
    setDescription("");
    setCategory("work");
    setDueDate("");
    onClose();
  };

  return (
    <div className="modal-overlay">
      <div className="modal-box">
        <h3>Add New Task</h3>

        <form onSubmit={handleSubmit} className="modal-form">
          <label>Title</label>
          <input
            type="text"
            placeholder="Task title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />

          <label>Description</label>
          <textarea
            rows="3"
            placeholder="Add description (optional)"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />

          <div className="row">
            <div className="col">
              <label>Category</label>
              <select value={category} onChange={(e) => setCategory(e.target.value)}>
                <option value="work">Work</option>
                <option value="personal">Personal</option>
              </select>
            </div>

            <div className="col">
              <label>Due date</label>
              <input type="date" value={dueDate} onChange={(e) => setDueDate(e.target.value)} />
            </div>
          </div>

          <div className="modal-actions">
            <button type="button" className="cancel-btn" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="add-btn">
              Add Task
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
