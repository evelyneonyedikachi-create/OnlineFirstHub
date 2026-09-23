import { Capability } from '../types';

export const CAPABILITIES: Capability[] = [
  {
    id: 'lean-prototypes-validation',
    title: 'Lean Prototypes & First Versions',
    tagline: 'Working software to test an idea before spending tens of thousands.',
    description: 'We turn your idea into a working first version you can launch and test with real users. Using modern web infrastructure, running costs can be limited largely to your domain plus any external services your specific idea requires — allowing you to learn and validate before scaling.',
    deliverables: [
      'Interactive functional prototype deployed on a live domain',
      'User feedback & interaction telemetry integration',
      'Lean cloud infrastructure with minimal running overhead',
      'Clear roadmap from initial validation to production scale'
    ],
    architecturalApproach: 'Rapid component-driven architecture on modern cloud infrastructure, serverless functions, low-latency edge caching, and zero recurring platform bloat.',
    featuredProjects: ['JD Playground', 'Abeg Find Am', 'GrantPulse'],
    icon: 'Sparkles',
    accent: '#38bdf8'
  },
  {
    id: 'personal-learning-edtech',
    title: 'Personal Learning & Custom Tools',
    tagline: 'Custom web apps born from real-life family, teaching, or personal needs.',
    description: 'OnlineFirst is not just for corporations. We build custom web-based learning tools and personal utilities — like JD Playground, created to transform a child\'s weekly German practice into an engaging interactive experience with game exercises, avatar rewards, and printable worksheets.',
    deliverables: [
      'Bespoke interactive learning environments for children and students',
      'Adaptive exercise modules (word classification, puzzles, scrambles)',
      'Gamified progress systems with avatar customisation',
      'Automated printable PDF worksheet generators for offline practice'
    ],
    architecturalApproach: 'Lightweight React & Web Audio frameworks, mobile-responsive tactile touch inputs, zero-lag local persistence, and print-optimised style engines.',
    featuredProjects: ['JD Playground', 'FuturePath Teens', 'SharePoint Virtual Bootcamp'],
    icon: 'Layers',
    accent: '#fb923c'
  },
  {
    id: 'digital-experiences',
    title: 'Websites & Digital Experiences',
    tagline: 'Interactive web destinations for businesses, creators and ambitious initiatives.',
    description: 'We craft high-calibre digital destinations that communicate authority and captivate visitors. Moving far beyond generic agency templates, our environments combine editorial typographic discipline, cinematic depth, and micro-interactions that make ideas unforgettable.',
    deliverables: [
      'Flagship websites and brand platforms',
      'High-conversion launch environments and interactive showcases',
      'Institutional and academic publishing destinations',
      'Interactive portfolios, reports and digital monographs'
    ],
    architecturalApproach: 'React/Next.js frameworks paired with lightweight GPU shaders, sub-second edge routing, strict WCAG AA contrast, and zero layout shifts.',
    featuredProjects: ['JorMass', 'AJDUR Platform', 'BOL Youth Hub'],
    icon: 'Globe',
    accent: '#c084fc'
  },
  {
    id: 'digital-products',
    title: 'Web Apps & SaaS Platforms',
    tagline: 'Discovery engines, specialized workflow tools and user portals.',
    description: 'We turn complex processes into clean, modular digital software. From grant discovery engines to multi-tier SaaS platforms and digital marketplaces, our systems emphasize clear information hierarchy, speed, and robust fault-tolerant architecture.',
    deliverables: [
      'SaaS web applications and cloud dashboards',
      'Specialized enterprise workflow and data management tools',
      'Career exploration and vocational discovery engines',
      'Automated pipeline, reporting and analytics engines'
    ],
    architecturalApproach: 'Component-driven frontends with optimistic UI state, streaming data feeds, strict TypeScript contracts, and scalable cloud containerization.',
    featuredProjects: ['GrantPulse', 'AfrikaMarketPlace', 'Sunnik New Age Technologies'],
    icon: 'Cpu',
    accent: '#8b5cf6'
  },
  {
    id: 'client-proposal-experiences',
    title: 'Interactive Proposal Hubs',
    tagline: 'Live pitch environments and concept demonstrators that replace flat slide decks.',
    description: 'Static pitch decks and 40-page PDF proposals are often ignored. OnlineFirst replaces them with live, interactive client environments where prospective partners can test concepts, manipulate scenario matrices, and experience their future solution before signing.',
    deliverables: [
      'Custom client proposal environments (PreviewNest deployment)',
      'Interactive scope configurators and scenario calculators',
      'Private stakeholder presentation rooms with real-time telemetry',
      'Pre-contract concept prototypes that win high-stakes mandates'
    ],
    architecturalApproach: 'Rapid deployment micro-hubs with encrypted access, custom domain mapping, stakeholder engagement analytics, and responsive document presentation.',
    featuredProjects: ['Tax Frontier', 'JorMass'],
    icon: 'Layers',
    accent: '#10b981'
  },
  {
    id: 'interactive-publishing',
    title: 'Interactive Publishing',
    tagline: 'Immersive digital books, monographs, reports and spatial narratives.',
    description: 'Long-form thought leadership and investigative literature demand visceral sensory pacing. We pioneer digital publishing engines featuring tactile page-turn physics, adaptive typographic illumination, and integrated sound design.',
    deliverables: [
      'Spatial digital flipbooks and kinetic reading engines',
      'Audio-synced interactive investigative narratives',
      'Editorial monographs with rich multimedia marginalia',
      'Accessible multi-device reading modes with offline persistence'
    ],
    architecturalApproach: 'Canvas and WebGL rendering engines with realistic page deformation physics, Web Audio API ambient synthesis, and responsive CSS grid typesetting.',
    featuredProjects: ['Believing Lies'],
    icon: 'BookOpen',
    accent: '#f43f5e'
  }
];
