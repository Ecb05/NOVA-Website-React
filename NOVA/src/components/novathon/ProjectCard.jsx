import React from "react";

export default function ProjectCard({ project, onClick }) {
  return (
    <div className="winner-card" onClick={onClick}>
      <img src={project.thumbnail} className="winner-thumb" alt="" />

      <h2 className="winner-title">{project.title}</h2>

      {/* Bottom Section */}
      <div className="winner-footer">
        <p className="team-name">{project.teamName}</p>
        <p className="winner-status">{project.status}</p>
      </div>
    </div>
  );
}
