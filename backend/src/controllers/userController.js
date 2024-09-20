const User = require('../models/userModel');
const bcrypt = require('bcrypt');
const DeckCard = require('../models/deckCardModel');

const SALT_WORK_FACTOR = 10;

// Delete a user
exports.deleteUser = async (req, res) => {
  try {
    const { email } = req.body;

    // Find the user by email
    const user = await User.findOne({ email: email });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Delete associated deck cards (assuming 'owner' refers to user ID)
    await DeckCard.deleteMany({ owner: "Sohail" });

    // Correctly delete the user
    await User.findByIdAndDelete(user._id);

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
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Respond success (You might want to return a JWT or some identifier here)
    res.status(200).json({ message: "Login successful", user: { id: user._id, email: user.email } });
  } catch (error) {
      res.status(500).json({ message: "Server error", error: error });
  }
};


// Create a New User
exports.createUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // Hash the password before saving the user
    const salt = await bcrypt.genSalt(SALT_WORK_FACTOR);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = new User({
      username,
      email,
      password: hashedPassword, // Store the hashed password
    });

    const savedUser = await user.save();
    // Optionally, exclude the password when returning the saved user
    const userResponse = {
      _id: savedUser._id,
      username: savedUser.username,
      email: savedUser.email
    };

    res.status(201).json(userResponse);
  } catch (error) {
    console.error('Error creating user:', error);
    res.status(500).json({ message: 'Error creating user', error });
  }
};

// Get all Users
exports.getAllUsers = async (req, res) => {
  try {
    // const users = await User.find();
    res.status(200).json({ message: 'Get all users' });
  } catch (error) {
    res.status(500).json({ message: 'Error getting users', error });
  }
};