import React from 'react';
import placeholderImg from '../../assets/panelist_card_placeholder.png';

/**
 * Replace `image`, `name`, `role`, `company`, and `expertise` with
 * real data when content is ready. All fields are easy to swap.
 */
const PANELISTS = [
  {
    id: 1,
    image: "/images/hero/ashrith.png",
    name: 'Ashrith Munikuntla',
    role: 'Founder at PIL Gaming',
    linkedin: 'https://www.linkedin.com/in/ashrithmunikuntla?utm_source=share_via&utm_content=profile&utm_medium=member_android',
  },
  {
    id: 2,
    image: "/images/hero/anishay.png",
    name: 'Anishay Raj',
    role: 'Director at Exclusive Magnesium Pvt. Ltd.',
    linkedin: 'https://www.linkedin.com/in/anishay-raj-07ab8914/',
  },
  {
    id: 3,
    image: "/images/hero/kumudini.png",
    name: 'Kumudini Bolleboina',
    role: 'COO & Cofounder at MetaLoga',
    linkedin: "https://www.linkedin.com/in/kumudini-bolleboina-b8320a42?utm_source=share_via&utm_content=profile&utm_medium=member_android",
  },
  {
    id: 4,
    image: "/images/hero/Pradhyumna.png",
    name: 'Pradhyumna Enugula',
    role: 'Director at Bharat Charge',
    linkedin: "https://www.linkedin.com/in/pradhyumnaenugula?utm_source=share_via&utm_content=profile&utm_medium=member_android"
  },
];

const Panelists = () => {
  return (
    <section className="is-section is-panelists-section">
      <div className="is-section-inner">
        {/* Section header */}
        <div className="is-chip">Expert Panel</div>
        <h2 className="is-section-title">
          Meet the <span className="is-green">Panelists</span>
        </h2>
        <p className="is-panelists-subtitle">
          Pitch your ideas to visionaries, get live feedback from CXOs, and learn from the minds
          shaping tomorrow's industry.
        </p>

        {/* Cards grid */}
        <div className="is-panelists-grid">
          {PANELISTS.map(({ id, image, name, role, company, expertise, linkedin }) => {
            const CardContent = (
              <>
                {/* Full-bleed background image */}
                <div className="is-pcard-img-wrap">
                  <img
                    src={image}
                    alt={`${name} — ${role}`}
                    className="is-pcard-img"
                    loading="lazy"
                  />
                </div>

                {/* Gradient overlay — always present, intensifies on hover */}
                <div className="is-pcard-overlay" aria-hidden="true" />

                {/* Green top-left corner accent */}
                <span className="is-pcard-corner" aria-hidden="true" />

                {/* Number badge */}
                <span className="is-pcard-num" aria-hidden="true">
                  {String(id).padStart(2, '0')}
                </span>

                {/* Text content pinned to bottom */}
                <div className="is-pcard-body">
                  {expertise && (
                    <>
                      <p className="is-pcard-expertise">{expertise}</p>
                      <div className="is-pcard-divider" aria-hidden="true" />
                    </>
                  )}
                  <h3 className="is-pcard-name">{name}</h3>
                  <p className="is-pcard-role">{role}</p>
                  <p className="is-pcard-company">{company}</p>
                </div>
              </>
            );

            return linkedin ? (
              <a
                key={id}
                href={linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="is-pcard is-pcard-link"
                title={`Visit ${name}'s LinkedIn profile`}
              >
                {CardContent}
              </a>
            ) : (
              <div key={id} className="is-pcard">
                {CardContent}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Panelists;
