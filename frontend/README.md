# FlashMaster Pro

FlashMaster Pro is a SaaS-based web application that allows users to create, manage, and review interactive flashcards. It’s designed to help users learn and memorize a wide variety of topics efficiently through a deck-based system. The app provides both manually created and AI-generated flashcards, with options to track progress and share specific cards.

## Table of Contents
- [Overview](#overview)
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Project Structure](#project-structure)
- [Installation](#installation)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
- [Database Models](#database-models)
- [Future Improvements](#future-improvements)
- [Contributing](#contributing)
- [License](#license)

---

## Overview

FlashMaster Pro aims to enhance the learning process by enabling users to:
- Create flashcards and decks based on any topic.
- Use AI to generate flashcards from input text.
- Track learning progress using markers like "I know it" and "It's hard."
- Share flashcards on social media.
- View, edit, and delete both manually created and AI-generated flashcards and decks.

---

## Features

- *User Authentication*: Secure login and registration.
- *Create Flashcards*: Create custom flashcards with front and back content.
- *AI-Generated Flashcards*: Automatically generate flashcards based on user input.
- *Deck Management*: Organize flashcards into decks for specific topics.
- *Progress Tracking*: Mark flashcards as "known," "hard," or "bring back later."
- *Responsive Design*: Works across mobile and desktop devices.
- *Deck/Flashcard Deletion*: Users can delete both decks and individual flashcards.
- *Social Sharing*: Share flashcards on social media platforms.

---

## Technologies Used

### Frontend
- *React*: For building user interfaces.
- *Material UI (MUI)*: For designing a responsive and clean user interface.
- *CSS*: For additional custom styling.

### Backend
- *Node.js*: JavaScript runtime for server-side logic.
- *Express.js*: Web framework for building RESTful APIs.
- *MongoDB*: NoSQL database for storing users, decks, and flashcards.
- *Firebase*: Authentication and database management (used initially for authentication).
- *Mongoose*: MongoDB object modeling for Node.js.
- *JWT*: JSON Web Tokens for secure authentication.

### Other Libraries
- *Babel*: JavaScript transpiler.
- *Mocha*: Testing framework for Node.js.
- *ESLint*: Linting utility for JavaScript.
- *Session Handling*: req.session for user session management.

---

## Project Structure

bash
flashmaster/
├── backend/
│   ├── src/
│   │   ├── controllers/
│   │   ├── models/
│   │   ├── routes/
│   │   └── app.js
│   ├── .env
│   ├── package.json
│   └── node_modules/
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   ├── App.js
│   │   ├── index.js
│   │   └── serviceWorker.js
│   ├── package.json
│   └── node_modules/
└── .gitignore


### Key Directories and Files:
- backend/: Contains the Express server, API routes, and MongoDB models.
- frontend/: Contains the React application and its components.
- .env: Environment variables such as MongoDB URI and JWT secrets.

---

## Installation

### Prerequisites
Ensure you have the following installed:
- *Node.js* (v14+)
- *MongoDB*
- *npm* (v6+)

### Steps
1. *Clone the repository*:
    bash
    git clone https://github.com/your-username/flashmaster-pro.git
    

2. *Install dependencies* for both backend and frontend:
    bash
    cd flashmaster-pro/backend
    npm install
    cd ../frontend
    npm install
    

3. *Create a .env file* in the backend/ directory and add your environment variables:
    
    MONGO_URI=<your-mongodb-uri>
    JWT_SECRET=<your-jwt-secret>
    

4. *Run the backend*:
    bash
    cd backend
    npm start
    

5. *Run the frontend*:
    bash
    cd frontend
    npm start
    

6. *Access the app* at:
    
    http://localhost:3000
    

---

## Usage

1. *Register/Login*: Create an account or log in with an existing account.
2. *Create a Deck*: Navigate to the dashboard to create a deck and add flashcards.
3. *Generate Flashcards*: Use the "Generate Flashcards" feature to automatically create cards based on input text.
4. *Track Progress*: Mark flashcards as known or hard to keep track of your learning.
5. *Delete/Modify Cards*: Edit or delete existing decks and flashcards.
6. *Share Flashcards*: Use the social sharing feature to share flashcards on social media.

---

## API Endpoints

### User Routes
- POST /api/auth/register: Register a new user.
- POST /api/auth/login: Log in an existing user.

### Deck Routes
- GET /api/decks: Get all decks of the logged-in user.
- POST /api/decks: Create a new deck.
- DELETE /api/decks/:id: Delete a specific deck.

### Flashcard Routes
- POST /api/flashcards: Create a flashcard within a deck.
- GET /api/flashcards/:deckId: Get all flashcards of a specific deck.
- DELETE /api/flashcards/:id: Delete a specific flashcard.

### AI-Generated Flashcards
- POST /api/generate: Generate flashcards using AI from input text.

---

## Database Models

### User Model
js
{
  username: String,
  email: String,
  password: String
}


### Deck Model
js
{
  deckName: String,
  description: String,
  cards: [ObjectId],
  owner: ObjectId,
  createdAt: Date,
}


### Flashcard Model
js
{
  question: String,
  answer: String,
  deck: ObjectId,
  owner: ObjectId,
  createdAt: Date,
  updatedAt: Date,
  difficulty: String,
  tags: [String],
  known: Boolean,
  hard: Boolean
}


---

## Future Improvements

- *AI-Enhanced Learning*: Introduce AI-powered spaced repetition to optimize learning intervals.
- *Premium Features*: Offer advanced metrics, collaborative decks, and enhanced learning tools for premium users.
- *Mobile App*: Develop a dedicated mobile application for iOS and Android.
- *Offline Mode*: Enable offline access to flashcards and decks.

---

## Contributing

Contributions are welcome! To get started:

1. Fork the repository.
2. Create a new branch: git checkout -b feature-name.
3. Make your changes and commit them: git commit -m 'Added some feature'.
4. Push to the branch: git push origin feature-name.
5. Submit a pull request.

---

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for more details.

## AUTHORS

**Sohail LinkedIn:** [Sohail Charef](https://www.linkedin.com/in/sohail-charef/)
**Mohamed LinkedIn:** [Mohamed Chatr](https://www.linkedin.com/in/mochatr/)