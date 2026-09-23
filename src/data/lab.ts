import { LabExperiment } from '../types';

export const LAB_EXPERIMENTS: LabExperiment[] = [
  {
    id: 'exp-semantic-graph',
    title: 'Semantic Graph Navigator',
    category: 'AI Interfaces',
    status: 'ACTIVE EXPERIMENT',
    description: 'A non-hierarchical exploration engine that clusters research concepts organically using cosine similarity vectors instead of rigid dropdown menus.',
    interactiveType: 'neural',
    insight: 'Reduces time-to-discovery across dense knowledge archives by 64% by revealing unexpected cross-disciplinary relationships.',
    tags: ['Vector Embeddings', 'Force-Directed Graph', 'WebGL']
  },
  {
    id: 'exp-spatial-flipbook',
    title: 'Spatial Canvas Flipbook',
    category: 'Digital Publishing',
    status: 'PRODUCTION READY',
    description: 'Real-time cloth/paper deformation physics simulation on GPU, generating organic page curls with real-time shadow casting and ambient lighting.',
    interactiveType: 'spatial',
    insight: 'Restores the visceral delight of tactile editorial books to digital screens without sluggish PDF plugins.',
    tags: ['Deformation Mesh', 'Custom Shaders', 'Touch Gestures']
  },
  {
    id: 'exp-synesthetic-telemetry',
    title: 'Synesthetic Audio Data Engine',
    category: 'Sensory Feedback',
    status: 'RESEARCH PHASE',
    description: 'Translates real-time user interaction velocities and interface states into micro-tonal sine oscillations using the Web Audio API.',
    interactiveType: 'synesthetic',
    insight: 'Creates tactile sonic weight for abstract digital actions, improving user confidence during high-stakes financial operations.',
    tags: ['Web Audio API', 'Oscillator Nodes', 'Sonic UX']
  },
  {
    id: 'exp-proposal-configurator',
    title: 'Dynamic Proposal Synthesizer',
    category: 'Client Environments',
    status: 'INTERNAL TOOL',
    description: 'An interactive scoping matrix that allows enterprise stakeholders to toggle deliverables and instantly preview architectural impact, team composition, and deployment cadence.',
    interactiveType: 'proposal',
    insight: 'Replaces prolonged email negotiations with transparent, interactive mutual agreement environments.',
    tags: ['Reactive State', 'Live Estimation', 'PreviewNest Bridge']
  },
  {
    id: 'exp-predictive-microflow',
    title: 'Predictive Hover & Intent Pre-fetch',
    category: 'Performance & Flow',
    status: 'OPTIMIZATION LAB',
    description: 'Analyzes cursor trajectory vectors and deceleration curves to pre-render modal overlays and asset bundles 140ms before a user commits a click.',
    interactiveType: 'predictive',
    insight: 'Delivers perceived zero-latency responsiveness across complex multi-step application transitions.',
    tags: ['Vector Math', 'Pre-fetching', 'Zero Latency']
  }
];
