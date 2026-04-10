import React from 'react';
import { Link } from 'react-router-dom';
import { SplineScene } from '../SplineScene';


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
        {/**<ParticlesBackground
          id="particles-hero"
          particleColors={['#00A8A8', '#00C896', '#1DE9B6']}
          lineColor="#00C896"
        />**/}
        <div className="hero-split-layout">

          {/* Left Column Content */}
          <div className="hero-content left-align" data-aos="fade-up" data-aos-duration="1000">
            <div className="typing-container">
              <h1 className="typing-text">Welcome to <span className="highlight">NOVA</span></h1>
            </div>
            <h2 className="delayed-reveal-1">Network of Visionary Aspirants</h2>
            <p className="delayed-reveal-2">Empowering students to innovate, collaborate, and excel in the world of technology</p>
            <div className="hero-buttons delayed-reveal-3">
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

          {/** Right Column Spline 3D Scene*/} 
          <div className="hero-spline-container" data-aos="fade-left" data-aos-duration="1200">
            <SplineScene
              scene="https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode"
              className="spline-canvas"
            />
          </div>

        </div>
      </section>
    </>
  );
};

export default HeroSection;