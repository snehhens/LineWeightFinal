import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Project } from '../../data/projects';
import { BlogPost } from '../Blog';
import { LogOut, Plus, Edit2, Trash2, Folder, BookOpen, User } from 'lucide-react';

export default function Dashboard() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [blogs, setBlogs] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'projects' | 'blogs'>('projects');
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('adminToken');
    if (!token) {
      navigate('/admin/login');
      return;
    }

    const fetchData = async () => {
      try {
        const [projRes, blogRes] = await Promise.all([
          fetch('/api/projects'),
          fetch('/api/blog')
        ]);

        if (!projRes.ok || !blogRes.ok) {
          throw new Error('Failed to fetch data');
        }

        const projData = await projRes.json();
        const blogData = await blogRes.json();

        setProjects(projData);
        setBlogs(blogData);
      } catch (err) {
        console.error('Error fetching admin dashboard data:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    localStorage.removeItem('adminUser');
    navigate('/admin/login');
  };

  const handleDeleteProject = async (id: string, title: string) => {
    if (!confirm(`Are you sure you want to delete project "${title}"?`)) return;

    try {
      const res = await fetch(`/api/projects/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('adminToken')}`
        }
      });

      if (!res.ok) {
        throw new Error('Error deleting project');
      }

      setProjects(prev => prev.filter(p => p.id !== id));
    } catch (err) {
      alert('Delete failed');
    }
  };

  const handleDeleteBlog = async (id: string, title: string) => {
    if (!confirm(`Are you sure you want to delete blog post "${title}"?`)) return;

    try {
      const res = await fetch(`/api/blog/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('adminToken')}`
        }
      });

      if (!res.ok) {
        throw new Error('Error deleting blog post');
      }

      setBlogs(prev => prev.filter(b => b.id !== id));
    } catch (err) {
      alert('Delete failed');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="w-6 h-6 border-2 border-black border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  const adminUser = localStorage.getItem('adminUser') || 'Admin';

  return (
    <div className="min-h-screen bg-white text-black pt-36 pb-24 px-6 md:px-12 lg:px-20">
      <div className="max-w-7xl mx-auto space-y-12">
        {/* Header section */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end border-b border-black/5 pb-8 gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.3em] text-black/40">
              <User size={12} />
              <span>Logged in as {adminUser}</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-display font-medium uppercase italic">Control Panel</h1>
          </div>

          <button
            onClick={handleLogout}
            className="flex items-center gap-2 px-6 py-3 border border-black/10 rounded-full text-[10px] font-bold uppercase tracking-widest hover:bg-black hover:text-white transition-all cursor-pointer"
          >
            <LogOut size={14} />
            <span>Logout</span>
          </button>
        </div>

        {/* Tab Selection */}
        <div className="flex border-b border-black/5">
          <button
            onClick={() => setActiveTab('projects')}
            className={`flex items-center gap-2 px-8 py-4 text-xs font-bold uppercase tracking-widest border-b-2 transition-all cursor-pointer ${
              activeTab === 'projects'
                ? 'border-black text-black'
                : 'border-transparent text-black/40 hover:text-black/60'
            }`}
          >
            <Folder size={14} />
            <span>Projects ({projects.length})</span>
          </button>
          <button
            onClick={() => setActiveTab('blogs')}
            className={`flex items-center gap-2 px-8 py-4 text-xs font-bold uppercase tracking-widest border-b-2 transition-all cursor-pointer ${
              activeTab === 'blogs'
                ? 'border-black text-black'
                : 'border-transparent text-black/40 hover:text-black/60'
            }`}
          >
            <BookOpen size={14} />
            <span>Journal Blogs ({blogs.length})</span>
          </button>
        </div>

        {/* Tab Contents */}
        {activeTab === 'projects' ? (
          <div className="space-y-8">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-bold uppercase tracking-widest text-black/60">Projects List</h2>
              <Link
                to="/admin/project/new"
                className="flex items-center gap-2 bg-black text-white hover:bg-black/80 px-6 py-3.5 rounded-full text-[10px] font-bold uppercase tracking-widest transition-all cursor-pointer shadow-lg shadow-black/5"
              >
                <Plus size={14} />
                <span>Add Project</span>
              </Link>
            </div>

            <div className="border border-black/5 rounded-3xl overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse text-sm">
                  <thead>
                    <tr className="bg-black/5 border-b border-black/5 font-bold text-[10px] uppercase tracking-wider text-black/40">
                      <th className="py-5 px-6">Image</th>
                      <th className="py-5 px-6">Title</th>
                      <th className="py-5 px-6">Category</th>
                      <th className="py-5 px-6">Location</th>
                      <th className="py-5 px-6 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-black/5">
                    {projects.map((proj) => (
                      <tr key={proj.id} className="hover:bg-black/[0.01] transition-colors">
                        <td className="py-4 px-6">
                          <img
                            src={proj.mainImage}
                            alt={proj.title}
                            className="w-16 h-10 object-cover rounded-md border border-black/5"
                            referrerPolicy="no-referrer"
                          />
                        </td>
                        <td className="py-4 px-6 font-bold">{proj.title}</td>
                        <td className="py-4 px-6">
                          <span className={`text-[9px] font-bold uppercase tracking-wider px-3 py-1 rounded-full ${
                            proj.category === 'architecture'
                              ? 'bg-blue-500/10 text-blue-600'
                              : 'bg-purple-500/10 text-purple-600'
                          }`}>
                            {proj.category}
                          </span>
                        </td>
                        <td className="py-4 px-6 text-black/60">{proj.location}</td>
                        <td className="py-4 px-6 text-right">
                          <div className="flex justify-end gap-3">
                            <Link
                              to={`/admin/project/edit/${proj.id}`}
                              className="w-8 h-8 rounded-full border border-black/10 flex items-center justify-center hover:bg-black hover:text-white transition-all text-black/70 cursor-pointer"
                              title="Edit"
                            >
                              <Edit2 size={12} />
                            </Link>
                            <button
                              onClick={() => handleDeleteProject(proj.id, proj.title)}
                              className="w-8 h-8 rounded-full border border-red-500/10 flex items-center justify-center hover:bg-red-500 hover:text-white transition-all text-red-500 cursor-pointer"
                              title="Delete"
                            >
                              <Trash2 size={12} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                    {projects.length === 0 && (
                      <tr>
                        <td colSpan={5} className="py-12 text-center text-black/40 uppercase tracking-widest text-xs font-semibold">
                          No projects found.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        ) : (
          <div className="space-y-8">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-bold uppercase tracking-widest text-black/60">Journal Articles</h2>
              <Link
                to="/admin/blog/new"
                className="flex items-center gap-2 bg-black text-white hover:bg-black/80 px-6 py-3.5 rounded-full text-[10px] font-bold uppercase tracking-widest transition-all cursor-pointer shadow-lg shadow-black/5"
              >
                <Plus size={14} />
                <span>Add Article</span>
              </Link>
            </div>

            <div className="border border-black/5 rounded-3xl overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse text-sm">
                  <thead>
                    <tr className="bg-black/5 border-b border-black/5 font-bold text-[10px] uppercase tracking-wider text-black/40">
                      <th className="py-5 px-6">Title</th>
                      <th className="py-5 px-6">Category</th>
                      <th className="py-5 px-6">Date</th>
                      <th className="py-5 px-6">Read Time</th>
                      <th className="py-5 px-6 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-black/5">
                    {blogs.map((post) => (
                      <tr key={post.id} className="hover:bg-black/[0.01] transition-colors">
                        <td className="py-4 px-6 font-bold">{post.title}</td>
                        <td className="py-4 px-6 text-black/60">{post.category}</td>
                        <td className="py-4 px-6 text-black/60">{post.date}</td>
                        <td className="py-4 px-6 text-black/40 font-mono text-xs">{post.readTime}</td>
                        <td className="py-4 px-6 text-right">
                          <div className="flex justify-end gap-3">
                            <Link
                              to={`/admin/blog/edit/${post.id}`}
                              className="w-8 h-8 rounded-full border border-black/10 flex items-center justify-center hover:bg-black hover:text-white transition-all text-black/70 cursor-pointer"
                              title="Edit"
                            >
                              <Edit2 size={12} />
                            </Link>
                            <button
                              onClick={() => handleDeleteBlog(post.id, post.title)}
                              className="w-8 h-8 rounded-full border border-red-500/10 flex items-center justify-center hover:bg-red-500 hover:text-white transition-all text-red-500 cursor-pointer"
                              title="Delete"
                            >
                              <Trash2 size={12} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                    {blogs.length === 0 && (
                      <tr>
                        <td colSpan={5} className="py-12 text-center text-black/40 uppercase tracking-widest text-xs font-semibold">
                          No blog posts found.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
