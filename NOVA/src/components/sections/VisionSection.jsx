import React from 'react';

const VisionSection = () => {
  return (
    <section id="vision" className="vision">
      <div className="section-header" data-aos="fade-up">
        <h2>Our <span className="highlight">Vision</span></h2>
        <div className="underline"></div>
      </div>
      
      <div className="vision-banner" data-aos="zoom-in">
        <img 
          src="https://img.freepik.com/free-vector/abstract-technology-particle-background_52683-25766.jpg" 
          alt="Vision Banner" 
        />
        <div className="vision-overlay">
          <h3>Empowering the Next Generation of Tech Innovators</h3>
        </div>
      </div>
      
      <div className="vision-container">
        <div className="vision-card" data-aos="flip-left" data-aos-delay="100">
          <div className="vision-icon">
            <i className="fas fa-lightbulb"></i>
          </div>
          <p>
            "To build a Visionary network where aspiring innovators and technologists can connect, 
            grow, and transform their ideas into impactful solutions — making NOVA a beacon of 
            student-driven excellence and innovation."
          </p>
        </div>
      </div>
    </section>
  );
};

export default VisionSection;