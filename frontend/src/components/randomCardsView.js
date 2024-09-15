import React, { useState, useEffect } from 'react';

const RandomCardViewer = ({ deckId, onClose }) => {
    // set of cards
    const [cards, setCards] = useState([]);
    // current card so we can track which card is next and also is the prev
    const [currentCardIndex, setCurrentCardIndex] = useState(0);
    // flipping the card
    const [showAnswer, setShowAnswer] = useState(false);

    useEffect(() => {
        fetchDeckCards();
    }, []);

    const fetchDeckCards = async () => {
        try {
            const response = await fetch(`http://localhost:5000/api/decks/${deckId}/cards`);
            const data = await response.json();
            // Shuffle cards
            const shuffledCards = data.sort(() => Math.random() - 0.5);
            setCards(shuffledCards);
        } catch (error) {
            console.error('Error fetching deck cards:', error);
        }
    };

    const handleFlip = () => {
        setShowAnswer(!showAnswer);
    };

    const handleNext = () => {
        if (currentCardIndex < cards.length - 1) {
            setCurrentCardIndex(currentCardIndex + 1);
            setShowAnswer(false);
        }
    };

    const handleBack = () => {
        if (currentCardIndex > 0) {
            setCurrentCardIndex(currentCardIndex - 1);
            setShowAnswer(false);
        }
    };

    return (
        <div className="random-card-viewer">
            {cards.length > 0 && (
                <div className="card-grid">
                    <div className="card-preview">
                        {showAnswer ? (
                            <p>{cards[currentCardIndex].answer}</p>
                        ) : (
                            <p>{cards[currentCardIndex].question}</p>
                        )}
                    </div>
                    <button onClick={handleFlip}>Flip</button>
                </div>
            )}
            <div className="navigation-buttons">
                <button onClick={handleBack} disabled={currentCardIndex === 0}>Back</button>
                <button onClick={handleNext} disabled={currentCardIndex === cards.length - 1}>Next</button>
            </div>
            <button onClick={onClose}>Close</button>
        </div>
    );
};

export default RandomCardViewer;
