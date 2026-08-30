import React, { useState } from "react";

export default function Navbar({
  activeSection,
  scrolled,
  onNavigate,
  onOpenContact,
  soundEnabled,
  onToggleSound,
}) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { id: "home", label: "Home" },
    { id: "about", label: "About" },
    { id: "skills", label: "Skills" },
    { id: "projects", label: "Projects" },
  ];

  const handleMobileNav = (id) => {
    setMobileMenuOpen(false);
    onNavigate(id);
  };

  return (
    <>
      <header className={`top-navbar-wrapper ${scrolled ? "scrolled" : ""}`}>
        <nav className="nav-dock" aria-label="Main Navigation">
          {/* Brand */}
          <a
            href="#home"
            className="nav-brand"
            onClick={(e) => {
              e.preventDefault();
              onNavigate("home");
            }}
          >
            <span className="brand-monogram">D</span>
            <span>
              dishant<span style={{ color: "var(--text-muted)", fontSize: "0.75rem" }}>.dev</span>
            </span>
          </a>

          {/* Desktop Links List */}
          <ul className="nav-links-list">
            {navItems.map((item) => {
              const isActive = activeSection.toLowerCase() === item.id.toLowerCase();
              return (
                <li key={item.id}>
                  <button
                    type="button"
                    className={`nav-link-btn ${isActive ? "active" : ""}`}
                    onClick={() => onNavigate(item.id)}
                    aria-current={isActive ? "page" : undefined}
                  >
                    {item.label}
                  </button>
                </li>
              );
            })}
          </ul>

          {/* Action Group */}
          <div className="nav-actions-group">
            {/* Audio Equalizer Toggle */}
            <button
              type="button"
              className={`equalizer-btn ${soundEnabled ? "eq-active" : ""}`}
              onClick={onToggleSound}
              title={soundEnabled ? "Mute interface audio FX" : "Enable interface audio FX"}
              aria-label="Toggle Interface Audio"
            >
              <div className="eq-bars" aria-hidden="true">
                <span className="eq-bar" />
                <span className="eq-bar" />
                <span className="eq-bar" />
                <span className="eq-bar" />
              </div>
              <span style={{ fontSize: "0.72rem" }}>{soundEnabled ? "SFX ON" : "SFX"}</span>
            </button>

            {/* Download Resume / CV CTA */}
            <a
              href="/Dishant_resume_.pdf"
              target="_blank"
              rel="noreferrer"
              className="nav-resume-btn"
              title="View or Download Resume (PDF)"
            >
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                <polyline points="14 2 14 8 20 8"></polyline>
                <line x1="12" y1="18" x2="12" y2="12"></line>
                <polyline points="9 15 12 18 15 15"></polyline>
              </svg>
              <span>Resume</span>
            </a>

            {/* Let's Connect CTA */}
            <button
              type="button"
              className="nav-cta-btn"
              onClick={onOpenContact}
            >
              <span>Let&apos;s Connect</span>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="7" y1="17" x2="17" y2="7"></line>
                <polyline points="7 7 17 7 17 17"></polyline>
              </svg>
            </button>

            {/* Mobile Hamburger Toggle */}
            <button
              type="button"
              className="mobile-menu-toggle"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle navigation menu"
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? (
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              ) : (
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="3" y1="12" x2="21" y2="12"></line>
                  <line x1="3" y1="6" x2="21" y2="6"></line>
                  <line x1="3" y1="18" x2="21" y2="18"></line>
                </svg>
              )}
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="mobile-nav-drawer" role="dialog" aria-modal="true">
          {navItems.map((item) => {
            const isActive = activeSection.toLowerCase() === item.id.toLowerCase();
            return (
              <button
                key={item.id}
                type="button"
                className={`mobile-nav-link ${isActive ? "active" : ""}`}
                onClick={() => handleMobileNav(item.id)}
              >
                {item.label}
              </button>
            );
          })}

          <a
            href="/Dishant_resume_.pdf"
            target="_blank"
            rel="noreferrer"
            className="btn btn-secondary"
            style={{ width: "100%", marginTop: "8px", justifyContent: "center" }}
            onClick={() => setMobileMenuOpen(false)}
          >
            <span>📄 View / Download Resume</span>
          </a>

          <button
            type="button"
            className="btn btn-primary"
            style={{ width: "100%", marginTop: "8px" }}
            onClick={() => {
              setMobileMenuOpen(false);
              onOpenContact();
            }}
          >
            <span>Let&apos;s Connect</span>
          </button>
        </div>
      )}
    </>
  );
}
