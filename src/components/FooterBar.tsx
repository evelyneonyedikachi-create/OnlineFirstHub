import React from 'react';
import { SectionView } from '../types';
import { playTick } from '../utils/sound';
import { ArrowUp, Mail } from 'lucide-react';

interface FooterBarProps {
  currentSection: SectionView;
  onNavigate: (section: SectionView) => void;
  accentColor?: string;
}

export const FooterBar: React.FC<FooterBarProps> = ({
  currentSection,
  onNavigate,
  accentColor = '#818cf8'
}) => {
  const footerLinks: { id: SectionView; label: string }[] = [
    { id: 'home', label: 'Overview' },
    { id: 'work', label: 'Ideas Made Real' },
    { id: 'capabilities', label: 'What We Build' },
    { id: 'method', label: 'How It Works' },
    { id: 'lab', label: 'Lab' },
    { id: 'start', label: 'Contact' },
  ];

  return (
    <footer 
      id="onlinefirst-footer-dock"
      className="border-t border-white/10 bg-[#090a0f]/95 backdrop-blur-xl py-10 px-4 sm:px-8 mt-16 relative z-30 text-[13px] font-['JetBrains_Mono'] text-zinc-300"
    >
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        
        {/* Brand & Direct Contact */}
        <div className="flex flex-col sm:flex-row items-center gap-3 text-center sm:text-left">
          <span className="font-['Outfit'] font-bold text-white text-lg">
            OnlineFirst<span className="text-indigo-400">.</span>
          </span>
          <span className="hidden sm:inline text-zinc-700">|</span>
          <span className="text-zinc-300 font-light text-[14px] font-['Outfit']">
            Start small. Test early. Scale what works.
          </span>
          <span className="hidden sm:inline text-zinc-700">|</span>
          <a 
            href="mailto:onlinefirst2026@gmail.com" 
            className="inline-flex items-center gap-1.5 text-zinc-300 hover:text-white transition-colors text-[13px]"
          >
            <Mail className="w-3.5 h-3.5 text-indigo-400" />
            <span>onlinefirst2026@gmail.com</span>
          </a>
        </div>

        {/* Section Navigation Quick Pips */}
        <div className="flex items-center gap-2 flex-wrap justify-center">
          {footerLinks.map((item) => (
            <button
              key={item.id}
              onClick={() => {
                playTick(600, 'sine', 0.02, 0.01);
                onNavigate(item.id);
              }}
              className={`px-3.5 py-1.5 rounded-full text-[12px] tracking-wider uppercase transition-all cursor-pointer font-medium ${
                currentSection === item.id
                  ? 'bg-white/10 text-white border border-white/20 shadow-sm'
                  : 'text-zinc-400 hover:text-white hover:bg-white/5'
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>

        {/* Legal & Status Telemetry */}
        <div className="flex items-center gap-4 text-[12px] text-zinc-300">
          <span className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-indigo-400 animate-pulse" />
            <span className="text-zinc-300 font-medium">STUDIO ECOSYSTEM</span>
          </span>
          <button
            onClick={() => {
              playTick(800, 'sine', 0.02, 0.01);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="p-2 rounded-full border border-white/10 bg-white/5 hover:bg-white/10 text-zinc-300 hover:text-white transition-colors cursor-pointer"
            title="Scroll to top"
          >
            <ArrowUp className="w-4 h-4" />
          </button>
        </div>

      </div>
    </footer>
  );
};
