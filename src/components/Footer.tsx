import { Instagram, Facebook } from "lucide-react";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-black text-white pt-32 pb-12 px-6 md:px-10">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 mb-32">
          
          <div className="lg:col-span-2">
            <Link to="/" className="text-4xl font-display font-bold tracking-tighter uppercase italic block mb-10">
              Lineweights
            </Link>
            <p className="text-xl md:text-2xl font-light text-white/40 leading-snug max-w-sm italic">
              A collective that makes dreams come true through architectural narratives.
            </p>
          </div>

          <div>
             <h4 className="text-[11px] font-bold uppercase tracking-[0.3em] mb-10 opacity-30">Navigation</h4>
             <ul className="space-y-6">
                <li><Link to="/portfolio" className="text-sm font-bold uppercase tracking-widest hover:opacity-50 transition-opacity">Portfolio</Link></li>
                <li><Link to="/about" className="text-sm font-bold uppercase tracking-widest hover:opacity-50 transition-opacity">About us</Link></li>
                <li><Link to="/blog" className="text-sm font-bold uppercase tracking-widest hover:opacity-50 transition-opacity">Blog</Link></li>
                <li><Link to="/contact" className="text-sm font-bold uppercase tracking-widest hover:opacity-50 transition-opacity">Contact</Link></li>
             </ul>
          </div>

          <div>
             <h4 className="text-[11px] font-bold uppercase tracking-[0.3em] mb-10 opacity-30">Studio</h4>
             <p className="text-sm font-light text-white/60 leading-relaxed mb-10 italic">
                Ahmedabad, India <br />
                A-1045, Moneyplant highstreet <br />
                Jagatpur road, S.G. highway
             </p>
             <div className="flex gap-4">
                <a href="https://www.instagram.com/_lw_architecture/" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center hover:bg-white hover:text-black transition-all" title="Instagram">
                  <Instagram size={16} />
                </a>
                <a href="https://www.facebook.com/profile.php?id=61587126871103" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center hover:bg-white hover:text-black transition-all" title="Facebook">
                  <Facebook size={16} />
                </a>
             </div>
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center py-10 border-t border-white/5 gap-6">
           <div className="flex gap-10 text-[9px] font-bold uppercase tracking-widest opacity-30">
             <a href="#" className="hover:opacity-100 transition-opacity">Privacy</a>
             <a href="#" className="hover:opacity-100 transition-opacity">Terms</a>
           </div>
           
           <div className="text-[9px] font-bold uppercase tracking-widest opacity-20">
             © 2026 Lineweights Architecture. All rights reserved.
           </div>
        </div>
      </div>
    </footer>
  );
}
