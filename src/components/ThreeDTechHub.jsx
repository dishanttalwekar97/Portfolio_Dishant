import React, { useEffect, useRef, useState, useCallback } from "react";
import * as THREE from "three";

// Tech nodes data with full specs for interactive inspector
const TECH_NODES = [
  {
    id: "react",
    name: "React 19",
    category: "Frontend Core",
    color: "#61DAFB",
    glowColor: "rgba(97, 218, 251, 0.8)",
    icon: "⚛️",
    level: "Advanced",
    experience: "Projects & Production",
    desc: "Single-Page Applications, Hooks, State Management, Custom UI Architecture.",
    stats: { performance: "98%", mastery: "92%", projects: "10+" },
  },
  {
    id: "nodejs",
    name: "Node.js",
    category: "Backend Engine",
    color: "#68A063",
    glowColor: "rgba(104, 160, 99, 0.8)",
    icon: "🟢",
    level: "Proficient",
    experience: "REST APIs & Microservices",
    desc: "Express, Asynchronous I/O, JWT Auth, Database Integration & API Gateways.",
    stats: { performance: "95%", mastery: "88%", projects: "8+" },
  },
  {
    id: "javascript",
    name: "JavaScript",
    category: "Core Language",
    color: "#F7DF1E",
    glowColor: "rgba(247, 223, 30, 0.8)",
    icon: "⚡",
    level: "Expert Core",
    experience: "ES6+, Async/Await, Canvas",
    desc: "Deep knowledge of Event Loop, Closures, DOM Manipulation, WebGL & Canvas API.",
    stats: { performance: "99%", mastery: "95%", projects: "12+" },
  },
  {
    id: "python",
    name: "Python",
    category: "Data & Scripting",
    color: "#38761D",
    glowColor: "rgba(56, 118, 29, 0.8)",
    icon: "🐍",
    level: "Intermediate",
    experience: "Automation & Problem Solving",
    desc: "Data Structures, Scripting, Logic Building, Algorithm implementation.",
    stats: { performance: "90%", mastery: "82%", projects: "5+" },
  },
  {
    id: "dsa",
    name: "DSA LeetCode",
    category: "Algorithms",
    color: "#FFA116",
    glowColor: "rgba(255, 161, 22, 0.8)",
    icon: "🧩",
    level: "70+ Solved",
    experience: "LeetCode Milestone",
    desc: "Arrays, Linked Lists, Trees, Graphs, Dynamic Programming & Space/Time Optimization.",
    stats: { performance: "94%", mastery: "85%", projects: "70+ Problems" },
  },
  {
    id: "sql",
    name: "SQL & Databases",
    category: "Data Storage",
    color: "#00758F",
    glowColor: "rgba(0, 117, 143, 0.8)",
    icon: "🗄️",
    level: "Proficient",
    experience: "Relational Schemas & Queries",
    desc: "PostgreSQL, MySQL, Complex Joins, Indexing, Data Modeling & Transactions.",
    stats: { performance: "92%", mastery: "86%", projects: "6+" },
  },
  {
    id: "git",
    name: "Git & Versioning",
    category: "DevOps & Workflow",
    color: "#F05032",
    glowColor: "rgba(240, 80, 50, 0.8)",
    icon: "🔀",
    level: "Advanced Workflow",
    experience: "GitHub, CI/CD, Branching",
    desc: "Repository management, Pull Requests, Merge conflict resolution, GitHub Pages/Vercel.",
    stats: { performance: "96%", mastery: "90%", projects: "15+" },
  },
  {
    id: "vite",
    name: "Vite & Tooling",
    category: "Build Tools",
    color: "#646CFF",
    glowColor: "rgba(100, 108, 255, 0.8)",
    icon: "⚡",
    level: "Modern Bundling",
    experience: "HMR, ESBuild, Optimization",
    desc: "Ultra-fast frontend build pipelines, environment configurations & asset bundling.",
    stats: { performance: "99%", mastery: "91%", projects: "10+" },
  },
];

// Visual Theme Presets
const THEMES = {
  quantum: {
    id: "quantum",
    name: "Quantum Cyber",
    primary: 0x00f3ff,
    secondary: 0xa855f7,
    ambient: 0x0a0f24,
    bgGlow: "#00f3ff",
  },
  hologram: {
    id: "hologram",
    name: "Hologram Wire",
    primary: 0x3b82f6,
    secondary: 0x06b6d4,
    ambient: 0x031027,
    bgGlow: "#3b82f6",
  },
  neon: {
    id: "neon",
    name: "Neon Matrix",
    primary: 0x10b981,
    secondary: 0x22c55e,
    ambient: 0x022013,
    bgGlow: "#10b981",
  },
  gold: {
    id: "gold",
    name: "Solar Gold",
    primary: 0xf59e0b,
    secondary: 0xef4444,
    ambient: 0x241400,
    bgGlow: "#f59e0b",
  },
};

export default function ThreeDTechHub() {
  const mountRef = useRef(null);
  const [activeTheme, setActiveTheme] = useState("quantum");
  const [selectedNode, setSelectedNode] = useState(null);
  const [autoRotate, setAutoRotate] = useState(true);
  const [rotationSpeed, setRotationSpeed] = useState(1);
  const [hoveredNode, setHoveredNode] = useState(null);
  const [fps, setFps] = useState(60);

  // References for Three.js objects
  const sceneRef = useRef(null);
  const rendererRef = useRef(null);
  const cameraRef = useRef(null);
  const coreMeshRef = useRef(null);
  const coreWireframeRef = useRef(null);
  const innerSphereRef = useRef(null);
  const ringsGroupRef = useRef(null);
  const nodesGroupRef = useRef(null);
  const particlesRef = useRef(null);
  const mainGroupRef = useRef(null);

  // Drag interaction state
  const isDraggingRef = useRef(false);
  const previousMousePositionRef = useRef({ x: 0, y: 0 });
  const targetRotationRef = useRef({ x: 0, y: 0 });
  const currentRotationRef = useRef({ x: 0, y: 0 });

  // Raycasting
  const raycasterRef = useRef(new THREE.Raycaster());
  const mouseRef = useRef(new THREE.Vector2(-999, -999));
  const nodeMeshesRef = useRef([]);

  // Create badge canvas texture for tech badges
  const createBadgeTexture = useCallback((tech) => {
    const canvas = document.createElement("canvas");
    canvas.width = 256;
    canvas.height = 256;
    const ctx = canvas.getContext("2d");

    // Background circle with glow
    const grad = ctx.createRadialGradient(128, 128, 20, 128, 128, 120);
    grad.addColorStop(0, "rgba(15, 23, 42, 0.95)");
    grad.addColorStop(0.8, "rgba(10, 15, 30, 0.85)");
    grad.addColorStop(1, "rgba(0, 0, 0, 0.6)");

    ctx.beginPath();
    ctx.arc(128, 128, 110, 0, Math.PI * 2);
    ctx.fillStyle = grad;
    ctx.fill();

    // Outer Neon Ring
    ctx.lineWidth = 6;
    ctx.strokeStyle = tech.color;
    ctx.shadowColor = tech.color;
    ctx.shadowBlur = 15;
    ctx.stroke();
    ctx.shadowBlur = 0;

    // Tech Icon Emoji / Text
    ctx.font = "bold 56px 'Outfit', sans-serif";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillStyle = "#ffffff";
    ctx.fillText(tech.icon, 128, 95);

    // Tech Name Label
    ctx.font = "bold 22px 'Outfit', sans-serif";
    ctx.fillStyle = tech.color;
    ctx.shadowColor = tech.color;
    ctx.shadowBlur = 8;
    ctx.fillText(tech.name, 128, 160);
    ctx.shadowBlur = 0;

    // Sub-label category
    ctx.font = "14px 'Inter', sans-serif";
    ctx.fillStyle = "#94a3b8";
    ctx.fillText(tech.category.toUpperCase(), 128, 185);

    const texture = new THREE.CanvasTexture(canvas);
    texture.needsUpdate = true;
    return texture;
  }, []);

  // Initialize Three.js 3D Scene
  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const width = container.clientWidth;
    const height = container.clientHeight;

    // 1. Scene
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    // 2. Camera
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.set(0, 0, 14);
    cameraRef.current = camera;

    // 3. Renderer
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: "high-performance",
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    container.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // 4. Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.7);
    scene.add(ambientLight);

    const dirLight1 = new THREE.DirectionalLight(0x00f3ff, 2.2);
    dirLight1.position.set(10, 12, 10);
    scene.add(dirLight1);

    const dirLight2 = new THREE.DirectionalLight(0xa855f7, 1.8);
    dirLight2.position.set(-10, -10, -10);
    scene.add(dirLight2);

    const pointLight = new THREE.PointLight(0x00f3ff, 3, 20);
    pointLight.position.set(0, 0, 0);
    scene.add(pointLight);

    // Main parent container group for mouse orbit interaction
    const mainGroup = new THREE.Group();
    scene.add(mainGroup);
    mainGroupRef.current = mainGroup;

    // 5. Central Futuristic 3D Geometry Core
    const coreGroup = new THREE.Group();
    mainGroup.add(coreGroup);

    // Solid Icosahedron Core
    const coreGeo = new THREE.IcosahedronGeometry(2.2, 1);
    const coreMat = new THREE.MeshStandardMaterial({
      color: THEMES.quantum.primary,
      metalness: 0.8,
      roughness: 0.2,
      wireframe: false,
      transparent: true,
      opacity: 0.45,
      emissive: THEMES.quantum.primary,
      emissiveIntensity: 0.35,
    });
    const coreMesh = new THREE.Mesh(coreGeo, coreMat);
    coreGroup.add(coreMesh);
    coreMeshRef.current = coreMesh;

    // Wireframe Outer Cage
    const wireGeo = new THREE.IcosahedronGeometry(2.35, 2);
    const wireMat = new THREE.MeshBasicMaterial({
      color: THEMES.quantum.secondary,
      wireframe: true,
      transparent: true,
      opacity: 0.6,
    });
    const wireMesh = new THREE.Mesh(wireGeo, wireMat);
    coreGroup.add(wireMesh);
    coreWireframeRef.current = wireMesh;

    // Glowing Inner Energy Orb
    const innerGeo = new THREE.SphereGeometry(1.3, 32, 32);
    const innerMat = new THREE.MeshBasicMaterial({
      color: THEMES.quantum.primary,
      transparent: true,
      opacity: 0.85,
    });
    const innerSphere = new THREE.Mesh(innerGeo, innerMat);
    coreGroup.add(innerSphere);
    innerSphereRef.current = innerSphere;

    // 6. Orbital Cyber Rings
    const ringsGroup = new THREE.Group();
    mainGroup.add(ringsGroup);
    ringsGroupRef.current = ringsGroup;

    const ringRadii = [3.2, 4.0, 4.8];
    const ringTilts = [
      { x: Math.PI / 4, y: 0, z: 0 },
      { x: -Math.PI / 3, y: Math.PI / 6, z: 0 },
      { x: Math.PI / 6, y: -Math.PI / 4, z: Math.PI / 3 },
    ];

    ringRadii.forEach((radius, i) => {
      const ringGeo = new THREE.TorusGeometry(radius, 0.025, 16, 100);
      const ringMat = new THREE.MeshBasicMaterial({
        color: i === 0 ? THEMES.quantum.primary : i === 1 ? THEMES.quantum.secondary : 0xffffff,
        transparent: true,
        opacity: 0.55 - i * 0.1,
      });
      const ringMesh = new THREE.Mesh(ringGeo, ringMat);
      ringMesh.rotation.set(ringTilts[i].x, ringTilts[i].y, ringTilts[i].z);
      ringsGroup.add(ringMesh);
    });

    // 7. Tech Nodes Orbiting around Core
    const nodesGroup = new THREE.Group();
    mainGroup.add(nodesGroup);
    nodesGroupRef.current = nodesGroup;

    const nodeMeshes = [];
    const orbitRadius = 5.6;

    TECH_NODES.forEach((tech, idx) => {
      const angle = (idx / TECH_NODES.length) * Math.PI * 2;
      const x = Math.cos(angle) * orbitRadius;
      const z = Math.sin(angle) * orbitRadius;
      const y = (Math.sin(idx * 1.5) * 1.4);

      // Create 3D Badge Plane with Canvas Texture
      const texture = createBadgeTexture(tech);
      const badgeGeo = new THREE.PlaneGeometry(1.5, 1.5);
      const badgeMat = new THREE.MeshBasicMaterial({
        map: texture,
        transparent: true,
        side: THREE.DoubleSide,
        depthWrite: false,
      });
      const badgeMesh = new THREE.Mesh(badgeGeo, badgeMat);
      badgeMesh.position.set(x, y, z);
      badgeMesh.userData = { ...tech, initialPos: { x, y, z }, angle, radius: orbitRadius, index: idx };

      // Glowing Node Sphere anchor
      const anchorGeo = new THREE.SphereGeometry(0.18, 16, 16);
      const anchorMat = new THREE.MeshBasicMaterial({
        color: tech.color,
      });
      const anchorMesh = new THREE.Mesh(anchorGeo, anchorMat);
      anchorMesh.position.set(x, y, z);

      nodesGroup.add(badgeMesh);
      nodesGroup.add(anchorMesh);
      nodeMeshes.push(badgeMesh);
    });

    nodeMeshesRef.current = nodeMeshes;

    // 8. 3D Particle Nebula
    const particleCount = 450;
    const particleGeo = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const particleColors = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount * 3; i += 3) {
      positions[i] = (Math.random() - 0.5) * 30;
      positions[i + 1] = (Math.random() - 0.5) * 30;
      positions[i + 2] = (Math.random() - 0.5) * 30;

      const col = i % 2 === 0 ? new THREE.Color(THEMES.quantum.primary) : new THREE.Color(THEMES.quantum.secondary);
      particleColors[i] = col.r;
      particleColors[i + 1] = col.g;
      particleColors[i + 2] = col.b;
    }

    particleGeo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    particleGeo.setAttribute("color", new THREE.BufferAttribute(particleColors, 3));

    const particleMat = new THREE.PointsMaterial({
      size: 0.08,
      vertexColors: true,
      transparent: true,
      opacity: 0.75,
      blending: THREE.AdditiveBlending,
    });

    const particles = new THREE.Points(particleGeo, particleMat);
    scene.add(particles);
    particlesRef.current = particles;

    // Animation Loop Variables
    let animationFrameId;
    let clock = new THREE.Clock();
    let frameCount = 0;
    let lastTime = performance.now();

    // 9. Render Loop
    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      // FPS Calculation
      frameCount++;
      const currentTime = performance.now();
      if (currentTime >= lastTime + 1000) {
        setFps(Math.round((frameCount * 1000) / (currentTime - lastTime)));
        frameCount = 0;
        lastTime = currentTime;
      }

      // Physics rotation calculations
      if (autoRotate && !isDraggingRef.current) {
        targetRotationRef.current.y += 0.003 * rotationSpeed;
      }

      // Smooth inertia lerp for mouse drag
      currentRotationRef.current.x += (targetRotationRef.current.x - currentRotationRef.current.x) * 0.08;
      currentRotationRef.current.y += (targetRotationRef.current.y - currentRotationRef.current.y) * 0.08;

      if (mainGroupRef.current) {
        mainGroupRef.current.rotation.x = currentRotationRef.current.x;
        mainGroupRef.current.rotation.y = currentRotationRef.current.y;
      }

      // Animate core geometry
      if (coreMeshRef.current) {
        coreMeshRef.current.rotation.x = elapsedTime * 0.2;
        coreMeshRef.current.rotation.y = elapsedTime * 0.3;
      }

      if (coreWireframeRef.current) {
        coreWireframeRef.current.rotation.x = -elapsedTime * 0.15;
        coreWireframeRef.current.rotation.y = -elapsedTime * 0.25;
      }

      if (innerSphereRef.current) {
        const pulse = 1 + Math.sin(elapsedTime * 3) * 0.08;
        innerSphereRef.current.scale.set(pulse, pulse, pulse);
      }

      // Animate orbital rings
      if (ringsGroupRef.current) {
        ringsGroupRef.current.children.forEach((ring, idx) => {
          ring.rotation.z = elapsedTime * (0.15 + idx * 0.05) * (idx % 2 === 0 ? 1 : -1);
        });
      }

      // Animate 3D Tech Nodes in Orbit & Billboarding towards camera
      nodeMeshes.forEach((mesh) => {
        mesh.lookAt(camera.position);

        // Gentle floating bounce
        const initialY = mesh.userData.initialPos.y;
        mesh.position.y = initialY + Math.sin(elapsedTime * 2 + mesh.userData.index) * 0.18;

        // Hover / selection pulse effect
        if (hoveredNode && hoveredNode.id === mesh.userData.id) {
          mesh.scale.lerp(new THREE.Vector3(1.3, 1.3, 1.3), 0.15);
        } else if (selectedNode && selectedNode.id === mesh.userData.id) {
          mesh.scale.lerp(new THREE.Vector3(1.35, 1.35, 1.35), 0.15);
        } else {
          mesh.scale.lerp(new THREE.Vector3(1, 1, 1), 0.1);
        }
      });

      // Animate background particles
      if (particlesRef.current) {
        particlesRef.current.rotation.y = elapsedTime * 0.02;
        particlesRef.current.rotation.x = elapsedTime * 0.01;
      }

      // Raycasting for node hover
      if (cameraRef.current && nodeMeshesRef.current.length > 0) {
        raycasterRef.current.setFromCamera(mouseRef.current, cameraRef.current);
        const intersects = raycasterRef.current.intersectObjects(nodeMeshesRef.current);

        if (intersects.length > 0) {
          const hoveredObj = intersects[0].object.userData;
          setHoveredNode(hoveredObj);
          container.style.cursor = "pointer";
        } else {
          setHoveredNode(null);
          container.style.cursor = isDraggingRef.current ? "grabbing" : "grab";
        }
      }

      renderer.render(scene, camera);
    };

    animate();

    // 10. Resize Listener
    const handleResize = () => {
      if (!container || !renderer || !camera) return;
      const newWidth = container.clientWidth;
      const newHeight = container.clientHeight;

      camera.aspect = newWidth / newHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(newWidth, newHeight);
    };

    window.addEventListener("resize", handleResize);

    // Cleanup
    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", handleResize);
      if (container && renderer.domElement) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, [createBadgeTexture]);

  // Update theme colors when user switches mode
  useEffect(() => {
    const theme = THEMES[activeTheme];
    if (!theme || !coreMeshRef.current || !coreWireframeRef.current || !innerSphereRef.current) return;

    coreMeshRef.current.material.color.setHex(theme.primary);
    coreMeshRef.current.material.emissive.setHex(theme.primary);
    coreWireframeRef.current.material.color.setHex(theme.secondary);
    innerSphereRef.current.material.color.setHex(theme.primary);
  }, [activeTheme]);

  // Mouse & Touch Drag Event Handlers for 360° Rotation
  const handleMouseDown = (e) => {
    isDraggingRef.current = true;
    previousMousePositionRef.current = { x: e.clientX, y: e.clientY };
  };

  const handleMouseMove = (e) => {
    const container = mountRef.current;
    if (!container) return;

    const rect = container.getBoundingClientRect();
    mouseRef.current.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
    mouseRef.current.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;

    if (!isDraggingRef.current) return;

    const deltaX = e.clientX - previousMousePositionRef.current.x;
    const deltaY = e.clientY - previousMousePositionRef.current.y;

    targetRotationRef.current.y += deltaX * 0.008;
    targetRotationRef.current.x += deltaY * 0.008;

    // Clamp vertical tilt to prevent flipping
    targetRotationRef.current.x = Math.max(-Math.PI / 3, Math.min(Math.PI / 3, targetRotationRef.current.x));

    previousMousePositionRef.current = { x: e.clientX, y: e.clientY };
  };

  const handleMouseUp = () => {
    isDraggingRef.current = false;
  };

  const handleClick = () => {
    if (hoveredNode) {
      setSelectedNode(hoveredNode);
    }
  };

  // Touch Handlers for Mobile
  const handleTouchStart = (e) => {
    if (e.touches.length === 1) {
      isDraggingRef.current = true;
      previousMousePositionRef.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
    }
  };

  const handleTouchMove = (e) => {
    if (!isDraggingRef.current || e.touches.length !== 1) return;

    const deltaX = e.touches[0].clientX - previousMousePositionRef.current.x;
    const deltaY = e.touches[0].clientY - previousMousePositionRef.current.y;

    targetRotationRef.current.y += deltaX * 0.01;
    targetRotationRef.current.x += deltaY * 0.01;
    targetRotationRef.current.x = Math.max(-Math.PI / 3, Math.min(Math.PI / 3, targetRotationRef.current.x));

    previousMousePositionRef.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
  };

  const handleTouchEnd = () => {
    isDraggingRef.current = false;
  };

  // Reset Camera View
  const handleResetView = () => {
    targetRotationRef.current = { x: 0, y: 0 };
    setSelectedNode(null);
  };

  return (
    <section id="3d-hub" className="three-d-section cinematic-section">
      <div className="main-container">
        {/* Section Header */}
        <div className="section-header-center">
          <div className="cinematic-badge">
            <span className="pulse-indicator" aria-hidden="true" />
            <span>INTERACTIVE WEBGL HARDWARE-ACCELERATED LAB</span>
          </div>
          <h2 className="section-title">
            3D Interactive <span className="text-gradient">Tech Core</span>
          </h2>
          <p className="section-subtitle">
            Explore Dishant&apos;s full-stack skills and computational proficiency in an interactive 3D WebGL orbit space. Drag to rotate, hover, or click on nodes to inspect real-time stats.
          </p>
        </div>

        {/* 3D Main Canvas Wrapper */}
        <div className="three-d-wrapper">
          {/* Glassmorphic Top Controls Bar */}
          <div className="three-d-hud-bar">
            {/* Live Diagnostics Tag */}
            <div className="hud-status-badge">
              <span className="hud-rec-dot pulse" />
              <span>RENDER ENGINE // WEBGL 2.0</span>
              <span className="hud-fps">({fps} FPS)</span>
            </div>

            {/* Render Theme Mode Switcher */}
            <div className="three-d-theme-pills">
              {Object.values(THEMES).map((t) => (
                <button
                  key={t.id}
                  type="button"
                  className={`theme-pill-btn ${activeTheme === t.id ? "active" : ""}`}
                  onClick={() => setActiveTheme(t.id)}
                >
                  <span className="pill-dot" style={{ backgroundColor: t.bgGlow }} />
                  <span>{t.name}</span>
                </button>
              ))}
            </div>

            {/* Quick Action Controls */}
            <div className="three-d-quick-actions">
              <button
                type="button"
                className={`hud-action-btn ${autoRotate ? "active" : ""}`}
                onClick={() => setAutoRotate(!autoRotate)}
                title={autoRotate ? "Pause Auto Rotation" : "Enable Auto Rotation"}
              >
                {autoRotate ? "⏸️ Pause Orbit" : "▶️ Auto Orbit"}
              </button>

              <button
                type="button"
                className="hud-action-btn"
                onClick={handleResetView}
                title="Reset Camera View"
              >
                🔄 Reset 3D View
              </button>
            </div>
          </div>

          {/* Interactive WebGL Canvas Mount Container */}
          <div
            ref={mountRef}
            className="three-d-canvas-container"
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onClick={handleClick}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            {/* Subtle Overlay Drag Hint */}
            <div className="three-d-drag-hint" aria-hidden="true">
              <span>🖱️ Drag mouse or swipe to rotate 3D space</span>
            </div>
          </div>

          {/* Hover Tooltip Overlay */}
          {hoveredNode && !selectedNode && (
            <div className="three-d-hover-tooltip" style={{ borderColor: hoveredNode.color }}>
              <span className="tooltip-icon">{hoveredNode.icon}</span>
              <div>
                <strong style={{ color: hoveredNode.color }}>{hoveredNode.name}</strong>
                <p>{hoveredNode.category} • Click to Inspect</p>
              </div>
            </div>
          )}

          {/* Selected Node Detailed Inspector Modal / HUD Card */}
          {selectedNode && (
            <div className="three-d-inspector-card" style={{ borderColor: selectedNode.color }}>
              <div className="inspector-header">
                <div className="inspector-title">
                  <span className="inspector-icon">{selectedNode.icon}</span>
                  <div>
                    <h3 style={{ color: selectedNode.color }}>{selectedNode.name}</h3>
                    <span className="inspector-category">{selectedNode.category}</span>
                  </div>
                </div>
                <button
                  type="button"
                  className="inspector-close-btn"
                  onClick={() => setSelectedNode(null)}
                  aria-label="Close detail panel"
                >
                  ✕
                </button>
              </div>

              <p className="inspector-desc">{selectedNode.desc}</p>

              <div className="inspector-grid">
                <div className="inspector-stat">
                  <span className="stat-label">Proficiency Level</span>
                  <span className="stat-val" style={{ color: selectedNode.color }}>
                    {selectedNode.level}
                  </span>
                </div>
                <div className="inspector-stat">
                  <span className="stat-label">Real Experience</span>
                  <span className="stat-val">{selectedNode.experience}</span>
                </div>
              </div>

              {/* Metric Progress Indicators */}
              <div className="inspector-metrics">
                <div className="metric-row">
                  <span>Performance Rating</span>
                  <div className="metric-bar-track">
                    <div
                      className="metric-bar-fill"
                      style={{
                        width: selectedNode.stats.performance,
                        backgroundColor: selectedNode.color,
                      }}
                    />
                  </div>
                  <span className="metric-num">{selectedNode.stats.performance}</span>
                </div>

                <div className="metric-row">
                  <span>Mastery Level</span>
                  <div className="metric-bar-track">
                    <div
                      className="metric-bar-fill"
                      style={{
                        width: selectedNode.stats.mastery,
                        backgroundColor: selectedNode.color,
                      }}
                    />
                  </div>
                  <span className="metric-num">{selectedNode.stats.mastery}</span>
                </div>
              </div>

              <div className="inspector-footer">
                <button
                  type="button"
                  className="btn btn-primary"
                  style={{ width: "100%", justifyContent: "center" }}
                  onClick={() => setSelectedNode(null)}
                >
                  <span>Close Telemetry Inspector</span>
                </button>
              </div>
            </div>
          )}

          {/* Bottom Speed & Orbit Controls Slider */}
          <div className="three-d-bottom-controls">
            <div className="speed-slider-group">
              <label htmlFor="orbit-speed">Orbit Speed ({rotationSpeed}x)</label>
              <input
                id="orbit-speed"
                type="range"
                min="0.2"
                max="3.0"
                step="0.1"
                value={rotationSpeed}
                onChange={(e) => setRotationSpeed(parseFloat(e.target.value))}
              />
            </div>

            <div className="tech-badge-legend">
              {TECH_NODES.map((node) => (
                <button
                  key={node.id}
                  type="button"
                  className={`legend-badge ${selectedNode?.id === node.id ? "active" : ""}`}
                  style={{ "--badge-color": node.color }}
                  onClick={() => setSelectedNode(node)}
                >
                  <span>{node.icon}</span>
                  <span>{node.name}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
