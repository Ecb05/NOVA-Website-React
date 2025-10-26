import React, { useState, useEffect } from 'react';

const CountdownSection = ({ onOpenRegistration, onOpenSubmission }) => {
  const [countdown, setCountdown] = useState({ 
    days: 0, 
    hours: 0, 
    minutes: 0, 
    seconds: 0 
  });

  useEffect(() => {
    // Set your event date here
    const targetDate = new Date('2025-11-03T00:00:00').getTime();

    const interval = setInterval(() => {
      const now = new Date().getTime();
      const distance = targetDate - now;
      if (distance < 0) {
        clearInterval(interval);
        setCountdown({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        return;
      }

      setCountdown({
        days: Math.floor(distance / (1000 * 60 * 60 * 24)),
        hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((distance % (1000 * 60)) / 1000)
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section id='countdown-section' className="countdown-section">
      <div className="container">
        <div className="countdown-container" data-aos="fade-up">
          <h2><span className="highlight">Novathon 2025</span></h2>
          <div className="countdown">
            <div className="countdown-item" data-aos="fade-up" data-aos-delay="100">
              <div className="countdown-number">
                {countdown.days.toString().padStart(2, '0')}
              </div>
              <div className="countdown-label">Days</div>
            </div>
            <div className="countdown-item" data-aos="fade-up" data-aos-delay="200">
              <div className="countdown-number">
                {countdown.hours.toString().padStart(2, '0')}
              </div>
              <div className="countdown-label">Hours</div>
            </div>
            <div className="countdown-item" data-aos="fade-up" data-aos-delay="300">
              <div className="countdown-number">
                {countdown.minutes.toString().padStart(2, '0')}
              </div>
              <div className="countdown-label">Minutes</div>
            </div>
            <div className="countdown-item" data-aos="fade-up" data-aos-delay="400">
              <div className="countdown-number">
                {countdown.seconds.toString().padStart(2, '0')}
              </div>
              <div className="countdown-label">Seconds</div>
            </div>
          </div>
          <div className="action-buttons">
            <button 
              className="action-btn submit-btn" 
              data-aos="fade-up" 
              data-aos-delay="500"
              onClick={onOpenSubmission}
            >
              Submit Project
            </button>
            <button 
              className="action-btn register-btn" 
              data-aos="fade-up" 
              data-aos-delay="600"
              onClick={onOpenRegistration}
            >
              Register Now
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CountdownSection;