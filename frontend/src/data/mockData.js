// Mock data for Light City website

export const projectStats = {
  visualDiagrams: 15,
  stageComplete: 85,
  developmentStages: 6,
  investmentRange: '$22M-$95M'
};

export const heroContent = {
  headline: 'Light City: Anchoring Higher-Consciousness Civilization',
  subheadline: 'A living blueprint for regenerative communities, sacred architecture, and unity consciousness',
  ctaButtons: [
    { text: 'Explore the Vision', link: '/about', type: 'primary' },
    { text: 'View Financial Model', link: '/investors', type: 'secondary' },
    { text: 'Get Involved', link: '/get-involved', type: 'tertiary' }
  ]
};

export const visionSnapshots = [
  {
    id: 1,
    icon: 'building',
    title: 'Sacred Architecture',
    description: '30-90m communosphere domes using proven CLT & BIPV technology',
    link: '/about'
  },
  {
    id: 2,
    icon: 'brain',
    title: 'Unity Consciousness',
    description: 'Research-grade protocols for consciousness field studies (TRL 1-3)',
    link: '/researchers'
  },
  {
    id: 3,
    icon: 'leaf',
    title: 'Regenerative Living',
    description: 'Zero-waste, renewable energy, permaculture food systems',
    link: '/builders'
  }
];

export const keyHighlights = [
  {
    id: 1,
    title: 'Proven Technology',
    description: 'Using commercially available technologies (TRL 7-9): Cross-Laminated Timber, Building-Integrated Photovoltaics, geodesic structures',
    stat: '85.4m tall CLT tower proven (Mjøstårnet, Norway)',
    image: '/images/clt-construction.jpg'
  },
  {
    id: 2,
    title: 'Phased Development',
    description: 'Start small (200 residents, 3 domes), scale systematically (Phase 2: 1,500 residents, Phase 3: 8,000+ residents)',
    stat: '2025-2031+ with clear milestones',
    image: '/images/development-phases.jpg'
  },
  {
    id: 3,
    title: 'Transparent Governance',
    description: 'Founder-led development (Stages 1-4) transitioning to community governance (Stages 5-6) with clear decision-making framework',
    stat: 'Community Council voting with 80% consent threshold',
    image: '/images/governance.jpg'
  },
  {
    id: 4,
    title: 'Investor-Ready',
    description: 'Complete financial model with 3 scenarios, sensitivity analysis, 8-12% IRR for impact investors',
    stat: 'Break-even at 180 residents',
    image: '/images/financial-dashboard.jpg'
  }
];

export const investorData = {
  keyStats: [
    { label: 'Target Capital Raise', value: '$35M-$55M', sublabel: 'Mid scenario' },
    { label: 'Impact Investor Returns', value: '8-12% IRR', sublabel: 'Patient capital' },
    { label: 'Construction Timeline', value: '2028-2031', sublabel: 'Phased approach' }
  ],
  financialScenarios: [
    {
      scenario: 'Low',
      capex: '$22.1M',
      opex: '$1.8M',
      capacity: 150,
      breakeven: 160
    },
    {
      scenario: 'Mid (Target)',
      capex: '$45M',
      opex: '$2.5M',
      capacity: 200,
      breakeven: 180
    },
    {
      scenario: 'High',
      capex: '$95.5M',
      opex: '$4.5M',
      capacity: 300,
      breakeven: 220
    }
  ],
  revenueBreakdown: [
    { source: 'Resident Fees', percentage: 60, amount: '$1.85M-$2.52M/year' },
    { source: 'Retreats', percentage: 20, amount: '$400K-$900K/year' },
    { source: 'Events/Agritourism', percentage: 10, amount: '$200K-$450K/year' },
    { source: 'Licensing', percentage: 10, amount: '$200K-$450K/year' }
  ],
  topRisks: [
    { name: 'Fire (wildfire zone)', likelihood: 'Medium', impact: 'Critical', mitigation: 'Fire-resistant materials, defensible space, insurance' },
    { name: 'Wind on Domes', likelihood: 'Medium', impact: 'High', mitigation: 'Engineering analysis, wind tunnel testing, reinforcement' },
    { name: 'Water Rights', likelihood: 'Medium', impact: 'High', mitigation: 'Legal review, well permits, backup sources' },
    { name: 'Budget Creep', likelihood: 'High', impact: 'High', mitigation: '20% contingency, phased approach, value engineering' },
    { name: 'Neighbor Pushback', likelihood: 'Medium', impact: 'Medium', mitigation: 'Community engagement, land use attorney, benefits sharing' }
  ]
};

export const residentData = {
  unitTypes: [
    {
      type: 'Tiny Home',
      size: '200-300 sf',
      monthlyFee: '$500-$700',
      annual: '$6K-$8.4K',
      features: ['Shared facilities', 'Minimalist design', 'Community living'],
      availability: 50
    },
    {
      type: 'Studio',
      size: '400-500 sf',
      monthlyFee: '$700-$950',
      annual: '$8.4K-$11.4K',
      features: ['Private bath', 'Kitchenette', 'Work space'],
      availability: 80
    },
    {
      type: '1-Bedroom',
      size: '600-800 sf',
      monthlyFee: '$950-$1,300',
      annual: '$11.4K-$15.6K',
      features: ['Full kitchen', 'Private living', 'Storage'],
      availability: 50
    },
    {
      type: '2-Bedroom',
      size: '900-1,200 sf',
      monthlyFee: '$1,300-$1,700',
      annual: '$15.6K-$20.4K',
      features: ['Family-friendly', 'Shared living', 'Two baths'],
      availability: 20
    }
  ],
  includedAmenities: [
    'All utilities (electricity, water, internet)',
    '10-15 communal meals per month',
    'Wellness access (meditation, yoga, sauna)',
    'Events and workshops',
    'Maintenance and repairs',
    'Community governance participation'
  ],
  dailySchedule: [
    { time: '6:00 AM', activity: 'Wake naturally (circadian lighting)' },
    { time: '7:00 AM', activity: 'Morning meditation (optional, temple)' },
    { time: '8:00 AM', activity: 'Communal breakfast (2-3x/week)' },
    { time: '9:00 AM', activity: 'Work (remote, on-site studios, or external)' },
    { time: '12:00 PM', activity: 'Lunch (shared kitchen or private)' },
    { time: '5:00 PM', activity: 'Community activities (workshops, sports, art)' },
    { time: '7:00 PM', activity: 'Dinner (communal 2-3x/week)' },
    { time: '8:00 PM', activity: 'Evening ceremony or socializing' },
    { time: '10:00 PM', activity: 'Quiet hours begin' }
  ]
};

export const builderData = {
  communosphereSpecs: {
    phase1: '3 domes @ 30-45m diameter (100-150 ft)',
    structure: 'CLT frame + steel nodes, or tensegrity geodesic',
    glazing: 'BIPV + insulated panels (R-30+ walls, R-50+ roof)',
    capacity: '80-120 residents per dome',
    trl: '7-8 (proven globally)'
  },
  spireSpecs: {
    height: '60-120m (200-400 ft) light/acoustic tower',
    structure: 'Steel/CLT hybrid',
    functions: 'Ceremonial, acoustic resonance, solar PV (200-500 kWp)',
    trl: '4-5 (tall timber towers proven to 85m)'
  },
  technologies: [
    { name: 'CLT', status: 'Commercial', trl: '8-9', cost: '$$', suppliers: 'Structurlam, KLH, Binderholz' },
    { name: 'Geodesic Domes', status: 'Commercial', trl: '7-8', cost: '$$', suppliers: 'Pacific Domes, Timberline' },
    { name: 'BIPV', status: 'Commercial', trl: '6-7', cost: '$$$', suppliers: 'Tesla Solar Roof, ClearVue' },
    { name: 'Flow Batteries', status: 'Pilot', trl: '5-6', cost: '$$$', suppliers: 'ESS Inc., Redflow' },
    { name: 'Vertical Farming', status: 'Commercial', trl: '7-8', cost: '$$', suppliers: 'AeroFarms, Plenty' }
  ],
  timeline: [
    { phase: 'Phase 1', duration: '18-24 months', details: '3 domes, 200 residents, 2-5 MWp solar' },
    { phase: 'Phase 2', duration: '36-48 months', details: '6-12 domes, 1,500 residents, 5-15 MWp solar' },
    { phase: 'Phase 3', duration: 'Long-term', details: '12+ domes, 8,000+ residents, 15-50 MWp solar' }
  ]
};

export const researcherData = {
  researchAreas: [
    {
      title: 'Consciousness Field Studies',
      trl: 'TRL 1-2',
      hypothesis: 'Coherent consciousness fields measurable via biosensors',
      methods: 'HRV, EEG, heart-brain coherence, group coherence',
      status: 'Seeking university partnerships, IRB approval'
    },
    {
      title: 'Acoustic Resonance & Well-Being',
      trl: 'TRL 2-3',
      hypothesis: 'Specific frequencies (Schumann, Solfeggio) enhance well-being',
      methods: 'RT60 measurement, SPL monitoring, listener studies',
      status: 'Pilot studies planned (Stage 3-4)'
    },
    {
      title: 'Biophilic Design & Health',
      trl: 'TRL 5-6',
      hypothesis: 'Nature-integrated spaces improve mental/physical health',
      methods: 'Stress markers, sleep quality, cognitive performance',
      status: 'Well-established field, replication studies'
    },
    {
      title: 'Regenerative Agriculture',
      trl: 'TRL 7-8',
      hypothesis: 'Agroforestry sequesters more carbon than conventional farming',
      methods: 'Soil carbon testing, biomass measurement, lifecycle analysis',
      status: 'Proven technology, optimization studies'
    }
  ],
  instrumentation: [
    { category: 'Physical Energy', tools: 'Revenue-grade meters, inverter monitoring, battery BMS, weather station' },
    { category: 'Acoustic/Resonance', tools: 'Spectrum analyzer, RT60 measurement, SPL meters, frequency monitor' },
    { category: 'Consciousness/Biosensors', tools: 'Wearable biosensors (Oura, Whoop, Muse), EEG, HRV monitors' },
    { category: 'Agriculture/Ecology', tools: 'Soil carbon testing, biomass measurement, water quality, biodiversity surveys' }
  ]
};

export const delphininspiration = {
  comparison: [
    { aspect: 'Spire', delphin: '40,000 ft (12 km)', lightCity: '60-300m (200-1,000 ft)' },
    { aspect: 'Communospheres', delphin: '600-1,200 ft, 10K people', lightCity: '30-90m, 80-400 people' },
    { aspect: 'Technology', delphin: 'Advanced consciousness-matter', lightCity: 'Proven: CLT, BIPV, geodesic' },
    { aspect: 'Status', delphin: 'Aspirational reference', lightCity: 'Buildable, investor-ready' }
  ]
};

export const timelineData = [
  { quarter: 'Q4 2025', milestone: 'Complete Stage 1 (Foundation)', progress: 85 },
  { quarter: 'Q2 2026', milestone: 'Complete Stage 2 (Design)', progress: 0 },
  { quarter: 'Q4 2026', milestone: 'Complete Stage 3 (Digital)', progress: 0 },
  { quarter: 'Q4 2027', milestone: 'Complete Stage 4 (Community)', progress: 0 },
  { quarter: 'Q1 2028', milestone: 'Begin Stage 5 (Physical) - Capital raise', progress: 0 },
  { quarter: 'Q4 2029', milestone: 'Construction complete', progress: 0 },
  { quarter: 'Q2 2031', milestone: 'Break-even achieved', progress: 0 }
];
