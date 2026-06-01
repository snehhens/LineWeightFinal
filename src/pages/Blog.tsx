import { motion } from "motion/react";
import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";

export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  date: string;
  category: string;
  readTime: string;
  content: string[];
}

export const blogPosts: BlogPost[] = [
  {
    id: "urban-architecture",
    title: "The Future of Urban Architecture",
    excerpt: "How sustainable design is shaping the cities of tomorrow and what it means for residents.",
    date: "May 10, 2026",
    category: "Architecture",
    readTime: "6 min read",
    content: [
      "As urban populations continue to swell, the architectural landscape must evolve to meet new ecological and social demands. The concrete jungles of the twentieth century, defined by their sterile glass facades and carbon-intensive steel frames, are giving way to a new paradigm of organic and responsive architecture.",
      "At the core of this transition is the concept of radical biophilia. By integrating secondary forests, living walls, and active water filtration directly into high-rise commercial structures, architects are converting buildings from passive energy consumers into active environmental systems. These structures act as artificial lungs for the city, purifying the air while providing natural insulation that reduces cooling demands by up to 50%.",
      "Furthermore, the integration of modular prefabrication is redefining construction speed and longevity. Rather than static structures designed for a singular purpose, the skyscrapers of tomorrow will feature modular units that can be slotted, reconfigured, or recycled as urban demographics shift. This carbon-neutral flexibility ensures that our cities are built not just for the next decade, but for the next century, blending structural honesty with geometric purity."
    ]
  },
  {
    id: "minimalism-interiors",
    title: "Minimalism in Interior Spaces",
    excerpt: "Exploring the emotional impact of minimalist interiors and how to achieve clarity in your home.",
    date: "April 28, 2026",
    category: "Interior",
    readTime: "4 min read",
    content: [
      "In an era defined by continuous digital connectivity and sensory overload, our physical environments have become vital sanctuaries. Interior design is shifting away from decoration and towards curation, exploring how the stripping away of visual noise can foster mental clarity and emotional peace.",
      "Minimalism is not merely the absence of objects; it is the presence of clarity. By focusing strictly on essential textures, honest materials, and natural shadow play, we can craft interiors that speak directly to the senses without overwhelming them. A hand-applied plaster wall, a single block of raw concrete, or a floating white oak shelf can carry more emotional weight than any ornamental trim.",
      "Key to achieving this calm is indirect lighting. By concealing sources within perimeter coves or building them into custom joinery, we eliminate the glare and visual clutter of traditional light fixtures. The result is a space where the acoustic and visual atmospheres are balanced perfectly, providing a calm container that lets the mind breathe and reflect."
    ]
  },
  {
    id: "light-building-material",
    title: "Light as a Building Material",
    excerpt: "The power of natural light in creating atmospheric architecture and its psychological effects.",
    date: "April 15, 2026",
    category: "Design",
    readTime: "5 min read",
    content: [
      "Of all the resources available to an architect, none is as potent or as cost-effective as natural light. Yet, light is often treated as a passive byproduct of window placements rather than an active structural component. When manipulated intentionally, light and shadow can redefine proportions, highlight materiality, and dictate the emotional rhythm of a building.",
      "Historically, masterpieces of sacred architecture used light to evoke awe. Modern residential and commercial designs are adopting these principles to enhance well-being. By utilizing light-refracting geometries, internal lightwells, and reactive glass skins, we can channel the sun deep into structural cores, shifting the interior atmosphere dynamically as the day progresses.",
      "This dynamic shift aligns our indoor environments with natural circadian rhythms, improving productivity and mood. A room that catches the cold, blue light of dawn feels fundamentally different from one bathed in the long, amber shadows of the golden hour. Designing with light means embracing the passing of time, turning static walls into living canvas boards."
    ]
  }
];

export default function Blog() {
  return (
    <section id="blog" className="py-40 px-6 bg-white min-h-screen">
      <div className="max-w-7xl mx-auto">
        {/* Editorial Title Block */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-24 gap-8">
           <h2 className="text-6xl md:text-[8.5rem] font-display font-medium tracking-tighter uppercase italic leading-none">Journal</h2>
           <p className="text-black/40 text-[11px] font-bold uppercase tracking-[0.4em] max-w-xs md:text-right">
             THOUGHTS ON DESIGN, SPACE, AND THE FUTURE OF HABITATION
           </p>
        </div>

        {/* Clean, Text-Only Blog List (Zero Images) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-16 md:gap-12">
          {blogPosts.map((post, idx) => (
            <motion.article 
              key={post.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: idx * 0.1 }}
              className="group flex flex-col justify-between p-8 bg-[#f3f4f6] rounded-3xl hover:bg-black hover:text-white transition-all duration-500 cursor-pointer h-[380px]"
            >
              <div>
                {/* Meta row */}
                <div className="flex items-center gap-4 mb-6">
                   <span className="text-[10px] font-bold uppercase tracking-widest opacity-40 group-hover:opacity-60">{post.date}</span>
                   <div className="w-1.5 h-1.5 rounded-full bg-black/10 group-hover:bg-white/20" />
                   <span className="text-[10px] font-bold uppercase tracking-widest opacity-40 group-hover:opacity-60">{post.category}</span>
                </div>
                
                {/* Title */}
                <h3 className="text-3xl font-display font-medium tracking-tight mb-4 leading-snug uppercase group-hover:opacity-90">
                  {post.title}
                </h3>
                
                {/* Excerpt */}
                <p className="text-black/50 group-hover:text-white/60 text-sm leading-relaxed line-clamp-3 font-light">
                  {post.excerpt}
                </p>
              </div>

              {/* Action Button */}
              <div className="pt-6">
                <Link 
                  to={`/blog/${post.id}`} 
                  className="inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest pb-1 border-b border-current hover:gap-4 transition-all duration-300"
                >
                  Read Article <ArrowUpRight size={14} />
                </Link>
              </div>
            </motion.article>
          ))}
        </div>

        {/* Subscription Newsletter box */}
        <motion.section 
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.0 }}
          viewport={{ once: true }}
          className="mt-32 p-12 md:p-20 rounded-[2.5rem] bg-black text-white relative overflow-hidden"
        >
          <div className="relative z-10 max-w-2xl">
            <h2 className="text-4xl md:text-6xl font-display font-medium tracking-tighter leading-tight mb-8 uppercase italic">
              Stay ahead <br /> of the curve
            </h2>
            <p className="text-white/60 text-base md:text-lg mb-10 font-light">
              Subscribe to our monthly journal to receive curated insights into the world of contemporary architecture and interior innovation.
            </p>
            <form className="flex flex-col md:flex-row gap-4" onSubmit={(e) => e.preventDefault()}>
              <input 
                type="email" 
                placeholder="Email Address" 
                className="bg-white/10 border border-white/15 px-8 py-4 rounded-full text-white placeholder:text-white/30 focus:outline-none focus:border-white focus:ring-1 focus:ring-white transition-all flex-1 text-sm"
              />
              <button className="bg-white text-black font-bold uppercase text-[10px] tracking-[0.2em] px-10 h-14 rounded-full hover:bg-white/90 hover:scale-105 transition-all whitespace-nowrap">
                Subscribe
              </button>
            </form>
          </div>
          
          <div className="absolute top-1/2 right-0 -translate-y-1/2 translate-x-1/4 opacity-[0.03] pointer-events-none">
            <h2 className="text-[25vw] font-display font-bold leading-none">LW</h2>
          </div>
        </motion.section>
      </div>
    </section>
  );
}
