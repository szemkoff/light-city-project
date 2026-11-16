// Source of truth for the website: docs/project/site-locations.md
export type Region = {
  id: string;
  n: string;
  name: string;
  place: string;
  bestFor: string;
  img: string;
  climate: [string, string][];
  scores: [string, number][];
  benefits: string[];
  risks: string[];
};

export const CRITERIA = ['Sun', 'Water', 'Geothermal', 'Micro-hydro', 'Earth code', 'Land cost', 'Climate risk', 'Community', 'Access'];

export const REGIONS: Region[] = [
  {
    id: 'northern-new-mexico',
    n: '1',
    name: 'Northern New Mexico',
    place: 'Taos to Ojo Caliente',
    bestFor: 'Building with earth, legally, from day one.',
    img: 'loc-new-mexico',
    climate: [['Sun', '5.29 kWh/m²/day'], ['Rain', '~17 in/yr'], ['Hot water', '115–132°F wells']],
    scores: [['Sun', 5], ['Water', 2], ['Geothermal', 3], ['Micro-hydro', 1], ['Earth code', 5], ['Land cost', 4], ['Climate risk', 3], ['Community', 4], ['Access', 3]],
    benefits: [
      'State Earthen Building Materials Code covers adobe, rammed earth and compressed earth block',
      'Among the strongest sun in the country',
      'Rio Grande rift geothermal; Ojo Caliente already heats buildings with spring water',
      'Earthship community near Taos shows off-grid earth homes can be permitted',
    ],
    risks: [
      'Scarce water; acequia and well rights are contested',
      'Deep Pueblo and Hispano ties to the land: start by listening',
      '27 ft county height cap; the spire needs a special permit',
    ],
  },
  {
    id: 'san-luis-valley',
    n: '2',
    name: 'San Luis Valley',
    place: 'Crestone and Saguache County, Colorado',
    bestFor: 'Sun, low land cost and an existing contemplative community.',
    img: 'loc-san-luis',
    climate: [['Sun', '5.28 kWh/m²/day'], ['Rain', '~15 in/yr'], ['Hot water', '~200°F at depth']],
    scores: [['Sun', 5], ['Water', 2], ['Geothermal', 4], ['Micro-hydro', 2], ['Earth code', 3], ['Land cost', 5], ['Climate risk', 3], ['Community', 5], ['Access', 2]],
    benefits: [
      '"Land of Cool Sunshine", with 85+ MW of solar already built',
      'Named by NREL as one of Colorado’s two most promising geothermal areas',
      'Crestone hosts more than two dozen spiritual centers',
      'Some of the cheapest rural land in the state',
    ],
    risks: [
      'Very cold winters and strong wind',
      'Water tied to the Rio Grande Compact and a stressed aquifer',
      'Remote; no state earthen-building code',
    ],
  },
  {
    id: 'klamath-basin',
    n: '3',
    name: 'Klamath Basin',
    place: 'Klamath Falls, Southern Oregon',
    bestFor: 'Proven geothermal heat and a code friendly to cob and mass timber.',
    img: 'loc-klamath',
    climate: [['Sun', '4.72 kWh/m²/day'], ['Rain', '~23 in/yr'], ['Hot water', '200–220°F wells']],
    scores: [['Sun', 4], ['Water', 3], ['Geothermal', 5], ['Micro-hydro', 3], ['Earth code', 4], ['Land cost', 4], ['Climate risk', 2], ['Community', 3], ['Access', 3]],
    benefits: [
      'City geothermal district heating since 1981, serving 23 buildings and melting snow from sidewalks',
      'Oregon residential code includes an appendix for cob construction',
      'First state to allow tall mass-timber buildings',
      'Largest small-hydro potential of the four states',
    ],
    risks: [
      'Long-running conflict over Klamath water',
      'Wildfire and drought risk',
    ],
  },
  {
    id: 'western-north-carolina',
    n: '4',
    name: 'Western North Carolina',
    place: 'Asheville region, Blue Ridge Mountains',
    bestFor: 'Water, micro-hydro, a mild green climate and a wellness culture.',
    img: 'loc-carolina',
    climate: [['Sun', '4.39 kWh/m²/day'], ['Rain', '~53 in/yr'], ['Hot water', 'Heat pumps only']],
    scores: [['Sun', 3], ['Water', 5], ['Geothermal', 1], ['Micro-hydro', 5], ['Earth code', 2], ['Land cost', 3], ['Climate risk', 2], ['Community', 5], ['Access', 4]],
    benefits: [
      'About 53 inches of rain a year, the only option that clearly meets the water criterion',
      'ORNL found hundreds of dam-free micro-hydro sites in the mountains',
      'Regional airport, hospitals and a strong arts and wellness community',
    ],
    risks: [
      'Hurricane Helene (2024): ~14 in of rain in 3 days and ~2,000 landslides; build high, off floodplains',
      'Lowest sun of the four',
      'No deep geothermal; wet climate makes earth walls harder',
    ],
  },
];

export const ALSO = [
  {id: 'boise', name: 'Boise, ID', note: 'Largest US municipal geothermal heating utility'},
  {id: 'big-island', name: 'Big Island, HI', note: 'Geothermal power; costly land, lava risk'},
  {id: 'homestead', name: 'Homestead, FL', note: 'Home base; hurricanes, no geothermal or hydro'},
];
