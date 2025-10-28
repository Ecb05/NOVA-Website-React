import React from 'react';

const FullStackRoadmap = () => {
  return (
    <section className="detailed-roadmap mern-roadmap" id="mern-roadmap">
      <div className="section-header" data-aos="fade-up">
        <h2><i className="fab fa-js-square"></i> <span className="highlight">FullStack</span> Web Development Roadmap</h2>
        <p>GitHub • React • Flask & Fast API • DataBase • Deployment</p>
      </div>
      
      <div className="roadmap-timeline">
        <div className="timeline-item" data-aos="fade-right" data-aos-delay="100">
          <div className="timeline-marker">1</div>
          <div className="timeline-content">
            <h3>GitHub Fundamentals</h3>
            <p>Master the building blocks of version control</p>
            <div className="timeline-resources">
             <div className="resource-link">Comming Soon</div>
            </div>
            <span className="timeline-duration">Week 1</span>
            <span className="timeline-duration">Speaker : Lalith ( 4th Year - CSE)</span>
          </div>
        </div>
        
        <div className="timeline-item" data-aos="fade-left" data-aos-delay="200">
          <div className="timeline-marker">2</div>
          <div className="timeline-content">
            <h3>React.js Frontend Development</h3>
            <p>Build dynamic user interfaces with React</p>
            <div className="timeline-resources">
              <div className="resource-link">Comming Soon</div>
            </div>
            <span className="timeline-duration">Week 2</span>
            <span className="timeline-duration">Speaker : Ayush ( 4th Year - IT)</span>
          </div>
        </div>
        
        <div className="timeline-item" data-aos="fade-right" data-aos-delay="300">
          <div className="timeline-marker">3</div>
          <div className="timeline-content">
            <h3>Backend - Flask & Fast API</h3>
            <p>Create robust server-side applications</p>
            <div className="timeline-resources">
              <div className="resource-link">Comming Soon</div>
            </div>
            <span className="timeline-duration">Week 3</span>
            <span className="timeline-duration">Speaker : Karthikeya ( 4th Year - IT)</span>
          </div>
        </div>
        
        <div className="timeline-item" data-aos="fade-left" data-aos-delay="400">
          <div className="timeline-marker">4</div>
          <div className="timeline-content">
            <h3> Database Integration</h3>
            <p>Store and manage data with MongoDB</p>
            <div className="timeline-resources">
               <div className="resource-link">Comming Soon</div>
            </div>
            <span className="timeline-duration">Week 4</span>
            <span className="timeline-duration">Speaker : Karthikeya ( 4th Year - IT)</span>
          </div>
        </div>

        <div className="timeline-item" data-aos="fade-left" data-aos-delay="400">
          <div className="timeline-marker">5</div>
          <div className="timeline-content">
            <h3> Deployment</h3>
            <p>Deploy and share your website with others</p>
            <div className="timeline-resources">
              <div className="resource-link">Comming Soon</div>
            </div>
            <span className="timeline-duration">Week 5</span>
            <span className="timeline-duration">Speaker : Ayush ( 4th Year - IT)</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FullStackRoadmap;