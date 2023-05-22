// const { Sequelize } = require("sequelize");
// const db = require("../config/database");

// const Task = db.define("task", {
//   title: {
//     type: Sequelize.STRING,
//     allowNull: false,
//   },
//   completed: {
//     type: Sequelize.BOOLEAN,
//     defaultValue: false,
//   },
//   listId: {
//     type: Sequelize.INTEGER,
//     allowNull: false,
//   },
// });

// module.exports = Task;

const mongoose = require("mongoose");

const taskSchema = mongoose.Schema({
  name: String,
  completed: Boolean,
  listArr: {
    type: [String],
    required: true,
    default: [],
  }, //   listId: Number,
});

const TaskModel = mongoose.model("task", taskSchema);

module.exports = {
  TaskModel,
};
