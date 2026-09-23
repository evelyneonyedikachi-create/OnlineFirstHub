/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { SectionView, Project, VisualVariant, ProjectTheme } from './types';
import { GREEN_VARIANTS } from './data/greenThemes';
import { PROJECTS } from './data/projects';
import { IntelligentBackground } from './components/IntelligentBackground';
import { HeaderNav } from './components/HeaderNav';
import { HeroSection } from './components/HeroSection';
import { ProjectExplorer } from './components/ProjectExplorer';
import { ProjectDetailModal } from './components/ProjectDetailModal';
import { CapabilitiesSection } from './components/CapabilitiesSection';
import { MethodSection } from './components/MethodSection';
import { LabSection } from './components/LabSection';
import { StartProjectSection } from './components/StartProjectSection';
import { FooterBar } from './components/FooterBar';
import { playTick, playChime } from './utils/sound';

export default function App() {
  const [currentSection, setCurrentSection] = useState<SectionView>('home');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [activeMethodStage, setActiveMethodStage] = useState<number | null>(null);
  const [activeProjectTheme, setActiveProjectTheme] = useState<ProjectTheme | null>(null);
  
  // Two curated variants: Variant A (Soft Futuristic Luxury) & Variant B (Hyper-Spatial Editorial Future)
  const [variant, setVariant] = useState<VisualVariant>('variant-a');

  const variantConfig = GREEN_VARIANTS[variant];

  const handleToggleVariant = () => {
    setVariant((prev) => (prev === 'variant-a' ? 'variant-b' : 'variant-a'));
    playChime(variant === 'variant-a' ? '#f472b6' : '#c084fc');
  };

  // Keyboard shortcut listener for swift navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (['INPUT', 'TEXTAREA'].includes((e.target as HTMLElement)?.tagName)) {
        return;
      }

      if (e.key === '1') {
        playTick(600, 'sine', 0.03, 0.02);
        setCurrentSection('home');
      } else if (e.key === '2') {
        playTick(650, 'sine', 0.03, 0.02);
        setCurrentSection('work');
      } else if (e.key === '3') {
        playTick(700, 'sine', 0.03, 0.02);
        setCurrentSection('capabilities');
      } else if (e.key === '4') {
        playTick(750, 'sine', 0.03, 0.02);
        setCurrentSection('method');
      } else if (e.key === '5') {
        playTick(800, 'sine', 0.03, 0.02);
        setCurrentSection('lab');
      } else if (e.key === 's' || e.key === 'S') {
        playTick(850, 'sine', 0.03, 0.02);
        setCurrentSection('start');
      } else if (e.key === 'v' || e.key === 'V') {
        handleToggleVariant();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [variant]);

  const handleSelectProjectByName = (title: string) => {
    const found = PROJECTS.find(p => p.title.toLowerCase().includes(title.toLowerCase()));
    if (found) {
      playChime(found.theme.primary);
      setSelectedProject(found);
      setActiveProjectTheme(found.theme);
    }
  };

  return (
    <div 
      id="onlinefirst-app-root"
      className="min-h-screen text-slate-100 flex flex-col justify-between selection:bg-indigo-500/30 selection:text-indigo-200 relative overflow-x-hidden transition-colors duration-700"
      style={{
        backgroundColor: variantConfig.bgBase
      }}
    >
      {/* Living Multi-Element 3D Spatial Environment with Synaptic Network & Dynamic Environmental Accent Shift */}
      <IntelligentBackground 
        currentSection={currentSection}
        variantConfig={variantConfig}
        activeMethodStage={activeMethodStage}
        activeProjectTheme={selectedProject?.theme || activeProjectTheme}
      />

      {/* Sleek Header Navigation with Variant Switcher & Audio Controls */}
      <HeaderNav 
        currentSection={currentSection}
        onNavigate={(sec) => {
          setCurrentSection(sec);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        variantConfig={variantConfig}
        onToggleVariant={handleToggleVariant}
      />

      {/* Main Screen Router */}
      <main id="onlinefirst-main-content" className="relative z-10 flex-1 flex flex-col">
        {currentSection === 'home' && (
          <HeroSection 
            onNavigate={(sec) => {
              setCurrentSection(sec);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onSelectProject={(proj) => {
              setSelectedProject(proj);
              setActiveProjectTheme(proj.theme);
            }}
            variantConfig={variantConfig}
            onToggleVariant={handleToggleVariant}
            onProjectThemeChange={(theme) => setActiveProjectTheme(theme)}
          />
        )}

        {currentSection === 'work' && (
          <ProjectExplorer 
            onSelectProject={(proj) => {
              setSelectedProject(proj);
              setActiveProjectTheme(proj.theme);
            }}
            variantConfig={variantConfig}
          />
        )}

        {currentSection === 'capabilities' && (
          <CapabilitiesSection 
            onSelectProjectByName={handleSelectProjectByName}
            accentColor={variantConfig.primaryAccent}
          />
        )}

        {currentSection === 'method' && (
          <MethodSection 
            onHoverStage={(stageIdx) => setActiveMethodStage(stageIdx)}
            accentColor={variantConfig.primaryAccent}
          />
        )}

        {currentSection === 'lab' && (
          <LabSection 
            accentColor={variantConfig.primaryAccent}
          />
        )}

        {currentSection === 'start' && (
          <StartProjectSection 
            accentColor={variantConfig.primaryAccent}
            onNavigateHome={() => {
              setCurrentSection('home');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          />
        )}
      </main>

      {/* Global Interactive Project Inspector Modal */}
      <ProjectDetailModal 
        project={selectedProject} 
        onClose={() => setSelectedProject(null)} 
      />

      {/* Footer Navigation Dock */}
      <FooterBar 
        currentSection={currentSection}
        onNavigate={(sec) => {
          setCurrentSection(sec);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        accentColor={variantConfig.primaryAccent}
      />
    </div>
  );
}
