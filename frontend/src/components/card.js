import React, { useState } from 'react';
import '../styling/card.css';

const FlashCard = ({ question, answer }) => {
  const [isFlipped, setIsFlipped] = useState(false);

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  return (
    <div className="card-container" onClick={handleFlip}>
      <div className={`card ${isFlipped ? 'is-flipped' : ''}`}>
        <div className="card-face card-front">
          <p>{question}</p>
        </div>
        <div className="card-face card-back">
          <p>{answer}</p>
        </div>
      </div>
    </div>
  );
};

export default FlashCard;
