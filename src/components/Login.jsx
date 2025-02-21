import { useState } from "react";
import { Link } from 'react-router-dom';
import "../styles/authentication-style.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const validateEmail = (email) => /^[a-zA-Z0-9\_]+@[a-zA-Z]+\.[a-zA-Z]{2,}$/.test(email);
  const validatePassword = (password) => /^[a-zA-Z0-9\_\-]{4,16}$/.test(password);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!validateEmail(email) || !validatePassword(password)) {
      setError("Please enter valid credentials.");
      return;
    }

    try {
      const response = await fetch("http://localhost:3001/Login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
        credentials: "include",
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Login failed");

      console.log("Login successful:", data);
      //TODO: cookies ??
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="parent-container">
      <h1>Login</h1>
      {error && <div className="error">{error}</div>}
      <form onSubmit={handleSubmit}>
        <label>Email:</label>
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        
        <label>Password:</label>
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        
        <button type="submit">Login</button>
      </form>
      <p>
        Don't have an account? <Link to="/register">Sign up here</Link>
      </p>
    </div>
  );
};

export default Login;
