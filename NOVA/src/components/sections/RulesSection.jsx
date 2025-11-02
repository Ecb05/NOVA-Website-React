

const RulesSection = () => {
  return (
    <section className="rules-section">
      <div className="container">
        <h1 className="section-title" data-aos="fade-up">Hackathon Rules & Guidelines</h1>
        <div className="rules-container" data-aos="fade-up">
          <div className="rules-section" data-aos="fade-up" data-aos-delay="100">
            <h2><i className="fas fa-users"></i> Team Formation</h2>
            <ul className="rules-list">
              <li>Teams must consist of 1-3 members from any department.</li>
              <li>Collaboration and equal contribution are expected.</li>
              <li>Each team must register with a unique team Leader e-mail.</li>
              <li>Members must use their own laptops and tools.</li>
            </ul>
          </div>

          <div className="rules-section" data-aos="fade-up" data-aos-delay="200">
            <h2><i className="fas fa-code"></i> Project Guidelines</h2>
            <ul className="rules-list">
              <li>Projects are encouraged to be original and full-stack websites.</li>
              <li>Use of any AI agents or tools is allowed.</li>
              <li>Code should be well-documented and deployed.</li>
              <li>A fully deployed website link or a well documented git-hub repo link along with a gdrive link to a video presentation of the project is required.</li>
              <li>Creativity, functionality, and usability will be evaluated.</li>
            </ul>
          </div>

          <div className="rules-section" data-aos="fade-up" data-aos-delay="300">
            <h2><i className="fas fa-clock"></i> Time Management</h2>
            <ul className="rules-list">
              <li>Hackathon duration: 70 hours.</li>
              <li>Plan tasks efficiently — no extra time will be provided.</li>
              <li>Keep backups and test frequently during development.</li>
              <li>Submit before the final deadline to avoid disqualification.</li>
            </ul>
          </div>

           <div className="rules-section" data-aos="fade-up" data-aos-delay="400">
            <h2><i className="fas fa-trophy"></i> Evaluation Criteria</h2>
            
            {/* Frontend Section */}
            <h3 style={{ color: 'var(--secondary-color)', marginTop: '1.5rem', marginBottom: '1rem' }}>
              <i className="fas fa-laptop-code"></i> Frontend (40 pts)
            </h3>
            <ul className="rules-list">
              <li>
                <strong>Visual Design & Appeal</strong> - Overall look, layout, colors, fonts, and consistency (10 pts)
              </li>
              <li>
                <strong>Responsiveness & Compatibility</strong> - Works on different devices and browsers (10 pts)
              </li>
              <li>
                <strong>Interactivity & Navigation</strong> - Smooth user flow and working interactive elements (10 pts)
              </li>
              <li>
                <strong>Code Structure & Maintainability</strong> - Clean, understandable, and reusable frontend code (10 pts)
              </li>
            </ul>

            {/* Backend Section */}
            <h3 style={{ color: 'var(--secondary-color)', marginTop: '1.5rem', marginBottom: '1rem' }}>
              <i className="fas fa-server"></i> Backend (40 pts)
            </h3>
            <ul className="rules-list">
              <li>
                <strong>Core Functionality</strong> - Backend correctly supports project features (10 pts)
              </li>
              <li>
                <strong>Data Handling</strong> - Data is stored, retrieved, and updated correctly (10 pts)
              </li>
              <li>
                <strong>Performance & Reliability</strong> - Smooth execution without crashes or major bugs (10 pts)
              </li>
              <li>
                <strong>Scalability & Deployment</strong> - Project is deployed and structured for future growth (10 pts)
              </li>
            </ul>

            {/* Common/Overall Section */}
            <h3 style={{ color: 'var(--secondary-color)', marginTop: '1.5rem', marginBottom: '1rem' }}>
              <i className="fas fa-check-circle"></i> Common / Overall (20 pts)
            </h3>
            <ul className="rules-list">
              <li>
                <strong>Documentation & Accessibility</strong> - Clarity and completeness of online submission (10 pts)
              </li>
              <li>
                <strong>Creativity & Real-World Relevance</strong> - Originality and usefulness of the idea (10 pts)
              </li>
            </ul>

            {/* Bonus Section */}
            <h3 style={{ color: '#ffd700', marginTop: '1.5rem', marginBottom: '1rem' }}>
              <i className="fas fa-star"></i> Bonus (Optional)
            </h3>
            <ul className="rules-list">
              <li>
                <strong>Integrations & Extra Features</strong> - Additional functionality like chatbots, APIs, or third-party tools (+5 pts)
              </li>
            </ul>
          </div>

          <div className="rules-section" data-aos="fade-up" data-aos-delay="500">
            <h2><i className="fas fa-exclamation-triangle"></i> Code of Conduct</h2>
            <ul className="rules-list">
              <li>Respect all participants and mentors.</li>
              <li>No plagiarism or use of pre-built solutions.</li>
              <li>Maintain professional behavior throughout the hackathon.</li>
              <li>Adhere to all venue, equipment, and event rules.</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default RulesSection;
