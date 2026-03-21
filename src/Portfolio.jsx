import React, { useEffect, useMemo, useRef, useState } from "react";
import fallbackAvatar from "./assets/hero.png";

const typewriterWords = [
  "Computer Science Student",
  "Aspiring Full Stack Developer",
  "Web Developer",
  "Problem Solver",
];

const skills = [
  { icon: "c", name: "C", accent: "#60a5fa" },
  { icon: "cpp", name: "C++", accent: "#3b82f6" },
  { icon: "java", name: "Java", accent: "#f97316" },
  { icon: "python", name: "Python", accent: "#a78bfa" },
  { icon: "sql", name: "SQL", accent: "#38bdf8" },
  { icon: "mongodb", name: "MongoDB", accent: "#22c55e" },
  { icon: "docker", name: "Docker", accent: "#0ea5e9" },
  { icon: "django", name: "Django", accent: "#22c55e" },
  { icon: "git", name: "Git", accent: "#f97316" },
  { icon: "github", name: "GitHub", accent: "#94a3b8" },
  { icon: "node", name: "Node.js", accent: "#22c55e" },
  { icon: "html", name: "HTML", accent: "#f97316" },
  { icon: "tailwind", name: "CSS/Tailwind", accent: "#2dd4bf" },
  { icon: "bootstrap", name: "Bootstrap", accent: "#8b5cf6" },
];

const projects = [
  {
    icon: "📄",
    title: "AI Resume Builder",
    description:
      "Smart resume generator that creates ATS-friendly resumes with AI-powered summaries, skill suggestions, and downloadable templates.",
    tech: ["React", "Node.js", "MongoDB"],
    projectLink: "https://resume-builder-client-teal.vercel.app/",
    accent: "#8b5cf6",
  },
  {
    icon: "🛒",
    title: "Wander Lusht",
    description:
      "Hotel booking project where users can explore stays, check availability, and book rooms with a smooth reservation flow.",
    tech: ["React", "Node.js", "MongoDB"],
    projectLink: "https://wanderlust-25.onrender.com/listings",
    accent: "#7c3aed",
  },
  {
    icon: "☕",
    title: "Smart Café QR Ordering System",
    description:
      "QR-based café ordering system where customers scan a table QR code, place orders digitally, and staff manage live order status efficiently.",
    tech: ["React", "Node.js", "MongoDB"],
    accent: "#a78bfa",
  },
  {
    icon: "🏥",
    title: "Hospital ERP (Currently Working)",
    description:
      "Comprehensive hospital ERP system in progress for managing patients, appointments, billing, and day-to-day hospital operations.",
    tech: ["Django", "React", "PostgreSQL"],
    accent: "#6d28d9",
  },
];

const colorThemes = {
  dark: {
    "--bg": "#050509",
    "--body-bg": "radial-gradient(circle at 20% 8%, #17142a 0%, #0a0912 44%, #040407 84%)",
    "--primary": "#7a5cff",
    "--secondary": "#b8a8ff",
    "--text-primary": "#f5f6ff",
    "--text-muted": "#a8adbf",
    "--card": "#0f1018",
    "--card-alt": "#151723",
    "--border": "#2a2f45",
    "--aurora-cyan": "#7a5cff66",
    "--aurora-violet": "#6f50ff5f",
    "--aurora-rose": "#b8a8ff52",
    "--particle-rgb": "184, 170, 255",
    "--scrollbar-track": "#0a0b12",
    "--nav-scrolled-bg": "rgba(5, 5, 9, 0.88)",
    "--availability-border": "#3f3691",
    "--availability-bg": "rgba(63, 54, 145, 0.2)",
    "--btn-ghost-bg": "rgba(15, 16, 24, 0.8)",
    "--stat-bg": "#111323d9",
    "--stat-border": "#2a2f45",
    "--stat-hover-bg": "#171a2f",
    "--stat-hover-border": "#7a5cff70",
    "--tag-bg": "#121424",
    "--tag-border": "#343b5c",
    "--tag-text": "#e5e7ff",
    "--project-bg": "linear-gradient(180deg, #10121d, #0a0b14)",
    "--footer-border": "#262c46",
    "--logo-mark-text": "#ffffff",
  },
  light: {
    "--bg": "#ffffff",
    "--body-bg": "radial-gradient(circle at 20% 10%, #f5f0ff, #ffffff 56%, #faf7ff 92%)",
    "--primary": "#7c3aed",
    "--secondary": "#a855f7",
    "--text-primary": "#3d2468",
    "--text-muted": "#5b4b7a",
    "--card": "#ffffff",
    "--card-alt": "#f8f5ff",
    "--border": "#ddd1f7",
    "--aurora-cyan": "#8b5cf63b",
    "--aurora-violet": "#a855f736",
    "--aurora-rose": "#c4b5fd66",
    "--particle-rgb": "124, 58, 237",
    "--scrollbar-track": "#f3efff",
    "--nav-scrolled-bg": "rgba(255, 255, 255, 0.88)",
    "--availability-border": "#c4b5fd",
    "--availability-bg": "rgba(139, 92, 246, 0.12)",
    "--btn-ghost-bg": "rgba(255, 255, 255, 0.88)",
    "--stat-bg": "#faf7ff",
    "--stat-border": "#ddd1f7",
    "--stat-hover-bg": "#f3ecff",
    "--stat-hover-border": "#a78bfa99",
    "--tag-bg": "#f4efff",
    "--tag-border": "#d8c8ff",
    "--tag-text": "#4a2f7d",
    "--project-bg": "linear-gradient(180deg, #ffffff, #f8f4ff)",
    "--footer-border": "#ded5f4",
    "--logo-mark-text": "#ffffff",
  },
};

function CosmicBackground() {
  const stars = useMemo(
    () =>
      Array.from({ length: 46 }, (_, id) => ({
        id,
        size: `${(Math.random() * 2.4 + 0.7).toFixed(2)}px`,
        left: `${(Math.random() * 100).toFixed(2)}%`,
        top: `${(Math.random() * 100).toFixed(2)}%`,
        delay: `${(Math.random() * 7).toFixed(2)}s`,
        duration: `${(3.5 + Math.random() * 5.5).toFixed(2)}s`,
        opacity: (0.3 + Math.random() * 0.7).toFixed(2),
      })),
    []
  );

  return (
    <div className="cosmic-background" aria-hidden="true">
      <div className="aurora aurora-cyan" />
      <div className="aurora aurora-violet" />
      <div className="aurora aurora-rose" />
      <div className="bg-grid" />
      <div className="starfield">
        {stars.map((star) => (
          <span
            key={star.id}
            className="star"
            style={{
              width: star.size,
              height: star.size,
              left: star.left,
              top: star.top,
              animationDelay: star.delay,
              animationDuration: star.duration,
              opacity: star.opacity,
            }}
          />
        ))}
      </div>
      <div className="bg-noise" />
      <div className="bg-vignette" />
    </div>
  );
}

function ParticleBackground() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) {
      return undefined;
    }

    const ctx = canvas.getContext("2d");
    if (!ctx) {
      return undefined;
    }

    const particleCount = 80;
    const maxDistance = 120;
    let animationFrameId;
    let particleRgb = getComputedStyle(document.documentElement).getPropertyValue("--particle-rgb").trim() || "196, 181, 253";

    const readParticleColor = () => {
      const current = getComputedStyle(document.documentElement).getPropertyValue("--particle-rgb").trim();
      particleRgb = current || particleRgb;
    };

    const rootStyleObserver = new MutationObserver(() => {
      readParticleColor();
    });

    rootStyleObserver.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["style"],
    });

    const particles = [];

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resizeCanvas();

    for (let i = 0; i < particleCount; i += 1) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.6,
        vy: (Math.random() - 0.5) * 0.6,
        radius: Math.random() * 1.8 + 0.8,
        alpha: Math.random() * 0.7 + 0.2,
      });
    }

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (let i = 0; i < particles.length; i += 1) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;

        if (p.x <= 0 || p.x >= canvas.width) {
          p.vx *= -1;
        }
        if (p.y <= 0 || p.y >= canvas.height) {
          p.vy *= -1;
        }

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${particleRgb}, ${p.alpha})`;
        ctx.fill();
      }

      for (let i = 0; i < particles.length; i += 1) {
        for (let j = i + 1; j < particles.length; j += 1) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < maxDistance) {
            const lineAlpha = (1 - distance / maxDistance) * 0.32;
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(${particleRgb}, ${lineAlpha})`;
            ctx.lineWidth = 1;
            ctx.stroke();
          }
        }
      }

      animationFrameId = requestAnimationFrame(draw);
    };

    draw();
    window.addEventListener("resize", resizeCanvas);

    return () => {
      cancelAnimationFrame(animationFrameId);
      rootStyleObserver.disconnect();
      window.removeEventListener("resize", resizeCanvas);
    };
  }, []);

  return <canvas ref={canvasRef} className="particle-canvas" aria-hidden="true" />;
}

function TypeWriter({ words }) {
  const [index, setIndex] = useState(0);
  const [subIndex, setSubIndex] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    if (!words || words.length === 0) {
      return undefined;
    }

    const currentWord = words[index];
    let timeoutId;

    if (!deleting && subIndex < currentWord.length) {
      timeoutId = setTimeout(() => {
        setSubIndex((prev) => prev + 1);
      }, 90);
    } else if (!deleting && subIndex === currentWord.length) {
      timeoutId = setTimeout(() => {
        setDeleting(true);
      }, 1400);
    } else if (deleting && subIndex > 0) {
      timeoutId = setTimeout(() => {
        setSubIndex((prev) => prev - 1);
      }, 60);
    } else if (deleting && subIndex === 0) {
      setDeleting(false);
      setIndex((prev) => (prev + 1) % words.length);
    }

    return () => {
      clearTimeout(timeoutId);
    };
  }, [deleting, index, subIndex, words]);

  const word = words[index] || "";

  return (
    <div className="typewriter" aria-live="polite">
      <span>{word.substring(0, subIndex)}</span>
      <span className="cursor">|</span>
    </div>
  );
}

function Section({ id, children, className = "" }) {
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) {
      return undefined;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.2 }
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <section id={id} ref={ref} className={`section-block ${isVisible ? "is-visible" : ""} ${className}`}>
      {children}
    </section>
  );
}

function SectionTitle({ label, title }) {
  return (
    <div className="section-title-wrap">
      <p className="section-label">{label}</p>
      <h2 className="section-title">{title}</h2>
      <div className="section-underline" />
    </div>
  );
}

function SkillBrandIcon({ icon, label }) {
  const iconClassName = `skill-brand-svg skill-brand-${icon}`;

  switch (icon) {
    case "django":
      return (
        <svg className={iconClassName} viewBox="0 0 24 24" aria-hidden="true">
          <rect x="3" y="3" width="18" height="18" rx="3" fill="#0f172a" />
          <text x="12" y="15.2" textAnchor="middle" className="skill-brand-text light">Dj</text>
        </svg>
      );
    case "c":
      return (
        <svg className={iconClassName} viewBox="0 0 24 24" aria-hidden="true">
          <path d="M12 2.8 20.4 7.6v8.8L12 21.2 3.6 16.4V7.6z" fill="#00599c" />
          <text x="12" y="15" textAnchor="middle" className="skill-brand-text light">C</text>
        </svg>
      );
    case "cpp":
      return (
        <svg className={iconClassName} viewBox="0 0 24 24" aria-hidden="true">
          <path d="M12 2.8 20.4 7.6v8.8L12 21.2 3.6 16.4V7.6z" fill="#1d4ed8" />
          <text x="12" y="14.8" textAnchor="middle" className="skill-brand-text light">C+</text>
        </svg>
      );
    case "java":
      return (
        <svg className={iconClassName} viewBox="0 0 24 24" aria-hidden="true">
          <path d="M12 5.2c1 1 1.5 1.8 1.5 2.5 0 1.1-1 1.6-1.7 2.2-.8.6-1.1 1.1-1.1 1.9" fill="none" stroke="#f97316" strokeWidth="1.5" strokeLinecap="round" />
          <path d="M8.2 14.8h7.6c0 2.1-1.7 3.8-3.8 3.8s-3.8-1.7-3.8-3.8Z" fill="#f97316" opacity="0.85" />
          <path d="M8 12.4c1.2.8 2.6 1.1 4 1.1s2.8-.3 4-.9" fill="none" stroke="#f97316" strokeWidth="1.4" strokeLinecap="round" />
        </svg>
      );
    case "html":
      return (
        <svg className={iconClassName} viewBox="0 0 24 24" aria-hidden="true">
          <path d="M4.6 3h14.8l-1.4 16.9L12 21.8 6 19.9 4.6 3Z" fill="#e44d26" />
          <path d="M12 4.4h6.1L17 18.8 12 20.4V4.4Z" fill="#f16529" />
          <path d="m12 6.9-4.4-.1.2 2.2H12v2.2H8l.4 5 3.6 1.1v-2.3l-1.6-.4-.1-1.2H12v-2.2H8.1L7.9 9h4V6.9Z" fill="#ebebeb" />
          <path d="M12 6.9v2.2h3.8l-.3 3.5-3.5 1v2.3l3.5-1.1.6-7.9H12Z" fill="#ffffff" />
        </svg>
      );
    case "react":
      return (
        <svg className={iconClassName} viewBox="0 0 24 24" aria-hidden="true">
          <circle cx="12" cy="12" r="1.9" fill="currentColor" />
          <ellipse cx="12" cy="12" rx="9" ry="3.6" fill="none" stroke="currentColor" strokeWidth="1.4" />
          <ellipse cx="12" cy="12" rx="9" ry="3.6" fill="none" stroke="currentColor" strokeWidth="1.4" transform="rotate(60 12 12)" />
          <ellipse cx="12" cy="12" rx="9" ry="3.6" fill="none" stroke="currentColor" strokeWidth="1.4" transform="rotate(120 12 12)" />
        </svg>
      );
    case "javascript":
      return (
        <svg className={iconClassName} viewBox="0 0 24 24" aria-hidden="true">
          <rect x="3" y="3" width="18" height="18" rx="3" fill="#f7df1e" />
          <text x="12" y="15.2" textAnchor="middle" className="skill-brand-text dark">JS</text>
        </svg>
      );
    case "node":
      return (
        <svg className={iconClassName} viewBox="0 0 24 24" aria-hidden="true">
          <path d="M12 2.7 20 7.2v9.6L12 21.3 4 16.8V7.2z" fill="#5fa04e" />
          <path d="M12 4.8 18.1 8.2v7.6L12 19.2 5.9 15.8V8.2z" fill="none" stroke="#ffffff" strokeWidth="1" opacity="0.55" />
          <text x="12" y="14.7" textAnchor="middle" className="skill-brand-text light">N</text>
        </svg>
      );
    case "typescript":
      return (
        <svg className={iconClassName} viewBox="0 0 24 24" aria-hidden="true">
          <rect x="3" y="3" width="18" height="18" rx="3" fill="#3178c6" />
          <text x="12" y="15.1" textAnchor="middle" className="skill-brand-text light">TS</text>
        </svg>
      );
    case "tailwind":
      return (
        <svg className={iconClassName} viewBox="0 0 24 24" aria-hidden="true">
          <path d="M6 10.1c1.05-1.95 2.2-2.75 3.65-2.75 2.2 0 2.55 1.65 4.05 2.4.95.45 2.1.35 3.7-.55-1.05 1.95-2.2 2.75-3.65 2.75-2.2 0-2.55-1.65-4.05-2.4-.95-.45-2.1-.35-3.7.55Zm-1 4.45c1.05-1.95 2.2-2.75 3.65-2.75 2.2 0 2.55 1.65 4.05 2.4.95.45 2.1.35 3.7-.55-1.05 1.95-2.2 2.75-3.65 2.75-2.2 0-2.55-1.65-4.05-2.4-.95-.45-2.1-.35-3.7.55Z" fill="#38bdf8" />
        </svg>
      );
    case "python":
      return (
        <svg className={iconClassName} viewBox="0 0 24 24" aria-hidden="true">
          <path d="M8.7 4.3h4.8c2 0 3.1 1.15 3.1 3.15v2.35h-6.5c-1.85 0-3.1 1.2-3.1 3v3.05H5.4c-2 0-3.1-1.15-3.1-3.15V10.3c0-3.75 2.85-6 6.4-6Z" fill="#3776ab" />
          <circle cx="13.9" cy="6.8" r="0.85" fill="#ffffff" />
          <path d="M15.3 19.7h-4.8c-2 0-3.1-1.15-3.1-3.15V14.2h6.5c1.85 0 3.1-1.2 3.1-3V8.15h1.6c2 0 3.1 1.15 3.1 3.15v2.45c0 3.75-2.85 5.95-6.4 5.95Z" fill="#ffd43b" />
          <circle cx="10.1" cy="17.2" r="0.85" fill="#2f2f2f" />
        </svg>
      );
    case "sql":
      return (
        <svg className={iconClassName} viewBox="0 0 24 24" aria-hidden="true">
          <ellipse cx="12" cy="6.6" rx="6.5" ry="2.8" fill="#38bdf8" />
          <path d="M5.5 6.6v6.8c0 1.6 2.9 2.8 6.5 2.8s6.5-1.2 6.5-2.8V6.6" fill="none" stroke="#38bdf8" strokeWidth="1.4" />
          <ellipse cx="12" cy="13.4" rx="6.5" ry="2.8" fill="none" stroke="#38bdf8" strokeWidth="1.4" />
        </svg>
      );
    case "mongodb":
      return (
        <svg className={iconClassName} viewBox="0 0 24 24" aria-hidden="true">
          <path d="M12 3.4c1.2 2 4.1 5 4.1 9.2 0 3.3-1.9 6-4.1 8-2.2-2-4.1-4.7-4.1-8 0-4.2 2.9-7.2 4.1-9.2Z" fill="#22c55e" />
          <path d="M12 5.2v13.2" fill="none" stroke="#0f172a" strokeWidth="1" opacity="0.5" />
        </svg>
      );
    case "docker":
      return (
        <svg className={iconClassName} viewBox="0 0 24 24" aria-hidden="true">
          <rect x="5" y="9.6" width="2.8" height="2.8" fill="#0ea5e9" />
          <rect x="8.2" y="9.6" width="2.8" height="2.8" fill="#0ea5e9" />
          <rect x="11.4" y="9.6" width="2.8" height="2.8" fill="#0ea5e9" />
          <rect x="8.2" y="6.4" width="2.8" height="2.8" fill="#0ea5e9" />
          <rect x="11.4" y="6.4" width="2.8" height="2.8" fill="#0ea5e9" />
          <path d="M4 13.2h12.3c.9 0 1.8-.4 2.4-1.1.5-.5.9-1.1 1.1-1.9.5.4.8 1.1.8 1.8 0 2.7-2.1 4.9-4.8 4.9H9.8c-2.7 0-4.8-1.7-5.8-3.7Z" fill="#0ea5e9" />
        </svg>
      );
    case "bootstrap":
      return (
        <svg className={iconClassName} viewBox="0 0 24 24" aria-hidden="true">
          <rect x="3" y="3" width="18" height="18" rx="4" fill="#7911f7" />
          <text x="12" y="15.1" textAnchor="middle" className="skill-brand-text light">B</text>
        </svg>
      );
    case "git":
      return (
        <svg className={iconClassName} viewBox="0 0 24 24" aria-hidden="true">
          <rect x="4" y="4" width="16" height="16" rx="2.4" transform="rotate(45 12 12)" fill="#f05032" />
          <circle cx="9" cy="9" r="1.45" fill="#ffffff" />
          <circle cx="15" cy="15" r="1.45" fill="#ffffff" />
          <circle cx="9" cy="15" r="1.45" fill="#ffffff" />
          <path d="M9 10.45v3.1m1.3-4.55h3.15a1.55 1.55 0 0 1 1.55 1.55" fill="none" stroke="#ffffff" strokeWidth="1.25" strokeLinecap="round" />
        </svg>
      );
    case "github":
      return (
        <svg className={iconClassName} viewBox="0 0 24 24" aria-hidden="true">
          <path d="M12 4.2a7.8 7.8 0 0 0-2.5 15.2c.4.1.5-.2.5-.4v-1.6c-2.1.5-2.6-.9-2.6-.9-.4-.9-.9-1.1-.9-1.1-.8-.5.1-.5.1-.5.9.1 1.3.9 1.3.9.8 1.4 2.2 1 2.7.8.1-.6.3-1 .6-1.2-1.6-.2-3.3-.8-3.3-3.6 0-.8.3-1.5.8-2-.1-.2-.4-1 .1-2 0 0 .7-.2 2.2.8a7.5 7.5 0 0 1 4 0c1.5-1 2.2-.8 2.2-.8.5 1 .2 1.8.1 2 .5.5.8 1.2.8 2 0 2.8-1.7 3.4-3.3 3.6.3.2.6.7.6 1.4V19c0 .2.1.5.5.4A7.8 7.8 0 0 0 12 4.2Z" fill="currentColor" />
        </svg>
      );
    case "ux":
      return (
        <svg className={iconClassName} viewBox="0 0 24 24" aria-hidden="true">
          <rect x="3.4" y="3.4" width="8.2" height="8.2" rx="1.8" fill="none" stroke="currentColor" strokeWidth="1.5" />
          <rect x="12.4" y="3.4" width="8.2" height="8.2" rx="1.8" fill="none" stroke="currentColor" strokeWidth="1.5" />
          <path d="M4.2 19.8 9.6 14.4M9.6 19.8 4.2 14.4" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
          <path d="M13.2 19.8h6.1m-3-5.4v5.4" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
        </svg>
      );
    default:
      return <span className="skill-symbol-fallback">{label.slice(0, 2).toUpperCase()}</span>;
  }
}

function SkillBar({ icon, name, accent }) {
  return (
    <article className="skill-bar" style={{ "--skill-accent": accent }}>
      <span className="skill-symbol-wrap" aria-hidden="true">
        <SkillBrandIcon icon={icon} label={name} />
      </span>
      <h3 className="skill-name">{name}</h3>
    </article>
  );
}

function ProjectCard({ icon, title, description, tech, accent, projectLink }) {
  const card = (
    <article className="project-card" style={{ "--accent": accent }}>
      <div className="project-orb" aria-hidden="true" />
      <div className="project-icon" aria-hidden="true">
        {icon}
      </div>
      <h3>{title}</h3>
      <p>{description}</p>
      <div className="project-tech">
        {tech.map((item) => (
          <span
            key={item}
            className="project-badge"
            style={{
              color: accent,
              borderColor: `${accent}66`,
              backgroundColor: `${accent}1a`,
            }}
          >
            {item}
          </span>
        ))}
      </div>
    </article>
  );

  if (!projectLink) {
    return card;
  }

  return (
    <a href={projectLink} target="_blank" rel="noreferrer" className="project-link-wrap" aria-label={`Open ${title}`}>
      {card}
    </a>
  );
}

export default function Portfolio() {
  const [activeSection, setActiveSection] = useState("Home");
  const [scrolled, setScrolled] = useState(false);
  const [themeMode, setThemeMode] = useState("light");
  const profileImageSrc = fallbackAvatar;
  const name = "Dishant Talwekar";
  const year = new Date().getFullYear();

  useEffect(() => {
    const storedTheme = window.localStorage.getItem("portfolio-theme");
    if (storedTheme === "light" || storedTheme === "dark") {
      setThemeMode(storedTheme);
    }
  }, []);

  useEffect(() => {
    const root = document.documentElement;
    const selectedTheme = colorThemes[themeMode] || colorThemes.light;

    Object.entries(selectedTheme).forEach(([key, value]) => {
      root.style.setProperty(key, value);
    });

    window.localStorage.setItem("portfolio-theme", themeMode);

  }, [themeMode]);

  const handleThemeToggle = () => {
    setThemeMode((prev) => (prev === "light" ? "dark" : "light"));
  };

  useEffect(() => {
    const root = document.documentElement;
    let ticking = false;

    const updateScrollFx = () => {
      const maxScroll = Math.max(document.documentElement.scrollHeight - window.innerHeight, 1);
      const progress = Math.min(Math.max(window.scrollY / maxScroll, 0), 1);
      const drift = Math.min(window.scrollY, 180) * 0.18;

      root.style.setProperty("--scroll-progress", progress.toFixed(4));
      root.style.setProperty("--scroll-drift", `${drift.toFixed(2)}px`);
      ticking = false;
    };

    const onScroll = () => {
      setScrolled(window.scrollY > 8);

      if (!ticking) {
        window.requestAnimationFrame(updateScrollFx);
        ticking = true;
      }
    };

    updateScrollFx();
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const ids = ["Home", "About", "Skills", "Projects"];
    const elements = ids.map((id) => document.getElementById(id)).filter(Boolean);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { threshold: 0.45 }
    );

    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  const handleNavClick = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <>
      <style>
        {`@import url('https://fonts.googleapis.com/css2?family=Outfit:wght@400;500;600;700;800&family=Space+Mono:wght@400;700&display=swap');

:root {
  --scroll-progress: 0;
  --scroll-drift: 0px;
  --bg: #050509;
  --body-bg: radial-gradient(circle at 20% 8%, #17142a 0%, #0a0912 44%, #040407 84%);
  --primary: #7a5cff;
  --secondary: #b8a8ff;
  --text-primary: #f5f6ff;
  --text-muted: #a8adbf;
  --card: #0f1018;
  --card-alt: #151723;
  --border: #2a2f45;
  --aurora-cyan: #7a5cff66;
  --aurora-violet: #6f50ff5f;
  --aurora-rose: #b8a8ff52;
  --particle-rgb: 184, 170, 255;
  --scrollbar-track: #0a0b12;
  --nav-scrolled-bg: rgba(5, 5, 9, 0.88);
  --availability-border: #3f3691;
  --availability-bg: rgba(63, 54, 145, 0.2);
  --btn-ghost-bg: rgba(15, 16, 24, 0.8);
  --stat-bg: #111323d9;
  --stat-border: #2a2f45;
  --stat-hover-bg: #171a2f;
  --stat-hover-border: #7a5cff70;
  --tag-bg: #121424;
  --tag-border: #343b5c;
  --tag-text: #e5e7ff;
  --project-bg: linear-gradient(180deg, #10121d, #0a0b14);
  --footer-border: #262c46;
  --logo-mark-text: #ffffff;
}

* {
  box-sizing: border-box;
}

html {
  scroll-behavior: smooth;
}

body {
  margin: 0;
  min-height: 100vh;
  background: var(--body-bg);
  color: var(--text-primary);
  font-family: 'Outfit', sans-serif;
  overflow-x: hidden;
  transition: background 0.45s ease, color 0.25s ease;
}

#root {
  position: relative;
}

::-webkit-scrollbar {
  width: 5px;
}

::-webkit-scrollbar-track {
  background: var(--scrollbar-track);
}

::-webkit-scrollbar-thumb {
  background: color-mix(in srgb, var(--primary) 30%, transparent);
  border-radius: 999px;
}

.particle-canvas {
  position: fixed;
  inset: 0;
  width: 100%;
  height: 100%;
  z-index: 1;
  pointer-events: none;
}

.page {
  position: relative;
  z-index: 2;
}

.cosmic-background {
  position: fixed;
  inset: -24%;
  overflow: hidden;
  pointer-events: none;
  z-index: 0;
  transform: translate3d(0, calc(var(--scroll-drift) * -0.35), 0);
  transition: transform 0.18s linear;
  will-change: transform;
}

.aurora {
  position: absolute;
  width: clamp(380px, 52vw, 920px);
  aspect-ratio: 1;
  border-radius: 50%;
  filter: blur(62px);
  mix-blend-mode: screen;
  opacity: 0.38;
  animation: auroraFloat 18s ease-in-out infinite;
}

.aurora-cyan {
  top: 4%;
  left: 4%;
  background: radial-gradient(circle at 35% 35%, var(--aurora-cyan) 0%, transparent 70%);
}

.aurora-violet {
  top: 32%;
  right: 8%;
  background: radial-gradient(circle at 30% 30%, var(--aurora-violet) 0%, transparent 72%);
  animation-delay: -6s;
}

.aurora-rose {
  bottom: 8%;
  left: 32%;
  background: radial-gradient(circle at 30% 30%, var(--aurora-rose) 0%, transparent 70%);
  animation-delay: -12s;
}

.bg-grid {
  position: absolute;
  inset: -18%;
  background-image:
    linear-gradient(rgba(148, 163, 184, 0.12) 1px, transparent 1px),
    linear-gradient(90deg, rgba(148, 163, 184, 0.12) 1px, transparent 1px);
  background-size: 52px 52px;
  mask-image: radial-gradient(circle at center, black 45%, transparent 90%);
  opacity: 0.22;
  transform: perspective(900px) rotateX(62deg) scale(1.35);
  transform-origin: center;
  animation: gridDrift 34s linear infinite;
}

.starfield {
  position: absolute;
  inset: 0;
}

.star {
  position: absolute;
  border-radius: 999px;
  background: radial-gradient(circle at 38% 35%, #ffffff, #9ad6ff80 60%, transparent 100%);
  box-shadow: 0 0 10px #7dd3fc66;
  animation: twinkle ease-in-out infinite;
}

.bg-noise {
  position: absolute;
  inset: -10%;
  opacity: 0.2;
  background-image:
    radial-gradient(circle at 20% 20%, rgba(255, 255, 255, 0.08) 0 1px, transparent 1px),
    radial-gradient(circle at 70% 60%, rgba(255, 255, 255, 0.06) 0 1px, transparent 1px),
    radial-gradient(circle at 40% 80%, rgba(255, 255, 255, 0.05) 0 1px, transparent 1px);
  background-size: 3px 3px, 4px 4px, 5px 5px;
  mix-blend-mode: soft-light;
}

.bg-vignette {
  position: absolute;
  inset: -8%;
  background: radial-gradient(circle at center, transparent 48%, color-mix(in srgb, var(--bg) 64%, transparent) 100%);
}

.top-nav {
  position: sticky;
  top: 0;
  left: 0;
  right: 0;
  height: 64px;
  z-index: 50;
  background: color-mix(in srgb, var(--card-alt) 36%, transparent);
  backdrop-filter: blur(16px) saturate(155%);
  -webkit-backdrop-filter: blur(16px) saturate(155%);
  border-bottom: 1px solid color-mix(in srgb, var(--border) 70%, transparent);
  box-shadow: 0 10px 28px rgba(6, 3, 13, 0.38);
  transition: background 0.25s ease, border-color 0.25s ease, box-shadow 0.25s ease;
  animation: navDrop 0.7s cubic-bezier(.22,1,.36,1);
  overflow: hidden;
}

.top-nav::before {
  content: '';
  position: absolute;
  inset: 0;
  pointer-events: none;
  background: linear-gradient(180deg, rgba(255, 255, 255, 0.16) 0%, rgba(255, 255, 255, 0.04) 45%, transparent 100%);
}

.top-nav.scrolled {
  background: color-mix(in srgb, var(--card) 46%, transparent);
  backdrop-filter: blur(20px) saturate(165%);
  -webkit-backdrop-filter: blur(20px) saturate(165%);
  border-bottom: 1px solid color-mix(in srgb, var(--border) 88%, transparent);
  box-shadow: 0 14px 38px #06030d88;
}

.nav-inner {
  max-width: 1120px;
  margin: 0 auto;
  height: 100%;
  padding: 0 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.logo {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  font-family: 'Space Mono', monospace;
  color: var(--text-primary);
  text-decoration: none;
  font-size: 0.95rem;
}

.logo-mark {
  width: 28px;
  height: 28px;
  border-radius: 8px;
  display: grid;
  place-items: center;
  background: linear-gradient(135deg, var(--primary), var(--secondary));
  color: var(--logo-mark-text);
  font-weight: 700;
}

.nav-links {
  display: flex;
  align-items: center;
  gap: 8px;
}

.nav-actions {
  display: inline-flex;
  align-items: center;
  gap: 10px;
}

.theme-toggle {
  border: 1px solid var(--border);
  background: var(--card-alt);
  color: var(--text-primary);
  border-radius: 999px;
  padding: 8px 12px;
  display: inline-flex;
  align-items: center;
  gap: 7px;
  font-family: 'Space Mono', monospace;
  font-size: 0.75rem;
  cursor: pointer;
  transition: transform 0.2s ease, border-color 0.2s ease, background 0.2s ease;
}

.theme-toggle:hover {
  transform: translateY(-1px);
  border-color: var(--primary);
  background: color-mix(in srgb, var(--card-alt) 75%, var(--primary) 25%);
  color: #ffffff;
}

.nav-link {
  position: relative;
  background: transparent;
  border: 0;
  color: var(--text-muted);
  font: inherit;
  cursor: pointer;
  padding: 6px 12px;
  transition: color 0.2s ease;
}

.nav-link::after {
  content: '';
  position: absolute;
  left: 12px;
  right: 12px;
  bottom: -2px;
  height: 2px;
  border-radius: 999px;
  transform: scaleX(0);
  transform-origin: center;
  transition: transform 0.26s ease;
  background: linear-gradient(90deg, var(--primary), var(--secondary));
}

.nav-link.active,
.nav-link:hover {
  color: var(--text-primary);
}

.nav-link.active::after,
.nav-link:hover::after {
  transform: scaleX(1);
}

.nav-dot {
  position: absolute;
  width: 6px;
  height: 6px;
  border-radius: 999px;
  background: var(--primary);
  left: 50%;
  transform: translateX(-50%);
  bottom: -6px;
  box-shadow: 0 0 12px var(--primary);
}

.hire-btn {
  border: 1px solid var(--primary);
  color: var(--primary);
  background: transparent;
  border-radius: 999px;
  padding: 9px 14px;
  text-decoration: none;
  font-family: 'Space Mono', monospace;
  font-size: 0.82rem;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.hire-btn:hover {
  transform: translateY(-1px);
  box-shadow: 0 0 18px color-mix(in srgb, var(--primary) 38%, transparent);
}

.main-content {
  max-width: 1120px;
  margin: 0 auto;
  padding: 0 24px;
  transform: translate3d(0, calc(var(--scroll-drift) * -0.06), 0);
  transition: transform 0.18s linear;
  will-change: transform;
}

.section-block {
  opacity: 0;
  transform: translateY(40px);
  filter: blur(8px);
  scroll-margin-top: 84px;
  transition: opacity 0.7s ease, transform 0.7s ease, filter 0.7s ease;
}

.section-block.is-visible {
  opacity: 1;
  transform: translateY(0);
  filter: blur(0);
}

.hero {
  min-height: 100vh;
  display: flex;
  align-items: center;
  position: relative;
  padding-top: 0;
}

.hero-content {
  max-width: 760px;
  position: relative;
  z-index: 2;
  transform: translate3d(0, calc(var(--scroll-drift) * -0.12), 0);
  transition: transform 0.18s linear;
  will-change: transform;
}

.reveal-stagger > * {
  opacity: 0;
  transform: translateY(24px);
  animation: heroRise 0.9s cubic-bezier(.22,1,.36,1) forwards;
}

.reveal-stagger > *:nth-child(1) { animation-delay: 0.06s; }
.reveal-stagger > *:nth-child(2) { animation-delay: 0.12s; }
.reveal-stagger > *:nth-child(3) { animation-delay: 0.18s; }
.reveal-stagger > *:nth-child(4) { animation-delay: 0.24s; }
.reveal-stagger > *:nth-child(5) { animation-delay: 0.3s; }
.reveal-stagger > *:nth-child(6) { animation-delay: 0.36s; }

.availability {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  color: var(--primary);
  font-family: 'Space Mono', monospace;
  font-size: 0.82rem;
  padding: 8px 12px;
  border: 1px solid var(--availability-border);
  border-radius: 999px;
  background: var(--availability-bg);
}

.pulse-dot {
  width: 8px;
  height: 8px;
  border-radius: 999px;
  background: #22c55e;
  animation: pulse 1.7s ease-in-out infinite;
}

.hero h1 {
  margin: 18px 0 10px;
  font-size: clamp(2.1rem, 6vw, 4.3rem);
  line-height: 1.08;
}

.gradient-text {
  background: linear-gradient(90deg, var(--primary), var(--secondary));
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
}

.name-inline {
  display: inline-block;
  white-space: nowrap;
}

.typewriter {
  min-height: 38px;
  margin: 0 0 16px;
  color: color-mix(in srgb, var(--primary) 40%, var(--text-primary));
  font-family: 'Space Mono', monospace;
  font-size: clamp(1.03rem, 2.2vw, 1.35rem);
}

.cursor {
  margin-left: 2px;
  animation: blink 1s steps(1) infinite;
}

.hero-subtitle {
  max-width: 640px;
  color: var(--text-muted);
  font-size: 1.02rem;
  line-height: 1.7;
  margin-bottom: 26px;
}

.cta-row {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
}

.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow: hidden;
  isolation: isolate;
  border-radius: 999px;
  padding: 11px 18px;
  text-decoration: none;
  font-weight: 600;
  transition: transform 0.2s ease, box-shadow 0.2s ease, border-color 0.2s ease;
}

.btn::after {
  content: '';
  position: absolute;
  inset: 0;
  transform: translateX(-130%);
  background: linear-gradient(120deg, transparent 22%, #ffffff52 48%, transparent 72%);
  transition: transform 0.7s ease;
}

.btn:hover {
  transform: translateY(-2px);
}

.btn:hover::after {
  transform: translateX(130%);
}

.btn-primary {
  color: #ffffff;
  background: linear-gradient(90deg, var(--primary), var(--secondary));
  box-shadow: 0 14px 38px color-mix(in srgb, var(--primary) 36%, transparent);
}

.btn-primary:hover {
  box-shadow: 0 18px 44px color-mix(in srgb, var(--primary) 44%, transparent);
}

.btn-ghost {
  border: 1px solid var(--border);
  color: var(--text-primary);
  background: var(--btn-ghost-bg);
}

.btn-ghost:hover {
  border-color: var(--primary);
}

.stats {
  margin-top: 28px;
  display: grid;
  grid-template-columns: repeat(4, minmax(120px, 1fr));
  gap: 10px;
}

.stat-card {
  background: var(--stat-bg);
  border: 1px solid var(--stat-border);
  border-radius: 12px;
  padding: 10px 12px;
  transition: transform 0.24s ease, border-color 0.24s ease, background 0.24s ease;
}

.stat-card:hover {
  transform: translateY(-4px);
  border-color: var(--stat-hover-border);
  background: var(--stat-hover-bg);
  box-shadow: 0 12px 28px #07040f66;
}

.stat-value {
  font-family: 'Space Mono', monospace;
  color: var(--primary);
  font-size: 0.95rem;
  margin-bottom: 4px;
}

.stat-label {
  color: var(--text-muted);
  font-size: 0.8rem;
}

.hero-orb {
  position: absolute;
  border-radius: 999px;
  filter: blur(6px);
  animation: float 6s ease-in-out infinite;
  z-index: 1;
}

.hero-orb.cyan {
  width: 260px;
  height: 260px;
  right: 7%;
  top: 24%;
  background: radial-gradient(circle at 30% 30%, color-mix(in srgb, var(--primary) 45%, transparent), transparent 70%);
}

.hero-orb.violet {
  width: 230px;
  height: 230px;
  right: -2%;
  top: 48%;
  animation-delay: -2.4s;
  background: radial-gradient(circle at 30% 30%, color-mix(in srgb, var(--secondary) 44%, transparent), transparent 70%);
}

.section-title-wrap {
  margin-bottom: 28px;
  text-align: left;
}

.section-label {
  margin: 0 0 8px;
  color: var(--primary);
  font-family: 'Space Mono', monospace;
  font-size: 0.78rem;
  letter-spacing: 0.14em;
  text-transform: uppercase;
}

.section-title {
  margin: 0;
  font-size: clamp(1.7rem, 4vw, 2.4rem);
}

.section-underline {
  width: 48px;
  height: 3px;
  border-radius: 999px;
  margin-top: 12px;
  background: linear-gradient(90deg, var(--primary), var(--secondary));
}

.about {
  padding: 96px 0 56px;
}

.about-grid {
  display: grid;
  gap: 32px;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  align-items: flex-start;
}

.about-content {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.avatar-wrap {
  display: flex;
  justify-content: center;
}

.avatar-ring {
  width: 220px;
  height: 220px;
  border-radius: 999px;
  background: linear-gradient(135deg, var(--primary), var(--secondary));
  padding: 4px;
  position: relative;
  animation: float 5.2s ease-in-out infinite;
}

.avatar-inner {
  width: 100%;
  height: 100%;
  border-radius: 999px;
  overflow: hidden;
  background: var(--card-alt);
}

.avatar-photo {
  width: 100%;
  height: 100%;
  display: block;
  object-fit: cover;
  object-position: center 30%;
}

.avatar-dash {
  position: absolute;
  inset: -10px;
  border-radius: 999px;
  border: 2px dashed color-mix(in srgb, var(--primary) 45%, transparent);
  animation: spin 20s linear infinite;
}

.about h3 {
  margin-top: 0;
  margin-bottom: 12px;
  font-size: clamp(1.2rem, 2.7vw, 1.65rem);
}

.about p {
  margin: 0;
  color: var(--text-muted);
  line-height: 1.8;
}

.tags {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-top: 14px;
}

.tag {
  background: var(--tag-bg);
  border: 1px solid var(--tag-border);
  color: var(--tag-text);
  border-radius: 999px;
  padding: 6px 11px;
  font-size: 0.8rem;
}

.skills {
  padding: 88px 0 56px;
}

.skills-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));
  gap: 16px;
}

.skill-bar {
  position: relative;
  overflow: hidden;
  background: linear-gradient(180deg, var(--card), color-mix(in srgb, var(--card) 86%, var(--card-alt)));
  border: 1px solid color-mix(in srgb, var(--border) 84%, var(--primary));
  border-radius: 16px;
  min-height: 132px;
  padding: 16px 14px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 12px;
  text-align: center;
  transition: transform 0.24s ease, border-color 0.24s ease, box-shadow 0.24s ease;
}

.skill-bar::after {
  content: '';
  position: absolute;
  inset-inline: 0;
  top: 0;
  height: 2px;
  background: linear-gradient(90deg, var(--skill-accent), transparent 60%);
}

.skill-bar > * {
  position: relative;
  z-index: 1;
}

.skill-bar:hover {
  transform: translateY(-3px);
  border-color: color-mix(in srgb, var(--skill-accent) 50%, var(--border));
  box-shadow: 0 12px 28px #04020c7d;
}

.skill-symbol-wrap {
  width: 48px;
  height: 48px;
  border-radius: 14px;
  border: 1px solid color-mix(in srgb, var(--skill-accent) 45%, transparent);
  background: color-mix(in srgb, var(--skill-accent) 14%, transparent);
  display: inline-flex;
  align-items: center;
  justify-content: center;
  color: var(--skill-accent);
  box-shadow: inset 0 0 0 1px color-mix(in srgb, var(--skill-accent) 20%, transparent);
}

.skill-brand-svg {
  width: 24px;
  height: 24px;
  display: block;
}

.skill-brand-react {
  width: 21px;
  height: 21px;
}

.skill-brand-javascript,
.skill-brand-typescript,
.skill-brand-node {
  width: 20px;
  height: 20px;
}

.skill-brand-tailwind {
  width: 23px;
  height: 23px;
}

.skill-brand-python,
.skill-brand-git,
.skill-brand-html,
.skill-brand-bootstrap,
.skill-brand-ux {
  width: 21px;
  height: 21px;
}

.skill-brand-text {
  fill: currentColor;
  font-family: 'Space Mono', monospace;
  font-size: 7px;
  font-weight: 700;
}

.skill-brand-text.dark {
  fill: #141414;
}

.skill-brand-text.light {
  fill: #ffffff;
}

.skill-symbol-fallback {
  font-family: 'Space Mono', monospace;
  font-size: 0.68rem;
  font-weight: 700;
}

.skill-text {
  display: none;
}

.skill-name {
  margin: 0;
  font-weight: 600;
  font-size: 0.95rem;
  line-height: 1.2;
  color: color-mix(in srgb, var(--text-primary) 92%, white 8%);
}

.projects {
  padding: 88px 0 110px;
}

.project-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  gap: 20px;
}

.project-link-wrap {
  text-decoration: none;
  color: inherit;
  display: block;
}

.project-card {
  position: relative;
  overflow: hidden;
  border-radius: 14px;
  border: 1px solid color-mix(in srgb, var(--border) 82%, var(--secondary));
  background: var(--project-bg);
  padding: 18px;
  box-shadow: 0 8px 22px #05030d52;
  transition: transform 0.25s ease, border-color 0.25s ease, box-shadow 0.25s ease;
}

.project-card::before {
  content: '';
  position: absolute;
  inset: -180% -35%;
  background: linear-gradient(112deg, transparent 35%, #ffffff18 48%, transparent 64%);
  transform: translateX(-60%) rotate(16deg);
  transition: transform 0.8s ease;
}

.project-card > * {
  position: relative;
  z-index: 1;
}

.project-card:hover {
  transform: translateY(-7px) perspective(900px) rotateX(2.1deg) rotateY(-1.6deg);
  border-color: var(--accent);
  box-shadow: 0 0 34px color-mix(in srgb, var(--accent) 34%, transparent);
}

.project-card:hover::before {
  transform: translateX(72%) rotate(16deg);
}

.project-orb {
  position: absolute;
  width: 140px;
  height: 140px;
  top: -54px;
  right: -54px;
  border-radius: 999px;
  opacity: 0;
  transition: opacity 0.25s ease;
  background: radial-gradient(circle at 30% 30%, color-mix(in srgb, var(--accent) 45%, transparent), transparent 70%);
}

.project-card:hover .project-orb {
  opacity: 1;
}

.project-icon {
  font-size: 1.5rem;
  margin-bottom: 10px;
}

.project-card h3 {
  margin: 0 0 10px;
}

.project-card,
.skill-bar {
  text-align: left;
}

.project-card p {
  margin: 0;
  color: var(--text-muted);
  line-height: 1.6;
}

.project-tech {
  margin-top: 14px;
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.project-badge {
  font-size: 0.73rem;
  border: 1px solid transparent;
  border-radius: 999px;
  padding: 5px 9px;
  font-family: 'Space Mono', monospace;
}

.projects-more {
  margin-top: 30px;
  display: flex;
  justify-content: center;
}

.ghost-btn {
  color: var(--text-primary);
  border: 1px solid var(--border);
  background: transparent;
  border-radius: 999px;
  padding: 10px 16px;
  text-decoration: none;
  transition: border-color 0.2s ease, color 0.2s ease;
}

.ghost-btn:hover {
  color: var(--primary);
  border-color: var(--primary);
}

.site-footer {
  border-top: 1px solid var(--footer-border);
  padding: 28px 20px 40px;
}

.footer-inner {
  max-width: 1120px;
  margin: 0 auto;
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  align-items: center;
  justify-content: space-between;
}

.socials {
  display: inline-flex;
  flex-wrap: wrap;
  gap: 14px;
}

.socials a {
  color: var(--text-muted);
  text-decoration: none;
  transition: color 0.2s ease;
}

.socials a:hover {
  color: var(--primary);
}

.footer-note {
  color: var(--text-muted);
  font-size: 0.9rem;
}

.footer-note span {
  color: var(--primary);
}

@keyframes blink {
  50% {
    opacity: 0;
  }
}

@keyframes navDrop {
  from {
    opacity: 0;
    transform: translateY(-14px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes heroRise {
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes auroraFloat {
  0%,
  100% {
    transform: translate3d(0, 0, 0) scale(1);
  }
  33% {
    transform: translate3d(44px, -24px, 0) scale(1.08);
  }
  66% {
    transform: translate3d(-36px, 20px, 0) scale(0.94);
  }
}

@keyframes gridDrift {
  from {
    transform: perspective(900px) rotateX(62deg) scale(1.35) translateY(0);
  }
  to {
    transform: perspective(900px) rotateX(62deg) scale(1.35) translateY(-52px);
  }
}

@keyframes twinkle {
  0%,
  100% {
    transform: scale(0.7);
    opacity: 0.3;
  }
  50% {
    transform: scale(1.08);
    opacity: 1;
  }
}

@keyframes float {
  0%,
  100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-14px);
  }
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

@keyframes pulse {
  0%,
  100% {
    opacity: 0.6;
  }
  50% {
    opacity: 1;
  }
}

@media (max-width: 940px) {
  .stats {
    grid-template-columns: repeat(2, minmax(140px, 1fr));
  }

  .skills-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  .hero-orb.cyan {
    right: -40px;
  }

}

@media (max-width: 720px) {
  .top-nav {
    height: 68px;
  }

  .nav-inner {
    padding: 0 12px;
    gap: 8px;
  }

  .nav-links {
    display: none;
  }

  .nav-link {
    padding: 6px 8px;
    font-size: 0.86rem;
    border-radius: 999px;
  }

  .nav-link::after,
  .nav-dot {
    display: none;
  }

  .nav-link.active {
    color: var(--text-primary);
    background: color-mix(in srgb, var(--primary) 18%, transparent);
    border: 1px solid color-mix(in srgb, var(--primary) 45%, var(--border));
    box-shadow: 0 0 0 1px color-mix(in srgb, var(--primary) 18%, transparent) inset;
  }

  .nav-actions {
    display: inline-flex;
    margin-left: auto;
  }

  .theme-toggle {
    padding: 8px 10px;
  }

  .main-content {
    padding: 0 16px;
    transform: none;
  }

  .hire-btn {
    display: none;
  }

  .hero {
    min-height: 88vh;
    padding-top: 14px;
    padding-bottom: 12px;
  }

  .hero h1 {
    font-size: clamp(2rem, 7.8vw, 2.85rem);
    line-height: 1.14;
  }

  .hero-content {
    transform: none;
  }

  .typewriter {
    min-height: 34px;
    font-size: 1.03rem;
  }

  .hero-subtitle {
    font-size: 0.98rem;
    line-height: 1.65;
  }

  .cta-row {
    width: auto;
    gap: 10px;
  }

  .cta-row .btn {
    width: auto;
    min-width: 148px;
  }

  .stats {
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 10px;
  }

  .stat-card {
    padding: 10px 11px;
  }

  .about {
    padding: 72px 0 34px;
  }

  .skills {
    padding: 64px 0 34px;
  }

  .projects {
    padding: 64px 0 90px;
  }

  .project-grid {
    grid-template-columns: 1fr;
    gap: 14px;
  }

  .project-card {
    padding: 16px;
  }

  .project-card:hover {
    transform: none;
    box-shadow: 0 8px 22px #05030d52;
  }

  .skill-bar:hover {
    transform: none;
    box-shadow: none;
  }

  .site-footer {
    padding: 24px 14px 30px;
  }

  .footer-inner {
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text-align: center;
    gap: 14px;
  }

  .socials {
    justify-content: center;
    gap: 12px;
  }

  .footer-note {
    margin: 0;
    line-height: 1.5;
  }

  .hero-content {
    margin: 0 auto;
    text-align: center;
  }

  .availability {
    margin: 0 auto;
  }

  .hero-subtitle {
    margin-left: auto;
    margin-right: auto;
  }

  .cta-row {
    justify-content: center;
  }

  .section-title-wrap {
    text-align: center;
  }

  .section-underline {
    margin-left: auto;
    margin-right: auto;
  }

  .about-grid {
    text-align: center;
  }

  .about-content {
    align-items: center;
  }

  .tags {
    justify-content: center;
  }

  .avatar-ring {
    width: 168px;
    height: 168px;
  }

  .avatar-inner {
    font-size: 3rem;
  }

  .avatar-dash {
    inset: -8px;
  }
}

@media (max-width: 480px) {
  .logo span:last-child {
    display: none;
  }

  .top-nav {
    height: 64px;
  }

  .skills-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 12px;
  }

  .stats {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  .stat-value {
    font-size: 0.9rem;
  }

  .stat-label {
    font-size: 0.78rem;
  }

  .skill-bar {
    min-height: 96px;
    padding: 10px 8px;
    gap: 7px;
  }

  .skill-symbol-wrap {
    width: 34px;
    height: 34px;
    border-radius: 10px;
  }

  .skill-brand-svg {
    width: 18px;
    height: 18px;
  }

  .skill-name {
    font-size: 0.78rem;
  }

  .avatar-ring {
    width: 136px;
    height: 136px;
  }

  .avatar-inner {
    font-size: 2.4rem;
  }

  .avatar-dash {
    inset: -6px;
  }

  .theme-toggle-text {
    display: none;
  }

  .theme-toggle {
    min-width: 36px;
    justify-content: center;
    padding: 8px;
  }

  .main-content {
    padding: 0 14px;
  }

  .section-title {
    font-size: clamp(1.55rem, 7.2vw, 2.05rem);
  }

  .about {
    padding: 58px 0 26px;
  }

  .skills {
    padding: 54px 0 26px;
  }

  .projects {
    padding: 54px 0 76px;
  }

  .socials {
    gap: 10px;
  }

  .socials a {
    font-size: 0.9rem;
  }
}

@media (prefers-reduced-motion: reduce) {
  .aurora,
  .bg-grid,
  .star,
  .cosmic-background,
  .main-content,
  .hero-content,
  .hero-orb,
  .avatar-ring,
  .avatar-dash,
  .pulse-dot,
  .reveal-stagger > * {
    animation: none !important;
  }

  .section-block,
  .btn,
  .project-card,
  .skill-bar,
  .stat-card,
  .theme-toggle,
  .nav-link,
  .top-nav {
    transition: none !important;
  }
}
`}
      </style>

      <CosmicBackground />
      <ParticleBackground />

      <div className="page">
        <nav className={`top-nav ${scrolled ? "scrolled" : ""}`}>
          <div className="nav-inner">
            <a href="#Home" className="logo" onClick={(e) => {
              e.preventDefault();
              handleNavClick("Home");
            }}>
              <span className="logo-mark">{name.charAt(0).toUpperCase()}</span>
              <span>{name.toLowerCase().replace(/\s+/g, "")}</span>
            </a>

            <div className="nav-links">
              {["Home", "About", "Skills", "Projects"].map((item) => (
                <button key={item} type="button" className={`nav-link ${activeSection === item ? "active" : ""}`} onClick={() => handleNavClick(item)}>
                  {item}
                  {activeSection === item && <span className="nav-dot" />}
                </button>
              ))}
            </div>

            <div className="nav-actions">
              <button
                type="button"
                className="theme-toggle"
                onClick={handleThemeToggle}
                aria-label={`Switch to ${themeMode === "light" ? "dark" : "light"} theme`}
              >
                <span aria-hidden="true">{themeMode === "light" ? "🌙" : "☀️"}</span>
                <span className="theme-toggle-text">{themeMode === "light" ? "Dark" : "Light"} Mode</span>
              </button>
              <a className="hire-btn" href="mailto:hello@name.dev">
                Hire Me
              </a>
            </div>
          </div>
        </nav>

        <main className="main-content">
          <Section id="Home" className="hero">
            <div className="hero-content reveal-stagger">
              <div className="availability">
                <span className="pulse-dot" />
                Open to internships and student opportunities
              </div>

              <h1>
                Hi, I&apos;m <span className="gradient-text name-inline">{name}</span>
              </h1>

              <TypeWriter words={typewriterWords} />

              <p className="hero-subtitle">
                I&apos;m currently pursuing B.Tech (3rd year) in Computer Science Engineering, passionate about building modern web experiences and turning ideas into practical projects.
              </p>

              <div className="cta-row">
                <a className="btn btn-primary" href="#Projects" onClick={(e) => {
                  e.preventDefault();
                  handleNavClick("Projects");
                }}>
                  View Projects
                </a>
                <a className="btn btn-ghost" href="#About" onClick={(e) => {
                  e.preventDefault();
                  handleNavClick("About");
                }}>
                  Learn More
                </a>
              </div>

              <div className="stats">
                <div className="stat-card">
                  <div className="stat-value">Student</div>
                  <div className="stat-label">Status</div>
                </div>
                <div className="stat-card">
                  <div className="stat-value">10+ Projects</div>
                  <div className="stat-label">Built</div>
                </div>
                <div className="stat-card">
                  <div className="stat-value">Learning</div>
                  <div className="stat-label">Every Day</div>
                </div>
                <div className="stat-card">
                  <div className="stat-value">Focused</div>
                  <div className="stat-label">On Growth</div>
                </div>
              </div>
            </div>

            <div className="hero-orb cyan" aria-hidden="true" />
            <div className="hero-orb violet" aria-hidden="true" />
          </Section>

          <Section id="About" className="about">
            <SectionTitle label="About" title="Who I Am" />

            <div className="about-grid">
              <div className="avatar-wrap">
                <div className="avatar-ring">
                  <div className="avatar-inner" aria-label="Developer avatar">
                    <img
                      className="avatar-photo"
                      src={profileImageSrc}
                      alt="Dishant Talwekar"
                    />
                  </div>
                  <div className="avatar-dash" aria-hidden="true" />
                </div>
              </div>

              <div className="about-content">
                <h3>
                  Passionate Full Stack Developer building scalable and user-friendly web applications.
                </h3>
                <p>
                  I am a passionate Full Stack Developer with a strong foundation in building responsive and scalable web applications. I specialize in both frontend and backend development, creating seamless user experiences and efficient server-side solutions.
                </p>
                <p>
                  I have solid knowledge of Data Structures and Algorithms (DSA) and have solved 70+ problems on LeetCode, which has strengthened my problem-solving and logical thinking skills.
                </p>
                <p>
                  Currently, I am working as an Intern at Tinywork Infotech, where I am gaining hands-on experience in real-world development, collaborating on projects, and improving my technical and professional skills.
                </p>

                <div className="tags">
                  {["Remote-First", "Agile", "Product Mindset", "Performance", "Accessibility"].map((tag) => (
                    <span key={tag} className="tag">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </Section>

          <Section id="Skills" className="skills">
            <SectionTitle label="Skills" title="Skills" />
            <div className="skills-grid">
              {skills.map((skill) => (
                <SkillBar key={skill.name} {...skill} />
              ))}
            </div>
          </Section>

          <Section id="Projects" className="projects">
            <SectionTitle label="Projects" title="Projects" />
            <div className="project-grid">
              {projects.map((project) => (
                <ProjectCard key={project.title} {...project} />
              ))}
            </div>

            <div className="projects-more">
              <a href="#" className="ghost-btn" onClick={(e) => e.preventDefault()}>
                View All Projects →
              </a>
            </div>
          </Section>
        </main>

        <footer className="site-footer">
          <div className="footer-inner">
            <div className="socials">
              <a href="https://twitter.com" target="_blank" rel="noreferrer">Twitter</a>
              <a href="https://github.com" target="_blank" rel="noreferrer">GitHub</a>
              <a href="https://linkedin.com" target="_blank" rel="noreferrer">LinkedIn</a>
              <a href="https://dribbble.com" target="_blank" rel="noreferrer">Dribbble</a>
            </div>
            <p className="footer-note">
              Built by <span>{name}</span> · {year}
            </p>
          </div>
        </footer>
      </div>
    </>
  );
}
