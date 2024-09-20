import React , {useState} from 'react';
import '../styling/reviewModal.css'; // Ensure you have appropriate styles


const ReviewModal = ({ isOpen, onClose, cards }) => {
    // States for the current card index and flip status (whether to show the front or back of the card)
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isFlipped, setIsFlipped] = useState(false);

    // Handle flipping the card
    const handleFlip = () => {
        setIsFlipped((prev) => !prev);
    };

    const handleNext = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % cards.length);
        setIsFlipped(false); // Reset to front when moving to next card
    };

    const handlePrevious = () => {
        setCurrentIndex((prevIndex) => (prevIndex - 1 + cards.length) % cards.length);
        setIsFlipped(false); // Reset to front when moving to previous card
    };

    if (!isOpen) return null; // Render null if the modal is not open

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <span className="close-btn" onClick={onClose}>&times;</span>
                {cards.length > 0 ? (
                    <div className="review-card">
                        <h3>{isFlipped ? cards[currentIndex].answer : cards[currentIndex].question}</h3>
                        <div className="review-card-actions">
                            <button onClick={handlePrevious}>Previous</button>
                            <button onClick={handleFlip}>Flip</button> {/* Flip Button */}
                            <button onClick={handleNext}>Next</button>
                        </div>
                    </div>
                ) : (
                    <p>No cards to review</p>
                )}
            </div>
        </div>
    );
};

export default ReviewModal;