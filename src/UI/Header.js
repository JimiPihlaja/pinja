// src/Header.js
import React from 'react';
import './Header.css';

const Header = () => {
  return (
    <header className="header">
      <h1 className="title">Pinja Konsulttidata</h1>
      <nav className="nav">
        <a href="#home" className="navLink">Etusivu</a>
        <a href="#consultants" className="navLink">Konsultit</a>
        <a href="#contact" className="navLink">Yhteystiedot</a>
      </nav>
    </header>
  );
};

export default Header;
