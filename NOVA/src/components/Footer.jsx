import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer>
      <div className="footer-container">
        <div className="footer-logo">
          <img src="/images/hero/NOVA LOGo.jpg" alt="NOVA Logo" className="footer-logo-image" />
          <div>
            <h2>NOVA</h2>
            <p>Network of Visionary Aspirants</p>
          </div>
        </div>
        
       
        
        <div className="footer-contact">
          <h3>Contact Us</h3>
          <p><i className="fas fa-envelope"></i> info@novaclub.org</p>
          <p><i className="fas fa-phone"></i> +91 9876543210</p>
          <p><i className="fas fa-map-marker-alt"></i> CSE Department, MVSR Engineering College</p>
        </div>
        
        <div className="footer-social">
          <h3>Follow Us</h3>
          <div className="social-icons">
            <a href="https://www.instagram.com/nova.mvsr/" className="social-icon" aria-label="Instagram">
              <i className="fab fa-instagram"></i>
            </a>
            <a href="#" className="social-icon" aria-label="LinkedIn">
              <i className="fab fa-linkedin"></i>
            </a>
            <a href="#" className="social-icon" aria-label="Twitter">
              <i className="fab fa-twitter"></i>
            </a>
            <a href="#" className="social-icon" aria-label="GitHub">
              <i className="fab fa-github"></i>
            </a>
            <a href="#" className="social-icon" aria-label="Discord">
              <i className="fab fa-discord"></i>
            </a>
          </div>
        </div>
      </div>
      
      <div className="footer-bottom">
        <p>&copy; 2025 NOVA - Network of Visionary Aspirants. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
