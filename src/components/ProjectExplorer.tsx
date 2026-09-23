import React, { useState } from 'react';
import { Project, VisualVariantConfig, IdeaCategory } from '../types';
import { PROJECTS } from '../data/projects';
import { playTick, playChime } from '../utils/sound';
import { SpatialCard3D } from './SpatialCard3D';
import { 
  ArrowRight, 
  ChevronLeft, 
  ChevronRight, 
  ExternalLink, 
  Lock, 
  Maximize2,
  Sparkles,
  Lightbulb,
  FlaskConical,
  FolderOpen,
  Clock
} from 'lucide-react';

interface ProjectExplorerProps {
  onSelectProject: (project: Project) => void;
  variantConfig: VisualVariantConfig;
}

export const ProjectExplorer: React.FC<ProjectExplorerProps> = ({
  onSelectProject,
  variantConfig
}) => {
  const [selectedCategoryFilter, setSelectedCategoryFilter] = useState<string>('ALL');
  const [activeDeckIndex, setActiveDeckIndex] = useState<number>(0);
  const [viewMode, setViewMode] = useState<'deck' | 'matrix'>('deck');

  // Grouped by broad idea type requested:
  // Learning & Education, Community, Publishing, Marketplaces, Search & Discovery, SaaS & Platforms, Professional / Advisory, Personal Ideas
  const categoryFilterOptions: { label: string; value: string; count?: number }[] = [
    { label: `All Ideas (${PROJECTS.length})`, value: 'ALL' },
    { label: 'Learning & Education', value: 'Learning & Education', count: PROJECTS.filter(p => p.ideaCategory === 'Learning & Education').length },
    { label: 'Community', value: 'Community', count: PROJECTS.filter(p => p.ideaCategory === 'Community').length },
    { label: 'Publishing', value: 'Publishing', count: PROJECTS.filter(p => p.ideaCategory === 'Publishing').length },
    { label: 'Marketplaces', value: 'Marketplaces', count: PROJECTS.filter(p => p.ideaCategory === 'Marketplaces').length },
    { label: 'Search & Discovery', value: 'Search & Discovery', count: PROJECTS.filter(p => p.ideaCategory === 'Search & Discovery').length },
    { label: 'SaaS & Platforms', value: 'SaaS & Platforms', count: PROJECTS.filter(p => p.ideaCategory === 'SaaS & Platforms').length },
    { label: 'Professional / Advisory', value: 'Professional / Advisory', count: PROJECTS.filter(p => p.ideaCategory === 'Professional / Advisory').length },
    { label: 'Personal Ideas', value: 'Personal Ideas', count: PROJECTS.filter(p => p.ideaCategory === 'Personal Ideas').length }
  ];

  const filteredProjects = selectedCategoryFilter === 'ALL'
    ? PROJECTS
    : PROJECTS.filter(p => p.ideaCategory === selectedCategoryFilter);

  const safeDeckIndex = activeDeckIndex >= filteredProjects.length ? 0 : activeDeckIndex;
  const currentProject = filteredProjects[safeDeckIndex] || filteredProjects[0] || PROJECTS[0];
  const theme = currentProject.theme;

  const handleNext = () => {
    playTick(700, 'sine', 0.03, 0.02);
    setActiveDeckIndex((prev) => (prev + 1) % filteredProjects.length);
  };

  const handlePrev = () => {
    playTick(600, 'sine', 0.03, 0.02);
    setActiveDeckIndex((prev) => (prev - 1 + filteredProjects.length) % filteredProjects.length);
  };

  const handleCardClick = (project: Project) => {
    playChime(project.theme.primary);
    onSelectProject(project);
  };

  return (
    <section 
      id="project-explorer-command-centre"
      className="relative min-h-[94vh] px-4 sm:px-8 py-32 max-w-7xl mx-auto flex flex-col justify-center"
    >
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14">
        <div>
          <div className="text-[13px] font-['JetBrains_Mono'] tracking-[0.25em] text-zinc-400 uppercase mb-3 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full" style={{ backgroundColor: theme.primary }} />
            <span>IDEAS WE BROUGHT TO LIFE · {PROJECTS.length} PROOF POINTS</span>
          </div>
          <h2 className="font-['Outfit'] font-extrabold text-3xl sm:text-5xl lg:text-6xl text-white tracking-[-0.03em]">
            See What an Idea Can Become<span style={{ color: theme.highlight }}>.</span>
          </h2>
          <p className="text-[17px] sm:text-[19px] text-zinc-200 mt-3 max-w-2xl font-light leading-[1.65]">
            Any useful idea can become a working digital experience. Build it lean, test it early, then scale what works.
          </p>
        </div>

        {/* View Mode Toggle */}
        <div className="flex items-center rounded-full border border-white/10 bg-[#121319]/80 p-1.5 text-[13px] font-['JetBrains_Mono'] backdrop-blur-md shrink-0">
          <button
            onClick={() => {
              playTick(650, 'sine', 0.02, 0.02);
              setViewMode('deck');
            }}
            className={`px-4.5 py-2 rounded-full transition-all cursor-pointer ${
              viewMode === 'deck' 
                ? 'bg-white/10 text-white font-medium shadow-sm border border-white/15' 
                : 'text-zinc-400 hover:text-white'
            }`}
          >
            Showcase Deck
          </button>
          <button
            onClick={() => {
              playTick(650, 'sine', 0.02, 0.02);
              setViewMode('matrix');
            }}
            className={`px-4.5 py-2 rounded-full transition-all cursor-pointer ${
              viewMode === 'matrix' 
                ? 'bg-white/10 text-white font-medium shadow-sm border border-white/15' 
                : 'text-zinc-400 hover:text-white'
            }`}
          >
            All Ideas ({PROJECTS.length})
          </button>
        </div>
      </div>

      {/* Broad Idea Type Category Tabs (min 13px font) */}
      <div 
        id="project-idea-type-filters"
        className="flex items-center gap-2.5 overflow-x-auto pb-5 mb-12 scrollbar-none"
      >
        {categoryFilterOptions.map((opt) => {
          const isActive = selectedCategoryFilter === opt.value;
          return (
            <button
              key={opt.value}
              onClick={() => {
                playTick(720, 'sine', 0.02, 0.02);
                setSelectedCategoryFilter(opt.value);
                setActiveDeckIndex(0);
              }}
              className={`px-4.5 py-2.5 rounded-full text-[13px] font-['JetBrains_Mono'] tracking-wide whitespace-nowrap transition-all duration-200 border cursor-pointer flex items-center gap-2 ${
                isActive
                  ? 'border-indigo-400/50 bg-white/15 text-white font-semibold shadow-md'
                  : 'bg-transparent text-zinc-400 border-white/10 hover:border-white/25 hover:text-white'
              }`}
            >
              <span>{opt.label}</span>
            </button>
          );
        })}
      </div>

      {/* Showcase Deck Mode: Clean, Premium, Spatial */}
      {viewMode === 'deck' && currentProject && (
        <SpatialCard3D
          tiltIntensity={6}
          depthZ={14}
          accentColor={theme.primary}
          className="w-full"
        >
          <div 
            id="project-command-deck"
            className="relative rounded-3xl p-8 sm:p-12 lg:p-14 shadow-2xl overflow-hidden transition-all duration-500 border border-white/10"
            style={{
              backgroundColor: '#0c0d12',
              boxShadow: `0 30px 80px -25px rgba(0,0,0,0.9), 0 0 25px rgba(${theme.glowRgba}, 0.12)`
            }}
          >
            {/* Ambient Radial Accent */}
            <div 
              className="absolute top-0 right-0 w-[550px] h-[550px] rounded-full blur-[170px] pointer-events-none opacity-15 transition-all duration-700"
              style={{ 
                background: `radial-gradient(circle, ${theme.primary} 0%, ${theme.secondary}40 50%, transparent 80%)` 
              }}
            />

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
              
              {/* Left Column: Project Narrative & Specs (7 Cols) */}
              <div className="lg:col-span-7 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2 text-[13px] sm:text-[14px] font-['JetBrains_Mono'] tracking-wider text-zinc-400 uppercase mb-3 flex-wrap">
                    <span className="font-semibold text-zinc-200">{currentProject.client}</span>
                    <span className="text-zinc-600">/</span>
                    <span style={{ color: theme.highlight }}>{currentProject.ideaCategory}</span>
                    <span className="text-zinc-600">·</span>
                    <span className="text-zinc-400">{currentProject.shortCategory || currentProject.proofPointType}</span>
                  </div>

                  <h3 className="font-['Outfit'] font-extrabold text-3xl sm:text-4xl lg:text-5xl text-white tracking-[-0.03em] mb-5">
                    {currentProject.title}
                  </h3>

                  {/* The Origin Spark Callout (15–16px copy) */}
                  {currentProject.ideaSpark && (
                    <div className="p-5 rounded-2xl border border-white/10 bg-[#12131b] mb-6 flex items-start gap-3.5">
                      <Lightbulb className="w-5 h-5 mt-0.5 shrink-0 text-amber-400" />
                      <div>
                        <div className="text-[12px] font-['JetBrains_Mono'] tracking-widest text-zinc-400 uppercase mb-1.5 font-semibold">
                          The Initial Idea & Need
                        </div>
                        <p className="text-[15px] sm:text-[16px] text-zinc-100 font-light leading-[1.6]">
                          {currentProject.ideaSpark}
                        </p>
                      </div>
                    </div>
                  )}

                  {/* Body copy: Generous 16–18px typography */}
                  <p className="text-zinc-200 text-[16px] sm:text-[18px] leading-[1.65] mb-6 font-light max-w-xl">
                    {currentProject.shortDescription}
                  </p>

                  {/* What Was Tested & Learned (14–15px) */}
                  {currentProject.testedAndLearned && (
                    <div className="flex items-start gap-3 text-[14px] sm:text-[15px] text-zinc-200 mb-7 font-light leading-[1.6] p-4 rounded-xl bg-indigo-950/20 border border-indigo-500/20">
                      <FlaskConical className="w-5 h-5 mt-0.5 shrink-0 text-indigo-400" />
                      <span>
                        <strong className="text-white font-medium">Tested & Validated: </strong>
                        {currentProject.testedAndLearned}
                      </span>
                    </div>
                  )}

                  {/* Clean Metrics Grid */}
                  {currentProject.metrics && (
                    <div className="grid grid-cols-3 gap-6 py-6 border-y border-white/10 mb-9">
                      {currentProject.metrics.map((m, i) => (
                        <div key={i} className="text-left">
                          <div 
                            className="font-['Outfit'] font-bold text-2xl sm:text-3xl lg:text-4xl"
                            style={{ color: theme.highlight }}
                          >
                            {m.value}
                          </div>
                          <div className="text-[13px] font-['JetBrains_Mono'] text-zinc-400 mt-1.5">
                            {m.label}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Action Row: Comfortable 15px buttons with tailored live CTAs */}
                <div className="flex flex-wrap items-center gap-3.5">
                  {currentProject.hasLiveDeployment && currentProject.liveUrl ? (
                    <a
                      href={currentProject.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => playTick(850, 'sine', 0.04, 0.03)}
                      className="px-8 py-4 rounded-full font-['Outfit'] font-bold text-[15px] tracking-wider text-slate-950 transition-all hover:scale-[1.02] flex items-center gap-2.5 shadow-xl cursor-pointer"
                      style={{ 
                        backgroundColor: theme.primary,
                        boxShadow: `0 0 25px rgba(${theme.glowRgba}, 0.35)`
                      }}
                    >
                      <span>{currentProject.primaryCtaLabel || 'Open Project'}</span>
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  ) : (
                    <div className="flex items-center gap-2 text-[13px] font-['JetBrains_Mono'] text-zinc-400 px-5 py-3.5 rounded-full border border-white/10 bg-white/5">
                      <Clock className="w-4 h-4 text-zinc-500" />
                      <span>Prototype Preview Coming Soon</span>
                    </div>
                  )}

                  {currentProject.secondaryUrl && (
                    <a
                      href={currentProject.secondaryUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => playTick(800, 'sine', 0.03, 0.02)}
                      className="px-6 py-4 rounded-full font-['Outfit'] font-semibold text-[14px] sm:text-[15px] tracking-wider text-zinc-100 border border-white/15 hover:border-white/30 hover:bg-white/5 transition-all flex items-center gap-2 cursor-pointer shadow-md"
                    >
                      <span>{currentProject.secondaryCtaLabel || 'View Proposal Hub'}</span>
                      <ExternalLink className="w-4 h-4 text-zinc-400" />
                    </a>
                  )}

                  <button
                    id={`open-detail-btn-${currentProject.id}`}
                    onClick={() => handleCardClick(currentProject)}
                    className="px-6 py-4 rounded-full font-['Outfit'] font-semibold text-[14px] sm:text-[15px] tracking-wider text-zinc-300 border border-white/15 hover:border-white/25 hover:text-white hover:bg-white/5 transition-all flex items-center gap-2 cursor-pointer"
                  >
                    <span>Inspect Case Study</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>

                  {currentProject.accessControl.isProtected && (
                    <div className="flex items-center gap-2 text-[12px] font-['JetBrains_Mono'] text-zinc-400 px-3.5 py-2 rounded-full border border-white/10 bg-white/5">
                      <Lock className="w-3 h-3 text-zinc-300" />
                      <span>{currentProject.accessControl.level}</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Right Column: Architectural UI Preview Window (5 Cols) */}
              <div className="lg:col-span-5 flex flex-col items-center">
                <div 
                  id="project-interactive-preview-window"
                  onClick={() => handleCardClick(currentProject)}
                  className="w-full rounded-2xl p-6 sm:p-8 border border-white/10 shadow-2xl relative overflow-hidden group cursor-pointer transition-all duration-300 hover:border-white/20"
                  style={{
                    backgroundColor: '#11131a',
                    boxShadow: `inset 0 1px 0 rgba(255,255,255,0.06), 0 20px 50px -10px rgba(0,0,0,0.8)`
                  }}
                >
                  {/* Decorative Terminal Header */}
                  <div className="flex items-center justify-between pb-4 mb-5 border-b border-white/10 text-[12px] font-['JetBrains_Mono'] text-zinc-300">
                    <div className="flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-full bg-rose-500/80" />
                      <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
                      <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
                      <span className="ml-2 text-zinc-400">proof-env://{currentProject.slug}</span>
                    </div>
                    <span 
                      className="px-2.5 py-0.5 rounded text-[11px] font-semibold uppercase tracking-wider"
                      style={{ 
                        backgroundColor: `${theme.primary}20`, 
                        color: theme.highlight,
                        border: `1px solid ${theme.primary}40`
                      }}
                    >
                      {currentProject.previewContent.tag}
                    </span>
                  </div>

                  {/* Mock Interface Surface */}
                  <div className="space-y-4">
                    <div className="p-4 rounded-xl border border-white/10 bg-[#161722]">
                      <div className="text-[12px] font-['JetBrains_Mono'] text-zinc-400 uppercase tracking-widest mb-1 font-medium">
                        Proof Point Focus
                      </div>
                      <div className="font-['Outfit'] font-bold text-lg text-white">
                        {currentProject.previewContent.heroTitle}
                      </div>
                    </div>

                    <div className="p-4 rounded-xl border border-white/10 bg-[#161722]/80 space-y-2.5">
                      <div className="text-[12px] font-['JetBrains_Mono'] text-zinc-400 uppercase tracking-widest font-medium">
                        What We Created
                      </div>
                      <div className="space-y-2">
                        {currentProject.previewContent.features.map((feat, fIdx) => (
                          <div 
                            key={fIdx} 
                            className="flex items-center gap-2.5 text-[14px] text-zinc-200 font-['Outfit']"
                          >
                            <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: theme.primary }} />
                            <span>{feat}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="p-4 rounded-xl border border-white/10 bg-[#161722]/50 text-left">
                      <div className="text-[12px] font-['JetBrains_Mono'] text-zinc-400 uppercase tracking-widest mb-1 font-medium">
                        Operational Hypothesis
                      </div>
                      <p className="text-[14px] text-zinc-300 font-light leading-relaxed">
                        {currentProject.previewContent.heroSubtitle}
                      </p>
                    </div>

                    <div className="text-[13px] font-['JetBrains_Mono'] text-zinc-300 pt-3.5 border-t border-white/10 flex items-center justify-between">
                      <span className="flex items-center gap-1.5">
                        <Sparkles className="w-4 h-4" style={{ color: theme.highlight }} />
                        <span>Theme: {theme.name}</span>
                      </span>
                      <Maximize2 className="w-4 h-4 text-white group-hover:scale-110 transition-transform" />
                    </div>
                  </div>
                </div>

                {/* Deck Navigation Controls */}
                <div className="flex items-center justify-between w-full mt-7 text-[14px] font-['JetBrains_Mono'] text-zinc-300 px-2">
                  <div className="flex items-center gap-2">
                    <span className="text-white font-bold">{activeDeckIndex + 1}</span>
                    <span className="text-zinc-600">/</span>
                    <span>{filteredProjects.length}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={handlePrev}
                      aria-label="Previous Idea"
                      className="p-3 rounded-full border border-white/10 bg-[#121319] hover:bg-white/10 text-zinc-200 hover:text-white transition-colors cursor-pointer shadow-sm"
                    >
                      <ChevronLeft className="w-4 h-4" />
                    </button>
                    <button
                      onClick={handleNext}
                      aria-label="Next Idea"
                      className="p-3 rounded-full border border-white/10 bg-[#121319] hover:bg-white/10 text-zinc-200 hover:text-white transition-colors cursor-pointer shadow-sm"
                    >
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </SpatialCard3D>
      )}

      {/* Matrix Mode: Browse All Ideas by Broad Category */}
      {viewMode === 'matrix' && (
        <div 
          id="project-matrix-grid"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7"
        >
          {filteredProjects.map((project) => {
            const pTheme = project.theme;
            return (
              <SpatialCard3D
                key={project.id}
                tiltIntensity={10}
                depthZ={14}
                accentColor={pTheme.primary}
                onClick={() => handleCardClick(project)}
                className="cursor-pointer"
              >
                <div
                  id={`matrix-card-${project.id}`}
                  className="group rounded-2xl p-8 transition-all duration-300 flex flex-col justify-between h-full border border-white/10 hover:border-white/25 bg-[#0e1017] shadow-xl"
                >
                  <div>
                    <div className="flex items-center justify-between text-[12px] sm:text-[13px] font-['JetBrains_Mono'] tracking-widest uppercase mb-3">
                      <span 
                        className="px-2.5 py-0.5 rounded text-[11px] font-semibold"
                        style={{
                          backgroundColor: `${pTheme.primary}18`,
                          color: pTheme.highlight,
                          border: `1px solid ${pTheme.primary}30`
                        }}
                      >
                        {project.ideaCategory}
                      </span>
                      <span className="text-zinc-400">{project.year}</span>
                    </div>

                    <h3 className="font-['Outfit'] font-bold text-2xl sm:text-[26px] text-white group-hover:text-white transition-colors mb-2">
                      {project.title}
                    </h3>

                    <div className="text-[13px] font-['JetBrains_Mono'] text-zinc-400 mb-3 uppercase tracking-wider">
                      {project.shortCategory || project.proofPointType}
                    </div>

                    {project.ideaSpark && (
                      <p className="text-[14px] sm:text-[15px] text-zinc-300 font-light italic border-l-2 border-white/15 pl-3.5 mb-4 line-clamp-2 leading-[1.55]">
                        "{project.ideaSpark}"
                      </p>
                    )}

                    <p className="text-[15px] sm:text-[16px] text-zinc-200 font-light leading-[1.6] line-clamp-3 mb-7">
                      {project.shortDescription}
                    </p>
                  </div>

                  <div className="pt-5 border-t border-white/10 flex flex-wrap items-center justify-between gap-3 text-[13px] font-['JetBrains_Mono']">
                    {project.hasLiveDeployment && project.liveUrl ? (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => {
                          e.stopPropagation();
                          playTick(850, 'sine', 0.04, 0.03);
                        }}
                        className="px-3.5 py-1.5 rounded-lg text-[12px] font-['Outfit'] font-bold tracking-wide transition-all flex items-center gap-1.5 shadow-sm hover:scale-105 cursor-pointer text-slate-950"
                        style={{
                          backgroundColor: pTheme.primary
                        }}
                      >
                        <span>{project.primaryCtaLabel || 'Open Project'}</span>
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    ) : (
                      <span className="text-[11px] text-zinc-400 flex items-center gap-1.5">
                        <Clock className="w-3 h-3 text-zinc-500" />
                        <span>Preview Coming Soon</span>
                      </span>
                    )}

                    <span className="text-zinc-200 group-hover:text-white group-hover:translate-x-1 transition-transform flex items-center gap-1.5 font-medium ml-auto">
                      <span>Inspect Idea</span>
                      <ArrowRight className="w-4 h-4" style={{ color: pTheme.highlight }} />
                    </span>
                  </div>
                </div>
              </SpatialCard3D>
            );
          })}
        </div>
      )}

    </section>
  );
};
