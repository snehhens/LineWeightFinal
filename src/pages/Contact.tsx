import { motion } from "motion/react";

export default function Contact() {
  return (
    <section className="py-40 px-6 bg-[#f3f4f6] min-h-screen">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 lg:gap-32 mb-36">
           {/* Left side: Contact Info */}
           <motion.div
             initial={{ opacity: 0, x: -30 }}
             whileInView={{ opacity: 1, x: 0 }}
             viewport={{ once: true }}
           >
              <h2 className="text-6xl md:text-[8.5rem] font-display font-medium tracking-tighter uppercase mb-16 leading-none italic">
                Contact <br /> Us
              </h2>

              <div className="flex flex-col md:flex-row gap-16 md:gap-24">
                <div>
                   <h4 className="text-[11px] font-bold uppercase tracking-[0.3em] mb-6 border-b border-black inline-block pb-1">Contacts</h4>
                   <p className="text-lg font-light leading-relaxed">
                     +91 794-938-2961 <br />
                     Office@lineweightsarchitecture.com
                   </p>
                </div>
                <div>
                   <h4 className="text-[11px] font-bold uppercase tracking-[0.3em] mb-6 border-b border-black inline-block pb-1">Address</h4>
                   <p className="text-lg font-light leading-relaxed max-w-xs">
                     A-1045, Moneyplant highstreet, Nr. Ganesh glory 11, Jagatpur road, S.G. highway, Ahmedabad - 382470
                   </p>
                </div>
              </div>
           </motion.div>

           {/* Right side: Abstract architectural graphic decorator */}
           <motion.div
             initial={{ opacity: 0, scale: 0.95 }}
             whileInView={{ opacity: 1, scale: 1 }}
             viewport={{ once: true }}
             className="relative pt-6"
           >
              <div className="bg-white p-4 rounded-[3rem] shadow-2xl relative z-10">
                <img 
                  src="https://images.unsplash.com/photo-1518005020951-eccb494ad742?auto=format&fit=crop&q=80&w=1200" 
                  alt="Architecture Design" 
                  className="rounded-[2.5rem] w-full aspect-[4/5] object-cover grayscale"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="absolute top-0 right-0 w-32 h-32 text-black opacity-10">
                 <svg viewBox="0 0 100 100" className="animate-[spin_12s_linear_infinity]">
                    <g>
                      {[...Array(12)].map((_, i) => (
                        <rect key={i} x="48" y="0" width="4" height="40" transform={`rotate(${i * 30} 50 50)`} fill="currentColor" />
                      ))}
                    </g>
                 </svg>
              </div>
           </motion.div>
        </div>

        {/* Message Form */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 lg:gap-32 items-start border-t border-black/5 pt-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
             <h3 className="text-5xl md:text-7xl font-display font-medium tracking-tighter uppercase mb-12 italic">
               Send us a <br /> message
             </h3>
             <p className="text-xl md:text-2xl font-light text-black/60 max-w-md leading-relaxed">
                If you're interested in hearing more about the way we work, have a project proposal, or want to collaborate, we'd love to hear from you.
             </p>
          </motion.div>

          <motion.form 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-10"
            onSubmit={(e) => e.preventDefault()}
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
               <div className="flex flex-col gap-2">
                 <label className="text-[11px] font-bold uppercase tracking-widest opacity-40">Name*</label>
                 <input type="text" placeholder="Your name" className="bg-transparent border-b border-black/15 py-4 focus:border-black outline-none transition-colors" />
               </div>
               <div className="flex flex-col gap-2">
                 <label className="text-[11px] font-bold uppercase tracking-widest opacity-40">Last name</label>
                 <input type="text" placeholder="Your last name" className="bg-transparent border-b border-black/15 py-4 focus:border-black outline-none transition-colors" />
               </div>
            </div>
            <div className="flex flex-col gap-2">
               <label className="text-[11px] font-bold uppercase tracking-widest opacity-40">Your email*</label>
               <input type="email" placeholder="Your email address" className="bg-transparent border-b border-black/15 py-4 focus:border-black outline-none transition-colors" />
            </div>
            <div className="flex flex-col gap-2">
               <label className="text-[11px] font-bold uppercase tracking-widest opacity-40">What are you looking for?*</label>
               <select className="bg-transparent border-b border-black/15 py-4 focus:border-black outline-none transition-colors appearance-none cursor-pointer">
                  <option value="architecture">Architectural Design</option>
                  <option value="interior">Interior Design</option>
                  <option value="landscape">Landscape Design</option>
                  <option value="other">Other Inquiry</option>
               </select>
            </div>
            <div className="flex flex-col gap-2">
               <label className="text-[11px] font-bold uppercase tracking-widest opacity-40">Message*</label>
               <textarea rows={4} placeholder="Enter your message" className="bg-transparent border-b border-black/15 py-4 focus:border-black outline-none transition-colors resize-none" />
            </div>
            <div className="flex justify-end pt-8">
               <button className="bg-black text-white px-16 h-16 rounded-full text-[11px] font-bold uppercase tracking-[0.3em] hover:bg-black/80 hover:scale-105 transition-all shadow-xl shadow-black/10">
                 Submit
               </button>
            </div>
          </motion.form>
        </div>
      </div>
    </section>
  );
}
