import React from 'react';
import RandomCardViewer from './randomCardsView';
import { useState } from 'react';

const RandomCardsPopup = ({ decks, setShowRandomPopup }) => {
    const [selectedDeckId, setSelectedDeckId] = useState(null);

    const handleDeckSelection = (deckId) => {
        setSelectedDeckId(deckId);
    };


    return (
        <div className="random-cards-popup">
        <h2>Select a Deck for Random Cards</h2>
        {selectedDeckId ? (
            <RandomCardViewer deckId={selectedDeckId} onClose={() => setShowRandomPopup(false)} />
        ) : (
            <ul>
                {decks.map(deck => (
                    <li key={deck._id} onClick={() => handleDeckSelection(deck._id)}>
                        {deck.deckName}
                    </li>
                ))}
            </ul>
        )}
        {!selectedDeckId && <button onClick={() => setShowRandomPopup(false)}>Close</button>}
    </div>
    );
};

export default RandomCardsPopup;
