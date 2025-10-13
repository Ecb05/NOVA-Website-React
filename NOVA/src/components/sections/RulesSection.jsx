

const RulesSection = () => {
  return (
    <section className="rules-section">
      <div className="container">
        <h1 className="section-title" data-aos="fade-up">Hackathon Rules & Guidelines</h1>
        <div className="rules-container" data-aos="fade-up">
          <div className="rules-section" data-aos="fade-up" data-aos-delay="100">
            <h2><i className="fas fa-users"></i> Team Formation</h2>
            <ul className="rules-list">
              <li>Teams must consist of 2-4 members</li>
              <li>All team members must be currently enrolled students</li>
              <li>Cross-college teams are allowed</li>
              <li>Each participant can be part of only one team</li>
            </ul>
          </div>

          <div className="rules-section" data-aos="fade-up" data-aos-delay="200">
            <h2><i className="fas fa-code"></i> Project Guidelines</h2>
            <ul className="rules-list">
              <li>Projects must be original and developed during the hackathon</li>
              <li>Use of open-source libraries and frameworks is allowed</li>
              <li>All code must be properly documented</li>
              <li>Projects must be submitted with a working prototype</li>
              <li>Include a README file with setup instructions</li>
            </ul>
          </div>

          <div className="rules-section" data-aos="fade-up" data-aos-delay="300">
            <h2><i className="fas fa-clock"></i> Time Management</h2>
            <ul className="rules-list">
              <li>Hackathon duration: 24 hours</li>
              <li>Regular check-ins are mandatory</li>
              <li>Final submission deadline is strict</li>
              <li>Teams can take breaks as needed</li>
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
              <li>Respect all participants and mentors</li>
              <li>No plagiarism or use of pre-built solutions</li>
              <li>Maintain professional behavior throughout</li>
              <li>Follow all venue and equipment rules</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default RulesSection;