import React, { useState } from 'react';
import { METHOD_STAGES } from '../data/method';
import { playTick } from '../utils/sound';
import { 
  CheckCircle, 
  Compass, 
  Code, 
  Rocket, 
  Lightbulb, 
  Eye
} from 'lucide-react';

interface MethodSectionProps {
  onHoverStage: (index: number | null) => void;
  accentColor?: string;
}

export const MethodSection: React.FC<MethodSectionProps> = ({
  onHoverStage,
  accentColor = '#818cf8'
}) => {
  const [activeStageIndex, setActiveStageIndex] = useState<number>(0);

  const activeStage = METHOD_STAGES[activeStageIndex];

  const stageIcons = [
    <Eye className="w-4 h-4" />,
    <Lightbulb className="w-4 h-4" />,
    <Compass className="w-4 h-4" />,
    <Code className="w-4 h-4" />,
    <Rocket className="w-4 h-4" />
  ];

  const handleStageSelect = (idx: number) => {
    playTick(500 + idx * 80, 'sine', 0.03, 0.02);
    setActiveStageIndex(idx);
    onHoverStage(idx);
  };

  return (
    <section 
      id="method-ecosystem-view"
      className="relative min-h-[92vh] px-4 sm:px-8 py-32 max-w-6xl mx-auto flex flex-col justify-center"
    >
      {/* Header */}
      <div className="mb-14">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/10 bg-[#121319]/80 text-[13px] font-['JetBrains_Mono'] text-zinc-200 mb-3 tracking-wider uppercase backdrop-blur-md shadow-sm">
          <span className="w-2 h-2 rounded-full bg-indigo-400 animate-pulse" />
          <span>The Delivery Architecture · Build, Launch Lean, Learn</span>
        </div>
        <h2 className="font-['Outfit'] font-extrabold text-3xl sm:text-5xl text-white tracking-[-0.03em]">
          How OnlineFirst Works<span className="text-indigo-400">.</span>
        </h2>
        <p className="text-[16px] sm:text-[18px] text-zinc-200 mt-3 max-w-2xl font-light leading-[1.65]">
          A lean five-stage progression: turn your concept into real working software, launch cost-efficiently on modern cloud infrastructure, and validate with real users before scaling.
        </p>
      </div>

      {/* Interactive Process Pipeline */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Side: Stage Selection Rails */}
        <div className="lg:col-span-5 flex flex-col gap-3.5">
          {METHOD_STAGES.map((stage, idx) => {
            const isActive = activeStageIndex === idx;
            return (
              <button
                key={stage.step}
                onClick={() => handleStageSelect(idx)}
                onMouseEnter={() => onHoverStage(idx)}
                onMouseLeave={() => onHoverStage(null)}
                className={`p-5 rounded-2xl text-left border transition-all duration-300 flex items-center justify-between group cursor-pointer ${
                  isActive
                    ? 'border-white/20 bg-[#111219]/90 shadow-xl'
                    : 'border-white/10 bg-[#0e1017]/60 hover:border-white/20'
                }`}
              >
                <div className="flex items-center gap-4">
                  <div 
                    className={`w-11 h-11 rounded-xl flex items-center justify-center font-['JetBrains_Mono'] text-[13px] font-bold transition-all ${
                      isActive 
                        ? 'bg-indigo-400 text-slate-950 shadow-md' 
                        : 'border border-white/10 bg-white/5 text-zinc-400 group-hover:text-white'
                    }`}
                  >
                    {stage.number}
                  </div>
                  <div>
                    <h3 className={`font-['Outfit'] font-bold text-lg transition-colors ${
                      isActive ? 'text-white' : 'text-zinc-200 group-hover:text-white'
                    }`}>
                      {stage.title}
                    </h3>
                    <p className="text-[13px] text-zinc-400 font-light truncate max-w-[220px] mt-0.5">
                      {stage.tagline}
                    </p>
                  </div>
                </div>

                <div className={`p-2.5 rounded-full transition-all ${
                  isActive ? 'text-indigo-400 bg-white/5' : 'text-zinc-500 group-hover:text-zinc-300'
                }`}>
                  {stageIcons[idx]}
                </div>
              </button>
            );
          })}
        </div>

        {/* Right Side: Stage Inspector Card */}
        <div className="lg:col-span-7">
          {activeStage && (
            <div 
              className="rounded-3xl glass-panel-3d p-8 sm:p-11 border border-white/10 relative overflow-hidden transition-all duration-500 bg-[#101118]"
              style={{
                boxShadow: `0 20px 60px -20px rgba(0, 0, 0, 0.8)`
              }}
            >
              {/* Stage Number Holographic Tag */}
              <div className="flex items-center justify-between pb-6 mb-6 border-b border-white/10">
                <span className="text-[13px] font-['JetBrains_Mono'] tracking-widest text-zinc-400 uppercase font-semibold">
                  Phase {activeStage.number} of 05
                </span>
                <span className="text-[13px] font-['JetBrains_Mono'] text-zinc-400">
                  {activeStage.tagline}
                </span>
              </div>

              <h3 className="font-['Outfit'] font-extrabold text-2xl sm:text-3xl lg:text-4xl text-white tracking-tight mb-4">
                {activeStage.title}
              </h3>

              <p className="text-zinc-200 text-[16px] sm:text-[18px] leading-[1.65] mb-8 font-light">
                {activeStage.description}
              </p>

              <div className="pt-6 border-t border-white/10">
                <div className="text-[13px] font-['JetBrains_Mono'] text-zinc-300 uppercase tracking-widest mb-4 font-semibold">
                  Key Milestones & Deliverables
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  {activeStage.deliverables.map((del, dIdx) => (
                    <div 
                      key={dIdx}
                      className="p-3.5 rounded-xl border border-white/10 bg-white/5 flex items-start gap-3 text-[14px] sm:text-[15px] text-zinc-200 font-light leading-snug"
                    >
                      <CheckCircle className="w-4 h-4 text-indigo-400 shrink-0 mt-0.5" />
                      <span>{del}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

      </div>
    </section>
  );
};
