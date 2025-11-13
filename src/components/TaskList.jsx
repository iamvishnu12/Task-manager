 import React from "react";
import TaskCard from "./TaskCard";
import "./TaskListView.css";

export default function TaskListView({ tasks, updateTask, deleteTask, toggleSelect, selectedIds }){
  return (
    <div className="task-list-view">
      {tasks.length === 0 ? <p>No tasks yet</p> : tasks.map(t=>(
        <TaskCard key={t.id} task={t} updateTask={updateTask} deleteTask={deleteTask} toggleSelect={toggleSelect} selectedIds={selectedIds} />
      ))}
    </div>
  );
}
