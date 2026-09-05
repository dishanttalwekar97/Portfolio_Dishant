import React, { useEffect, useRef } from "react";
import * as THREE from "three";

// Tech items for floating 3D background orbit
const BACKGROUND_TECH_NODES = [
  { name: "React", color: "#61DAFB", icon: "⚛️" },
  { name: "Node.js", color: "#68A063", icon: "🟢" },
  { name: "JavaScript", color: "#F7DF1E", icon: "⚡" },
  { name: "Python", color: "#38761D", icon: "🐍" },
  { name: "DSA 70+", color: "#FFA116", icon: "🧩" },
  { name: "SQL", color: "#00758F", icon: "🗄️" },
  { name: "Git", color: "#F05032", icon: "🔀" },
  { name: "Vite", color: "#646CFF", icon: "⚡" },
];

export default function CinematicBackground() {
  const mountRef = useRef(null);
  const mousePosRef = useRef({ x: 0, y: 0, targetX: 0, targetY: 0 });

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    let width = window.innerWidth;
    let height = window.innerHeight;

    // 1. Scene
    const scene = new THREE.Scene();

    // 2. Camera with Mobile Responsiveness
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    const updateCameraDistance = () => {
      const isMobile = window.innerWidth < 768;
      const isSmallMobile = window.innerWidth < 480;
      camera.position.set(0, 0, isSmallMobile ? 24 : isMobile ? 20 : 15);
    };
    updateCameraDistance();

    // 3. Renderer
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: "high-performance",
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // 4. Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    scene.add(ambientLight);

    const dirLight1 = new THREE.DirectionalLight(0x00f3ff, 1.8);
    dirLight1.position.set(10, 15, 10);
    scene.add(dirLight1);

    const dirLight2 = new THREE.DirectionalLight(0xa855f7, 1.5);
    dirLight2.position.set(-10, -15, -10);
    scene.add(dirLight2);

    // Main 3D Container Group
    const mainGroup = new THREE.Group();
    scene.add(mainGroup);

    // 5. Central 3D Geometry Core
    const coreGroup = new THREE.Group();
    mainGroup.add(coreGroup);

    // Solid Icosahedron Core
    const coreGeo = new THREE.IcosahedronGeometry(2.4, 1);
    const coreMat = new THREE.MeshStandardMaterial({
      color: 0x00f3ff,
      metalness: 0.8,
      roughness: 0.25,
      transparent: true,
      opacity: 0.35,
      emissive: 0x00f3ff,
      emissiveIntensity: 0.25,
    });
    const coreMesh = new THREE.Mesh(coreGeo, coreMat);
    coreGroup.add(coreMesh);

    // Outer Wireframe Cage
    const wireGeo = new THREE.IcosahedronGeometry(2.6, 2);
    const wireMat = new THREE.MeshBasicMaterial({
      color: 0xa855f7,
      wireframe: true,
      transparent: true,
      opacity: 0.45,
    });
    const wireMesh = new THREE.Mesh(wireGeo, wireMat);
    coreGroup.add(wireMesh);

    // Glowing Inner Energy Orb
    const innerGeo = new THREE.SphereGeometry(1.4, 32, 32);
    const innerMat = new THREE.MeshBasicMaterial({
      color: 0x00f3ff,
      transparent: true,
      opacity: 0.65,
    });
    const innerSphere = new THREE.Mesh(innerGeo, innerMat);
    coreGroup.add(innerSphere);

    // 6. Orbital Cyber Rings
    const ringsGroup = new THREE.Group();
    mainGroup.add(ringsGroup);

    const ringRadii = [3.6, 4.5, 5.4];
    const ringTilts = [
      { x: Math.PI / 4, y: 0, z: 0 },
      { x: -Math.PI / 3, y: Math.PI / 6, z: 0 },
      { x: Math.PI / 6, y: -Math.PI / 4, z: Math.PI / 3 },
    ];

    ringRadii.forEach((radius, i) => {
      const ringGeo = new THREE.TorusGeometry(radius, 0.02, 16, 100);
      const ringMat = new THREE.MeshBasicMaterial({
        color: i === 0 ? 0x00f3ff : i === 1 ? 0xa855f7 : 0xffffff,
        transparent: true,
        opacity: 0.4 - i * 0.08,
      });
      const ringMesh = new THREE.Mesh(ringGeo, ringMat);
      ringMesh.rotation.set(ringTilts[i].x, ringTilts[i].y, ringTilts[i].z);
      ringsGroup.add(ringMesh);
    });

    // Helper: Create Badge Texture
    const createBadgeTexture = (tech) => {
      const canvas = document.createElement("canvas");
      canvas.width = 256;
      canvas.height = 256;
      const ctx = canvas.getContext("2d");

      // Radial background
      const grad = ctx.createRadialGradient(128, 128, 20, 128, 128, 110);
      grad.addColorStop(0, "rgba(15, 23, 42, 0.9)");
      grad.addColorStop(1, "rgba(5, 8, 16, 0.6)");

      ctx.beginPath();
      ctx.arc(128, 128, 105, 0, Math.PI * 2);
      ctx.fillStyle = grad;
      ctx.fill();

      // Outer Ring
      ctx.lineWidth = 5;
      ctx.strokeStyle = tech.color;
      ctx.shadowColor = tech.color;
      ctx.shadowBlur = 12;
      ctx.stroke();

      // Icon & Name
      ctx.font = "bold 56px sans-serif";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillStyle = "#ffffff";
      ctx.fillText(tech.icon, 128, 100);

      ctx.font = "bold 24px sans-serif";
      ctx.fillStyle = tech.color;
      ctx.fillText(tech.name, 128, 165);

      const texture = new THREE.CanvasTexture(canvas);
      texture.needsUpdate = true;
      return texture;
    };

    // 7. Tech Nodes Orbiting around Core
    const nodesGroup = new THREE.Group();
    mainGroup.add(nodesGroup);
    const nodeMeshes = [];
    const orbitRadius = 6.2;

    BACKGROUND_TECH_NODES.forEach((tech, idx) => {
      const angle = (idx / BACKGROUND_TECH_NODES.length) * Math.PI * 2;
      const x = Math.cos(angle) * orbitRadius;
      const z = Math.sin(angle) * orbitRadius;
      const y = Math.sin(idx * 1.5) * 1.5;

      const texture = createBadgeTexture(tech);
      const badgeGeo = new THREE.PlaneGeometry(1.4, 1.4);
      const badgeMat = new THREE.MeshBasicMaterial({
        map: texture,
        transparent: true,
        side: THREE.DoubleSide,
        depthWrite: false,
        opacity: 0.85,
      });
      const badgeMesh = new THREE.Mesh(badgeGeo, badgeMat);
      badgeMesh.position.set(x, y, z);
      badgeMesh.userData = { initialY: y, index: idx };

      nodesGroup.add(badgeMesh);
      nodeMeshes.push(badgeMesh);
    });

    // 8. 3D Particle Nebula
    const particleCount = 400;
    const particleGeo = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const particleColors = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount * 3; i += 3) {
      positions[i] = (Math.random() - 0.5) * 35;
      positions[i + 1] = (Math.random() - 0.5) * 35;
      positions[i + 2] = (Math.random() - 0.5) * 35;

      const col = i % 2 === 0 ? new THREE.Color(0x00f3ff) : new THREE.Color(0xa855f7);
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
      opacity: 0.65,
      blending: THREE.AdditiveBlending,
    });

    const particles = new THREE.Points(particleGeo, particleMat);
    scene.add(particles);

    // Mouse Movement Listener for Parallax
    const handleMouseMove = (e) => {
      mousePosRef.current.targetX = (e.clientX / window.innerWidth - 0.5) * 0.6;
      mousePosRef.current.targetY = (e.clientY / window.innerHeight - 0.5) * 0.6;
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });

    // Render Animation Loop
    let animationFrameId;
    const clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      // Smooth mouse lerp for parallax
      mousePosRef.current.x += (mousePosRef.current.targetX - mousePosRef.current.x) * 0.05;
      mousePosRef.current.y += (mousePosRef.current.targetY - mousePosRef.current.y) * 0.05;

      // Scroll-driven Y shift
      const scrollY = window.scrollY || 0;
      const scrollRatio = scrollY / (document.body.scrollHeight || 1);

      mainGroup.rotation.y = elapsedTime * 0.12 + mousePosRef.current.x + scrollRatio * Math.PI;
      mainGroup.rotation.x = mousePosRef.current.y + Math.sin(elapsedTime * 0.2) * 0.1;

      // Rotate central core
      coreMesh.rotation.x = elapsedTime * 0.2;
      coreMesh.rotation.y = elapsedTime * 0.3;
      wireMesh.rotation.x = -elapsedTime * 0.15;
      wireMesh.rotation.y = -elapsedTime * 0.25;

      const pulse = 1 + Math.sin(elapsedTime * 2.5) * 0.06;
      innerSphere.scale.set(pulse, pulse, pulse);

      // Rotate rings
      ringsGroup.children.forEach((ring, idx) => {
        ring.rotation.z = elapsedTime * (0.1 + idx * 0.04) * (idx % 2 === 0 ? 1 : -1);
      });

      // Animate node badges billboarding to camera
      nodeMeshes.forEach((mesh) => {
        mesh.lookAt(camera.position);
        mesh.position.y = mesh.userData.initialY + Math.sin(elapsedTime * 1.8 + mesh.userData.index) * 0.15;
      });

      // Rotate particles
      particles.rotation.y = elapsedTime * 0.015;

      renderer.render(scene, camera);
    };

    animate();

    // Resize Handler
    const handleResize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
      updateCameraDistance();
    };

    window.addEventListener("resize", handleResize);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", handleResize);
      if (container && renderer.domElement) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, []);

  return (
    <>
      {/* 3D Hardware Accelerated WebGL Canvas Layer */}
      <div ref={mountRef} className="cinematic-bg-container" aria-hidden="true">
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
            <span>REC // 3D HARDWARE ENGINE</span>
          </div>
          <div>SCENE 01 · 3D WEBGL</div>
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
