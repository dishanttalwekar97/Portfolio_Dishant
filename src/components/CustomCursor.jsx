import React, { useEffect, useState, useRef } from "react";

export default function CustomCursor() {
  const dotRef = useRef(null);
  const ringRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  // Position state refs for lerp animation
  const mousePos = useRef({ x: -100, y: -100 });
  const ringPos = useRef({ x: -100, y: -100 });
  const animFrameId = useRef(null);

  useEffect(() => {
    // Only initialize on desktop devices with fine pointers
    if (!window.matchMedia("(pointer: fine)").matches) {
      return;
    }

    setIsVisible(true);

    const handleMouseMove = (e) => {
      mousePos.current = { x: e.clientX, y: e.clientY };

      // Update inner dot immediately
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`;
      }

      // Check if hovering interactive elements
      const target = e.target;
      if (target) {
        const isInteractive =
          target.closest("button") ||
          target.closest("a") ||
          target.closest("input") ||
          target.closest("textarea") ||
          target.closest(".spotlight-card") ||
          target.closest(".project-cinematic-card") ||
          target.closest(".social-icon-btn") ||
          target.closest(".nav-link-btn") ||
          target.getAttribute("role") === "button";

        setIsHovered(!!isInteractive);
      }
    };

    const handleMouseDown = () => setIsClicked(true);
    const handleMouseUp = () => setIsClicked(false);
    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);
    document.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("mouseenter", handleMouseEnter);

    // Smooth Lerp loop for trailing outer ring
    const render = () => {
      const lerp = (start, end, factor) => start + (end - start) * factor;

      ringPos.current.x = lerp(ringPos.current.x, mousePos.current.x, 0.18);
      ringPos.current.y = lerp(ringPos.current.y, mousePos.current.y, 0.18);

      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${ringPos.current.x}px, ${ringPos.current.y}px, 0)`;
      }

      animFrameId.current = requestAnimationFrame(render);
    };

    animFrameId.current = requestAnimationFrame(render);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("mouseenter", handleMouseEnter);
      if (animFrameId.current) cancelAnimationFrame(animFrameId.current);
    };
  }, []);

  if (!isVisible) return null;

  return (
    <div className="custom-cursor-container" aria-hidden="true">
      {/* Inner sharp dot */}
      <div
        ref={dotRef}
        className={`custom-cursor-dot ${isClicked ? "clicked" : ""} ${isHovered ? "hovered" : ""}`}
      />
      {/* Outer smooth trailing ring */}
      <div
        ref={ringRef}
        className={`custom-cursor-ring ${isClicked ? "clicked" : ""} ${isHovered ? "hovered" : ""}`}
      />
    </div>
  );
}
