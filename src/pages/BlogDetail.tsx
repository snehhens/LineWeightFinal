import { useParams, useNavigate } from "react-router-dom";
import { motion } from "motion/react";
import { ArrowLeft } from "lucide-react";
import { useState, useEffect } from "react";
import { BlogPost } from "./Blog";

export default function BlogDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
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
        console.error('Error fetching blog post:', err);
        setBlogPosts([]);
        setLoading(false);
      });
  }, []);

  const post = blogPosts.find(p => p.id === id);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="w-6 h-6 border-2 border-black border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <h1 className="text-2xl font-display uppercase tracking-widest">Article Not Found</h1>
      </div>
    );
  }

  return (
    <article className="min-h-screen bg-white pt-40 pb-24 px-6">
      <div className="max-w-4xl mx-auto">
        {/* Back navigation */}
        <button 
          onClick={() => navigate('/blog')}
          className="flex items-center gap-3 text-[11px] font-bold uppercase tracking-widest hover:opacity-50 transition-opacity mb-16"
        >
          <ArrowLeft size={16} />
          Back to Journal
        </button>

        {/* Article Header block */}
        <header className="border-b border-black/5 pb-12 mb-16">
          <div className="flex items-center gap-4 mb-6">
            <span className="text-[10px] font-bold uppercase tracking-widest text-black/40">{post.date}</span>
            <div className="w-1.5 h-1.5 rounded-full bg-black/20" />
            <span className="text-[10px] font-bold uppercase tracking-widest text-black/40">{post.category}</span>
            <div className="w-1.5 h-1.5 rounded-full bg-black/20" />
            <span className="text-[10px] font-bold uppercase tracking-widest text-black/40">{post.readTime}</span>
          </div>

          {/* Title rendered in elegant display italics! */}
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-display font-medium tracking-tight uppercase italic leading-[1.1] text-black">
            {post.title}
          </h1>
        </header>

        {/* Editorial Body Text Copy (No images, premium spacing) */}
        <div className="space-y-8 text-black/75 text-lg md:text-xl font-light leading-relaxed max-w-3xl">
          {post.content.map((paragraph, i) => (
            <p key={i} className="first-of-type:font-normal first-of-type:text-black">
              {paragraph}
            </p>
          ))}
        </div>

        {/* Bottom footer divider / next read suggestion */}
        <footer className="mt-24 border-t border-black/5 pt-16 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div>
            <span className="text-[9px] font-bold uppercase tracking-widest opacity-30">Written by</span>
            <h5 className="text-sm font-bold uppercase tracking-wider mt-1">Lineweights Editorial Board</h5>
          </div>

          <button 
            onClick={() => {
              const idx = blogPosts.findIndex(p => p.id === id);
              const nextIdx = (idx + 1) % blogPosts.length;
              navigate(`/blog/${blogPosts[nextIdx].id}`);
            }}
            className="group flex flex-col items-end text-right gap-1"
          >
            <span className="text-[9px] font-bold uppercase tracking-widest opacity-30">Read Next</span>
            <span className="text-xl font-display font-medium uppercase italic group-hover:opacity-50 transition-opacity">
              {blogPosts[(blogPosts.findIndex(p => p.id === id) + 1) % blogPosts.length].title} &rarr;
            </span>
          </button>
        </footer>
      </div>
    </article>
  );
}
