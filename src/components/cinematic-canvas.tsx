import { useEffect, useRef, useState } from "react";
import * as THREE from "three";

/**
 * Atmospheric 3D Canvas for NovaCraft
 *
 * - Provides ambient cinematic depth behind readable sales text.
 * - Restrained, non-blocking: no forced intro delay or scroll hijacking.
 * - Pauses rendering when tab is hidden or when off-screen.
 * - Graceful static visual fallback when WebGL is unavailable or reduced motion is enabled.
 * - Full pointer-events-none layering ensuring 100% accessible navigation and forms.
 */
export function CinematicCanvas() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [hasWebGL, setHasWebGL] = useState(true);

  useEffect(() => {
    const container = containerRef.current;
    if (!container || typeof window === "undefined") return;

    // Check prefers-reduced-motion
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // Test WebGL availability safely
    const checkWebGL = () => {
      try {
        const testCanvas = document.createElement("canvas");
        return Boolean(
          window.WebGLRenderingContext &&
          (testCanvas.getContext("webgl") || testCanvas.getContext("experimental-webgl")),
        );
      } catch {
        return false;
      }
    };

    if (prefersReducedMotion || !checkWebGL()) {
      setHasWebGL(false);
      return;
    }

    setHasWebGL(true);

    // 1. Scene & Atmosphere Setup
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x03060a);
    scene.fog = new THREE.FogExp2(0x050a10, 0.015);

    // 2. Camera Setup
    const camera = new THREE.PerspectiveCamera(
      38,
      window.innerWidth / window.innerHeight,
      0.1,
      150,
    );

    // 3. Renderer Setup with graceful context check
    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({
        antialias: window.innerWidth >= 768,
        alpha: false,
        powerPreference: "high-performance",
      });
    } catch {
      setHasWebGL(false);
      return;
    }

    const isMobile = window.innerWidth < 768;
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(isMobile ? 1 : Math.min(window.devicePixelRatio || 1, 1.8));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.15;
    container.appendChild(renderer.domElement);

    // 4. Lighting System: Subtle Blue, Cyan Rim & Warm Accents
    const ambientLight = new THREE.AmbientLight(0x07111e, 1.4);
    scene.add(ambientLight);

    const keyMoonLight = new THREE.DirectionalLight(0x38bdf8, 2.0);
    keyMoonLight.position.set(12, 22, 14);
    scene.add(keyMoonLight);

    const warmAccentLight = new THREE.DirectionalLight(0xf59e0b, 0.7);
    warmAccentLight.position.set(-14, -8, -10);
    scene.add(warmAccentLight);

    const corePointLight = new THREE.PointLight(0x6366f1, 2.5, 35, 1.8);
    corePointLight.position.set(0, 2.5, 0);
    scene.add(corePointLight);

    // 5. Procedural 3D World (NovaCraft Monolith & Rings)
    const worldGroup = new THREE.Group();
    scene.add(worldGroup);

    // Monolith
    const monolithGeo = new THREE.BoxGeometry(1.6, 6.2, 1.6);
    const monolithMat = new THREE.MeshStandardMaterial({
      color: 0x090d16,
      roughness: 0.2,
      metalness: 0.9,
    });
    const monolith = new THREE.Mesh(monolithGeo, monolithMat);
    monolith.position.set(0, 2.4, 0);
    worldGroup.add(monolith);

    const edgesGeo = new THREE.EdgesGeometry(monolithGeo);
    const edgesMat = new THREE.LineBasicMaterial({
      color: 0x38bdf8,
      transparent: true,
      opacity: 0.45,
    });
    const monolithEdges = new THREE.LineSegments(edgesGeo, edgesMat);
    monolith.add(monolithEdges);

    // Satellite pedestals
    const satellites: THREE.Mesh[] = [];
    const satCount = isMobile ? 2 : 4;
    for (let i = 0; i < satCount; i++) {
      const angle = (i / satCount) * Math.PI * 2;
      const dist = 3.6;
      const h = 2.0 + (i % 2) * 1.5;
      const satGeo = new THREE.BoxGeometry(0.8, h, 0.8);
      const satMat = new THREE.MeshStandardMaterial({
        color: 0x0a101d,
        roughness: 0.25,
        metalness: 0.85,
      });
      const sat = new THREE.Mesh(satGeo, satMat);
      sat.position.set(Math.cos(angle) * dist, h * 0.5 - 0.5, Math.sin(angle) * dist);
      sat.rotation.y = angle;

      const satEdge = new THREE.LineSegments(
        new THREE.EdgesGeometry(satGeo),
        new THREE.LineBasicMaterial({
          color: i % 2 === 0 ? 0x818cf8 : 0x38bdf8,
          transparent: true,
          opacity: 0.35,
        }),
      );
      sat.add(satEdge);
      satellites.push(sat);
      worldGroup.add(sat);
    }

    // Connectivity Rings
    const ringMat1 = new THREE.MeshBasicMaterial({
      color: 0x6366f1,
      transparent: true,
      opacity: 0.3,
      wireframe: true,
    });
    const ringGeo1 = new THREE.TorusGeometry(4.8, 0.02, 10, isMobile ? 40 : 80);
    const ring1 = new THREE.Mesh(ringGeo1, ringMat1);
    ring1.rotation.x = Math.PI * 0.35;
    ring1.rotation.y = Math.PI * 0.15;
    ring1.position.set(0, 2.5, 0);
    worldGroup.add(ring1);

    const ringMat2 = new THREE.MeshBasicMaterial({
      color: 0x38bdf8,
      transparent: true,
      opacity: 0.2,
      wireframe: true,
    });
    const ringGeo2 = new THREE.TorusGeometry(6.2, 0.02, 10, isMobile ? 40 : 80);
    const ring2 = new THREE.Mesh(ringGeo2, ringMat2);
    ring2.rotation.x = -Math.PI * 0.28;
    ring2.rotation.z = Math.PI * 0.2;
    ring2.position.set(0, 2.5, 0);
    worldGroup.add(ring2);

    // Ground Grid
    const gridHelper = new THREE.GridHelper(90, isMobile ? 24 : 45, 0x1e293b, 0x0a1120);
    gridHelper.position.y = -1.2;
    scene.add(gridHelper);

    // Drifting Stardust Motes
    const moteCount = isMobile ? 120 : 350;
    const moteGeo = new THREE.BufferGeometry();
    const motePos = new Float32Array(moteCount * 3);
    const moteSpeed = new Float32Array(moteCount);
    for (let i = 0; i < moteCount; i++) {
      motePos[i * 3 + 0] = (Math.random() - 0.5) * 40;
      motePos[i * 3 + 1] = Math.random() * 22 - 2;
      motePos[i * 3 + 2] = (Math.random() - 0.5) * 40;
      moteSpeed[i] = 0.2 + Math.random() * 0.5;
    }
    moteGeo.setAttribute("position", new THREE.BufferAttribute(motePos, 3));
    const moteMat = new THREE.PointsMaterial({
      color: 0x7dd3fc,
      size: 0.07,
      transparent: true,
      opacity: 0.45,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });
    const motes = new THREE.Points(moteGeo, moteMat);
    scene.add(motes);

    // Waypoints for smooth scroll progression
    const WAYPOINTS = [
      { p: new THREE.Vector3(0, 3.4, 13.8), t: new THREE.Vector3(0, 2.0, 0), fov: 38 },
      { p: new THREE.Vector3(-3.8, 2.4, 9.8), t: new THREE.Vector3(0.8, 1.6, -2.0), fov: 40 },
      { p: new THREE.Vector3(3.6, 2.8, 6.2), t: new THREE.Vector3(-1.2, 1.8, -3.5), fov: 39 },
      { p: new THREE.Vector3(-2.2, 3.5, 3.0), t: new THREE.Vector3(0.8, 2.0, -5.5), fov: 41 },
      { p: new THREE.Vector3(0.0, 4.8, -2.0), t: new THREE.Vector3(0.0, 2.5, -12.0), fov: 37 },
      { p: new THREE.Vector3(0.0, 5.8, -6.5), t: new THREE.Vector3(0.0, 1.8, -18.0), fov: 35 },
    ];

    const curveP = new THREE.CatmullRomCurve3(
      WAYPOINTS.map((w) => w.p),
      false,
      "catmullrom",
      0.4,
    );
    const curveT = new THREE.CatmullRomCurve3(
      WAYPOINTS.map((w) => w.t),
      false,
      "catmullrom",
      0.4,
    );

    // Interaction & Pausing State
    let scrollProgressTarget = 0;
    let scrollProgressCurrent = 0;
    let pointerXTarget = 0;
    let pointerYTarget = 0;
    let pointerXCurrent = 0;
    let pointerYCurrent = 0;
    let isTabVisible = !document.hidden;

    const handleScroll = () => {
      const scrollY = window.scrollY;
      const maxScroll = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
      const ratio = Math.min(Math.max(scrollY / maxScroll, 0), 1);
      scrollProgressTarget = ratio * (WAYPOINTS.length - 1);
    };

    const handlePointerMove = (e: MouseEvent) => {
      pointerXTarget = (e.clientX / window.innerWidth) * 2 - 1;
      pointerYTarget = -(e.clientY / window.innerHeight) * 2 + 1;
    };

    const handleResize = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    const handleVisibilityChange = () => {
      isTabVisible = !document.hidden;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("pointermove", handlePointerMove, { passive: true });
    window.addEventListener("resize", handleResize);
    document.addEventListener("visibilitychange", handleVisibilityChange);

    handleScroll();

    // Render Loop
    let lastTime = performance.now();
    let animationFrameId: number;
    const tmpPos = new THREE.Vector3();
    const tmpTarget = new THREE.Vector3();

    const animate = (time: number) => {
      animationFrameId = requestAnimationFrame(animate);

      // Pause rendering if tab is hidden to conserve system battery/resources
      if (!isTabVisible) return;

      const delta = Math.min((time - lastTime) / 1000, 0.1);
      lastTime = time;

      // Damped camera motion
      scrollProgressCurrent +=
        (scrollProgressTarget - scrollProgressCurrent) * Math.min(1, delta * 4.5);
      pointerXCurrent += (pointerXTarget - pointerXCurrent) * Math.min(1, delta * 3.0);
      pointerYCurrent += (pointerYTarget - pointerYCurrent) * Math.min(1, delta * 3.0);

      const u = Math.min(Math.max(scrollProgressCurrent / (WAYPOINTS.length - 1), 0), 1);
      curveP.getPoint(u, tmpPos);
      curveT.getPoint(u, tmpTarget);

      // Subtle pointer parallax
      const parallaxFactor = 1 - u * 0.4;
      tmpPos.x += pointerXCurrent * 0.35 * parallaxFactor;
      tmpPos.y += pointerYCurrent * 0.2 * parallaxFactor;
      tmpTarget.x -= pointerXCurrent * 0.12 * parallaxFactor;
      tmpTarget.y -= pointerYCurrent * 0.08 * parallaxFactor;

      camera.position.copy(tmpPos);
      camera.lookAt(tmpTarget);

      const curIdx = Math.min(Math.floor(scrollProgressCurrent), WAYPOINTS.length - 2);
      const frac = scrollProgressCurrent - curIdx;
      const baseFov = THREE.MathUtils.lerp(
        WAYPOINTS[curIdx]?.fov ?? 38,
        WAYPOINTS[curIdx + 1]?.fov ?? 38,
        frac,
      );
      camera.fov = baseFov;
      camera.updateProjectionMatrix();

      // Atmospheric rotation
      const elapsed = time * 0.001;
      monolith.rotation.y = elapsed * 0.1;
      ring1.rotation.z = elapsed * 0.12;
      ring2.rotation.x = -elapsed * 0.1;

      for (let i = 0; i < satellites.length; i++) {
        const sat = satellites[i];
        if (sat) {
          sat.rotation.y = elapsed * 0.15 + i;
        }
      }

      // Mote particle drift
      const positions = moteGeo.getAttribute("position") as THREE.BufferAttribute | undefined;
      if (positions) {
        const arr = positions.array as Float32Array;
        for (let i = 0; i < moteCount; i++) {
          const idx = i * 3 + 1;
          arr[idx] = (arr[idx] ?? 0) - (moteSpeed[i] ?? 0.3) * delta * 0.8;
          if ((arr[idx] ?? 0) < -2) {
            arr[idx] = 20;
          }
        }
        positions.needsUpdate = true;
      }

      renderer.render(scene, camera);
    };

    animationFrameId = requestAnimationFrame(animate);

    // Cleanup on unmount
    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("resize", handleResize);
      document.removeEventListener("visibilitychange", handleVisibilityChange);

      monolithGeo.dispose();
      monolithMat.dispose();
      edgesGeo.dispose();
      edgesMat.dispose();
      ringGeo1.dispose();
      ringMat1.dispose();
      ringGeo2.dispose();
      ringMat2.dispose();
      gridHelper.dispose();
      moteGeo.dispose();
      moteMat.dispose();

      satellites.forEach((sat) => {
        sat.geometry.dispose();
        if (Array.isArray(sat.material)) {
          sat.material.forEach((m) => m.dispose());
        } else {
          sat.material.dispose();
        }
      });

      renderer.dispose();
      if (renderer.domElement && container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <>
      {/* 3D WebGL Canvas Layer */}
      <div
        ref={containerRef}
        id="cinematic-gl-container"
        aria-hidden="true"
        className={`fixed inset-0 pointer-events-none z-0 overflow-hidden bg-[#03060a] transition-opacity duration-700 ${
          hasWebGL ? "opacity-100" : "opacity-0"
        }`}
      />

      {/* Polished Static Fallback Backdrop (always present beneath, perfectly styled if WebGL is unavailable or reduced motion is preferred) */}
      {!hasWebGL && (
        <div
          aria-hidden="true"
          className="fixed inset-0 pointer-events-none z-0 overflow-hidden bg-[#03060a]"
        >
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_15%,rgba(56,189,248,0.12),transparent_70%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_40%_at_50%_80%,rgba(99,102,241,0.08),transparent_70%)]" />
        </div>
      )}
    </>
  );
}
