const DeckCard = require('../models/deckCardModel');

// Create a New Deck
exports.createDeck = async (req, res) => {
  try {
    const { deckName, description } = req.body;

    const newDeck = new DeckCard({
      deckName,
      description,
      cards: [],
      owner: 'Sohail',  // Assuming user authentication
    });

    const savedDeck = await newDeck.save();
    res.status(201).json(savedDeck);
  } catch (error) {
    res.status(500).json({ message: 'Error creating deck', error });
  }
};

// Get All Decks
exports.getAllDecks = async (req, res) => {
  try {
    const decks = await DeckCard.find({ owner: 'Sohail' });  // Only get decks for the logged-in user
    res.status(200).json(decks);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving decks', error });
  }
};

// Get a Single Deck by ID
exports.getDeck = async (req, res) => {
  try {
    const { deckId } = req.params;
    const deck = await DeckCard.findById(deckId);

    if (!deck) {
      return res.status(404).json({ message: 'Deck not found' });
    }

    res.status(200).json(deck);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving deck', error });
  }
};

// Delete a Deck by ID
exports.deleteDeck = async (req, res) => {
  try {
    const { deckId } = req.params;

    const deletedDeck = await DeckCard.findByIdAndDelete(deckId);

    if (!deletedDeck) {
      return res.status(404).json({ message: 'Deck not found' });
    }

    res.status(200).json({ message: 'Deck deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting deck', error });
  }
};
// updateDeck a Deck by ID
exports.updateDeck = async (req, res) => {
  try {
    const { deckId } = req.params;
    const { deckName, description } = req.body;

    const deck = await DeckCard.findById(deckId);
    if (!deck) {
      return res.status(404).json({ message: 'Deck not found' });
    }

    deck.deckName = deckName || deck.deckName;
    deck.description = description || deck.description;
    deck.updatedAt = new Date();

    const updatedDeck = await deck.save();
    res.status(200).json(updatedDeck);
  } catch (error) {
    res.status(500).json({ message: 'Error updating deck', error });
  }
};

// Add a New Card to a Deck
exports.addCardToDeck = async (req, res) => {
  try {
    const { deckId } = req.params;
    const { question, answer, difficulty, tags } = req.body;

    const deck = await DeckCard.findById(deckId);
    if (!deck) {
      return res.status(404).json({ message: 'Deck not found' });
    }

    const newCard = {
      question,
      answer,
      difficulty,
      tags: tags || [],
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    deck.cards.push(newCard);
    deck.updatedAt = new Date();

    const updatedDeck = await deck.save();
    res.status(200).json(updatedDeck.cards);  // Return the updated list of cards
  } catch (error) {
    res.status(500).json({ message: 'Error adding card', error });
  }
};

// Get All Cards in a Deck
exports.getDeckCards = async (req, res) => {
  try {
    const { deckId } = req.params;
    const deck = await DeckCard.findById(deckId);

    if (!deck) {
      return res.status(404).json({ message: 'Deck not found' });
    }

    res.status(200).json(deck.cards);  // Return all cards in the deck
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving cards', error });
  }
};


// Get a Single card by ID from a deck by ID
exports.getCard = async (req, res) => {
  try {
    const { deckId, cardId } = req.params;

    const deck = await DeckCard.findById(deckId);
    if (!deck) {
      return res.status(404).json({ message: 'Deck not found' });
    }

    const card = deck.cards.find((card) => card._id.toString() === cardId);
    if (!card) {
      return res.status(404).json({ message: 'Card not found' });
    }

    res.status(200).json(card);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving card', error });
  }
};
// Update a Card in a Deck
exports.updateCardInDeck = async (req, res) => {
  try {
    const { deckId, cardId } = req.params;
    const { question, answer, difficulty, tags, known, hard } = req.body;

    const deck = await DeckCard.findById(deckId);
    if (!deck) {
      return res.status(404).json({ message: 'Deck not found' });
    }

    const cardIndex = deck.cards.findIndex((card) => card._id.toString() === cardId);
    if (cardIndex === -1) {
      return res.status(404).json({ message: 'Card not found' });
    }

    const card = deck.cards[cardIndex];
    card.question = question || card.question;
    card.answer = answer || card.answer;
    card.difficulty = difficulty || card.difficulty;
    card.tags = tags || card.tags;
    card.updatedAt = new Date();
    card.known = known !== undefined ? known : card.known;
    card.hard = hard !== undefined ? hard : card.hard;
    card.lastReviewed = new Date();

    deck.cards[cardIndex] = card;
    const updatedDeck = await deck.save();
    res.status(200).json(updatedDeck.cards);
  } catch (error) {
    res.status(500).json({ message: 'Error updating card', error });
  }
};


// Delete a Card from a Deck
exports.deleteCardFromDeck = async (req, res) => {
  try {
    const { deckId, cardId } = req.params;

    const deck = await DeckCard.findById(deckId);
    if (!deck) {
      return res.status(404).json({ message: 'Deck not found' });
    }

    const cardIndex = deck.cards.findIndex((card) => card._id.toString() === cardId);
    if (cardIndex === -1) {
      return res.status(404).json({ message: 'Card not found' });
    }

    deck.cards.splice(cardIndex, 1);  // Remove card from deck
    deck.updatedAt = new Date();

    const updatedDeck = await deck.save();
    res.status(200).json(updatedDeck.cards);  // Return the updated list of cards
  } catch (error) {
    res.status(500).json({ message: 'Error deleting card', error });
  }
};


// Get all known cards for a specific deck
exports.getKnownCards = async (req, res) => {
  try {
    const { deckId } = req.params;
    console.log(deckId);

    const deck = await DeckCard.findById(deckId);
    if (!deck) {
      return res.status(404).json({ message: 'Deck not found' });
    }

    const knownCards = deck.cards.filter((card) => card.known);
    res.status(200).json(knownCards);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving known cards', error });
  }
};

// Get all hard cards for a specific deck
exports.getHardCards = async (req, res) => {
  try {
    const { deckId } = req.params;

    const deck = await DeckCard.findById(deckId);
    if (!deck) {
      return res.status(404).json({ message: 'Deck not found' });
    }

    const hardCards = deck.cards.filter((card) => card.hard);
    res.status(200).json(hardCards);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving hard cards', error });
  }
};