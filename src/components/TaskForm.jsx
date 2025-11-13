import React, { useState, useEffect } from "react";
import "./TaskModal.css";

export default function TaskForm({
  selectedTask,
  onCancel,
  onTaskSaved,
  addTaskFn,
  updateTaskFn,
}) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("work");
  const [status, setStatus] = useState("todo");
  const [dueDate, setDueDate] = useState("");

  useEffect(() => {
    if (selectedTask) {
      setTitle(selectedTask.title || "");
      setDescription(selectedTask.description || "");
      setCategory(selectedTask.category || "work");
      setStatus(selectedTask.status || "todo");
      setDueDate(selectedTask.dueDate || "");
    }
  }, [selectedTask]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      title,
      description,
      category,
      status,
      dueDate,
      completed: status === "done",
    };

    if (selectedTask) {
      await updateTaskFn(selectedTask.id, payload);
    } else {
      await addTaskFn(payload);
    }

    onTaskSaved();
  };

  return (
    <div className="modal-overlay">
      <div className="modal-container">
        <h2 className="modal-title">Edit Task</h2>

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
              <label>Status</label>
              <select
                className="modal-select"
                value={status}
                onChange={(e) => setStatus(e.target.value)}
              >
                <option value="todo">To Do</option>
                <option value="inprogress">In Progress</option>
                <option value="done">Done</option>
              </select>
            </div>
          </div>

          <input
            className="modal-input"
            type="date"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
            required
          />

          <div className="modal-actions">
            <button type="button" className="modal-btn cancel" onClick={onCancel}>
              Cancel
            </button>

            <button type="submit" className="modal-btn primary">
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
