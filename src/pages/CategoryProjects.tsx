import { motion } from "motion/react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { useState, useEffect } from "react";
import { Project, projectsData } from "../data/projects";

function getOptimizedImageUrl(url: string, width: number) {
  if (!url || !url.includes('images.unsplash.com')) return url;
  try {
    const urlObj = new URL(url);
    urlObj.searchParams.set('w', width.toString());
    urlObj.searchParams.set('q', '75');
    return urlObj.toString();
  } catch (e) {
    return url;
  }
}

function ProjectImage({ src, srcSet, sizes, alt }: { src: string, srcSet?: string, sizes?: string, alt: string }) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);

  return (
    <div className="w-full h-full relative bg-[#f3f4f6]">
      {!isLoaded && !hasError && (
        <div className="absolute inset-0 bg-gray-200 animate-pulse flex items-center justify-center">
          <div className="w-5 h-5 border-2 border-black/10 border-t-black/40 rounded-full animate-spin" />
        </div>
      )}
      <img
        src={src}
        srcSet={srcSet}
        sizes={sizes}
        alt={alt}
        onLoad={() => setIsLoaded(true)}
        onError={() => setHasError(true)}
        className={`w-full h-full object-cover transition-all duration-700 ${
          isLoaded ? "opacity-100 group-hover:scale-105" : "opacity-0"
        }`}
        referrerPolicy="no-referrer"
      />
    </div>
  );
}

export default function CategoryProjects() {
  const { category } = useParams<{ category: 'interior' | 'architecture' }>();
  const navigate = useNavigate();
  const activeCategory = category === 'interior' ? 'interior' : 'architecture';

  const [projects, setProjects] = useState<Project[]>(() => {
    return projectsData.filter(p => p.category === activeCategory);
  });
  const [dbLoading, setDbLoading] = useState(true);

  useEffect(() => {
    // Immediately show static local data to avoid visual jumps when switching category
    setProjects(projectsData.filter(p => p.category === activeCategory));

    fetch('/api/projects')
      .then(res => {
        if (!res.ok) throw new Error('Network response was not ok');
        return res.json();
      })
      .then((data: Project[]) => {
        if (Array.isArray(data)) {
          const filtered = data.filter(p => p.category === activeCategory);
          setProjects(filtered);
        } else {
          console.error('Expected array of projects, got:', data);
        }
        setDbLoading(false);
      })
      .catch(err => {
        console.error('Error fetching projects:', err);
        setDbLoading(false);
      });
  }, [activeCategory]);

  if (projects.length === 0 && dbLoading) {
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
                {/* Rounded cover image */}
                <div className="aspect-[16/10] md:aspect-[4/3] rounded-3xl overflow-hidden mb-6 relative">
                  <ProjectImage 
                    src={getOptimizedImageUrl(project.mainImage, 800)}
                    srcSet={`
                      ${getOptimizedImageUrl(project.mainImage, 400)} 400w,
                      ${getOptimizedImageUrl(project.mainImage, 800)} 800w,
                      ${getOptimizedImageUrl(project.mainImage, 1200)} 1200w
                    `}
                    sizes="(max-width: 768px) 100vw, 50vw"
                    alt={project.title}
                  />
                  <div className="absolute inset-0 bg-black/5 group-hover:bg-transparent transition-colors z-10 pointer-events-none" />
                </div>
                
                {/* Title & Metadata details */}
                <div className="space-y-1">
                  {([project.location, project.year].filter(Boolean).length > 0) && (
                    <span className="text-[10px] font-bold uppercase tracking-widest opacity-40">
                      {[project.location, project.year].filter(Boolean).join(' — ')}
                    </span>
                  )}
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
