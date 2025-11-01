const ProblemStatementsSection = () => {
  return (
  <section id="problem-statements" className="problem-statements-section">
      <div className="container">
        <h1 className="section-title" data-aos="fade-up">Problem Statements</h1>
        <div className="problem-statements-container" data-aos="fade-up">
          <div className="problem-statements-content" data-aos="fade-up" data-aos-delay="100">
            <div className="problem-statements-announcement">
              <div className="announcement-icon">
                <i className="fas fa-lightbulb"></i>
              </div>
              <h2>Hackathon is Now Live!</h2>
              <p className="announcement-text">
                Problem statements are now available!
              </p>
              <p className="announcement-details">
                Get ready for exciting challenges that will test your creativity and technical skills.
                Click the button below to view all problem statements and start building your solution.
              </p>
              <a 
                href="https://drive.google.com/drive/folders/1ztfOecILj0IK7sNIK2RlpNHExtc4CgVO" 
                target="_blank" 
                rel="noopener noreferrer"
                className="ps-button"
              >
                <i className="fas fa-file-alt"></i> View Problem Statements
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProblemStatementsSection;
