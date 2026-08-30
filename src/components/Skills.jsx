import React, { useState } from "react";
import SpotlightCard from "./SpotlightCard";

// ─── Skill Data ───────────────────────────────────────────────────────────────
const ALL_SKILLS = [
  // ── Languages ─────────────────────────────────────────────────────────────
  { name: "C",          category: "Languages", icon: "c",          color: "#659AD2" },
  { name: "C++",        category: "Languages", icon: "cpp",        color: "#00599C" },
  { name: "Java",       category: "Languages", icon: "java",       color: "#F89820" },
  { name: "Python",     category: "Languages", icon: "python",     color: "#3776AB" },
  { name: "JavaScript", category: "Languages", icon: "javascript", color: "#F7DF1E" },
  { name: "SQL",        category: "Languages", icon: "sql",        color: "#F97316" },

  // ── Frontend ───────────────────────────────────────────────────────────────
  { name: "React.js",       category: "Frontend", icon: "react",      color: "#61DAFB" },
  { name: "HTML5",          category: "Frontend", icon: "html",       color: "#E34F26" },
  { name: "CSS3",           category: "Frontend", icon: "css",        color: "#264DE4" },
  { name: "Tailwind CSS",   category: "Frontend", icon: "tailwind",   color: "#38BDF8" },
  { name: "Bootstrap",      category: "Frontend", icon: "bootstrap",  color: "#7952B3" },

  // ── Backend ────────────────────────────────────────────────────────────────
  { name: "Node.js",    category: "Backend", icon: "node",    color: "#5FA04E" },
  { name: "Express.js", category: "Backend", icon: "express", color: "#FFFFFF" },
  { name: "Django",     category: "Backend", icon: "django",  color: "#2BA977" },
  { name: "REST APIs",  category: "Backend", icon: "api",     color: "#A855F7" },

  // ── Database ───────────────────────────────────────────────────────────────
  { name: "MongoDB",    category: "Database", icon: "mongodb",  color: "#47A248" },
  { name: "PostgreSQL", category: "Database", icon: "postgres", color: "#336791" },
  { name: "MySQL",      category: "Database", icon: "mysql",    color: "#4479A1" },
  { name: "Redis",      category: "Database", icon: "redis",    color: "#DC382D" },

  // ── DevOps ─────────────────────────────────────────────────────────────────
  { name: "Git",            category: "DevOps", icon: "git",            color: "#F05032" },
  { name: "GitHub",         category: "DevOps", icon: "github",         color: "#E6EDF3" },
  { name: "GitHub Actions", category: "DevOps", icon: "githubactions",  color: "#2088FF" },
  { name: "Docker",         category: "DevOps", icon: "docker",         color: "#2496ED" },
  { name: "Kubernetes",     category: "DevOps", icon: "kubernetes",     color: "#326CE5" },
  { name: "CI / CD",        category: "DevOps", icon: "cicd",           color: "#22C55E" },
];

// ─── Category meta (icon + color for tab labels) ──────────────────────────────
const CATEGORY_META = {
  All:       { color: "#FFFFFF", emoji: "⚡" },
  Languages: { color: "#F89820", emoji: "🔤" },
  Frontend:  { color: "#61DAFB", emoji: "🎨" },
  Backend:   { color: "#5FA04E", emoji: "⚙️" },
  Database:  { color: "#47A248", emoji: "🗄️" },
  DevOps:    { color: "#2496ED", emoji: "🚀" },
};

// ─── Brand SVG Icons ──────────────────────────────────────────────────────────
function BrandSkillIcon({ type }) {
  switch (type) {
    /* ── C ── */
    case "c":
      return (
        <svg width="28" height="28" viewBox="0 0 24 24">
          <path d="M12 2.8 20.4 7.6v8.8L12 21.2 3.6 16.4V7.6z" fill="#00599C" />
          <text x="12" y="15" textAnchor="middle" fill="#fff" fontSize="9" fontWeight="bold" fontFamily="sans-serif">C</text>
        </svg>
      );
    /* ── C++ ── */
    case "cpp":
      return (
        <svg width="28" height="28" viewBox="0 0 24 24">
          <path d="M12 2.8 20.4 7.6v8.8L12 21.2 3.6 16.4V7.6z" fill="#004482" />
          <text x="12" y="14.8" textAnchor="middle" fill="#659AD2" fontSize="7.5" fontWeight="bold" fontFamily="sans-serif">C++</text>
        </svg>
      );
    /* ── Java ── */
    case "java":
      return (
        <svg width="28" height="28" viewBox="0 0 24 24">
          <path d="M7 15c0 2.2 2.2 4 5 4s5-1.8 5-4H7Z" fill="#E76F00" />
          <path d="M9 11c1-1 2-1.5 3-1.5s2 .5 3 1.5" fill="none" stroke="#5382A1" strokeWidth="2" strokeLinecap="round" />
          <path d="M8 8c1.3-1.2 2.6-1.8 4-1.8s2.7.6 4 1.8" fill="none" stroke="#5382A1" strokeWidth="2" strokeLinecap="round" />
          <path d="M6 19.5h12" stroke="#E76F00" strokeWidth="2" strokeLinecap="round" />
        </svg>
      );
    /* ── Python ── */
    case "python":
      return (
        <svg width="28" height="28" viewBox="0 0 24 24">
          <path d="M11.8 2.5c-4.2 0-4 1.8-4 1.8l.01 1.9h4.1v.6H6.1S3.5 6.5 3.5 10.6s2.3 3.9 2.3 3.9h1.4v-1.9s-.1-2.3 2.3-2.3h3.9s2.2.04 2.2-2.1V4.4S16 2.5 11.8 2.5Zm-2.3 1.2c.4 0 .7.3.7.7s-.3.7-.7.7-.7-.3-.7-.7.3-.7.7-.7Z" fill="#3776AB" />
          <path d="M12.2 21.5c4.2 0 4-1.8 4-1.8l-.01-1.9h-4.1v-.6h5.8s2.6.3 2.6-3.8-2.3-3.9-2.3-3.9h-1.4v1.9s.1 2.3-2.3 2.3H10.5s-2.2-.04-2.2 2.1v3.8S8 21.5 12.2 21.5Zm2.3-1.2c-.4 0-.7-.3-.7-.7s.3-.7.7-.7.7.3.7.7-.3.7-.7.7Z" fill="#FFD43B" />
        </svg>
      );
    /* ── JavaScript ── */
    case "javascript":
      return (
        <svg width="28" height="28" viewBox="0 0 24 24">
          <rect x="2" y="2" width="20" height="20" rx="4" fill="#F7DF1E" />
          <text x="12" y="16.5" textAnchor="middle" fill="#000" fontSize="10" fontWeight="bold" fontFamily="sans-serif">JS</text>
        </svg>
      );
    /* ── SQL ── */
    case "sql":
      return (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
          <ellipse cx="12" cy="6.5" rx="7" ry="2.8" fill="#F97316" opacity=".9" />
          <path d="M5 6.5v5c0 1.5 3.1 2.8 7 2.8s7-1.3 7-2.8v-5" stroke="#F97316" strokeWidth="1.8" />
          <path d="M5 11.5v5c0 1.5 3.1 2.8 7 2.8s7-1.3 7-2.8v-5" stroke="#F97316" strokeWidth="1.8" />
        </svg>
      );
    /* ── React ── */
    case "react":
      return (
        <svg width="28" height="28" viewBox="0 0 24 24">
          <circle cx="12" cy="12" r="2.4" fill="#61DAFB" />
          <ellipse cx="12" cy="12" rx="9" ry="3.6" fill="none" stroke="#61DAFB" strokeWidth="1.6" />
          <ellipse cx="12" cy="12" rx="9" ry="3.6" fill="none" stroke="#61DAFB" strokeWidth="1.6" transform="rotate(60 12 12)" />
          <ellipse cx="12" cy="12" rx="9" ry="3.6" fill="none" stroke="#61DAFB" strokeWidth="1.6" transform="rotate(120 12 12)" />
        </svg>
      );
    /* ── HTML5 ── */
    case "html":
      return (
        <svg width="28" height="28" viewBox="0 0 24 24">
          <polygon points="4 3 6 19 12 21 18 19 20 3 4 3" fill="#E44D26" />
          <polygon points="12 4.4 12 19.6 16.7 18.2 18.3 4.4" fill="#F16529" />
          <path d="M12 7.2H8.3l.3 3.6h3.4v2.5H9l.2 2.7 2.8.8v2.6l-5-1.5-.7-8.3h5.7V7.2Z" fill="#EBEBEB" />
          <path d="M12 7.2v2.4h3.4l-.3 3.6H12v2.5h3.2l-.3 3.4-2.9.8v2.6l5-1.5.6-7.8H12V7.2Z" fill="#FFF" />
        </svg>
      );
    /* ── CSS3 ── */
    case "css":
      return (
        <svg width="28" height="28" viewBox="0 0 24 24">
          <polygon points="4 3 6 19 12 21 18 19 20 3 4 3" fill="#264DE4" />
          <polygon points="12 4.4 12 19.6 16.7 18.2 18.3 4.4" fill="#2965F1" />
          <path d="M12 7.2H8l.3 3.6h3.7v2.4H9l.2 2.8 2.8.8v2.6l-5-1.5-.8-8.3h5.8V7.2Z" fill="#EBEBEB" />
          <path d="M12 7.2v2.4h3.6l-.3 3.6H12v2.4h3.2l-.3 3.4-2.9.8v2.6l5-1.5.6-7.8H12V7.2Z" fill="#FFF" />
        </svg>
      );
    /* ── Tailwind ── */
    case "tailwind":
      return (
        <svg width="28" height="28" viewBox="0 0 24 24">
          <path d="M6.2 10.4c1.1-2 2.3-2.8 3.8-2.8 2.3 0 2.7 1.7 4.2 2.5 1 .5 2.2.4 3.8-.6-1.1 2-2.3 2.8-3.8 2.8-2.3 0-2.7-1.7-4.2-2.5-1-.5-2.2-.4-3.8.6Z" fill="#38BDF8" />
          <path d="M5.2 15c1.1-2 2.3-2.8 3.8-2.8 2.3 0 2.7 1.7 4.2 2.5 1 .5 2.2.4 3.8-.6-1.1 2-2.3 2.8-3.8 2.8-2.3 0-2.7-1.7-4.2-2.5-1-.5-2.2-.4-3.8.6Z" fill="#0EA5E9" />
        </svg>
      );
    /* ── Bootstrap ── */
    case "bootstrap":
      return (
        <svg width="28" height="28" viewBox="0 0 24 24">
          <rect x="2" y="2" width="20" height="20" rx="5" fill="#7952B3" />
          <text x="12" y="16.5" textAnchor="middle" fill="#FFF" fontSize="13" fontWeight="bold" fontFamily="sans-serif">B</text>
        </svg>
      );
    /* ── Node.js ── */
    case "node":
      return (
        <svg width="28" height="28" viewBox="0 0 24 24">
          <path d="M12 2.5 20 7.2v9.6L12 21.5 4 16.8V7.2z" fill="#5FA04E" />
          <text x="12" y="15" textAnchor="middle" fill="#FFF" fontSize="9" fontWeight="bold" fontFamily="sans-serif">N</text>
        </svg>
      );
    /* ── Express.js ── */
    case "express":
      return (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
          <rect x="2" y="2" width="20" height="20" rx="4" fill="#1a1a1a" stroke="#555" strokeWidth="1" />
          <text x="12" y="14.5" textAnchor="middle" fill="#FFF" fontSize="6.5" fontWeight="bold" fontFamily="sans-serif" letterSpacing="0.5">EX</text>
        </svg>
      );
    /* ── Django ── */
    case "django":
      return (
        <svg width="28" height="28" viewBox="0 0 24 24">
          <rect x="2" y="2" width="20" height="20" rx="4" fill="#092E20" />
          <text x="12" y="15.8" textAnchor="middle" fill="#2BA977" fontSize="9" fontWeight="bold" fontFamily="sans-serif">Dj</text>
        </svg>
      );
    /* ── REST API ── */
    case "api":
      return (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#A855F7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="2" y="2" width="20" height="8" rx="2" />
          <rect x="2" y="14" width="20" height="8" rx="2" />
          <line x1="6" y1="6" x2="6.01" y2="6" />
          <line x1="6" y1="18" x2="6.01" y2="18" />
        </svg>
      );
    /* ── MongoDB ── */
    case "mongodb":
      return (
        <svg width="28" height="28" viewBox="0 0 24 24">
          <path d="M12 2.5c1.2 2 4.4 5.2 4.4 9.5 0 3.5-2 6.2-4.4 8.5-2.4-2.3-4.4-5-4.4-8.5 0-4.3 3.2-7.5 4.4-9.5Z" fill="#47A248" />
          <path d="M12 4.5v14" stroke="#13AA52" strokeWidth="1.2" opacity=".8" />
        </svg>
      );
    /* ── PostgreSQL ── */
    case "postgres":
      return (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
          <ellipse cx="12" cy="6" rx="7" ry="2.8" fill="#336791" />
          <path d="M5 6v5c0 1.5 3.1 2.8 7 2.8s7-1.3 7-2.8V6" stroke="#336791" strokeWidth="2" />
          <path d="M5 11v5c0 1.5 3.1 2.8 7 2.8s7-1.3 7-2.8v-5" stroke="#336791" strokeWidth="2" />
          {/* elephant ear */}
          <path d="M17 5.5 C19 4.5 20 6.5 18.5 8" stroke="#336791" strokeWidth="1.5" fill="none" strokeLinecap="round" />
        </svg>
      );
    /* ── MySQL ── */
    case "mysql":
      return (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
          <ellipse cx="12" cy="6.5" rx="7" ry="2.8" fill="#4479A1" />
          <path d="M5 6.5v5c0 1.5 3.1 2.8 7 2.8s7-1.3 7-2.8v-5" stroke="#4479A1" strokeWidth="1.8" />
          <path d="M5 11.5v5c0 1.5 3.1 2.8 7 2.8s7-1.3 7-2.8v-5" stroke="#4479A1" strokeWidth="1.8" />
          <path d="M17.5 18.5 C20 16 20.5 12 19 9" stroke="#F29111" strokeWidth="1.5" fill="none" strokeLinecap="round" />
        </svg>
      );
    /* ── Redis ── */
    case "redis":
      return (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
          <ellipse cx="12" cy="16" rx="9" ry="3" fill="#DC382D" />
          <ellipse cx="12" cy="12" rx="9" ry="3" fill="#FF6B6B" />
          <ellipse cx="12" cy="8" rx="9" ry="3" fill="#DC382D" />
          {/* lightning bolt */}
          <path d="M13 6 L10 12 L13 12 L10 18" stroke="#FFF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" opacity="0.8" />
        </svg>
      );
    /* ── Git ── */
    case "git":
      return (
        <svg width="28" height="28" viewBox="0 0 24 24">
          <rect x="4" y="4" width="16" height="16" rx="2.5" transform="rotate(45 12 12)" fill="#F05032" />
          <circle cx="9" cy="9" r="1.5" fill="#FFF" />
          <circle cx="15" cy="15" r="1.5" fill="#FFF" />
          <circle cx="9" cy="15" r="1.5" fill="#FFF" />
          <path d="M9 10.5v3m1.3-4.5h3.2a1.5 1.5 0 0 1 1.5 1.5" fill="none" stroke="#FFF" strokeWidth="1.3" strokeLinecap="round" />
        </svg>
      );
    /* ── GitHub ── */
    case "github":
      return (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="#E6EDF3">
          <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0 0 22 12.017C22 6.484 17.522 2 12 2z" />
        </svg>
      );
    /* ── GitHub Actions ── */
    case "githubactions":
      return (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
          <circle cx="12" cy="12" r="10" fill="#161B22" stroke="#2088FF" strokeWidth="1.5" />
          {/* play button triangle */}
          <path d="M9.5 8.5 L16.5 12 L9.5 15.5 Z" fill="#2088FF" />
          {/* orbit dots */}
          <circle cx="12" cy="3" r="1.5" fill="#2088FF" />
          <circle cx="21" cy="12" r="1.5" fill="#2088FF" />
          <circle cx="3" cy="12" r="1.5" fill="#2088FF" />
        </svg>
      );
    /* ── Docker ── */
    case "docker":
      return (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="#2496ED">
          <rect x="4.5" y="9" width="3" height="3" rx="0.5" />
          <rect x="8.5" y="9" width="3" height="3" rx="0.5" />
          <rect x="12.5" y="9" width="3" height="3" rx="0.5" />
          <rect x="8.5" y="5.5" width="3" height="3" rx="0.5" />
          <rect x="12.5" y="5.5" width="3" height="3" rx="0.5" />
          <path d="M3.5 13h13c.9 0 1.8-.4 2.4-1.1.5-.5.9-1.1 1.1-1.9.5.4.8 1.1.8 1.8 0 2.7-2.1 4.9-4.8 4.9H9.3c-2.7 0-4.8-1.7-5.8-3.7Z" />
        </svg>
      );
    /* ── Kubernetes ── */
    case "kubernetes":
      return (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
          <circle cx="12" cy="12" r="10" fill="#326CE5" />
          {/* helm wheel */}
          <circle cx="12" cy="12" r="2.5" fill="#fff" />
          {/* 6 spokes */}
          {[0,60,120,180,240,300].map(deg => {
            const rad = (deg * Math.PI) / 180;
            const x1 = 12 + 3.2 * Math.cos(rad);
            const y1 = 12 + 3.2 * Math.sin(rad);
            const x2 = 12 + 7.5 * Math.cos(rad);
            const y2 = 12 + 7.5 * Math.sin(rad);
            return <line key={deg} x1={x1} y1={y1} x2={x2} y2={y2} stroke="#fff" strokeWidth="1.6" strokeLinecap="round" />;
          })}
          {/* outer ring */}
          <circle cx="12" cy="12" r="7.5" fill="none" stroke="#fff" strokeWidth="1.2" />
        </svg>
      );
    /* ── CI/CD ── */
    case "cicd":
      return (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
          <rect x="2" y="2" width="20" height="20" rx="5" fill="#0D1117" stroke="#22C55E" strokeWidth="1.5" />
          {/* pipeline arrows */}
          <circle cx="6.5" cy="12" r="2" fill="#22C55E" />
          <path d="M8.5 12h2" stroke="#22C55E" strokeWidth="1.5" strokeLinecap="round" />
          <circle cx="12" cy="12" r="2" fill="#16A34A" />
          <path d="M14 12h2" stroke="#22C55E" strokeWidth="1.5" strokeLinecap="round" />
          <circle cx="17.5" cy="12" r="2" fill="#22C55E" />
          {/* arrows above/below */}
          <path d="M5 8 L7 6 M17 6 L19 8" stroke="#22C55E" strokeWidth="1.2" strokeLinecap="round" />
          <path d="M5 16 L7 18 M17 18 L19 16" stroke="#22C55E" strokeWidth="1.2" strokeLinecap="round" />
        </svg>
      );
    /* ── default ── */
    default:
      return (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#FFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="16 18 22 12 16 6" />
          <polyline points="8 6 2 12 8 18" />
        </svg>
      );
  }
}

// ─── Main Component ────────────────────────────────────────────────────────────
export default function Skills() {
  const [selectedCategory, setSelectedCategory] = useState("All");

  const categories = ["All", "Languages", "Frontend", "Backend", "Database", "DevOps"];

  const filteredSkills =
    selectedCategory === "All"
      ? ALL_SKILLS
      : ALL_SKILLS.filter((s) => s.category === selectedCategory);

  return (
    <section id="skills" className="cinematic-section">
      <div className="main-container">

        {/* ── Section Header ── */}
        <div className="section-header centered">
          <div className="section-tagline">TECH STACK // 02</div>
          <h2 className="section-title">Technical Expertise</h2>
          <p className="section-description">
            A comprehensive toolkit spanning programming languages, modern frontend frameworks,
            powerful backend engines, scalable databases, and production-ready DevOps tooling.
          </p>
        </div>

        {/* ── Filter Bar ── */}
        <div className="skills-filter-bar" role="tablist" aria-label="Skill categories">
          {categories.map((cat) => {
            const meta = CATEGORY_META[cat] || { color: "#FFF", emoji: "•" };
            const isActive = selectedCategory === cat;
            return (
              <button
                key={cat}
                type="button"
                role="tab"
                aria-selected={isActive}
                className={`filter-tab-btn ${isActive ? "active" : ""}`}
                style={isActive ? {
                  borderColor: meta.color,
                  color: meta.color,
                  boxShadow: `0 0 12px ${meta.color}40`,
                  background: `${meta.color}12`,
                } : {}}
                onClick={() => setSelectedCategory(cat)}
              >
                <span className="tab-emoji" aria-hidden="true">{meta.emoji}</span>
                {cat}
              </button>
            );
          })}
        </div>

        {/* ── Category Groups (when "All" selected) ── */}
        {selectedCategory === "All" ? (
          <div className="skills-by-category">
            {["Languages", "Frontend", "Backend", "Database", "DevOps"].map((cat) => {
              const meta = CATEGORY_META[cat];
              const catSkills = ALL_SKILLS.filter((s) => s.category === cat);
              return (
                <div key={cat} className="skill-category-group">
                  <div
                    className="skill-category-group-header"
                    style={{ "--cat-color": meta.color }}
                  >
                    <span className="cat-emoji" aria-hidden="true">{meta.emoji}</span>
                    <span className="cat-label">{cat}</span>
                    <span className="cat-count">{catSkills.length} skills</span>
                  </div>
                  <div className="skills-matrix-grid">
                    {catSkills.map((skill, idx) => (
                      <SkillCard key={idx} skill={skill} />
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          /* ── Filtered Grid ── */
          <div className="skills-matrix-grid">
            {filteredSkills.map((skill, idx) => (
              <SkillCard key={idx} skill={skill} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

function SkillCard({ skill }) {
  return (
    <SpotlightCard
      className="skill-matrix-card reveal-on-scroll"
      style={{ "--skill-color": skill.color }}
    >
      <div
        className="skill-icon-wrap"
        style={{
          boxShadow: `0 0 20px ${skill.color}30`,
          borderColor: `${skill.color}40`,
          background: `${skill.color}0D`,
        }}
        aria-hidden="true"
      >
        <BrandSkillIcon type={skill.icon} />
      </div>
      <div className="skill-info">
        <span className="skill-title">{skill.name}</span>
        <span
          className="skill-category-label"
          style={{ color: skill.color, opacity: 0.8 }}
        >
          {skill.category}
        </span>
      </div>
    </SpotlightCard>
  );
}
