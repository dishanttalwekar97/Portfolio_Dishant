import React from "react";
import SpotlightCard from "./SpotlightCard";

const PROJECTS = [
  {
    id: "01",
    icon: "📄",
    title: "AI Resume Builder",
    tagline: "ATS-Optimized Intelligent Career Platform",
    description:
      "Smart resume generator that creates ATS-friendly resumes with AI-powered summaries, contextual skill suggestions, and instant downloadable PDF templates.",
    tech: ["React.js", "Node.js", "MongoDB", "AI Prompts", "TailwindCSS"],
    projectLink: "https://resume-builder-client-teal.vercel.app/",
    status: "LIVE PRODUCTION",
    isLive: true,
  },
  {
    id: "02",
    icon: "🏨",
    title: "Wander Lusht",
    tagline: "Modern Hospitality & Accommodation Engine",
    description:
      "Comprehensive hotel booking web application where travelers explore stays, check real-time availability, and book rooms through a seamless reservation flow.",
    tech: ["React.js", "Node.js", "Express", "MongoDB", "Cloudinary"],
    projectLink: "https://wanderlust-25.onrender.com/listings",
    status: "LIVE PRODUCTION",
    isLive: true,
  },
  {
    id: "03",
    icon: "☕",
    title: "Smart Café — QR Ordering SaaS Application",
    tagline: "Contactless Dining & Multi-Tenant Kitchen POS (SaaS)",
    description:
      "Multi-tenant SaaS QR-based café ordering platform where diners scan table codes to browse digital menus and place orders, while staff manage kitchen queues with live WebSocket status updates.",
    tech: ["React.js", "Node.js", "MongoDB", "WebSockets", "QR Engine", "SaaS"],
    projectLink: "https://qr-cafe-1.onrender.com/scan/QjxLEId2gHIkTwNvjzvvyDgrKQ4lVyvE",
    adminLink: "https://qr-cafe-1.onrender.com/admin/login",
    demoCredentials: {
      cafeCode: "user",
      username: "user",
      password: "user",
    },
    status: "LIVE PRODUCTION (SAAS)",
    isLive: true,
  },
  {
    id: "04",
    icon: "🏥",
    title: "Hospital ERP System",
    tagline: "Enterprise Healthcare Operations Platform",
    description:
      "Comprehensive hospital management suite in active development for managing patient records, doctor scheduling, automated billing, and department workflows.",
    tech: ["Django", "React.js", "PostgreSQL", "REST APIs", "Role-Based Auth"],
    projectLink: null,
    status: "IN ACTIVE DEVELOPMENT",
    isLive: false,
  },
];

export default function Projects() {
  return (
    <section id="projects" className="cinematic-section">
      <div className="main-container">
        {/* Section Header */}
        <div className="section-header reveal-on-scroll">
          <div className="section-tagline">PORTFOLIO // 03</div>
          <h2 className="section-title">Featured Works &amp; Systems</h2>
          <p className="section-description">
            Selected full-stack web applications engineered for scalability, real-world utility, and delightful user experiences.
          </p>
        </div>

        {/* Projects Grid */}
        <div className="projects-showcase-grid">
          {PROJECTS.map((project, idx) => (
            <SpotlightCard key={project.id} className={`project-cinematic-card reveal-on-scroll reveal-delay-${(idx % 2) + 1}`}>
              {/* Card Top Meta */}
              <div className="project-card-top">
                <span className="project-index-badge">
                  PROJECT // {project.id}
                </span>

                <div
                  className={`project-status-pill ${
                    project.isLive ? "live" : ""
                  }`}
                >
                  <span className="status-dot" aria-hidden="true" />
                  <span>{project.status}</span>
                </div>
              </div>

              {/* Main Content */}
              <div className="project-main-content">
                <span className="project-icon-badge" aria-hidden="true">
                  {project.icon}
                </span>

                <h3 className="project-title">{project.title}</h3>

                <p className="project-description">{project.description}</p>

                {/* Tech Stack */}
                <div className="project-tech-stack">
                  {project.tech.map((t, idx) => (
                    <span key={idx} className="tech-tag-badge">
                      {t}
                    </span>
                  ))}
                </div>

                {/* Demo Credentials if available */}
                {project.demoCredentials && (
                  <div className="project-credentials-box">
                    <span className="cred-title">🔑 Admin Login:</span>
                    <span className="cred-item">Café Code: <code>{project.demoCredentials.cafeCode}</code></span>
                    <span className="cred-item">User: <code>{project.demoCredentials.username}</code></span>
                    <span className="cred-item">Pass: <code>{project.demoCredentials.password}</code></span>
                  </div>
                )}
              </div>

              {/* Card Footer Actions */}
              <div className="project-card-footer">
                <div className="project-actions-group">
                  {project.projectLink && (
                    <a
                      href={project.projectLink}
                      target="_blank"
                      rel="noreferrer"
                      className="project-launch-btn"
                    >
                      <span>{project.adminLink ? "Customer Scan Demo" : "Launch Live Demo"}</span>
                      <svg className="launch-arrow" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="7" y1="17" x2="17" y2="7"></line>
                        <polyline points="7 7 17 7 17 17"></polyline>
                      </svg>
                    </a>
                  )}

                  {project.adminLink && (
                    <a
                      href={project.adminLink}
                      target="_blank"
                      rel="noreferrer"
                      className="project-launch-btn admin-btn"
                    >
                      <span>Admin Portal</span>
                      <svg className="launch-arrow" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="7" y1="17" x2="17" y2="7"></line>
                        <polyline points="7 7 17 7 17 17"></polyline>
                      </svg>
                    </a>
                  )}

                  {!project.projectLink && !project.adminLink && (
                    <span style={{ fontSize: "0.85rem", color: "var(--text-muted)", fontFamily: "var(--font-mono)" }}>
                      🔨 Work in Progress (Internal Repo)
                    </span>
                  )}
                </div>

                <span style={{ fontSize: "0.78rem", color: "var(--text-dim)", fontFamily: "var(--font-mono)" }}>
                  {project.isLive ? "VERIFIED DEPLOYMENT" : "DEVELOPMENT"}
                </span>
              </div>
            </SpotlightCard>
          ))}
        </div>
      </div>
    </section>
  );
}
