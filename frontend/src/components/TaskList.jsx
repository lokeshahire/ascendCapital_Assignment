// TaskList.jsx
import React, { useState } from "react";
import TaskItem from "./TaskItem";
import "./TaskList.css";

const TaskList = ({ list, onDragStart, onDragOver, onDrop }) => {
  // console.log("list", list);  "list" is object in this "listArr" is array
  const [hobbies, setHobbies] = useState("");
  const [completed, setCompleted] = useState("");

  // const handleDrop = (event) => {
  //   event.preventDefault();
  //   const taskId = event.dataTransfer.getData("text/plain");
  //   onTaskDrop(taskId, list.id);
  // };

  const handleDelete = (taskId) => {
    // Call the onDeleteTask function passed from the parent component
    // onDeleteTask(taskId, list.id);
    // setList((prevList) => ({
    //   ...prevList,
    //   tasks: prevList.tasks.filter((task) => task._id !== taskId),
    // }));
  };

  const handleSubmit = () => {
    const updatedListArr = [...list.listArr, hobbies]; // Create a new array with the updated listArr

    const payload = {
      listArr: updatedListArr, // Update the payload with the updated listArr
    };

    fetch(`https://ascendbackendnew.onrender.com/task/updateTask/${list._id}`, {
      method: "PUT",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(payload), // Send the updated payload as the request body
    })
      .then((res) => res.json())
      .then((res) => console.log(res))
      .catch((err) => console.log(err));

    window.location.reload();

    // console.log(updatedListArr);
  };

  return (
    <div
      className="task-list"
      onDragOver={onDragOver}
      onDrop={(event) => onDrop(event, list._id)}
    >
      <h2>{list.name}</h2>

      <div>
        <input
          type="text"
          placeholder="enter title"
          value={hobbies}
          onChange={(e) => setHobbies(e.target.value)}
        />
        <button onClick={handleSubmit}>Add Notes</button>
      </div>

      {list.listArr.map((task) => (
        <TaskItem
          key={task._id}
          task={task}
          // onDelete={handleDeleteTask}
          onDragStart={onDragStart}
        />
      ))}
    </div>
  );
};

export default TaskList;
