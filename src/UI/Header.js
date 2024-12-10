// src/Header.js
import React from 'react';
import './Header.css';
import logo from './pinja.png';

const Header = () => {
  return (
    <header className="header">
      <img src={logo} alt="Pinja Logo" className="logo" /> 
     
      <nav className="nav">
        <a href="#home" className="navLink">Etusivu</a>
        <a href="#consultants" className="navLink">Konsultit</a>
        <a href="#contact" className="navLink">Yhteystiedot</a>
      </nav>
    </header>
  );
};

export default Header;
