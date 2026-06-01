import { motion, useScroll, useTransform } from 'motion/react';
import { useParams, useNavigate } from 'react-router-dom';
import { useRef } from 'react';
import { ArrowLeft, Clock, MapPin, Maximize } from 'lucide-react';
import { projectsData } from '../data/projects';

export default function ProjectDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const project = projectsData.find(p => p.id === id);
  const containerRef = useRef(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const heroScale = useTransform(scrollYProgress, [0, 0.2], [1, 1.05]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0.4]);

  if (!project) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <h1 className="text-2xl font-display uppercase tracking-widest">Project Not Found</h1>
      </div>
    );
  }

  return (
    <div ref={containerRef} className="bg-white min-h-screen relative">
      {/* Hero Section */}
      <section className="relative h-[90vh] overflow-hidden">
        <motion.div 
          style={{ scale: heroScale, opacity: heroOpacity }}
          className="absolute inset-0"
        >
          <img 
            src={project.mainImage} 
            alt={project.title} 
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-black/40" />
        </motion.div>

        <div className="absolute inset-0 flex flex-col justify-end p-6 md:p-24 text-white z-10">
          <motion.button 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            onClick={() => navigate(-1)}
            className="absolute top-32 left-6 md:left-12 flex items-center space-x-2 text-white/60 hover:text-white transition-colors uppercase text-[10px] tracking-widest font-bold"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back</span>
          </motion.button>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
          >
            <span className="text-[10px] uppercase tracking-[0.6em] font-bold text-white/50 mb-6 inline-block">
              {project.category}
            </span>
            <h1 className="text-5xl md:text-[8vw] font-display font-medium tracking-tighter leading-none uppercase mb-8 italic">
              {project.title}
            </h1>
          </motion.div>
        </div>
      </section>

      {/* Project Brief & Details Section */}
      <section className="py-24 md:py-40 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 md:gap-24">
            {/* Left Column: Brief and description */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="lg:col-span-7 space-y-12"
            >
              <div className="space-y-6">
                <h2 className="text-xs uppercase tracking-[0.4em] font-bold text-black/30">Project Brief</h2>
                <p className="text-3xl md:text-5xl font-display font-medium leading-tight italic uppercase">
                  {project.brief}
                </p>
              </div>
              <p className="text-black/60 text-lg leading-relaxed max-w-2xl font-light">
                {project.description}
              </p>
            </motion.div>

            {/* Right Column: Specification metrics */}
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="lg:col-span-5 bg-[#f3f4f6] p-8 md:p-12 rounded-3xl"
            >
              <div className="space-y-12">
                <div className="grid grid-cols-2 gap-8">
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2 text-black/20">
                      <MapPin className="w-3 h-3" />
                      <span className="text-[10px] uppercase font-bold tracking-widest">Location</span>
                    </div>
                    <p className="font-bold">{project.location}</p>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2 text-black/20">
                      <Clock className="w-3 h-3" />
                      <span className="text-[10px] uppercase font-bold tracking-widest">Year</span>
                    </div>
                    <p className="font-bold">{project.year}</p>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2 text-black/20">
                      <Maximize className="w-3 h-3" />
                      <span className="text-[10px] uppercase font-bold tracking-widest">Area</span>
                    </div>
                    <p className="font-bold">{project.area}</p>
                  </div>
                </div>

                <div className="space-y-4 border-t border-black/5 pt-8">
                  <h3 className="text-[10px] uppercase tracking-widest font-bold text-black/30">Project Team</h3>
                  <div className="flex flex-wrap gap-3">
                    {project.team.map((member, i) => (
                      <span key={i} className="px-4 py-2 bg-white border border-black/5 rounded-full text-xs font-semibold shadow-sm">
                        {member}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Gallery Section - Simplified Vertical Stack */}
      <section className="py-24 bg-white border-t border-black/5">
        <div className="max-w-7xl mx-auto px-6 space-y-24">
          <div className="flex justify-between items-end">
            <div className="space-y-4">
              <h2 className="text-xs uppercase tracking-[0.4em] font-bold text-black/30">Gallery</h2>
              <h3 className="text-4xl md:text-6xl font-display font-medium tracking-tighter uppercase italic">Visual Narrative</h3>
            </div>
          </div>

          <div className="space-y-12 md:space-y-24">
            {project.gallery.map((img, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                viewport={{ once: true, margin: "-100px" }}
                className="w-full aspect-video rounded-[2rem] overflow-hidden bg-[#f3f4f6]"
              >
                <img 
                  src={img} 
                  alt={`Project image ${i + 1}`} 
                  className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-1000 ease-out"
                  referrerPolicy="no-referrer"
                />
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Bottom CTA / Continue exploration */}
      <section className="py-32 px-6 border-t border-black/5 bg-[#f3f4f6]">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-24 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="text-left space-y-8"
          >
            <h2 className="text-4xl md:text-6xl font-display font-medium uppercase tracking-tight italic">Have a similar <br /> Vision?</h2>
            <button 
              onClick={() => navigate('/contact')}
              className="bg-black text-white px-12 py-5 rounded-full font-bold uppercase text-xs tracking-[0.3em] hover:bg-black/80 hover:scale-105 transition-all shadow-2xl"
            >
              Start Your Project
            </button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex flex-col items-end text-right space-y-4"
          >
            <span className="text-[10px] uppercase tracking-[0.4em] font-bold text-black/30">Continue Exploring</span>
            <button 
              onClick={() => {
                const currentIndex = projectsData.findIndex(p => p.id === id);
                const nextProject = projectsData[(currentIndex + 1) % projectsData.length];
                navigate(`/portfolio/${nextProject.category}/${nextProject.id}`);
              }}
              className="group text-4xl md:text-6xl font-display font-medium tracking-tighter uppercase hover:opacity-60 transition-opacity italic"
            >
              Next Project <span className="inline-block transition-transform group-hover:translate-x-2">→</span>
            </button>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
