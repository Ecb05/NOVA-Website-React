import React from 'react'
import { QRCodeSVG } from 'qrcode.react'
import EventBook from '../EventBook/EventBook'

const LINKTREE_URL = 'https://linktr.ee/nova.mvsr'

const AboutSection: React.FC = (): React.JSX.Element => {
  return (
    <section id="about" className="about section">
      <div className="section-header" data-aos="fade-up">
        <h2>What We <span className="highlight">Do</span></h2>
        <div className="underline"></div>
      </div>

      <div className="about-container">
        <div className="about-content" data-aos="fade-up" style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
          <EventBook />
        </div>
      </div>

      {/* QR Code Card */}
      <div className="qr-section" data-aos="fade-up" data-aos-delay="100">
        <div className="qr-card">
          <div className="qr-glow"></div>
          <div className="qr-inner">
            <div className="qr-code-wrap">
              <QRCodeSVG
                value={LINKTREE_URL}
                size={160}
                bgColor="transparent"
                fgColor="#E6EDF3"
                level="M"
                includeMargin={false}
              />
            </div>
            <div className="qr-info">
              <h3>Connect With Us</h3>
              <p>Scan to explore all our social links</p>
              <a
                href={LINKTREE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="qr-link"
              >
                linktr.ee/nova.mvsr
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default AboutSection
