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
    tags: [String], // Array of strings for tags
    createdAt: {
      type: Date,
      default: Date.now,
    },
    updatedAt: {
      type: Date,
      default: Date.now,
    }
  }],
  owner: {
    type: String,
   /*  ref: 'User',  // Referencing User Model
    required: true, */ 
    default: 'Sohail'
  },
  createdAt: {
    type: Date,
    default: Date.now,
  }
});


const DeckCard = mongoose.model('DeckCard', deckCardSchema);
module.exports = DeckCard;
