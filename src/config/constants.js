export const CATEGORY_TREE = [
  {
    id: 'education',
    name: 'Education',
    subcategories: ['Charter Schools', 'Nurseries', 'POD', 'Public Schools', 'Private Schools']
  },
  {
    id: 'healthcare',
    name: 'Healthcare',
    subcategories: ['Hospitals', 'Clinics', 'Pharmacies', 'Medical Centers']
  },
  {
    id: 'transportation',
    name: 'Transport',
    subcategories: ['Bus Stations', 'Metro Lines', 'Taxi Stands', 'Parking Lots']
  },
  {
    id: 'environment',
    name: 'Environment',
    subcategories: ['Air Quality Sensors', 'Protected Areas', 'Recycling Centers', 'Waste Management']
  },
  {
    id: 'government',
    name: 'Government Services',
    subcategories: ['Ministries', 'Embassies', 'Courts', 'Municipalities', 'Service Centers']
  },
  {
    id: 'tourism',
    name: 'Tourism',
    subcategories: ['Hotels', 'Museums', 'Historical Sites', 'Resorts', 'Attractions']
  },
  {
    id: 'infrastructure',
    name: 'Infrastructure',
    subcategories: ['Bridges', 'Road Networks', 'Port Facilities', 'Public Lighting']
  },
  {
    id: 'housing',
    name: 'Housing',
    subcategories: ['Residential Complexes', 'Public Housing', 'Villas', 'Commercial Buildings']
  },
  {
    id: 'public_safety',
    name: 'Public Safety',
    subcategories: ['Police Stations', 'Fire Stations', 'Civil Defense', 'Emergency Centers']
  },
  {
    id: 'utilities',
    name: 'Utilities',
    subcategories: ['Power Stations', 'Water Treatment', 'Substations', 'Telecom Towers']
  },
  {
    id: 'climate',
    name: 'Climate',
    subcategories: ['Weather Stations', 'Solar Plants', 'CO2 Monitoring', 'Coastal Protection']
  },
  {
    id: 'construction',
    name: 'Construction',
    subcategories: ['Active Construction Sites', 'Development Projects', 'Zoning Permits']
  },
  {
    id: 'energy',
    name: 'Energy',
    subcategories: ['Substations', 'Gas Networks', 'Renewable Energy', 'Grid Terminals']
  },
  {
    id: 'park',
    name: 'Parks',
    subcategories: ['Public Parks', 'Playgrounds', 'Gardens', 'National Parks']
  },
  {
    id: 'agriculture',
    name: 'Agriculture',
    subcategories: ['Farms', 'Greenhouses', 'Irrigation Systems', 'Livestock Centers']
  },
  {
    id: 'employment',
    name: 'Employment',
    subcategories: ['Business Hubs', 'Free Zones', 'Job Centers', 'Corporate HQs']
  }
];

export const PROJECTS = [
  {
    id: "villa-royale",
    name: "Villa Royale BIM (V2)",
    lat: 24.5020,
    lon: 54.3890,
    minElevation: 42.5,
    maxElevation: 128.3,
    buildingsCount: 3,
    activeRegion: "Al Maryah Island, Abu Dhabi",
    levels: ["L1", "L2", "L3", "Penthouse"],
    buildings: [
      { 
        id: "b1", 
        name: "Main Villa (BIM-01)", 
        lat: 24.5030, 
        lon: 54.3880, 
        floors: 3, 
        heightM: 12.5,
        footprint: [[24.5033, 54.3876], [24.5033, 54.3884], [24.5027, 54.3884], [24.5027, 54.3876]]
      },
      { 
        id: "b2", 
        name: "Guest Annex (BIM-02)", 
        lat: 24.5015, 
        lon: 54.3905, 
        floors: 2, 
        heightM: 8.2,
        footprint: [[24.5018, 54.3901], [24.5018, 54.3909], [24.5012, 54.3909], [24.5012, 54.3901]]
      },
      { 
        id: "b3", 
        name: "Wellness Pavilion", 
        lat: 24.5005, 
        lon: 54.3875, 
        floors: 2, 
        heightM: 9.0,
        footprint: [[24.5008, 54.3871], [24.5008, 54.3879], [24.5002, 54.3879], [24.5002, 54.3871]]
      }
    ],
    boundaryCoords: [
      [24.5045, 54.3850],
      [24.5045, 54.3930],
      [24.4990, 54.3930],
      [24.4990, 54.3850]
    ]
  },
  {
    id: "downtown-comm",
    name: "Downtown Commercial Complex",
    lat: 24.4950,
    lon: 54.4050,
    minElevation: 5.2,
    maxElevation: 22.8,
    buildingsCount: 2,
    activeRegion: "Al Reem Island, Abu Dhabi",
    levels: ["B1", "G", "M", "L1", "L2", "Roof"],
    buildings: [
      { 
        id: "c1", 
        name: "HQ Tower A", 
        lat: 24.4965, 
        lon: 54.4035, 
        floors: 15, 
        heightM: 65.0,
        footprint: [[24.4970, 54.4030], [24.4970, 54.4040], [24.4960, 54.4040], [24.4960, 54.4030]]
      },
      { 
        id: "c2", 
        name: "Retail Gallery", 
        lat: 24.4940, 
        lon: 54.4065, 
        floors: 4, 
        heightM: 18.5,
        footprint: [[24.4945, 54.4060], [24.4945, 54.4070], [24.4935, 54.4070], [24.4935, 54.4060]]
      }
    ],
    boundaryCoords: [
      [24.4985, 54.4010],
      [24.4985, 54.4090],
      [24.4915, 54.4090],
      [24.4915, 54.4010]
    ]
  },
  {
    id: "transit-hub",
    name: "Metropolitan Transit Hub",
    lat: 24.4320,
    lon: 54.4500,
    minElevation: 85.0,
    maxElevation: 94.6,
    buildingsCount: 4,
    activeRegion: "Zayed City, Abu Dhabi",
    levels: ["Sub-L2", "Sub-L1", "Concourse", "Platform"],
    buildings: [
      { 
        id: "t1", 
        name: "East Terminal", 
        lat: 24.4335, 
        lon: 54.4475, 
        floors: 2, 
        heightM: 11.2,
        footprint: [[24.4340, 54.4470], [24.4340, 54.4480], [24.4330, 54.4480], [24.4330, 54.4470]]
      },
      { 
        id: "t2", 
        name: "West Terminal", 
        lat: 24.4335, 
        lon: 54.4525, 
        floors: 2, 
        heightM: 11.2,
        footprint: [[24.4340, 54.4520], [24.4340, 54.4530], [24.4330, 54.4530], [24.4330, 54.4520]]
      },
      { 
        id: "t3", 
        name: "Central Concourse", 
        lat: 24.4320, 
        lon: 54.4500, 
        floors: 1, 
        heightM: 7.8,
        footprint: [[24.4325, 54.4495], [24.4325, 54.4505], [24.4315, 54.4505], [24.4315, 54.4495]]
      },
      { 
        id: "t4", 
        name: "Service Tower", 
        lat: 24.4300, 
        lon: 54.4500, 
        floors: 6, 
        heightM: 28.0,
        footprint: [[24.4305, 54.4495], [24.4305, 54.4505], [24.4295, 54.4505], [24.4295, 54.4495]]
      }
    ],
    boundaryCoords: [
      [24.4360, 54.4450],
      [24.4360, 54.4550],
      [24.4280, 54.4550],
      [24.4280, 54.4450]
    ]
  }
];
