import { motion, AnimatePresence, useScroll, useTransform } from 'motion/react';
import { useParams, useNavigate } from 'react-router-dom';
import { useState, useEffect, useRef } from 'react';
import { ArrowLeft, Clock, MapPin, Maximize, ChevronLeft, ChevronRight, X, ZoomIn } from 'lucide-react';
import { Project } from '../data/projects';

export default function ProjectDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);

  const { scrollYProgress } = useScroll();

  const heroScale = useTransform(scrollYProgress, [0, 0.2], [1, 1.05]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0.4]);

  useEffect(() => {
    fetch('/api/projects')
      .then(res => res.json())
      .then((data: Project[]) => {
        setProjects(data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error fetching projects:', err);
        setLoading(false);
      });
  }, []);

  const project = projects.find(p => p.id === id);
  const allImages = project ? [project.mainImage, ...(project.gallery || [])] : [];

  useEffect(() => {
    setCurrentImageIndex(0);
  }, [id]);

  // Auto-scroll logic for the carousel (placed before early returns to comply with React Hooks Rules)
  useEffect(() => {
    if (loading || !project || isLightboxOpen || allImages.length === 0) return;
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % allImages.length);
    }, 5500);
    return () => clearInterval(interval);
  }, [allImages.length, isLightboxOpen, loading, project]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="w-6 h-6 border-2 border-black border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!project) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <h1 className="text-2xl font-display uppercase tracking-widest">Project Not Found</h1>
      </div>
    );
  }
  
  const hasSpecs = !!(project.location || project.year || project.area || (project.team && project.team.length > 0));

  return (
    <div className="bg-white min-h-screen relative">
      {/* Hero Section (Carousel) */}
      <section className="relative h-[90vh] overflow-hidden bg-black">
        {/* Animated Carousel Images */}
        <div 
          className="absolute inset-0 cursor-zoom-in z-0"
          onClick={() => setIsLightboxOpen(true)}
        >
          <motion.div 
            style={{ scale: heroScale, opacity: heroOpacity }}
            className="w-full h-full relative"
          >
            <AnimatePresence mode="wait">
              <motion.div 
                key={currentImageIndex}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.8, ease: "easeInOut" }}
                className="absolute inset-0"
              >
                <img 
                  src={allImages[currentImageIndex]} 
                  alt={`${project.title} - view ${currentImageIndex + 1}`} 
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </motion.div>
            </AnimatePresence>
          </motion.div>
          {/* Subtle gradient to anchor text and buttons */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none" />
        </div>

        {/* Floating Content Overlaid on Carousel */}
        <div className="absolute inset-0 flex flex-col justify-end p-6 md:p-24 text-white z-10 pointer-events-none">
          {/* Back Button */}
          <motion.button 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            onClick={(e) => {
              e.stopPropagation();
              navigate(-1);
            }}
            className="absolute top-8 md:top-12 left-6 md:left-12 flex items-center space-x-2 text-white/60 hover:text-white transition-colors uppercase text-[10px] tracking-widest font-bold z-20 pointer-events-auto cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back</span>
          </motion.button>

          {/* Fullscreen indicator button */}
          <motion.button
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            onClick={(e) => {
              e.stopPropagation();
              setIsLightboxOpen(true);
            }}
            className="absolute top-8 md:top-12 right-6 md:right-12 w-10 h-10 rounded-full border border-white/20 bg-black/25 text-white flex items-center justify-center hover:bg-white hover:text-black hover:border-white transition-all z-20 pointer-events-auto cursor-pointer"
            title="View Fullscreen"
          >
            <ZoomIn className="w-4.5 h-4.5" />
          </motion.button>

          {/* Left Arrow Controls */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              setCurrentImageIndex((prev) => (prev - 1 + allImages.length) % allImages.length);
            }}
            className="absolute left-6 md:left-12 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full border border-white/20 bg-black/25 text-white flex items-center justify-center hover:bg-white hover:text-black hover:border-white transition-all z-20 pointer-events-auto cursor-pointer"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          {/* Right Arrow Controls */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              setCurrentImageIndex((prev) => (prev + 1) % allImages.length);
            }}
            className="absolute right-6 md:right-12 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full border border-white/20 bg-black/25 text-white flex items-center justify-center hover:bg-white hover:text-black hover:border-white transition-all z-20 pointer-events-auto cursor-pointer"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          {/* Title and Category */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="mb-8"
          >
            <span className="text-[10px] uppercase tracking-[0.6em] font-bold text-white/50 mb-6 inline-block">
              {project.category}
            </span>
            <h1 className="text-5xl md:text-[8vw] font-display font-medium tracking-tighter leading-none uppercase italic">
              {project.title}
            </h1>
          </motion.div>

          {/* Indicators / Navigation Dots */}
          <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex items-center space-x-3 z-20 pointer-events-auto">
            {allImages.map((_, i) => (
              <button
                key={i}
                onClick={(e) => {
                  e.stopPropagation();
                  setCurrentImageIndex(i);
                }}
                className={`w-2 h-2 rounded-full transition-all cursor-pointer ${
                  currentImageIndex === i ? "bg-white scale-125 w-4" : "bg-white/40 hover:bg-white/60"
                }`}
              />
            ))}
          </div>
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
              className={`space-y-12 ${hasSpecs ? "lg:col-span-7" : "lg:col-span-12"}`}
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
            {hasSpecs && (
              <motion.div 
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="lg:col-span-5 bg-[#f3f4f6] p-8 md:p-12 rounded-3xl"
              >
                <div className="space-y-12">
                  {(project.location || project.year || project.area) && (
                    <div className="grid grid-cols-2 gap-8">
                      {project.location && (
                        <div className="space-y-2">
                          <div className="flex items-center space-x-2 text-black/20">
                            <MapPin className="w-3 h-3" />
                            <span className="text-[10px] uppercase font-bold tracking-widest">Location</span>
                          </div>
                          <p className="font-bold">{project.location}</p>
                        </div>
                      )}
                      {project.year && (
                        <div className="space-y-2">
                          <div className="flex items-center space-x-2 text-black/20">
                            <Clock className="w-3 h-3" />
                            <span className="text-[10px] uppercase font-bold tracking-widest">Year</span>
                          </div>
                          <p className="font-bold">{project.year}</p>
                        </div>
                      )}
                      {project.area && (
                        <div className="space-y-2">
                          <div className="flex items-center space-x-2 text-black/20">
                            <Maximize className="w-3 h-3" />
                            <span className="text-[10px] uppercase font-bold tracking-widest">Area</span>
                          </div>
                          <p className="font-bold">{project.area}</p>
                        </div>
                      )}
                    </div>
                  )}

                  {project.team && project.team.length > 0 && (
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
                  )}
                </div>
              </motion.div>
            )}
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
                const currentIndex = projects.findIndex(p => p.id === id);
                const nextProject = projects[(currentIndex + 1) % projects.length];
                navigate(`/portfolio/${nextProject.category}/${nextProject.id}`);
              }}
              className="group text-4xl md:text-6xl font-display font-medium tracking-tighter uppercase hover:opacity-60 transition-opacity italic"
            >
              Next Project <span className="inline-block transition-transform group-hover:translate-x-2">→</span>
            </button>
          </motion.div>
        </div>
      </section>

      {/* Lightbox / Fullscreen Modal */}
      <AnimatePresence>
        {isLightboxOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/95 flex flex-col items-center justify-center p-6 select-none"
            onClick={() => setIsLightboxOpen(false)}
          >
            {/* Close Button */}
            <button
              onClick={() => setIsLightboxOpen(false)}
              className="absolute top-6 right-6 text-white/70 hover:text-white w-12 h-12 flex items-center justify-center rounded-full hover:bg-white/10 transition-all z-50 cursor-pointer"
            >
              <X className="w-6 h-6" />
            </button>

            {/* Left Button */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                setCurrentImageIndex((prev) => (prev - 1 + allImages.length) % allImages.length);
              }}
              className="absolute left-6 top-1/2 -translate-y-1/2 w-14 h-14 rounded-full border border-white/10 bg-white/5 text-white flex items-center justify-center hover:bg-white hover:text-black hover:border-white transition-all z-50 cursor-pointer"
            >
              <ChevronLeft className="w-8 h-8" />
            </button>

            {/* Right Button */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                setCurrentImageIndex((prev) => (prev + 1) % allImages.length);
              }}
              className="absolute right-6 top-1/2 -translate-y-1/2 w-14 h-14 rounded-full border border-white/10 bg-white/5 text-white flex items-center justify-center hover:bg-white hover:text-black hover:border-white transition-all z-50 cursor-pointer"
            >
              <ChevronRight className="w-8 h-8" />
            </button>

            {/* Large Image */}
            <motion.img
              key={currentImageIndex}
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ duration: 0.3 }}
              src={allImages[currentImageIndex]}
              alt={`${project.title} fullscreen view ${currentImageIndex + 1}`}
              className="max-w-full max-h-[80vh] object-contain rounded-lg shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            />

            {/* Bottom Info Counter */}
            <div className="absolute bottom-8 text-white/50 text-xs tracking-widest font-mono uppercase">
              {currentImageIndex + 1} / {allImages.length} — Click outside to close
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
