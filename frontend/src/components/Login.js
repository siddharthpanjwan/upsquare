import React, { useState } from "react";
import "./Login.css";
import axios from "axios";
function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const login = () => {
    axios
      .post(
        "http://localhost:5000/api/login",
        {
          email,
          password,
        },
        {
          headers: {
            "content-type": "application/json",
          },
        }
      )
      .then((response) => {
        if (response.data.accessToken) {
          //login successfull
          console.log("login successfull");
          localStorage.setItem("token", response.data.accessToken);
        }
      });
  };
  return (
    <div className="login">
      <div className="login__formContainer">
        <h1>Login</h1>
        <input
          className="login__email"
          type="email"
          placeholder="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          className="login__password"
          type="password"
          placeholder="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button onClick={login} className="login__submit">
          Submit
        </button>
      </div>
    </div>
  );
}
export default Login;
