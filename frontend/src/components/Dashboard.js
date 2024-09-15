import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import RandomCardsPopup from './randomCardsPopup';
import Flashcard from './flashcard';
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
  const [showRandomPopup, setShowRandomPopup] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
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
          owner: 'Sohail',
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
          owner: 'Sohail',
        }),
      });
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

  const handleRandomCardsClick = () => {
    setShowRandomPopup(true);
  };

  const handleCardModification = async (deckId, cardId) => {
    const updatedQuestion = prompt('Enter new question:');
    const updatedAnswer = prompt('Enter new answer:');
    const updatedTags = prompt('Enter new tags (comma-separated):');
    const updatedDifficulty = prompt('Enter new difficulty (easy, medium, hard):');

    if (updatedQuestion && updatedAnswer) {
      try {
        await fetch(`http://localhost:5000/api/decks/${deckId}/cards/${cardId}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            question: updatedQuestion,
            answer: updatedAnswer,
            tags: updatedTags ? updatedTags.split(',').map(tag => tag.trim()) : [],
            difficulty: updatedDifficulty,
          }),
        });
        await handleDeckSelection(deckId); // Refresh deck data after modification
      } catch (error) {
        console.error('Error updating card:', error);
      }
    }
  };

  const handleCardDeletion = async (deckId, cardId) => {
    if (window.confirm('Are you sure you want to delete this card?')) {
      try {
        await fetch(`http://localhost:5000/api/decks/${deckId}/cards/${cardId}`, {
          method: 'DELETE',
        });
        await handleDeckSelection(deckId); // Refresh deck data after deletion
      } catch (error) {
        console.error('Error deleting card:', error);
      }
    }
  };

  const handleDeckModification = async (deckId) => {
    const updatedTitle = prompt('Enter new deck title:');
    const updatedDescription = prompt('Enter new deck description:');

    if (updatedTitle) {
      try {
        await fetch(`http://localhost:5000/api/decks/${deckId}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            deckName: updatedTitle,
            description: updatedDescription,
          }),
        });
        await fetchDecks(); // Refresh all decks data
        if (selectedDeckId === deckId) {
          await handleDeckSelection(deckId); // Refresh selected deck data
        }
      } catch (error) {
        console.error('Error updating deck:', error);
      }
    }
  };

  const handleDeckDeletion = async (deckId) => {
    if (window.confirm('Are you sure you want to delete this deck?')) {
      try {
        await fetch(`http://localhost:5000/api/decks/${deckId}`, {
          method: 'DELETE',
        });
        await fetchDecks(); // Refresh all decks data
        if (selectedDeckId === deckId) {
          setSelectedDeck(null);
          setSelectedDeckId('');
        }
      } catch (error) {
        console.error('Error deleting deck:', error);
      }
    }
  };

  return (
    <div className="dashboard">
      <nav className="dashboard-navbar">
        <div className="nav-left" onClick={handleHomeClick} style={{ cursor: 'pointer' }}>FlashMaster</div>
        <div className="nav-right">
          <div className="logout-button" onClick={handleLogoutClick} style={{ cursor: 'pointer' }}>Log out</div>
        </div>
      </nav>

      <div className="main-content">
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
            <button onClick={handleRandomCardsClick} className="random-cards-button">Random Cards</button>

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

        <div className="sidebar">
          <button className="ai-pro-button">← AI Pro</button>
          {decks.map(deck => (
            <button
              key={deck._id}
              className="deck-button"
              onClick={() => handleDeckSelection(deck._id)}
            >
              {deck.deckName}
              <button onClick={() => handleDeckModification(deck._id)}>Modify</button>
              <button onClick={() => handleDeckDeletion(deck._id)}>Delete Deck</button>
            </button>
          ))}
        </div>
      </div>

      
      {selectedDeck && (
  <div className="selected-deck">
    {selectedDeck.cards && selectedDeck.cards.length > 0 ? (
      <Flashcard 
        selectedDeck={selectedDeck} 
        onModify={(deckId, cardId) => handleCardModification(deckId, cardId)}
        onDelete={(deckId, cardId) => handleCardDeletion(deckId, cardId)} 
      />
    ) : (
      <p>No cards in this deck.</p>
    )}
  </div>
)}


<footer className='footer'>
© 2024 FlashMaster. All rights reserved.
</footer>
{showRandomPopup && (
            <RandomCardsPopup decks={decks} setShowRandomPopup={setShowRandomPopup} />
        )}
        
    </div>
  );
};

export default Dashboard;
