import React from "react";
import "./TaskItem.css";

const TaskItem = ({ task, onDelete }) => {
  const handleComplete = () => {
    // Implement logic to mark task as completed and update in the database
    console.log("Task marked as completed:", task.id);
  };

  const handleDelete = () => {
    // Implement logic to delete task from the list and database
    onDelete(task.id);
  };
  const onDragStart = (event, sourceListId) => {
    event.dataTransfer.setData("listId", sourceListId);
  };

  // console.log("TaskAll:", task);

  return (
    <div
      className={`task-item ${task.completed ? "completed" : ""}`}
      draggable
      onDragStart={(event) => onDragStart(event, task._id)}
    >
      <div className="task-title">{task}</div>
      <div className="task-actions">
        <button onClick={handleComplete}>Complete</button>
        <button onClick={handleDelete}>Delete</button>
      </div>
    </div>
  );
};

export default TaskItem;
