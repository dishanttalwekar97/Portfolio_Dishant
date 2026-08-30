import React, { useState } from "react";
import SpotlightCard from "./SpotlightCard";

export default function ContactSection({ onOpenContact }) {
  const [copied, setCopied] = useState(false);
  const email = "dishanttalwekar97@gmail.com";

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2400);
  };

  return (
    <section id="contact" className="cinematic-section">
      <div className="main-container">
        <div className="contact-section-inner">
          <SpotlightCard className="contact-banner-card reveal-on-scroll reveal-scale">
            <div className="section-tagline">CONNECT // 04</div>
            <h2 className="contact-banner-title">Let&apos;s Build Something Remarkable</h2>
            <p className="contact-banner-desc">
              Whether you have an internship opportunity, a project to collaborate on,
              or simply want to chat about tech — my inbox is always open.
            </p>

            <div className="contact-quick-dock">
              <button
                type="button"
                className="email-copy-badge"
                onClick={handleCopyEmail}
                title="Click to copy email address"
              >
                <span>{email}</span>
                <span style={{ color: copied ? "#22c55e" : "var(--text-muted)", fontSize: "0.78rem" }}>
                  {copied ? "✓ Copied!" : "📋 Copy"}
                </span>
              </button>

              <button
                type="button"
                className="btn btn-primary"
                onClick={onOpenContact}
              >
                <span>Send Message</span>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="22" y1="2" x2="11" y2="13"></line>
                  <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
                </svg>
              </button>

              <a
                href={`mailto:${email}?subject=Hello%20Dishant%20-%20Opportunity%20Inquiry`}
                className="btn btn-secondary"
              >
                <span>Direct Mail ↗</span>
              </a>
            </div>
          </SpotlightCard>
        </div>
      </div>
    </section>
  );
}
