// TaskItem.jsx
import React from "react";
import "./TaskItem.css";

const TaskItem = ({ task, onDelete, onDragStart }) => {
  // console.log("task", task);
  const handleComplete = () => {
    // Implement logic to mark task as completed and update in the database
    console.log("Task marked as completed:", task._id);
  };

  const handleDelete = () => {
    // Implement logic to delete task from the list and database
    onDelete(task._id);
  };

  return (
    <div
      className={`task-item ${task.completed ? "completed" : ""}`}
      draggable="true"
      onDragStart={onDragStart}
    >
      <div className="task-title">{task.name}</div>
      <div className="task-actions">
        <button onClick={handleComplete}>Complete</button>
        <button onClick={handleDelete}>Delete</button>
      </div>
    </div>
  );
};

export default TaskItem;
