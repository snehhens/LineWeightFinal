import { motion } from 'motion/react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

export default function Portfolio() {
  const navigate = useNavigate();

  const sections = [
    {
      title: "Architecture",
      image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=2000",
      path: "/portfolio/architecture",
      description: "Structural masterpieces that redefine city skylines and sensory spaces."
    },
    {
      title: "Interior",
      image: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&q=80&w=2000",
      path: "/portfolio/interior",
      description: "Curated residential and commercial spaces where comfort meets cutting-edge minimalism."
    }
  ];

  return (
    <section className="flex flex-col md:flex-row h-screen w-full overflow-hidden bg-black pt-20 md:pt-0">
      {sections.map((section, idx) => (
        <motion.div
          key={section.title}
          initial={{ opacity: 0, x: idx === 0 ? -80 : 80 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="relative flex-1 group cursor-pointer overflow-hidden border-black md:border-r last:border-r-0"
          onClick={() => navigate(section.path)}
        >
          {/* Default grayscale filter, full color on hover */}
          <div className="absolute inset-0 w-full h-full">
            <img
              src={section.image}
              alt={section.title}
              className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-1000 ease-out"
              referrerPolicy="no-referrer"
            />
          </div>
          
          {/* Overlay */}
          <div className="absolute inset-0 bg-black/50 group-hover:bg-black/25 transition-colors duration-700" />
          
          {/* Centered content */}
          <div className="relative h-full flex flex-col items-center justify-center text-white px-6 md:px-12 text-center">
            <motion.span 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="text-[10px] uppercase tracking-[0.4em] font-bold mb-4 text-white/50"
            >
              Excellence in Design
            </motion.span>
            <motion.h2 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-display font-medium tracking-tight mb-4 md:mb-6 uppercase italic pr-2 sm:pr-4"
            >
              {section.title}
            </motion.h2>
            <motion.p 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="max-w-xs text-sm text-white/60 leading-relaxed group-hover:opacity-100 md:opacity-0 transition-opacity duration-700 hidden md:block"
            >
              {section.description}
            </motion.p>
            
            <motion.div
              className="mt-8 md:mt-12 w-14 h-14 rounded-full border border-white/20 flex items-center justify-center bg-transparent group-hover:bg-white group-hover:border-white group-hover:text-black transition-all duration-500"
            >
              <ArrowRight size={20} />
            </motion.div>
          </div>
        </motion.div>
      ))}
    </section>
  );
}
