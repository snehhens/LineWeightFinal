import { motion } from "motion/react";
import { Phone, Mail, MapPin } from "lucide-react";

export default function Contact() {
  return (
    <div className="min-h-screen bg-black">
      {/* Top Section: Dark theme */}
      <section className="bg-black pt-44 pb-32 px-6 md:px-12 lg:px-20 text-white relative overflow-hidden">
        {/* Decorative architectural grid/spin element */}
        <div className="absolute top-1/4 right-10 md:right-20 w-32 h-32 text-white/5 pointer-events-none">
          <svg viewBox="0 0 100 100" className="animate-[spin_20s_linear_infinity]">
            <g>
              {[...Array(12)].map((_, i) => (
                <rect key={i} x="48" y="0" width="4" height="40" transform={`rotate(${i * 30} 50 50)`} fill="currentColor" />
              ))}
            </g>
          </svg>
        </div>

        <div className="max-w-7xl mx-auto">
          {/* Badge */}
          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-block px-4 py-1.5 rounded-full text-[10px] md:text-xs font-bold uppercase tracking-[0.25em] text-white/60 bg-white/5 border border-white/10 mb-8"
          >
            Get In Touch
          </motion.div>

          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end mb-24 gap-12">
            <motion.h1 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="text-6xl md:text-8xl lg:text-[8.5rem] font-display font-medium tracking-tighter uppercase leading-[0.85] text-white"
            >
              Contact <br /> Us.
            </motion.h1>

            {/* Interactive dot/circle indicator from screenshot */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="hidden lg:flex w-14 h-14 rounded-full border border-white/20 items-center justify-center relative group cursor-pointer"
            >
              <div className="w-1.5 h-1.5 bg-white rounded-full transition-colors duration-300" />
              <div className="absolute inset-0 border border-white rounded-full scale-0 group-hover:scale-110 transition-transform duration-500 opacity-0 group-hover:opacity-100" />
            </motion.div>
          </div>

          {/* Contact Details Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 border-t border-white/10 pt-16 mt-12">
            {/* CALL US */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="flex flex-col gap-4 group"
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center text-white bg-white/5 group-hover:bg-white group-hover:text-black transition-all duration-300">
                  <Phone size={14} />
                </div>
                <span className="text-[10px] md:text-[11px] font-bold uppercase tracking-[0.25em] text-white/40">Call Us</span>
              </div>
              <a href="tel:+919624241045" className="text-xl md:text-2xl font-light hover:text-white/80 transition-colors">
                +91 962-424-1045
              </a>
            </motion.div>

            {/* EMAIL US */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="flex flex-col gap-4 group"
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center text-white bg-white/5 group-hover:bg-white group-hover:text-black transition-all duration-300">
                  <Mail size={14} />
                </div>
                <span className="text-[10px] md:text-[11px] font-bold uppercase tracking-[0.25em] text-white/40">Email Us</span>
              </div>
              <a href="mailto:office@lwa.co.in" className="text-xl md:text-2xl font-light hover:text-white/80 transition-colors break-all">
                office@lwa.co.in
              </a>
            </motion.div>

            {/* LOCATION */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-col gap-4 group"
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center text-white bg-white/5 group-hover:bg-white group-hover:text-black transition-all duration-300">
                  <MapPin size={14} />
                </div>
                <span className="text-[10px] md:text-[11px] font-bold uppercase tracking-[0.25em] text-white/40">Location</span>
              </div>
              <p className="text-base md:text-lg font-light text-white/80 leading-relaxed max-w-sm">
                A-1045, Moneyplant highstreet, Nr. Ganesh glory 11, Jagatpur road, S.G. highway, Ahmedabad - 382470
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Bottom Section: White theme */}
      <section className="bg-white py-32 px-6 md:px-12 lg:px-20 text-black">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 items-start">
          {/* Left Side: Text content */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-5 space-y-8"
          >
            <h2 className="text-5xl md:text-7xl font-display font-medium tracking-tighter uppercase leading-[0.9]">
              Send Us A <br />
              <span className="italic">Message.</span>
            </h2>
            <p className="text-base md:text-lg font-light text-black/60 leading-relaxed max-w-md">
              Have a vision you'd like to bring to life? Or perhaps a structural challenge that needs a minimalist solution? We're here to translate your dreams into concrete reality.
            </p>
          </motion.div>

          {/* Right Side: Form content */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-7 w-full"
          >
            <form onSubmit={(e) => e.preventDefault()} className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* First Name */}
                <div className="flex flex-col gap-3">
                  <div className="self-start px-3 py-1 bg-black/5 rounded-[6px] text-[10px] font-bold uppercase tracking-wider text-black/50">
                    Name*
                  </div>
                  <input 
                    type="text" 
                    placeholder="First Name" 
                    className="w-full bg-[#f9f9f9] border border-black/5 rounded-xl px-5 py-4 text-sm focus:border-black/20 focus:bg-white outline-none transition-all placeholder:text-black/30 font-sans"
                    required
                  />
                </div>

                {/* Last Name */}
                <div className="flex flex-col gap-3">
                  <div className="self-start px-3 py-1 bg-black/5 rounded-[6px] text-[10px] font-bold uppercase tracking-wider text-black/50">
                    Last Name
                  </div>
                  <input 
                    type="text" 
                    placeholder="Last Name" 
                    className="w-full bg-[#f9f9f9] border border-black/5 rounded-xl px-5 py-4 text-sm focus:border-black/20 focus:bg-white outline-none transition-all placeholder:text-black/30 font-sans"
                  />
                </div>
              </div>

              {/* Your Email */}
              <div className="flex flex-col gap-3">
                <div className="self-start px-3 py-1 bg-black/5 rounded-[6px] text-[10px] font-bold uppercase tracking-wider text-black/50">
                  Your Email*
                </div>
                <input 
                  type="email" 
                  placeholder="Email Address" 
                  className="w-full bg-[#f9f9f9] border border-black/5 rounded-xl px-5 py-4 text-sm focus:border-black/20 focus:bg-white outline-none transition-all placeholder:text-black/30 font-sans"
                  required
                />
              </div>

              {/* Message */}
              <div className="flex flex-col gap-3">
                <div className="self-start px-3 py-1 bg-black/5 rounded-[6px] text-[10px] font-bold uppercase tracking-wider text-black/50">
                  Message*
                </div>
                <textarea 
                  rows={5}
                  placeholder="How can we help?" 
                  className="w-full bg-[#f9f9f9] border border-black/5 rounded-xl px-5 py-4 text-sm focus:border-black/20 focus:bg-white outline-none transition-all placeholder:text-black/30 resize-none font-sans"
                  required
                />
              </div>

              {/* Submit Button */}
              <div className="flex justify-end pt-4">
                <button 
                  type="submit"
                  className="bg-black text-white hover:bg-black/80 hover:scale-[1.02] px-14 py-5 rounded-full text-xs font-bold uppercase tracking-[0.25em] transition-all duration-300 shadow-lg shadow-black/10 cursor-pointer"
                >
                  Submit
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
