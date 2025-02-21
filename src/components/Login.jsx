import { useState } from "react";
import { Link, useNavigate } from 'react-router-dom';
import "../styles/authentication-style.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const hardcodedEmail = "maria@rodriguez.com";
  const hardcodedPassword = "password";
  const hardcodedToken = "some-jwt-token";

  const validateEmail = (email) => /^[a-zA-Z0-9\_]+@[a-zA-Z]+\.[a-zA-Z]{2,}$/.test(email);
  const validatePassword = (password) => /^[a-zA-Z0-9\_\-]{4,16}$/.test(password);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!validateEmail(email) || !validatePassword(password)) {
      setError("Please enter valid credentials.");
      return;
    }

    if (email === hardcodedEmail && password === hardcodedPassword) {
      localStorage.setItem("token", hardcodedToken);

      navigate("/gallery");

      console.log("Login successful");
    } else {
      setError("Invalid credentials. Please try again.");
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
