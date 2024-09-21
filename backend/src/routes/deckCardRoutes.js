const express = require('express');
const router = express.Router();
const deckCardController = require('../controllers/deckCardController');

// Create a new deck (use logged-in user's ID as owner)
router.post('/decks', deckCardController.createDeck);  
// Get all decks for the logged-in user
router.get('/decks', deckCardController.getAllDecks);  
// Get a specific deck by ID
router.get('/decks/:deckId', deckCardController.getDeck);  
// Delete a deck by ID
router.delete('/decks/:deckId', deckCardController.deleteDeck);  
// Update a deck
router.put('/decks/:deckId', deckCardController.updateDeck);  

// Add a new card to a specific deck
router.post('/decks/:deckId/cards', deckCardController.addCardToDeck);  
// Get all cards in a specific deck
router.get('/decks/:deckId/cards', deckCardController.getDeckCards);  
// Update a specific card in a deck
router.put('/decks/:deckId/cards/:cardId', deckCardController.updateCardInDeck);  
// Delete a specific card from a deck
router.delete('/decks/:deckId/cards/:cardId', deckCardController.deleteCardFromDeck);  
// Get a specific card from a deck
router.get('/decks/:deckId/cards/:cardId', deckCardController.getCard);  

// Mark card as known or hard
router.put('/decks/:deckId/cards/:cardId/status', deckCardController.updateCardInDeck);

// Get all known cards for a specific deck
router.get('/decks/:deckId/known-cards', deckCardController.getKnownCards);

// Get all hard cards for a specific deck
router.get('/decks/:deckId/hard-cards', deckCardController.getHardCards);

module.exports = router;
