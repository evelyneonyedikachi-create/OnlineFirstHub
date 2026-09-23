import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { VisualVariant } from '../types';

interface HolographicCore3DProps {
  primaryAccent?: string;
  limeAccent?: string;
  sageAccent?: string;
  variant?: VisualVariant;
}

export const HolographicCore3D: React.FC<HolographicCore3DProps> = ({
  primaryAccent = '#c084fc',
  limeAccent = '#f472b6',
  sageAccent = '#818cf8',
  variant = 'variant-a'
}) => {
  const mountRef = useRef<HTMLDivElement | null>(null);
  const mouseRef = useRef<{ x: number; y: number; targetX: number; targetY: number }>({
    x: 0,
    y: 0,
    targetX: 0,
    targetY: 0
  });

  const isVariantB = variant === 'variant-b';

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const width = container.clientWidth || 460;
    const height = container.clientHeight || 460;

    // Scene, Camera, WebGL Renderer
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(42, width / height, 0.1, 1000);
    camera.position.z = 7.6;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // Master Group with subtle floating bob
    const masterGroup = new THREE.Group();
    scene.add(masterGroup);

    // Colors
    const colLilac = new THREE.Color(primaryAccent); // Soft lilac
    const colBlush = new THREE.Color(limeAccent); // Blush pink
    const colPeriwinkle = new THREE.Color(sageAccent); // Muted periwinkle
    const colWhite = new THREE.Color('#ffffff');
    const colIce = new THREE.Color('#bae6fd');

    // -------------------------------------------------------------------------
    // 1. Soft Sculptural Organic Centerpiece (Smooth Torus Knot / Organic Pod)
    // -------------------------------------------------------------------------
    const knotGeo = new THREE.TorusKnotGeometry(1.25, 0.38, 128, 32, 2, 3);
    const knotWireMat = new THREE.MeshBasicMaterial({
      color: colLilac,
      wireframe: true,
      transparent: true,
      opacity: 0.65
    });
    const knotWireMesh = new THREE.Mesh(knotGeo, knotWireMat);
    masterGroup.add(knotWireMesh);

    // Inner soft luminous translucent body
    const knotBodyMat = new THREE.MeshBasicMaterial({
      color: colBlush,
      transparent: true,
      opacity: 0.18,
      wireframe: false,
      side: THREE.DoubleSide
    });
    const knotBodyMesh = new THREE.Mesh(knotGeo, knotBodyMat);
    knotBodyMesh.scale.set(0.96, 0.96, 0.96);
    masterGroup.add(knotBodyMesh);

    // -------------------------------------------------------------------------
    // 2. Inner Volumetric Glowing Core
    // -------------------------------------------------------------------------
    const innerCoreGeo = new THREE.IcosahedronGeometry(0.75, 2);
    const innerCoreMat = new THREE.MeshBasicMaterial({
      color: colWhite,
      transparent: true,
      opacity: 0.45,
      wireframe: true
    });
    const innerCoreMesh = new THREE.Mesh(innerCoreGeo, innerCoreMat);
    masterGroup.add(innerCoreMesh);

    // Inner light bloom sphere
    const bloomGeo = new THREE.SphereGeometry(0.55, 32, 32);
    const bloomMat = new THREE.MeshBasicMaterial({
      color: colIce,
      transparent: true,
      opacity: 0.35
    });
    const bloomMesh = new THREE.Mesh(bloomGeo, bloomMat);
    masterGroup.add(bloomMesh);

    // -------------------------------------------------------------------------
    // 3. Floating Sculptural Concentric Lenses / Rings
    // -------------------------------------------------------------------------
    const ring1Geo = new THREE.TorusGeometry(2.35, 0.035, 16, 100);
    const ring1Mat = new THREE.MeshBasicMaterial({
      color: colLilac,
      transparent: true,
      opacity: 0.75
    });
    const ring1 = new THREE.Mesh(ring1Geo, ring1Mat);
    ring1.rotation.x = Math.PI * 0.35;
    ring1.rotation.y = Math.PI * 0.15;
    masterGroup.add(ring1);

    const ring2Geo = new THREE.TorusGeometry(2.7, 0.025, 16, 100);
    const ring2Mat = new THREE.MeshBasicMaterial({
      color: colBlush,
      transparent: true,
      opacity: 0.65
    });
    const ring2 = new THREE.Mesh(ring2Geo, ring2Mat);
    ring2.rotation.x = -Math.PI * 0.4;
    ring2.rotation.z = Math.PI * 0.25;
    masterGroup.add(ring2);

    // Outer faint periwinkle ring for Variant B
    if (isVariantB) {
      const ring3Geo = new THREE.TorusGeometry(3.1, 0.02, 16, 120);
      const ring3Mat = new THREE.MeshBasicMaterial({
        color: colPeriwinkle,
        transparent: true,
        opacity: 0.5
      });
      const ring3 = new THREE.Mesh(ring3Geo, ring3Mat);
      ring3.rotation.y = Math.PI * 0.55;
      masterGroup.add(ring3);
    }

    // -------------------------------------------------------------------------
    // 4. Orbiting Satellite Sculptural Shards & Micro-Orbs
    // -------------------------------------------------------------------------
    const satelliteCount = isVariantB ? 7 : 5;
    const satellites: {
      mesh: THREE.Mesh;
      radius: number;
      speed: number;
      inclination: number;
      phase: number;
      bobAmp: number;
    }[] = [];

    for (let i = 0; i < satelliteCount; i++) {
      // Alternate between miniature diamond crystals and smooth droplets
      let satGeo: THREE.BufferGeometry;
      if (i % 2 === 0) {
        satGeo = new THREE.OctahedronGeometry(0.18, 0);
      } else {
        satGeo = new THREE.IcosahedronGeometry(0.15, 1);
      }

      const satMat = new THREE.MeshBasicMaterial({
        color: i % 3 === 0 ? colIce : i % 2 === 0 ? colLilac : colBlush,
        transparent: true,
        opacity: 0.85,
        wireframe: i % 2 === 0
      });

      const satMesh = new THREE.Mesh(satGeo, satMat);
      masterGroup.add(satMesh);

      satellites.push({
        mesh: satMesh,
        radius: 2.2 + (i * 0.35),
        speed: (0.4 + (i * 0.12)) * (i % 2 === 0 ? 1 : -0.85),
        inclination: (i * Math.PI) / satelliteCount,
        phase: (i * Math.PI * 2) / satelliteCount,
        bobAmp: 0.25 + (i * 0.05)
      });
    }

    // -------------------------------------------------------------------------
    // 5. Cloud of Surrounding Ethereal Dust Particles (Three.js Points)
    // -------------------------------------------------------------------------
    const dustCount = isVariantB ? 220 : 150;
    const dustGeo = new THREE.BufferGeometry();
    const dustPos = new Float32Array(dustCount * 3);
    const dustColors = new Float32Array(dustCount * 3);

    for (let d = 0; d < dustCount; d++) {
      // Distribute particles in a soft halo around the core
      const r = 1.2 + Math.random() * 2.8;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(Math.random() * 2 - 1);

      dustPos[d * 3] = r * Math.sin(phi) * Math.cos(theta);
      dustPos[d * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      dustPos[d * 3 + 2] = r * Math.cos(phi);

      const colChoice = Math.random();
      const c = colChoice < 0.35 ? colLilac : colChoice < 0.65 ? colBlush : colWhite;
      dustColors[d * 3] = c.r;
      dustColors[d * 3 + 1] = c.g;
      dustColors[d * 3 + 2] = c.b;
    }

    dustGeo.setAttribute('position', new THREE.BufferAttribute(dustPos, 3));
    dustGeo.setAttribute('color', new THREE.BufferAttribute(dustColors, 3));

    const dustMat = new THREE.PointsMaterial({
      size: 0.055,
      vertexColors: true,
      transparent: true,
      opacity: 0.75,
      blending: THREE.AdditiveBlending
    });

    const dustPoints = new THREE.Points(dustGeo, dustMat);
    masterGroup.add(dustPoints);

    // Mouse listener
    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const y = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
      mouseRef.current.targetX = x;
      mouseRef.current.targetY = y;
    };

    window.addEventListener('mousemove', handleMouseMove);

    let animationFrameId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      // Smooth mouse interpolation with subtle tilt
      mouseRef.current.x += (mouseRef.current.targetX - mouseRef.current.x) * 0.05;
      mouseRef.current.y += (mouseRef.current.targetY - mouseRef.current.y) * 0.05;

      // Master group weightless levitation
      masterGroup.position.y = Math.sin(elapsedTime * 0.8) * 0.16;
      masterGroup.position.x = Math.cos(elapsedTime * 0.6) * 0.08;

      masterGroup.rotation.y = elapsedTime * 0.22 + mouseRef.current.x * 0.45;
      masterGroup.rotation.x = Math.sin(elapsedTime * 0.3) * 0.15 - mouseRef.current.y * 0.35;

      // Central sculptural knot rotation
      knotWireMesh.rotation.x = elapsedTime * 0.35;
      knotWireMesh.rotation.y = elapsedTime * 0.45;
      knotBodyMesh.rotation.copy(knotWireMesh.rotation);

      // Inner core pulse
      const pulse = 1 + Math.sin(elapsedTime * 2.2) * 0.08;
      innerCoreMesh.scale.set(pulse, pulse, pulse);
      innerCoreMesh.rotation.y = -elapsedTime * 0.6;
      innerCoreMesh.rotation.z = elapsedTime * 0.3;

      bloomMesh.scale.set(1 + Math.sin(elapsedTime * 1.5) * 0.12, 1 + Math.sin(elapsedTime * 1.5) * 0.12, 1 + Math.sin(elapsedTime * 1.5) * 0.12);

      // Rings counter-rotation
      ring1.rotation.z = elapsedTime * 0.3;
      ring2.rotation.z = -elapsedTime * 0.25;

      // Satellites orbiting
      satellites.forEach((sat, i) => {
        const angle = elapsedTime * sat.speed + sat.phase;
        const x = Math.cos(angle) * sat.radius;
        const z = Math.sin(angle) * sat.radius;
        const y = Math.sin(elapsedTime * 1.8 + sat.phase) * sat.bobAmp;

        sat.mesh.position.set(
          x * Math.cos(sat.inclination) - z * Math.sin(sat.inclination) * 0.3,
          y,
          x * Math.sin(sat.inclination) * 0.3 + z * Math.cos(sat.inclination)
        );

        sat.mesh.rotation.x += 0.02;
        sat.mesh.rotation.y += 0.03;
      });

      // Dust points gentle spin
      dustPoints.rotation.y = -elapsedTime * 0.08;
      dustPoints.rotation.x = Math.sin(elapsedTime * 0.1) * 0.1;

      renderer.render(scene, camera);
    };

    animate();

    const handleResize = () => {
      if (!container) return;
      const w = container.clientWidth || 460;
      const h = container.clientHeight || 460;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, [primaryAccent, limeAccent, sageAccent, isVariantB]);

  return (
    <div 
      ref={mountRef} 
      className="w-full h-full flex items-center justify-center relative select-none"
      style={{
        filter: `drop-shadow(0 15px 35px rgba(192, 132, 252, 0.28))`
      }}
    />
  );
};
