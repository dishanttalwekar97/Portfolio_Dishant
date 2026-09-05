import React, { useEffect, useState } from "react";
import SpotlightCard from "./SpotlightCard";
import InteractiveTerminal from "./InteractiveTerminal";

const TYPEWRITER_PHRASES = [
  "Computer Science Student",
  "Aspiring Full Stack Developer",
  "React & Node.js Specialist",
  "Problem Solver (70+ LeetCode)",
  "Modern Web Developer",
];

export default function Hero({ onNavigate, onOpenContact }) {
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentPhrase = TYPEWRITER_PHRASES[phraseIndex];
    let timer;

    if (!isDeleting && charIndex < currentPhrase.length) {
      timer = setTimeout(() => {
        setCharIndex((prev) => prev + 1);
      }, 75);
    } else if (!isDeleting && charIndex === currentPhrase.length) {
      timer = setTimeout(() => {
        setIsDeleting(true);
      }, 1600);
    } else if (isDeleting && charIndex > 0) {
      timer = setTimeout(() => {
        setCharIndex((prev) => prev - 1);
      }, 45);
    } else if (isDeleting && charIndex === 0) {
      timer = setTimeout(() => {
        setIsDeleting(false);
        setPhraseIndex((prev) => (prev + 1) % TYPEWRITER_PHRASES.length);
      }, 200);
    }

    return () => clearTimeout(timer);
  }, [charIndex, isDeleting, phraseIndex]);

  const currentText = TYPEWRITER_PHRASES[phraseIndex].substring(0, charIndex);

  const stats = [
    {
      num: "01 // STATUS",
      value: "Final Year CSE",
      label: "B.Tech Undergrad",
    },
    {
      num: "02 // EXPERIENCE",
      value: "Intern",
      label: "Tinywork Infotech",
    },
    {
      num: "03 // DSA SOLVED",
      value: "70+ Problems",
      label: "LeetCode Milestone",
    },
    {
      num: "04 // PORTFOLIO",
      value: "10+ Projects",
      label: "Built & Deployed",
    },
  ];

  return (
    <section id="home" className="hero-section cinematic-section">
      <div className="main-container">
        <div className="hero-content">
          {/* Availability Beacon */}
          <div className="hero-availability-tag">
            <div className="cinematic-badge">
              <span className="pulse-indicator" aria-hidden="true" />
              <span>OPEN TO INTERNSHIPS &amp; OPPORTUNITIES</span>
            </div>
          </div>

          {/* Main Title */}
          <h1 className="hero-main-title">
            <span className="hero-title-gradient">Dishant Talwekar</span>
          </h1>

          {/* Typewriter Box */}
          <div className="typewriter-box" aria-live="polite">
            <span className="typewriter-prefix">//</span>
            <span>{currentText}</span>
            <span className="typewriter-cursor" aria-hidden="true" />
          </div>

          {/* Bio Lead */}
          <p className="hero-bio-lead">
            Pursuing <strong>B.Tech (Final Year)</strong> in Computer Science
            Engineering. Passionate about crafting high-performance, responsive
            web experiences and transforming complex ideas into elegant,
            production-ready applications.
          </p>

          {/* Action Buttons */}
          <div className="hero-actions-row">
            <button
              type="button"
              className="btn btn-primary"
              onClick={() => onNavigate("projects")}
            >
              <span>Explore Projects</span>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="7" y1="17" x2="17" y2="7"></line>
                <polyline points="7 7 17 7 17 17"></polyline>
              </svg>
            </button>

            <a
              href="/Dishant_resume_.pdf"
              target="_blank"
              rel="noreferrer"
              className="btn btn-resume"
              title="Download or View Dishant's Resume"
            >
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                <polyline points="7 10 12 15 17 10"></polyline>
                <line x1="12" y1="15" x2="12" y2="3"></line>
              </svg>
              <span>Download CV</span>
            </a>

            <button
              type="button"
              className="btn btn-secondary"
              onClick={() => onNavigate("about")}
            >
              <span>Read Biography</span>
            </button>

            <button
              type="button"
              className="btn btn-ghost"
              onClick={onOpenContact}
            >
              <span>Get In Touch</span>
            </button>
          </div>

          {/* Interactive Cyberpunk CLI Terminal */}
          <InteractiveTerminal
            onNavigate={onNavigate}
            onOpenContact={onOpenContact}
          />

          {/* HUD Stats Grid */}
          <div className="hero-stats-grid">
            {stats.map((stat, idx) => (
              <SpotlightCard key={idx} className={`stat-box reveal-on-scroll reveal-delay-${idx + 1}`}>
                <span className="stat-number">{stat.num}</span>
                <span className="stat-value">{stat.value}</span>
                <span className="stat-label">{stat.label}</span>
              </SpotlightCard>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
