import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import RandomCardsPopup from './randomCardsPopup';
import Flashcard from './flashcard';
import '../styling/Dashboard.css';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';

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
  const [progress, setProgress] = useState({ reviewed: 0, known: 0, hard: 0 });
  const [username, setUsername] = useState('');

  const navigate = useNavigate();

  useEffect(() => {
    fetchUserData();
    fetchDecks();
  }, []);

  const fetchDecks = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/decks', {
        method: 'GET',
        credentials: 'include', // This ensures cookies are sent with the request
      });
      
      if (response.status === 401) {
        navigate('/Authenticate'); // Redirect to login if unauthorized
        return;
      }
  
      const data = await response.json();
      setDecks(data);
      calculateProgress(data);
    } catch (error) {
      console.error('Error fetching decks:', error);
    }
  };

 

  const calculateProgress = (decks) => {
    let reviewed = 0;
    let known = 0;
    let hard = 0;

    decks.forEach(deck => {
      deck.cards.forEach(card => {
        reviewed++;
        if (card.known) known++;
        if (card.hard) hard++;
      });
    });


    setProgress({ reviewed, known, hard });
  };

  const handleDeckCreation = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/decks', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          deckName: deckTitle,
          description: deckDescription,
        }),
        credentials: 'include'
      });
      const newDeck = await response.json();
      setDecks([...decks, newDeck]);
      setDeckTitle('');
      setDeckDescription('');
      toast.success('Deck created successfully!');
    } catch (error) {
      toast.error('Error creating deck');
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
        }),
        credentials: 'include'
      });
      await handleDeckSelection(selectedDeckId);
      setCardQuestion('');
      setCardAnswer('');
      setCardTags('');
      setCardDifficulty('');
      toast.success('Card added successfully');
    } catch (error) {
      toast.error('Error adding card to deck');
      console.error('Error adding card to deck:', error);
    }
  };

  const handleDeckSelection = async (deckId) => {
    try {
      const response = await fetch(`http://localhost:5000/api/decks/${deckId}`,{
        method: 'GET',
        credentials: 'include', // This ensures cookies are sent with the request
      });
      const data = await response.json();
      setSelectedDeck(data);
      setSelectedDeckId(deckId);
    } catch (error) {
      console.error('Error fetching deck:', error);
    }
  };

  const handleLogoutClick = () => {
    fetch('http://localhost:5000/api/logout', {
      method: 'POST',
      credentials: 'include', // This ensures cookies are sent with the request
    }).then(() => {
      navigate('/Authenticate');
    }).catch(error => {
      console.error('Error logging out:', error);
    });
  };

  const handleDeleteClick = async () => {
    if (window.confirm('Are you sure you want to delete your account?')) {
      try {
        await fetch('http://localhost:5000/api/deleteuser', {
          method: 'DELETE',
          credentials: 'include', // This ensures cookies are sent with the request
        });
        navigate('/Authenticate');
      } catch (error) {
        console.error('Error deleting account:', error);
      }
    }
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
          credentials: 'include'
        });
        await handleDeckSelection(deckId); // Refresh deck data after modification
        toast.success('Card updated successfully');
      } catch (error) {
        toast.error('Error updating card');
        console.error('Error updating card:', error);
      }
    }
  };

  const handleCardDeletion = async (deckId, cardId) => {
    if (window.confirm('Are you sure you want to delete this card?')) {
      try {
        await fetch(`http://localhost:5000/api/decks/${deckId}/cards/${cardId}`, {
          method: 'DELETE',
          credentials: 'include'
        });
        await handleDeckSelection(deckId); // Refresh deck data after deletion
        toast.error('Card deleted successfully');
      } catch (error) {
        toast.error('Error deleting card');
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
          credentials: 'include'
        });
        await fetchDecks(); // Refresh all decks data
        if (selectedDeckId === deckId) {
          await handleDeckSelection(deckId); // Refresh selected deck data
        }
        toast.success('Deck updated successfully');
      } catch (error) {
        toast.error('Error updating Deck');
        console.error('Error updating deck:', error);
      }
    }
  };

  const handleDeckDeletion = async (deckId) => {
    if (window.confirm('Are you sure you want to delete this deck?')) {
      try {
        await fetch(`http://localhost:5000/api/decks/${deckId}`, {
          method: 'DELETE',
          credentials: 'include'
        });
        await fetchDecks(); // Refresh all decks data
        if (selectedDeckId === deckId) {
          setSelectedDeck(null);
          setSelectedDeckId('');
        }
        toast.success('Deck deleted successfully');
      } catch (error) {
        toast.error('Error deleting this Deck');
        console.error('Error deleting deck:', error);
      }
    }
  };

  const fetchUserData = async () => {
    const response = await fetch('http://localhost:5000/api/user', {
      method: 'GET',
      credentials: 'include',
    });
    const data = await response.json();
    setUsername(data.username); 
  };

  const handleAiProclick = () => {
    navigate('/generate');
  }
  return (
    <div className="dashboard">
      <nav className="dashboard-navbar">
        <div className="nav-left" onClick={handleHomeClick} style={{ cursor: 'pointer' }}>FlashMaster</div>
        <div className="nav-right">
          <div className="logout-button" onClick={handleLogoutClick} style={{ cursor: 'pointer' }}>Log out</div>
          <div className="delete-account" onClick={handleDeleteClick} style={{ cursor: 'pointer' }}>Delete account</div>
        </div>
      </nav>
      <div className="welcome-message">
      Welcome to FlashMaster Pro, {username}
    </div>
      <div className="progress">
        <h3>Progress</h3>
        <p>Reviewed: {progress.reviewed}</p>
        <p>Known: {progress.known}</p>
        <p>Hard: {progress.hard}</p>
      </div>
     


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
          <button className="ai-pro-button" onClick={handleAiProclick} >← AI Pro</button>
          {decks.map(deck => (
            <button
              key={deck._id}
              className="deck-button"
              onClick={() => handleDeckSelection(deck._id)}
            >
              {deck.deckName}
              <button onClick={() => handleDeckModification(deck._id)}>Modify</button>
              <button onClick={() => handleDeckDeletion(deck._id)}>Delete Deck</button>
            <div key={deck._id}>
                <h3>{deck.name}</h3>
                {/* Link to Known Cards */}
                <Link to={`/decks/${deck._id}/known-cards`}>Known Cards</Link>
                {/* Link to Hard Cards */}
                <Link to={`/decks/${deck._id}/hard-cards`}>Hard Cards</Link>
            </div>
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
      // a big title
      <h2>No cards in this deck yet. Add some above!</h2>
    )}
  </div>
)}


<footer className='footer'>
© 2024 FlashMaster. All rights reserved.
</footer>
{showRandomPopup && (
            <RandomCardsPopup decks={decks} setShowRandomPopup={setShowRandomPopup} />
        )}
        <ToastContainer />
    </div>
  );
};

export default Dashboard;
