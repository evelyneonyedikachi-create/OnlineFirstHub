import React, { useEffect, useRef } from 'react';
import { SectionView, VisualVariantConfig, ProjectTheme } from '../types';

interface IntelligentBackgroundProps {
  currentSection: SectionView;
  variantConfig: VisualVariantConfig;
  activeMethodStage?: number | null;
  activeProjectTheme?: ProjectTheme | null;
}

interface Particle3D {
  x: number;
  y: number;
  z: number; // 0.4 (foreground) to 2.6 (deep)
  vx: number;
  vy: number;
  radius: number; // Kept strictly within original size range
  baseAlpha: number;
  pulsePhase: number;
  pulseSpeed: number;
  layer: 1 | 2 | 3;
  curveAmp: number;
  curveFreq: number;
  orbitRadiusX?: number;
  orbitRadiusY?: number;
  orbitSpeed?: number;
  orbitAngle?: number;
  colorType: 'lilac' | 'blush' | 'periwinkle' | 'ice' | 'white' | 'project';
}

interface SynapticPulse {
  p1: number;
  p2: number;
  progress: number;
  speed: number;
  color: string;
}

// 3D Floating Sculptural Objects
interface SpatialForm3D {
  type: 'disk' | 'organic-blob' | 'glass-frame' | 'ribbon-arc' | 'octahedron' | 'layered-disks' | 'geodesic' | 'rounded-slab';
  xRel: number;
  yRel: number;
  z: number;
  size: number;
  rotX: number;
  rotY: number;
  rotZ: number;
  vRotX: number;
  vRotY: number;
  vRotZ: number;
  floatSpeed: number;
  floatAmp: number;
  floatOffset: number;
  primaryColor: string;
  secondaryColor: string;
  opacity: number;
}

export const IntelligentBackground: React.FC<IntelligentBackgroundProps> = ({
  currentSection,
  variantConfig,
  activeMethodStage = null,
  activeProjectTheme = null
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const mouseRef = useRef<{ x: number; y: number; targetX: number; targetY: number; active: boolean }>({
    x: 0,
    y: 0,
    targetX: 0,
    targetY: 0,
    active: false
  });

  const isVariantB = variantConfig.id === 'variant-b';

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const isMobile = width < 768;

    // 1. Particle Cloud setup with 3 distinct motion layers
    // EXACT particle size preserved: radius is (Math.random() * 2.2 + 0.9) * (1.8 / z)
    const particleCount = isMobile
      ? Math.floor(variantConfig.particleDensity * 0.7)
      : variantConfig.particleDensity;

    const particles: Particle3D[] = [];
    const colorTypes: ('lilac' | 'blush' | 'periwinkle' | 'ice' | 'white')[] = [
      'white', 'white', 'white', 'lilac', 'ice', 'white'
    ];

    for (let i = 0; i < particleCount; i++) {
      const z = Math.random() * 2.2 + 0.4;
      const layerRank = Math.random();
      const layer: 1 | 2 | 3 = layerRank < 0.45 ? 1 : layerRank < 0.8 ? 2 : 3;

      // Motion vectors across the page (diagonal/horizontal sweep)
      let vx = 0;
      let vy = 0;
      let orbitRadiusX: number | undefined;
      let orbitRadiusY: number | undefined;
      let orbitSpeed: number | undefined;
      let orbitAngle: number | undefined;

      if (layer === 1) {
        // Layer 1 — Far background dust: slow diagonal drift across the page (16-24s duration)
        vx = (Math.random() * 0.4 + 0.15) * (1 / z);
        vy = (Math.random() * 0.3 - 0.15) * (1 / z);
      } else if (layer === 2) {
        // Layer 2 — Mid particles: soft curved paths across page width (12-18s duration)
        vx = (Math.random() * 0.5 + 0.2) * (1 / z);
        vy = (Math.random() * 0.35 - 0.1) * (1 / z);
      } else {
        // Layer 3 — Highlighted particles: slow motion across larger arcs spanning the hero area (8-14s)
        vx = (Math.random() * 0.6 + 0.25) * (1 / z);
        vy = (Math.random() * 0.4 - 0.2) * (1 / z);

        if (Math.random() > 0.5) {
          // Large orbital path across the hero section
          orbitRadiusX = Math.random() * (width * 0.35) + width * 0.15;
          orbitRadiusY = Math.random() * 300 + 150;
          orbitSpeed = (Math.random() * 0.0008 + 0.0004) * (Math.random() > 0.5 ? 1 : -1);
          orbitAngle = Math.random() * Math.PI * 2;
        }
      }

      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        z,
        vx,
        vy,
        radius: (Math.random() * 2.2 + 0.9) * (1.8 / z), // PRESERVED EXACT ORIGINAL SIZE
        baseAlpha: Math.random() * 0.55 + 0.35,
        pulsePhase: Math.random() * Math.PI * 2,
        pulseSpeed: Math.random() * 1.8 + 0.8,
        layer,
        curveAmp: Math.random() * 1.8 + 0.6,
        curveFreq: Math.random() * 0.003 + 0.001,
        orbitRadiusX,
        orbitRadiusY,
        orbitSpeed,
        orbitAngle,
        colorType: colorTypes[Math.floor(Math.random() * colorTypes.length)]
      });
    }

    // Synaptic pulses traversing connected particles
    const synapticPulses: SynapticPulse[] = [];
    for (let p = 0; p < (isVariantB ? 12 : 7); p++) {
      synapticPulses.push({
        p1: Math.floor(Math.random() * particleCount),
        p2: Math.floor(Math.random() * particleCount),
        progress: Math.random(),
        speed: Math.random() * 0.012 + 0.006,
        color: p % 2 === 0 ? variantConfig.lilacAccent : variantConfig.blushPink
      });
    }

    // 2. Spatial 3D Floating Sculptural Forms (Curved disks, organic blobs, translucent glass, ribbons)
    const spatialForms: SpatialForm3D[] = [
      {
        type: 'disk',
        xRel: 0.12,
        yRel: 0.22,
        z: 1.1,
        size: isMobile ? 45 : 78,
        rotX: 0.55,
        rotY: 0.4,
        rotZ: 0.2,
        vRotX: 0.002,
        vRotY: 0.0035,
        vRotZ: 0.001,
        floatSpeed: 0.0018,
        floatAmp: 18,
        floatOffset: 0,
        primaryColor: variantConfig.lilacAccent,
        secondaryColor: variantConfig.blushPink,
        opacity: 0.18
      },
      {
        type: 'organic-blob',
        xRel: 0.07,
        yRel: 0.62,
        z: 1.35,
        size: isMobile ? 50 : 92,
        rotX: -0.3,
        rotY: 0.5,
        rotZ: 0.1,
        vRotX: 0.0018,
        vRotY: -0.0022,
        vRotZ: 0.0012,
        floatSpeed: 0.0014,
        floatAmp: 24,
        floatOffset: 2.1,
        primaryColor: variantConfig.blushPink,
        secondaryColor: variantConfig.periwinkleMuted,
        opacity: 0.15
      },
      {
        type: 'glass-frame',
        xRel: 0.46,
        yRel: 0.14,
        z: 1.7,
        size: isMobile ? 38 : 65,
        rotX: 0.4,
        rotY: 0.35,
        rotZ: 0.3,
        vRotX: -0.0016,
        vRotY: 0.0028,
        vRotZ: -0.001,
        floatSpeed: 0.0016,
        floatAmp: 15,
        floatOffset: 4.2,
        primaryColor: variantConfig.periwinkleMuted,
        secondaryColor: variantConfig.icyBlue,
        opacity: 0.16
      },
      {
        type: 'layered-disks',
        xRel: 0.88,
        yRel: 0.26,
        z: 1.25,
        size: isMobile ? 48 : 85,
        rotX: 0.6,
        rotY: -0.4,
        rotZ: 0.25,
        vRotX: 0.0022,
        vRotY: 0.003,
        vRotZ: 0.0015,
        floatSpeed: 0.002,
        floatAmp: 20,
        floatOffset: 1.4,
        primaryColor: variantConfig.lilacAccent,
        secondaryColor: variantConfig.lavenderPale,
        opacity: 0.18
      },
      {
        type: 'ribbon-arc',
        xRel: 0.76,
        yRel: 0.58,
        z: 1.45,
        size: isMobile ? 65 : 120,
        rotX: 0.35,
        rotY: 0.65,
        rotZ: -0.2,
        vRotX: 0.0015,
        vRotY: 0.002,
        vRotZ: 0.001,
        floatSpeed: 0.0012,
        floatAmp: 22,
        floatOffset: 3.5,
        primaryColor: variantConfig.blushPink,
        secondaryColor: variantConfig.lilacAccent,
        opacity: 0.16
      },
      {
        type: 'octahedron',
        xRel: 0.28,
        yRel: 0.84,
        z: 1.2,
        size: isMobile ? 36 : 64,
        rotX: 0.25,
        rotY: -0.45,
        rotZ: 0.35,
        vRotX: 0.0025,
        vRotY: 0.0035,
        vRotZ: 0.0015,
        floatSpeed: 0.0019,
        floatAmp: 16,
        floatOffset: 5.1,
        primaryColor: variantConfig.icyBlue,
        secondaryColor: variantConfig.lilacAccent,
        opacity: 0.16
      },
      {
        type: 'rounded-slab',
        xRel: 0.86,
        yRel: 0.82,
        z: 1.3,
        size: isMobile ? 42 : 72,
        rotX: -0.4,
        rotY: 0.3,
        rotZ: 0.2,
        vRotX: -0.002,
        vRotY: -0.0025,
        vRotZ: 0.0018,
        floatSpeed: 0.0015,
        floatAmp: 19,
        floatOffset: 2.7,
        primaryColor: variantConfig.periwinkleMuted,
        secondaryColor: variantConfig.blushPink,
        opacity: 0.15
      }
    ];

    if (isVariantB) {
      spatialForms.push(
        {
          type: 'geodesic',
          xRel: 0.35,
          yRel: 0.42,
          z: 1.8,
          size: isMobile ? 35 : 62,
          rotX: 0.3,
          rotY: 0.5,
          rotZ: -0.2,
          vRotX: 0.002,
          vRotY: -0.003,
          vRotZ: 0.001,
          floatSpeed: 0.0017,
          floatAmp: 22,
          floatOffset: 0.8,
          primaryColor: variantConfig.lavenderPale,
          secondaryColor: variantConfig.lilacAccent,
          opacity: 0.38
        },
        {
          type: 'ribbon-arc',
          xRel: 0.2,
          yRel: 0.38,
          z: 1.5,
          size: isMobile ? 55 : 95,
          rotX: -0.45,
          rotY: 0.4,
          rotZ: 0.15,
          vRotX: -0.0018,
          vRotY: 0.0024,
          vRotZ: -0.0012,
          floatSpeed: 0.0013,
          floatAmp: 25,
          floatOffset: 4.8,
          primaryColor: variantConfig.blushPink,
          secondaryColor: variantConfig.icyBlue,
          opacity: 0.48
        }
      );
    }

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current.targetX = (e.clientX - width / 2) * 0.06;
      mouseRef.current.targetY = (e.clientY - height / 2) * 0.06;
      mouseRef.current.active = true;
    };

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('resize', handleResize);

    // 3D Projection Helper
    const project3D = (x: number, y: number, z: number, rx: number, ry: number, rz: number) => {
      let x1 = x * Math.cos(ry) + z * Math.sin(ry);
      let z1 = -x * Math.sin(ry) + z * Math.cos(ry);
      let y2 = y * Math.cos(rx) - z1 * Math.sin(rx);
      let z2 = y * Math.sin(rx) + z1 * Math.cos(rx);
      let x3 = x1 * Math.cos(rz) - y2 * Math.sin(rz);
      let y3 = x1 * Math.sin(rz) + y2 * Math.cos(rz);
      const fov = 450;
      const scale = fov / (fov + z2);
      return { px: x3 * scale, py: y3 * scale, scale, z: z2 };
    };

    let time = 0;

    // RENDER LOOP
    const render = () => {
      time += 0.016;

      // Mouse inertia damping
      mouseRef.current.x += (mouseRef.current.targetX - mouseRef.current.x) * 0.045;
      mouseRef.current.y += (mouseRef.current.targetY - mouseRef.current.y) * 0.045;
      const mx = mouseRef.current.x;
      const my = mouseRef.current.y;

      ctx.clearRect(0, 0, width, height);

      // Deep plum / black-violet luxury background gradient
      const bgGrad = ctx.createRadialGradient(
        width * 0.5 + mx * 0.5,
        height * 0.4 + my * 0.5,
        40,
        width * 0.5,
        height * 0.5,
        Math.max(width, height) * 0.85
      );

      // Responsive ambient glow if active project theme is selected
      const ambientPrimary = activeProjectTheme?.primary || variantConfig.lilacAccent;
      const ambientSecondary = activeProjectTheme?.secondary || variantConfig.blushPink;
      const ambientRgba = activeProjectTheme?.glowRgba || variantConfig.glowRgba;

      bgGrad.addColorStop(0, `rgba(${ambientRgba}, ${activeProjectTheme ? '0.07' : '0.025'})`);
      bgGrad.addColorStop(0.45, variantConfig.bgBase);
      bgGrad.addColorStop(1, '#050608');

      ctx.fillStyle = bgGrad;
      ctx.fillRect(0, 0, width, height);

      // Large ambient radial bloom layers
      const bloomGrad1 = ctx.createRadialGradient(
        width * 0.72 + mx * 0.8,
        height * 0.35 + my * 0.8,
        20,
        width * 0.72,
        height * 0.35,
        isMobile ? 280 : 540
      );
      bloomGrad1.addColorStop(0, `rgba(${ambientRgba}, ${activeProjectTheme ? '0.1' : '0.04'})`);
      bloomGrad1.addColorStop(0.7, 'rgba(255, 255, 255, 0.01)');
      bloomGrad1.addColorStop(1, 'transparent');
      ctx.fillStyle = bloomGrad1;
      ctx.fillRect(0, 0, width, height);

      // 3. EXPANDED ORBIT SYSTEM AROUND HERO & PROJECT PORTAL VAULT
      // Frames the grand center-stage hero narrative and expands toward project portals
      const heroCenterX = width * 0.5 + mx * 0.4;
      const heroCenterY = height * 0.28 + my * 0.4;

      ctx.save();
      // Orbit 1: Massive Vertical Orbit framing the central display typography
      const vOrbitRx = isMobile ? 160 : 360;
      const vOrbitRy = isMobile ? 220 : 420;
      const vOrbitAngle = (time * 0.28) % (Math.PI * 2);

      ctx.beginPath();
      ctx.ellipse(heroCenterX, heroCenterY, vOrbitRx, vOrbitRy, -0.25, 0, Math.PI * 2);
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.05)';
      ctx.lineWidth = 1;
      ctx.setLineDash([6, 14]);
      ctx.stroke();

      // Traveling node along Vertical Orbit
      const nodeX1 = heroCenterX + Math.cos(vOrbitAngle) * vOrbitRx * Math.cos(-0.25) - Math.sin(vOrbitAngle) * vOrbitRy * Math.sin(-0.25);
      const nodeY1 = heroCenterY + Math.cos(vOrbitAngle) * vOrbitRx * Math.sin(-0.25) + Math.sin(vOrbitAngle) * vOrbitRy * Math.cos(-0.25);
      ctx.beginPath();
      ctx.arc(nodeX1, nodeY1, 2.5, 0, Math.PI * 2);
      ctx.fillStyle = ambientPrimary;
      ctx.shadowColor = ambientPrimary;
      ctx.shadowBlur = 8;
      ctx.fill();

      // Orbit 2: Spanning Orbit (stretches down-left across hero toward project cards area)
      const spanRx = isMobile ? 180 : 380;
      const spanRy = isMobile ? 120 : 220;
      const spanTilt = 0.55;
      const spanAngle = (-time * 0.22) % (Math.PI * 2);

      ctx.beginPath();
      ctx.ellipse(heroCenterX - 80, heroCenterY + 60, spanRx, spanRy, spanTilt, 0, Math.PI * 2);
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.04)';
      ctx.lineWidth = 0.8;
      ctx.setLineDash([4, 16]);
      ctx.stroke();

      // Traveling node along Spanning Orbit
      const nodeX2 = (heroCenterX - 80) + Math.cos(spanAngle) * spanRx * Math.cos(spanTilt) - Math.sin(spanAngle) * spanRy * Math.sin(spanTilt);
      const nodeY2 = (heroCenterY + 60) + Math.cos(spanAngle) * spanRx * Math.sin(spanTilt) + Math.sin(spanAngle) * spanRy * Math.cos(spanTilt);
      ctx.beginPath();
      ctx.arc(nodeX2, nodeY2, 2.5, 0, Math.PI * 2);
      ctx.fillStyle = ambientSecondary;
      ctx.shadowColor = ambientSecondary;
      ctx.shadowBlur = 6;
      ctx.fill();

      // Orbit 3: Inclined Medium Ellipse (7-10s accent loop)
      const incRx = isMobile ? 110 : 210;
      const incRy = isMobile ? 80 : 150;
      const incAngle = (time * 0.45) % (Math.PI * 2);

      ctx.beginPath();
      ctx.ellipse(heroCenterX + 20, heroCenterY - 30, incRx, incRy, 0.85, 0, Math.PI * 2);
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.04)';
      ctx.lineWidth = 0.8;
      ctx.setLineDash([3, 10]);
      ctx.stroke();
      ctx.restore();

      // 4. DRAW 3D FLOATING SCULPTURAL FORMS
      spatialForms.forEach((form) => {
        form.rotX += form.vRotX;
        form.rotY += form.vRotY;
        form.rotZ += form.vRotZ;

        const floatY = Math.sin(time * form.floatSpeed * 100 + form.floatOffset) * form.floatAmp;
        const fx = form.xRel * width + (mx / form.z);
        const fy = form.yRel * height + floatY + (my / form.z);

        ctx.save();
        ctx.translate(fx, fy);

        const primaryCol = activeProjectTheme ? activeProjectTheme.primary : form.primaryColor;
        const secondaryCol = activeProjectTheme ? activeProjectTheme.secondary : form.secondaryColor;

        if (form.type === 'disk' || form.type === 'layered-disks') {
          const pCenter = project3D(0, 0, 0, form.rotX, form.rotY, form.rotZ);
          const pEdge1 = project3D(form.size, 0, 0, form.rotX, form.rotY, form.rotZ);
          const pEdge2 = project3D(0, form.size * 0.45, 0, form.rotX, form.rotY, form.rotZ);
          const rx = Math.hypot(pEdge1.px - pCenter.px, pEdge1.py - pCenter.py);
          const ry = Math.hypot(pEdge2.px - pCenter.px, pEdge2.py - pCenter.py);
          const angle = Math.atan2(pEdge1.py - pCenter.py, pEdge1.px - pCenter.px);

          ctx.save();
          ctx.translate(pCenter.px, pCenter.py);
          ctx.rotate(angle);

          const diskGrad = ctx.createLinearGradient(-rx, -ry, rx, ry);
          diskGrad.addColorStop(0, `${primaryCol}33`);
          diskGrad.addColorStop(0.5, `${secondaryCol}18`);
          diskGrad.addColorStop(1, `${primaryCol}44`);

          ctx.beginPath();
          ctx.ellipse(0, 0, Math.max(rx, 4), Math.max(ry, 2), 0, 0, Math.PI * 2);
          ctx.fillStyle = diskGrad;
          ctx.fill();

          ctx.strokeStyle = `${primaryCol}88`;
          ctx.lineWidth = 1.2;
          ctx.stroke();
          ctx.restore();
        } else if (form.type === 'organic-blob') {
          ctx.beginPath();
          const points = 7;
          const rBase = form.size;
          for (let i = 0; i <= points; i++) {
            const th = (i / points) * Math.PI * 2;
            const wave = Math.sin(th * 3 + time * 1.5 + form.floatOffset) * (rBase * 0.22);
            const r = rBase + wave;
            const px = Math.cos(th) * r;
            const py = Math.sin(th) * (r * 0.65);
            if (i === 0) ctx.moveTo(px, py);
            else ctx.lineTo(px, py);
          }
          ctx.closePath();

          const blobGrad = ctx.createRadialGradient(0, 0, 5, 0, 0, form.size);
          blobGrad.addColorStop(0, `${secondaryCol}38`);
          blobGrad.addColorStop(0.7, `${primaryCol}18`);
          blobGrad.addColorStop(1, 'transparent');
          ctx.fillStyle = blobGrad;
          ctx.fill();

          ctx.strokeStyle = `${secondaryCol}66`;
          ctx.lineWidth = 1.2;
          ctx.stroke();
        } else if (form.type === 'glass-frame') {
          const s = form.size;
          const verts = [
            project3D(-s, -s * 0.6, 0, form.rotX, form.rotY, form.rotZ),
            project3D(s, -s * 0.6, 0, form.rotX, form.rotY, form.rotZ),
            project3D(s, s * 0.6, 0, form.rotX, form.rotY, form.rotZ),
            project3D(-s, s * 0.6, 0, form.rotX, form.rotY, form.rotZ)
          ];
          ctx.beginPath();
          ctx.moveTo(verts[0].px, verts[0].py);
          verts.slice(1).forEach((v) => ctx.lineTo(v.px, v.py));
          ctx.closePath();
          ctx.fillStyle = `${primaryCol}12`;
          ctx.fill();
          ctx.strokeStyle = `${primaryCol}77`;
          ctx.lineWidth = 1.4;
          ctx.stroke();
        } else if (form.type === 'ribbon-arc') {
          ctx.beginPath();
          const segments = 16;
          for (let i = 0; i <= segments; i++) {
            const u = (i / segments) * Math.PI - Math.PI / 2;
            const rx = Math.sin(u) * form.size;
            const ry = Math.cos(u) * (form.size * 0.42);
            const rz = Math.sin(u * 2 + time) * 35;
            const p = project3D(rx, ry, rz, form.rotX, form.rotY, form.rotZ);
            if (i === 0) ctx.moveTo(p.px, p.py);
            else ctx.lineTo(p.px, p.py);
          }
          ctx.strokeStyle = `${primaryCol}88`;
          ctx.lineWidth = 1.8;
          ctx.stroke();
        } else if (form.type === 'octahedron') {
          const s = form.size * 0.7;
          const nodes = [
            project3D(0, -s, 0, form.rotX, form.rotY, form.rotZ),
            project3D(s, 0, 0, form.rotX, form.rotY, form.rotZ),
            project3D(0, 0, s, form.rotX, form.rotY, form.rotZ),
            project3D(-s, 0, 0, form.rotX, form.rotY, form.rotZ),
            project3D(0, 0, -s, form.rotX, form.rotY, form.rotZ),
            project3D(0, s, 0, form.rotX, form.rotY, form.rotZ)
          ];
          const edges = [
            [0, 1], [0, 2], [0, 3], [0, 4],
            [5, 1], [5, 2], [5, 3], [5, 4],
            [1, 2], [2, 3], [3, 4], [4, 1]
          ];
          ctx.strokeStyle = `${secondaryCol}77`;
          ctx.lineWidth = 1.2;
          edges.forEach(([a, b]) => {
            ctx.beginPath();
            ctx.moveTo(nodes[a].px, nodes[a].py);
            ctx.lineTo(nodes[b].px, nodes[b].py);
            ctx.stroke();
          });
        }
        ctx.restore();
      });

      // 5. UPDATE AND DRAW PARTICLES ACROSS THE PAGE
      // Particles move across the page in wide trajectories, not just rotating locally!
      particles.forEach((p) => {
        // Curve trajectory
        p.pulsePhase += p.pulseSpeed * 0.02;

        if (p.orbitRadiusX && p.orbitRadiusY && p.orbitSpeed && p.orbitAngle !== undefined) {
          // Layer 3 wide orbital sweep across hero width
          p.orbitAngle += p.orbitSpeed;
          p.x = heroCenterX + Math.cos(p.orbitAngle) * p.orbitRadiusX + Math.sin(time * 0.5) * 30;
          p.y = heroCenterY + Math.sin(p.orbitAngle) * p.orbitRadiusY + Math.cos(time * 0.3) * 20;
        } else {
          // Travel across the page with gentle sinusoidal wave
          p.x += p.vx + Math.sin(time * p.curveFreq * 1000 + p.pulsePhase) * p.curveAmp * 0.15;
          p.y += p.vy + Math.cos(time * p.curveFreq * 800 + p.pulsePhase) * p.curveAmp * 0.1;

          // Seamless screen wrap so particles continuously traverse the page
          if (p.x > width + 40) p.x = -40;
          if (p.x < -40) p.x = width + 40;
          if (p.y > height + 40) p.y = -40;
          if (p.y < -40) p.y = height + 40;
        }

        const parallaxX = p.x + (mx / p.z);
        const parallaxY = p.y + (my / p.z);

        const pulse = Math.sin(p.pulsePhase) * 0.28 + 0.72;
        const alpha = Math.min(1, Math.max(0.12, p.baseAlpha * pulse));

        // Color selection responding to active project theme
        let col = variantConfig.lilacAccent;
        if (activeProjectTheme) {
          col = p.colorType === 'blush' ? activeProjectTheme.highlight : activeProjectTheme.primary;
        } else {
          if (p.colorType === 'blush') col = variantConfig.blushPink;
          else if (p.colorType === 'periwinkle') col = variantConfig.periwinkleMuted;
          else if (p.colorType === 'ice') col = variantConfig.icyBlue;
          else if (p.colorType === 'white') col = '#ffffff';
        }

        ctx.beginPath();
        // EXACT ORIGINAL PARTICLE SIZE PRESERVED
        ctx.arc(parallaxX, parallaxY, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = col;
        ctx.globalAlpha = alpha;
        ctx.shadowColor = col;
        ctx.shadowBlur = p.layer === 3 ? 12 : p.layer === 2 ? 6 : 0;
        ctx.fill();
        ctx.shadowBlur = 0;
      });
      ctx.globalAlpha = 1;

      // 6. SYNAPTIC NEURAL CONNECTIONS BETWEEN NEARBY PARTICLES
      ctx.lineWidth = 0.8;
      const maxDist = isMobile ? 85 : 125;

      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < Math.min(i + 9, particles.length); j++) {
          const p1 = particles[i];
          const p2 = particles[j];
          const dx = (p1.x + mx / p1.z) - (p2.x + mx / p2.z);
          const dy = (p1.y + my / p1.z) - (p2.y + my / p2.z);
          const dist = Math.hypot(dx, dy);

          if (dist < maxDist) {
            const connAlpha = (1 - dist / maxDist) * 0.18;
            ctx.beginPath();
            ctx.moveTo(p1.x + mx / p1.z, p1.y + my / p1.z);
            ctx.lineTo(p2.x + mx / p2.z, p2.y + my / p2.z);
            ctx.strokeStyle = activeProjectTheme
              ? `${activeProjectTheme.primary}${Math.floor(connAlpha * 255).toString(16).padStart(2, '0')}`
              : `rgba(${variantConfig.glowRgba}, ${connAlpha})`;
            ctx.stroke();
          }
        }
      }

      // Draw active synaptic transmission pulses
      synapticPulses.forEach((pulse) => {
        pulse.progress += pulse.speed;
        if (pulse.progress >= 1) {
          pulse.progress = 0;
          pulse.p1 = Math.floor(Math.random() * particles.length);
          pulse.p2 = Math.floor(Math.random() * particles.length);
        }
        const p1 = particles[pulse.p1];
        const p2 = particles[pulse.p2];
        if (!p1 || !p2) return;

        const x1 = p1.x + mx / p1.z;
        const y1 = p1.y + my / p1.z;
        const x2 = p2.x + mx / p2.z;
        const y2 = p2.y + my / p2.z;

        if (Math.hypot(x2 - x1, y2 - y1) < maxDist * 1.5) {
          const px = x1 + (x2 - x1) * pulse.progress;
          const py = y1 + (y2 - y1) * pulse.progress;
          ctx.beginPath();
          ctx.arc(px, py, 2.2, 0, Math.PI * 2);
          ctx.fillStyle = activeProjectTheme ? activeProjectTheme.highlight : pulse.color;
          ctx.shadowColor = ctx.fillStyle;
          ctx.shadowBlur = 8;
          ctx.fill();
          ctx.shadowBlur = 0;
        }
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
    };
  }, [variantConfig, activeMethodStage, isVariantB, activeProjectTheme]);

  return (
    <canvas
      ref={canvasRef}
      id="intelligent-spatial-canvas"
      className="fixed inset-0 pointer-events-none z-0 transition-opacity duration-700"
      style={{
        opacity: currentSection === 'home' ? 1 : 0.85
      }}
    />
  );
};
