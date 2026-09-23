import { VisualVariant, VisualVariantConfig } from '../types';

export const GREEN_VARIANTS: Record<VisualVariant, VisualVariantConfig> = {
  'variant-a': {
    id: 'variant-a',
    name: 'Variant A — Refined Carbon & Iris',
    tagline: 'Start small. Test early. Scale what works.',
    headline: 'Turn your idea into something people can actually use.',
    subheadline: 'Web apps, websites, prototypes and interactive tools — built lean so you can test the idea before scaling it.',
    bgBase: '#090a0f', // Deep dark neutral obsidian/carbon
    plumDark: '#090a0f',
    lilacAccent: '#818cf8', // Primary brand accent: Luminous Electric Iris
    blushPink: '#38bdf8', // Secondary brand accent: Electric Cyan Frost
    lavenderPale: '#c7d2fe', // Soft muted iris
    periwinkleMuted: '#6366f1', // Indigo anchor
    icyBlue: '#e0f2fe', // Crisp silver highlight
    primaryAccent: '#818cf8', // Iris
    limeAccent: '#38bdf8', // Cyan
    sageAccent: '#94a3b8', // Neutral platinum slate
    glowRgba: '129, 140, 248',
    glowGlow: 'rgba(129, 140, 248, 0.18)', // Subdued, elegant glow
    particleDensity: 46, // Reduced density for clean starlight elegance
    floatingElementsCount: 6
  },
  'variant-b': {
    id: 'variant-b',
    name: 'Variant B — Architectural Graphite',
    tagline: 'Start small. Test early. Scale what works.',
    headline: 'Turn your idea into something people can actually use.',
    subheadline: 'Web apps, websites, prototypes and interactive tools — built lean so you can test the idea before scaling it.',
    bgBase: '#07080b', // Ultra-deep neutral carbon noir
    plumDark: '#07080b',
    lilacAccent: '#a5b4fc', // Primary: Silver-Iris
    blushPink: '#38bdf8', // Secondary: Crisp Cyan
    lavenderPale: '#e2e8f0', // Crisp silver
    periwinkleMuted: '#818cf8',
    icyBlue: '#f8fafc',
    primaryAccent: '#a5b4fc',
    limeAccent: '#38bdf8',
    sageAccent: '#cbd5e1',
    glowRgba: '165, 180, 252',
    glowGlow: 'rgba(165, 180, 252, 0.15)',
    particleDensity: 52,
    floatingElementsCount: 8
  }
};
