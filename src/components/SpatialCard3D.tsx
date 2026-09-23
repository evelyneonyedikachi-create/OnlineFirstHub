import React, { useRef, useState } from 'react';

interface SpatialCard3DProps {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  accentColor?: string;
  onClick?: () => void;
  floatingAnimation?: 'slow' | 'slower' | 'delay' | 'drift' | 'none';
  tiltIntensity?: number; // default 14
  depthZ?: number; // default 22
}

export const SpatialCard3D: React.FC<SpatialCard3DProps> = ({
  children,
  className = '',
  style = {},
  accentColor = '#c084fc',
  onClick,
  floatingAnimation = 'none',
  tiltIntensity = 14,
  depthZ = 22
}) => {
  const cardRef = useRef<HTMLDivElement | null>(null);
  const [transform, setTransform] = useState<string>('');
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const [glarePos, setGlarePos] = useState<{ x: number; y: number; opacity: number }>({
    x: 50,
    y: 50,
    opacity: 0
  });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = cardRef.current;
    if (!card) return;

    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = -((y - centerY) / centerY) * tiltIntensity;
    const rotateY = ((x - centerX) / centerX) * tiltIntensity;

    setTransform(
      `perspective(1200px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) translateZ(${depthZ}px) translateY(-6px)`
    );

    setGlarePos({
      x: (x / rect.width) * 100,
      y: (y / rect.height) * 100,
      opacity: 0.55
    });
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setTransform('perspective(1200px) rotateX(0deg) rotateY(0deg) translateZ(0px) translateY(0px)');
    setGlarePos(prev => ({ ...prev, opacity: 0 }));
  };

  let floatClass = '';
  if (floatingAnimation === 'slow') floatClass = 'animate-float-slow';
  else if (floatingAnimation === 'slower') floatClass = 'animate-float-slower';
  else if (floatingAnimation === 'delay') floatClass = 'animate-float-delay';
  else if (floatingAnimation === 'drift') floatClass = 'animate-float-drift';

  return (
    <div
      ref={cardRef}
      onClick={onClick}
      onMouseEnter={handleMouseEnter}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`relative transform-style-3d transition-all duration-300 ease-out ${floatClass} ${className}`}
      style={{
        transform: transform || undefined,
        filter: isHovered
          ? `drop-shadow(0 22px 35px rgba(192, 132, 252, 0.22)) drop-shadow(0 8px 16px rgba(0, 0, 0, 0.6))`
          : `drop-shadow(0 12px 24px rgba(0, 0, 0, 0.5))`,
        ...style
      }}
    >
      {/* Specular Glare light on glass surface tracking cursor */}
      <div
        className="pointer-events-none absolute inset-0 rounded-2xl transition-opacity duration-300 z-30 overflow-hidden"
        style={{
          opacity: glarePos.opacity,
          background: `radial-gradient(circle at ${glarePos.x}% ${glarePos.y}%, rgba(255, 255, 255, 0.25) 0%, ${accentColor}33 35%, transparent 70%)`
        }}
      />
      {children}
    </div>
  );
};
