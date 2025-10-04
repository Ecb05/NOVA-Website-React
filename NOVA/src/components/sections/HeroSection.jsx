import React from 'react';
import { Link } from 'react-router-dom';

const HeroSection = () => {
  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (

    <>
      <section id="home" className="hero">
        <div className="hero-content centered" data-aos="fade-up" data-aos-duration="1000">
          <h1>Welcome to <span className="highlight">NOVA</span></h1>
          <h2>Network of Visionary Aspirants</h2>
          <p>Empowering students to innovate, collaborate, and excel in the world of technology</p>
          <div className="hero-buttons" data-aos="fade-up" data-aos-delay="600">
            <button 
              onClick={() => scrollToSection('about')} 
              className="btn primary-btn"
            >
              Learn More
            </button>
            <Link to="/register" className="btn secondary-btn">
              Join Us
            </Link>
          </div>
        </div>
      </section>
     </> 
  );
};

export default HeroSection;