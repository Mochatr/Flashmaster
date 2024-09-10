import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Homepage from './components/Homepage';
import LoginSignup from './components/LoginSignup/LoginSignup';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/Authenticate" element={<LoginSignup />} />
      </Routes>
    </Router>
  );
};

export default App;
