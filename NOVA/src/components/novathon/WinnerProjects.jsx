import React, { useState } from "react";
import ProjectCard from "./ProjectCard";
import ProjectModal from "./ProjectModal";
import focusFlowThumb from "../../assets/novathon/focus_flow_thumb.jpg";
import habitFlowThumb from "../../assets/novathon/habit_flow_thumb.jpg";
import incoisSamacharThumb from "../../assets/novathon/incois_samachar_thumb.jpg";
import boxRecommenderThumb from "../../assets/novathon/box_recommender_thumb.jpg";

export default function WinnerProjects() {
  const [selectedProject, setSelectedProject] = useState(null);

  const projects = [
    {
      id: 1,
      title: "FOCUS FLOW",
      teamName: "Rubix",
      status: "FULLSTACK Winner",
      desc: "A distraction-free productivity workspace featuring an AI-powered assistant, smart Pomodoro timer, task management, and focus analytics to help you boost focus and achieve more.",
      link: "https://foocusflow.vercel.app/ ",
      thumbnail: focusFlowThumb,
      team: [
        { name: "Subramanya Chary", photo: "https://randomuser.me/api/portraits/men/32.jpg" },
        { name: "P.Srikar Naidu", photo: "https://randomuser.me/api/portraits/men/46.jpg" },
        { name: "Srujan Kaleru", photo: "https://randomuser.me/api/portraits/women/27.jpg" }
      ]
    },
    {
      id: 2,
      title: "STUDY NSQUARE",
      teamName: "N^2",
      status: "FULLSTACK RunnerUp",
      desc: "An innovative educational platform designed to enhance learning experiences and collaboration.",
      link: "https://study-nsquare-ifdh.vercel.app",
      thumbnail: boxRecommenderThumb,
      team: [
        { name: "Nishitha Saxena", photo: "https://randomuser.me/api/portraits/men/66.jpg" },
        { name: "Nidhi Pareek", photo: "https://randomuser.me/api/portraits/women/44.jpg" }
      ]
    },
    {
      id: 1,
      title: "HABIT FLOW",
      teamName: "SOLAR WAVES",
      status: "FRONTEND Winner",
      desc: "A smart habit tracker designed for students to build better habits, monitor sleep, manage college schedules, and stay motivated through gamification.",
      link: "https://routine-bliss-hub.lovable.app/",
      thumbnail: habitFlowThumb,
      team: [
        { name: "Suraj Pratap Singh", photo: "https://randomuser.me/api/portraits/men/32.jpg" },
        { name: "Aarnav Bhardwaj", photo: "https://randomuser.me/api/portraits/men/46.jpg" }
      ]
    },
    {
      id: 2,
      title: "INCOIS SAMACHAR",
      teamName: "THE_SHIP",
      status: "FRONTEND RunnerUp",
      desc: "A comprehensive coastal hazard monitoring system that provides real-time updates and alerts for coastal safety and disaster management.",
      link: "https://incois-samachar.vercel.app/",
      thumbnail: incoisSamacharThumb,
      team: [
        { name: "Sayoni Banerjee", photo: "https://randomuser.me/api/portraits/men/66.jpg" },
        { name: "Manas", photo: "https://randomuser.me/api/portraits/women/44.jpg" }
      ]
    }
  ];

  return (
    <>
      <div className="winner-grid">
        {projects.map((p) => (
          <ProjectCard key={p.id} project={p} onClick={() => setSelectedProject(p)} />
        ))}
      </div>

      {selectedProject && (
        <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />
      )}
    </>
  );
}
