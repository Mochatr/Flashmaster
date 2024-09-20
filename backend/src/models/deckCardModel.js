const mongoose = require('mongoose');
const { Schema } = mongoose;

// DeckCard Schema
const deckCardSchema = new Schema({
  deckName: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: false,
  },
  cards: [{
    question: {
      type: String,
      required: true,
    },
    answer: {
      type: String,
      required: true,
    },
    difficulty: {
      type: String,
      enum: ['easy', 'medium', 'hard'],
      required: false,
    },
    tags: [String],
    createdAt: {
      type: Date,
      default: Date.now,
    },
    updatedAt: {
      type: Date,
      default: Date.now,
    },
    known: {
      type: Boolean,
      default: false,
    },
    hard: {
      type: Boolean,
      default: false,
    },
    lastReviewed: {
      type: Date,
    }
  }],
  owner: {
    type: String,
    default: 'Sohail'
  },
  createdAt: {
    type: Date,
    default: Date.now,
  }
});


const DeckCard = mongoose.model('DeckCard', deckCardSchema);
module.exports = DeckCard;
