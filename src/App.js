import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Login from './components/Login';
import Gallery from './components/Gallery';
import Favorites from './components/Favorites';
import Header from './components/Header'
import Disclaimer from './components/Disclaimer';


function App() {
  return (
    <Router>
      <div>
        <Header />
        <Routes>
          <Route path='/' element={< Disclaimer />} />
          <Route path="/login" element={<Login />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/favorites" element={<Favorites />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

