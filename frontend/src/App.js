import React from "react";
import { Routes, Route } from "react-router-dom";
// import { Route } from "react-router";
import LoginForm from "./components/LoginForm";
import RegistrationForm from "./components/RegistrationForm";
import TaskBoard from "./components/TaskBoard";
import Final from "./components/Final";

const App = () => {
  // Add logic to conditionally render login/registration or task board based on user authentication status
  return (
    <div>
      <Routes>
        <Route path="/" element={<RegistrationForm />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/task" element={<TaskBoard />} />
      </Routes>
    </div>
  );
};

export default App;
