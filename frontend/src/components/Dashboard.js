import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import FlashCard from './card';

import '../styling/Dashboard.css';

const Dashboard = () => {
  const [decks, setDecks] = useState([]);
  const [selectedDeckId, setSelectedDeckId] = useState('');
  const [deckTitle, setDeckTitle] = useState('');
  const [deckDescription, setDeckDescription] = useState('');
  const [cardQuestion, setCardQuestion] = useState('');
  const [cardAnswer, setCardAnswer] = useState('');
  const [cardTags, setCardTags] = useState('');
  const [cardDifficulty, setCardDifficulty] = useState('');
  const [selectedDeck, setSelectedDeck] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    // Fetch all decks when the component mounts
    fetchDecks();
  }, []);

  const fetchDecks = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/decks');
      const data = await response.json();
      setDecks(data);
    } catch (error) {
      console.error('Error fetching decks:', error);
    }
  };

  const handleDeckCreation = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/decks', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          deckName: deckTitle,
          description: deckDescription,
          owner: 'Sohail', // Placeholder for actual user ID
        }),
      });
      const newDeck = await response.json();
      setDecks([...decks, newDeck]);
      setDeckTitle('');
      setDeckDescription('');
    } catch (error) {
      console.error('Error creating deck:', error);
    }
  };

  const handleCardCreation = async () => {
    if (!selectedDeckId) {
      alert('Please select a deck first.');
      return;
    }
    try {
      const response = await fetch(`http://localhost:5000/api/decks/${selectedDeckId}/cards`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          question: cardQuestion,
          answer: cardAnswer,
          tags: cardTags ? cardTags.split(',').map(tag => tag.trim()) : [],
          difficulty: cardDifficulty,
          owner: 'Sohail', // Placeholder for actual user ID
        }),
      });
      //const newCard = await response.json();
  
      // Refetch the deck data to ensure we have the latest info
      await handleDeckSelection(selectedDeckId);
  
      setCardQuestion('');
      setCardAnswer('');
      setCardTags('');
      setCardDifficulty('');
    } catch (error) {
      console.error('Error adding card to deck:', error);
    }
  };
  

  const handleDeckSelection = async (deckId) => {
    try {
      const response = await fetch(`http://localhost:5000/api/decks/${deckId}`);
      const data = await response.json();
      setSelectedDeck(data);
      setSelectedDeckId(deckId);
    } catch (error) {
      console.error('Error fetching deck:', error);
    }
  };
  

  const handleLogoutClick = () => {
    navigate('/Authenticate');
  };

  const handleHomeClick = () => {
    navigate('/');
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
            <h2>Create Your Deck</h2>
            <input
              type="text"
              placeholder="Deck Title"
              value={deckTitle}
              onChange={(e) => setDeckTitle(e.target.value)}
              className="input-field"
            />
            <input
              type="text"
              placeholder="Deck Description"
              value={deckDescription}
              onChange={(e) => setDeckDescription(e.target.value)}
              className="input-field"
            />
            <button className="action-button" onClick={handleDeckCreation}>Create Deck</button>
            <h2>Add Card to Deck</h2>
            <select
              value={selectedDeckId}
              onChange={(e) => setSelectedDeckId(e.target.value)}
              className="input-field"
            >
              <option value="">Select Deck</option>
              {decks.map(deck => (
                <option key={deck._id} value={deck._id}>
                  {deck.deckName}
                </option>
              ))}
            </select>
            <input
              type="text"
              placeholder="Question"
              value={cardQuestion}
              onChange={(e) => setCardQuestion(e.target.value)}
              className="input-field"
            />
            <input
              type="text"
              placeholder="Answer"
              value={cardAnswer}
              onChange={(e) => setCardAnswer(e.target.value)}
              className="input-field"
            />
            <input
              type="text"
              placeholder="Tags (comma-separated)"
              value={cardTags}
              onChange={(e) => setCardTags(e.target.value)}
              className="input-field"
            />
            <select
              value={cardDifficulty}
              onChange={(e) => setCardDifficulty(e.target.value)}
              className="input-field"
            >
              <option value="">Difficulty Level</option>
              <option value="easy">Easy</option>
              <option value="medium">Medium</option>
              <option value="hard">Hard</option>
            </select>
            <button className="action-button" onClick={handleCardCreation}>Add Card</button>
          </div>
        </div>

        {/* Sidebar/Right Section */}
        <div className="sidebar">
          <button className="ai-pro-button">← AI Pro</button>
          {decks.map(deck => (
            <button
              key={deck._id}
              className="deck-button"
              onClick={() => handleDeckSelection(deck._id)}
            >
              {deck.deckName}
            </button>
          ))}
        </div>
      </div>

      {/* Bottom Section for Flashcards */}
      <div className="deck-overview">
      {selectedDeck && (
          <>
            <h2>My Cards in "{selectedDeck.deckName}"</h2>
            <div className="card-grid">
              {selectedDeck.cards.map((card, index) => (
                <FlashCard
                  key={index}
                  question={card.question}
                  answer={card.answer}
                />
              ))}
            </div>
          </>
        )}
      </div>

      {/* Footer */}
      <footer className="footer">
        © 2024 FlashMaster. All rights reserved.
      </footer>
    </div>
  );
};

export default Dashboard;
