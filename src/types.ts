export type SectionView = 'home' | 'work' | 'capabilities' | 'method' | 'lab' | 'start';

export type VisualVariant = 'variant-a' | 'variant-b';
export type GreenVariant = VisualVariant;

export interface ProjectTheme {
  name: string;
  mood: string;
  primary: string;
  secondary: string;
  highlight: string;
  glowRgba: string;
  bgTint: string;
}

export interface VisualVariantConfig {
  id: VisualVariant;
  name: string;
  tagline: string;
  headline: string;
  subheadline: string;
  bgBase: string; // Deep night / black-plum / dark indigo base
  plumDark: string;
  lilacAccent: string; // Soft lilac
  blushPink: string; // Blush pink
  lavenderPale: string; // Pale lavender
  periwinkleMuted: string; // Muted periwinkle
  icyBlue: string; // Icy blue highlights
  glowRgba: string; // e.g. '192, 132, 252'
  glowGlow: string;
  particleDensity: number;
  floatingElementsCount: number;
  // Aliases for component compatibility
  primaryAccent: string;
  limeAccent: string;
  sageAccent: string;
}

export type GreenVariantConfig = VisualVariantConfig;

export type ColorThemeId = 'ice-mint' | 'electric-violet' | 'coral-glow';

export interface ColorTheme {
  id: ColorThemeId;
  name: string;
  label: string;
  mood: string;
  bgBase: string;
  primaryAccent: string;
  secondaryAccent: string;
  glowRgba: string;
  glowGlow: string;
}

export type ProjectStatus =
  | 'LIVE'
  | 'LIVE APPLICATION'
  | 'CONCEPT'
  | 'CLIENT PROPOSAL'
  | 'PROTOTYPE'
  | 'IN DEVELOPMENT'
  | 'ARCHIVED DEMO';

export type DeviceView = 'desktop' | 'tablet' | 'mobile';

export type IdeaCategory =
  | 'Learning & Education'
  | 'Community'
  | 'Publishing'
  | 'Marketplaces'
  | 'Search & Discovery'
  | 'SaaS & Platforms'
  | 'Professional / Advisory'
  | 'Personal Ideas';

export interface Project {
  id: string;
  slug: string;
  title: string;
  client: string;
  projectType: string;
  ideaCategory: IdeaCategory;
  shortCategory?: string;
  proofPointType: string;
  status: ProjectStatus;
  accessControl: {
    isProtected: boolean;
    level: 'Public Demo' | 'Access-Controlled Proposal' | 'Production Live' | 'Private Beta' | 'Concept Validation' | 'Working Web App / Live Tool';
    commercialTermsProtected: boolean;
    accessNote: string;
  };
  shortDescription: string;
  challenge: string;
  solution: string;
  whatWeCreated: string[];
  techStack: string[];
  accentColor: string; // Hex color for lighting & highlights
  bgGradient: string;
  publicDemoUrl?: string;
  liveUrl?: string; // Main public domain or verified deployment URL
  secondaryUrl?: string; // Secondary demo / proposal hub / checkout portal URL
  primaryCtaLabel?: string; // e.g. "Try the Playground", "Explore FuturePath"
  secondaryCtaLabel?: string; // e.g. "View Proposal Hub", "Payment Portal"
  hasLiveDeployment?: boolean; // true if a live verified URL exists; false for "Prototype Preview Coming Soon"
  isProposalOnly?: boolean;
  featured: boolean;
  year: string;
  theme: ProjectTheme;
  metrics?: { label: string; value: string }[];
  ideaSpark?: string;
  whatWasBuilt?: string;
  testedAndLearned?: string;
  keyHighlights: string[];
  previewContent: {
    heroTitle: string;
    heroSubtitle: string;
    features: string[];
    tag: string;
  };
}

export interface Capability {
  id: string;
  title: string;
  subtitle?: string;
  tagline?: string;
  description: string;
  architecturalApproach?: string;
  deliverables: string[];
  proofProjects?: string[];
  featuredProjects?: string[];
  icon: string;
  accent: string;
}

export interface MethodStage {
  number?: string;
  step?: number | string;
  title: string;
  tagline: string;
  duration?: string;
  focus?: string;
  description: string;
  deliverables: string[];
}

export interface LabExperiment {
  id: string;
  title: string;
  category: string;
  status: string;
  description: string;
  insight?: string;
  tags: string[];
  interactionModel?: string;
  interactiveType?: string;
}
