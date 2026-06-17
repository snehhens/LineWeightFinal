import { motion } from "motion/react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { useState, useEffect } from "react";
import { Project } from "../data/projects";

export default function CategoryProjects() {
  const { category } = useParams<{ category: 'architecture' | 'interior' }>();
  const navigate = useNavigate();
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  // Filter projects by active category
  const activeCategory = category === 'interior' ? 'interior' : 'architecture';

  useEffect(() => {
    fetch('/api/projects')
      .then(res => res.json())
      .then((data: Project[]) => {
        const filtered = data.filter(p => p.category === activeCategory);
        setProjects(filtered);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error fetching projects:', err);
        setLoading(false);
      });
  }, [activeCategory]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="w-6 h-6 border-2 border-black border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <section className="bg-white min-h-screen pt-36 pb-24 overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-6 h-full">
        {/* Back and Title header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-8">
          <button 
            onClick={() => navigate('/portfolio')}
            className="flex items-center gap-3 text-[11px] font-bold uppercase tracking-widest hover:opacity-50 transition-opacity"
          >
            <ArrowLeft size={16} />
            Back to Portfolio
          </button>
          <h2 className="text-5xl md:text-8xl font-display font-medium uppercase tracking-tighter italic">
            {activeCategory}
          </h2>
        </div>

        {/* 2x4 Grid for Architecture (8 items) or symmetrical 2x2 grid for Interior */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-16">
          {projects.map((project, idx) => (
            <motion.div 
              key={project.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.8, delay: (idx % 2) * 0.15 }}
              className="group"
            >
              <Link to={`/portfolio/${activeCategory}/${project.id}`} className="block">
                {/* Rounded grayscale-to-color-on-hover image */}
                <div className="aspect-[16/10] md:aspect-[4/3] rounded-3xl overflow-hidden mb-6 relative">
                  <img 
                    src={project.mainImage} 
                    alt={project.title} 
                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 group-hover:scale-105"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-black/5 group-hover:bg-transparent transition-colors" />
                </div>
                
                {/* Title & Metadata details */}
                <div className="space-y-1">
                  <span className="text-[10px] font-bold uppercase tracking-widest opacity-40">
                    {project.location} — {project.year}
                  </span>
                  <h4 className="text-3xl font-display font-medium uppercase group-hover:pl-3 transition-all duration-300 italic">
                    {project.title}
                  </h4>
                  <p className="text-black/50 text-sm max-w-xl leading-relaxed mt-2">
                    {project.brief}
                  </p>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
