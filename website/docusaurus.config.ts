import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

const config: Config = {
  title: 'Light City Project',
  tagline: 'Anchoring a Higher-Consciousness Civilization',
  favicon: 'img/favicon.ico',

  url: 'https://szemkoff.github.io',
  baseUrl: '/light-city-project/',

  organizationName: 'szemkoff',
  projectName: 'light-city-project',

  onBrokenLinks: 'warn',

  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  presets: [
    [
      'classic',
      {
        docs: {
          sidebarPath: './sidebars.ts',
          editUrl: 'https://github.com/szemkoff/light-city-project/edit/main/',
        },
        blog: {
          showReadingTime: true,
          blogTitle: 'Light City Updates',
          blogDescription: 'Progress updates and insights on the Light City Project',
          feedOptions: {
            type: ['rss', 'atom'],
            xslt: true,
          },
          editUrl: 'https://github.com/szemkoff/light-city-project/edit/main/',
        },
        theme: {
          customCss: './src/css/custom.css',
        },
      } satisfies Preset.Options,
    ],
  ],

  markdown: {
    mermaid: true,
  },

  themes: ['@docusaurus/theme-mermaid'],

  themeConfig: {
    image: 'img/light-city-vision-1.jpg',
    colorMode: {
      respectPrefersColorScheme: true,
    },
    navbar: {
      title: 'Light City',
      logo: {
        alt: 'Light City Logo',
        src: 'img/logo.svg',
        href: '/',
      },
      items: [
        {
          type: 'docSidebar',
          sidebarId: 'tutorialSidebar',
          position: 'left',
          label: 'Documentation',
        },
        {to: '/blog', label: 'Updates', position: 'left'},
        {
          href: 'https://github.com/szemkoff/light-city-project',
          label: 'GitHub',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Documentation',
          items: [
            {
              label: 'Start Here',
              to: '/docs/START-HERE',
            },
            {
              label: 'Core Concepts',
              to: '/docs/concepts/core-concepts',
            },
            {
              label: 'Architecture',
              to: '/docs/design/architecture',
            },
          ],
        },
        {
          title: 'Project',
          items: [
            {
              label: 'Development Stages',
              to: '/docs/project/development-stages',
            },
            {
              label: 'Contributing',
              to: '/docs/project/contributing',
            },
          ],
        },
        {
          title: 'More',
          items: [
            {
              label: 'Updates',
              to: '/blog',
            },
            {
              label: 'GitHub',
              href: 'https://github.com/szemkoff/light-city-project',
            },
          ],
        },
      ],
      copyright: `Light City Project © ${new Date().getFullYear()}. Built with Docusaurus.`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
