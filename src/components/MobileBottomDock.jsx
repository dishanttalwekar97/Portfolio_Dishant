import React from "react";

export default function MobileBottomDock({ activeSection, onNavigate, onOpenContact }) {
  const triggerHaptic = () => {
    if (typeof window !== "undefined" && "vibrate" in navigator) {
      try {
        navigator.vibrate(12);
      } catch {
        // Ignore if vibration permissions are blocked
      }
    }
  };

  const handleNavClick = (id) => {
    triggerHaptic();
    onNavigate(id);
  };

  const handleContactClick = () => {
    triggerHaptic();
    onOpenContact();
  };

  const items = [
    {
      id: "home",
      label: "Home",
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
          <polyline points="9 22 9 12 15 12 15 22"></polyline>
        </svg>
      ),
      action: () => handleNavClick("home"),
    },
    {
      id: "skills",
      label: "Skills",
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          <polygon points="12 2 2 7 12 12 22 7 12 2"></polygon>
          <polyline points="2 17 12 22 22 17"></polyline>
          <polyline points="2 12 12 17 22 12"></polyline>
        </svg>
      ),
      action: () => handleNavClick("skills"),
    },
    {
      id: "projects",
      label: "Projects",
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect>
          <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path>
        </svg>
      ),
      action: () => handleNavClick("projects"),
    },
    {
      id: "resume",
      label: "Resume",
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
          <polyline points="14 2 14 8 20 8"></polyline>
          <line x1="12" y1="18" x2="12" y2="12"></line>
          <polyline points="9 15 12 18 15 15"></polyline>
        </svg>
      ),
      isExternal: true,
      href: "/Dishant_resume_..pdf".replace("..pdf", ".pdf"),
    },
    {
      id: "contact",
      label: "Contact",
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
          <polyline points="22,6 12,13 2,6"></polyline>
        </svg>
      ),
      action: handleContactClick,
    },
  ];

  return (
    <div className="mobile-bottom-dock-wrapper" aria-label="Mobile Navigation Bar">
      <nav className="mobile-bottom-dock">
        {items.map((item) => {
          const isActive = activeSection.toLowerCase() === item.id.toLowerCase();

          if (item.isExternal) {
            return (
              <a
                key={item.id}
                href={item.href}
                target="_blank"
                rel="noreferrer"
                className="mobile-dock-btn"
                onClick={triggerHaptic}
                title="View Resume PDF"
              >
                <span className="dock-icon-wrapper">{item.icon}</span>
                <span className="dock-label">{item.label}</span>
              </a>
            );
          }

          return (
            <button
              key={item.id}
              type="button"
              className={`mobile-dock-btn ${isActive ? "active" : ""}`}
              onClick={item.action}
              aria-current={isActive ? "page" : undefined}
            >
              <span className="dock-icon-wrapper">
                {item.icon}
                {isActive && <span className="dock-active-dot" />}
              </span>
              <span className="dock-label">{item.label}</span>
            </button>
          );
        })}
      </nav>
    </div>
  );
}
