import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Homepage from './components/Homepage';
import LoginSignup from './components/LoginSignup/LoginSignup';
import Dashboard from './components/Dashboard';
import KnownCardsPage from './components/knownCardsPage';

import HardCardsPage from './components/hardCardsPage';
import Aipro from './components/aipro';
import Team from './components/Team';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/Authenticate" element={<LoginSignup />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/team" element={<Team />} />
        <Route path="/decks/:deckId/known-cards" element={<KnownCardsPage/>} />
<Route path="/decks/:deckId/hard-cards" element={<HardCardsPage/>} />
<Route path="/generate" element={<Aipro/>} />
      </Routes>
    </Router>
  );
};

export default App;
