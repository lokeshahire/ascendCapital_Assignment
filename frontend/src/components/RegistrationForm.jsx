import React, { useState } from "react";
import "./RegistrationForm.css";
import { useNavigate } from "react-router";
const RegistrationForm = () => {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const handleSubmit = () => {
    const payload = {
      name,
      email,
      password,
    };
    // console.log(payload);
    fetch("https://ascendbackendnew.onrender.com/user/register", {
      method: "POST",
      body: JSON.stringify(payload),
      headers: {
        "Content-type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((res) => console.log(res))
      .catch((err) => console.log(err));

    navigate("/login");
  };

  return (
    <form className="registration-form" onSubmit={handleSubmit}>
      <h2>Registration</h2>
      <input
        type="text"
        placeholder="enter name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        type="password"
        placeholder="enter password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <input
        type="text"
        placeholder="enter email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <button type="submit">Register</button>
    </form>
  );
};

export default RegistrationForm;
