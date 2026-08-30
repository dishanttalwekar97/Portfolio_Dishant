import React from "react";
import heroAvatar from "../assets/hero.png";
import SpotlightCard from "./SpotlightCard";

export default function About() {
  const competencies = [
    "Full-Stack Web Development",
    "Data Structures & Algorithms",
    "RESTful API Architecture",
    "Modern React Ecosystem",
    "Scalable Backend Systems",
    "UI/UX & Accessibility",
    "Agile & Remote-First",
    "Performance Optimization",
  ];

  return (
    <section id="about" className="cinematic-section">
      <div className="main-container">
        {/* Section Header */}
        <div className="section-header reveal-on-scroll">
          <div className="section-tagline">BIOGRAPHY // 01</div>
          <h2 className="section-title">Who I Am &amp; What I Build</h2>
          <p className="section-description">
            A developer dedicated to writing clean, maintainable code and
            architecting intuitive digital experiences.
          </p>
        </div>

        {/* Grid Layout */}
        <div className="about-grid">
          {/* Avatar Column */}
          <SpotlightCard className="avatar-cinematic-card reveal-on-scroll reveal-left">
            <div className="avatar-viewfinder-frame">
              <div className="avatar-viewfinder-inner">
                <img
                  src={heroAvatar}
                  alt="Dishant Talwekar"
                  className="avatar-img"
                  loading="lazy"
                />
                <div className="avatar-scanline" aria-hidden="true" />
              </div>
            </div>

            <h3 className="avatar-meta-name">Dishant Talwekar</h3>
            <p className="avatar-meta-role">Full Stack Developer &amp; CSE Undergrad</p>

            <div className="avatar-quick-badges">
              <span className="cinematic-badge">📍 India</span>
              <span className="cinematic-badge">💼 Intern @ Tinywork</span>
            </div>
          </SpotlightCard>

          {/* Narrative Column */}
          <div className="about-narrative">
            <SpotlightCard className="about-headline-card reveal-on-scroll reveal-right">
              <h3 className="about-lead-quote">
                Passionate Full Stack Developer building scalable, accessible, and user-friendly web applications.
              </h3>

              <p className="about-paragraph">
                I am a passionate Full Stack Developer with a strong foundation in
                building responsive, scalable web applications. I specialize in
                both frontend and backend development, creating seamless user
                interfaces and robust server-side architectures.
              </p>

              <p className="about-paragraph">
                With a rigorous focus on computer science fundamentals, I have
                solved <strong>70+ problems on LeetCode</strong>, continually sharpening
                my analytical problem-solving and logical optimization capabilities.
              </p>

              <p className="about-paragraph">
                Currently, I am working as an <strong>Intern at Tinywork Infotech</strong>,
                where I gain direct hands-on experience in production-grade software
                development, code collaboration, and shipping real-world features.
              </p>
            </SpotlightCard>

            {/* Highlights Sub-Cards */}
            <div className="about-highlights-grid">
              <SpotlightCard className="highlight-subcard reveal-on-scroll reveal-delay-1">
                <div className="highlight-icon-box">🏢</div>
                <div className="highlight-content">
                  <h4>Tinywork Infotech</h4>
                  <p>Software Engineering Intern delivering real-world features and collaborating in agile teams.</p>
                </div>
              </SpotlightCard>

              <SpotlightCard className="highlight-subcard reveal-on-scroll reveal-delay-2">
                <div className="highlight-icon-box">⚡</div>
                <div className="highlight-content">
                  <h4>70+ LeetCode Solved</h4>
                  <p>Deep foundation in Data Structures, Algorithms, time-space optimization, and problem solving.</p>
                </div>
              </SpotlightCard>
            </div>

            {/* Core Competencies Tags */}
            <SpotlightCard className="reveal-on-scroll reveal-delay-3" style={{ padding: "20px 24px" }}>
              <div style={{ marginBottom: "10px", fontSize: "0.82rem", fontFamily: "var(--font-mono)", color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.06em" }}>
                Core Competencies &amp; Mindset
              </div>
              <div className="about-tags-row">
                {competencies.map((item, idx) => (
                  <span key={idx} className="skill-tag-pill">
                    {item}
                  </span>
                ))}
              </div>
            </SpotlightCard>
          </div>
        </div>
      </div>
    </section>
  );
}
