import React from 'react';
import EventBook from '../EventBook/EventBook';


const AboutSection = () => {
  return (
    <section id="about" className="about section">
      {/**<ParticlesBackground id="particles-about" />**/}

      <div className="section-header" data-aos="fade-up">
        <h2>What We <span className="highlight">Do</span></h2>
        <div className="underline"></div>
      </div>

      <div className="about-container">
        <div className="about-content" data-aos="fade-up" style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
          <EventBook />
        </div>
      </div>
    </section>
  );
};

export default AboutSection;