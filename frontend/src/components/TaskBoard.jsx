import React, { useEffect, useState } from "react";
import TaskList from "./TaskList";
import "./TaskBoard.css";

const TaskBoard = () => {
  const [lists, setLists] = useState([]);

  const [name, setName] = useState("");
  const [completed, setCompleted] = useState("");

  useEffect(() => {
    // Fetch the user's lists from the server
    fetch("http://localhost:5000/task/")
      .then((response) => response.json())
      .then((data) => setLists(data.tasks))
      .catch((error) => console.error("Error fetching lists:", error));
  }, []);

  const handleTaskDrop = (taskId, newListId) => {
    // Make an API request to update the task's list ID in the database
    fetch(`http://localhost:5000/task/updateTask/${taskId}`, {
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
    fetch("http://localhost:5000/task/createTask", {
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

  const handleDeleteTask = (taskId) => {
    // Remove the task from the state

    const updatedLists = lists.map((list) => {
      if (list.id === taskId) {
        const updatedTasks = list.tasks.filter((task) => task.id !== taskId);
        return { ...list, tasks: updatedTasks };
      }
      return list;
    });
    console.log("updatedLists", updatedLists);
    setLists(updatedLists);
    window.location.reload();

    fetch(`http://localhost:5000/task/deleteTask/${taskId}`, {
      method: "DELETE",
    })
      .then((response) => {
        if (response.ok) {
          console.log("Task deleted successfully.");
        } else {
          console.error("Failed to delete task.");
        }
      })
      .catch((error) => {
        console.error("Error deleting task:", error);
      });
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

      <h1>Notes Here</h1>
      {lists ? (
        lists.map((e) => {
          return (
            <div key={e._id}>
              {/* <h2>Title : {e.name}</h2> */}
              <TaskList
                key={e._id}
                list={e}
                onDeleteTask={handleDeleteTask}
                onTaskDrop={handleTaskDrop}
              />
              {/* <button onClick={() => deleteHandle(e._id)}>Delete</button> */}
              <hr />
            </div>
          );
        })
      ) : (
        <h1> Notes Not Available</h1>
      )}
    </div>
  );
};

export default TaskBoard;
