import React from 'react';
import { Link } from 'react-router-dom';

const VibeathonHeroSection = ({ onScrollToSection }) => {
  return (
    <section className="vibe-hero">
      <div className="vibe-hero-content">
        <h1><span className="highlight">Novathon</span></h1>
        <h2>The Online AI Hackathon for Students</h2>
        <p>Get ready to solve exciting problem statements using any AI tools of your choice, all from the comfort of your home!</p>
        <div className="vibe-hero-buttons">
          <button 
            onClick={() => onScrollToSection('problem-statements')} 
            className="vibe-btn primary-btn"
          >
            Problem statements
          </button>
          <Link to="/register" className="vibe-btn secondary-btn">
            Register Now
          </Link>
        </div>
      </div>
      <div className="vibe-hero-image">
        <img src="https://incubator.ucf.edu/wp-content/uploads/2023/07/artificial-intelligence-new-technology-science-futuristic-abstract-human-brain-ai-technology-cpu-central-processor-unit-chipset-big-data-machine-learning-cyber-mind-domination-generative-ai-scaled-1.jpg" height ="100px" width = "100px" alt="AI Hackathon Illustration" />
      </div>
    </section>
  );
};

export default VibeathonHeroSection;