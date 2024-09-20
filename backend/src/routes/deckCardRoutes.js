const express = require('express');
const router = express.Router();
const deckCardController = require('../controllers/deckCardController');

// Routes for Decks
router.post('/decks', deckCardController.createDeck);  // Create a new deck
router.get('/decks', deckCardController.getAllDecks);  // Get all decks
router.get('/decks/:deckId', deckCardController.getDeck);  // Get a specific deck by ID
router.delete('/decks/:deckId', deckCardController.deleteDeck);  // Delete a deck by ID
router.put('/decks/:deckId', deckCardController.updateDeck);  // Update a deck

// Routes for Cards within a Deck
router.post('/decks/:deckId/cards', deckCardController.addCardToDeck);  // Add a new card to a specific deck
router.get('/decks/:deckId/cards', deckCardController.getDeckCards);  // Get all cards in a specific deck
router.put('/decks/:deckId/cards/:cardId', deckCardController.updateCardInDeck);  // Update a specific card in a deck
router.delete('/decks/:deckId/cards/:cardId', deckCardController.deleteCardFromDeck);  // Delete a specific card from a deck
router.get('/decks/:deckId/cards/:cardId', deckCardController.getCard);  // get a specific card from a deck

// Mark card as known or hard
router.put('/decks/:deckId/cards/:cardId/status', deckCardController.updateCardInDeck);


// Get all known cards for a specific deck
router.get('/decks/:deckId/known-cards', deckCardController.getKnownCards);

// Get all hard cards for a specific deck
router.get('/decks/:deckId/hard-cards', deckCardController.getHardCards);

module.exports = router;
