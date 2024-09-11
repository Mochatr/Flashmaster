const mongoose = require('mongoose');

const cardSchema = new mongoose.Schema({
  question: { type: String, required: true },
  answer: { type: String, required: true }
});

const deckSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  cards: [cardSchema] // Array of card subdocuments
});

const Deck = mongoose.model('Deck', deckSchema);

module.exports = Deck;
