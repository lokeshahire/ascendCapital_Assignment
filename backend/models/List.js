// const { Sequelize } = require("sequelize");
// const db = require("../config/database");

// const List = db.define("list", {
//   title: {
//     type: Sequelize.STRING,
//     allowNull: false,
//   },
// });

// module.exports = List;

const mongoose = require("mongoose");

const listSchema = mongoose.Schema({
  title: String,
});

const ListModel = mongoose.model("list", listSchema);

module.exports = {
  ListModel,
};
