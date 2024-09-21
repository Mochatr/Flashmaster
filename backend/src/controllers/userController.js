const User = require('../models/userModel');
const bcrypt = require('bcrypt');
const DeckCard = require('../models/deckCardModel');

const SALT_WORK_FACTOR = 10;

// Delete a user
exports.deleteUser = async (req, res) => {
  try {
    const userId = req.session.userId;
    if (!userId) {
      return res.status(401).json({ message: 'User not authenticated' });
    }
    console.log(userId);
    const user = await User.findByIdAndDelete(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    // Delete all deck cards associated with the user
    await DeckCard.deleteMany({ owner: userId });
    req.session.destroy(); // Destroy the session
    res.status(200).json({ message: 'User deleted successfully' });

  } catch (error) {
    res.status(500).json({ message: 'Error deleting user', error });
  }
};

// Find a User
exports.findUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find the user by email
    const user = await User.findOne({ email: email });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Compare the password
    const isMatch = await bcrypt.compare(password, user.hashedPassword);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Set user session
    req.session.userId = user._id;  // Store user ID in session
    res.status(200).json({ message: "Login successful", user: { id: user._id, email: user.email } });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error });
  }
};

exports.createUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const salt = await bcrypt.genSalt(SALT_WORK_FACTOR);
    const hashedPassword = await bcrypt.hash(password, salt);
    const newUser = new User({ username, email, hashedPassword });
    await newUser.save();

    // Set session on successful signup
    req.session.userId = newUser._id;
    console.log('Session created yes:', req.session);

    res.status(201).json(newUser);
  } catch (error) {
    console.error('Error creating user:', error); // Log the error details
    res.status(500).json({ message: 'Error creating user', error });
  }
};

// Get all Users
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: 'Error getting users', error });
  }
};

// Handle logout
exports.logoutUser = (req, res) => {
  req.session.destroy(err => {
    if (err) {
      return res.status(500).json({ message: 'Error logging out', error: err });
    }
    res.status(200).json({ message: 'Logged out successfully' });
  });
};
