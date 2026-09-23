import React, { useState, useEffect } from 'react';
import { SectionView, Project, VisualVariantConfig, ProjectTheme } from '../types';
import { PROJECTS } from '../data/projects';
import { playTick, playChime } from '../utils/sound';
import { DoorPortalCard3D } from './DoorPortalCard3D';
import { 
  ArrowRight, 
  ArrowUpRight, 
  Orbit, 
  Hammer, 
  Rocket, 
  TrendingUp,
  RotateCcw,
  Sparkles
} from 'lucide-react';

interface HeroSectionProps {
  onNavigate: (section: SectionView) => void;
  onSelectProject: (project: Project) => void;
  variantConfig: VisualVariantConfig;
  onToggleVariant: () => void;
  onProjectThemeChange?: (theme: ProjectTheme | null) => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onNavigate,
  onSelectProject,
  variantConfig,
  onToggleVariant,
  onProjectThemeChange
}) => {
  // 4 Curated Showcase Projects for Hero 3D Door Portals demonstrating broad spectrum:
  // Personal Ideas (JD Playground), Search & Discovery (Abeg Find Am), Marketplaces (AfrikaMarketPlace), Advisory (Tax Frontier)
  const portalProjects = [
    PROJECTS.find(p => p.id === 'jd-playground') || PROJECTS[0],
    PROJECTS.find(p => p.id === 'abeg-find-am') || PROJECTS[1],
    PROJECTS.find(p => p.id === 'afrikamarketplace') || PROJECTS[2],
    PROJECTS.find(p => p.id === 'tax-frontier') || PROJECTS[3]
  ];

  const [activeTheme, setActiveTheme] = useState<ProjectTheme | null>(null);

  // Hero Welcome Continuous Loop State:
  // Sequence:
  // 1. "Welcome to OnlineFirst." (held ~4.5s)
  // 2. Smooth fade/scale crossfade (~0.75s)
  // 3. "Turn your idea into something people can actually use." (held ~6.25s)
  // 4. Smooth transition back to Welcome -> Repeat (~11.5s total cycle)
  const [currentPhase, setCurrentPhase] = useState<'welcome' | 'proposition'>('welcome');
  const [isPaused, setIsPaused] = useState<boolean>(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState<boolean>(false);

  // Check prefers-reduced-motion accessibility
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);

    const handleMediaChange = (e: MediaQueryListEvent) => {
      setPrefersReducedMotion(e.matches);
    };

    mediaQuery.addEventListener('change', handleMediaChange);
    return () => mediaQuery.removeEventListener('change', handleMediaChange);
  }, []);

  // Pause loop if user switches browser tab or window loses visibility
  useEffect(() => {
    const handleVisibilityChange = () => {
      setIsPaused(document.hidden);
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => document.removeEventListener('visibilitychange', handleVisibilityChange);
  }, []);

  // Continuous elegant loop: 4.5s Welcome -> 6.25s Proposition -> Loop
  useEffect(() => {
    if (prefersReducedMotion || isPaused) return;

    const delay = currentPhase === 'welcome' ? 4500 : 6250;
    const timer = setTimeout(() => {
      setCurrentPhase((prev) => (prev === 'welcome' ? 'proposition' : 'welcome'));
    }, delay);

    return () => clearTimeout(timer);
  }, [currentPhase, isPaused, prefersReducedMotion]);

  const togglePhaseManual = () => {
    playTick(720, 'sine', 0.03, 0.02);
    setCurrentPhase((prev) => (prev === 'welcome' ? 'proposition' : 'welcome'));
  };

  const handleHoverTheme = (theme: ProjectTheme) => {
    setActiveTheme(theme);
    if (onProjectThemeChange) onProjectThemeChange(theme);
  };

  return (
    <section 
      id="hero-spatial-ecosystem"
      className="relative min-h-[94vh] flex flex-col justify-start items-center px-4 sm:px-8 pt-36 pb-28 overflow-hidden"
    >
      {/* Volumetric Soft Horizon Glow Bloom (Subdued, Dark Neutral Ambiance) */}
      <div 
        className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[950px] h-[600px] rounded-full blur-[190px] pointer-events-none opacity-20 transition-all duration-1000"
        style={{
          background: activeTheme 
            ? `radial-gradient(circle, ${activeTheme.primary}30 0%, ${activeTheme.secondary}15 45%, rgba(${activeTheme.glowRgba}, 0.05) 70%, transparent 90%)`
            : `radial-gradient(circle, ${variantConfig.primaryAccent}25 0%, rgba(255,255,255,0.05) 45%, transparent 80%)`
        }}
      />

      {/* Hero Narrative Hub — Centered Editorial Layout */}
      <div className="relative z-10 max-w-5xl mx-auto w-full flex flex-col items-center text-center">
        
        {/* Studio Status & Interactive Variant Switcher */}
        <div className="inline-flex items-center gap-3 px-4.5 py-2 rounded-full border border-white/10 bg-[#121319]/80 backdrop-blur-xl mb-7 shadow-sm">
          <span 
            className="w-2 h-2 rounded-full animate-pulse" 
            style={{ backgroundColor: activeTheme ? activeTheme.primary : variantConfig.primaryAccent }} 
          />
          <span className="text-[13px] font-['JetBrains_Mono'] tracking-[0.22em] uppercase text-zinc-200 font-medium">
            ONLINEFIRST · IDEA TO DIGITAL PRODUCT
          </span>
          <button
            onClick={onToggleVariant}
            title="Toggle between Variant A and Variant B styling"
            className="ml-1 pl-3 border-l border-white/10 text-[12px] font-['JetBrains_Mono'] text-zinc-400 hover:text-white transition-colors flex items-center gap-1.5 cursor-pointer"
          >
            <Orbit className="w-3.5 h-3.5 text-zinc-400 animate-spin-slow" />
            <span>Switch Theme</span>
          </button>
        </div>

        {/* =========================================================================
            CONTINUOUS HERO WELCOME LOOP CONTAINER
            - "Welcome to OnlineFirst." (held ~4.5s)
            - Smooth crossfade & scale transition (~0.75s)
            - "Turn your idea into something people can actually use." (held ~6.25s)
            - Smoothly transitions back to Welcome and loops indefinitely
            - Accessible: Users with prefers-reduced-motion see a clean static headline
           ========================================================================= */}
        <div 
          className="relative min-h-[150px] sm:min-h-[170px] md:min-h-[190px] lg:min-h-[210px] flex items-center justify-center w-full max-w-3xl mb-5"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          title={isPaused ? "Animation paused while hovering" : undefined}
        >
          
          {/* Phase 1: Sleek, Elegant Welcome Display */}
          <div 
            className={`absolute inset-0 flex flex-col items-center justify-center transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] select-none ${
              !prefersReducedMotion && currentPhase === 'welcome' 
                ? 'opacity-100 scale-100 translate-y-0 blur-0 pointer-events-auto' 
                : prefersReducedMotion
                  ? 'hidden'
                  : 'opacity-0 scale-98 -translate-y-2.5 blur-[2px] pointer-events-none'
            }`}
          >
            <h1 className="font-['Outfit'] text-3xl sm:text-5xl md:text-6xl lg:text-7xl tracking-tight text-white font-light text-balance drop-shadow-[0_12px_45px_rgba(0,0,0,0.95)]">
              Welcome to <span className="font-semibold text-transparent bg-clip-text bg-gradient-to-r from-white via-indigo-100 to-indigo-200">OnlineFirst</span>
              <span style={{ color: activeTheme ? activeTheme.highlight : variantConfig.primaryAccent }}>.</span>
            </h1>
            <p className="mt-3.5 text-[15px] sm:text-[17px] text-zinc-400 font-light italic font-['Outfit'] tracking-wide">
              Turning ideas into working digital experiences.
            </p>
          </div>

          {/* Phase 2: Main Proposition Display */}
          <div 
            className={`transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${
              prefersReducedMotion || currentPhase === 'proposition' 
                ? 'opacity-100 scale-100 translate-y-0 blur-0 pointer-events-auto' 
                : 'opacity-0 scale-98 translate-y-2.5 blur-[2px] pointer-events-none'
            }`}
          >
            <h1 
              id="hero-main-statement"
              className="font-['Outfit'] font-extrabold text-3xl sm:text-5xl md:text-5xl lg:text-6xl text-white tracking-[-0.03em] leading-[1.12] drop-shadow-[0_12px_45px_rgba(0,0,0,0.95)] max-w-3xl mx-auto text-balance"
            >
              {variantConfig.headline.replace('.', '')}
              <span 
                className="transition-colors duration-500" 
                style={{ color: activeTheme ? activeTheme.highlight : variantConfig.primaryAccent }}
              >
                .
              </span>
            </h1>
          </div>

        </div>

        {/* Supporting Copy: Built lean so you can test the idea before scaling it */}
        <p 
          id="hero-supporting-message"
          className="text-[17px] sm:text-[19px] text-zinc-200 font-light leading-[1.6] max-w-2xl mb-6 text-balance font-['Outfit']"
        >
          {variantConfig.subheadline}
        </p>

        {/* Supporting Proposition: "Start small. Test early. Scale what works." */}
        <div className="inline-flex items-center gap-3 px-5 py-2 rounded-full border border-white/10 bg-[#121319]/70 mb-9 backdrop-blur-md shadow-sm">
          <span className="text-[13px] sm:text-[14px] font-['JetBrains_Mono'] text-zinc-200 tracking-wider font-medium">
            Start small · Test early · Scale what works
          </span>
          {!prefersReducedMotion && (
            <button
              onClick={togglePhaseManual}
              title={currentPhase === 'welcome' ? "View core proposition" : "Replay welcome phrase"}
              aria-label="Toggle hero headline sequence"
              className="pl-2.5 border-l border-white/10 text-zinc-500 hover:text-zinc-300 transition-colors opacity-70 hover:opacity-100 cursor-pointer flex items-center gap-1"
            >
              <RotateCcw className="w-3 h-3" />
            </button>
          )}
        </div>

        {/* Direct Action Calls-To-Action (Comfortable 15px font, generous padding) */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12 w-full sm:w-auto">
          <button
            id="hero-explore-work-button"
            onClick={() => {
              playTick(750, 'sine', 0.05, 0.04);
              onNavigate('work');
            }}
            className="w-full sm:w-auto px-8 py-4 rounded-full font-['Outfit'] font-bold text-[15px] tracking-wider text-slate-950 transition-all duration-300 hover:scale-[1.02] flex items-center justify-center gap-2.5 shadow-xl group cursor-pointer"
            style={{
              backgroundColor: activeTheme ? activeTheme.primary : variantConfig.primaryAccent,
              boxShadow: `0 0 30px ${activeTheme ? `rgba(${activeTheme.glowRgba}, 0.4)` : variantConfig.glowGlow}`
            }}
          >
            <span>See What an Idea Can Become</span>
            <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
          </button>

          <button
            id="hero-start-project-button"
            onClick={() => {
              playTick(820, 'sine', 0.05, 0.04);
              onNavigate('start');
            }}
            className="w-full sm:w-auto px-8 py-4 rounded-full font-['Outfit'] font-semibold text-[15px] tracking-wider text-white border border-white/15 bg-white/5 hover:bg-white/10 hover:border-white/25 transition-all duration-300 backdrop-blur-md flex items-center justify-center gap-2 cursor-pointer shadow-lg"
          >
            <span>Test Your Idea</span>
            <ArrowUpRight className="w-4 h-4 text-zinc-300" />
          </button>
        </div>

        {/* Spectrum of Audiences: inclusive, readable & uncompressed */}
        <div className="text-[13px] sm:text-[14px] font-['JetBrains_Mono'] text-zinc-300 tracking-widest uppercase flex flex-wrap items-center justify-center gap-3 sm:gap-4">
          <span>Founders</span>
          <span className="text-zinc-600">·</span>
          <span>Families & Parents</span>
          <span className="text-zinc-600">·</span>
          <span>Educators</span>
          <span className="text-zinc-600">·</span>
          <span>Creators</span>
          <span className="text-zinc-600">·</span>
          <span>Researchers</span>
          <span className="text-zinc-600">·</span>
          <span>Businesses</span>
        </div>

      </div>

      {/* =========================================================================
          THE THREE REPOSITIONING PILLARS:
          1. Build the idea
          2. Launch lean
          3. Learn before scaling
          Generous typography: 15–16px body, 1.6 line-height
         ========================================================================= */}
      <div className="relative z-10 max-w-5xl mx-auto w-full mt-16 grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
        
        {/* Pillar 1: Build the Idea */}
        <div className="p-7 rounded-2xl bg-[#111218]/80 border border-white/10 backdrop-blur-md hover:border-white/20 transition-all">
          <div className="w-11 h-11 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-indigo-400 mb-4">
            <Hammer className="w-5 h-5" />
          </div>
          <div className="text-[12px] font-['JetBrains_Mono'] text-zinc-400 tracking-widest uppercase font-semibold">
            Pillar 01
          </div>
          <h3 className="font-['Outfit'] text-2xl font-bold text-white mt-1.5">
            Build the Idea
          </h3>
          <p className="text-[15px] sm:text-[16px] text-zinc-300 mt-2.5 font-light leading-[1.6]">
            Turn any concept into a working app, interactive tool, prototype, platform, or digital experience. From business tools to personal learning apps like JD Playground, no idea is too small or too unconventional.
          </p>
        </div>

        {/* Pillar 2: Launch Lean */}
        <div className="p-7 rounded-2xl bg-[#111218]/80 border border-white/10 backdrop-blur-md hover:border-white/20 transition-all">
          <div className="w-11 h-11 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-indigo-400 mb-4">
            <Rocket className="w-5 h-5" />
          </div>
          <div className="text-[12px] font-['JetBrains_Mono'] text-zinc-400 tracking-widest uppercase font-semibold">
            Pillar 02
          </div>
          <h3 className="font-['Outfit'] text-2xl font-bold text-white mt-1.5">
            Launch Lean
          </h3>
          <p className="text-[15px] sm:text-[16px] text-zinc-300 mt-2.5 font-light leading-[1.6]">
            Deploy a working first version using a custom domain and modern cloud infrastructure. Avoid unnecessary recurring platform overhead so you can run the solution cost-efficiently from day one.
          </p>
        </div>

        {/* Pillar 3: Learn Before Scaling */}
        <div className="p-7 rounded-2xl bg-[#111218]/80 border border-white/10 backdrop-blur-md hover:border-white/20 transition-all">
          <div className="w-11 h-11 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-indigo-400 mb-4">
            <TrendingUp className="w-5 h-5" />
          </div>
          <div className="text-[12px] font-['JetBrains_Mono'] text-zinc-400 tracking-widest uppercase font-semibold">
            Pillar 03
          </div>
          <h3 className="font-['Outfit'] text-2xl font-bold text-white mt-1.5">
            Learn Before Scaling
          </h3>
          <p className="text-[15px] sm:text-[16px] text-zinc-300 mt-2.5 font-light leading-[1.6]">
            Validate whether your concept works before committing to tens of thousands in full-scale development. Put a real, usable version in people's hands to test feedback, usability, and genuine demand.
          </p>
        </div>

      </div>

      {/* Lean Launch Commercial Philosophy Note */}
      <div className="relative z-10 max-w-5xl mx-auto w-full mt-7 p-6 sm:p-7 rounded-2xl border border-white/10 bg-[#111218]/85 backdrop-blur-md flex flex-col sm:flex-row items-center justify-between gap-6 text-left">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-[12px] sm:text-[13px] font-['JetBrains_Mono'] text-zinc-300 uppercase tracking-widest font-semibold">
              The Commercial Advantage · Launch Without The Overhead
            </span>
          </div>
          <p className="text-[15px] sm:text-[16px] text-zinc-200 font-light leading-[1.65]">
            We build lean first versions using modern web infrastructure, so you can test an idea without committing to a large development programme or unnecessary recurring software costs. In many cases, your first-stage running cost can be limited largely to your domain and any external services your specific idea requires.
          </p>
        </div>
        <button
          onClick={() => onNavigate('method')}
          className="shrink-0 px-5 py-2.5 rounded-full border border-white/15 bg-white/5 hover:bg-white/10 text-[13px] sm:text-[14px] font-['JetBrains_Mono'] text-zinc-200 hover:text-white transition-all cursor-pointer flex items-center gap-2"
        >
          <span>How It Works</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

      {/* =========================================================================
          3D ARCHITECTURAL DOOR PORTALS SHOWCASE
          Closed portals: mostly monochrome titanium blast gates with a faint color whisper.
          Open/hover: reveal the full, vibrant project color palette and chamber!
         ========================================================================= */}
      <div 
        id="hero-doors-portal-container"
        className="w-full max-w-7xl mx-auto mt-24 sm:mt-28 z-20"
      >
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-5 mb-9 px-1">
          <div>
            <div className="text-[13px] font-['JetBrains_Mono'] tracking-[0.25em] text-zinc-400 uppercase flex items-center gap-2 mb-2">
              <span 
                className="w-2 h-2 rounded-full" 
                style={{ backgroundColor: activeTheme?.primary || variantConfig.primaryAccent }} 
              />
              <span>Ideas We Brought to Life · {PROJECTS.length} Concepts & Experiences</span>
            </div>
            <h2 className="font-['Outfit'] font-bold text-2xl sm:text-3xl lg:text-4xl text-white tracking-tight">
              See What an Idea Can Become
            </h2>
            <p className="text-[16px] sm:text-[17px] text-zinc-300 mt-2 font-light leading-relaxed max-w-2xl font-['Outfit']">
              Any useful idea can become a working digital experience. Build it lean, test it early, then scale what works. Hover over any doorway to reveal the working digital experience.
            </p>
          </div>

          {/* Quick Jump to Full Explorer */}
          <button
            onClick={() => onNavigate('work')}
            className="text-[13px] sm:text-[14px] font-['JetBrains_Mono'] flex items-center gap-2 transition-colors text-zinc-200 hover:text-white cursor-pointer px-5 py-2.5 rounded-full border border-white/15 bg-white/5 hover:bg-white/10 shrink-0 shadow-sm"
          >
            <span>View All {PROJECTS.length} Projects</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* 4 Architectural Sci-Fi Door Portal Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {portalProjects.map((project, idx) => (
            <DoorPortalCard3D
              key={project.id}
              project={project}
              onOpenDetail={(proj) => {
                playChime(proj.theme.primary);
                onSelectProject(proj);
              }}
              onHoverTheme={handleHoverTheme}
              index={idx}
            />
          ))}
        </div>
      </div>

    </section>
  );
};
