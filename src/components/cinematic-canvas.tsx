import { useEffect, useRef } from "react";
import * as THREE from "three";

/**
 * Cinematic 3D WebGL Canvas for NovaCraft
 * Inspired by the camera movement, atmospheric fog, and pointer parallax of ThreeUI Kage by Meng To.
 *
 * - Procedural digital architecture monolith & global connectivity rings
 * - Smooth scroll-driven Catmull-Rom camera trajectory across 6 narrative chapters
 * - Exponential depth fog (0x050a10) and subtle cyan/blue cinematic lighting
 * - Hand-held pointer parallax with damping and opening dolly ease
 * - Complete resource cleanup on unmount
 */
export function CinematicCanvas() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container || typeof window === "undefined") return;

    // Check prefers-reduced-motion
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

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

    // 3. Renderer Setup
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: false,
      powerPreference: "high-performance",
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.15;
    container.appendChild(renderer.domElement);

    // 4. Lighting System: Subtle Blue, Cyan Rim & Warm Accents
    const ambientLight = new THREE.AmbientLight(0x07111e, 1.4);
    scene.add(ambientLight);

    const keyMoonLight = new THREE.DirectionalLight(0x38bdf8, 2.2);
    keyMoonLight.position.set(12, 22, 14);
    scene.add(keyMoonLight);

    const warmAccentLight = new THREE.DirectionalLight(0xf59e0b, 0.85);
    warmAccentLight.position.set(-14, -8, -10);
    scene.add(warmAccentLight);

    const corePointLight = new THREE.PointLight(0x6366f1, 2.8, 35, 1.8);
    corePointLight.position.set(0, 2.5, 0);
    scene.add(corePointLight);

    // 5. Procedural 3D World (NovaCraft Digital Realm)
    const worldGroup = new THREE.Group();
    scene.add(worldGroup);

    // A. Central Digital Monolith (Web & Code Architecture)
    const monolithGeo = new THREE.BoxGeometry(1.6, 6.2, 1.6);
    const monolithMat = new THREE.MeshStandardMaterial({
      color: 0x090d16,
      roughness: 0.18,
      metalness: 0.92,
      envMapIntensity: 1.0,
    });
    const monolith = new THREE.Mesh(monolithGeo, monolithMat);
    monolith.position.set(0, 2.4, 0);
    worldGroup.add(monolith);

    // Cyan glowing wireframe edges on the monolith
    const edgesGeo = new THREE.EdgesGeometry(monolithGeo);
    const edgesMat = new THREE.LineBasicMaterial({
      color: 0x38bdf8,
      transparent: true,
      opacity: 0.55,
    });
    const monolithEdges = new THREE.LineSegments(edgesGeo, edgesMat);
    monolith.add(monolithEdges);

    // Secondary floating monolith pedestals
    const satellites: THREE.Mesh[] = [];
    const satCount = 4;
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
          opacity: 0.4,
        }),
      );
      sat.add(satEdge);
      satellites.push(sat);
      worldGroup.add(sat);
    }

    // B. Global Social Media Connectivity Rings (Global Reach)
    const ringMat1 = new THREE.MeshBasicMaterial({
      color: 0x6366f1,
      transparent: true,
      opacity: 0.35,
      wireframe: true,
    });
    const ringGeo1 = new THREE.TorusGeometry(4.8, 0.02, 12, 100);
    const ring1 = new THREE.Mesh(ringGeo1, ringMat1);
    ring1.rotation.x = Math.PI * 0.35;
    ring1.rotation.y = Math.PI * 0.15;
    ring1.position.set(0, 2.5, 0);
    worldGroup.add(ring1);

    const ringMat2 = new THREE.MeshBasicMaterial({
      color: 0x38bdf8,
      transparent: true,
      opacity: 0.25,
      wireframe: true,
    });
    const ringGeo2 = new THREE.TorusGeometry(6.2, 0.02, 12, 100);
    const ring2 = new THREE.Mesh(ringGeo2, ringMat2);
    ring2.rotation.x = -Math.PI * 0.28;
    ring2.rotation.z = Math.PI * 0.2;
    ring2.position.set(0, 2.5, 0);
    worldGroup.add(ring2);

    // C. Network Constellation Nodes (Worldwide Data Streams)
    const nodeCount = 36;
    const nodeGeo = new THREE.SphereGeometry(0.065, 12, 12);
    const nodeMat = new THREE.MeshBasicMaterial({
      color: 0x93c5fd,
      transparent: true,
      opacity: 0.85,
    });
    const nodeGroup = new THREE.Group();
    for (let i = 0; i < nodeCount; i++) {
      const u = Math.random();
      const v = Math.random();
      const theta = u * 2.0 * Math.PI;
      const phi = Math.acos(2.0 * v - 1.0);
      const r = 3.5 + Math.random() * 3.5;
      const node = new THREE.Mesh(nodeGeo, nodeMat);
      node.position.set(
        r * Math.sin(phi) * Math.cos(theta),
        1.5 + r * Math.sin(phi) * Math.sin(theta) * 0.6,
        r * Math.cos(phi),
      );
      nodeGroup.add(node);
    }
    worldGroup.add(nodeGroup);

    // D. Ground Grid & Horizon Plane (Deep Infinity Haze)
    const gridHelper = new THREE.GridHelper(90, 45, 0x1e293b, 0x0a1120);
    gridHelper.position.y = -1.2;
    scene.add(gridHelper);

    // E. Drifting Atmospheric Motes & Particle Field (450+ Points)
    const moteCount = 500;
    const moteGeo = new THREE.BufferGeometry();
    const motePos = new Float32Array(moteCount * 3);
    const moteSpeed = new Float32Array(moteCount);
    for (let i = 0; i < moteCount; i++) {
      motePos[i * 3 + 0] = (Math.random() - 0.5) * 45;
      motePos[i * 3 + 1] = Math.random() * 24 - 2;
      motePos[i * 3 + 2] = (Math.random() - 0.5) * 45;
      moteSpeed[i] = 0.2 + Math.random() * 0.6;
    }
    moteGeo.setAttribute("position", new THREE.BufferAttribute(motePos, 3));
    const moteMat = new THREE.PointsMaterial({
      color: 0x7dd3fc,
      size: 0.08,
      transparent: true,
      opacity: 0.5,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });
    const motes = new THREE.Points(moteGeo, moteMat);
    scene.add(motes);

    // F. Procedural 3D Atmospheric Lightning & Electric Discharge Arcs
    const lightningSegments = 24;
    const lightningGeo = new THREE.BufferGeometry();
    const lightningPositions = new Float32Array((lightningSegments + 1) * 3);
    lightningGeo.setAttribute("position", new THREE.BufferAttribute(lightningPositions, 3));
    const lightningMat = new THREE.LineBasicMaterial({
      color: 0xa5f3fc,
      transparent: true,
      opacity: 0.95,
      blending: THREE.AdditiveBlending,
    });
    const lightningLine = new THREE.Line(lightningGeo, lightningMat);
    lightningLine.visible = false;
    worldGroup.add(lightningLine);

    // Secondary lightning fork branch
    const branchSegments = 14;
    const branchGeo = new THREE.BufferGeometry();
    const branchPositions = new Float32Array((branchSegments + 1) * 3);
    branchGeo.setAttribute("position", new THREE.BufferAttribute(branchPositions, 3));
    const branchMat = new THREE.LineBasicMaterial({
      color: 0x38bdf8,
      transparent: true,
      opacity: 0.85,
      blending: THREE.AdditiveBlending,
    });
    const branchLine = new THREE.Line(branchGeo, branchMat);
    branchLine.visible = false;
    worldGroup.add(branchLine);

    // Helper to calculate jittered electric path
    const updateLightningGeometry = (
      geo: THREE.BufferGeometry,
      segCount: number,
      pStart: THREE.Vector3,
      pEnd: THREE.Vector3,
      jitterStrength: number,
    ) => {
      const posAttr = geo.getAttribute("position") as THREE.BufferAttribute;
      const arr = posAttr.array as Float32Array;
      for (let i = 0; i <= segCount; i++) {
        const t = i / segCount;
        const envelope = Math.sin(t * Math.PI); // Envelope: 0 at ends, max in mid-arc
        const jx = (Math.random() - 0.5) * jitterStrength * envelope;
        const jy = (Math.random() - 0.5) * jitterStrength * envelope;
        const jz = (Math.random() - 0.5) * jitterStrength * envelope;
        arr[i * 3 + 0] = THREE.MathUtils.lerp(pStart.x, pEnd.x, t) + jx;
        arr[i * 3 + 1] = THREE.MathUtils.lerp(pStart.y, pEnd.y, t) + jy;
        arr[i * 3 + 2] = THREE.MathUtils.lerp(pStart.z, pEnd.z, t) + jz;
      }
      posAttr.needsUpdate = true;
    };

    // Lightning State Management
    let lightningDuration = 0;
    let lightningTimer = prefersReducedMotion ? 999999 : 2.5; // First strike in 2.5s
    let lightningJitterTimer = 0;
    let lightningFlashIntensity = 0;
    const lightningStartPoint = new THREE.Vector3();
    const lightningEndPoint = new THREE.Vector3();
    const branchStartPoint = new THREE.Vector3();
    const branchEndPoint = new THREE.Vector3();

    const triggerStrike = () => {
      if (prefersReducedMotion) return;
      // Discharge from top facets of monolith
      lightningStartPoint.set(
        (Math.random() - 0.5) * 0.8,
        5.2 + Math.random() * 0.5,
        (Math.random() - 0.5) * 0.8,
      );
      // Discharge towards satellite pillar or outer perimeter
      const targetSat = satellites[Math.floor(Math.random() * satellites.length)];
      if (targetSat) {
        lightningEndPoint.copy(targetSat.position);
        lightningEndPoint.y += 1.2;
      } else {
        const randAngle = Math.random() * Math.PI * 2;
        lightningEndPoint.set(Math.cos(randAngle) * 4.5, 0.5, Math.sin(randAngle) * 4.5);
      }

      // Secondary branch forks off
      branchStartPoint.lerpVectors(lightningStartPoint, lightningEndPoint, 0.45);
      branchEndPoint.set(
        branchStartPoint.x + (Math.random() - 0.5) * 3.2,
        branchStartPoint.y - 1.2 - Math.random() * 1.5,
        branchStartPoint.z + (Math.random() - 0.5) * 3.2,
      );

      lightningDuration = 0.22 + Math.random() * 0.08; // 220-300ms
      lightningFlashIntensity = 1.0;
      lightningLine.visible = true;
      branchLine.visible = true;
      updateLightningGeometry(
        lightningGeo,
        lightningSegments,
        lightningStartPoint,
        lightningEndPoint,
        0.95,
      );
      updateLightningGeometry(branchGeo, branchSegments, branchStartPoint, branchEndPoint, 0.75);
    };

    // 6. Camera Spline & Waypoints Choreography
    // 6 Chapters:
    // 0: Hero / The Digital Monolith
    // 1: Bespoke Website Creation
    // 2: Social Media Advisory
    // 3: Worldwide Social Media Management
    // 4: Selected Work Portfolio Showcase
    // 5: Services & Direct Project Inquiry
    const WAYPOINTS = [
      { p: new THREE.Vector3(0, 3.4, 13.8), t: new THREE.Vector3(0, 2.0, 0), fov: 38 },
      { p: new THREE.Vector3(-4.8, 2.2, 9.2), t: new THREE.Vector3(1.2, 1.4, -2.5), fov: 42 },
      { p: new THREE.Vector3(4.5, 2.6, 5.4), t: new THREE.Vector3(-1.6, 1.6, -4.0), fov: 40 },
      { p: new THREE.Vector3(-2.8, 3.8, 2.2), t: new THREE.Vector3(1.2, 2.0, -7.0), fov: 44 },
      { p: new THREE.Vector3(0.0, 5.2, -3.2), t: new THREE.Vector3(0.0, 2.8, -17.5), fov: 36 },
      { p: new THREE.Vector3(0.0, 6.4, -7.8), t: new THREE.Vector3(0.0, 1.5, -23.0), fov: 34 },
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

    // 7. Interaction State & Damped Loop Variables
    let scrollProgressTarget = 0;
    let scrollProgressCurrent = 0;
    let pointerXTarget = 0;
    let pointerYTarget = 0;
    let pointerXCurrent = 0;
    let pointerYCurrent = 0;
    let introProgress = prefersReducedMotion ? 1 : 0;

    // Scroll progress measurement based on page height
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const maxScroll = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
      const ratio = Math.min(Math.max(scrollY / maxScroll, 0), 1);
      scrollProgressTarget = ratio * (WAYPOINTS.length - 1);
    };

    // Pointer move for hand-held parallax
    const handlePointerMove = (e: MouseEvent) => {
      pointerXTarget = (e.clientX / window.innerWidth) * 2 - 1;
      pointerYTarget = -(e.clientY / window.innerHeight) * 2 + 1;
    };

    // Window resize handler
    const handleResize = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("pointermove", handlePointerMove, { passive: true });
    window.addEventListener("resize", handleResize);
    window.addEventListener("pointerdown", triggerStrike, { passive: true });

    // Initial measure
    handleScroll();

    // 8. Animation & Render Loop
    let lastTime = performance.now();
    let animationFrameId: number;

    const tmpPos = new THREE.Vector3();
    const tmpTarget = new THREE.Vector3();

    const animate = (time: number) => {
      const delta = Math.min((time - lastTime) / 1000, 0.1);
      lastTime = time;

      // Opening cinematic dolly ease-in
      if (introProgress < 1) {
        introProgress += delta * 0.75;
        if (introProgress > 1) introProgress = 1;
      }

      // Damped scroll progress
      const scrollDampRate = prefersReducedMotion ? 12 : 4.5;
      scrollProgressCurrent +=
        (scrollProgressTarget - scrollProgressCurrent) * Math.min(1, delta * scrollDampRate);

      // Damped pointer parallax
      pointerXCurrent += (pointerXTarget - pointerXCurrent) * Math.min(1, delta * 3.5);
      pointerYCurrent += (pointerYTarget - pointerYCurrent) * Math.min(1, delta * 3.5);

      // Evaluate spline position along camera path
      const u = Math.min(Math.max(scrollProgressCurrent / (WAYPOINTS.length - 1), 0), 1);
      curveP.getPoint(u, tmpPos);
      curveT.getPoint(u, tmpTarget);

      // Opening dolly offset (easing in from further back)
      const dollyEase = 1 - Math.min(Math.max(introProgress, 0), 1);
      tmpPos.z += dollyEase * 5.2;
      tmpPos.y += dollyEase * 0.8;

      // Hand-held pointer parallax offset
      const parallaxFactor = 1 - u * 0.45;
      tmpPos.x += pointerXCurrent * 0.42 * parallaxFactor;
      tmpPos.y += pointerYCurrent * 0.24 * parallaxFactor;
      tmpTarget.x -= pointerXCurrent * 0.16 * parallaxFactor;
      tmpTarget.y -= pointerYCurrent * 0.1 * parallaxFactor;

      camera.position.copy(tmpPos);
      camera.lookAt(tmpTarget);

      // Interpolate FOV dynamically
      const curIdx = Math.min(Math.floor(scrollProgressCurrent), WAYPOINTS.length - 2);
      const frac = scrollProgressCurrent - curIdx;
      const baseFov = THREE.MathUtils.lerp(
        WAYPOINTS[curIdx]?.fov ?? 38,
        WAYPOINTS[curIdx + 1]?.fov ?? 38,
        frac,
      );
      camera.fov = baseFov + dollyEase * 6.0;
      camera.updateProjectionMatrix();

      // Atmospheric geometry animations
      const elapsed = time * 0.001;
      monolith.rotation.y = elapsed * 0.12;
      ring1.rotation.z = elapsed * 0.16;
      ring2.rotation.x = -elapsed * 0.14;
      nodeGroup.rotation.y = elapsed * 0.08;

      for (let i = 0; i < satellites.length; i++) {
        const sat = satellites[i];
        if (sat) {
          sat.rotation.y = elapsed * 0.2 + i;
        }
      }

      // Gentle drift of stardust motes
      const positions = moteGeo.getAttribute("position") as THREE.BufferAttribute | undefined;
      if (positions) {
        const arr = positions.array as Float32Array;
        for (let i = 0; i < moteCount; i++) {
          const idx = i * 3 + 1;
          arr[idx] = (arr[idx] ?? 0) - moteSpeed[i]! * delta * 0.8;
          if ((arr[idx] ?? 0) < -2) {
            arr[idx] = 22;
          }
        }
        positions.needsUpdate = true;
      }

      // Atmospheric Lightning & Electric Arc Update Loop
      if (!prefersReducedMotion) {
        lightningTimer -= delta;
        if (lightningTimer <= 0) {
          triggerStrike();
          lightningTimer = 4.5 + Math.random() * 3.5; // Next strike in 4.5 to 8s
        }

        if (lightningDuration > 0) {
          lightningDuration -= delta;
          lightningJitterTimer += delta;

          // Continuous violent jitter during the 200-300ms strike
          if (lightningJitterTimer > 0.03) {
            lightningJitterTimer = 0;
            updateLightningGeometry(
              lightningGeo,
              lightningSegments,
              lightningStartPoint,
              lightningEndPoint,
              0.95,
            );
            updateLightningGeometry(
              branchGeo,
              branchSegments,
              branchStartPoint,
              branchEndPoint,
              0.75,
            );
            lightningMat.opacity = Math.random() > 0.25 ? 0.95 : 0.4;
            branchMat.opacity = Math.random() > 0.35 ? 0.85 : 0.3;
          }

          if (lightningDuration <= 0) {
            lightningLine.visible = false;
            branchLine.visible = false;
          }
        }

        // Decay thunderflash illumination smoothly
        if (lightningFlashIntensity > 0) {
          lightningFlashIntensity = Math.max(0, lightningFlashIntensity - delta * 4.2);
        }

        // Flash volumetric depth and key lights with lightning discharge
        ambientLight.intensity = 1.4 + lightningFlashIntensity * 1.8;
        corePointLight.intensity = 2.8 + lightningFlashIntensity * 7.0;
        keyMoonLight.intensity = 2.2 + lightningFlashIntensity * 2.8;
      }

      renderer.render(scene, camera);
      animationFrameId = requestAnimationFrame(animate);
    };

    animationFrameId = requestAnimationFrame(animate);

    // 9. Cleanup on Unmount
    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("pointerdown", triggerStrike);

      // Dispose Three.js scene resources
      monolithGeo.dispose();
      monolithMat.dispose();
      edgesGeo.dispose();
      edgesMat.dispose();
      ringGeo1.dispose();
      ringMat1.dispose();
      ringGeo2.dispose();
      ringMat2.dispose();
      nodeGeo.dispose();
      nodeMat.dispose();
      gridHelper.dispose();
      moteGeo.dispose();
      moteMat.dispose();
      lightningGeo.dispose();
      lightningMat.dispose();
      branchGeo.dispose();
      branchMat.dispose();

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
    <div
      ref={containerRef}
      id="cinematic-gl-container"
      aria-hidden="true"
      className="fixed inset-0 pointer-events-none z-0 overflow-hidden bg-[#03060a]"
    />
  );
}
