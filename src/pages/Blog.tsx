import { motion } from "motion/react";
import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import { useState, useEffect } from "react";

export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  date: string;
  category: string;
  readTime: string;
  content: string[];
}

export default function Blog() {
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/blog')
      .then(res => {
        if (!res.ok) throw new Error('Network response was not ok');
        return res.json();
      })
      .then((data: BlogPost[]) => {
        if (Array.isArray(data)) {
          setBlogPosts(data);
        } else {
          console.error('Expected array of blog posts, got:', data);
          setBlogPosts([]);
        }
        setLoading(false);
      })
      .catch(err => {
        console.error('Error fetching blog posts:', err);
        setBlogPosts([]);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="w-6 h-6 border-2 border-black border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

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
            <h2 className="text-[25vw] font-display font-bold leading-none">LWA</h2>
          </div>
        </motion.section>
      </div>
    </section>
  );
}
