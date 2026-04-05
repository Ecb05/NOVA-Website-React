import React, { useState, useEffect } from 'react';
import ParticlesBackground from '../ParticlesBackground';

const VisionSection = () => {
  const [displayText, setDisplayText] = useState('');
  const fullText = "Empowering the Next Generation of Tech Innovators";

  useEffect(() => {
    let currentIndex = 0;
    const intervalId = setInterval(() => {
      setDisplayText(fullText.slice(0, currentIndex));
      currentIndex++;

      if (currentIndex > fullText.length) {
        clearInterval(intervalId);
      }
    }, 45); // Typing speed

    return () => clearInterval(intervalId);
  }, []);

  return (
    <section id="vision" className="vision">
      <ParticlesBackground
        id="particles-vision"
        particleColors={['#E53E3E', '#822727', '#C53030']}
        lineColor="#E53E3E"
      />
      <div className="section-header" data-aos="fade-up">
        <h2>Our <span className="highlight">Vision</span></h2>
        <div className="underline"></div>
      </div>

      <div className="vision-banner" data-aos="zoom-in">
        <h3>
          {displayText}
          <span className="blinking-cursor" aria-hidden="true">|</span>
        </h3>
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