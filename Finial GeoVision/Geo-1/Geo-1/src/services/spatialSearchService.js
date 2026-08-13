// GeoVision Spatial Search Service
// Modular service for spatial queries across Abu Dhabi locations.
// Designed to easily connect to an AI service or GIS FeatureLayer backend.

export const ABU_DHABI_SPATIAL_DATASET = [
  // EDUCATION
  {
    id: 'edu-1',
    title: 'International School of Choueifat - Mushrif',
    category: 'Education',
    subcategory: 'Public Schools',
    lat: 24.4452,
    lon: 54.3981,
    address: 'Al Mushrif Zone 1, Abu Dhabi',
    description: 'Prominent SABIS curriculum school offering primary and secondary education.',
    rating: 4.8,
    openHours: '07:30 - 15:30'
  },
  {
    id: 'edu-2',
    title: 'Abu Dhabi Grammar School (Canada)',
    category: 'Education',
    subcategory: 'Public Schools',
    lat: 24.4891,
    lon: 54.3752,
    address: 'Tourist Club Area, Abu Dhabi',
    description: 'Nova Scotia Canadian curriculum school in central Abu Dhabi.',
    rating: 4.7,
    openHours: '07:30 - 15:30'
  },
  {
    id: 'edu-3',
    title: 'Brighton College Abu Dhabi',
    category: 'Education',
    subcategory: 'Public Schools',
    lat: 24.4372,
    lon: 54.4178,
    address: 'Bloom Gardens, Abu Dhabi',
    description: 'Top-tier British curriculum international school.',
    rating: 4.8,
    openHours: '07:30 - 16:00'
  },
  {
    id: 'edu-4',
    title: 'Cranleigh Abu Dhabi',
    category: 'Education',
    subcategory: 'Public Schools',
    lat: 24.5268,
    lon: 54.4385,
    address: 'Saadiyat Cultural District, Abu Dhabi',
    description: 'Award-winning British co-educational school on Saadiyat Island.',
    rating: 4.9,
    openHours: '07:30 - 16:00'
  },
  {
    id: 'edu-5',
    title: 'Al Yasmina Academy',
    category: 'Education',
    subcategory: 'Public Schools',
    lat: 24.4215,
    lon: 54.5428,
    address: 'Al Raha Gardens, Abu Dhabi',
    description: 'Premier British curriculum academy operating in Abu Dhabi.',
    rating: 4.6,
    openHours: '07:30 - 15:30'
  },
  {
    id: 'edu-6',
    title: 'GEMS World Academy Abu Dhabi',
    category: 'Education',
    subcategory: 'Private Schools',
    lat: 24.4691,
    lon: 54.3782,
    address: 'Fatima Bint Mubarak St, Abu Dhabi',
    description: 'IB World School empowering global leaders in science and arts.',
    rating: 4.7,
    openHours: '07:30 - 15:30'
  },
  {
    id: 'edu-7',
    title: 'American Community School of Abu Dhabi',
    category: 'Education',
    subcategory: 'Private Schools',
    lat: 24.4568,
    lon: 54.3512,
    address: 'Al Bateen, Abu Dhabi',
    description: 'Leading American college preparatory school in Abu Dhabi.',
    rating: 4.9,
    openHours: '07:30 - 16:00'
  },
  {
    id: 'edu-8',
    title: 'Khalifa University (SAN Campus)',
    category: 'Education',
    subcategory: 'Private Schools',
    lat: 24.4447,
    lon: 54.3986,
    address: 'Al Saada St, Zone 1, Abu Dhabi',
    description: 'Leading research university specializing in science, engineering, and medicine.',
    rating: 4.9,
    openHours: '08:00 - 18:00'
  },
  {
    id: 'edu-9',
    title: 'NYU Abu Dhabi',
    category: 'Education',
    subcategory: 'Private Schools',
    lat: 24.5235,
    lon: 54.4344,
    address: 'Saadiyat Marina District, Abu Dhabi',
    description: 'Liberal arts and research university campus located on Saadiyat Island.',
    rating: 4.9,
    openHours: '08:00 - 20:00'
  },
  {
    id: 'edu-10',
    title: 'Sorbonne University Abu Dhabi',
    category: 'Education',
    subcategory: 'Private Schools',
    lat: 24.4897,
    lon: 54.4082,
    address: 'Al Reem Island, Abu Dhabi',
    description: 'Higher education institution offering humanities, law, and science degrees.',
    rating: 4.7,
    openHours: '08:30 - 17:30'
  },

  // HEALTHCARE
  {
    id: 'health-1',
    title: 'Cleveland Clinic Abu Dhabi',
    category: 'Healthcare',
    subcategory: 'Hospitals',
    lat: 24.5028,
    lon: 54.3888,
    address: 'Al Maryah Island, Abu Dhabi',
    description: 'Multi-specialty hospital providing world-class tertiary medical care.',
    rating: 4.9,
    openHours: '24/7 Emergency & Inpatient'
  },
  {
    id: 'health-2',
    title: 'Sheikh Shakhbout Medical City (SSMC)',
    category: 'Healthcare',
    subcategory: 'Hospitals',
    lat: 24.3541,
    lon: 54.5367,
    address: 'Al Mafraq, Abu Dhabi',
    description: 'One of the UAE’s largest tertiary hospitals for complex medical cases.',
    rating: 4.7,
    openHours: '24/7 Emergency'
  },
  {
    id: 'health-3',
    title: 'Burjeel Hospital',
    category: 'Healthcare',
    subcategory: 'Hospitals',
    lat: 24.4697,
    lon: 54.3789,
    address: 'Al Najda St, Zone 1, Abu Dhabi',
    description: 'Premier private tertiary hospital specializing in advanced surgery and oncology.',
    rating: 4.6,
    openHours: '24/7 Emergency'
  },
  {
    id: 'health-4',
    title: 'Danat Al Emarat Hospital for Women & Children',
    category: 'Healthcare',
    subcategory: 'Hospitals',
    lat: 24.3985,
    lon: 54.4920,
    address: 'Bain Al Jisreen, Abu Dhabi',
    description: 'Specialized surgical and maternal healthcare hospital.',
    rating: 4.8,
    openHours: '24/7 Emergency'
  },
  {
    id: 'health-5',
    title: 'Mediclinic Airport Road Hospital',
    category: 'Healthcare',
    subcategory: 'Hospitals',
    lat: 24.4124,
    lon: 54.4682,
    address: 'Sheikh Rashid Bin Saeed St, Abu Dhabi',
    description: 'Modern healthcare facility offering comprehensive outpatient & emergency services.',
    rating: 4.6,
    openHours: '24/7 Emergency'
  },

  // GOVERNMENT
  {
    id: 'gov-1',
    title: 'Department of Government Enablement (DGE)',
    category: 'Government',
    subcategory: 'Ministries',
    lat: 24.4680,
    lon: 54.3670,
    address: 'Corniche West, Abu Dhabi',
    description: 'Abu Dhabi government entity driving digital transformation and enablement.',
    rating: 4.8,
    openHours: '07:30 - 15:30'
  },
  {
    id: 'gov-2',
    title: 'Abu Dhabi Municipality (ADM)',
    category: 'Government',
    subcategory: 'Municipalities',
    lat: 24.4755,
    lon: 54.3742,
    address: 'Sheikh Zayed St, Zone 1, Abu Dhabi',
    description: 'City municipal authority managing urban planning, land administration, and public works.',
    rating: 4.5,
    openHours: '07:30 - 15:30'
  },
  {
    id: 'gov-3',
    title: 'Ministry of Interior (MOI)',
    category: 'Government',
    subcategory: 'Ministries',
    lat: 24.4361,
    lon: 54.4398,
    address: 'Al Maqta Area, Abu Dhabi',
    description: 'Federal ministry governing law enforcement, security, and civil defense.',
    rating: 4.7,
    openHours: '08:00 - 16:00'
  },
  {
    id: 'gov-4',
    title: 'Abu Dhabi Judicial Department',
    category: 'Government',
    subcategory: 'Courts',
    lat: 24.4312,
    lon: 54.4352,
    address: 'Al Khaleej Al Arabi St, Abu Dhabi',
    description: 'Judicial authority governing courts and legal notary services.',
    rating: 4.4,
    openHours: '07:30 - 14:30'
  },

  // PARKS & NATURE
  {
    id: 'park-1',
    title: 'Mangrove National Park',
    category: 'Park',
    subcategory: 'National Parks',
    lat: 24.4518,
    lon: 54.4369,
    address: 'Anantara Eastern Mangroves, Abu Dhabi',
    description: 'Protected mangrove forest biodiversity ecosystem with kayaking and boardwalk trails.',
    rating: 4.8,
    openHours: '07:00 - 19:00'
  },
  {
    id: 'park-2',
    title: 'Umm Al Emarat Park',
    category: 'Park',
    subcategory: 'Public Parks',
    lat: 24.4578,
    lon: 54.3821,
    address: '15th Street, Mushrif, Abu Dhabi',
    description: 'Historic urban park featuring shade house, botanical garden, and amphitheater.',
    rating: 4.9,
    openHours: '08:00 - 00:00'
  },
  {
    id: 'park-3',
    title: 'Capital Park',
    category: 'Park',
    subcategory: 'Gardens',
    lat: 24.4925,
    lon: 54.3642,
    address: 'Sultan Bin Zayed The First St, Abu Dhabi',
    description: 'Charming green park located in downtown Abu Dhabi with water fountains.',
    rating: 4.5,
    openHours: '24 Hours'
  },
  {
    id: 'park-4',
    title: 'Khalifa Park',
    category: 'Park',
    subcategory: 'Public Parks',
    lat: 24.4285,
    lon: 54.4695,
    address: 'Al Matar, Zone 1, Abu Dhabi',
    description: 'Sprawling park featuring maritime museum, library, and grand train ride.',
    rating: 4.6,
    openHours: '10:00 - 22:00'
  },

  // TRANSPORTATION
  {
    id: 'trans-1',
    title: 'Zayed International Airport (AUH)',
    category: 'Transportation',
    subcategory: 'Bus Stations',
    lat: 24.4439,
    lon: 54.6511,
    address: 'Terminal A, Abu Dhabi Airport Complex',
    description: 'Ultra-modern international airport terminal hub connecting Abu Dhabi globally.',
    rating: 4.9,
    openHours: '24/7 Operational'
  },
  {
    id: 'trans-2',
    title: 'Abu Dhabi Main Bus Terminal',
    category: 'Transportation',
    subcategory: 'Bus Stations',
    lat: 24.4702,
    lon: 54.3768,
    address: 'Hazaa Bin Zayed St, Abu Dhabi',
    description: 'Central bus transport hub operating intercity and regional routes across the UAE.',
    rating: 4.3,
    openHours: '24 Hours'
  },
  {
    id: 'trans-3',
    title: 'Yas Marina Bus & Transit Hub',
    category: 'Transportation',
    subcategory: 'Bus Stations',
    lat: 24.4682,
    lon: 54.6041,
    address: 'Yas Island, Abu Dhabi',
    description: 'Integrated transport drop-off and shuttle connection station on Yas Island.',
    rating: 4.6,
    openHours: '06:00 - 23:00'
  },

  // TOURISM & CULTURE
  {
    id: 'tour-1',
    title: 'Sheikh Zayed Grand Mosque',
    category: 'Tourism',
    subcategory: 'Historical Sites',
    lat: 24.4128,
    lon: 54.4744,
    address: 'Sheikh Rashid Bin Saeed St, Abu Dhabi',
    description: 'Architectural masterpiece and one of the largest mosques in the world.',
    rating: 4.9,
    openHours: '09:00 - 22:00'
  },
  {
    id: 'tour-2',
    title: 'Louvre Abu Dhabi',
    category: 'Tourism',
    subcategory: 'Museums',
    lat: 24.5337,
    lon: 54.3983,
    address: 'Saadiyat Cultural District, Abu Dhabi',
    description: 'Universal art and civilization museum under Jean Nouvel’s rain-of-light dome.',
    rating: 4.8,
    openHours: '10:00 - 18:30'
  },
  {
    id: 'tour-3',
    title: 'Qasr Al Watan',
    category: 'Tourism',
    subcategory: 'Historical Sites',
    lat: 24.4632,
    lon: 54.3051,
    address: 'Presidential Palace Compound, Abu Dhabi',
    description: 'Cultural landmark celebrating Arabian heritage, architecture, and governance.',
    rating: 4.9,
    openHours: '10:00 - 17:30'
  },
  {
    id: 'tour-4',
    title: 'Ferrari World Yas Island',
    category: 'Tourism',
    subcategory: 'Resorts',
    lat: 24.4839,
    lon: 54.6074,
    address: 'Yas Island, Abu Dhabi',
    description: 'World-famous indoor theme park featuring the Formula Rossa roller coaster.',
    rating: 4.7,
    openHours: '12:00 - 20:00'
  }
];

const KNOWN_ABU_DHABI_GEOCODES = {
  'mushrif': { lat: 24.4442, lon: 54.3912 },
  'yas': { lat: 24.4975, lon: 54.6086 },
  'saadiyat': { lat: 24.5337, lon: 54.4020 },
  'reem': { lat: 24.4988, lon: 54.3985 },
  'downtown': { lat: 24.4820, lon: 54.3640 },
  'corniche': { lat: 24.4750, lon: 54.3480 },
  'khalifa': { lat: 24.4250, lon: 54.5800 },
  'bateen': { lat: 24.4510, lon: 54.3520 }
};

/**
 * Ensures location items have valid latitude/longitude coordinates.
 * If coordinates are missing, performs deterministic geocoding lookup based on address/title.
 * Never uses random numbers.
 */
export function geocodeLocationIfNeeded(item) {
  if (item.lat && item.lon && !isNaN(item.lat) && !isNaN(item.lon) && item.lat !== 0 && item.lon !== 0) {
    return item;
  }

  const combinedText = `${item.title || ''} ${item.address || ''} ${item.description || ''}`.toLowerCase();
  for (const [key, coords] of Object.entries(KNOWN_ABU_DHABI_GEOCODES)) {
    if (combinedText.includes(key)) {
      return { ...item, lat: coords.lat, lon: coords.lon };
    }
  }

  // Fallback to Abu Dhabi City Center centroid
  return { ...item, lat: 24.4539, lon: 54.3773 };
}

/**
 * Modular spatial search interpreter function.
 * Matches natural language queries or exact category filters against Abu Dhabi spatial dataset.
 * 
 * @param {string} query - Free text search prompt (e.g., "schools", "Cleveland Hospital", "parks")
 * @param {string} categoryFilter - Specific spatial category (e.g. "Education", "Healthcare", "Park")
 * @returns {Array} List of matching location objects with verified lat/lon coordinates
 */
export function searchSpatialData(query = '', categoryFilter = '') {
  const cleanQuery = query.trim().toLowerCase();
  const cleanCategory = categoryFilter.trim().toLowerCase();

  const matched = ABU_DHABI_SPATIAL_DATASET.filter(item => {
    // 1. Category Filter Match
    if (cleanCategory && cleanCategory !== 'all') {
      const matchCategory = item.category.toLowerCase() === cleanCategory;
      const matchSubcategory = item.subcategory.toLowerCase().includes(cleanCategory);
      if (!matchCategory && !matchSubcategory) return false;
    }

    // 2. Query Text Match
    if (!cleanQuery) return true;

    const inTitle = item.title.toLowerCase().includes(cleanQuery);
    const inCategory = item.category.toLowerCase().includes(cleanQuery);
    const inSubcat = item.subcategory.toLowerCase().includes(cleanQuery);
    const inAddress = item.address.toLowerCase().includes(cleanQuery);
    const inDesc = item.description.toLowerCase().includes(cleanQuery);

    // Keyword Synonym Mappings (AI interpretation helper)
    let keywordSynonym = false;
    if (cleanQuery.includes('school') || cleanQuery.includes('university') || cleanQuery.includes('college')) {
      keywordSynonym = item.category === 'Education';
    } else if (cleanQuery.includes('hospital') || cleanQuery.includes('clinic') || cleanQuery.includes('doctor') || cleanQuery.includes('medical')) {
      keywordSynonym = item.category === 'Healthcare';
    } else if (cleanQuery.includes('park') || cleanQuery.includes('garden') || cleanQuery.includes('green')) {
      keywordSynonym = item.category === 'Park';
    } else if (cleanQuery.includes('bus') || cleanQuery.includes('airport') || cleanQuery.includes('station') || cleanQuery.includes('transit')) {
      keywordSynonym = item.category === 'Transportation';
    } else if (cleanQuery.includes('gov') || cleanQuery.includes('ministry') || cleanQuery.includes('court') || cleanQuery.includes('enablement')) {
      keywordSynonym = item.category === 'Government';
    } else if (cleanQuery.includes('museum') || cleanQuery.includes('mosque') || cleanQuery.includes('tourist') || cleanQuery.includes('ferrari')) {
      keywordSynonym = item.category === 'Tourism';
    }

    return inTitle || inCategory || inSubcat || inAddress || inDesc || keywordSynonym;
  });

  return matched.map(geocodeLocationIfNeeded);
}
