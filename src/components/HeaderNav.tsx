import React, { useState } from 'react';
import { SectionView, VisualVariantConfig } from '../types';
import { playTick, setSoundEnabled, isSoundEnabled } from '../utils/sound';
import { 
  Volume2, 
  VolumeX, 
  Menu, 
  X, 
  ArrowUpRight
} from 'lucide-react';

interface HeaderNavProps {
  currentSection: SectionView;
  onNavigate: (section: SectionView) => void;
  variantConfig: VisualVariantConfig;
  onToggleVariant: () => void;
}

export const HeaderNav: React.FC<HeaderNavProps> = ({
  currentSection,
  onNavigate,
  variantConfig,
  onToggleVariant
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [soundOn, setSoundOn] = useState(isSoundEnabled());

  const navItems: { id: SectionView; label: string }[] = [
    { id: 'home', label: 'Overview' },
    { id: 'work', label: 'Ideas Made Real' },
    { id: 'capabilities', label: 'What We Build' },
    { id: 'method', label: 'How It Works' },
    { id: 'lab', label: 'Prototypes Lab' },
    { id: 'start', label: 'Contact' },
  ];

  const handleNavClick = (section: SectionView) => {
    playTick(750, 'sine', 0.05, 0.03);
    onNavigate(section);
    setMobileMenuOpen(false);
  };

  const toggleSound = () => {
    const next = !soundOn;
    setSoundOn(next);
    setSoundEnabled(next);
    if (next) playTick(880, 'sine', 0.08, 0.05);
  };

  return (
    <>
      <header 
        id="onlinefirst-main-header"
        className="fixed top-0 left-0 right-0 z-40 px-6 sm:px-10 py-5 transition-all duration-300 backdrop-blur-xl bg-[#090a0f]/80 border-b border-white/10"
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          
          {/* Brand Wordmark */}
          <button
            id="onlinefirst-brand-button"
            onClick={() => handleNavClick('home')}
            className="group flex items-center gap-3 text-left focus:outline-none cursor-pointer"
          >
            <div 
              className="w-7 h-7 rounded-lg border border-white/10 bg-[#121319] flex items-center justify-center transition-all duration-300 group-hover:border-white/20 group-hover:shadow-[0_0_15px_rgba(129,140,248,0.2)]"
            >
              <div 
                className="w-2.5 h-2.5 rounded-full transition-transform duration-300 group-hover:scale-125"
                style={{ backgroundColor: variantConfig.primaryAccent }}
              />
            </div>
            <span className="font-['Outfit'] font-extrabold text-xl tracking-tight text-white transition-colors">
              OnlineFirst<span style={{ color: variantConfig.blushPink }}>.</span>
            </span>
          </button>

          {/* Desktop Navigation Links */}
          <nav 
            id="onlinefirst-desktop-nav"
            className="hidden md:flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#121319]/80 backdrop-blur-xl border border-white/10 shadow-lg"
          >
            {navItems.map((item) => {
              const isActive = currentSection === item.id;
              return (
                <button
                  key={item.id}
                  id={`nav-item-${item.id}`}
                  onClick={() => handleNavClick(item.id)}
                  onMouseEnter={() => playTick(600, 'sine', 0.02, 0.01)}
                  className={`relative px-4 py-1.5 rounded-full text-[14px] font-medium tracking-wide transition-all duration-200 cursor-pointer ${
                    isActive 
                      ? 'text-white bg-white/10 border border-white/15 shadow-sm' 
                      : 'text-zinc-300 hover:text-white hover:bg-white/5'
                  }`}
                >
                  {item.label}
                </button>
              );
            })}
          </nav>

          {/* Right Action Cluster */}
          <div className="flex items-center gap-3">
            
            {/* Interactive Variant A / B Switcher */}
            <button
              onClick={() => {
                playTick(800, 'sine', 0.04, 0.03);
                onToggleVariant();
              }}
              title="Toggle theme styling"
              className="flex items-center gap-2 px-3.5 py-2 rounded-full border border-white/10 bg-[#121319]/80 hover:bg-[#191a22] text-[13px] font-['JetBrains_Mono'] text-zinc-300 transition-all cursor-pointer"
            >
              <span 
                className="w-1.5 h-1.5 rounded-full animate-ping" 
                style={{ backgroundColor: variantConfig.primaryAccent }} 
              />
              <span className="text-zinc-400 hidden xl:inline">Mode:</span>
              <span className="font-semibold text-white">
                {variantConfig.id === 'variant-a' ? 'Variant A' : 'Variant B'}
              </span>
            </button>

            {/* Audio Feedback Toggle */}
            <button
              id="sound-toggle-button"
              onClick={toggleSound}
              title={soundOn ? 'Mute ambient sound' : 'Enable ambient sound'}
              className="p-2.5 rounded-full border border-white/10 bg-[#121319]/60 hover:bg-[#1a1b23] text-zinc-400 hover:text-white transition-colors hidden sm:flex items-center justify-center cursor-pointer"
            >
              {soundOn ? (
                <Volume2 className="w-4 h-4 text-zinc-200" />
              ) : (
                <VolumeX className="w-4 h-4" />
              )}
            </button>

            {/* Start a Project Primary CTA */}
            <button
              id="header-start-project-button"
              onClick={() => handleNavClick('start')}
              onMouseEnter={() => playTick(800, 'sine', 0.03, 0.02)}
              className="px-6 py-2.5 rounded-full font-['Outfit'] font-semibold text-[14px] tracking-wider transition-all duration-300 flex items-center gap-1.5 border border-white/15 bg-white/5 hover:bg-white/15 text-white shadow-lg cursor-pointer"
            >
              <span>Start a Project</span>
              <ArrowUpRight className="w-4 h-4 text-zinc-300" />
            </button>

            {/* Mobile Hamburger Button */}
            <button
              id="mobile-nav-toggle-button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-lg border border-white/10 bg-[#121319] text-zinc-300 focus:outline-none cursor-pointer"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

        </div>
      </header>

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div 
          id="mobile-menu-overlay"
          className="fixed inset-0 z-50 bg-[#090a0f]/98 backdrop-blur-2xl md:hidden flex flex-col justify-between p-8 pt-24 animate-in fade-in duration-200"
        >
          <div className="flex flex-col gap-4">
            <div className="text-[11px] font-['JetBrains_Mono'] tracking-widest text-zinc-500 uppercase mb-2">
              Navigation
            </div>
            {navItems.map((item) => (
              <button
                key={item.id}
                id={`mobile-nav-${item.id}`}
                onClick={() => handleNavClick(item.id)}
                className={`flex items-center justify-between p-4 rounded-xl text-left border text-base font-['Outfit'] font-semibold transition-all cursor-pointer ${
                  currentSection === item.id
                    ? 'bg-white/10 border-white/20 text-white'
                    : 'bg-[#121319]/50 border-white/5 text-zinc-400'
                }`}
              >
                <span>{item.label}</span>
              </button>
            ))}

            {/* Mobile Variant Switcher */}
            <button
              onClick={() => {
                onToggleVariant();
                setMobileMenuOpen(false);
              }}
              className="p-4 rounded-xl border border-white/10 bg-[#121319]/70 text-left flex items-center justify-between text-xs font-['JetBrains_Mono'] text-zinc-300 cursor-pointer"
            >
              <span>Current Variant</span>
              <span className="font-bold text-white">{variantConfig.name}</span>
            </button>

            <button
              id="mobile-nav-start"
              onClick={() => handleNavClick('start')}
              className="mt-2 p-4 rounded-xl text-center font-['Outfit'] font-bold text-slate-950 shadow-lg flex items-center justify-center gap-2 cursor-pointer"
              style={{ backgroundColor: variantConfig.primaryAccent }}
            >
              <span>Start a Project</span>
              <ArrowUpRight className="w-4 h-4" />
            </button>
          </div>

          <div className="pt-6 border-t border-white/10 flex items-center justify-between text-xs text-zinc-500 font-['JetBrains_Mono']">
            <span>OnlineFirst Studio</span>
            <button 
              onClick={toggleSound}
              className="flex items-center gap-1.5 text-zinc-400 cursor-pointer"
            >
              {soundOn ? (
                <Volume2 className="w-3.5 h-3.5 text-zinc-300" />
              ) : (
                <VolumeX className="w-3.5 h-3.5" />
              )}
              <span>{soundOn ? 'Sound On' : 'Muted'}</span>
            </button>
          </div>
        </div>
      )}
    </>
  );
};
