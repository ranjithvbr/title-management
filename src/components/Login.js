import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./components.scss";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    const storedUser = JSON.parse(localStorage.getItem("user"));

    if (!storedUser) {
      setError("User not found. Please register first.");
      return;
    }

    // Verify email and password
    if (email === storedUser.email && password === storedUser.password) {
      localStorage.setItem("token", "authenticated");
      window.location.href = "/dashboard";
    } else {
      setError("Invalid email or password.");
    }
  };

  return (
    <div className="field-container">
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <input
          className="basic-field-style"
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          className="basic-field-style"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button className="submit-btn" type="submit">
          Login
        </button>
        {error && <p className="error-msg">{error}</p>}
      </form>
      <p>
        Don't have an account? <Link to="/register">Register here</Link>
      </p>
    </div>
  );
}

export default Login;
