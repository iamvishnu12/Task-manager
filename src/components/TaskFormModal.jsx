import React, { useState } from "react";
import "./TaskModal.css";

export default function TaskFormModal({ onClose, addTask }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("work");
  const [dueDate, setDueDate] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    addTask({
      title,
      description,
      category,
      dueDate,
      status: "todo",
      completed: false,
      createdAt: new Date().toISOString()
    });

    onClose();
  };

  return (
    <div className="modal-overlay">
      <div className="modal-container">
        <h2 className="modal-title">Add Task</h2>

        <form onSubmit={handleSubmit} className="modal-form">

          <input
            className="modal-input"
            type="text"
            placeholder="Task title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />

          <textarea
            className="modal-textarea"
            placeholder="Task description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={3}
          ></textarea>

          <div className="modal-row">
            <div className="modal-col">
              <label>Category</label>
              <select
                className="modal-select"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
                <option value="work">Work</option>
                <option value="personal">Personal</option>
              </select>
            </div>

            <div className="modal-col">
              <label>Due Date</label>
              <input
                className="modal-input"
                type="date"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="modal-actions">
            <button
              type="button"
              className="modal-btn cancel"
              onClick={onClose}
            >
              Cancel
            </button>

            <button type="submit" className="modal-btn primary">
              Add Task
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

