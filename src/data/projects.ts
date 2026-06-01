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
    id: 'prism-complex',
    category: 'architecture',
    title: 'The Prism Complex',
    brief: 'A crystalline structure redefining urban density through light-refracting geometries.',
    description: 'The Prism Complex is a multi-use architectural masterpiece designed to maximize natural light in a dense urban environment. By utilizing advanced glass technology and a unique angular floor plan, we managed to create internal spaces that feel expansive and connected to the sky. The project was conceived as a "light-trap," capturing and diffusing the sun into the core of the building.',
    location: 'Neo City, Japan',
    year: '2023',
    area: '45,000 sq ft',
    team: ['Ar. Yash Patel', 'Ar. Rathin Shah', 'M. Tanaka (Structural)'],
    mainImage: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=2000',
    gallery: [
      'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=1200',
      'https://images.unsplash.com/photo-1545324418-f1d3ac1ef739?auto=format&fit=crop&q=80&w=1200',
      'https://images.unsplash.com/photo-1518005020250-675f342e520d?auto=format&fit=crop&q=80&w=1200',
      'https://images.unsplash.com/photo-1511818966892-d7d671e672a2?auto=format&fit=crop&q=80&w=1200',
      'https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&q=80&w=1200'
    ]
  },
  {
    id: 'vertical-garden',
    category: 'architecture',
    title: 'Vertical Garden Tower',
    brief: 'A biophilic landmark integrating 4,000 sqm of secondary forest into a commercial high-rise.',
    description: 'The Vertical Garden Tower is an experiment in radical biophilia. We challenged the notion of the sterile glass office tower by wrapping the structure in a living, breathing ecosystem. Each floor has direct access to terraced gardens that serve as natural air filtration and thermal insulation.',
    location: 'Singapore',
    year: '2024',
    area: '120,000 sq ft',
    team: ['Ar. Yash Patel', 'Ar. Rathin Shah', 'L. Chen (Botany)'],
    mainImage: 'https://images.unsplash.com/photo-1545324418-f1d3ac1ef739?auto=format&fit=crop&q=80&w=2000',
    gallery: [
      'https://images.unsplash.com/photo-1545324418-f1d3ac1ef739?auto=format&fit=crop&q=80&w=1200',
      'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=1200',
      'https://images.unsplash.com/photo-1518005020250-675f342e520d?auto=format&fit=crop&q=80&w=1200',
      'https://images.unsplash.com/photo-1511818966892-d7d671e672a2?auto=format&fit=crop&q=80&w=1200',
      'https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&q=80&w=1200'
    ]
  },
  {
    id: 'concrete-muse',
    category: 'architecture',
    title: 'Concrete Muse Phase II',
    brief: 'A brutalist extension exploring the dialogue between raw concrete and warm timber.',
    description: 'Concrete Muse Phase II is a gallery extension that pushes the boundaries of board-formed concrete. The structure is characterized by massive cantilevers and deep dramatic shadows, balanced with internal courtyards that bring a sense of domesticity to the monumental form.',
    location: 'Berlin, Germany',
    year: '2022',
    area: '18,000 sq ft',
    team: ['Ar. Yash Patel', 'J. Schmidt (Structural)'],
    mainImage: 'https://images.unsplash.com/photo-1518005020250-675f342e520d?auto=format&fit=crop&q=80&w=2000',
    gallery: [
      'https://images.unsplash.com/photo-1518005020250-675f342e520d?auto=format&fit=crop&q=80&w=1200',
      'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=1200',
      'https://images.unsplash.com/photo-1545324418-f1d3ac1ef739?auto=format&fit=crop&q=80&w=1200',
      'https://images.unsplash.com/photo-1511818966892-d7d671e672a2?auto=format&fit=crop&q=80&w=1200',
      'https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&q=80&w=1200'
    ]
  },
  {
    id: 'glass-harbor',
    category: 'architecture',
    title: 'Glass Harbor Station',
    brief: 'A transparent node in the city infrastructure, blurring the line between transport and public space.',
    description: 'Glass Harbor Station reimagines the commute. Using structural glass fins, the station creates a rhythm of transparency and reflection that changes with the seasons.',
    location: 'Oslo, Norway',
    year: '2023',
    area: '25,000 sq ft',
    team: ['Ar. Rathin Shah', 'O. Nordahl (Glass Specialist)'],
    mainImage: 'https://images.unsplash.com/photo-1511818966892-d7d671e672a2?auto=format&fit=crop&q=80&w=2000',
    gallery: [
      'https://images.unsplash.com/photo-1511818966892-d7d671e672a2?auto=format&fit=crop&q=80&w=1200',
      'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=1200',
      'https://images.unsplash.com/photo-1545324418-f1d3ac1ef739?auto=format&fit=crop&q=80&w=1200',
      'https://images.unsplash.com/photo-1518005020250-675f342e520d?auto=format&fit=crop&q=80&w=1200',
      'https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&q=80&w=1200'
    ]
  },
  {
    id: 'vertical-monolith',
    category: 'architecture',
    title: 'Vertical Monolith',
    brief: 'A conceptual skyscraper exploring vertical density, prefabricated units, and solar skins.',
    description: 'The Vertical Monolith project redefines the traditional skyscraper by introducing a modular growth system. Each living unit is pre-fabricated and slotted into a carbon-fiber skeletal frame. This approach allows for rapid assembly and dynamic reconfiguration as the city\'s needs evolve over decades. The facade is a reactive skin that adjusts its opacity based on solar intensity, reducing energy consumption for cooling by 40%. The interior spaces are characterized by raw concrete finishes and integrated smart glass partitions that can transition from transparent to opaque instantly.',
    location: 'New York, USA',
    year: '2025',
    area: '210,000 sq ft',
    team: ['Ar. Yash Patel', 'Ar. Rathin Shah', 'J. Henderson (Prefab Design)'],
    mainImage: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=2000',
    gallery: [
      'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=1200',
      'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=1200',
      'https://images.unsplash.com/photo-1518005020951-eccb494ad742?auto=format&fit=crop&q=80&w=1200'
    ]
  },
  {
    id: 'desert-mirage',
    category: 'architecture',
    title: 'Desert Mirage',
    brief: 'Sustainable housing in extreme arid environments using passive cooling wind towers.',
    description: 'Desert Mirage is a series of low-impact residential structures designed specifically for the Sahara. The architecture draws inspiration from traditional cave dwellings but uses advanced geotechnical engineering to create subterranean thermal mass. The portions of the buildings above ground are constructed from stabilized rammed earth, which provides excellent insulation and blends seamlessly with the natural landscape. Wind towers are integrated into the design to catch high-altitude breezes.',
    location: 'Sahara, Morocco',
    year: '2024',
    area: '14,000 sq ft',
    team: ['Ar. Rathin Shah', 'S. Al-Fayed (Sustainability)'],
    mainImage: 'https://images.unsplash.com/photo-1503387762-592dea58ef23?auto=format&fit=crop&q=80&w=2000',
    gallery: [
      'https://images.unsplash.com/photo-1503387762-592dea58ef23?auto=format&fit=crop&q=80&w=1200',
      'https://images.unsplash.com/photo-1518005020951-eccb494ad742?auto=format&fit=crop&q=80&w=1200',
      'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=1200'
    ]
  },
  {
    id: 'solstice-pavilion',
    category: 'architecture',
    title: 'The Solstice Pavilion',
    brief: 'An open-air wooden sanctuary aligning perfectly with seasonal solar coordinates.',
    description: 'The Solstice Pavilion is an elegant timber temple crafted from Japanese Hinoki wood. The geometry is mathematically optimized to shadow the interior during the extreme heat of the summer solstice, while capturing direct warming rays on the winter solstice. The structural joints are made entirely with traditional Japanese joinery, avoiding any metal fasteners.',
    location: 'Kyoto, Japan',
    year: '2024',
    area: '3,500 sq ft',
    team: ['Ar. Yash Patel', 'K. Sato (Master Carpenter)'],
    mainImage: 'https://images.unsplash.com/photo-1518005020951-eccb494ad742?auto=format&fit=crop&q=80&w=2000',
    gallery: [
      'https://images.unsplash.com/photo-1518005020951-eccb494ad742?auto=format&fit=crop&q=80&w=1200',
      'https://images.unsplash.com/photo-1600607687940-c52af096999a?auto=format&fit=crop&q=80&w=1200',
      'https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&q=80&w=1200'
    ]
  },
  {
    id: 'lunar-observatory',
    category: 'architecture',
    title: 'Lunar Observatory',
    brief: 'A dark-sky research base carved directly into high-altitude mountain topography.',
    description: 'Lunar Observatory is situated at 4,000 meters above sea level in the Atacama Desert. The structure is carved directly into the basalt rock, providing natural thermal stabilization and structural anchoring against extreme mountain winds. The astronomical domes are aligned perfectly with the local meridians, creating a deep dialogue between Earth and space.',
    location: 'Atacama, Chile',
    year: '2023',
    area: '12,500 sq ft',
    team: ['Ar. Rathin Shah', 'Dr. E. Gomez (Astrophysics Consultation)'],
    mainImage: 'https://images.unsplash.com/photo-1449156003053-930c76428d99?auto=format&fit=crop&q=80&w=2000',
    gallery: [
      'https://images.unsplash.com/photo-1449156003053-930c76428d99?auto=format&fit=crop&q=80&w=1200',
      'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=1200',
      'https://images.unsplash.com/photo-1503387762-592dea58ef23?auto=format&fit=crop&q=80&w=1200'
    ]
  },
  {
    id: 'nirnia-loft',
    category: 'interior',
    title: 'Minimalist Mono Loft',
    brief: 'An industrial conversion into a minimalist sanctuary of texture and silence.',
    description: 'Nirnia Loft involved the complete gut renovation of a 1920s warehouse. Our goal was to preserve the industrial skeleton while introducing a sequence of minimalist interventions. We used a restricted palette of blackened steel, pour-in-place concrete, and white oak to create a space that feels both robust and ethereal.',
    location: 'New York, USA',
    year: '2024',
    area: '3,200 sq ft',
    team: ['Ar. Yash Patel', 'Sarah Jenkins (Lighting)'],
    mainImage: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&q=80&w=2000',
    gallery: [
      'https://images.unsplash.com/photo-1600585154526-990dcea4db0d?auto=format&fit=crop&q=80&w=1200',
      'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&q=80&w=1200',
      'https://images.unsplash.com/photo-1600607687940-c52af096999a?auto=format&fit=crop&q=80&w=1200',
      'https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&q=80&w=1200',
      'https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?auto=format&fit=crop&q=80&w=1200'
    ]
  },
  {
    id: 'zen-haven',
    category: 'interior',
    title: 'Zen Haven Residence',
    brief: 'A rhythmic exploration of wood and light inspired by traditional Machiya architecture.',
    description: 'Zen Haven is a residential project in Kyoto that seeks to modernize the traditional Japanese living experience. We used cedar and paper-thin light diffusers to create a sanctuary of calm. The layout follows a strict tatami grid, ensuring a perfect balance of proportions and voids.',
    location: 'Kyoto, Japan',
    year: '2023',
    area: '2,800 sq ft',
    team: ['Ar. Rathin Shah', 'K. Sato (Master Carpenter)'],
    mainImage: 'https://images.unsplash.com/photo-1600607687940-c52af096999a?auto=format&fit=crop&q=80&w=2000',
    gallery: [
      'https://images.unsplash.com/photo-1600607687940-c52af096999a?auto=format&fit=crop&q=80&w=1200',
      'https://images.unsplash.com/photo-1600585154526-990dcea4db0d?auto=format&fit=crop&q=80&w=1200',
      'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&q=80&w=1200',
      'https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&q=80&w=1200',
      'https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?auto=format&fit=crop&q=80&w=1200'
    ]
  },
  {
    id: 'brutalist-office',
    category: 'interior',
    title: 'Brutalist Velvet Office',
    brief: 'Softness meets hardness in this high-contrast workplace for a creative agency.',
    description: 'We paired raw exposed concrete with deep red velvet textiles to create an environment that is both focused and comfortable. This office layout emphasizes zones of intense concentration and pockets of luxurious relaxation.',
    location: 'London, UK',
    year: '2023',
    area: '5,500 sq ft',
    team: ['Ar. Yash Patel', 'M. Rossi (Interiors)'],
    mainImage: 'https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&q=80&w=2000',
    gallery: [
      'https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&q=80&w=1200',
      'https://images.unsplash.com/photo-1600585154526-990dcea4db0d?auto=format&fit=crop&q=80&w=1200',
      'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&q=80&w=1200',
      'https://images.unsplash.com/photo-1600607687940-c52af096999a?auto=format&fit=crop&q=80&w=1200',
      'https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?auto=format&fit=crop&q=80&w=1200'
    ]
  },
  {
    id: 'sunset-suite',
    category: 'interior',
    title: 'Sunset Boulevard Suite',
    brief: 'A cinematic penthouse designed to capture the golden hour of the Hollywood hills.',
    description: 'The Sunset Suite uses polished brass and warm amber lighting to extend the feeling of sunset throughout the day. It features floor-to-ceiling panoramic glass walls looking out over the Los Angeles skyline, balanced with warm tactile wall coverings.',
    location: 'Los Angeles, USA',
    year: '2024',
    area: '4,200 sq ft',
    team: ['Ar. Rathin Shah', 'B. Thompson (Interior Styling)'],
    mainImage: 'https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?auto=format&fit=crop&q=80&w=2000',
    gallery: [
      'https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?auto=format&fit=crop&q=80&w=1200',
      'https://images.unsplash.com/photo-1600585154526-990dcea4db0d?auto=format&fit=crop&q=80&w=1200',
      'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&q=80&w=1200',
      'https://images.unsplash.com/photo-1600607687940-c52af096999a?auto=format&fit=crop&q=80&w=1200',
      'https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&q=80&w=1200'
    ]
  }
];
