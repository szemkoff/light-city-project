import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

const config: Config = {
  title: 'Light City Project',
  tagline: 'Anchoring a Higher-Consciousness Civilization',
  favicon: 'img/favicon.svg',

  url: 'https://szemkoff.github.io',
  baseUrl: '/light-city-project/',

  organizationName: 'szemkoff',
  projectName: 'light-city-project',

  onBrokenLinks: 'warn',

  stylesheets: [
    {
      href: 'https://api.fontshare.com/v2/css?f[]=zodiak@300,400,500&f[]=switzer@400,500,600&display=swap',
      type: 'text/css',
    },
  ],

  customFields: {
    formsEndpoint: process.env.FORMS_ENDPOINT_URL ?? '',
    // Fallback while the Google Sheet receiver is not set up yet.
    web3formsAccessKey: process.env.WEB3FORMS_ACCESS_KEY ?? '',
  },

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
    mermaid: {
      theme: {light: 'base', dark: 'dark'},
      options: {
        themeVariables: {
          primaryColor: '#fbf3e2',
          primaryBorderColor: '#c9a35a',
          primaryTextColor: '#2a2216',
          lineColor: '#8a5f17',
          fontFamily: 'Switzer, system-ui, sans-serif',
          fontSize: '14px',
        },
      },
    },
    image: 'img/light-city-vision-1.jpg',
    colorMode: {
      defaultMode: 'light',
      disableSwitch: false,
      respectPrefersColorScheme: false,
    },
    headTags: [
      {
        tagName: 'link',
        attributes: {
          rel: 'apple-touch-icon',
          href: '/img/apple-touch-icon.png',
        },
      },
    ],
    navbar: {
      title: 'Light City',
      logo: {
        alt: 'Light City',
        src: 'img/light-city-mark.svg',
        srcDark: 'img/light-city-mark-dark.svg',
        href: '/',
      },
      items: [
        // Same menu as the main pages (src/components/Site/index.tsx NAV)
        {to: '/about', label: 'Vision', position: 'right'},
        {to: '/explore', label: 'Explore', position: 'right'},
        {to: '/residents', label: 'Residents', position: 'right'},
        {to: '/investors', label: 'Investors', position: 'right'},
        {to: '/builders', label: 'Builders', position: 'right'},
        {to: '/researchers', label: 'Researchers', position: 'right'},
        {to: '/contact', label: 'Contact', position: 'right'},
        {
          type: 'docSidebar',
          sidebarId: 'tutorialSidebar',
          position: 'right',
          label: 'Docs',
          className: 'nav-docs',
        },
        {
          href: 'pathname:///light-city-project/#join',
          label: 'Join the founding circle',
          position: 'right',
          className: 'nav-cta',
          target: '_self',
        },
      ],
    },
    // Footer is rendered by src/theme/Footer (the shared SiteFooter)
    footer: {style: 'dark', links: []},
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
