import React from 'react';


const SprintsHeroSection = () => {
  return (
    <section className="roadmaps-hero">
      {/*<ParticlesBackground
        id="particles-roadmaps-hero"
        particleColors={['#3B82F6', '#60A5FA', '#93C5FD']}
        lineColor="#3B82F6"
      />*/}
      <div className="hero-content centered" data-aos="fade-up" data-aos-duration="1000">
        <div className="typing-container">
          <h1 className="typing-text">Learning <span className="highlight">Roadmaps</span></h1>
        </div>
        <h2>Your Journey to Tech Mastery</h2>
        <p>Structured learning paths designed to take you from beginner to expert in various technology stacks</p>
      </div>
    </section>
  );
};

export default SprintsHeroSection;