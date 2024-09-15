import React, { useState } from 'react';
import '../styling/flashcard.css';

const Flashcard = ({ selectedDeck, onModify, onDelete }) => {
  // Using an object to track flip state for each card
  const [isFlipped, setIsFlipped] = useState({});

  const handleCardFlip = (cardId) => {
    setIsFlipped(prevState => ({
      ...prevState,
      [cardId]: !prevState[cardId]
    }));
  };

  return (
    <div className="deck-container">
      <div className="deck-header">
        <h2 className="deck-title">{selectedDeck.deckName}</h2>
        <p className="deck-description">{selectedDeck.description}</p>
      </div>

      <div className="cards-container">
        {selectedDeck.cards && selectedDeck.cards.length > 0 ? (
          selectedDeck.cards.map(card => (
            <div key={card._id} className="card-container">
              <div
                className={`card ${isFlipped[card._id] ? 'flipped' : ''}`}
                onClick={() => handleCardFlip(card._id)}
              >
                <div className="card-inner">
                  <div className="card-front">
                    <h4>{card.question}</h4>
                    <p>Tags: {card.tags.join(', ')}</p>
                    <p>Difficulty: {card.difficulty}</p>
                  </div>
                  <div className="card-back">
                    <p>{card.answer}</p>
                  </div>
                </div>
              </div>
              <div className="card-actions">
                <button className="modify-button" onClick={(e) => { e.stopPropagation(); onModify(selectedDeck._id, card._id); }}>Modify</button>
                <button className="delete-button" onClick={(e) => { e.stopPropagation(); onDelete(selectedDeck._id, card._id); }}>Delete</button>
              </div>
            </div>
          ))
        ) : (
          <p>No cards in this deck.</p>
        )}
      </div>
    </div>
  );
};

export default Flashcard;
