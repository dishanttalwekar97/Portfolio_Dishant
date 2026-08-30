import React from "react";

export default function CinematicMarquee() {
  const tickerItems = [
    { label: "FULL STACK ENGINEER", highlight: true },
    { label: "DSA & PROBLEM SOLVER (70+ LEETCODE)", highlight: false },
    { label: "TINYWORK INFOTECH INTERN", highlight: true },
    { label: "REACT & NODE.JS SPECIALIST", highlight: false },
    { label: "B.TECH CSE CANDIDATE", highlight: true },
    { label: "CLEAN CODE ARCHITECTURE", highlight: false },
    { label: "SCALABLE WEB PLATFORMS", highlight: true },
  ];

  // Duplicate items for seamless continuous looping
  const repeatedItems = [...tickerItems, ...tickerItems, ...tickerItems];

  return (
    <div className="cinema-marquee-wrapper" aria-hidden="true">
      <div className="cinema-marquee-track">
        {repeatedItems.map((item, idx) => (
          <div key={idx} className="marquee-item">
            <span className="marquee-star">✦</span>
            {item.highlight ? (
              <strong>{item.label}</strong>
            ) : (
              <span>{item.label}</span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
