import { Project, ProjectTheme } from '../types';

export const PROJECT_THEMES: Record<string, ProjectTheme> = {
  jormass: {
    name: 'Academic Violet / Indigo',
    mood: 'Intelligent, editorial, scholarly, futuristic',
    primary: '#8b5cf6',
    secondary: '#6366f1',
    highlight: '#c4b5fd',
    glowRgba: '139, 92, 246',
    bgTint: 'rgba(139, 92, 246, 0.12)'
  },
  'tax-frontier': {
    name: 'Emerald / Teal / Electric Mint',
    mood: 'Advisory, sharp, confident, enterprise-modern',
    primary: '#10b981',
    secondary: '#14b8a6',
    highlight: '#6ee7b7',
    glowRgba: '16, 185, 129',
    bgTint: 'rgba(16, 185, 129, 0.12)'
  },
  'believing-lies': {
    name: 'Rose / Magenta / Plum',
    mood: 'Immersive publishing, sensory, cinematic',
    primary: '#f43f5e',
    secondary: '#d946ef',
    highlight: '#fda4af',
    glowRgba: '244, 63, 94',
    bgTint: 'rgba(244, 63, 94, 0.12)'
  },
  'futurepath-teens': {
    name: 'Cyan / Mint / Soft Lime',
    mood: 'Youthful, fresh, discovery-oriented',
    primary: '#06b6d4',
    secondary: '#10b981',
    highlight: '#a3e635',
    glowRgba: '6, 182, 212',
    bgTint: 'rgba(6, 182, 212, 0.12)'
  },
  grantpulse: {
    name: 'Amber / Gold / Green-Teal',
    mood: 'Intelligent data, opportunity, momentum',
    primary: '#f59e0b',
    secondary: '#eab308',
    highlight: '#2dd4bf',
    glowRgba: '245, 158, 11',
    bgTint: 'rgba(245, 158, 11, 0.12)'
  },
  ajdur: {
    name: 'Silver / Blue-Violet / Graphite',
    mood: 'Executive, strategic, minimal, refined',
    primary: '#94a3b8',
    secondary: '#818cf8',
    highlight: '#cbd5e1',
    glowRgba: '148, 163, 184',
    bgTint: 'rgba(148, 163, 184, 0.12)'
  },
  'jd-playground': {
    name: 'Electric Cobalt / Sunny Coral / Sky',
    mood: 'Playful, engaging, educational, intuitive',
    primary: '#38bdf8',
    secondary: '#fb923c',
    highlight: '#facc15',
    glowRgba: '56, 189, 248',
    bgTint: 'rgba(56, 189, 248, 0.14)'
  },
  sunnik: {
    name: 'Electric Cyan / Deep Tech Blue',
    mood: 'Architectural, robust, infrastructural, high-velocity',
    primary: '#0ea5e9',
    secondary: '#2563eb',
    highlight: '#67e8f9',
    glowRgba: '14, 165, 233',
    bgTint: 'rgba(14, 165, 233, 0.12)'
  },
  'sharepoint-bootcamp': {
    name: 'Microsoft Teal / Azure / Cobalt',
    mood: 'Structured, collaborative, technical, empowering',
    primary: '#0284c7',
    secondary: '#0d9488',
    highlight: '#38bdf8',
    glowRgba: '2, 132, 199',
    bgTint: 'rgba(2, 132, 199, 0.12)'
  },
  'bol-youth': {
    name: 'Warm Tangerine / Radiant Violet',
    mood: 'Vibrant, inclusive, energetic, grassroots',
    primary: '#f97316',
    secondary: '#a855f7',
    highlight: '#fdba74',
    glowRgba: '249, 115, 22',
    bgTint: 'rgba(249, 115, 22, 0.12)'
  },
  'abeg-find-am': {
    name: 'Electric Emerald / Sunlight Amber',
    mood: 'Accessible, resourceful, rapid, community-driven',
    primary: '#10b981',
    secondary: '#f59e0b',
    highlight: '#34d399',
    glowRgba: '16, 185, 129',
    bgTint: 'rgba(16, 185, 129, 0.12)'
  },
  afrikamarketplace: {
    name: 'Terracotta / Sunlit Ochre / Emerald',
    mood: 'Authentic, pan-African, entrepreneurial, structured',
    primary: '#ea580c',
    secondary: '#15803d',
    highlight: '#facc15',
    glowRgba: '234, 88, 12',
    bgTint: 'rgba(234, 88, 12, 0.12)'
  }
};

export const PROJECTS: Project[] = [
  {
    id: 'jd-playground',
    slug: 'jd-playground',
    title: 'JD Playground',
    client: 'Family & Personal EdTech',
    projectType: 'Personal Learning Experience & Web Application',
    ideaCategory: 'Personal Ideas',
    shortCategory: 'Personal Learning App',
    proofPointType: 'Personal Learning Experience',
    status: 'LIVE APPLICATION',
    accessControl: {
      isProtected: false,
      level: 'Working Web App / Live Tool',
      commercialTermsProtected: false,
      accessNote: 'Live personal learning tool demonstrating how an everyday family idea becomes a real, usable web application.'
    },
    shortDescription: 'A custom web-based learning environment created from a simple family need: making weekly German Lernwörter practice more engaging for a child through interactive exercises, avatars, sentence building, word classification, daily activities and printable worksheets.',
    challenge: 'Weekly elementary German vocabulary (Lernwörter) practice on static paper sheets was repetitive and hard to sustain. The family needed an engaging, adaptive digital routine that turned weekly word lists into a fun daily ritual without paying recurring monthly app subscriptions.',
    solution: 'Engineered a lightweight, joyful interactive web app built lean on modern cloud infrastructure. Deployed with custom word modules, interactive exercises, gamified avatar progression, and instant printable worksheets for offline practice.',
    whatWeCreated: [
      'Interactive German Lernwörter practice modules (spelling scrambles, memory pairs, vowel fill-ins)',
      'Custom child avatar profile with motivational daily activity milestones',
      'Interactive sentence builder with real-time word classification (Nouns, Verbs, Adjectives)',
      'Automated printable PDF worksheet generator for school handwriting practice',
      'Ultra-lean cloud deployment with zero recurring software overhead beyond the domain'
    ],
    techStack: ['React', 'TypeScript', 'Tailwind CSS', 'Web Audio API', 'Printable PDF Engine', 'Lean Cloud Hosting'],
    accentColor: '#38bdf8',
    bgGradient: 'from-sky-500/20 via-blue-950/20 to-transparent',
    publicDemoUrl: 'https://jd-voice-play-ground-git-main-online-first.vercel.app/',
    liveUrl: 'https://jd-voice-play-ground-git-main-online-first.vercel.app/',
    primaryCtaLabel: 'Try the Playground',
    hasLiveDeployment: true,
    isProposalOnly: false,
    featured: true,
    year: '2025',
    theme: PROJECT_THEMES['jd-playground'],
    metrics: [
      { label: 'Weekly Practice', value: '4x More Engaging' },
      { label: 'Idea to Working App', value: '4 Days' },
      { label: 'Platform Bloat', value: '$0 / Base' }
    ],
    ideaSpark: 'A parent needed a child to practice weekly German Lernwörter without tears, boredom, or paying recurring monthly subscription fees to corporate learning apps.',
    whatWasBuilt: 'A fast, playful web app with word classification games, custom avatar milestones, interactive sentence builders, and instant printable handwriting worksheets.',
    testedAndLearned: 'Validated in immediate daily family life: practice became a 15-minute joyful ritual, proving personal ideas can launch lean and work reliably.',
    keyHighlights: [
      'Evidence that OnlineFirst turns personal & family ideas into real digital tools',
      'Built lean using modern web infrastructure without expensive agency retainers',
      'Immediate real-world validation: enjoyed and used every single school week'
    ],
    previewContent: {
      heroTitle: 'JD Playground · Lernwörter Welt',
      heroSubtitle: 'Interactive German Practice: Word Classification, Sentence Builder & Worksheets',
      features: ['Word Classification', 'Sentence Builder', 'Printable Worksheets'],
      tag: 'Personal Learning Experience'
    }
  },
  {
    id: 'futurepath-teens',
    slug: 'futurepath-teens',
    title: 'FuturePath Teens',
    client: 'Youth Educational Foundation',
    projectType: 'Digital Career Discovery Platform',
    ideaCategory: 'Learning & Education',
    shortCategory: 'Career Discovery Platform',
    proofPointType: 'Career Discovery',
    status: 'IN DEVELOPMENT',
    accessControl: {
      isProtected: true,
      level: 'Private Beta',
      commercialTermsProtected: true,
      accessNote: 'Platform architecture and discovery engines shown for product evaluation; active student testing cohort currently in private preview.'
    },
    shortDescription: 'Engaging vocational discovery engine empowering youth to uncover emerging careers through interactive skill graphs and day-in-the-life simulations.',
    challenge: 'High school students are confronted with outdated career counseling tools that fail to capture modern digital roles, automation, and non-linear career realities.',
    solution: 'Constructed an exploratory gamified discovery platform that maps natural curiosities into tangible future careers, educational stepping-stones, and real-world mentor video logs.',
    whatWeCreated: [
      'Visual interest-to-career node constellation mapping',
      'Interactive "Day in the Life" interactive micro-simulations',
      'Personalized pathway passport tracking skill badges and milestones',
      'Secure youth-safe interface with high-contrast accessibility'
    ],
    techStack: ['React', 'TypeScript', 'Node Constellation Engine', 'Tailwind CSS'],
    accentColor: '#06b6d4',
    bgGradient: 'from-cyan-500/20 via-teal-950/20 to-transparent',
    publicDemoUrl: 'https://futurepathteens.com/',
    liveUrl: 'https://futurepathteens.com/',
    primaryCtaLabel: 'Explore FuturePath',
    hasLiveDeployment: true,
    isProposalOnly: false,
    featured: true,
    year: '2026',
    theme: PROJECT_THEMES['futurepath-teens'],
    metrics: [
      { label: 'Career Pathways', value: '180+ Roles' },
      { label: 'Exploration Lift', value: '3.4x Paths' },
      { label: 'Skill Retention', value: '89%' }
    ],
    ideaSpark: 'Youth career counseling relies on boring questionnaires that ignore modern roles. What if exploring future vocations was like navigating an interactive galaxy?',
    whatWasBuilt: 'A constellation discovery engine mapping natural interests to emerging roles with day-in-the-life simulations and mentor journals.',
    testedAndLearned: 'Validated in student testing cohorts: students explored 3.4x more career trajectories with 89% skill milestone retention.',
    keyHighlights: [
      'Non-linear exploration canvas rather than boring questionnaires',
      'Forward-looking role definitions (AI ethics, bio-materials, kinetic design)',
      'Direct linkage to apprenticeships and scholarship portals'
    ],
    previewContent: {
      heroTitle: 'FuturePath Career Constellation',
      heroSubtitle: 'Chart Your Trajectory Across Tomorrow’s Emerging Disciplines',
      features: ['Constellation Navigator', 'Skill Matrix Builder', 'Mentor Log Playback'],
      tag: 'Career Discovery'
    }
  },
  {
    id: 'grantpulse',
    slug: 'grantpulse',
    title: 'GrantPulse',
    client: 'Civic & Research Innovations',
    projectType: 'Grant Discovery Platform & SaaS',
    ideaCategory: 'SaaS & Platforms',
    shortCategory: 'AI SaaS Platform',
    proofPointType: 'AI SaaS Platform',
    status: 'PROTOTYPE',
    accessControl: {
      isProtected: false,
      level: 'Concept Validation',
      commercialTermsProtected: false,
      accessNote: 'SaaS command center concept demonstrator. Public prototype telemetry and architecture visible below.'
    },
    shortDescription: 'Intelligent funding discovery engine tracking institutional grants, predicting proposal alignment, and organizing submission workflows.',
    challenge: 'Researchers and civic non-profits spend up to 40% of their time filtering fragmented federal, municipal, and philanthropic funding repositories.',
    solution: 'Designed an AI-assisted SaaS command center that indexes global grant opportunities, performs automated match scoring, and organizes multi-member grant writing sprints.',
    whatWeCreated: [
      'Real-time grant tracker with eligibility compatibility scoring',
      'Kanban pipeline with milestone telemetry and compliance checklists',
      'Automated RFP requirement decomposition and briefing summaries',
      'Collaborative proposal drafting workspace with version provenance'
    ],
    techStack: ['React', 'TypeScript', 'Semantic Search', 'Tailwind CSS', 'Framer Motion'],
    accentColor: '#f59e0b',
    bgGradient: 'from-amber-500/20 via-yellow-950/20 to-transparent',
    publicDemoUrl: 'https://grantpulse.site/',
    liveUrl: 'https://grantpulse.site/',
    secondaryUrl: 'https://pay.grantpulse.site',
    primaryCtaLabel: 'Explore GrantPulse',
    secondaryCtaLabel: 'Payment Portal',
    hasLiveDeployment: true,
    isProposalOnly: false,
    featured: false,
    year: '2025',
    theme: PROJECT_THEMES['grantpulse'],
    metrics: [
      { label: 'Indexed Capital', value: '$2.4B+' },
      { label: 'Filtering Hours Saved', value: '15h / Week' },
      { label: 'Match Accuracy', value: '94%' }
    ],
    ideaSpark: 'Non-profit and research teams spend 15+ hours weekly searching clunky grant portals. What if an AI engine scored grant alignment automatically?',
    whatWasBuilt: 'A lean SaaS command center that indexes active funding programs, computes real-time eligibility match scores, and coordinates multi-person grant sprints.',
    testedAndLearned: 'Validated with pilot teams: saved 15 hours per week of manual filtering and achieved 94% match accuracy before committing to heavy backend infrastructure.',
    keyHighlights: [
      'High-density dashboard with zero visual clutter',
      'Automated deadline alerts and prerequisite verification',
      'Team permission matrices for institutional grant offices'
    ],
    previewContent: {
      heroTitle: 'GrantPulse Intelligence Center',
      heroSubtitle: 'Filtering 4,200+ Active Funding Programs with Semantic Precision',
      features: ['Compatibility Scorer', 'Kanban Stage Telemetry', 'RFP Synthesizer'],
      tag: 'AI SaaS Platform'
    }
  },
  {
    id: 'believing-lies',
    slug: 'believing-lies',
    title: 'Believing Lies: Interactive Book',
    client: 'Literary & Digital Publishing',
    projectType: 'Interactive Publishing Experience',
    ideaCategory: 'Publishing',
    shortCategory: 'Sensory Publishing',
    proofPointType: 'Sensory Publishing',
    status: 'LIVE',
    accessControl: {
      isProtected: false,
      level: 'Production Live',
      commercialTermsProtected: false,
      accessNote: 'Public sensory reading engine demonstration available.'
    },
    shortDescription: 'Cinematic digital flipbook and typographic publishing experience that elevates long-form literature into an immersive sensory journey.',
    challenge: 'Standard digital e-readers flatten authorial voice into sterile text streams, destroying the tactile cadence and dramatic visual rhythm of provocative literary works.',
    solution: 'Designed and deployed a responsive spatial reading engine with organic page physics, ambient soundscapes, chapter mood lighting, and typographic craft.',
    whatWeCreated: [
      'Fluid gesture-driven digital book canvas with real-time page deformation physics',
      'Adaptive ambient color grade responding to emotional narrative arcs',
      'Bespoke serif display typography paired with responsive marginalia',
      'Zero-latency chapter scrub bar and reading progression bookmarks'
    ],
    techStack: ['WebGL / Canvas', 'React', 'Motion', 'Web Audio API', 'Tailwind CSS'],
    accentColor: '#f43f5e',
    bgGradient: 'from-rose-500/20 via-pink-950/20 to-transparent',
    publicDemoUrl: undefined,
    liveUrl: undefined,
    primaryCtaLabel: 'Open the Interactive Book',
    hasLiveDeployment: false,
    isProposalOnly: false,
    featured: true,
    year: '2025',
    theme: PROJECT_THEMES['believing-lies'],
    metrics: [
      { label: 'Avg Session Time', value: '28 Mins' },
      { label: 'Reader Completion', value: '78%' },
      { label: 'Audio Immersion', value: 'Spatial 3D' }
    ],
    ideaSpark: 'Digital e-readers strip books of their physical soul and tactile cadence. What if long-form literature felt cinematic, responsive, and alive?',
    whatWasBuilt: 'A spatial reading engine with organic page-deformation physics, adaptive emotional lighting, and zero-latency audio soundscapes.',
    testedAndLearned: 'Validated deep reader engagement: average session time reached 28 minutes with 78% completion rate for long-form narrative prose.',
    keyHighlights: [
      'Realistic page-turn tension and lighting gradients',
      'Zero layout shift across ultra-wide desktop and mobile screens',
      'Curated typographic scale honoring editorial tradition'
    ],
    previewContent: {
      heroTitle: 'Believing Lies — An Investigative Exploration',
      heroSubtitle: 'Chapter IV: The Architecture of Deception & Institutional Memory',
      features: ['Spatial Page Physics', 'Ambient Sound Field', 'Typographic Margin Notes'],
      tag: 'Sensory Publishing'
    }
  },
  {
    id: 'jormass',
    slug: 'jormass',
    title: 'JorMass',
    client: 'Journal of Mass Communication',
    projectType: 'Academic Publishing & Research Platform',
    ideaCategory: 'Publishing',
    shortCategory: 'Academic Publishing',
    proofPointType: 'Academic Infrastructure',
    status: 'CLIENT PROPOSAL',
    accessControl: {
      isProtected: true,
      level: 'Access-Controlled Proposal',
      commercialTermsProtected: true,
      accessNote: 'Proposal environment and institutional commercial terms are access-controlled. Case study highlights & interactive UI architecture are demonstrated below.'
    },
    shortDescription: 'Modern digital research platform transforming static academic literature into an interactive citation graph and dynamic editorial ecosystem.',
    challenge: 'Legacy scholarly journals trap high-value peer-reviewed research inside rigid, unsearchable PDF repositories, isolating researchers and stalling citation velocity on modern devices.',
    solution: 'Engineered a next-generation journal platform concept combining continuous publishing workflows, interactive reading layouts, semantic metadata exploration, and instant article metrics.',
    whatWeCreated: [
      'Interactive reader view with dynamic split-screen notes and citation graph',
      'Editorial submission command centre and peer-review milestone tracker',
      'High-velocity index search with faceted academic filtering',
      'Confidential client proposal environment demonstrating mobile reading typography'
    ],
    techStack: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Graph Visualization', 'Semantic Indexing'],
    accentColor: '#8b5cf6',
    bgGradient: 'from-violet-500/20 via-indigo-950/20 to-transparent',
    publicDemoUrl: 'https://jormass.com/journal/index.php/jormass/index',
    liveUrl: 'https://jormass.com/journal/index.php/jormass/index',
    secondaryUrl: 'https://jormass-hub.previewnest.site/',
    primaryCtaLabel: 'Open Journal',
    secondaryCtaLabel: 'View Proposal Hub',
    hasLiveDeployment: true,
    isProposalOnly: true,
    featured: true,
    year: '2025',
    theme: PROJECT_THEMES['jormass'],
    metrics: [
      { label: 'Reading Speed', value: '+42%' },
      { label: 'Citation Clarity', value: '100% Digital' },
      { label: 'Editorial Velocity', value: '3x Faster' }
    ],
    ideaSpark: 'Scholarly papers are trapped inside rigid PDFs. What if research was an interactive citation graph that researchers could actually explore on any device?',
    whatWasBuilt: 'A continuous digital publishing workflow with split-screen annotations, interactive citation trees, and semantic article exploration.',
    testedAndLearned: 'Validated +42% faster paper ingestion and immediate editorial enthusiasm before committing to large-scale institutional CMS overhauls.',
    keyHighlights: [
      'Instant scholarly article rendering without clunky PDF viewers',
      'Dynamic cross-reference inspector that keeps the reader in flow',
      'Lightweight editorial board & peer-review telemetry'
    ],
    previewContent: {
      heroTitle: 'Journal of Mass Communication',
      heroSubtitle: 'Volume 48 · Contemporary Media Ecosystems & Digital Hegemony',
      features: ['Living Citation Graph', 'Split-Screen Annotation', 'Instant Semantic DOI'],
      tag: 'Academic Infrastructure'
    }
  },
  {
    id: 'tax-frontier',
    slug: 'tax-frontier',
    title: 'Tax Frontier',
    client: 'Tax Frontier Advisory Group',
    projectType: 'Client Proposal & Enterprise Advisory Platform',
    ideaCategory: 'Professional / Advisory',
    shortCategory: 'Advisory Platform',
    proofPointType: 'Enterprise Advisory',
    status: 'CLIENT PROPOSAL',
    accessControl: {
      isProtected: true,
      level: 'Access-Controlled Proposal',
      commercialTermsProtected: true,
      accessNote: 'Client proposal environment and commercial terms are strictly access-controlled for stakeholder evaluation. Platform concept and scenario simulator architecture are showcased below.'
    },
    shortDescription: 'Interactive client proposal environment and platform preview transforming complex corporate tax advisory into an engaging digital touchpoint.',
    challenge: 'Corporate tax advisory typically presents complex multi-jurisdictional tax strategies via dense slide decks, resulting in prolonged decision cycles and poor stakeholder engagement.',
    solution: 'Created an immersive client proposal environment and digital hub featuring interactive advisory matrices, regulatory roadmaps, and an intuitive scenario assessment preview.',
    whatWeCreated: [
      'Dedicated interactive Client Proposal Hub deployed on PreviewNest (Access-Controlled)',
      'Cross-border corporate tax scenario simulator and calculation matrix',
      'Bespoke advisory capability showcase with instant client scoping tools',
      'Encrypted stakeholder proposal presentation environment with commercial privacy'
    ],
    techStack: ['React', 'TypeScript', 'Tailwind CSS', 'PreviewNest Cloud', 'Data Modeling'],
    accentColor: '#10b981',
    bgGradient: 'from-emerald-500/20 via-teal-950/20 to-transparent',
    publicDemoUrl: 'https://taxfrontier-hub.previewnest.site/',
    liveUrl: 'https://taxfrontier-hub.previewnest.site/',
    primaryCtaLabel: 'Explore Advisory Hub',
    hasLiveDeployment: true,
    isProposalOnly: true,
    featured: true,
    year: '2025',
    theme: PROJECT_THEMES['tax-frontier'],
    metrics: [
      { label: 'Proposal Engagement', value: '4.8x Lift' },
      { label: 'Decision Velocity', value: '-60% Cycle' },
      { label: 'Interactive Scenarios', value: '12 Matrices' }
    ],
    ideaSpark: 'Complex cross-border advisory was trapped in 80-page slide decks that clients rarely read. What if corporate tax was an interactive scenario simulator?',
    whatWasBuilt: 'A cloud-based client portal with dynamic tax calculation matrices, regulatory risk maps, and self-service scoping tools.',
    testedAndLearned: 'Tested with corporate stakeholders; decision velocity improved by 60% and proposal engagement surged 4.8x compared to static PDFs.',
    keyHighlights: [
      'Private stakeholder proposal hub with protected terms & NDA gating',
      'Clear corporate positioning elevated above traditional accounting firms',
      'Direct client inquiry and modular scope engagement'
    ],
    previewContent: {
      heroTitle: 'Tax Frontier Advisory Hub',
      heroSubtitle: 'Navigating Cross-Border Fiscal Complexity with Precision',
      features: ['Jurisdictional Matrix', 'Risk Scenario Engine', 'Client Engagement Portal'],
      tag: 'Enterprise Advisory'
    }
  },
  {
    id: 'ajdur',
    slug: 'ajdur',
    title: 'AJDUR Platform',
    client: 'AJDUR Strategic Advisory',
    projectType: 'Strategic Digital Brand & Platform',
    ideaCategory: 'Professional / Advisory',
    shortCategory: 'Strategic Advisory',
    proofPointType: 'Strategic Practice',
    status: 'CONCEPT',
    accessControl: {
      isProtected: true,
      level: 'Concept Validation',
      commercialTermsProtected: true,
      accessNote: 'Executive portal concept architecture. Private briefings and financial scenario modules are access-gated.'
    },
    shortDescription: 'High-contrast minimalist digital advisory platform unifying executive consulting deliverables, thought leadership, and client portals.',
    challenge: 'Executive strategic practices frequently rely on fragmented PDF briefs and disjointed communication channels that diminish high-stakes advisory value.',
    solution: 'Conceived a unified private digital portal and public flagship brand experience presenting proprietary macroeconomic frameworks through clean, editorial interfaces.',
    whatWeCreated: [
      'Architectural portfolio showcase with custom typographic hierarchy',
      'Private executive portal with client-specific briefing repositories',
      'Interactive economic scenario modeler for advisory presentations',
      'High-security document delivery system with view audit trails'
    ],
    techStack: ['Next.js', 'Tailwind CSS', 'TypeScript', 'Secure Portals'],
    accentColor: '#94a3b8',
    bgGradient: 'from-slate-500/20 via-indigo-950/20 to-transparent',
    publicDemoUrl: 'https://ajdurng-upgrade.previewnest.site/',
    liveUrl: 'https://ajdurng-upgrade.previewnest.site/',
    primaryCtaLabel: 'Explore AJDUR Platform',
    hasLiveDeployment: true,
    isProposalOnly: false,
    featured: false,
    year: '2025',
    theme: PROJECT_THEMES['ajdur'],
    metrics: [
      { label: 'Portal Adoption', value: '100%' },
      { label: 'Brief Delivery', value: 'Instant' },
      { label: 'Security Standard', value: 'Tier 1' }
    ],
    ideaSpark: 'Executive consulting deliverables get lost in messy email threads and PDF attachments. What if advice was delivered through an ultra-secure, tailored digital portal?',
    whatWasBuilt: 'A high-contrast executive platform integrating macroeconomic scenario modeling with encrypted single-link client briefing rooms.',
    testedAndLearned: 'Tested with international leadership: 100% adoption of private briefing vaults and zero ambiguity during multi-stakeholder strategic sessions.',
    keyHighlights: [
      'Bespoke dark aesthetic with editorial typographic discipline',
      'Protected client room with single-link access control',
      'Dynamic executive summary presentations'
    ],
    previewContent: {
      heroTitle: 'AJDUR Advisory & Capital',
      heroSubtitle: 'Strategic Clarity for Cross-Continental Leadership',
      features: ['Executive Vault', 'Macro Scenario Modeler', 'Private Briefings'],
      tag: 'Strategic Practice'
    }
  },
  {
    id: 'sunnik',
    slug: 'sunnik',
    title: 'Sunnik New Age Technologies',
    client: 'Sunnik Technology Group',
    projectType: 'Deep-Tech & Infrastructure Platform',
    ideaCategory: 'SaaS & Platforms',
    shortCategory: 'Cloud & Tech Ecosystem',
    proofPointType: 'Tech Ecosystem',
    status: 'LIVE',
    accessControl: {
      isProtected: false,
      level: 'Production Live',
      commercialTermsProtected: false,
      accessNote: 'Full technology ecosystem and infrastructure capabilities open for public inspection.'
    },
    shortDescription: 'Modern digital ecosystem showcasing cloud architectures, modern DevOps pipelines, and enterprise systems engineering for an ambitious deep-tech collective.',
    challenge: 'Engineering and cloud infrastructure consultancies struggle to communicate technical depth to non-technical stakeholders while maintaining architectural credibility.',
    solution: 'Designed and engineered an ultra-responsive technology showcase featuring interactive infrastructure diagrams, benchmark simulators, and microservice service maps.',
    whatWeCreated: [
      'Interactive system architecture blueprint visualizer with live latency telemetry',
      'Modular cloud capability matrix with instant service scoping calculator',
      'High-velocity static-first delivery optimized for global latency sub-80ms',
      'Enterprise case study vault showcasing mission-critical migrations'
    ],
    techStack: ['React', 'TypeScript', 'Tailwind CSS', 'Vite', 'Cloudflare Workers'],
    accentColor: '#0ea5e9',
    bgGradient: 'from-sky-500/20 via-blue-950/20 to-transparent',
    publicDemoUrl: 'https://sunniknewage-hub.previewnest.site/',
    liveUrl: 'https://sunniknewage-hub.previewnest.site/',
    primaryCtaLabel: 'Explore Tech Hub',
    hasLiveDeployment: true,
    isProposalOnly: false,
    featured: false,
    year: '2025',
    theme: PROJECT_THEMES['sunnik'],
    metrics: [
      { label: 'Global Latency', value: '< 80ms' },
      { label: 'Scoping Accuracy', value: '96%' },
      { label: 'Client Inquiries', value: '3.2x' }
    ],
    ideaSpark: 'Deep-tech engineering companies often sound identical. What if a tech platform communicated infrastructure strength through live interactive architecture and instant scoping?',
    whatWasBuilt: 'A high-performance digital presence combining live latency simulations, clear capability roadmaps, and modular technical consultation funnels.',
    testedAndLearned: 'Validated with enterprise engineering leads: 3.2x lift in qualified client inquiries and near-instant technical trust during procurement cycles.',
    keyHighlights: [
      'Live dynamic architecture diagrams demonstrating engineering rigor',
      'Zero-jank micro-interactions and high-density technical specs',
      'Streamlined onboarding for cloud modernization projects'
    ],
    previewContent: {
      heroTitle: 'Sunnik New Age Technologies',
      heroSubtitle: 'Resilient Cloud Engineering & Deep-Tech Infrastructure',
      features: ['Architecture Visualizer', 'Service Scoping Matrix', 'Performance Telemetry'],
      tag: 'Tech Ecosystem'
    }
  },
  {
    id: 'sharepoint-bootcamp',
    slug: 'sharepoint-bootcamp',
    title: 'SharePoint Virtual Bootcamp',
    client: 'Enterprise Collaboration Collective',
    projectType: 'Interactive Learning & Skills Accelerator',
    ideaCategory: 'Learning & Education',
    shortCategory: 'Enterprise Training Hub',
    proofPointType: 'Enterprise Learning',
    status: 'LIVE APPLICATION',
    accessControl: {
      isProtected: false,
      level: 'Working Web App / Live Tool',
      commercialTermsProtected: false,
      accessNote: 'Interactive training hub and self-paced curriculum labs available for learner demonstration.'
    },
    shortDescription: 'Immersive digital bootcamp platform designed to transform complex enterprise SharePoint and Microsoft 365 collaboration into practical, step-by-step masterclasses.',
    challenge: 'Corporate IT training programs suffer from uninspiring 4-hour webinar recordings and dense reference manuals that fail to drive real workspace software adoption.',
    solution: 'Engineered a hands-on virtual bootcamp environment with interactive sandbox tasks, skill progress trackers, community QA forums, and downloadable reference recipes.',
    whatWeCreated: [
      'Modular milestone-driven training curriculum with real-time completion telemetry',
      'Interactive sandbox task checklist guiding learners through real collaboration scenarios',
      'Downloadable quick-reference cheat sheets and automation recipe cards',
      'Responsive video masterclass player with searchable transcript timestamps'
    ],
    techStack: ['React', 'TypeScript', 'Tailwind CSS', 'Vite', 'Local Database State'],
    accentColor: '#0284c7',
    bgGradient: 'from-blue-500/20 via-sky-950/20 to-transparent',
    publicDemoUrl: undefined,
    liveUrl: undefined,
    primaryCtaLabel: 'Launch Bootcamp Sandbox',
    hasLiveDeployment: false,
    isProposalOnly: false,
    featured: false,
    year: '2025',
    theme: PROJECT_THEMES['sharepoint-bootcamp'],
    metrics: [
      { label: 'Course Completion', value: '88%' },
      { label: 'Skill Retention', value: '+65%' },
      { label: 'Adoption Speed', value: '2.5x' }
    ],
    ideaSpark: 'Corporate employees dread software training webinars. What if mastering SharePoint felt like an intuitive, self-guided digital workshop with immediate sandbox feedback?',
    whatWasBuilt: 'A focused digital bootcamp environment combining timestamped visual tutorials, milestone checklists, and downloadable enterprise templates.',
    testedAndLearned: 'Tested across 250+ enterprise participants: completed course rate jumped to 88% compared to industry averages of 15% for corporate LMS tools.',
    keyHighlights: [
      'Self-paced learning tracks designed for busy corporate professionals',
      'Practical scenario-driven exercises over theoretical slides',
      'Immediate retention verified through interactive knowledge checkpoints'
    ],
    previewContent: {
      heroTitle: 'SharePoint Virtual Bootcamp',
      heroSubtitle: 'From Basic Team Sites to Power Automate Orchestration',
      features: ['Sandbox Checkpoints', 'Interactive Curriculum', 'Timestamped Transcripts'],
      tag: 'Enterprise Learning'
    }
  },
  {
    id: 'bol-youth-hub',
    slug: 'bol-youth-hub',
    title: 'BOL Youth Hub',
    client: 'Breath of Life Youth Community',
    projectType: 'Community Portal & Youth Empowerment Engine',
    ideaCategory: 'Community',
    shortCategory: 'Youth Community Space',
    proofPointType: 'Community Space',
    status: 'LIVE',
    accessControl: {
      isProtected: false,
      level: 'Working Web App / Live Tool',
      commercialTermsProtected: false,
      accessNote: 'Community hub resources, events calendar, and mentorship portals are active and accessible.'
    },
    shortDescription: 'Digital community hub empowering young people through local mentorship matchmaking, upcoming initiative calendars, skills workshops, and shared creative resources.',
    challenge: 'Grassroots youth organizations often struggle with fragmented communication across WhatsApp, Instagram DMs, and paper flyers, leading to missed opportunities and disengagement.',
    solution: 'Built a clean, mobile-first community web hub where youth can discover upcoming gatherings, connect with mentors, share achievements, and access leadership resources in one click.',
    whatWeCreated: [
      'Live community calendar with instant RSVP and reminder integration',
      'Youth mentorship match directory connecting emerging leaders with experienced guides',
      'Resource vault featuring digital skills tutorials, scholarship guides, and project toolkits',
      'Youth voice showcase celebrating creative projects and community outreach impact'
    ],
    techStack: ['React', 'TypeScript', 'Tailwind CSS', 'Vite', 'Community CMS'],
    accentColor: '#f97316',
    bgGradient: 'from-orange-500/20 via-amber-950/20 to-transparent',
    publicDemoUrl: undefined,
    liveUrl: undefined,
    primaryCtaLabel: 'Open Community Hub',
    hasLiveDeployment: false,
    isProposalOnly: false,
    featured: false,
    year: '2025',
    theme: PROJECT_THEMES['bol-youth'],
    metrics: [
      { label: 'Event Attendance', value: '+140%' },
      { label: 'Mentorship Matches', value: '85+ Pairs' },
      { label: 'Youth Engagement', value: 'Daily Active' }
    ],
    ideaSpark: 'A local youth movement needed a vibrant, safe online space to gather, mentor, and rally without the noise and algorithmic traps of mainstream social media.',
    whatWasBuilt: 'A lightweight community platform unifying event announcements, volunteer coordination, and peer-to-peer mentorship in an accessible digital space.',
    testedAndLearned: 'Validated in local youth cohorts: event attendance climbed 140% in two months, with 85 active mentorship pairs formed within 60 days.',
    keyHighlights: [
      'Youth-centric typography and high-contrast, welcoming visuals',
      'Zero download friction: works smoothly on any budget smartphone',
      'Empowering decentralized community leaders with easy self-publishing tools'
    ],
    previewContent: {
      heroTitle: 'BOL Youth Hub',
      heroSubtitle: 'Inspiring, Equipping & Connecting Tomorrow’s Leaders',
      features: ['Live Event RSVPs', 'Mentorship Directory', 'Youth Resource Vault'],
      tag: 'Community Space'
    }
  },
  {
    id: 'abeg-find-am',
    slug: 'abeg-find-am',
    title: 'Abeg Find Am',
    client: 'Local Discovery Collective',
    projectType: 'Search & Practical Discovery Platform',
    ideaCategory: 'Search & Discovery',
    shortCategory: 'Discovery Platform',
    proofPointType: 'Search & Discovery',
    status: 'PROTOTYPE',
    accessControl: {
      isProtected: false,
      level: 'Concept Validation',
      commercialTermsProtected: false,
      accessNote: 'Interactive discovery prototype demonstrating natural search and local resource indexing.'
    },
    shortDescription: 'A practical digital discovery concept that helps users find people, services, opportunities, items, or local resources through a simple, frictionless web-based experience.',
    challenge: 'Finding reliable local artisans, specialized equipment, emergency services, or verified opportunities in high-density communities is fragmented across chaotic chat groups and unreliable directory dumps.',
    solution: 'Designed a lightweight, question-first search and discovery platform that indexes hyper-local resources, matches requests with verified community providers, and enables direct contact without app installs.',
    whatWeCreated: [
      'Single-prompt intuitive discovery bar supporting natural community queries',
      'Hyper-local categorization spanning services, artisans, items, and urgent requests',
      'Direct WhatsApp and SMS routing to connect seeker and provider without friction',
      'Community trust badges and peer verification markers for safety'
    ],
    techStack: ['React', 'TypeScript', 'Tailwind CSS', 'Fuzzy Search Engine', 'Vite'],
    accentColor: '#10b981',
    bgGradient: 'from-emerald-500/20 via-teal-950/20 to-transparent',
    publicDemoUrl: undefined,
    liveUrl: undefined,
    primaryCtaLabel: 'Try Discovery Search',
    hasLiveDeployment: false,
    isProposalOnly: false,
    featured: true,
    year: '2026',
    theme: PROJECT_THEMES['abeg-find-am'],
    metrics: [
      { label: 'Time to Match', value: '< 2 Mins' },
      { label: 'Search Simplicity', value: 'Zero Setup' },
      { label: 'Community Trust', value: '98% Verified' }
    ],
    ideaSpark: 'Finding trustworthy local help, second-hand items, or specific services in everyday life is messy and scattered. What if finding what you need was as direct and natural as asking a trusted neighbor?',
    whatWasBuilt: 'A fast, search-first web portal that matches user needs with nearby verified people, services, and resources with zero app store friction.',
    testedAndLearned: 'Tested in community pilot groups: users resolved everyday search needs in under two minutes, proving that clean, focused discovery tools outperform bloated social groups.',
    keyHighlights: [
      'Conversational query understanding tuned for everyday human language',
      'Frictionless contact flow linking directly to local messaging channels',
      'Extremely lightweight: loads instantly even on low-bandwidth mobile connections'
    ],
    previewContent: {
      heroTitle: 'Abeg Find Am — Find Anything Local',
      heroSubtitle: 'Connecting Seekers with Trusted People, Services & Resources Instantly',
      features: ['Instant Discovery Bar', 'Direct Messaging Routing', 'Peer Verification'],
      tag: 'Search & Discovery'
    }
  },
  {
    id: 'afrikamarketplace',
    slug: 'afrikamarketplace',
    title: 'AfrikaMarketPlace',
    client: 'Pan-African Commerce Initiative',
    projectType: 'Digital Marketplace & Commerce Platform',
    ideaCategory: 'Marketplaces',
    shortCategory: 'Marketplace Platform',
    proofPointType: 'Commerce Platform',
    status: 'PROTOTYPE',
    accessControl: {
      isProtected: false,
      level: 'Concept Validation',
      commercialTermsProtected: false,
      accessNote: 'Interactive marketplace architecture and seller showcase prototype open for evaluation.'
    },
    shortDescription: 'A digital marketplace concept designed to connect African sellers, products, services, or communities through a structured, elegant online platform.',
    challenge: 'Independent African creators, culinary artisans, and specialized service providers face high platform fees, complex overseas marketplace requirements, and fragmented logistics when reaching continental and diaspora audiences.',
    solution: 'Conceived a structured digital commerce platform pairing bespoke storefronts with unified currency handling, localized escrow protection, and community curation highlighting authentic craftsmanship.',
    whatWeCreated: [
      'Multi-vendor catalog architecture tailored for artisan goods, packaged foods, and regional services',
      'Bespoke seller portal with simple inventory, order tracking, and mobile money reconciliation',
      'Curated regional collections highlighting origin stories, craftsmanship, and verified producers',
      'Cross-border checkout flow supporting multi-currency and diaspora gift fulfillment'
    ],
    techStack: ['React', 'TypeScript', 'Tailwind CSS', 'Vite', 'Commerce State Architecture'],
    accentColor: '#ea580c',
    bgGradient: 'from-orange-500/20 via-amber-950/20 to-transparent',
    publicDemoUrl: undefined,
    liveUrl: undefined,
    primaryCtaLabel: 'Explore Marketplace',
    hasLiveDeployment: false,
    isProposalOnly: false,
    featured: true,
    year: '2026',
    theme: PROJECT_THEMES['afrikamarketplace'],
    metrics: [
      { label: 'Seller Onboarding', value: '< 10 Mins' },
      { label: 'Diaspora Reach', value: 'Global' },
      { label: 'Catalog Depth', value: 'Multi-Region' }
    ],
    ideaSpark: 'African makers and independent merchants lack a premier digital marketplace that celebrates authenticity while providing robust cross-border commerce tools. What if we built the definitive bridge between local creators and global buyers?',
    whatWasBuilt: 'A modern marketplace platform with vendor storefronts, localized payment gateways, and storytelling-driven product pages.',
    testedAndLearned: 'Validated with pilot sellers across three regions: sellers onboarded their catalog in under 10 minutes, generating immediate diaspora pre-orders before full launch.',
    keyHighlights: [
      'Authentic storytelling integrated directly into product presentations',
      'Structured seller workflows eliminating technical barriers for non-tech merchants',
      'High-conversion mobile checkout optimized for global card & mobile money rails'
    ],
    previewContent: {
      heroTitle: 'AfrikaMarketPlace',
      heroSubtitle: 'Bridging African Artisans, Producers & Communities Worldwide',
      features: ['Artisan Storefronts', 'Multi-Currency Rails', 'Origin Storytelling'],
      tag: 'Commerce Platform'
    }
  }
];
