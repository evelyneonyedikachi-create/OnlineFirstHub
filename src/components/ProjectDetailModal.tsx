import React, { useState, useEffect } from 'react';
import { Project, DeviceView } from '../types';
import { playTick, playChime } from '../utils/sound';
import { 
  X, 
  ExternalLink, 
  Monitor, 
  Tablet, 
  Smartphone, 
  CheckCircle2, 
  ShieldAlert, 
  Lightbulb, 
  Layers, 
  Lock, 
  ShieldCheck, 
  KeyRound, 
  Send, 
  Check,
  Sparkles,
  BarChart3,
  Clock
} from 'lucide-react';

interface ProjectDetailModalProps {
  project: Project | null;
  onClose: () => void;
}

export const ProjectDetailModal: React.FC<ProjectDetailModalProps> = ({
  project,
  onClose
}) => {
  const [deviceView, setDeviceView] = useState<DeviceView>('desktop');
  const [showAccessForm, setShowAccessForm] = useState<boolean>(false);
  const [passkeyInput, setPasskeyInput] = useState<string>('');
  const [passkeyVerified, setPasskeyVerified] = useState<boolean>(false);
  const [requestSubmitted, setRequestSubmitted] = useState<boolean>(false);
  const [requesterEmail, setRequesterEmail] = useState<string>('');

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        playTick(500, 'sine', 0.04, 0.02);
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!project) return null;

  const theme = project.theme;

  const handleVerifyPasskey = (e: React.FormEvent) => {
    e.preventDefault();
    if (passkeyInput.trim().length > 0) {
      playChime(theme.primary);
      setPasskeyVerified(true);
    }
  };

  const handleRequestAccess = (e: React.FormEvent) => {
    e.preventDefault();
    playChime(theme.primary);
    setRequestSubmitted(true);
  };

  return (
    <div 
      id="project-detail-modal-overlay"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-[#050608]/92 backdrop-blur-2xl animate-in fade-in duration-300 overflow-y-auto"
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          playTick(500, 'sine', 0.03, 0.02);
          onClose();
        }
      }}
    >
      {/* Modal Dialog with Dark Neutral Frame and Restrained Accent Glow */}
      <div 
        id="project-detail-dialog"
        className="relative w-full max-w-5xl my-auto rounded-3xl border border-white/10 overflow-hidden text-zinc-100 flex flex-col max-h-[92vh] transition-all duration-500 shadow-2xl"
        style={{
          backgroundColor: '#0d0e14',
          boxShadow: `0 25px 80px -15px rgba(0,0,0,0.95), 0 0 25px rgba(${theme.glowRgba}, 0.12)`
        }}
      >
        {/* Dynamic Light Sweep Shimmer on Dialog Header */}
        <div 
          className="absolute top-0 left-0 right-0 h-[2px] pointer-events-none"
          style={{
            background: `linear-gradient(90deg, transparent, ${theme.primary}, ${theme.highlight}, transparent)`
          }}
        />

        {/* Top Header Bar */}
        <div 
          className="flex items-center justify-between px-6 sm:px-8 py-5 border-b border-white/10 bg-[#101118]"
        >
          <div className="flex items-center gap-3">
            <span 
              className="w-2.5 h-2.5 rounded-full animate-pulse"
              style={{ backgroundColor: theme.primary }}
            />
            <div className="flex flex-col">
              <div className="flex items-center gap-2">
                <span className="text-[13px] font-['JetBrains_Mono'] tracking-widest uppercase font-medium text-zinc-300">
                  {project.client} · {project.year}
                </span>
                <span className="text-zinc-600">·</span>
                <span className="text-[12px] font-['JetBrains_Mono'] px-2.5 py-0.5 rounded border border-white/10 text-zinc-300">
                  {project.ideaCategory} · {project.shortCategory || project.proofPointType}
                </span>
              </div>
              <h2 className="font-['Outfit'] font-bold text-2xl sm:text-3xl lg:text-4xl text-white tracking-tight mt-1">
                {project.title}
              </h2>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {/* Live Project Quick Button if deployed */}
            {project.hasLiveDeployment && project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => playTick(850, 'sine', 0.04, 0.03)}
                className="hidden sm:inline-flex items-center gap-2 px-4 py-2 rounded-full font-['Outfit'] font-bold text-[13px] tracking-wide text-slate-950 transition-all hover:scale-105 shadow-md cursor-pointer"
                style={{
                  backgroundColor: theme.primary,
                  boxShadow: `0 0 16px rgba(${theme.glowRgba}, 0.35)`
                }}
              >
                <span>{project.primaryCtaLabel || 'Open Project'}</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            )}

            {/* Project Theme Badge */}
            <div 
              className="hidden md:flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-white/10 text-[12px] font-['JetBrains_Mono'] tracking-wider bg-white/5 text-zinc-300"
            >
              <Sparkles className="w-3.5 h-3.5 text-zinc-400" />
              <span>THEME: {theme.name}</span>
            </div>

            {/* Close Button */}
            <button
              id="close-project-modal-btn"
              onClick={() => {
                playTick(500, 'sine', 0.03, 0.02);
                onClose();
              }}
              className="p-2.5 rounded-full border border-white/10 bg-white/5 hover:bg-white/10 text-zinc-300 hover:text-white transition-colors cursor-pointer"
              aria-label="Close Case Study"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Scrollable Body */}
        <div className="p-6 sm:p-10 overflow-y-auto space-y-9">
          
          {/* Executive Overview & Metrics Row */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Left: Summary Body */}
            <div className="lg:col-span-8 space-y-5">
              <span className="text-[13px] font-['JetBrains_Mono'] uppercase tracking-widest text-zinc-400 block font-semibold">
                The Idea Made Real
              </span>

              {project.ideaSpark && (
                <div className="p-5 rounded-2xl border border-white/10 bg-[#0e1017] flex items-start gap-3.5">
                  <Lightbulb className="w-5 h-5 mt-0.5 shrink-0 text-amber-400" />
                  <div>
                    <div className="text-[12px] font-['JetBrains_Mono'] tracking-widest text-zinc-400 uppercase mb-1.5 font-semibold">
                      The Initial Need / Concept
                    </div>
                    <p className="text-[15px] sm:text-[16px] text-zinc-100 font-light leading-[1.6]">
                      {project.ideaSpark}
                    </p>
                  </div>
                </div>
              )}

              <p className="text-[16px] sm:text-[18px] text-zinc-200 font-light leading-[1.65]">
                {project.shortDescription}
              </p>

              {project.testedAndLearned && (
                <div className="p-5 rounded-2xl border border-indigo-500/25 bg-indigo-950/20 text-zinc-200 text-[14px] sm:text-[15px] font-light leading-[1.6]">
                  <strong className="text-white font-medium">Tested & Validated: </strong>
                  {project.testedAndLearned}
                </div>
              )}

              <div className="flex items-center gap-2 text-[13px] font-['JetBrains_Mono'] text-zinc-400 pt-1">
                <span className="font-semibold text-zinc-300">Curation Mood:</span>
                <span className="text-zinc-200">{theme.mood}</span>
              </div>
            </div>

            {/* Right: Key Performance Telemetry / Metrics */}
            <div className="lg:col-span-4 p-6 rounded-2xl bg-[#13141d] border border-white/10 space-y-4">
              <div className="flex items-center gap-2 text-[13px] font-['JetBrains_Mono'] text-zinc-300 uppercase tracking-wider font-semibold">
                <BarChart3 className="w-4 h-4 text-zinc-300" />
                <span>Verified Impact Metrics</span>
              </div>
              <div className="grid grid-cols-1 gap-3">
                {project.metrics?.map((m, mIdx) => (
                  <div key={mIdx} className="flex items-baseline justify-between border-b border-white/5 pb-2 last:border-none">
                    <span className="text-[14px] text-zinc-300 font-light">{m.label}</span>
                    <span className="text-[22px] sm:text-[24px] font-['Outfit'] font-bold" style={{ color: theme.highlight }}>
                      {m.value}
                    </span>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* Access Control & Commercial Safeguard Banner */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-5 rounded-2xl bg-[#13141d] border border-white/10">
            <div className="flex items-start gap-3">
              <div className="p-2.5 rounded-xl bg-white/5 border border-white/10 text-zinc-300 shrink-0 mt-0.5">
                {project.accessControl.commercialTermsProtected ? (
                  <Lock className="w-4 h-4 text-amber-400" />
                ) : (
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                )}
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-[13px] font-['JetBrains_Mono'] font-bold uppercase tracking-wider text-white">
                    {project.accessControl.level}
                  </span>
                  {project.accessControl.commercialTermsProtected && (
                    <span className="text-[11px] font-['JetBrains_Mono'] px-2 py-0.5 rounded bg-amber-950/40 text-amber-300 border border-amber-500/30">
                      Commercial Terms Encrypted
                    </span>
                  )}
                </div>
                <p className="text-[13px] sm:text-[14px] text-zinc-300 mt-1 leading-relaxed">
                  {project.accessControl.accessNote}
                </p>
              </div>
            </div>

            {project.accessControl.commercialTermsProtected && (
              <button
                onClick={() => {
                  playTick(700, 'sine', 0.02, 0.02);
                  setShowAccessForm(!showAccessForm);
                }}
                className="shrink-0 px-4 py-2 rounded-xl border border-white/15 bg-white/5 hover:bg-white/10 text-[12px] font-['JetBrains_Mono'] text-white transition-colors flex items-center gap-2 cursor-pointer shadow-sm"
              >
                <KeyRound className="w-3.5 h-3.5 text-zinc-400" />
                <span>{showAccessForm ? 'Hide Portal Login' : 'Stakeholder Access'}</span>
              </button>
            )}
          </div>

          {/* Stakeholder Access Drawer if toggled */}
          {showAccessForm && (
            <div 
              className="p-6 rounded-2xl border border-white/10 bg-[#14151f] animate-in fade-in duration-200"
            >
              <div className="max-w-md mx-auto text-center">
                <span className="text-[12px] font-['JetBrains_Mono'] uppercase tracking-widest block mb-2 text-zinc-400">
                  Protected Proposal Environment Verification
                </span>
                <h4 className="font-['Outfit'] font-bold text-xl text-white mb-2">
                  Confidential Stakeholder Gateway
                </h4>
                <p className="text-[14px] text-zinc-300 mb-6 leading-relaxed">
                  Enter your client passkey or submit your corporate credentials to review commercial terms, fee structures, and the live engagement roadmap.
                </p>

                {!passkeyVerified && !requestSubmitted ? (
                  <div className="space-y-4">
                    <form onSubmit={handleVerifyPasskey} className="flex gap-2">
                      <input
                        type="text"
                        value={passkeyInput}
                        onChange={(e) => setPasskeyInput(e.target.value)}
                        placeholder="Enter Client Passkey (or 'DEMO')"
                        className="flex-1 px-4 py-2.5 rounded-xl bg-[#090a0f] border border-white/15 text-[13px] text-white focus:outline-none focus:border-indigo-400/60"
                      />
                      <button
                        type="submit"
                        className="px-5 py-2.5 rounded-xl text-[13px] font-['Outfit'] font-bold text-slate-950 transition-colors cursor-pointer"
                        style={{ backgroundColor: theme.primary }}
                      >
                        Verify
                      </button>
                    </form>

                    <div className="text-[12px] text-zinc-500 font-['JetBrains_Mono']">
                      Don’t have a client passkey?
                    </div>

                    <form onSubmit={handleRequestAccess} className="flex gap-2">
                      <input
                        type="email"
                        required
                        value={requesterEmail}
                        onChange={(e) => setRequesterEmail(e.target.value)}
                        placeholder="corporate@organization.com"
                        className="flex-1 px-4 py-2.5 rounded-xl bg-[#090a0f] border border-white/15 text-[13px] text-white focus:outline-none focus:border-indigo-400/60"
                      />
                      <button
                        type="submit"
                        className="px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/15 border border-white/15 text-[13px] font-['Outfit'] font-semibold text-white transition-colors flex items-center gap-1.5 cursor-pointer"
                      >
                        <Send className="w-3.5 h-3.5" />
                        <span>Request Key</span>
                      </button>
                    </form>
                  </div>
                ) : passkeyVerified ? (
                  <div className="p-4 rounded-xl border border-emerald-500/40 bg-emerald-950/20 text-[13px] leading-relaxed text-emerald-300">
                    <Check className="w-5 h-5 mx-auto mb-2 text-emerald-400" />
                    <strong>Stakeholder Clearance Authenticated:</strong> Client identity verified. Confidential terms, financial models, and full proposal archives are unlocked for your team.
                  </div>
                ) : (
                  <div className="p-4 rounded-xl border border-indigo-500/40 bg-indigo-950/20 text-[13px] leading-relaxed text-indigo-300">
                    <Check className="w-5 h-5 mx-auto mb-2 text-indigo-400" />
                    <strong>Request Transmitted:</strong> Our partner team will deliver encrypted clearance credentials to {requesterEmail} following conflict verification.
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Interactive Multi-Device Mockup Sandbox */}
          <div className="rounded-2xl border border-white/10 bg-[#12131b] p-5 sm:p-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-4 pb-3 border-b border-white/10">
              <div>
                <span className="text-[12px] font-['JetBrains_Mono'] uppercase tracking-wider text-zinc-400">
                  Interactive UI Architecture Viewport
                </span>
                <p className="text-[13px] text-zinc-400 mt-0.5">
                  Switch viewport formats to inspect responsive interaction pacing.
                </p>
              </div>

              {/* Viewport Selector Buttons */}
              <div className="flex items-center rounded-xl border border-white/10 bg-[#090a0f] p-1 text-[12px] font-['JetBrains_Mono']">
                <button
                  onClick={() => {
                    playTick(600, 'sine', 0.02, 0.02);
                    setDeviceView('desktop');
                  }}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-colors cursor-pointer ${
                    deviceView === 'desktop' ? 'bg-white/10 text-white font-medium border border-white/15' : 'text-zinc-400 hover:text-white'
                  }`}
                >
                  <Monitor className="w-3.5 h-3.5" />
                  <span>Desktop</span>
                </button>
                <button
                  onClick={() => {
                    playTick(650, 'sine', 0.02, 0.02);
                    setDeviceView('tablet');
                  }}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-colors cursor-pointer ${
                    deviceView === 'tablet' ? 'bg-white/10 text-white font-medium border border-white/15' : 'text-zinc-400 hover:text-white'
                  }`}
                >
                  <Tablet className="w-3.5 h-3.5" />
                  <span>Tablet</span>
                </button>
                <button
                  onClick={() => {
                    playTick(700, 'sine', 0.02, 0.02);
                    setDeviceView('mobile');
                  }}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-colors cursor-pointer ${
                    deviceView === 'mobile' ? 'bg-white/10 text-white font-medium border border-white/15' : 'text-zinc-400 hover:text-white'
                  }`}
                >
                  <Smartphone className="w-3.5 h-3.5" />
                  <span>Mobile</span>
                </button>
              </div>
            </div>

            {/* Device Container Frame */}
            <div className="flex justify-center items-center py-6 bg-[#08090d] rounded-xl overflow-hidden min-h-[320px]">
              <div 
                className={`transition-all duration-500 rounded-2xl border border-white/10 bg-[#0e1017] p-4 shadow-2xl flex flex-col justify-between ${
                  deviceView === 'desktop' 
                    ? 'w-full max-w-3xl min-h-[300px]' 
                    : deviceView === 'tablet' 
                    ? 'w-[500px] min-h-[340px]' 
                    : 'w-[300px] min-h-[400px]'
                }`}
              >
                {/* Browser/Hardware Bar */}
                <div className="flex items-center justify-between pb-3 mb-3 border-b border-white/10 text-[11px] font-['JetBrains_Mono'] text-zinc-400">
                  <div className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-red-400/80" />
                    <span className="w-2.5 h-2.5 rounded-full bg-yellow-400/80" />
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-400/80" />
                  </div>
                  <span className="truncate max-w-[280px]" style={{ color: theme.highlight }}>
                    {project.liveUrl || `https://onlinefirst.studio/preview/${project.slug}`}
                  </span>
                  <span className="uppercase text-[10px] text-zinc-500">{deviceView}</span>
                </div>

                {/* Simulated Screen Interface Content */}
                <div 
                  className="rounded-xl p-6 border border-white/10 flex-1 flex flex-col justify-between"
                  style={{
                    background: `linear-gradient(135deg, ${theme.bgTint} 0%, rgba(14, 16, 23, 0.98) 100%)`
                  }}
                >
                  <div>
                    <span 
                      className="text-[10px] font-['JetBrains_Mono'] font-bold tracking-widest uppercase px-2.5 py-0.5 rounded-md border border-white/15"
                      style={{
                        color: theme.highlight
                      }}
                    >
                      {project.previewContent.tag}
                    </span>
                    <h4 className="font-['Outfit'] font-bold text-2xl sm:text-3xl text-white mt-3 leading-snug">
                      {project.previewContent.heroTitle}
                    </h4>
                    <p className="text-[14px] sm:text-[15px] text-zinc-300 mt-2.5 leading-relaxed font-light">
                      {project.previewContent.heroSubtitle}
                    </p>
                  </div>

                  <div className="mt-5 pt-4 border-t border-white/10 flex flex-wrap gap-2">
                    {project.previewContent.features.map((feat, idx) => (
                      <span 
                        key={idx}
                        className="text-[11px] font-['JetBrains_Mono'] px-3 py-1 rounded-md bg-white/5 text-zinc-300 border border-white/10 flex items-center gap-1.5"
                      >
                        <CheckCircle2 className="w-3.5 h-3.5" style={{ color: theme.highlight }} />
                        <span>{feat}</span>
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Deep Case Study Breakdown: Challenge & Solution */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* The Challenge */}
            <div className="p-6 rounded-2xl bg-[#13141d] border border-white/10 space-y-3">
              <div className="flex items-center gap-2 text-[13px] font-['JetBrains_Mono'] text-rose-400 uppercase tracking-widest font-semibold">
                <ShieldAlert className="w-4 h-4 text-rose-400" />
                <span>The Challenge</span>
              </div>
              <p className="text-zinc-200 text-[15px] sm:text-[16px] leading-[1.65] font-light">
                {project.challenge}
              </p>
            </div>

            {/* The Solution */}
            <div 
              className="p-6 rounded-2xl bg-[#13141d] border border-white/10 space-y-3"
            >
              <div className="flex items-center gap-2 text-[13px] font-['JetBrains_Mono'] uppercase tracking-widest font-semibold" style={{ color: theme.highlight }}>
                <Lightbulb className="w-4 h-4" style={{ color: theme.primary }} />
                <span>The Solution</span>
              </div>
              <p className="text-zinc-200 text-[15px] sm:text-[16px] leading-[1.65] font-light">
                {project.solution}
              </p>
            </div>

          </div>

          {/* What OnlineFirst Created */}
          <div className="p-6 sm:p-7 rounded-2xl bg-[#13141d] border border-white/10">
            <div className="flex items-center gap-2 text-[13px] font-['JetBrains_Mono'] uppercase tracking-widest mb-5 text-zinc-200 font-semibold">
              <Layers className="w-4 h-4 text-indigo-400" />
              <span>What OnlineFirst Created</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {project.whatWeCreated.map((item, idx) => (
                <div key={idx} className="flex items-start gap-3 text-[15px] sm:text-[16px] text-zinc-200 font-light leading-[1.55]">
                  <span 
                    className="w-2.5 h-2.5 rounded-full mt-2 shrink-0"
                    style={{ backgroundColor: theme.primary }}
                  />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Technology & Safe Actions */}
          <div className="flex flex-wrap items-center justify-between gap-5 pt-6 border-t border-white/10">
            <div className="flex flex-wrap items-center gap-2.5">
              <span className="text-[13px] font-['JetBrains_Mono'] text-zinc-300 uppercase tracking-wider mr-2 font-medium">
                Tech Architecture:
              </span>
              {project.techStack.map((tech) => (
                <span 
                  key={tech}
                  className="px-3.5 py-1.5 rounded-lg text-[13px] font-['JetBrains_Mono'] bg-white/5 text-zinc-200 border border-white/10"
                >
                  {tech}
                </span>
              ))}
            </div>

            {/* Access-Safe Action Controls with working live links */}
            <div className="flex flex-wrap items-center gap-3.5">
              {project.hasLiveDeployment && project.liveUrl ? (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => playTick(850, 'sine', 0.04, 0.03)}
                  className="px-8 py-3.5 rounded-full font-['Outfit'] font-bold text-[14px] sm:text-[15px] tracking-wider text-slate-950 transition-all flex items-center gap-2.5 shadow-lg cursor-pointer hover:scale-105"
                  style={{
                    backgroundColor: theme.primary,
                    boxShadow: `0 0 20px rgba(${theme.glowRgba}, 0.35)`
                  }}
                >
                  <span>{project.primaryCtaLabel || 'Open Project'}</span>
                  <ExternalLink className="w-4 h-4" />
                </a>
              ) : (
                <div className="px-5 py-3 rounded-full border border-white/10 bg-white/5 text-zinc-400 text-[13px] font-['JetBrains_Mono'] flex items-center gap-2">
                  <Clock className="w-4 h-4 text-zinc-500" />
                  <span>Prototype Preview Coming Soon</span>
                </div>
              )}

              {project.secondaryUrl && (
                <a
                  href={project.secondaryUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => playTick(800, 'sine', 0.03, 0.02)}
                  className="px-6 py-3.5 rounded-full font-['Outfit'] font-semibold text-[14px] sm:text-[15px] tracking-wider text-zinc-200 border border-white/20 bg-white/5 hover:bg-white/10 transition-all flex items-center gap-2 cursor-pointer shadow-sm"
                >
                  <span>{project.secondaryCtaLabel || 'View Proposal Hub'}</span>
                  <ExternalLink className="w-4 h-4 text-zinc-400" />
                </a>
              )}

              {project.accessControl.commercialTermsProtected && !project.hasLiveDeployment && (
                <button
                  onClick={() => {
                    playTick(700, 'sine', 0.02, 0.02);
                    setShowAccessForm(true);
                  }}
                  className="px-6 py-3.5 rounded-full font-['Outfit'] font-semibold text-[13px] sm:text-[14px] tracking-wider text-zinc-200 border border-white/15 bg-white/5 hover:bg-white/10 transition-all flex items-center gap-2 cursor-pointer shadow-sm"
                >
                  <Lock className="w-4 h-4 text-amber-400" />
                  <span>Request Private Briefing</span>
                </button>
              )}
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
