const Deck = require('../models/Deck');

// Get all decks and their cards
exports.getAllDecks = async (req, res) => {
  try {
    const decks = await Deck.find();
    res.status(200).json(decks);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching decks', error });
  }
};

// Get a specific deck by ID
exports.getDeckById = async (req, res) => {
  try {
    const deckId = req.params.deckId;
    const deck = await Deck.findById(deckId);
    if (deck) {
      res.status(200).json(deck);
    } else {
      res.status(404).json({ message: 'Deck not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error fetching deck', error });
  }
};

// Create a new deck
exports.createDeck = async (req, res) => {
  try {
    const newDeck = new Deck({
      title: req.body.title,
      description: req.body.description,
      cards: []
    });

    await newDeck.save();
    res.status(201).json(newDeck);
  } catch (error) {
    res.status(500).json({ message: 'Error creating deck', error });
  }
};

// Add a card to a specific deck
exports.addCardToDeck = async (req, res) => {
  try {
    const deckId = req.params.deckId;
    const { question, answer } = req.body;

    const deck = await Deck.findById(deckId);
    if (deck) {
      deck.cards.push({ question, answer });
      await deck.save();
      res.status(201).json(deck);
    } else {
      res.status(404).json({ message: 'Deck not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error adding card to deck', error });
  }
};

// Get all cards from a specific deck
exports.getCardsFromDeck = async (req, res) => {
  try {
    const deckId = req.params.deckId;
    const deck = await Deck.findById(deckId);
    if (deck) {
      res.status(200).json(deck.cards);
    } else {
      res.status(404).json({ message: 'Deck not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error fetching cards from deck', error });
  }
};
