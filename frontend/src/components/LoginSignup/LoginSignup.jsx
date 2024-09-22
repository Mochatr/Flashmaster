import React, { useState } from "react";
import "./LoginSignup.css";

import user_icon from "../assets/person.png";
import email_icon from "../assets/email.png";
import password_icon from "../assets/password.png";

import { useNavigate } from "react-router-dom";

const LoginSignup = () => {
  const [action, setAction] = useState("Login");
  const [error, setError] = useState(""); // State for error messages
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const email = document.querySelector('input[type="email"]').value;
    const password = document.querySelector('input[type="password"]').value;
    const username =
      action === "Sign Up"
        ? document.querySelector('input[type="text"]').value
        : null;

    console.log(action === "Login" ? "Logging in" : "Signing up", {
      username,
      email,
      password,
    });

    if (action === "Login") {
      // Perform login
      fetch("http://localhost:5000/api/finduser", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
        credentials: "include",
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.message) {
            setError(data.message); // Set error message from the server
          } else {
            console.log("Login response:", data);
            navigate("/dashboard");
          }
        })
        .catch((error) => {
          console.error("Login error:", error);
          setError("An error occurred during login."); // Generic error message
        });
    } else {
      // Perform signup
      fetch("http://localhost:5000/api/user", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, email, password }),
        credentials: "include",
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.message) {
            setError(data.message); // Set error message from the server
          } else {
            console.log("Signup response:", data);
            navigate("/dashboard");
          }
        })
        .catch((error) => {
          console.error("Signup error:", error);
          setError("An error occurred during signup."); // Generic error message
        });
    }
  };

  return (
    <div className="container">
      <form onSubmit={handleSubmit}>
        <div className="header">
          <div className="text">{action}</div>
          <div className="underline"></div>
        </div>
        <div className="inputs">
          {action === "Sign Up" && (
            <div className="input">
              <img src={user_icon} alt="" />
              <input type="text" placeholder="Name" required />
            </div>
          )}
          <div className="input">
            <img src={email_icon} alt="" />
            <input type="email" placeholder="Email" required />
          </div>
          <div className="input">
            <img src={password_icon} alt="" />
            <input type="password" placeholder="Password" required />
          </div>
        </div>
        {error && <div className="error-message">{error}</div>}
        <div className="submit-container">
          <button type="submit" className="submit">
            {action}
          </button>
          <div
            className="switch"
            onClick={() => setAction(action === "Login" ? "Sign Up" : "Login")}
          >
            Switch to {action === "Login" ? "Sign Up" : "Login"}
          </div>
        </div>
      </form>
    </div>
  );
};

export default LoginSignup;
