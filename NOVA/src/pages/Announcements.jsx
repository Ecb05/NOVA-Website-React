import React, { useState, useEffect } from 'react';
import ParticlesBackground from '../components/ParticlesBackground';

const AnnouncementsPage = () => {
  const [announcements, setAnnouncements] = useState([]);
  const [loading, setLoading] = useState(true);

  // Load announcements on component mount
  useEffect(() => {
    loadAnnouncements();
  }, []);

  // Function to load announcements from API
  const loadAnnouncements = async () => {
    setLoading(true);
    // Hardcoded empty state as requested
    setAnnouncements([]);
    setLoading(false);
  };

  if (loading) {
    return (
      <div className="loading-container" style={{ textAlign: 'center', padding: '2rem' }}>
        <div className="loading-spinner">Loading announcements...</div>
      </div>
    );
  }

  return (
    <div className="announcements-page-wrapper">
      <ParticlesBackground
        id="particles-announcements"
        particleColors={['#FF7A18', '#FFB347', '#FFD89B']}
        lineColor="#FF7A18"
      />
      {/* Page Header */}
      <section className="page-header">
        <div className="container">
          <div className="typing-container">
            <h1 className="typing-text">Latest <span className="highlight">Announcements</span></h1>
          </div>
          <div className="underline" data-aos="fade-up" data-aos-delay="100"></div>
          <p data-aos="fade-up" data-aos-delay="200">
            Stay updated with all the latest news, events, and opportunities from NOVA
          </p>
        </div>
      </section>

      {/* Announcements Section */}
      <section className="announcements-page">
        <div className="announcements-container">
          {announcements.length > 0 ? (
            announcements.map((announcement, index) => (
              <div
                key={announcement.id}
                className="announcement-card"
                data-aos="flip-left"
                data-aos-delay={(index + 1) * 100}
              >
                <div className="announcement-icon">
                  <i className={announcement.icon}></i>
                </div>
                <div className="announcement-date">
                  <span className="day">{announcement.date.day}</span>
                  <span className="month">{announcement.date.month}</span>
                </div>
                <h3 className="head">{announcement.title}</h3>
                <p>{announcement.description}</p>
                <div className="event-details">
                  <p>
                    <i className="fas fa-map-marker-alt"></i> {announcement.details.location}
                  </p>
                  <p>
                    <i className="fas fa-clock"></i> {announcement.details.time}
                  </p>
                </div>

                {announcement.registrationLink && (
                  <a
                    href={announcement.registrationLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="read-more"
                  >
                    Register Now <i className="fas fa-arrow-right"></i>
                  </a>
                )}
              </div>
            ))
          ) : (
            <div className="empty-state">
              <h3>No announcements available</h3>
              <p>Check back later for updates!</p>
            </div>
          )}
        </div>

        {/* Pagination - Uncomment when you have more announcements */}
        {/* <div className="pagination" data-aos="fade-up">
          <a href="#" className="active">1</a>
          <a href="#">2</a>
          <a href="#">3</a>
          <a href="#" className="next">Next <i className="fas fa-chevron-right"></i></a>
        </div> */}
      </section>
    </div>
  );
};

export default AnnouncementsPage;