// src/Header.js
import React from 'react';
import './Header.css';

const Header = () => {
  return (
    <header className="header">
      <h1 className="title">Pinja Konsulttidata</h1>
      <nav className="nav">
        <a href="#home" className="navLink">Home</a>
        <a href="#consultants" className="navLink">Consultants</a>
        <a href="#contact" className="navLink">Contact</a>
      </nav>
    </header>
  );
};

export default Header;
