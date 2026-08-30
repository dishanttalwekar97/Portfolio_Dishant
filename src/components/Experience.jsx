import React, { useState } from "react";
import SpotlightCard from "./SpotlightCard";

export default function Experience() {
  const [activeFilter, setActiveFilter] = useState("ALL");

  const experiences = [
    {
      id: "exp-1",
      period: "2024 — PRESENT",
      type: "INTERNSHIP",
      category: "EXPERIENCE",
      role: "Software Development Intern",
      organization: "Tinywork Infotech",
      iconType: "briefcase",
      location: "India // Remote / Hybrid",
      description:
        "Actively developing and maintaining client and internal web applications using modern React, JavaScript, and backend services. Collaborating with cross-functional engineers in agile sprints, conducting peer code reviews, and shipping production-ready features.",
      highlights: [
        "Architecting scalable frontend features with React.js, custom hooks, and state management.",
        "Collaborating in agile sprints, participating in code reviews, and maintaining clean code standards.",
        "Integrating REST APIs and optimizing UI performance across diverse device viewports."
      ],
      skills: ["React.js", "Node.js", "Agile Sprints", "Code Reviews", "REST APIs", "UI Integration"],
    },
  ];

  const filteredExperiences = experiences.filter((exp) => {
    if (activeFilter === "ALL") return true;
    return exp.category === activeFilter;
  });

  return (
    <section id="experience" className="cinematic-section is-visible">
      <div className="main-container">

        {/* Section Header */}
        <div className="section-header centered reveal-on-scroll is-visible">
          <div className="section-tagline">JOURNEY // 04</div>
          <h2 className="section-title">Experience</h2>
          <p className="section-description">
            A proven track record of continuous growth, hands-on software development internships, and strong computer science fundamentals.
          </p>

          {/* Monochrome Filter Tabs */}
          <div className="exp-filter-bar">
            {["ALL", "EXPERIENCE"].map((filter) => (
              <button
                key={filter}
                className={`exp-filter-btn ${activeFilter === filter ? "active" : ""}`}
                onClick={() => setActiveFilter(filter)}
              >
                {filter}
              </button>
            ))}
          </div>
        </div>

        {/* Experience Cards Stack */}
        <div className="experience-cards-stack">
          {filteredExperiences.map((exp, idx) => (
            <SpotlightCard
              key={exp.id}
              className={`experience-box-card reveal-on-scroll is-visible reveal-delay-${idx + 1}`}
            >
              {/* Card Header */}
              <div className="exp-card-header">
                <div className="exp-role-meta">
                  <div className="exp-icon-box">
                    {exp.iconType === "briefcase" ? (
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect>
                        <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path>
                      </svg>
                    ) : (
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M22 10v6M2 10l10-5 10 5-10 5z"></path>
                        <path d="M6 12v5c3 3 9 3 12 0v-5"></path>
                      </svg>
                    )}
                  </div>
                  <div>
                    <h3 className="exp-role-title">{exp.role}</h3>
                    <div className="exp-org-line">
                      <span className="exp-org-name">{exp.organization}</span>
                      <span className="exp-dot">•</span>
                      <span className="exp-loc">{exp.location}</span>
                    </div>
                  </div>
                </div>

                {/* Right Badges */}
                <div className="exp-badges-col">
                  <span className="exp-type-pill">
                    <span className="exp-live-dot" />
                    {exp.type}
                  </span>
                  <span className="exp-period-pill">{exp.period}</span>
                </div>
              </div>

              {/* Card Body Description */}
              <p className="exp-description">{exp.description}</p>

              {/* Highlights List */}
              <ul className="exp-highlights-list">
                {exp.highlights.map((item, hIdx) => (
                  <li key={hIdx} className="exp-highlight-item">
                    <span className="exp-bullet-mark">▸</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>

              {/* Skill Tags */}
              <div className="exp-skills-row">
                {exp.skills.map((skill, sIdx) => (
                  <span key={sIdx} className="exp-skill-tag">
                    {skill}
                  </span>
                ))}
              </div>
            </SpotlightCard>
          ))}
        </div>
      </div>
    </section>
  );
}

