const express = require('express');
const router = express.Router();
const deckCardController = require('../controllers/deckCardController');

// Routes for Decks
router.post('/decks', deckCardController.createDeck);  // Create a new deck
router.get('/decks', deckCardController.getAllDecks);  // Get all decks
router.get('/decks/:deckId', deckCardController.getDeck);  // Get a specific deck by ID
router.delete('/decks/:deckId', deckCardController.deleteDeck);  // Delete a deck by ID

// Routes for Cards within a Deck
router.post('/decks/:deckId/cards', deckCardController.addCardToDeck);  // Add a new card to a specific deck
router.get('/decks/:deckId/cards', deckCardController.getDeckCards);  // Get all cards in a specific deck
router.put('/decks/:deckId/cards/:cardId', deckCardController.updateCardInDeck);  // Update a specific card in a deck
router.delete('/decks/:deckId/cards/:cardId', deckCardController.deleteCardFromDeck);  // Delete a specific card from a deck

module.exports = router;
