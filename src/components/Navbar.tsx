import { motion } from "motion/react";
import { Menu, X } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const [isVisible, setIsVisible] = useState(true);
  const lastScrollY = useRef(0);

  useEffect(() => {
    // Reset navbar visibility on page transition
    setIsVisible(true);

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      // Hide if scrolling down, show if scrolling up
      if (currentScrollY > lastScrollY.current && currentScrollY > 100) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }
      
      lastScrollY.current = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [location.pathname]);

  const navLinks = [
    { name: "Portfolio", path: "/portfolio" },
    { name: "About Us", path: "/about" },
    { name: "Blog", path: "/blog" },
    { name: "Contact Us", path: "/contact" },
  ];

  // Dynamic detection for dark pages to adapt theme
  const isDarkTheme = 
    location.pathname === "/portfolio" ||
    location.pathname === "/about" ||
    location.pathname === "/contact" ||
    (location.pathname.startsWith("/portfolio/architecture/") && location.pathname.split("/").length > 3) ||
    (location.pathname.startsWith("/portfolio/interior/") && location.pathname.split("/").length > 3);

  const themeClasses = isDarkTheme
    ? "bg-black/20 text-white border-white/10"
    : "bg-white/80 text-black border-black/5 shadow-sm";

  return (
    <div className={`fixed top-0 left-0 w-full z-50 px-4 md:px-10 py-6 transition-transform duration-500 ease-in-out ${
      isVisible ? "translate-y-0" : "-translate-y-full"
    }`}>
      <nav className={`max-w-7xl mx-auto flex justify-between items-center backdrop-blur-md px-8 h-20 border rounded-2xl transition-colors duration-500 ${themeClasses}`}>
        {/* Left: Logo aligned in a straight line */}
        <Link to="/" className="flex items-center group">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-3"
          >
             <span className="text-2xl font-display font-bold tracking-tighter group-hover:scale-105 transition-transform">LWA</span>
             <div className={`w-px h-5 mx-1 transition-colors ${isDarkTheme ? 'bg-white/20' : 'bg-black/10'}`} />
             <span className="text-[11px] font-sans font-bold uppercase tracking-[0.25em] whitespace-nowrap">
               Lineweights Architecture
             </span>
          </motion.div>
        </Link>

        {/* Right: Desktop Navigation Menu & Mobile toggle (No three dots) */}
        <div className="flex items-center gap-12">
          {/* Desktop Navigation Links */}
          <div className="hidden md:flex items-center space-x-10">
            {navLinks.map((link) => {
              const isActive = location.pathname === link.path || location.pathname.startsWith(link.path + '/');
              return (
                <Link 
                  key={link.name} 
                  to={link.path}
                  className={`text-[11px] font-bold uppercase tracking-widest transition-colors relative group ${
                    isActive 
                      ? (isDarkTheme ? 'text-white' : 'text-black') 
                      : (isDarkTheme ? 'text-white/40 hover:text-white' : 'text-black/40 hover:text-black')
                  }`}
                >
                  {link.name}
                  <span className={`absolute -bottom-1 left-0 h-px transition-all ${isDarkTheme ? 'bg-white' : 'bg-black'} ${isActive ? 'w-full' : 'w-0 group-hover:w-full'}`} />
                </Link>
              );
            })}
          </div>

          {/* Mobile Toggle */}
          <div className="md:hidden">
            <button onClick={() => setIsOpen(!isOpen)} className="p-2 transition-transform active:scale-95">
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      {isOpen && (
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className={`md:hidden absolute top-28 left-4 right-4 backdrop-blur-lg rounded-2xl shadow-2xl border p-8 ${
            isDarkTheme ? 'bg-black/95 text-white border-white/10' : 'bg-white/95 text-black border-black/5'
          }`}
        >
          <div className="flex flex-col space-y-6 text-xs font-bold uppercase tracking-[0.3em] text-center">
            {navLinks.map((link) => {
              const isActive = location.pathname === link.path || location.pathname.startsWith(link.path + '/');
              return (
                <Link 
                  key={link.name} 
                  to={link.path}
                  onClick={() => setIsOpen(false)}
                  className={`py-4 border-b border-black/5 last:border-0 hover:opacity-50 ${
                    isActive ? 'opacity-100' : 'opacity-60'
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
          </div>
        </motion.div>
      )}
    </div>
  );
}

