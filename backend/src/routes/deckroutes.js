const express = require('express');
const router = express.Router();
const DeckController = require('../controllers/deckController');

// Route to get all decks and their cards
router.get('/decks', DeckController.getAllDecks);

// Route to get a specific deck by ID
router.get('/decks/:deckId', DeckController.getDeckById);

// Route to create a new deck
router.post('/decks', DeckController.createDeck);

// Route to add a card to a specific deck
router.post('/decks/:deckId/cards', DeckController.addCardToDeck);

// Route to get all cards from a specific deck
router.get('/decks/:deckId/cards', DeckController.getCardsFromDeck);

module.exports = router;
