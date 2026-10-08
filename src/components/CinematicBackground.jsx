import React from "react";

export default function CinematicBackground() {
  return (
    <>
      {/* Atmosphere Glow & Lens Effects Layer */}
      <div className="cinematic-bg-container" aria-hidden="true">
        <div className="cinematic-top-beam" />
        <div className="anamorphic-flare-line" />
        <div className="mouse-flashlight" />
        <div className="film-grain-overlay" />
      </div>

      {/* Cinematic Viewport Framing HUD */}
      <div className="cinematic-hud-frame" aria-hidden="true">
        <div className="hud-top-bar">
          <div className="hud-tag-active">
            <span className="hud-rec-dot" />
            <span>REC // CINEMATIC NOIR</span>
          </div>
          <div>SCENE 01 · NOIR ATMOSPHERE</div>
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
