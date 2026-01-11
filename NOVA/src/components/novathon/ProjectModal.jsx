import React from "react";

export default function ProjectModal({ project, onClose }) {
  return (
    <div className="modal-backdrop">
      <div className="modal-box">

        {/* Close Button */}
        <button className="modal-close" onClick={onClose}>
          ✕
        </button>

        {/* Title */}
        <h1 className="modal-title">{project.title}</h1>

        <div className="modal-content">

          {/* Description Section */}
          <div className="modal-desc">
            <p>{project.desc}</p>

            <button
              className="modal-btn"
              onClick={() => window.open(project.link, "_blank")}
            >
              View Complete Project
            </button>
          </div>

          {/* Team Members Right Section */}
          <div className="modal-team">
            {project.team.map((t, i) => (
              <div key={i} className="team-box">
                <img src={t.photo} alt="" className="team-photo" />
                <p className="team-name">{t.name}</p>
              </div>
            ))}
          </div>

        </div>
      </div>
    </div>
  );
}
