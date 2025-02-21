import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/header-style.css'


function Header() {
  return (
    <header className='header'>
        <nav className='nav-links'>
              <Link to="/login">Login</Link>
              <Link to="/register">Register</Link>
              <Link to="/gallery">Gallery</Link>
              <Link to="/favorites">Favorites</Link>
        </nav>
        </header>
  );
}

export default Header;

