import React, { useEffect, useState } from "react";
import TaskList from "./TaskList";
import "./TaskBoard.css";

const TaskBoard = () => {
  const [lists, setLists] = useState([]);

  const [name, setName] = useState("");
  const [completed, setCompleted] = useState("");

  // console.log("setLists", lists); // arr of obj  [{},{},{}]

  useEffect(() => {
    // Fetch the user's lists from the server
    fetch("https://ascendbackendnew.onrender.com/task/")
      .then((response) => response.json())
      .then((data) => setLists(data.tasks))
      .catch((error) => console.error("Error fetching lists:", error));
  }, []);

  const handleTaskDrop = (taskId, newListId) => {
    // Make an API request to update the task's list ID in the database

    console.log("taskid", taskId);
    fetch(`https://ascendbackendnew.onrender.com/task/updateTask/${taskId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ listId: newListId }),
    })
      .then((response) => response.json())
      .then((data) => {
        // Handle the API response, e.g., update the local state or display a success message
        console.log("Task moved successfully:", data);
      })
      .catch((error) => {
        // Handle any errors that occur during the API request
        console.error("Error moving task:", error);
      });
  };

  const handleSubmit = () => {
    const payload = {
      name,
      completed,
    };
    // console.log(payload);
    fetch("https://ascendbackendnew.onrender.com/task/createTask", {
      method: "POST",
      body: JSON.stringify(payload),
      headers: {
        "Content-type": "application/json",
        Authorization: localStorage.getItem("token"),
      },
    })
      .then((res) => res.json())
      .then((res) => console.log(res))
      .catch((err) => console.log(err));

    window.location.reload();
  };

  const handleDrop = (event, targetListId, list) => {
    const sourceListId = event.dataTransfer.getData("listId");
    const draggedTaskIndex = event.dataTransfer.getData("taskIndex");

    // Prevent the default behavior of the drop event
    event.preventDefault();

    // Update the list ID of the dropped task in the database

    console.log("sourceListId", list);
    fetch(`https://ascendbackendnew.onrender.com/task/updateTask/`, {
      method: "PUT",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({ listId: targetListId }),
    })
      .then((res) => res.json())
      .then((data) => {
        setLists((prevLists) => {
          const updatedLists = [...prevLists];
          const sourceListIndex = updatedLists.findIndex(
            (list) => list._id === sourceListId
          );
          const targetListIndex = updatedLists.findIndex(
            (list) => list._id === targetListId
          );
          const [droppedTask] = updatedLists[sourceListIndex].tasks.splice(
            draggedTaskIndex,
            1
          );
          updatedLists[targetListIndex].tasks.push(droppedTask);
          return updatedLists;
        });
      })
      .catch((error) => console.error("Error updating task list:", error));
  };

  const handleDragStart = (event, taskId) => {
    event.dataTransfer.setData("text/plain", taskId);
  };

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  const handleDeleteList = (list) => {
    // Send a DELETE request to the server to delete the list from the database

    console.log("listID", list._id);

    fetch(`https://ascendbackendnew.onrender.com/task/deleteTask/${list._id}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((data) => {
        // If the deletion is successful, update the state to remove the deleted list
        setLists((prevLists) =>
          prevLists.filter((list) => list._id !== list._id)
        );
      })
      .catch((error) => console.error("Error deleting list:", error));
  };

  return (
    <div className="task-board">
      <div>
        <h1>Create Notes Here</h1>
        <input
          type="text"
          placeholder="enter title"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="text"
          placeholder="enter body"
          value={completed}
          onChange={(e) => setCompleted(e.target.value)}
        />

        <button onClick={handleSubmit}>Add Notes</button>
      </div>

      <h1>Task Board</h1>
      <div className="taskNewBoard">
        {lists.map((list) => (
          <TaskList
            key={list._id}
            list={list}
            // onDeleteTask={handleDeleteList(list)}
            onDragStart={handleDragStart}
            onDragOver={handleDragOver}
            onDrop={handleDrop}
          />
        ))}
      </div>
    </div>
  );
};

export default TaskBoard;
