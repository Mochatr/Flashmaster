import React from 'react';
import '../styling/Homepage.css'; // Assuming you have a separate CSS file for styling

const Homepage = () => {
  return (
    <div className="homepage">
      <nav className="navbar">
        <ul>
          <li>About</li>
          <li>Process</li>
          <li>Features</li>
          <li>Meet the Team</li>
        </ul>
      </nav>

      <header className="header">
        <button className="intro-button">Introducing FlashMaster Pro</button>
        <h1>Welcome to <span>FlashMaster Pro</span></h1>
        <p>Your personal flashcard learning app!</p>

        <div className="email-section">
          <input type="email" placeholder="Enter your email" className="email-input" />
          <button className="join-button">Join Waitlist</button>
        </div>
      </header>
    </div>
    
  );
};

export default Homepage;
