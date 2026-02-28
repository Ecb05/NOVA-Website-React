/*import React from 'react';
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
          <p><i className="fas fa-envelope"></i> novamvsr@gmail.com</p>
          <p><i className="fas fa-phone"></i> +91 9642200046</p>
          <p><i className="fas fa-map-marker-alt"></i> CSE Department, MVSR Engineering College</p>
        </div>
        
        <div className="footer-social">
          <h3>Follow Us</h3>
          <div className="social-icons">
            <a href="https://www.instagram.com/nova.mvsr/" className="social-icon" aria-label="Instagram">
              <i className="fab fa-instagram"></i>
            </a>
            <a href="https://www.linkedin.com/in/nova-mvsr-732bb2386" className="social-icon" aria-label="LinkedIn">
              <i className="fab fa-linkedin"></i>
            </a>
            <a href="https://github.com/Ecb05/NOVA-Website-React" className="social-icon" aria-label="GitHub">
              <i className="fab fa-github"></i>
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

export default Footer;*/


import React from 'react';
import { FaEnvelope, FaPhone, FaInstagram, FaLinkedin, FaGithub } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="footer">
      {/* Call to Action Section */}
      <div className="footer-cta-section">
        <div className="footer-cta-content">
          <p className="handwritten-message">
            See you at the next event!<br />
            Until then, stay updated—follow us on<br />
            our social platforms & check the<br />
            website for quick updates...
          </p>
          <a href="/register" className="join-nova-btn">JOIN NOVA</a>
        </div>
      </div>

      <div className="footer-content">
        <div className="footer-section">
          <h3>Contact Us</h3>
          <div className="contact-item">
            <FaEnvelope className="icon" />
            <span>novamvsr@gmail.com</span>
          </div>
          <div className="contact-item">
            <FaPhone className="icon" />
            <span>+91 9642200046</span>
          </div>
        </div>

        <div className="footer-section">
          <h3>Follow Us</h3>
          <div className="social-links">
            <a href="https://www.instagram.com/nova.mvsr/" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
              <FaInstagram className="social-icon" />
            </a>
            <a href="https://www.linkedin.com/in/nova-mvsr-732bb2386" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
              <FaLinkedin className="social-icon" />
            </a>
            <a href="https://github.com/Ecb05/NOVA-Website-React" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
              <FaGithub className="social-icon" />
            </a>
          </div>
        </div>

        <div className="footer-section">
          <h3>NOVA</h3>
          <p>Network of Visionary Aspirants</p>
          <p>CSE Department, MVSR Engineering College</p>
        </div>
      </div>

      <div className="footer-bottom">
        <p>© 2025 NOVA - Network of Visionary Aspirants. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;