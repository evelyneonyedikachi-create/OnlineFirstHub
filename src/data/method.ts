import { MethodStage } from '../types';

export const METHOD_STAGES: MethodStage[] = [
  {
    step: '01',
    number: '01',
    title: 'Unpack the Idea',
    tagline: 'Deconstruct the core ambition, target audience and what makes the idea tick.',
    description: 'We listen to the challenge you are trying to solve. Whether you are a parent wanting to make learning fun for your child, a founder testing a market hypothesis, an educator crafting a curriculum tool, or a company building an advisory portal, we isolate what truly matters to make the first version successful.',
    deliverables: [
      'Concept deconstruction & practical feature scope',
      'User scenario mapping (learners, founders, clients)',
      'Lean technical roadmap & infrastructure recommendations'
    ],
    duration: 'Stage 01',
    focus: 'Concept Clarity'
  },
  {
    step: '02',
    number: '02',
    title: 'Shape the Experience',
    tagline: 'Formulate an intuitive interface, tactile micro-interactions and visual character.',
    description: 'We shape the personality of the digital product. Rather than recycling generic templates, we create clean typography, responsive tactile layouts, and engaging visual feedback that make using the tool effortless and memorable.',
    deliverables: [
      'Interactive design tokens & responsive screen architecture',
      'Tactile micro-interaction & sound design specs',
      'Full-resolution layout flows for mobile, tablet & desktop'
    ],
    duration: 'Stage 02',
    focus: 'Experience Design'
  },
  {
    step: '03',
    number: '03',
    title: 'Build the First Version',
    tagline: 'Turn the concept into real, working software you can click, touch and use.',
    description: 'Ideas deserve more than static mockups. We write real, production-ready code early—delivering a functional, interactive first version so you can test real workflows, play with features, and experience the solution firsthand.',
    deliverables: [
      'Working web application with live interactive modules',
      'Clean TypeScript/React frontend & responsive UX',
      'Automated utility features (e.g. printable PDFs, audio feedback, calculation matrices)'
    ],
    duration: 'Stage 03',
    focus: 'Working Software'
  },
  {
    step: '04',
    number: '04',
    title: 'Launch Lean',
    tagline: 'Deploy on modern web infrastructure without unnecessary recurring platform costs.',
    description: 'We launch your project using modern, cost-efficient cloud infrastructure. In many cases, your initial running costs can be limited largely to your domain and any external services your specific idea requires. No multi-hundred dollar SaaS retainers or bloated hosting tiers before you need them.',
    deliverables: [
      'Custom domain configuration & SSL security',
      'Sub-second edge CDN deployment & zero-lag performance',
      'Lean hosting setup with near-zero initial idle overhead'
    ],
    duration: 'Stage 04',
    focus: 'Cost-Efficient Launch'
  },
  {
    step: '05',
    number: '05',
    title: 'Learn Before Scaling',
    tagline: 'Use real-world feedback to validate demand before investing in full-scale builds.',
    description: 'The real magic happens after launch. You put the tool in the hands of real users—children, students, team members, or paying customers. You gather genuine feedback, learn what works, and make informed decisions on when and how to expand.',
    deliverables: [
      'User feedback review & interaction telemetry',
      'Priority expansion roadmap for future features',
      'Seamless scaling pathway when the idea proves its value'
    ],
    duration: 'Stage 05 & Beyond',
    focus: 'Validated Scaling'
  }
];
