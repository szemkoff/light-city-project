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
      ],
    },
    {
      type: 'category',
      label: 'Development',
      items: [
        'project/development-stages',
        'project/project-structure',
        'project/contributing',
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
    'CHANGELOG',
  ],
};

export default sidebars;
