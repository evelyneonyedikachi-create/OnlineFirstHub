import React, { useState } from 'react';
import { CAPABILITIES } from '../data/capabilities';
import { playTick, playChime } from '../utils/sound';
import { 
  Globe, 
  Layers, 
  Cpu, 
  Sparkles, 
  BookOpen, 
  ChevronDown, 
  Check, 
  ArrowRight
} from 'lucide-react';

interface CapabilitiesSectionProps {
  onSelectProjectByName: (title: string) => void;
  accentColor?: string;
}

export const CapabilitiesSection: React.FC<CapabilitiesSectionProps> = ({
  onSelectProjectByName,
  accentColor = '#818cf8'
}) => {
  const [expandedId, setExpandedId] = useState<string>('lean-prototypes-validation');

  const getIcon = (iconName: string, color: string) => {
    switch (iconName) {
      case 'Globe': return <Globe className="w-5 h-5" style={{ color }} />;
      case 'Layers': return <Layers className="w-5 h-5" style={{ color }} />;
      case 'Cpu': return <Cpu className="w-5 h-5" style={{ color }} />;
      case 'Sparkles': return <Sparkles className="w-5 h-5" style={{ color }} />;
      case 'BookOpen': return <BookOpen className="w-5 h-5" style={{ color }} />;
      default: return <Sparkles className="w-5 h-5" style={{ color }} />;
    }
  };

  const handleToggle = (id: string, accent: string) => {
    playChime(accent);
    setExpandedId(prev => prev === id ? '' : id);
  };

  return (
    <section 
      id="capabilities-ecosystem-view"
      className="relative min-h-[92vh] px-4 sm:px-8 py-32 max-w-6xl mx-auto flex flex-col justify-center perspective-1000"
    >
      {/* Section Header */}
      <div className="mb-14">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/10 bg-[#121319]/80 text-[13px] font-['JetBrains_Mono'] text-zinc-200 mb-3 tracking-wider uppercase backdrop-blur-md shadow-sm">
          <span className="w-2 h-2 rounded-full bg-indigo-400 animate-ping" />
          <span>Core Capabilities · From Personal Tools to SaaS Platforms</span>
        </div>
        <h2 className="font-['Outfit'] font-extrabold text-3xl sm:text-5xl text-white tracking-[-0.03em] drop-shadow-[0_6px_25px_rgba(0,0,0,0.85)]">
          What We Build<span className="text-indigo-400">.</span>
        </h2>
        <p className="text-[16px] sm:text-[18px] text-zinc-200 mt-3 max-w-2xl font-light leading-[1.65]">
          From custom learning apps and lean validation prototypes to SaaS products and interactive publishing — OnlineFirst pairs creative clarity with cost-efficient engineering.
        </p>
      </div>

      {/* Accordion / Matrix of Capabilities */}
      <div className="space-y-4">
        {CAPABILITIES.map((cap) => {
          const isExpanded = expandedId === cap.id;
          return (
            <div 
              key={cap.id}
              className={`rounded-2xl border transition-all duration-300 backdrop-blur-xl overflow-hidden ${
                isExpanded 
                  ? 'border-white/20 bg-[#111219]/90 shadow-xl' 
                  : 'border-white/10 bg-[#0e1017]/50 hover:border-white/20'
              }`}
            >
              {/* Accordion Trigger Header */}
              <button
                onClick={() => handleToggle(cap.id, cap.accent)}
                className="w-full p-6 sm:p-8 flex items-center justify-between text-left focus:outline-none cursor-pointer"
              >
                <div className="flex items-center gap-4 sm:gap-6">
                  <div 
                    className="w-13 h-13 rounded-2xl flex items-center justify-center border border-white/10 shrink-0 bg-white/5"
                  >
                    {getIcon(cap.icon, accentColor)}
                  </div>
                  <div>
                    <div className="flex items-center gap-3">
                      <span className="text-[12px] sm:text-[13px] font-['JetBrains_Mono'] text-zinc-400 uppercase tracking-wider font-semibold">
                        {cap.subtitle || cap.tagline}
                      </span>
                    </div>
                    <h3 className="font-['Outfit'] font-bold text-2xl sm:text-[26px] text-white tracking-tight mt-1">
                      {cap.title}
                    </h3>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <span className="text-[13px] font-['JetBrains_Mono'] text-zinc-400 hidden sm:inline">
                    {cap.deliverables.length} Deliverables
                  </span>
                  <div 
                    className="p-2.5 rounded-full border border-white/10 text-zinc-300 transition-transform duration-200"
                    style={{ transform: isExpanded ? 'rotate(180deg)' : 'rotate(0deg)' }}
                  >
                    <ChevronDown className="w-4 h-4 text-zinc-300" />
                  </div>
                </div>
              </button>

              {/* Expanded Capability Content */}
              {isExpanded && (
                <div className="px-6 pb-8 sm:px-8 pt-3 border-t border-white/10 grid grid-cols-1 md:grid-cols-12 gap-8 animate-in fade-in duration-300">
                  <div className="md:col-span-7">
                    <p className="text-zinc-200 text-[16px] sm:text-[17px] leading-[1.65] mb-6 font-light">
                      {cap.description}
                    </p>

                    <div className="text-[13px] font-['JetBrains_Mono'] tracking-widest text-zinc-400 uppercase mb-3.5 font-semibold">
                      Core Artifacts & Deliverables
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {cap.deliverables.map((item, idx) => (
                        <div key={idx} className="flex items-start gap-2.5 text-[14px] sm:text-[15px] text-zinc-200 font-light leading-snug">
                          <Check className="w-4 h-4 text-indigo-400 shrink-0 mt-0.5" />
                          <span>{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="md:col-span-5 bg-[#14151e]/70 rounded-2xl p-6 border border-white/10 flex flex-col justify-between">
                    <div>
                      <div className="text-[12px] sm:text-[13px] font-['JetBrains_Mono'] text-zinc-300 uppercase tracking-widest mb-3.5 font-semibold">
                        Proven Through Work
                      </div>
                      <div className="space-y-2.5">
                        {(cap.proofProjects || cap.featuredProjects || []).map((pName, i) => (
                          <button
                            key={i}
                            onClick={() => {
                              playTick(720, 'sine', 0.03, 0.02);
                              onSelectProjectByName(pName);
                            }}
                            className="w-full text-left p-3.5 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 hover:border-white/20 transition-all flex items-center justify-between text-[14px] text-zinc-200 group cursor-pointer"
                          >
                            <span className="font-medium group-hover:text-white transition-colors">
                              {pName}
                            </span>
                            <ArrowRight className="w-4 h-4 text-zinc-400 group-hover:translate-x-1 group-hover:text-white transition-all" />
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="mt-5 pt-3.5 border-t border-white/10 text-[12px] font-['JetBrains_Mono'] text-zinc-400">
                      Production grade · Fully responsive
                    </div>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
};
