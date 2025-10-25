import React from 'react';
import ComponentCreator from '@docusaurus/ComponentCreator';

export default [
  {
    path: '/light-city-project/blog',
    component: ComponentCreator('/light-city-project/blog', '863'),
    exact: true
  },
  {
    path: '/light-city-project/blog/archive',
    component: ComponentCreator('/light-city-project/blog/archive', '7de'),
    exact: true
  },
  {
    path: '/light-city-project/blog/authors',
    component: ComponentCreator('/light-city-project/blog/authors', '02f'),
    exact: true
  },
  {
    path: '/light-city-project/blog/authors/all-sebastien-lorber-articles',
    component: ComponentCreator('/light-city-project/blog/authors/all-sebastien-lorber-articles', 'aec'),
    exact: true
  },
  {
    path: '/light-city-project/blog/authors/yangshun',
    component: ComponentCreator('/light-city-project/blog/authors/yangshun', 'a24'),
    exact: true
  },
  {
    path: '/light-city-project/blog/first-blog-post',
    component: ComponentCreator('/light-city-project/blog/first-blog-post', '5e4'),
    exact: true
  },
  {
    path: '/light-city-project/blog/long-blog-post',
    component: ComponentCreator('/light-city-project/blog/long-blog-post', 'dfd'),
    exact: true
  },
  {
    path: '/light-city-project/blog/mdx-blog-post',
    component: ComponentCreator('/light-city-project/blog/mdx-blog-post', '069'),
    exact: true
  },
  {
    path: '/light-city-project/blog/tags',
    component: ComponentCreator('/light-city-project/blog/tags', 'cf6'),
    exact: true
  },
  {
    path: '/light-city-project/blog/tags/docusaurus',
    component: ComponentCreator('/light-city-project/blog/tags/docusaurus', 'fe5'),
    exact: true
  },
  {
    path: '/light-city-project/blog/tags/facebook',
    component: ComponentCreator('/light-city-project/blog/tags/facebook', 'bc9'),
    exact: true
  },
  {
    path: '/light-city-project/blog/tags/hello',
    component: ComponentCreator('/light-city-project/blog/tags/hello', '84f'),
    exact: true
  },
  {
    path: '/light-city-project/blog/tags/hola',
    component: ComponentCreator('/light-city-project/blog/tags/hola', '243'),
    exact: true
  },
  {
    path: '/light-city-project/blog/welcome',
    component: ComponentCreator('/light-city-project/blog/welcome', '4b8'),
    exact: true
  },
  {
    path: '/light-city-project/markdown-page',
    component: ComponentCreator('/light-city-project/markdown-page', '742'),
    exact: true
  },
  {
    path: '/light-city-project/docs',
    component: ComponentCreator('/light-city-project/docs', '20a'),
    routes: [
      {
        path: '/light-city-project/docs',
        component: ComponentCreator('/light-city-project/docs', 'e28'),
        routes: [
          {
            path: '/light-city-project/docs',
            component: ComponentCreator('/light-city-project/docs', 'e50'),
            routes: [
              {
                path: '/light-city-project/docs/',
                component: ComponentCreator('/light-city-project/docs/', '860'),
                exact: true
              },
              {
                path: '/light-city-project/docs/',
                component: ComponentCreator('/light-city-project/docs/', 'ce9'),
                exact: true
              },
              {
                path: '/light-city-project/docs/CHANGELOG',
                component: ComponentCreator('/light-city-project/docs/CHANGELOG', '99d'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/light-city-project/docs/concepts/communospheres',
                component: ComponentCreator('/light-city-project/docs/concepts/communospheres', '673'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/light-city-project/docs/concepts/core-concepts',
                component: ComponentCreator('/light-city-project/docs/concepts/core-concepts', '165'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/light-city-project/docs/concepts/energy-systems',
                component: ComponentCreator('/light-city-project/docs/concepts/energy-systems', '7a2'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/light-city-project/docs/concepts/philosophy',
                component: ComponentCreator('/light-city-project/docs/concepts/philosophy', '5b3'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/light-city-project/docs/concepts/purpose-and-mission',
                component: ComponentCreator('/light-city-project/docs/concepts/purpose-and-mission', '992'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/light-city-project/docs/concepts/sacred-geometry',
                component: ComponentCreator('/light-city-project/docs/concepts/sacred-geometry', '3ca'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/light-city-project/docs/design/architecture',
                component: ComponentCreator('/light-city-project/docs/design/architecture', '6e0'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/light-city-project/docs/design/color-and-light',
                component: ComponentCreator('/light-city-project/docs/design/color-and-light', '40e'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/light-city-project/docs/design/layout-diagrams',
                component: ComponentCreator('/light-city-project/docs/design/layout-diagrams', '657'),
                exact: true
              },
              {
                path: '/light-city-project/docs/design/visual-language',
                component: ComponentCreator('/light-city-project/docs/design/visual-language', '4a6'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/light-city-project/docs/project/contributing',
                component: ComponentCreator('/light-city-project/docs/project/contributing', '55c'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/light-city-project/docs/project/development-stages',
                component: ComponentCreator('/light-city-project/docs/project/development-stages', '5ab'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/light-city-project/docs/project/project-structure',
                component: ComponentCreator('/light-city-project/docs/project/project-structure', '95b'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/light-city-project/docs/project/quick-start-guide',
                component: ComponentCreator('/light-city-project/docs/project/quick-start-guide', 'e2d'),
                exact: true
              },
              {
                path: '/light-city-project/docs/project/tools-and-workflows',
                component: ComponentCreator('/light-city-project/docs/project/tools-and-workflows', 'a66'),
                exact: true
              },
              {
                path: '/light-city-project/docs/research/bibliography',
                component: ComponentCreator('/light-city-project/docs/research/bibliography', 'c24'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/light-city-project/docs/research/open-questions',
                component: ComponentCreator('/light-city-project/docs/research/open-questions', '5b7'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/light-city-project/docs/START-HERE',
                component: ComponentCreator('/light-city-project/docs/START-HERE', '8e2'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/light-city-project/docs/technical/github-docusaurus-setup',
                component: ComponentCreator('/light-city-project/docs/technical/github-docusaurus-setup', '9d9'),
                exact: true
              }
            ]
          }
        ]
      }
    ]
  },
  {
    path: '/light-city-project/',
    component: ComponentCreator('/light-city-project/', '77a'),
    exact: true
  },
  {
    path: '*',
    component: ComponentCreator('*'),
  },
];
