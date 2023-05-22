const express = require("express");
const { TaskModel } = require("../models/Task");
// const { TaskModel } = require("../model/");
const taskRouter = express.Router();

taskRouter.get("/", async (req, res) => {
  try {
    // Retrieve all tasks from the database
    const tasks = await TaskModel.find();

    // Return the tasks
    res.status(200).json({ tasks });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
});

taskRouter.post("/createTask", async (req, res) => {
  //   const { title, listId } = req.body;

  try {
    // Create a new task in the database
    // const task = await TaskModel.create({ title, listId });
    const task = new TaskModel(req.body);
    await task.save();
    // Return the created task
    res.status(201).json({ task });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
});

taskRouter.put("/updateTask/:id", async (req, res) => {
  const taskId = req.params.id;
  //   const { title, completed, listId } = req.body;
  const task = await TaskModel.findOne({ _id: taskId });

  try {
    // Update the task in the database
    await TaskModel.findByIdAndUpdate({ _id: taskId }, req.body);
    // Return a success message
    res.status(200).json({ message: "Task updated successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
});

taskRouter.delete("/deleteTask/:id", async (req, res) => {
  const taskId = req.params.id;

  try {
    // Update the task in the database
    await TaskModel.findByIdAndDelete({ _id: taskId });
    // Return a success message
    res.status(200).json({ message: "Task Deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
});

module.exports = { taskRouter };
