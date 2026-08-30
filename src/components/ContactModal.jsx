import React, { useState } from "react";

export default function ContactModal({ isOpen, onClose }) {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    // Pre-fill a mailto trigger or simulated send
    const mailtoUrl = `mailto:dishanttalwekar@gmail.com?subject=Portfolio%20Message%20from%20${encodeURIComponent(
      formData.name
    )}&body=${encodeURIComponent(
      `Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`
    )}`;
    window.location.href = mailtoUrl;
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      onClose();
    }, 2000);
  };

  return (
    <div
      className="modal-overlay"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      <div
        className="modal-content-card"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          className="modal-close-btn"
          onClick={onClose}
          aria-label="Close modal"
        >
          ✕
        </button>

        <div style={{ textAlign: "left" }}>
          <div className="section-tagline">TRANSMISSION // DIRECT</div>
          <h3 id="modal-title" style={{ fontSize: "1.6rem", fontWeight: "700", color: "#ffffff", marginBottom: "8px" }}>
            Get in Touch
          </h3>
          <p style={{ color: "var(--text-muted)", fontSize: "0.9rem" }}>
            Fill out this brief transmission to send a direct email to Dishant Talwekar.
          </p>
        </div>

        {submitted ? (
          <div style={{ padding: "40px 0", textAlign: "center" }}>
            <div style={{ fontSize: "2rem", marginBottom: "12px" }}>✓</div>
            <h4 style={{ color: "#ffffff", fontSize: "1.2rem", marginBottom: "6px" }}>Email Client Dispatched!</h4>
            <p style={{ color: "var(--text-muted)", fontSize: "0.88rem" }}>Opening your default email composer...</p>
          </div>
        ) : (
          <form className="modal-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label className="form-label" htmlFor="contact-name">Your Name</label>
              <input
                id="contact-name"
                type="text"
                required
                className="form-input"
                placeholder="e.g. Alex Smith"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              />
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="contact-email">Your Email</label>
              <input
                id="contact-email"
                type="email"
                required
                className="form-input"
                placeholder="alex@company.com"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              />
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="contact-msg">Message</label>
              <textarea
                id="contact-msg"
                required
                className="form-textarea"
                placeholder="Hi Dishant, I'd like to discuss..."
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              />
            </div>

            <button type="submit" className="btn btn-primary" style={{ width: "100%", marginTop: "10px" }}>
              <span>Dispatch Message</span>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="22" y1="2" x2="11" y2="13"></line>
                <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
              </svg>
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
