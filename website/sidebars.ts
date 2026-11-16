import type {SidebarsConfig} from '@docusaurus/plugin-content-docs';

// The library reads as one story: why → transition → city → technology →
// living together → roadmap → research. Numbers are canonical in at-a-glance.
const sidebars: SidebarsConfig = {
  tutorialSidebar: [
    'START-HERE',
    'at-a-glance',
    {
      type: 'category',
      label: '1 · Why: Vision',
      collapsed: false,
      items: [
        'concepts/core-concepts',
        'concepts/philosophy',
        'concepts/purpose-and-mission',
      ],
    },
    {
      type: 'category',
      label: '2 · The Transition',
      collapsed: false,
      items: ['concepts/the-transition'],
    },
    {
      type: 'category',
      label: '3 · The City',
      items: [
        'design/architecture',
        'design/organic-forms-and-materials',
        'design/light-on-the-land',
        'concepts/communospheres',
        'concepts/sacred-geometry',
        'design/visual-language',
        'design/color-and-light',
        'design/layout-diagrams',
      ],
    },
    {
      type: 'category',
      label: '4 · Technology',
      items: [
        'technical/technology-horizon',
        'concepts/energy-systems',
        'technical/technology-catalog',
        'technical/urban-retrofit-guide',
      ],
    },
    {
      type: 'category',
      label: '5 · Living Together',
      items: [
        'project/governance',
        'project/contribution-based-residency',
      ],
    },
    {
      type: 'category',
      label: '6 · Economy',
      items: ['project/economy-and-migration'],
    },
    {
      type: 'category',
      label: '7 · Roadmap',
      items: ['project/development-stages', 'project/site-locations'],
    },
    {
      type: 'category',
      label: '8 · Research',
      items: [
        'research/open-questions',
        'research/bibliography',
      ],
    },
    {
      type: 'category',
      label: '9 · Where the Idea Came From',
      items: ['concepts/the-archetype'],
    },
    {
      type: 'category',
      label: 'Contribute',
      items: [
        'project/contributing',
        'project/quick-start-guide',
        'project/project-structure',
        'project/tools-and-workflows',
      ],
    },
    'glossary',
    'INDEX',
  ],
};

export default sidebars;
