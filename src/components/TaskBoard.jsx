import React, { useState, useMemo } from "react";
import useTasks from "../hooks/useTasks";
import TaskFormModal from "./TaskFormModal";
import TaskCard from "./TaskCard";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import "./TaskBoard.css";
import TaskEditModal from "./TaskEditModal";

const COLUMNS = [
  { id: "todo", title: "To Do", color: "#F3EBFF" },
  { id: "inprogress", title: "In Progress", color: "#F7FBFF" },
  { id: "done", title: "Done", color: "#EBFFF0" },
];

export default function TaskBoard({ user, selectedCategory = "all", searchTerm = "" }) {
  const { tasks, addTask, updateTask, deleteTask } = useTasks(user.uid);
  const [view, setView] = useState("board");
  const [editingTask, setEditingTask] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);

  // Filter tasks
  const visibleTasks = useMemo(() => {
    if (!tasks) return [];

    let filtered = [...tasks];

    if (selectedCategory !== "all") {
      if (selectedCategory === "completed") {
        filtered = filtered.filter((t) => t.completed);
      } else {
        filtered = filtered.filter(
          (t) => t.category?.toLowerCase() === selectedCategory.toLowerCase()
        );
      }
    }

    if (searchTerm.trim()) {
      filtered = filtered.filter((t) =>
        t.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    return filtered;
  }, [tasks, selectedCategory, searchTerm]);

  // Group tasks
  const grouped = useMemo(() => {
    const map = { todo: [], inprogress: [], done: [] };
    visibleTasks.forEach((t) => {
      const s = t.status || "todo";
      map[s].push(t);
    });
    return map;
  }, [visibleTasks]);

  // Drag drop
  const onDragEnd = async (result) => {
    if (!result.destination) return;
    await updateTask(result.draggableId, { status: result.destination.droppableId });
  };

  const handleMark = async (taskId, newStatus) => {
    await updateTask(taskId, { status: newStatus, completed: newStatus === "done" });
  };

  return (
    <div className="task-board-wrapper">
      {/* Toolbar */}
      <div className="board-toolbar">
        <div className="board-left">
          <button className={`tab ${view === "board" ? "active" : ""}`} onClick={() => setView("board")}>
            Board
          </button>
          <button className={`tab ${view === "list" ? "active" : ""}`} onClick={() => setView("list")}>
            List
          </button>
        </div>

        <button className="add-primary" onClick={() => setShowAddModal(true)}>Add Task</button>
      </div>

      {/* Add Task Modal */}
      {showAddModal && (
        <TaskFormModal
          onClose={() => setShowAddModal(false)}
          addTask={async (payload) => {
            await addTask(payload);
            setShowAddModal(false);
          }}
        />
      )}

      {/* Edit Task Modal */}
      {editingTask && (
        <TaskEditModal
          selectedTask={editingTask}
          onCancel={() => setEditingTask(null)}
          onTaskSaved={() => setEditingTask(null)}
          updateTaskFn={updateTask}
        />
      )}

      {/* LIST VIEW */}
      {view === "list" ? (
        <div className="list-view-wrapper">
          <table className="task-table">
            <thead>
              <tr>
                <th>Title</th>
                <th>Description</th>
                <th>Category</th>
                <th>Due Date</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {visibleTasks.length === 0 && (
                <tr>
                  <td colSpan="6" className="empty-row">No tasks found</td>
                </tr>
              )}

              {visibleTasks.map((task) => (
                <tr key={task.id}>
                  <td>{task.title}</td>
                  <td>{task.description || "—"}</td>
                  <td>{task.category}</td>
                  <td>{task.dueDate}</td>

                  <td>
                    <select
                      className="status-select"
                      value={task.status || "todo"}
                      onChange={(e) => handleMark(task.id, e.target.value)}
                    >
                      <option value="todo">To Do</option>
                      <option value="inprogress">In Progress</option>
                      <option value="done">Done</option>
                    </select>
                  </td>

                  <td>
                    <button className="table-btn edit" onClick={() => setEditingTask(task)}>✏️</button>
                    <button className="table-btn del" onClick={() => deleteTask(task.id)}>🗑️</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        /* BOARD VIEW */
        <DragDropContext onDragEnd={onDragEnd}>
          <div className="board-columns">
            {COLUMNS.map((col) => (
              <Droppable droppableId={col.id} key={col.id}>
                {(provided) => (
                  <div className="board-column" ref={provided.innerRef} {...provided.droppableProps}>
                    <div className="column-header" style={{ background: col.color }}>
                      <div className="col-title">
                        {col.title} ({grouped[col.id]?.length})
                      </div>

                      {col.id === "todo" && (
                        <button className="add-inline" onClick={() => setShowAddModal(true)}>
                          + ADD TASK
                        </button>
                      )}
                    </div>

                    <div className="column-body">
                      {grouped[col.id].map((task, idx) => (
                        <Draggable key={task.id} draggableId={task.id} index={idx}>
                          {(prov) => (
                            <div ref={prov.innerRef} {...prov.draggableProps} {...prov.dragHandleProps}>
                              <TaskCard
                                task={task}
                                onEdit={() => setEditingTask(task)}
                                deleteTask={deleteTask}
                                onMark={handleMark}
                              />
                            </div>
                          )}
                        </Draggable>
                      ))}

                      {provided.placeholder}

                      {grouped[col.id].length === 0 && (
                        <div className="empty-column">No Tasks in {col.title}</div>
                      )}
                    </div>
                  </div>
                )}
              </Droppable>
            ))}
          </div>
        </DragDropContext>
      )}
    </div>
  );
}
