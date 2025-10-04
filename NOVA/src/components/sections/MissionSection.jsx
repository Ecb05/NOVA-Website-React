import React from 'react';

const MissionSection = () => {
  return (
    <section id="mission" className="mission">
      <div className="section-header" data-aos="fade-up">
        <h2>Our <span className="highlight">Mission</span></h2>
        <div className="underline"></div>
      </div>
      
      <div className="mission-container">
        <div className="mission-card" data-aos="fade-up" data-aos-delay="100">
          <div className="mission-icon">
            <i className="fas fa-bridge"></i>
          </div>
          <h3>Bridge Academic & Practical</h3>
          <p>
            To bridge the gap between academic learning and practical application 
            through workshops, seminars, events and real-time projects.
          </p>
        </div>
        
        <div className="mission-card" data-aos="fade-up" data-aos-delay="200">
          <div className="mission-icon">
            <i className="fas fa-users"></i>
          </div>
          <h3>Platform for Ideas</h3>
          <p>
            To provide a platform for every student to share, represent, and develop their ideas.
          </p>
        </div>
        
        <div className="mission-card" data-aos="fade-up" data-aos-delay="300">
          <div className="mission-icon">
            <i className="fas fa-handshake"></i>
          </div>
          <h3>Foster Collaboration</h3>
          <p>
            To encourage collaboration across domains and foster a spirit of teamwork, 
            leadership, and innovation.
          </p>
        </div>
        
        <div className="mission-card" data-aos="fade-up" data-aos-delay="400">
          <div className="mission-icon">
            <i className="fas fa-heart"></i>
          </div>
          <h3>Learning Community</h3>
          <p>
            To create a community that celebrates curiosity, experimentation, and continuous learning.
          </p>
        </div>
      </div>
    </section>
  );
};

export default MissionSection;