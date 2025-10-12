import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false); 
  };

  // Helper function to check if link is active
  const isActiveLink = (path) => {
    return location.pathname === path;
  };

 

  return (
    <nav className="navbar">
      <div className="logo">
        <img src="/images/hero/NOVA LOGo.jpg" alt="NOVA Logo" className="logo-image" />
        <div className="logo-text">
          <h1>NOVA</h1>
          <span className="tagline">Network of Visionary Aspirants</span>
        </div>
      </div>
      
      <div className={`nav-links ${isMenuOpen ? 'active' : ''}`}>
        <ul>
          <li>
            <Link 
              to="/" 
              className={isActiveLink('/') ? 'active' : ''}
              onClick={closeMenu}
            >
              Home
            </Link>
          </li>
        
         
        
          <li>
            <Link 
              to="/announcements" 
              className={isActiveLink('/announcements') ? 'active' : ''}
              onClick={closeMenu}
            >
              Announcements
            </Link>
          </li>
          <li>
            <Link 
              to="/roadmaps" 
              className={isActiveLink('/roadmaps') ? 'active' : ''}
              onClick={closeMenu}
            >
              Roadmaps
            </Link>
          </li>
          <li>
            <Link 
              to="/novathon" 
              className={isActiveLink('/novathon') ? 'active' : ''}
              onClick={closeMenu}
            >
              Novathon
            </Link>
          </li>
          <li>
            <Link 
              to="/rules" 
              className={isActiveLink('/rules') ? 'active' : ''}
              onClick={closeMenu}
            >
              Rules
            </Link>
          </li>
          <li>
            <Link 
              to="/register" 
              className={`register-btn ${isActiveLink('/register') ? 'active' : ''}`}
              onClick={closeMenu}
            >
              Register
            </Link>
          </li>
        </ul>
      </div>
      
      <div className="hamburger" onClick={toggleMenu}>
        <span className="bar"></span>
        <span className="bar"></span>
        <span className="bar"></span>
      </div>
    </nav>
  );
};

export default Navbar;