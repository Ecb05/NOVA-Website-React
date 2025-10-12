import React from 'react';
const AboutSection = () => {
  return (
    <section id="about" className="about">
      <div className="section-header" data-aos="fade-up">
        <h2>About <span className="highlight">NOVA</span></h2>
        <div className="underline"></div>
      </div>
      
      <div className="about-container">
        <div className="about-image" data-aos="fade-right">
          <img 
            src="/images/hero/NOVA LOGo.jpg" 
            alt="About NOVA" 
            height="600"
          />
          <div className="about-image-grid">
            {/* Additional image elements can be added here if needed */}
          </div>
        </div>
        
        <div className="about-content" data-aos="fade-left">
          <h3>What is NOVA?</h3>
          <p>
            NOVA — Network of Visionary Aspirants — is a student-formed tech body driven by 
            passion, purpose, and people. Created by students, for students, NOVA serves as a 
            dynamic network of like-minded individuals who are eager to innovate, collaborate, and grow.
          </p>
          <p>
            At its core, NOVA is a platform where ideas are nurtured, talents are recognized, and 
            students are empowered to take charge of their technical and personal development. We aim 
            to bridge the gap between institutional learning and real-world innovation by providing 
            exposure and opportunities.
          </p>
          <p>
            Through technical events, workshops, hackathons, seminars, and interdisciplinary 
            collaborations, NOVA fuels creativity and problem-solving. While our core lies in 
            technology, we also host non-technical events to ensure holistic growth, communication 
            skills, leadership, and teamwork among our members.
          </p>
          <p>
            At NOVA, we understand the student perspective — we believe in platforms over podiums, 
            in participation over performance, and in ideas over hierarchy.
          </p>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;