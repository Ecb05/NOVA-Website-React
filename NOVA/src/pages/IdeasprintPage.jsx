import React, { useEffect, useState } from 'react';
import Panelists from '../components/sections/Panelists';

const IdeasprintPage = () => {
  const [countdown, setCountdown] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const eventDate = new Date('2026-04-17T09:30:00');
    const timer = setInterval(() => {
      const now = new Date();
      const diff = eventDate - now;
      if (diff <= 0) { clearInterval(timer); return; }
      setCountdown({
        days: Math.floor(diff / (1000 * 60 * 60 * 24)),
        hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((diff / (1000 * 60)) % 60),
        seconds: Math.floor((diff / 1000) % 60),
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const highlights = [
    { icon: '🏆', label: 'Prize Pool', value: '₹20,000' },
    { icon: '🎫', label: 'Entry Fee', value: '₹100 / head' },
    { icon: '📅', label: 'Duration', value: '1 Day' },
    { icon: '🎯', label: 'Slots', value: 'Limited' },
  ];

  const tracks = [
    {
      icon: '💡',
      title: 'Open Innovation',
      desc: 'No domain restrictions. Bring your boldest idea across tech, social, health, or any field that matters.',
    },
    {
      icon: '🤝',
      title: 'Collaborative Sprint',
      desc: 'Team up, brainstorm, and iterate. The best solutions come from diverse minds working together.',
    },
    {
      icon: '🧑‍🏫',
      title: 'Expert Mentorship',
      desc: 'Get real-time guidance from CXOs and industry mentors to shape and sharpen your ideas.',
    },
    {
      icon: '🎤',
      title: 'Pitch & Win',
      desc: 'Present your solution to a live panel of judges and compete for the ₹20,000 prize pool.',
    },
  ];

  return (
    <div className="ideasprint-page">

      {/* ─── HERO ─── */}
      <section className="is-hero">
        {/* Geometric decorations */}
        <span className="is-geo is-geo-tl" aria-hidden="true" />
        <span className="is-geo is-geo-tr" aria-hidden="true" />
        <span className="is-geo is-geo-bl" aria-hidden="true" />
        <span className="is-geo is-geo-br" aria-hidden="true" />
        <span className="is-dot-grid" aria-hidden="true" />

        <div className="is-hero-inner">
          {/* Sub-brand */}
          <p className="is-subbrand">
            <span className="is-org">CSE-NOVA</span>
            <span className="is-cross">✕</span>
            <span className="is-org">Fusion</span>
            &nbsp;<span className="is-tagline-sub">— Explore Beyond Limits —</span>
          </p>

          {/* Main title */}
          <h1 className="is-title">
            <span className="is-title-idea">Idea</span>
            <span className="is-title-sprint">sprint</span>
          </h1>

          <p className="is-event-parent">
            Part of&nbsp;<strong>Samvarthan 2026</strong>
            &nbsp;· MVSR Engineering College
          </p>

          {/* Meta row */}
          <div className="is-meta-row">
            <div className="is-meta-pill">
              <span className="is-meta-icon">📅</span>
              17–18 April 2026
            </div>
            <div className="is-meta-pill">
              <span className="is-meta-icon">⏰</span>
              9:30 AM – 4:30 PM
            </div>
            <div className="is-meta-pill">
              <span className="is-meta-icon">📍</span>
              MVSREC, Hyderabad
            </div>
          </div>

          {/* CTA */}
          <div className="is-hero-cta">
            <a
              href="https://unstop.com/o/2LIKSbP?utm_medium=Share&utm_source=pyhzfmkb88386&utm_campaign=Competitions"
              target="_blank"
              rel="noreferrer"
              className="is-btn-primary"
            >
              Register Now
              <span className="is-btn-arrow">→</span>
            </a>
            <a
              href="#is-about"
              className="is-btn-secondary"
              onClick={(e) => {
                e.preventDefault();
                document.getElementById('is-about')?.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              Learn More
            </a>
          </div>
        </div>
      </section>

      {/* ─── PANELISTS ─── */}
      <Panelists />

      {/* ─── COUNTDOWN ─── */}
      <section className="is-countdown-bar">
        <p className="is-countdown-label">Event starts in</p>
        <div className="is-countdown-grid">
          {[
            { n: countdown.days, l: 'Days' },
            { n: countdown.hours, l: 'Hours' },
            { n: countdown.minutes, l: 'Min' },
            { n: countdown.seconds, l: 'Sec' },
          ].map(({ n, l }) => (
            <div key={l} className="is-count-box">
              <span className="is-count-num">{String(n).padStart(2, '0')}</span>
              <span className="is-count-label">{l}</span>
            </div>
          ))}
        </div>
      </section>

      {/* ─── HIGHLIGHTS ─── */}
      <div className="is-highlights-strip">
        {highlights.map(({ icon, label, value }) => (
          <div key={label} className="is-hl-card">
            <span className="is-hl-icon">{icon}</span>
            <span className="is-hl-value">{value}</span>
            <span className="is-hl-label">{label}</span>
          </div>
        ))}
      </div>

      {/* ─── ABOUT ─── */}
      <section id="is-about" className="is-section is-about-section">
        <div className="is-section-inner">
          <div className="is-about-grid">
            {/* Left: text */}
            <div className="is-about-text">
              <div className="is-chip">About the Event</div>
              <h2 className="is-section-title">
                What is <span className="is-green">IdeaSprint?</span>
              </h2>
              <p>
                IdeaSprint is a fast-paced, 1-day ideathon hosted at MVSR Engineering College by
                CSE-NOVA in collaboration with Fusion. It challenges students from any discipline to
                present innovative solutions to real-world problems.
              </p>
              <p>
                Whether you're a developer, designer, or a first-time innovator — if you have an
                idea worth fighting for, this is your stage.
              </p>
              <ul className="is-about-list">
                <li><span className="is-check">✓</span> Open to all students</li>
                <li><span className="is-check">✓</span> Any domain, any background</li>
                <li><span className="is-check">✓</span> Team of 1 - 3 members</li>
                <li><span className="is-check">✓</span> Limited slots — register early</li>
              </ul>
            </div>

            {/* Right: visual card */}
            <div className="is-about-card-wrap">
              <div className="is-event-card">
                <div className="is-event-card-header">
                  <span className="is-live-badge">LIVE EVENT</span>
                </div>
                <div className="is-event-card-body">
                  <p className="is-card-date">17 April 2026</p>
                  <p className="is-card-time">9:30 AM – 4:30 PM IST</p>
                  <div className="is-card-divider" />
                  <div className="is-card-detail">
                    <span>📍</span>
                    <span>MVSR Engineering College, Hyderabad</span>
                  </div>
                  <div className="is-card-detail">
                    <span>💰</span>
                    <span>Registration: ₹100 per head</span>
                  </div>
                  <div className="is-card-detail">
                    <span>🏆</span>
                    <span>Prize Pool: ₹20,000</span>
                  </div>
                  <div className="is-card-divider" />
                  <a
                    href="https://unstop.com/o/2LIKSbP?utm_medium=Share&utm_source=pyhzfmkb88386&utm_campaign=Competitions"
                    target="_blank"
                    rel="noreferrer"
                    className="is-card-register-btn"
                  >
                    Register Now →
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── TRACKS ─── */}
      <section className="is-section is-tracks-section">
        <div className="is-section-inner">
          <div className="is-chip">What to Expect</div>
          <h2 className="is-section-title">
            Sprint <span className="is-green">Highlights</span>
          </h2>
          <div className="is-tracks-grid">
            {tracks.map(({ icon, title, desc }) => (
              <div key={title} className="is-track-card">
                <div className="is-track-icon">{icon}</div>
                <h3 className="is-track-title">{title}</h3>
                <p className="is-track-desc">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── COORDINATORS ─── */}
      <section className="is-section is-coord-section">
        <div className="is-section-inner">
          <div className="is-chip">Contact</div>
          <h2 className="is-section-title">
            Meet the <span className="is-green">Coordinators</span>
          </h2>
          <div className="is-coord-grid">
            <div className="is-coord-group">
              <h3 className="is-coord-group-title">👨‍🎓 Student Coordinators</h3>
              <div className="is-coord-card">
                <span className="is-coord-name">Eshank Chakravarthy</span>
                <a href="tel:9642200046" className="is-coord-phone">📞 9642200046</a>
              </div>
              <div className="is-coord-card">
                <span className="is-coord-name">Vishnu Sai Yadav</span>
                <a href="tel:8008520760" className="is-coord-phone">📞 8008520760</a>
              </div>
            </div>
            <div className="is-coord-group">
              <h3 className="is-coord-group-title">👩‍🏫 Faculty Coordinators</h3>
              <div className="is-coord-card">
                <span className="is-coord-name">K. Padma</span>
              </div>
              <div className="is-coord-card">
                <span className="is-coord-name">Dr. Sirisha Daggubati</span>
              </div>
              <div className="is-coord-card">
                <span className="is-coord-name">Dr. Namita Parati</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── FINAL CTA ─── */}
      <section className="is-final-cta">
        <span className="is-geo is-geo-cta-l" aria-hidden="true" />
        <span className="is-geo is-geo-cta-r" aria-hidden="true" />
        <div className="is-final-cta-inner">
          <p className="is-final-sub">Limited Slots Available</p>
          <h2 className="is-final-title">Ready to Sprint?</h2>
          <p className="is-final-desc">
            Secure your spot today. Join the brightest minds at MVSREC for hours of ideas,
            mentorship, and glory.
          </p>
          <a
            href="https://unstop.com/o/2LIKSbP?utm_medium=Share&utm_source=pyhzfmkb88386&utm_campaign=Competitions"
            target="_blank"
            rel="noreferrer"
            className="is-btn-primary is-btn-large"
          >
            Register Now — ₹100/head
            <span className="is-btn-arrow">→</span>
          </a>
          <p className="is-final-web">
            🌐 <a href="https://thenova.club" target="_blank" rel="noreferrer">thenova.club</a>
          </p>
        </div>
      </section>

    </div>
  );
};

export default IdeasprintPage;
