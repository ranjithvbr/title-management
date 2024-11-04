import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./components.scss";

function Register() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = (e) => {
    e.preventDefault();

    // Save user credentials in localStorage
    const user = { email, password };
    localStorage.setItem("user", JSON.stringify(user));

    alert("Registration successful! You can now log in.");
    navigate("/login");
  };

  return (
    <div className="field-container">
      <h2>Register</h2>
      <form onSubmit={handleRegister}>
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
          Register
        </button>
      </form>
      <p>
        Already have an account? <Link to="/login">Login here</Link>
      </p>
    </div>
  );
}

export default Register;
