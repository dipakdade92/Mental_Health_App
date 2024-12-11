import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleManualLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:5000/api/auth/login",
        { email, password }
      );

      localStorage.setItem("token", JSON.stringify(response.data.user));

      alert("Login successful");
      navigate("/dashboard");
    } catch (error) {
      console.error(
        "Error logging in:",
        error.response?.data?.message || error.message
      );
      alert(error.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="form-container">
      <h2>Login</h2>
      <form onSubmit={handleManualLogin}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Login</button>

        <p className="page-link">
          You have already registered. Do you want to{" "}
          <Link to="/signup" className="signup-link">
            Signup
          </Link>
          ?
        </p>
      </form>
    </div>
  );
};

export default Login;
