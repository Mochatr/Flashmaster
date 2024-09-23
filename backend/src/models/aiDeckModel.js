const mongoose = require('mongoose');
const { Schema } = mongoose;

// AiDeck Schema
const aiDeckSchema = new Schema({
  deckName: {
    type: String,
    required: true,
  },
  cards: [{
    front: {
      type: String,
      required: true,
    },
    back: {
      type: String,
      required: true,
    },
    flip: {
      type: Boolean,
      default: false,
    },
  }],
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',  // Refers to the User model
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  }
});

const AiDeck = mongoose.model('AiDeck', aiDeckSchema);
module.exports = AiDeck;
