import React, { useEffect, useState } from 'react';
import '../styling/knownHard.css'
import { useParams } from 'react-router-dom';
import ReviewModal from './reviewModel';
function HardCardsPage() {
    const { deckId } = useParams();
    const [hardCards, setHardCards] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        fetch(`http://localhost:5000/api/decks/${deckId}/hard-cards`)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                setHardCards(data);
                setLoading(false);
            })
            .catch(error => console.error('Error fetching hard cards:', error));
    }, [deckId]);

    const handleModify = async (deckId, cardId) => {
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
        // refresh
        window.location.reload();
      } catch (error) {
        console.error('Error updating card:', error);
      }
    }
  };

    const handleDelete = async (deckId, cardId) => {
        if (window.confirm('Are you sure you want to delete this card?')) {
            try {
              await fetch(`http://localhost:5000/api/decks/${deckId}/cards/${cardId}`, {
                method: 'DELETE',
              });
              window.location.reload();
            } catch (error) {
              console.error('Error deleting card:', error);
            }
          }
        };


        const openModal = () => setIsModalOpen(true);
        const closeModal = () => setIsModalOpen(false);

    if (loading) {
        return <p>Loading...</p>;
    }

    return (
        <div>
            <h2>Hard Cards</h2>
            {hardCards.length === 0 ? (
                <p className="no-cards">No cards to show</p>
            ) : (
                <div className="card-container">
                    {hardCards.map(card => (
                        <div key={card._id} className="card">
                            <h3>{card.question}</h3>
                            <p>{card.answer}</p>
                            <div className="card-actions">
                                <button onClick={() => handleModify(deckId, card._id)}>Modify</button>
                                <button className="delete" onClick={() => handleDelete(deckId, card._id)}>Delete</button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
            {hardCards.length > 0 && <button onClick={openModal}>Review Selected Cards</button>}
            <ReviewModal isOpen={isModalOpen} onClose={closeModal} cards={hardCards} />
       
        </div>
    );
};

export default HardCardsPage;
