import React from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate hook for navigation
import '../styling/Homepage.css'; // Import your CSS file for styling

const Homepage = () => {
  const navigate = useNavigate(); // Initialize the navigate function from react-router-dom

  // Simulate user authentication status for demonstration purposes
  const isLoggedIn = false; // Replace with actual logic to check if the user is logged in

  // Navigation handlers
  const handleLoginSignUpClick = () => {
    navigate('/Authenticate'); // Redirect to the login/signup page
  };

  const handleTeamClick = () => {
    navigate('/team'); // Redirect to the Team page
  };

  const handleAboutClick = () => {
    navigate('/about'); // Redirect to the about page
  };

  const handleHomeClick = () => {
    if (isLoggedIn) {
      navigate('/dashboard'); // Redirect to dashboard if logged in
    } else {
      navigate('/'); // Redirect to homepage if not logged in
    }
  };

  return (
    <div className="homepage">
      <nav className="navbar">
        <div className="nav-left" onClick={handleHomeClick} style={{ cursor: 'pointer' }}>FlashMaster</div>
        <ul className="nav-center">
        <li onClick={handleAboutClick}>About</li>
          <li>Features</li>
          <li onClick={handleTeamClick}>Meet the Team </li>
        </ul>
        <div className="nav-right" onClick={handleLoginSignUpClick} style={{ cursor: 'pointer' }}>Login</div>
      </nav>

      <header className="header">
        <h1>Welcome to <span>FlashMaster Pro</span></h1>
        <p>Your personal flashcard learning app!</p>

        <div className="action-section">
          <button className="get-started-button" onClick={handleLoginSignUpClick}>Get Started</button>
        </div>
      </header>

      <footer className="footer">
        <p>&copy; 2024 FlashMaster. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Homepage;
