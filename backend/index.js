const express = require("express");
const app = express();
const cors = require("cors");
app.use(express.json());
app.use(cors());

// Middleware
// const { isAuthenticated } = require("./middleware/isAuthenticated");

// Routes

const { userRouter } = require("./routes/auth");
const { taskRouter } = require("./routes/tasks");
const { dbConnection } = require("./config/database");

app.get("/", (req, res) => {
  res.send("Welcome");
});

app.use("/user", userRouter);
// app.use(isAuthenticated);
app.use("/task", taskRouter);

app.listen(5000, async () => {
  try {
    await dbConnection;
    console.log("Connected to db");
  } catch (e) {
    console.log(e.message);
  }
  console.log("listening on port 5000");
});
