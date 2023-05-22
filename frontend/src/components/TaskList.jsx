// TaskList.jsx
import React from "react";
import TaskItem from "./TaskItem";
import "./TaskList.css";

const TaskList = ({ list, onTaskDrop, onDeleteTask }) => {
  // console.log("list", list);
  const handleDragStart = (event, taskId) => {
    event.dataTransfer.setData("text/plain", taskId);
  };

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  const handleDrop = (event) => {
    event.preventDefault();
    const taskId = event.dataTransfer.getData("text/plain");
    onTaskDrop(taskId, list.id);
  };

  return (
    <div className="task-list" onDragOver={handleDragOver} onDrop={handleDrop}>
      <div className="list-title">{list.name}</div>
      <div className="task-items">
        {/* {list.map((task) => (
          <TaskItem key={task.id} task={task} />
        ))} */}

        <TaskItem
          key={list._id}
          task={list}
          onDelete={() => onDeleteTask(list._id)}
          onDragStart={(event) => handleDragStart(event, list._id)}
        />
      </div>
    </div>
  );
};

export default TaskList;
