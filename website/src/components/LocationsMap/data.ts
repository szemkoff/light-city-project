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
    place: 'Taos to Ojo Caliente, United States',
    bestFor: 'Building with earth, legally, from day one.',
    img: 'loc-new-mexico',
    climate: [['Elevation', '~7,000 ft · 2,130 m'], ['Sun', '5.29 kWh/m²/day'], ['Rain', '~17 in/yr'], ['Hot water', '115–132°F wells']],
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
  },  {
    id: 'klamath-basin',
    n: '2',
    name: 'Klamath Basin',
    place: 'Klamath Falls, Oregon, United States',
    bestFor: 'Proven geothermal heat and a code friendly to cob and mass timber.',
    img: 'loc-klamath',
    climate: [['Elevation', '~4,100 ft · 1,250 m'], ['Sun', '4.72 kWh/m²/day'], ['Rain', '~23 in/yr'], ['Hot water', '200–220°F wells']],
    scores: [['Sun', 4], ['Water', 3], ['Geothermal', 5], ['Micro-hydro', 3], ['Earth code', 4], ['Land cost', 4], ['Climate risk', 2], ['Community', 3], ['Access', 3]],
    benefits: [
      'City geothermal district heating since 1981, serving 23 buildings and melting snow from sidewalks',
      'Oregon residential code includes an appendix for cob construction',
      'First state to allow tall mass-timber buildings',
      'Largest small-hydro potential among the western states studied',
    ],
    risks: [
      'Long-running conflict over Klamath water',
      'Wildfire and drought risk',
    ],
  },  {
    id: 'central-portugal',
    n: '3',
    name: 'Central Portugal',
    place: 'Viseu and São Pedro do Sul uplands, Portugal',
    bestFor: 'Spa-town geothermal heat, rain, rivers and open land rules.',
    img: 'loc-portugal',
    climate: [['Elevation', '~1,500 ft · 460 m'], ['Sun', '4.59 kWh/m²/day'], ['Rain', '~39 in/yr'], ['Hot water', '67°C district heat']],
    scores: [['Sun', 4], ['Water', 4], ['Geothermal', 4], ['Micro-hydro', 3], ['Earth code', 3], ['Land cost', 4], ['Climate risk', 2], ['Community', 3], ['Access', 4]],
    benefits: [
      'São Pedro do Sul already heats 13 hotels and 2 spas with 67°C geothermal water',
      'About 39 inches of rain a year and year-round upland rivers',
      'No nationality limits on buying land, for EU and non-EU founders alike',
      'Living rammed-earth (taipa) building tradition in Portugal',
    ],
    risks: [
      'Wildfire: the 2017 central Portugal fires killed at least 64 people',
      'Dry summers; store winter rain on site',
      'Rustic land in agricultural or ecological reserves is very hard to build on',
    ],
  },
  {
    id: 'granada-highlands',
    n: '4',
    name: 'Granada Highlands',
    place: 'Guadix and the Geopark of Granada, Spain',
    bestFor: 'Earth-sheltered living with centuries of proof, strong sun and cheap land.',
    img: 'loc-granada',
    climate: [['Elevation', '~3,000 ft · 925 m'], ['Sun', '5.06 kWh/m²/day'], ['Rain', '~13 in/yr'], ['Hot water', '34–44°C springs']],
    scores: [['Sun', 5], ['Water', 1], ['Geothermal', 3], ['Micro-hydro', 2], ['Earth code', 4], ['Land cost', 5], ['Climate risk', 3], ['Community', 3], ['Access', 4]],
    benefits: [
      'More than 2,000 inhabited cave homes in Guadix hold a steady 18–20°C all year',
      'Inside the UNESCO Geopark of Granada, with thousands of earth-sheltered homes nearby',
      'Hot springs at Graena (44°C) and Alicún (34°C); deep water may reach 80–90°C',
      'Strongest sun of the European options, about an hour from Granada',
    ],
    risks: [
      'Semi-arid: only about 13 inches of rain; water rights decide everything',
      'Summer heat near 40°C and frosty winters',
      'Building on rustic land needs regional approval; non-EU buyers need military permits only in listed zones',
    ],
  },
  {
    id: 'costa-rica-highlands',
    n: '5',
    name: 'Northern Costa Rica',
    place: 'Miravalles and Tenorio uplands, Guanacaste',
    bestFor: 'A nearly all-renewable grid, abundant water and a mild climate all year.',
    img: 'loc-costa-rica',
    climate: [['Elevation', '~1,700 ft · 530 m'], ['Sun', '5.25 kWh/m²/day'], ['Rain', '~57 in/yr'], ['Hot water', 'Geothermal field nearby']],
    scores: [['Sun', 5], ['Water', 5], ['Geothermal', 3], ['Micro-hydro', 4], ['Earth code', 2], ['Land cost', 3], ['Climate risk', 2], ['Community', 4], ['Access', 4]],
    benefits: [
      '97.3% of national electricity came from renewables in 2025',
      'Miravalles geothermal field (163.5 MWe) is in the same uplands',
      'Law 10086 allows renewable self-generation, including island-mode microgrids',
      'Foreigners can own titled land on the same terms as citizens',
    ],
    risks: [
      'Volcanic and seismic zone; earth walls need careful structural design',
      'Grid fell to 86% renewable in the 2024 El Niño drought',
      'Heavy rainy season; coastal strip is not ownable (stay inland)',
    ],
  },
];

export const ALSO = [
  {id: 'western-north-carolina', name: 'W. North Carolina', note: 'Rain and micro-hydro; Helene flood risk'},
  {id: 'central-mexico', name: 'San Miguel de Allende', note: 'Adobe and arts town; aquifer has no water left to allocate'},
  {id: 'boise', name: 'Boise, ID', note: 'Largest US municipal geothermal heating utility'},
];
