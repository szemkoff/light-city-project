// One menu for the main pages, the homepage and the docs (docusaurus.config.ts mirrors it).
export type MenuItem = {to: string; label: string; children?: {to: string; label: string}[]};

export const VISION_SUB = [
  {to: '/about', label: 'Vision & philosophy'},
  {to: '/trust', label: 'Living here, honestly'},
  {to: '/resources', label: 'Resources'},
];

export const EXPLORE_SUB = [
  {to: '/explore', label: 'All topics'},
  {to: '/homes', label: 'Homes'},
  {to: '/city', label: 'The city'},
  {to: '/technology', label: 'Technology'},
  {to: '/journey', label: 'The transition'},
  {to: '/locations', label: 'Locations'},
];

export const NAV: MenuItem[] = [
  {to: '/about', label: 'Vision', children: VISION_SUB},
  {to: '/explore', label: 'Explore', children: EXPLORE_SUB},
  {to: '/residents', label: 'Residents'},
  {to: '/investors', label: 'Investors'},
  {to: '/builders', label: 'Builders'},
  {to: '/researchers', label: 'Researchers'},
];
