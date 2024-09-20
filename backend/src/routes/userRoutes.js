const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// Routes for Decks
router.post('/user', userController.createUser);  // Create a new user
router.post('/finduser', userController.findUser);  // Find a user by email and password
router.delete('/deleteuser/:email', userController.deleteUser);  // Delete user

module.exports = router;