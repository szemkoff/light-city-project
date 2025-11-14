import type {SidebarsConfig} from '@docusaurus/plugin-content-docs';

const sidebars: SidebarsConfig = {
  tutorialSidebar: [
    'START-HERE',
    {
      type: 'category',
      label: 'Vision & Philosophy',
      items: [
        'concepts/core-concepts',
        'concepts/philosophy',
        'concepts/purpose-and-mission',
      ],
    },
    {
      type: 'category',
      label: 'Sacred Design',
      items: [
        'design/architecture',
        'concepts/communospheres',
        'concepts/energy-systems',
        'concepts/sacred-geometry',
        'design/visual-language',
        'design/color-and-light',
        'design/layout-diagrams',
      ],
    },
    {
      type: 'category',
      label: 'Development',
      items: [
        'project/development-stages',
        'project/governance',
        'project/contribution-based-residency',
        'project/project-structure',
        'project/tools-and-workflows',
        'project/contributing',
        'project/quick-start-guide',
      ],
    },
    {
      type: 'category',
      label: 'Technical & Implementation',
      items: [
        'technical/technology-catalog',
        'technical/urban-retrofit-guide',
      ],
    },
    {
      type: 'category',
      label: 'Research & Resources',
      items: [
        'research/bibliography',
        'research/open-questions',
      ],
    },
    'INDEX',
  ],
};

export default sidebars;
