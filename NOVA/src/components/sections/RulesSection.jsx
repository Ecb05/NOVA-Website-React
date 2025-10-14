

const RulesSection = () => {
  return (
    <section className="rules-section">
      <div className="container">
        <h1 className="section-title" data-aos="fade-up">Hackathon Rules & Guidelines</h1>
        <div className="rules-container" data-aos="fade-up">
          <div className="rules-section" data-aos="fade-up" data-aos-delay="100">
            <h2><i className="fas fa-users"></i> Team Formation</h2>
            <ul className="rules-list">
              <li>Teams must consist of 2-4 members from any department.</li>
              <li>Collaboration and equal contribution are expected.</li>
              <li>Each team must register with a unique team name.</li>
              <li>Members must use their own laptops and tools.</li>
            </ul>
          </div>

          <div className="rules-section" data-aos="fade-up" data-aos-delay="200">
            <h2><i className="fas fa-code"></i> Project Guidelines</h2>
            <ul className="rules-list">
              <li>Projects must be original and AI-integrated full-stack websites.</li>
              <li>Use of any AI agents or tools is allowed.</li>
              <li>All code must be properly documented.</li>
              <li>Code should be well-documented and deployed.</li>
              <li>Creativity, functionality, and usability will be evaluated.</li>
            </ul>
          </div>

          <div className="rules-section" data-aos="fade-up" data-aos-delay="300">
            <h2><i className="fas fa-clock"></i> Time Management</h2>
            <ul className="rules-list">
              <li>Hackathon duration: 24 hours.</li>
              <li>Plan tasks efficiently — no extra time will be provided.</li>
              <li>Keep backups and test frequently during development.</li>
              <li>Submit before the final deadline to avoid disqualification.</li>
            </ul>
          </div>

          <div className="rules-section" data-aos="fade-up" data-aos-delay="400">
            <h2><i className="fas fa-trophy"></i> Judging Criteria</h2>
            <ul className="rules-list">
              <li>Innovation and creativity (30%)</li>
              <li>Technical implementation (30%)</li>
              <li>User experience and design (20%)</li>
              <li>Presentation and pitch (20%)</li>
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
