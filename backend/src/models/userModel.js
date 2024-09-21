const mongoose = require('mongoose');
const { Schema } = mongoose;

// User schema
const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true, // Ensure username is unique
    trim: true,   // Remove extra spaces
  },
  email: {
    type: String,
    required: true,
    unique: true, // Ensure email is unique
    trim: true,   // Remove extra spaces
    lowercase: true, // Convert email to lowercase
  },
  hashedPassword: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now, // Automatically set to the current date
  },
  updatedAt: {
    type: Date,
    default: Date.now, // Automatically set to the current date
  },
});

// Update updatedAt field before saving
userSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

const User = mongoose.model('User', userSchema);
module.exports = User;
