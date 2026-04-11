import React from 'react';
import { Link } from 'react-router-dom';

const IdeasprintSection = () => {
  const features = [
    {
      icon: 'fas fa-lightbulb',
      title: 'Open Innovation',
      description: 'Bring any idea from any domain. No boundaries — just raw creativity and problem solving.',
    },
    {
      icon: 'fas fa-chalkboard-teacher',
      title: 'Expert Mentorship',
      description: 'Get real-time guidance from industry professionals and seasoned academics throughout the sprint.',
    },
    {
      icon: 'fas fa-trophy',
      title: 'Win Big',
      description: 'Compete for exciting prizes while gaining recognition, connections, and hands-on experience.',
    },
  ];

  return (
    <section id="ideasprint" className="ideasprint">
      {/* Background decorative blobs */}
      <div className="ideasprint-blob blob-1" aria-hidden="true" />
      <div className="ideasprint-blob blob-2" aria-hidden="true" />

      <div className="ideasprint-container">

        {/* Badge */}
        <div className="ideasprint-badge">
          <i className="fas fa-bolt" />
          <span>Upcoming Event</span>
        </div>

        {/* Header */}
        <div className="section-header">
          <h2>
            Idea<span className="highlight ideasprint-highlight">sprint</span>
          </h2>
          <div className="underline ideasprint-underline" />
          <p className="ideasprint-tagline">
            48 hours. Infinite possibilities. One spark to change everything.
          </p>
        </div>

        {/* Event Meta */}
        <div className="ideasprint-meta">
          <div className="meta-card">
            <i className="fas fa-calendar-alt meta-icon" />
            <div>
              <span className="meta-label">Date</span>
              <span className="meta-value">17th – 18th April 2026</span>
            </div>
          </div>
          <div className="meta-card">
            <i className="fas fa-map-marker-alt meta-icon" />
            <div>
              <span className="meta-label">Venue</span>
              <span className="meta-value">MVSREC, Hyderabad</span>
            </div>
          </div>
          <div className="meta-card">
            <i className="fas fa-clock meta-icon" />
            <div>
              <span className="meta-label">Duration</span>
              <span className="meta-value">48-Hour Ideathon</span>
            </div>
          </div>
        </div>

        {/* Description */}
        <p className="ideasprint-description">
          IdeaSprint is NOVA's flagship ideathon — a high-energy, creativity-fuelled event where
          students from all fields come together to tackle real-world challenges. Pitch, prototype,
          and present your boldest ideas on one of the biggest stages in the college calendar.
        </p>

        {/* Feature Cards */}
        <div className="ideasprint-features">
          {features.map((feat, idx) => (
            <div key={idx} className="ideasprint-feature-card">
              <div className="feature-icon-wrap">
                <i className={feat.icon} />
              </div>
              <h3>{feat.title}</h3>
              <p>{feat.description}</p>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="ideasprint-cta">
          <Link to="/register" className="btn ideasprint-btn">
            Register Now <i className="fas fa-arrow-right" />
          </Link>
        </div>

      </div>
    </section>
  );
};

export default IdeasprintSection;
