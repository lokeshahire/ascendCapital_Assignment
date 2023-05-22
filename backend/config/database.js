const mongoose = require("mongoose");
const dbConnection = mongoose.connect(
  "mongodb+srv://lokesh:ahire@cluster0.entjnlc.mongodb.net/AscentCapital?retryWrites=true&w=majority"
);

module.exports = {
  dbConnection,
};
