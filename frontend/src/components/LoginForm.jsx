import React, { useState } from "react";
import "./LoginForm.css";
import { useNavigate } from "react-router";
const LoginForm = () => {
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const navigate = useNavigate();
  const handleSubmit = () => {
    const payload = {
      email,
      password,
    };
    // console.log(payload);
    fetch("https://ascendbackendnew.onrender.com/user/login", {
      method: "POST",
      body: JSON.stringify(payload),
      headers: {
        "Content-type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((res) => {
        localStorage.setItem("token", res.token);
        console.log(res);
      })
      .catch((err) => console.log(err));

    navigate("/task");
  };
  return (
    <form className="login-form" onSubmit={handleSubmit}>
      <h2>Login</h2>
      <input
        type="text"
        placeholder="enter email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="enter password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <button onClick={handleSubmit}>Login</button>
    </form>
  );
};

export default LoginForm;
