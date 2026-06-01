import { motion, useScroll, useTransform } from 'motion/react';
import { useRef } from 'react';

export default function About() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const titleScale = useTransform(scrollYProgress, [0, 0.2], [1, 0.85]);
  const titleOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);

  return (
    <div ref={containerRef} className="bg-white overflow-x-hidden w-full">
      {/* Dramatic Hero Section */}
      <section className="h-screen flex flex-col items-center justify-center px-6 relative overflow-hidden bg-black text-white">
        <motion.div 
          style={{ scale: titleScale, opacity: titleOpacity }}
          className="text-center z-10"
        >
          <motion.span 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="text-[10px] uppercase tracking-[0.6em] font-bold text-white/50 mb-8 inline-block"
          >
            Since 2020
          </motion.span>
          <motion.h1 
            initial={{ y: 40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="text-[12vw] font-display font-medium tracking-tighter leading-[0.8] uppercase italic"
          >
            Our Story
          </motion.h1>
        </motion.div>
        
        <motion.div 
          initial={{ height: 0 }}
          animate={{ height: "100px" }}
          transition={{ duration: 1, delay: 1 }}
          className="absolute bottom-12 left-1/2 -translate-x-1/2 w-[1px] bg-white/20"
        />
      </section>

      <div className="max-w-7xl mx-auto px-6 py-20 md:py-56">
        {/* Narrative Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 md:gap-24 mb-24 md:mb-56">
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
            className="lg:col-span-5"
          >
            <h2 className="text-4xl md:text-6xl font-display font-medium uppercase tracking-tighter leading-none mb-8 md:mb-12 italic">
              A collective <br />
              that makes <br />
              dreams <span className="opacity-50">come true.</span>
            </h2>
          </motion.div>
          <div className="lg:col-span-1" />
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
            viewport={{ once: true }}
            className="lg:col-span-6 space-y-12"
          >
            <p className="text-2xl md:text-3xl text-black/85 font-display font-medium leading-tight italic">
              We met during the course of architecture as strangers, with time our relationship transformed from strangers to friends, to family, to partners. 
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-black/50 text-sm leading-relaxed font-light">
              <p>
                We set our goals during our college days as we understood each other's skillsets, strengths, and weaknesses, which proved highly advantageous as we moved forward. We work together as gears—one's weakness is filled by the other's strength, enabling us to deliver powerful results.
              </p>
              <p>
                Our shared passion for minimalist aesthetics and structural innovation drives every project. We believe that architecture is not just building spaces, but crafting an emotional resonance between raw materials and natural light.
              </p>
            </div>
          </motion.div>
        </div>

        {/* Meet the Founders Section */}
        <section className="space-y-24 md:space-y-72">
          {/* Yash Patel */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-24 items-center">
            <motion.div 
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
              viewport={{ once: true }}
              className="relative aspect-[4/5] rounded-[3rem] overflow-hidden"
            >
              <img 
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=1200" 
                alt="Ar. Yash Patel" 
                className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-1000 ease-out"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
            </motion.div>
            <motion.div 
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.3 }}
              viewport={{ once: true }}
              className="space-y-8"
            >
              <div className="space-y-2">
                <h3 className="text-5xl md:text-6xl font-display font-medium tracking-tighter uppercase italic">Ar. Yash Patel</h3>
                <p className="text-black/40 uppercase text-xs tracking-[0.3em] font-bold">Founder & Principal Architect</p>
              </div>
              <p className="text-xl md:text-2xl text-black/60 font-display leading-relaxed italic font-light">
                "Design is a fascinating art form that conveys the emotions of a space. Touched by hands, seen by eyes, heard by ears, smelled by nose and the most important loved by heart, design must appeal to the senses."
              </p>
              <div className="w-24 h-[1px] bg-black/10" />
            </motion.div>
          </div>

          {/* Rathin Shah */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-24 items-center">
            <motion.div 
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.3 }}
              viewport={{ once: true }}
              className="order-2 lg:order-1 space-y-8 text-left lg:text-right flex flex-col items-start lg:items-end"
            >
              <div className="space-y-2">
                <h3 className="text-5xl md:text-6xl font-display font-medium tracking-tighter uppercase italic">Ar. Rathin Shah</h3>
                <p className="text-black/40 uppercase text-xs tracking-[0.3em] font-bold">Co-founder & Principal Architect</p>
              </div>
              <p className="text-xl md:text-2xl text-black/60 font-display leading-relaxed italic font-light">
                "Design is a never-ending process. Architectural design is for you if you are thrilled by everyday challenges. It's about having the rigour to strive for improvement."
              </p>
              <div className="w-24 h-[1px] bg-black/10" />
            </motion.div>
            <motion.div 
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
              viewport={{ once: true }}
              className="order-1 lg:order-2 relative aspect-[4/5] rounded-[3rem] overflow-hidden"
            >
              <img 
                src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=1200" 
                alt="Ar. Rathin Shah" 
                className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-1000 ease-out"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
            </motion.div>
          </div>
        </section>
      </div>

      {/* Philosophy Section */}
      <section className="py-48 bg-[#f3f4f6] overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col items-center text-center">
            <motion.h2 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
              viewport={{ once: true }}
              className="text-2xl md:text-4xl font-display font-medium uppercase tracking-tight mb-24 max-w-4xl italic"
            >
              We believe in the power of <span className="opacity-40">structural honesty</span> and the emotional weight of <span className="opacity-40">minimalist geometry.</span>
            </motion.h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12 w-full">
              {[
                { title: "Materiality", desc: "Understanding the soul of concrete, glass, and wood." },
                { title: "Clarity", desc: "Removing the noise to reveal the absolute essence of space." },
                { title: "Context", desc: "Buildings that speak the language of their landscape." }
              ].map((item, idx) => (
                <motion.div 
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: idx * 0.1 }}
                  viewport={{ once: true }}
                  className="space-y-4"
                >
                  <h4 className="text-[10px] uppercase tracking-[0.4em] font-bold text-black/30">{item.title}</h4>
                  <p className="text-lg font-medium">{item.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
