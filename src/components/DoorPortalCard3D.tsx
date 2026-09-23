import React, { useState, useRef } from 'react';
import { Project, ProjectTheme } from '../types';
import { playChime, playTick } from '../utils/sound';
import { 
  ArrowUpRight, 
  Lock, 
  ChevronRight,
  ExternalLink,
  Clock
} from 'lucide-react';

interface DoorPortalCard3DProps {
  project: Project;
  onOpenDetail: (project: Project) => void;
  onHoverTheme?: (theme: ProjectTheme) => void;
  index: number;
}

export const DoorPortalCard3D: React.FC<DoorPortalCard3DProps> = ({
  project,
  onOpenDetail,
  onHoverTheme,
  index
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const [mousePos, setMousePos] = useState<{ x: number; y: number }>({ x: 50, y: 50 });
  const [rotateX, setRotateX] = useState<number>(0);
  const [rotateY, setRotateY] = useState<number>(0);

  const theme = project.theme;

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setMousePos({ x, y });

    // Subtle 3D spatial tilt calculation
    const calcRotateX = ((e.clientY - rect.top) / rect.height - 0.5) * -12;
    const calcRotateY = ((e.clientX - rect.left) / rect.width - 0.5) * 12;
    setRotateX(calcRotateX);
    setRotateY(calcRotateY);
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
    playTick(600 + index * 60, 'sine', 0.03, 0.02);
    if (onHoverTheme) {
      onHoverTheme(theme);
    }
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setRotateX(0);
    setRotateY(0);
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      tabIndex={0}
      role="button"
      aria-label={`Inspect ${project.title}, ${project.proofPointType}`}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          playChime(theme.primary);
          onOpenDetail(project);
        }
      }}
      onClick={() => {
        playChime(theme.primary);
        onOpenDetail(project);
      }}
      className="relative group transition-all duration-300 ease-out select-none cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400 rounded-3xl"
      style={{
        perspective: '1600px',
        transform: `rotateX(${rotateX}deg) rotateY(${rotateY}deg) ${isHovered ? 'translateY(-8px)' : 'translateY(0px)'}`,
        transformStyle: 'preserve-3d'
      }}
    >
      {/* =========================================================================
          ARCHITECTURAL 3D PORTAL CASING / CHASSIS
          - Closed: Mostly monochrome dark neutral titanium/carbon frame.
          - Open/Hover: Illuminates into project-specific color theme.
         ========================================================================= */}
      <div 
        className="relative rounded-3xl p-[2px] transition-all duration-500 overflow-hidden"
        style={{
          background: isHovered
            ? `linear-gradient(135deg, ${theme.primary} 0%, rgba(255,255,255,0.25) 40%, ${theme.secondary} 100%)`
            : 'linear-gradient(135deg, rgba(255,255,255,0.08) 0%, #15161d 50%, rgba(255,255,255,0.03) 100%)',
          boxShadow: isHovered
            ? `0 30px 70px -15px rgba(${theme.glowRgba}, 0.5), 0 0 30px rgba(${theme.glowRgba}, 0.25)`
            : '0 16px 40px -15px rgba(0,0,0,0.9), 0 0 1px 1px rgba(255,255,255,0.04)'
        }}
      >
        {/* Dimensional Recessed Doorway Chassis */}
        <div 
          className="relative rounded-[22px] bg-[#08090d] overflow-hidden min-h-[500px] flex flex-col justify-between"
          style={{
            boxShadow: 'inset 0 0 30px rgba(0,0,0,0.95), inset 0 1px 2px rgba(255,255,255,0.05)'
          }}
        >
          {/* Subtle Dynamic Light Sweep following cursor on hover */}
          <div 
            className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-30"
            style={{
              background: `radial-gradient(380px circle at ${mousePos.x}% ${mousePos.y}%, rgba(${theme.glowRgba}, 0.22), transparent 70%)`
            }}
          />

          {/* =========================================================================
              RECESSED INTERIOR ROOM / CHAMBER (INSIDE THE DOORWAY)
              Revealed in full saturation when the blast doors slide open!
             ========================================================================= */}
          <div 
            className="absolute inset-0 z-10 p-6 sm:p-7 flex flex-col justify-between transition-all duration-700 ease-out"
            style={{
              background: `radial-gradient(circle at 50% 20%, ${theme.bgTint} 0%, rgba(8, 9, 13, 0.98) 75%)`,
              transform: isHovered ? 'scale(1) translateZ(0px)' : 'scale(0.93) translateZ(-40px)',
              filter: isHovered ? 'blur(0px) brightness(1)' : 'blur(2px) brightness(0.4)',
              opacity: isHovered ? 1 : 0
            }}
          >
            {/* Top Interior Header */}
            <div>
              <div className="flex items-center justify-between text-[13px] font-['JetBrains_Mono'] mb-3">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-sm" style={{ color: theme.primary }}>
                    0{index + 1}
                  </span>
                  <span className="text-zinc-600">/</span>
                  <span className="text-zinc-300 uppercase tracking-wider font-semibold">
                    {project.proofPointType}
                  </span>
                </div>
                <span className="text-zinc-300 font-medium text-[12px]">{project.client}</span>
              </div>

              {/* High-Impact Project Title */}
              <h3 className="font-['Outfit'] text-2xl sm:text-[26px] font-extrabold text-white tracking-tight leading-snug">
                {project.title}
              </h3>

              {/* Theme Mood Indicator */}
              <div className="flex items-center gap-2 mt-2">
                <span className="w-2 h-2 rounded-full" style={{ backgroundColor: theme.primary }} />
                <span className="text-[12px] font-['JetBrains_Mono'] uppercase tracking-wider text-zinc-300">
                  Theme: {theme.name}
                </span>
              </div>

              {/* Summary Body (Card copy 15-16px, generous line-height) */}
              <p className="mt-4 text-[15px] sm:text-[16px] text-zinc-200 leading-[1.6] font-light line-clamp-3">
                {project.shortDescription}
              </p>
            </div>

            {/* Middle: Key Highlight Bullets */}
            <div className="my-3 py-3 border-y border-white/10 space-y-2">
              <div className="text-[12px] font-['JetBrains_Mono'] text-zinc-300 uppercase tracking-wider font-semibold">
                Core Highlights
              </div>
              <div className="flex flex-wrap gap-2">
                {project.previewContent.features.slice(0, 3).map((feat, fIdx) => (
                  <span 
                    key={fIdx}
                    className="text-[12px] font-['JetBrains_Mono'] px-3 py-1.5 rounded-lg bg-[#101117] text-zinc-200 border border-white/10"
                  >
                    {feat}
                  </span>
                ))}
              </div>
            </div>

            {/* Bottom CTA to Enter Live Project or Case Study */}
            <div className="flex flex-wrap items-center justify-between gap-2.5 pt-2">
              {project.hasLiveDeployment && project.liveUrl ? (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => {
                    e.stopPropagation();
                    playTick(850, 'sine', 0.04, 0.03);
                  }}
                  className="px-4 py-2 rounded-xl text-[13px] font-['Outfit'] font-bold tracking-wide transition-all duration-300 flex items-center gap-1.5 shadow-lg hover:scale-105 cursor-pointer"
                  style={{
                    backgroundColor: theme.primary,
                    color: '#08090d',
                    boxShadow: `0 0 16px rgba(${theme.glowRgba}, 0.45)`
                  }}
                >
                  <span>{project.primaryCtaLabel || 'Open Project'}</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              ) : (
                <div className="px-3 py-1.5 rounded-xl text-[11px] font-['JetBrains_Mono'] text-zinc-400 bg-white/5 border border-white/10 flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-zinc-500 shrink-0" />
                  <span>Prototype Preview Coming Soon</span>
                </div>
              )}

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  playChime(theme.primary);
                  onOpenDetail(project);
                }}
                className="px-3.5 py-2 rounded-xl text-[13px] font-['Outfit'] font-semibold text-zinc-300 hover:text-white border border-white/10 hover:border-white/20 hover:bg-white/5 transition-all flex items-center gap-1.5 cursor-pointer ml-auto"
              >
                <span>Case Study</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* =========================================================================
              SLIDING MECHANICAL BLAST DOORS (LEFT & RIGHT LEAVES)
              - Closed: Deep monochrome titanium/graphite alloy with subtle hairline bevels.
              - Open: Slide open smoothly to reveal the vibrant interior world.
             ========================================================================= */}
          
          {/* Left Mechanical Blast Door Leaf */}
          <div 
            className="absolute inset-y-0 left-0 w-1/2 z-20 pointer-events-none transition-transform duration-600 ease-[cubic-bezier(0.16,1,0.3,1)] bg-gradient-to-r from-[#101116] via-[#14151b] to-[#1a1b23] flex flex-col justify-between p-5"
            style={{
              transform: isHovered ? 'translateX(-100%)' : 'translateX(0%)',
              borderRight: isHovered ? `2px solid ${theme.primary}` : '1px solid rgba(255,255,255,0.08)',
              boxShadow: isHovered 
                ? `inset -6px 0 24px rgba(0,0,0,0.95), 3px 0 18px rgba(${theme.glowRgba}, 0.35)`
                : 'inset -6px 0 20px rgba(0,0,0,0.95)'
            }}
          >
            {/* Architectural door seam notches in neutral metal */}
            <div className="w-5 h-[1.5px] bg-white/10" />
            <div className="flex-1" />
            <div className="w-2.5 h-10 rounded-r-sm bg-white/5" />
          </div>

          {/* Right Mechanical Blast Door Leaf */}
          <div 
            className="absolute inset-y-0 right-0 w-1/2 z-20 pointer-events-none transition-transform duration-600 ease-[cubic-bezier(0.16,1,0.3,1)] bg-gradient-to-l from-[#101116] via-[#14151b] to-[#1a1b23] flex flex-col justify-between p-5 items-end"
            style={{
              transform: isHovered ? 'translateX(100%)' : 'translateX(0%)',
              borderLeft: isHovered ? `2px solid ${theme.primary}` : '1px solid rgba(255,255,255,0.08)',
              boxShadow: isHovered 
                ? `inset 6px 0 24px rgba(0,0,0,0.95), -3px 0 18px rgba(${theme.glowRgba}, 0.35)`
                : 'inset 6px 0 20px rgba(0,0,0,0.95)'
            }}
          >
            {/* Architectural door seam notches in neutral metal */}
            <div className="w-5 h-[1.5px] bg-white/10" />
            <div className="flex-1" />
            <div className="w-2.5 h-10 rounded-l-sm bg-white/5" />
          </div>

          {/* FAINT ACCENT LIGHT LEAKING THROUGH CENTER SEAM (At rest) */}
          <div 
            className="absolute inset-y-0 left-1/2 -translate-x-1/2 w-[1.5px] z-20 pointer-events-none transition-opacity duration-500"
            style={{
              background: `linear-gradient(180deg, transparent 0%, ${theme.primary} 35%, ${theme.highlight} 50%, ${theme.secondary} 65%, transparent 100%)`,
              boxShadow: `0 0 6px rgba(${theme.glowRgba}, 0.28)`,
              opacity: isHovered ? 0 : 0.28
            }}
          />

          {/* =========================================================================
              CLEAN CLOSED DOOR STATE — MINIMAL, RESTRAINED & EDITORIAL
              Show only: Project name, short category, and "Hover to open"
             ========================================================================= */}
          <div 
            className="absolute inset-0 z-20 pointer-events-none flex flex-col items-center justify-center p-6 sm:p-8 text-center transition-all duration-400 ease-out"
            style={{
              opacity: isHovered ? 0 : 1,
              transform: isHovered ? 'scale(0.95)' : 'scale(1)'
            }}
          >
            {/* Center Group: Project Name, Short Category & Hover to open */}
            <div className="flex flex-col items-center">
              <h4 className="font-['Outfit'] font-extrabold text-2xl sm:text-3xl text-white tracking-tight drop-shadow-[0_4px_16px_rgba(0,0,0,0.95)]">
                {project.title}
              </h4>
              <p className="text-[13px] font-['JetBrains_Mono'] text-zinc-400 mt-2.5 tracking-widest uppercase font-medium">
                {project.shortCategory || project.proofPointType}
              </p>
              
              <div className="mt-8 flex items-center gap-1.5 text-[12px] font-['JetBrains_Mono'] text-zinc-400 tracking-wider uppercase">
                <span>Hover to open</span>
                <ChevronRight className="w-3.5 h-3.5 text-zinc-500" />
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};
