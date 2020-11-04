import React, { useState } from "react";
import "./Register.css";
import axios from "axios";
function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  const registerUser = () => {
    axios
      .post(
        "http://localhost:5000/api/signup",
        {
          email,
          password,
          firstName,
          lastName,
        },
        {
          headers: {
            "content-type": "application/json",
          },
        }
      )
      .then((response) => console.log(response.data));
  };
  return (
    <div className="register">
      <div className="register__container">
        <h1>Register</h1>
        <input
          className="register__input"
          placeholder="first name"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
        />
        <input
          className="register__input"
          placeholder="Last Name"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
        />
        <input
          className="register__input"
          placeholder="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          className="register__input"
          placeholder="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button className="register__submit" onClick={registerUser}>
          Submit
        </button>
      </div>
    </div>
  );
}

export default Register;
