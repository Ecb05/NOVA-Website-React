import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [navBackground, setNavBackground] = useState('linear-gradient(135deg, rgba(5, 7, 10, 0.85), rgba(11, 47, 42, 0.85), rgba(26, 27, 58, 0.85))');
  const location = useLocation();

  useEffect(() => {
    if (location.pathname !== '/') {
      // Ensure static background colors are applied on internal pages immediately
      if (location.pathname === '/sprints') setNavBackground('linear-gradient(135deg, rgba(2, 10, 20, 0.85), rgba(10, 58, 122, 0.85), rgba(4, 18, 38, 0.85))');
      else if (location.pathname === '/register') setNavBackground('linear-gradient(135deg, rgba(26, 4, 16, 0.85), rgba(95, 10, 58, 0.85), rgba(38, 6, 26, 0.85))');
      else if (location.pathname === '/events') setNavBackground('linear-gradient(135deg, rgba(20, 10, 2, 0.85), rgba(122, 46, 5, 0.85), rgba(42, 18, 4, 0.85))');
      else setNavBackground('rgba(10, 10, 10, 0.6)');
      return;
    }

    const handleScroll = () => {
      const sections = [
        { id: 'home', color: 'linear-gradient(135deg, rgba(5, 7, 10, 0.85), rgba(11, 47, 42, 0.85), rgba(26, 27, 58, 0.85))' }, // Dark Gradient Theme
        { id: 'vision', color: 'rgba(50, 15, 15, 0.85)' }, // Red
        { id: 'mission', color: 'rgba(60, 45, 15, 0.85)' }, // Gold/Brown
        { id: 'team', color: 'rgba(5, 50, 60, 0.85)' }, // Cyan
        { id: 'about', color: 'rgba(50, 5, 60, 0.85)' } // Indigo
      ];

      let currentColor = navBackground;
      for (let sec of sections) {
        const element = document.getElementById(sec.id);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 150 && rect.bottom >= 150) {
            currentColor = sec.color;
            break;
          }
        }
      }
      setNavBackground(currentColor);
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [location.pathname, navBackground]);

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
    <nav className="navbar" style={{ background: navBackground }}>
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



          {/*<li>
            <Link
              to="/events"
              className={isActiveLink('/events') ? 'active' : ''}
              onClick={closeMenu}
            >
              Events
            </Link>
          </li>*/}
          <li>
            <Link
              to="/sprints"
              className={isActiveLink('/sprints') ? 'active' : ''}
              onClick={closeMenu}
            >
              Sprints
            </Link>
          </li>

          <li>
            <Link
              to="/register"
              className={`register-btn ${isActiveLink('/register') ? 'active' : ''}`}
              onClick={closeMenu}
            >
              Join us
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