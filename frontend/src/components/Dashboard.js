import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styling/Dashboard.css'; // Adjust path as needed

const Dashboard = () => {
  const navigate = useNavigate();

  const handleLogoutClick = () => {
    navigate('/login');
  };
  const isLoggedIn = false;
  const handleHomeClick = () => {
    if (isLoggedIn) {
      navigate('/dashboard'); // Redirect to dashboard if logged in
    } else {
      navigate('/'); // Redirect to homepage if not logged in
    }
  };
  return (
    <div className="dashboard">
      {/* Top Section */}
      <nav className="dashboard-navbar">
        <div className="nav-left" onClick={handleHomeClick} style={{ cursor: 'pointer' }}>FlashMaster</div>
        <div className="nav-right">
          <div className="logout-button" onClick={handleLogoutClick} style={{ cursor: 'pointer' }}>Log out</div>
        </div>
      </nav>

      <div className="main-content">
        {/* Left Section - Form */}
        <div className="content">
          <div className="flashcard-creation centered-form">
            <h2>Create Your Flashcards</h2>
            <input type="text" placeholder="Enter Question" className="input-field" />
            <input type="text" placeholder="Enter Answer" className="input-field" />
            <div className="button-group">
              <button className="action-button">Add</button>
              <button className="action-button">Update</button>
              <button className="action-button">Delete</button>
            </div>
            <button className="random-button" >Random Learning (Spaced Repetition)</button>
          </div>
        </div>

        {/* Sidebar/Right Section */}
        <div className="sidebar">
          <button className="ai-pro-button">← AI Pro</button>
          <button className="deck-button">Deck 1 Title</button>
          <button className="deck-button">Deck 2 Title</button>
        </div>
      </div>

      {/* Bottom Section for Flashcards */}
      <div className="deck-overview">
        <h2>My Cards</h2>
        <div className="card-grid">
          <div className="card-preview">Card 1</div>
          <div className="card-preview">Card 2</div>
          <div className="card-preview">Card 3</div>
          <div className="card-preview">Card 4</div>
          <div className="card-preview">Card 5</div>
        </div>
      </div>

      {/* Footer */}
      <footer className="footer">
        © 2024 FlashMaster. All rights reserved.
      </footer>
    </div>
  );
};

export default Dashboard;
