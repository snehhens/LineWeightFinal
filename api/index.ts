import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const JWT_SECRET = process.env.JWT_SECRET || 'super_secret_lineweights_token_key';

app.use(cors());
app.use(express.json());

// MongoDB connection helper for Serverless Environments
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb+srv://lineweightsarchitecture_db_user:uBSSRMwd7OjaIiMu@cluster0.bqujtfx.mongodb.net/lineweights_db?appName=Cluster0';

let cachedConnection: any = (global as any).mongoose;
if (!cachedConnection) {
  cachedConnection = (global as any).mongoose = { conn: null, promise: null };
}

async function connectToDatabase() {
  if (cachedConnection.conn) {
    return cachedConnection.conn;
  }
  if (!cachedConnection.promise) {
    const opts = {
      bufferCommands: false,
    };
    cachedConnection.promise = mongoose.connect(MONGODB_URI, opts).then((mongooseInstance) => {
      return mongooseInstance;
    });
  }
  try {
    cachedConnection.conn = await cachedConnection.promise;
    await seedDatabase();
  } catch (e) {
    cachedConnection.promise = null;
    throw e;
  }
  return cachedConnection.conn;
}

// Database Connection Middleware
app.use(async (req, res, next) => {
  // Skip DB connection for non-API requests
  if (!req.path.startsWith('/api')) {
    return next();
  }
  try {
    await connectToDatabase();
    next();
  } catch (err: any) {
    console.error('Database connection error in middleware:', err);
    res.status(500).json({ 
      message: 'Database connection failed', 
      error: err.message,
      suggestion: 'Please verify that your database cluster is online and reachable.'
    });
  }
});

// Schemas & Models
const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true }
});
const User = mongoose.model('User', userSchema);

const projectSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  category: { type: String, required: true, enum: ['architecture', 'interior'] },
  title: { type: String, required: true },
  brief: { type: String, required: true },
  description: { type: String, required: true },
  location: { type: String },
  year: { type: String },
  area: { type: String },
  team: [{ type: String }],
  mainImage: { type: String, required: true },
  gallery: [{ type: String }]
});
const Project = mongoose.model('Project', projectSchema);

const blogSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  title: { type: String, required: true },
  excerpt: { type: String, required: true },
  date: { type: String, required: true },
  category: { type: String, required: true },
  readTime: { type: String, required: true },
  content: [{ type: String }]
});
const Blog = mongoose.model('Blog', blogSchema);

// JWT Authentication Middleware
const authenticateJWT = (req: any, res: any, next: any) => {
  const authHeader = req.headers.authorization;
  if (authHeader) {
    const token = authHeader.split(' ')[1];
    jwt.verify(token, JWT_SECRET, (err: any, user: any) => {
      if (err) {
        return res.status(403).json({ message: 'Forbidden' });
      }
      req.user = user;
      next();
    });
  } else {
    res.status(401).json({ message: 'Unauthorized' });
  }
};

// Seed Database Function
async function seedDatabase() {
  try {
    // 1. Seed Admin User
    const adminUsername = process.env.ADMIN_USERNAME || 'admin';
    const adminPassword = process.env.ADMIN_PASSWORD || 'LWa@0109';
    const userCount = await User.countDocuments();
    if (userCount === 0) {
      const hashedPassword = await bcrypt.hash(adminPassword, 10);
      await User.create({ username: adminUsername, password: hashedPassword });
      console.log(`Admin user created: username: "${adminUsername}"`);
    }

    // 2. Seed Projects
    const projectCount = await Project.countDocuments();
    if (projectCount === 0) {
      const seedProjects = [
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
      await Project.insertMany(seedProjects);
      console.log('Projects seed loaded successfully');
    }

    // 3. Seed Blog Posts
    const blogCount = await Blog.countDocuments();
    if (blogCount === 0) {
      const seedBlogs = [
        {
          id: "urban-architecture",
          title: "The Future of Urban Architecture",
          excerpt: "How sustainable design is shaping the cities of tomorrow and what it means for residents.",
          date: "May 10, 2026",
          category: "Architecture",
          readTime: "6 min read",
          content: [
            "As urban populations continue to swell, the architectural landscape must evolve to meet new ecological and social demands. The concrete jungles of the twentieth century, defined by their sterile glass facades and carbon-intensive steel frames, are giving way to a new paradigm of organic and responsive architecture.",
            "At the core of this transition is the concept of radical biophilia. By integrating secondary forests, living walls, and active water filtration directly into high-rise commercial structures, architects are converting buildings from passive energy consumers into active environmental systems. These structures act as artificial lungs for the city, purifying the air while providing natural insulation that reduces cooling demands by up to 50%.",
            "Furthermore, the integration of modular prefabrication is redefining construction speed and longevity. Rather than static structures designed for a singular purpose, the skyscrapers of tomorrow will feature modular units that can be slotted, reconfigured, or recycled as urban demographics shift. This carbon-neutral flexibility ensures that our cities are built not just for the next decade, but for the next century, blending structural honesty with geometric purity."
          ]
        },
        {
          id: "minimalism-interiors",
          title: "Minimalism in Interior Spaces",
          excerpt: "Exploring the emotional impact of minimalist interiors and how to achieve clarity in your home.",
          date: "April 28, 2026",
          category: "Interior",
          readTime: "4 min read",
          content: [
            "In an era defined by continuous digital connectivity and sensory overload, our physical environments have become vital sanctuaries. Interior design is shifting away from decoration and towards curation, exploring how the stripping away of visual noise can foster mental clarity and emotional peace.",
            "Minimalism is not merely the absence of objects; it is the presence of clarity. By focusing strictly on essential textures, honest materials, and natural shadow play, we can craft interiors that speak directly to the senses without overwhelming them. A hand-applied plaster wall, a single block of raw concrete, or a floating white oak shelf can carry more emotional weight than any ornamental trim.",
            "Key to achieving this calm is indirect lighting. By concealing sources within perimeter coves or building them into custom joinery, we eliminate the glare and visual clutter of traditional light fixtures. The result is a space where the acoustic and visual atmospheres are balanced perfectly, providing a calm container that lets the mind breathe and reflect."
          ]
        },
        {
          id: "light-building-material",
          title: "Light as a Building Material",
          excerpt: "The power of natural light in creating atmospheric architecture and its psychological effects.",
          date: "April 15, 2026",
          category: "Design",
          readTime: "5 min read",
          content: [
            "Of all the resources available to an architect, none is as potent or as cost-effective as natural light. Yet, light is often treated as a passive byproduct of window placements rather than an active structural component. When manipulated intentionally, light and shadow can redefine proportions, highlight materiality, and dictate the emotional rhythm of a building.",
            "Historically, masterpieces of sacred architecture used light to evoke awe. Modern residential and commercial designs are adopting these principles to enhance well-being. By utilizing light-refracting geometries, internal lightwells, and reactive glass skins, we can channel the sun deep into structural cores, shifting the interior atmosphere dynamically as the day progresses.",
            "This dynamic shift aligns our indoor environments with natural circadian rhythms, improving productivity and mood. A room that catches the cold, blue light of dawn feels fundamentally different from one bathed in the long, amber shadows of the golden hour. Designing with light means embracing the passing of time, turning static walls into living canvas boards."
          ]
        }
      ];
      await Blog.insertMany(seedBlogs);
      console.log('Blog posts seed loaded successfully');
    }
  } catch (err) {
    console.error('Error seeding database:', err);
  }
}

// REST API Endpoints

// Admin Auth Login
app.post('/api/auth/login', async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(401).json({ message: 'Invalid username or password' });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid username or password' });
    }
    const token = jwt.sign({ id: user._id, username: user.username }, JWT_SECRET, { expiresIn: '12h' });
    res.json({ token, username: user.username });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Projects API
app.get('/api/projects', async (req, res) => {
  try {
    const projects = await Project.find();
    res.json(projects);
  } catch (err) {
    res.status(500).json({ message: 'Server error fetching projects' });
  }
});

app.post('/api/projects', authenticateJWT, async (req, res) => {
  try {
    const project = new Project(req.body);
    await project.save();
    res.status(201).json(project);
  } catch (err: any) {
    res.status(400).json({ message: 'Error creating project', error: err.message });
  }
});

app.put('/api/projects/:id', authenticateJWT, async (req, res) => {
  try {
    const project = await Project.findOneAndUpdate({ id: req.params.id }, req.body, { new: true });
    if (!project) return res.status(404).json({ message: 'Project not found' });
    res.json(project);
  } catch (err: any) {
    res.status(400).json({ message: 'Error updating project', error: err.message });
  }
});

app.delete('/api/projects/:id', authenticateJWT, async (req, res) => {
  try {
    const project = await Project.findOneAndDelete({ id: req.params.id });
    if (!project) return res.status(404).json({ message: 'Project not found' });
    res.json({ message: 'Project deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Error deleting project' });
  }
});

// Blog API
app.get('/api/blog', async (req, res) => {
  try {
    const blogs = await Blog.find();
    res.json(blogs);
  } catch (err) {
    res.status(500).json({ message: 'Server error fetching blogs' });
  }
});

app.post('/api/blog', authenticateJWT, async (req, res) => {
  try {
    const blog = new Blog(req.body);
    await blog.save();
    res.status(201).json(blog);
  } catch (err: any) {
    res.status(400).json({ message: 'Error creating blog post', error: err.message });
  }
});

app.put('/api/blog/:id', authenticateJWT, async (req, res) => {
  try {
    const blog = await Blog.findOneAndUpdate({ id: req.params.id }, req.body, { new: true });
    if (!blog) return res.status(404).json({ message: 'Blog post not found' });
    res.json(blog);
  } catch (err: any) {
    res.status(400).json({ message: 'Error updating blog post', error: err.message });
  }
});

app.delete('/api/blog/:id', authenticateJWT, async (req, res) => {
  try {
    const blog = await Blog.findOneAndDelete({ id: req.params.id });
    if (!blog) return res.status(404).json({ message: 'Blog post not found' });
    res.json({ message: 'Blog post deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Error deleting blog post' });
  }
});

// Serve Frontend in Production
if (process.env.NODE_ENV === 'production' && !process.env.VERCEL) {
  app.use(express.static(path.resolve('dist')));
  app.get('*', (req, res) => {
    res.sendFile(path.resolve('dist', 'index.html'));
  });
}

if (process.env.NODE_ENV !== 'production' || !process.env.VERCEL) {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}

export default app;
