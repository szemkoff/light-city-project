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
      ],
    },
    {
      type: 'category',
      label: 'Project',
      items: [
        'project/contributing',
        'project/quick-start-guide',
      ],
    },
  ],
};

export default sidebars;
