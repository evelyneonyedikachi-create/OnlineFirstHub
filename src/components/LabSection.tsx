import React, { useState } from 'react';
import { LabExperiment } from '../types';
import { LAB_EXPERIMENTS } from '../data/lab';
import { playTick, playChime } from '../utils/sound';
import { FlaskConical, Activity } from 'lucide-react';

interface LabSectionProps {
  accentColor?: string;
}

export const LabSection: React.FC<LabSectionProps> = ({
  accentColor = '#818cf8'
}) => {
  const [selectedExpId, setSelectedExpId] = useState<string>('exp-semantic-graph');
  
  // Interactive workbench state for the Lab
  const [spatialMeshTension, setSpatialMeshTension] = useState<number>(68);
  const [semanticClusterDensity, setSemanticClusterDensity] = useState<number>(84);
  const [simRunning, setSimRunning] = useState<boolean>(true);

  const activeExp = LAB_EXPERIMENTS.find(e => e.id === selectedExpId) || LAB_EXPERIMENTS[0];

  const handleSelectExp = (exp: LabExperiment) => {
    playChime(accentColor);
    setSelectedExpId(exp.id);
  };

  return (
    <section 
      id="onlinefirst-lab-ecosystem-view"
      className="relative min-h-[92vh] px-4 sm:px-8 py-32 max-w-6xl mx-auto flex flex-col justify-center perspective-1000"
    >
      {/* Section Header */}
      <div className="mb-14">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/10 bg-[#121319]/80 text-[13px] font-['JetBrains_Mono'] text-zinc-200 mb-3 tracking-wider uppercase backdrop-blur-md shadow-sm">
          <FlaskConical className="w-4 h-4 text-indigo-400" />
          <span>Exploratory R&D Lab · Spatial & Sensory Prototypes</span>
        </div>
        <h2 className="font-['Outfit'] font-extrabold text-3xl sm:text-5xl text-white tracking-[-0.03em] drop-shadow-[0_6px_25px_rgba(0,0,0,0.85)]">
          OnlineFirst Lab<span className="text-indigo-400">.</span>
        </h2>
        <p className="text-[16px] sm:text-[18px] text-zinc-200 mt-3 max-w-xl font-light leading-[1.65]">
          Where we invent the interaction paradigms of tomorrow. Exploring what digital experiences can become—testing neural layouts, spatial publishing, and sensory computing.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Side: Experiments List */}
        <div className="lg:col-span-5 space-y-3.5">
          {LAB_EXPERIMENTS.map((exp) => {
            const isSelected = selectedExpId === exp.id;
            return (
              <button
                key={exp.id}
                onClick={() => handleSelectExp(exp)}
                className={`w-full p-5 sm:p-6 rounded-2xl text-left border transition-all duration-300 flex flex-col justify-between cursor-pointer ${
                  isSelected 
                    ? 'border-white/20 bg-[#14151e] shadow-xl' 
                    : 'border-white/10 bg-[#0e1017]/70 hover:border-white/20'
                }`}
              >
                <div className="flex items-center justify-between mb-2.5">
                  <span className="text-[12px] font-['JetBrains_Mono'] tracking-widest uppercase text-zinc-400 font-semibold">
                    {exp.category}
                  </span>
                  <span className="text-[12px] font-['JetBrains_Mono'] px-2.5 py-0.5 rounded-full bg-white/5 border border-white/10 text-zinc-300">
                    {exp.status}
                  </span>
                </div>

                <h3 className={`font-['Outfit'] font-bold text-lg sm:text-xl transition-colors ${
                  isSelected ? 'text-white' : 'text-zinc-200'
                }`}>
                  {exp.title}
                </h3>

                <p className="text-[14px] sm:text-[15px] text-zinc-300 mt-2 font-light leading-[1.55] line-clamp-2">
                  {exp.description}
                </p>
              </button>
            );
          })}
        </div>

        {/* Right Side: Interactive Experiment Canvas Simulator */}
        <div className="lg:col-span-7">
          <div 
            className="rounded-3xl glass-panel-3d p-8 sm:p-11 border border-white/10 relative overflow-hidden bg-[#101118]"
            style={{
              boxShadow: '0 20px 60px -20px rgba(0, 0, 0, 0.8)'
            }}
          >
            <div className="flex items-center justify-between pb-6 mb-6 border-b border-white/10">
              <div>
                <span className="text-[13px] font-['JetBrains_Mono'] text-zinc-400 uppercase tracking-widest font-semibold">
                  Live Interactive Workbench
                </span>
                <h3 className="font-['Outfit'] font-extrabold text-2xl sm:text-3xl text-white mt-1">
                  {activeExp.title}
                </h3>
              </div>
              <button
                onClick={() => setSimRunning(!simRunning)}
                className={`p-3 rounded-full border transition-all cursor-pointer ${
                  simRunning 
                    ? 'border-indigo-400/40 bg-white/10 text-indigo-400' 
                    : 'border-white/10 bg-[#121319] text-zinc-500'
                }`}
                title={simRunning ? 'Pause simulation' : 'Run simulation'}
              >
                <Activity className="w-5 h-5 animate-pulse" />
              </button>
            </div>

            {/* Interactive Kinetic Graph Visualizer */}
            <div className="relative rounded-2xl border border-white/10 bg-[#0d0e14] p-6 mb-6 min-h-[230px] flex items-center justify-center overflow-hidden">
              {/* Dynamic SVG Lattice */}
              <svg className="w-full h-44" viewBox="0 0 400 180">
                <defs>
                  <linearGradient id="labNeutral" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#818cf8" stopOpacity="0.85" />
                    <stop offset="100%" stopColor="#38bdf8" stopOpacity="0.85" />
                  </linearGradient>
                </defs>
                
                {/* Simulated Nodes & Dynamic Links */}
                {[
                  [70, 90], [130, 40], [150, 130], [210, 80], 
                  [270, 50], [290, 140], [340, 90]
                ].map(([nx, ny], i, arr) => (
                  <g key={i}>
                    {i < arr.length - 1 && (
                      <line 
                        x1={nx} 
                        y1={ny} 
                        x2={arr[i + 1][0]} 
                        y2={arr[i + 1][1]} 
                        stroke="#818cf8" 
                        strokeWidth="1.4" 
                        strokeOpacity="0.35" 
                        strokeDasharray={simRunning ? "4 4" : "none"}
                      />
                    )}
                    <circle 
                      cx={nx} 
                      cy={ny + (simRunning ? Math.sin((Date.now() / 600) + i) * 6 : 0)} 
                      r={i % 2 === 0 ? 5.5 : 4.5} 
                      fill="url(#labNeutral)" 
                    />
                  </g>
                ))}
              </svg>

              <div className="absolute bottom-3 left-4 text-[12px] font-['JetBrains_Mono'] text-zinc-400">
                Lattice Mesh: {spatialMeshTension}% | Cluster Nodes: 7 ACTIVE
              </div>
            </div>

            {/* Lab Control Sliders */}
            <div className="space-y-4 pt-3 border-t border-white/10">
              <div>
                <div className="flex justify-between text-[13px] sm:text-[14px] font-['JetBrains_Mono'] text-zinc-200 mb-1.5 font-medium">
                  <span>Spatial Tension Calibration</span>
                  <span className="text-indigo-400 font-semibold">{spatialMeshTension} Hz</span>
                </div>
                <input 
                  type="range" 
                  min="20" 
                  max="100" 
                  value={spatialMeshTension} 
                  onChange={(e) => {
                    playTick(Number(e.target.value) * 6, 'sine', 0.015, 0.01);
                    setSpatialMeshTension(Number(e.target.value));
                  }}
                  className="w-full accent-indigo-400 cursor-pointer h-2 bg-white/10 rounded-lg"
                />
              </div>

              <div>
                <div className="flex justify-between text-[13px] sm:text-[14px] font-['JetBrains_Mono'] text-zinc-200 mb-1.5 font-medium">
                  <span>Semantic Graph Density</span>
                  <span className="text-sky-400 font-semibold">{semanticClusterDensity}%</span>
                </div>
                <input 
                  type="range" 
                  min="10" 
                  max="100" 
                  value={semanticClusterDensity} 
                  onChange={(e) => {
                    playTick(Number(e.target.value) * 7, 'sine', 0.015, 0.01);
                    setSemanticClusterDensity(Number(e.target.value));
                  }}
                  className="w-full accent-sky-400 cursor-pointer h-2 bg-white/10 rounded-lg"
                />
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};
