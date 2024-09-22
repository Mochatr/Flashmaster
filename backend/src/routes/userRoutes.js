const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// Create a new user
router.post('/user', userController.createUser);  
// Find a user by email and password
router.post('/finduser', userController.findUser);  
// Delete user
router.delete('/deleteuser', userController.deleteUser);  
// Get current user
router.get('/user', userController.getCurrentUser);
// Log out user
router.post('/logout', (req, res) => {
  req.session.destroy(err => {
    if (err) return res.status(500).send('Could not log out.');
    res.status(200).send('Logged out successfully.');
  });
});

  
module.exports = router;
