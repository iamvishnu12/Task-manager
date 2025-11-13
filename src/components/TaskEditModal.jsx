import React, { useState, useEffect } from "react";
import "./TaskEditModal.css";

export default function TaskEditModal({
  selectedTask,
  onCancel,
  onTaskSaved,
  updateTaskFn
}) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("work");
  const [status, setStatus] = useState("todo");
  const [dueDate, setDueDate] = useState("");

  useEffect(() => {
    if (selectedTask) {
      setTitle(selectedTask.title);
      setDescription(selectedTask.description || "");
      setCategory(selectedTask.category || "work");
      setStatus(selectedTask.status || "todo");
      setDueDate(selectedTask.dueDate || "");
    }
  }, [selectedTask]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await updateTaskFn(selectedTask.id, {
      title,
      description,
      category,
      status,
      dueDate,
      completed: status === "done"
    });
    onTaskSaved();
  };

  return (
    <div className="edit-overlay">
      <div className="edit-modal">
        <h2>Edit Task</h2>

        <form onSubmit={handleSubmit} className="edit-form">

          <label>Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />

          <label>Description</label>
          <textarea
            rows="3"
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
              <label>Status</label>
              <select value={status} onChange={(e) => setStatus(e.target.value)}>
                <option value="todo">To Do</option>
                <option value="inprogress">In Progress</option>
                <option value="done">Done</option>
              </select>
            </div>
          </div>

          <label>Due Date</label>
          <input type="date" value={dueDate} onChange={(e) => setDueDate(e.target.value)} />

          <div className="edit-actions">
            <button type="button" className="cancel-btn" onClick={onCancel}>
              Cancel
            </button>
            <button type="submit" className="save-btn">Save</button>
          </div>

        </form>
      </div>
    </div>
  );
}
