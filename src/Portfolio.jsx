import React, { useEffect, useState, useRef, useCallback } from "react";
import CinematicBackground from "./components/CinematicBackground";
import CustomCursor from "./components/CustomCursor";
import CinematicMarquee from "./components/CinematicMarquee";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Skills from "./components/Skills";
import Projects from "./components/Projects";
import ContactSection from "./components/ContactSection";
import ContactModal from "./components/ContactModal";
import MobileBottomDock from "./components/MobileBottomDock";
import Footer from "./components/Footer";

export default function Portfolio() {
  const [activeSection, setActiveSection] = useState("home");
  const [scrolled, setScrolled] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(false);

  // Web Audio Context for subtle futuristic UI feedback
  const audioCtxRef = useRef(null);

  const playUiSound = useCallback((frequency = 880, duration = 0.04) => {
    if (!soundEnabled) return;
    try {
      if (!audioCtxRef.current) {
        const AudioContextClass = window.AudioContext || window.webkitAudioContext;
        if (AudioContextClass) {
          audioCtxRef.current = new AudioContextClass();
        }
      }
      const ctx = audioCtxRef.current;
      if (!ctx) return;
      if (ctx.state === "suspended") {
        ctx.resume();
      }
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = "sine";
      osc.frequency.setValueAtTime(frequency, ctx.currentTime);
      gain.gain.setValueAtTime(0.04, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + duration);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + duration);
    } catch {
      // Ignore audio failure
    }
  }, [soundEnabled]);

  // Global Mouse Coordinates for Cinematic Flashlight
  useEffect(() => {
    const handleMouseMove = (e) => {
      document.documentElement.style.setProperty("--global-mouse-x", `${e.clientX}px`);
      document.documentElement.style.setProperty("--global-mouse-y", `${e.clientY}px`);
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  // Scroll Progress & Navbar Scrolled State
  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      const currentProgress = totalHeight > 0 ? (window.scrollY / totalHeight) * 100 : 0;
      setScrollProgress(currentProgress);
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Section & Scroll-Reveal Observer
  useEffect(() => {
    const sectionIds = ["home", "about", "skills", "projects", "contact"];
    const elements = sectionIds.map((id) => document.getElementById(id)).filter(Boolean);

    // Active Section Observer
    const sectionObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
            entry.target.classList.add("is-visible");
          }
        });
      },
      { threshold: 0.2 }
    );

    elements.forEach((el) => sectionObserver.observe(el));

    // Scroll Reveal Observer for cards & elements
    const revealEls = document.querySelectorAll(".reveal-on-scroll");
    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
          }
        });
      },
      { threshold: 0.05, rootMargin: "0px 0px -20px 0px" }
    );

    revealEls.forEach((el) => revealObserver.observe(el));

    // Dynamic Mutation Observer for components mounted after filter changes
    const mutationObserver = new MutationObserver(() => {
      const dynamicEls = document.querySelectorAll(".reveal-on-scroll:not(.is-visible)");
      dynamicEls.forEach((el) => revealObserver.observe(el));
    });

    mutationObserver.observe(document.body, { childList: true, subtree: true });

    return () => {
      sectionObserver.disconnect();
      revealObserver.disconnect();
      mutationObserver.disconnect();
    };
  }, []);

  // Navigation Handlers
  const handleNavigate = (sectionId) => {
    playUiSound(740, 0.05);
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const handleOpenContact = () => {
    playUiSound(960, 0.06);
    setIsContactOpen(true);
  };

  const handleCloseContact = () => {
    playUiSound(520, 0.04);
    setIsContactOpen(false);
  };

  const handleToggleSound = () => {
    setSoundEnabled((prev) => {
      const next = !prev;
      if (next) {
        setTimeout(() => playUiSound(1040, 0.06), 40);
      }
      return next;
    });
  };

  return (
    <div className="portfolio-app">
      {/* Custom Cyberpunk Glow Cursor */}
      <CustomCursor />

      {/* Top Scroll Indicator */}
      <div
        className="scroll-progress-bar"
        style={{ width: `${scrollProgress}%` }}
        aria-hidden="true"
      />

      {/* Floating Scroll HUD Badge */}
      <div className="scroll-hud-badge" aria-hidden="true">
        <span className="hud-dot" />
        <span>SCROLL // {Math.round(scrollProgress)}%</span>
        <span>[{activeSection.toUpperCase()}]</span>
      </div>

      {/* Cinematic Background, Constellations & Camera HUD */}
      <CinematicBackground />

      {/* Floating Navbar */}
      <Navbar
        activeSection={activeSection}
        scrolled={scrolled}
        onNavigate={handleNavigate}
        onOpenContact={handleOpenContact}
        soundEnabled={soundEnabled}
        onToggleSound={handleToggleSound}
      />

      {/* Main Content */}
      <main>
        <Hero
          onNavigate={handleNavigate}
          onOpenContact={handleOpenContact}
        />

        {/* Endless Cinematic Ticker */}
        <CinematicMarquee />

        <About />

        <Skills />

        <Projects />

        <ContactSection
          onOpenContact={handleOpenContact}
        />
      </main>

      {/* Footer */}
      <Footer onNavigate={handleNavigate} />

      {/* Contact Transmission Modal */}
      <ContactModal
        isOpen={isContactOpen}
        onClose={handleCloseContact}
      />

      {/* Floating Mobile Bottom Quick-Dock */}
      <MobileBottomDock
        activeSection={activeSection}
        onNavigate={handleNavigate}
        onOpenContact={handleOpenContact}
      />
    </div>
  );
}
