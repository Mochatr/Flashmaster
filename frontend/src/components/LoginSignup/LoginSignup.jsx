import React, { useState } from "react";
import "./LoginSignup.css";

import user_icon from "../assets/person.png";
import email_icon from "../assets/email.png";
import password_icon from "../assets/password.png";

import { useNavigate } from "react-router-dom";

const LoginSignup = () => {
  const [action, setAction] = useState("Login");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    // login or signup logic here
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
      console.log("Logging in with", { email, password });
      // Add your login API call here
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
          console.log("Login response:", data);
          navigate("/dashboard");
        })
        .catch((error) => {
          console.error("Login error:", error);
        });
    } else {
      // Perform signup
      console.log("Signing up with", { username, email, password });
      // Add your signup API call here
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
          console.log("Signup response:", data);
          navigate("/dashboard");
        })
        .catch((error) => {
          console.error("Signup error:", error);
        });
    }
  };

  return (
    <div className="container">
      <form onSubmit={handleSubmit}>
        {" "}
        {/* Form element with onSubmit handler */}
        <div className="header">
          <div className="text">{action}</div>
          <div className="underline"></div>
        </div>
        <div className="inputs">
          {action === "Sign Up" && (
            <div className="input">
              <img src={user_icon} alt="" />
              <input type="text" placeholder="Name" />
            </div>
          )}
          <div className="input">
            <img src={email_icon} alt="" />
            <input type="email" placeholder="Email" />
          </div>
          <div className="input">
            <img src={password_icon} alt="" />
            <input type="password" placeholder="Password" />
          </div>
        </div>
        <div className="submit-container">
          <button type="submit" className="submit">
            {action}
          </button>{" "}
          {/* Submit button */}
          <div
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
