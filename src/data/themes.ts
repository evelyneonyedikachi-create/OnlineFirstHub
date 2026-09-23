import { ColorTheme, ColorThemeId } from '../types';

export const COLOR_THEMES: Record<ColorThemeId, ColorTheme> = {
  'ice-mint': {
    id: 'ice-mint',
    name: 'Ice Mint & Silver',
    label: 'Option A — Ice Mint',
    mood: 'Clean, futuristic, elegant, sleek',
    bgBase: '#040814',
    primaryAccent: '#2dd4bf', // Icy mint / aqua
    secondaryAccent: '#94a3b8', // Soft silver
    glowRgba: '45, 212, 191',
    glowGlow: 'rgba(45, 212, 191, 0.22)'
  },
  'electric-violet': {
    id: 'electric-violet',
    name: 'Electric Violet & Soft Blue',
    label: 'Option B — Electric Violet',
    mood: 'Intelligent, high-end, luxurious tech',
    bgBase: '#070512',
    primaryAccent: '#a855f7', // Electric violet
    secondaryAccent: '#60a5fa', // Soft blue
    glowRgba: '168, 85, 247',
    glowGlow: 'rgba(168, 85, 247, 0.22)'
  },
  'coral-glow': {
    id: 'coral-glow',
    name: 'Coral Glow & Cyan',
    label: 'Option C — Coral Glow',
    mood: 'Modern, editorial, bold design',
    bgBase: '#0a0810',
    primaryAccent: '#fb7185', // Soft coral / salmon glow
    secondaryAccent: '#38bdf8', // Pale cyan
    glowRgba: '251, 113, 133',
    glowGlow: 'rgba(251, 113, 133, 0.22)'
  }
};
