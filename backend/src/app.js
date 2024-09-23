const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const session = require('express-session');
require('dotenv').config();

const deckRoutes = require('./routes/deckCardRoutes');
const userRoutes = require('./routes/userRoutes');
const aiProRoutes = require('./routes/aiProRoutes');
const { unstable_renderSubtreeIntoContainer } = require('react-dom');

const app = express();
app.use(cors({
  origin: 'http://localhost:3000', // Allow requests from this origin
  credentials: true // Allow credentials (cookies) to be sent
}));
app.use(express.json());

// Session Middleware Configuration
app.use(session({
  secret: process.env.SESSION_SECRET || 'your-secret-key',  // Store session secret in .env for security
  resave: false,  // Prevents session from being saved on every request
  saveUninitialized: false,  // Do not save an empty session
  cookie: {
    secure: false,
    httpOnly: true,
    maxAge: 1000 * 60 * 60 * 24,  // 1 day cookie duration
  }
}));
// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));
  

// Routes would go here
app.get('/', (req, res) => {
  res.send('FlashMaster Pro backend is running');
});


// Middleware to protect routes (check if user is logged in)
const requireLogin = (req, res, next) => {
  console.log('Session:', req.session); // Check if session exists and userId is set
  if (!req.session.userId) {
    return res.status(401).json({ message: 'Unauthorized: Please log in.' });
  }
  next();
};


app.use(session()); 
// User Routes
app.use('/api', userRoutes); // No authentication needed

// Deck Routes (authentication required)
app.use('/api', requireLogin, deckRoutes);

// api pro routes
app.use('/api', requireLogin, aiProRoutes);


app.get('/api/check-session', (req, res) => {
  if (req.session.userId) {
    return res.status(200).json({ message: 'Session is active', userId: req.session.userId });
  }
  res.status(401).json({ message: 'No active session' });
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});