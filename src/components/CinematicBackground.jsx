import React, { useEffect, useRef } from "react";

export default function CinematicBackground() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener("resize", handleResize);

    const particleCount = Math.min(Math.floor(window.innerWidth / 20), 50);
    const particles = [];
    const maxConnectionDistance = 110;

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        radius: Math.random() * 1.6 + 0.6,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
        alpha: Math.random() * 0.6 + 0.15,
      });
    }

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Update and draw particles
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;

        // Bounce from edges
        if (p.x < 0 || p.x > width) p.vx *= -1;
        if (p.y < 0 || p.y > height) p.vy *= -1;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${p.alpha})`;
        ctx.shadowColor = "rgba(255, 255, 255, 0.8)";
        ctx.shadowBlur = p.radius > 1.2 ? 6 : 2;
        ctx.fill();
        ctx.shadowBlur = 0;
      }

      // Draw constellation connection lines
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < maxConnectionDistance) {
            const lineAlpha = (1 - dist / maxConnectionDistance) * 0.14;
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(255, 255, 255, ${lineAlpha.toFixed(3)})`;
            ctx.lineWidth = 0.8;
            ctx.stroke();
          }
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <>
      <div className="cinematic-bg-container" aria-hidden="true">
        <canvas ref={canvasRef} className="constellation-canvas" />
        <div className="cinematic-top-beam" />
        <div className="anamorphic-flare-line" />
        <div className="mouse-flashlight" />
        <div className="film-grain-overlay" />
      </div>

      {/* Cinematic Camera Viewport HUD Framing */}
      <div className="cinematic-hud-frame" aria-hidden="true">
        <div className="hud-top-bar">
          <div className="hud-tag-active">
            <span className="hud-rec-dot" />
            <span>REC // 4K 24FPS</span>
          </div>
          <div>SCENE 01 · TAKE 01</div>
          <div>ISO 800 · 1/50</div>
        </div>
        <div className="hud-bottom-bar">
          <div>ASPECT 2.39:1 CINEMASCOPE</div>
          <div>DISHANT TALWEKAR // PROD</div>
          <div>FPS 60.0</div>
        </div>
      </div>
    </>
  );
}
