// const { Sequelize } = require("sequelize");
// const db = require("../config/database");

// const User = db.define("user", {
//   username: {
//     type: Sequelize.STRING,
//     allowNull: false,
//     unique: true,
//   },
//   password: {
//     type: Sequelize.STRING,
//     allowNull: false,
//   },
// });

// module.exports = User;

const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  name: String,
  email: String,
  password: String,
});

const UserModel = mongoose.model("user", userSchema);

module.exports = {
  UserModel,
};
