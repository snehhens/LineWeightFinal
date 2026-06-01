import { motion, useMotionValue, useSpring } from "motion/react";
import { ArrowUpRight } from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const heroImages = [
  "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=2000",
  "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=2000",
  "https://images.unsplash.com/photo-1518005020951-eccb494ad742?auto=format&fit=crop&q=80&w=2000",
  "https://images.unsplash.com/photo-1503387762-592dea58ef23?auto=format&fit=crop&q=80&w=2000"
];

export default function Home() {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [activeOpacity, setActiveOpacity] = useState(0.08);

  const springConfig = { damping: 25, stiffness: 150 };
  const cursorX = useSpring(mouseX, springConfig);
  const cursorY = useSpring(mouseY, springConfig);

  useEffect(() => {
    if (window.innerWidth < 768) {
      setActiveOpacity(0.16);
    }

    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };
    window.addEventListener("mousemove", handleMouseMove);
    
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % heroImages.length);
    }, 5500);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      clearInterval(interval);
    };
  }, [mouseX, mouseY]);

  return (
    <div className="bg-white hero-cursor-active h-screen w-screen overflow-hidden relative flex flex-col items-center justify-center">
      {/* Immersive Background Images with crossfade */}
      <div className="absolute inset-0 z-0">
        {heroImages.map((img, idx) => (
          <motion.div
            key={img}
            initial={{ opacity: 0 }}
            animate={{ opacity: currentImageIndex === idx ? activeOpacity : 0 }}
            transition={{ duration: 2.0 }}
            className="absolute inset-0"
          >
            <img 
              src={img} 
              alt="Architecture" 
              className="w-full h-full object-cover grayscale"
              referrerPolicy="no-referrer"
            />
          </motion.div>
        ))}
      </div>

      {/* Custom Plus Cursor on Home Page */}
      <motion.div
        className="custom-cursor hidden md:block"
        style={{
          left: cursorX,
          top: cursorY,
        }}
      />

      <div className="max-w-7xl mx-auto flex flex-col items-center relative z-10 px-6 text-center pt-24 md:pt-32">
        <motion.h1 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="text-5xl md:text-8xl lg:text-[9.5rem] font-display font-medium leading-[0.9] tracking-tighter"
        >
          ARCHITECTURE <br />
          <span className="perspective-text italic font-light text-black/60">FOR THE</span> SENSES
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 1.0 }}
          className="mt-10 flex flex-col items-center gap-6"
        >
          <p className="text-black/40 text-xs md:text-sm max-w-xl mx-auto tracking-widest uppercase font-bold">
            A collective that makes dreams come true
          </p>
          <Link to="/portfolio" className="bg-black text-white px-12 h-16 rounded-full flex items-center text-[11px] font-bold uppercase tracking-[0.3em] hover:bg-black/80 hover:scale-105 transition-all shadow-xl shadow-black/10 mt-4 group">
            Explore Portfolio
            <ArrowUpRight size={16} className="ml-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
          </Link>
        </motion.div>
      </div>

      {/* Absolute Bottom Info Block to anchor page and enrich mobile view */}
      <div className="absolute bottom-8 left-0 right-0 flex justify-between items-center px-8 md:px-16 text-[9px] uppercase tracking-[0.3em] opacity-40 font-bold z-10 w-full">
        <div>Ahmedabad, India</div>
        <div className="hidden sm:block">© 2026 Lineweights</div>
        <div>Collective Studio</div>
      </div>
    </div>
  );
}
