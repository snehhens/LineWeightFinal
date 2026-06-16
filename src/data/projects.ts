export interface Project {
  id: string;
  category: 'architecture' | 'interior';
  title: string;
  brief: string;
  description: string;
  location: string;
  year: string;
  area: string;
  team: string[];
  mainImage: string;
  gallery: string[];
}

export const projectsData: Project[] = [
  {
    id: 'cafe',
    category: 'architecture',
    title: 'Cafe',
    brief: 'A sensory public oasis bridging artisanal cafe culture with raw minimalist geometry.',
    description: 'Designed as a sanctuary within the urban grid, the Cafe project integrates exposed structural masonry, double-height voids, and natural skylights. The layout balances public communal zones with intimate alcoves, prioritizing acoustics and tactile materials to enrich the sensory experience of a morning brew.',
    location: 'Visnagar, Gujarat',
    year: '2024',
    area: '2,800 sq ft',
    team: ['Ar. Yash Patel', 'Ar. Rathin Shah', 'M. Mehta (Structural)'],
    mainImage: 'https://images.unsplash.com/photo-1503387762-592dea58ef23?auto=format&fit=crop&q=80&w=2000',
    gallery: [
      'https://images.unsplash.com/photo-1503387762-592dea58ef23?auto=format&fit=crop&q=80&w=1200',
      'https://images.unsplash.com/photo-1518005020951-eccb494ad742?auto=format&fit=crop&q=80&w=1200',
      'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=1200'
    ]
  },
  {
    id: 'ashok-patel-residence',
    category: 'architecture',
    title: 'Mr. Ashok Patel Residence',
    brief: 'A monolithic concrete home capturing desert light through sweeping geometric cantilevers.',
    description: 'Located in Nakhatrana, the Ashok Patel Residence stands as a brutalist monument integrated with local topography. The building employs thick board-formed concrete walls for thermal mass, shielding internal living zones from harsh midday temperatures while framing panoramic vistas through deep, shaded apertures.',
    location: 'Nakhatrana, Gujarat',
    year: '2023',
    area: '7,500 sq ft',
    team: ['Ar. Yash Patel', 'Ar. Rathin Shah', 'R. Dave (Landscape)'],
    mainImage: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=2000',
    gallery: [
      'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=1200',
      'https://images.unsplash.com/photo-1545324418-f1d3ac1ef739?auto=format&fit=crop&q=80&w=1200',
      'https://images.unsplash.com/photo-1518005020250-675f342e520d?auto=format&fit=crop&q=80&w=1200'
    ]
  },
  {
    id: 'dinesh-patel-residence',
    category: 'architecture',
    title: 'Mr. Dinesh Patel Residence',
    brief: 'A biophilic modern sanctuary centered around a triple-height interior landscape courtyard.',
    description: 'The Dinesh Patel Residence in Tundav explores the boundary between landscape and shelter. Built around an internal oasis courtyard containing local flora and water elements, the home utilizes natural cross-ventilation and louvers to create a self-cooling microclimate for the family.',
    location: 'Tundav, Gujarat',
    year: '2024',
    area: '6,200 sq ft',
    team: ['Ar. Yash Patel', 'Ar. Rathin Shah', 'K. Sharma (Structural)'],
    mainImage: 'https://images.unsplash.com/photo-1545324418-f1d3ac1ef739?auto=format&fit=crop&q=80&w=2000',
    gallery: [
      'https://images.unsplash.com/photo-1545324418-f1d3ac1ef739?auto=format&fit=crop&q=80&w=1200',
      'https://images.unsplash.com/photo-1511818966892-d7d671e672a2?auto=format&fit=crop&q=80&w=1200',
      'https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&q=80&w=1200'
    ]
  },
  {
    id: 'sandip-prajapati-residence',
    category: 'architecture',
    title: 'Mr. Sandip Prajapati Residence',
    brief: 'A series of interlocking stone and concrete pavilions framing views of native landscape.',
    description: 'Situated in Visnagar, the Sandip Prajapati Residence features an open pavilion plan that merges interior and exterior living. Interlocking volumes of hand-cut local stone and exposed concrete organize private quarters and public entertaining rooms around serene, quiet reflection pools.',
    location: 'Visnagar, Gujarat',
    year: '2023',
    area: '8,400 sq ft',
    team: ['Ar. Rathin Shah', 'P. Vora (Lighting Consultation)'],
    mainImage: 'https://images.unsplash.com/photo-1518005020250-675f342e520d?auto=format&fit=crop&q=80&w=2000',
    gallery: [
      'https://images.unsplash.com/photo-1518005020250-675f342e520d?auto=format&fit=crop&q=80&w=1200',
      'https://images.unsplash.com/photo-1511818966892-d7d671e672a2?auto=format&fit=crop&q=80&w=1200',
      'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=1200'
    ]
  },
  {
    id: 'deepak-shah-residence',
    category: 'interior',
    title: 'Dr. Deepak Shah Residence',
    brief: 'A minimalist sanctuary of texture and quietude defined by raw plaster and white oak.',
    description: 'The interior of Dr. Deepak Shah\'s home in Bhadaj is a study in monochromatic restraint. Hand-applied textured plaster walls capture the subtle transitions of light and shadow throughout the day, while custom-integrated oak joinery conceals storage and utility, leaving the visual planes clean and uninterrupted.',
    location: 'Bhadaj, Gujarat',
    year: '2024',
    area: '3,800 sq ft',
    team: ['Ar. Yash Patel', 'Sarah Jenkins (Lighting Design)'],
    mainImage: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&q=80&w=2000',
    gallery: [
      'https://images.unsplash.com/photo-1600585154526-990dcea4db0d?auto=format&fit=crop&q=80&w=1200',
      'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&q=80&w=1200',
      'https://images.unsplash.com/photo-1600607687940-c52af096999a?auto=format&fit=crop&q=80&w=1200'
    ]
  },
  {
    id: 'arindam-patel-residence',
    category: 'interior',
    title: 'Mr. Arindam Patel Residence',
    brief: 'A contemporary home interior featuring custom bronze details and black volcanic stone.',
    description: 'Located in Vastral, this interior project balances monumental surfaces of volcanic stone with refined, custom-milled bronze accents. Deeply textured rugs and low-slung, bespoke seating create a series of comfortable, intimate spatial moments within a high-ceilinged floorplan.',
    location: 'Vastral, Gujarat',
    year: '2024',
    area: '4,200 sq ft',
    team: ['Ar. Rathin Shah', 'M. Vyas (Furnishing Consultation)'],
    mainImage: 'https://images.unsplash.com/photo-1600607687940-c52af096999a?auto=format&fit=crop&q=80&w=2000',
    gallery: [
      'https://images.unsplash.com/photo-1600607687940-c52af096999a?auto=format&fit=crop&q=80&w=1200',
      'https://images.unsplash.com/photo-1600585154526-990dcea4db0d?auto=format&fit=crop&q=80&w=1200',
      'https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?auto=format&fit=crop&q=80&w=1200'
    ]
  },
  {
    id: 'j-c-virani-residence',
    category: 'interior',
    title: 'Mr. J. C. Virani Residence',
    brief: 'A luxurious residential layout utilizing raw concrete and rich timber partitions.',
    description: 'The interior scheme for Mr. J. C. Virani in Jamnagar uses pivot timber doors and partitions to dynamically reconfigure public and private zones. Exposed raw concrete ceilings contrast with warm walnut flooring and tailored architectural lighting to set a sophisticated residential mood.',
    location: 'Jamnagar, Gujarat',
    year: '2023',
    area: '5,000 sq ft',
    team: ['Ar. Yash Patel', 'Ar. Rathin Shah', 'J. Trivedi (Timber Works)'],
    mainImage: 'https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&q=80&w=2000',
    gallery: [
      'https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&q=80&w=1200',
      'https://images.unsplash.com/photo-1600585154526-990dcea4db0d?auto=format&fit=crop&q=80&w=1200',
      'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&q=80&w=1200'
    ]
  },
  {
    id: 'pavan-patel-residence',
    category: 'interior',
    title: 'Mr. Pavan Patel Residence',
    brief: 'A high-end modern interior prioritizing custom travertine marble and direct natural light.',
    description: 'In Surat, this residential interior features double-height travertine slab feature walls that frame the main living room. Large pivot doors open to exterior gardens, blurring the boundaries between interior comfort and exterior natural environments.',
    location: 'Surat, Gujarat',
    year: '2024',
    area: '5,500 sq ft',
    team: ['Ar. Rathin Shah', 'B. Thompson (Interior Design)'],
    mainImage: 'https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?auto=format&fit=crop&q=80&w=2000',
    gallery: [
      'https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?auto=format&fit=crop&q=80&w=1200',
      'https://images.unsplash.com/photo-1600585154526-990dcea4db0d?auto=format&fit=crop&q=80&w=1200',
      'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&q=80&w=1200'
    ]
  },
  {
    id: 'pinak-patel-residence',
    category: 'interior',
    title: 'Mr. Pinak Patel Residence',
    brief: 'A minimalist apartment interior defined by concealed lighting and neutral tactile textiles.',
    description: 'Designed for Mr. Pinak Patel in Gandhinagar, this residence utilizes linear LED elements hidden within cove plaster ceilings to establish a calm, glare-free ambiance. Selected linen textiles and sand-blasted timber furniture enrich the neutral interior color scheme.',
    location: 'Gandhinagar, Gujarat',
    year: '2024',
    area: '3,200 sq ft',
    team: ['Ar. Yash Patel', 'P. Shah (Material Sourcing)'],
    mainImage: 'https://images.unsplash.com/photo-1600585154526-990dcea4db0d?auto=format&fit=crop&q=80&w=2000',
    gallery: [
      'https://images.unsplash.com/photo-1600585154526-990dcea4db0d?auto=format&fit=crop&q=80&w=1200',
      'https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?auto=format&fit=crop&q=80&w=1200',
      'https://images.unsplash.com/photo-1600607687940-c52af096999a?auto=format&fit=crop&q=80&w=1200'
    ]
  }
];
