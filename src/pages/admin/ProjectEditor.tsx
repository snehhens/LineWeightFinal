import { useState, useEffect } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { Project } from '../../data/projects';
import { ArrowLeft, ChevronDown } from 'lucide-react';

export default function ProjectEditor() {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditMode = !!id;

  const [category, setCategory] = useState<'architecture' | 'interior'>('architecture');
  const [title, setTitle] = useState('');
  const [brief, setBrief] = useState('');
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState('');
  const [year, setYear] = useState('');
  const [area, setArea] = useState('');
  const [teamInput, setTeamInput] = useState('');
  const [mainImage, setMainImage] = useState('');
  const [galleryInput, setGalleryInput] = useState('');
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('adminToken');
    if (!token) {
      navigate('/admin/login');
      return;
    }

    if (isEditMode) {
      const fetchProject = async () => {
        setLoading(true);
        try {
          const res = await fetch('/api/projects');
          if (!res.ok) throw new Error('Error loading project');
          const data: Project[] = await res.json();
          const proj = data.find(p => p.id === id);
          if (proj) {
            setCategory(proj.category);
            setTitle(proj.title);
            setBrief(proj.brief);
            setDescription(proj.description);
            setLocation(proj.location);
            setYear(proj.year);
            setArea(proj.area);
            setTeamInput(proj.team.join(', '));
            setMainImage(proj.mainImage);
            setGalleryInput(proj.gallery.join('\n'));
          } else {
            setError('Project not found');
          }
        } catch (err) {
          setError('Failed to fetch project details');
        } finally {
          setLoading(false);
        }
      };
      fetchProject();
    }
  }, [id, isEditMode, navigate]);

  const generateSlug = (text: string) => {
    return text
      .toString()
      .toLowerCase()
      .trim()
      .replace(/\s+/g, '-') // Replace spaces with -
      .replace(/&/g, '-and-') // Replace & with 'and'
      .replace(/[^\w\-]+/g, '') // Remove all non-word chars
      .replace(/\-\-+/g, '-'); // Replace multiple - with single -
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    const slug = isEditMode ? id : generateSlug(title);

    const team = teamInput
      .split(',')
      .map(item => item.trim())
      .filter(item => item.length > 0);

    const gallery = galleryInput
      .split('\n')
      .map(item => item.trim())
      .filter(item => item.length > 0);

    const projectPayload = {
      id: slug,
      category,
      title,
      brief,
      description,
      location,
      year,
      area,
      team,
      mainImage,
      gallery
    };

    try {
      const url = isEditMode ? `/api/projects/${id}` : '/api/projects';
      const method = isEditMode ? 'PUT' : 'POST';

      const res = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('adminToken')}`
        },
        body: JSON.stringify(projectPayload)
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.message || 'Error saving project');
      }

      navigate('/admin');
    } catch (err: any) {
      setError(err.message || 'Error saving project details');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white text-black pt-36 pb-24 px-6 md:px-12 lg:px-20">
      <div className="max-w-4xl mx-auto space-y-12">
        {/* Top Header */}
        <div className="flex flex-col gap-4 border-b border-black/5 pb-8">
          <Link
            to="/admin"
            className="flex items-center gap-3 text-[10px] font-bold uppercase tracking-widest text-black/50 hover:text-black transition-colors"
          >
            <ArrowLeft size={14} />
            <span>Back to Dashboard</span>
          </Link>
          <h1 className="text-4xl font-display font-medium uppercase italic">
            {isEditMode ? 'Edit Project' : 'New Project'}
          </h1>
        </div>

        {error && (
          <div className="bg-red-500/10 border border-red-500/20 text-red-500 text-xs font-bold uppercase tracking-wider rounded-xl px-4 py-3 text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Category selection */}
            <div className="flex flex-col gap-3 relative">
              <label className="text-[10px] font-bold uppercase tracking-widest text-black/40">Category*</label>
              <button
                type="button"
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="w-full bg-black/5 border border-black/5 rounded-xl px-5 py-4 text-sm text-left focus:border-black/20 outline-none transition-all cursor-pointer font-sans flex justify-between items-center"
              >
                <span className="capitalize">{category}</span>
                <ChevronDown size={16} className={`transform transition-transform duration-300 ${isDropdownOpen ? 'rotate-180' : 'rotate-0'} text-black/40`} />
              </button>

              {isDropdownOpen && (
                <>
                  <div 
                    className="fixed inset-0 z-10" 
                    onClick={() => setIsDropdownOpen(false)}
                  />
                  <div className="absolute top-[calc(100%+8px)] left-0 w-full bg-white border border-black/5 rounded-xl shadow-xl shadow-black/5 overflow-hidden z-20 py-2 animate-in fade-in slide-in-from-top-2 duration-200">
                    <button
                      type="button"
                      onClick={() => {
                        setCategory('architecture');
                        setIsDropdownOpen(false);
                      }}
                      className={`w-full px-5 py-3 text-sm text-left transition-colors cursor-pointer ${
                        category === 'architecture' ? 'bg-black text-white font-bold' : 'text-black/70 hover:bg-black/5'
                      }`}
                    >
                      Architecture
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setCategory('interior');
                        setIsDropdownOpen(false);
                      }}
                      className={`w-full px-5 py-3 text-sm text-left transition-colors cursor-pointer ${
                        category === 'interior' ? 'bg-black text-white font-bold' : 'text-black/70 hover:bg-black/5'
                      }`}
                    >
                      Interior
                    </button>
                  </div>
                </>
              )}
            </div>

            {/* Title */}
            <div className="flex flex-col gap-3">
              <label className="text-[10px] font-bold uppercase tracking-widest text-black/40">Project Title*</label>
              <input
                type="text"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. Mr. Ashok Patel Residence"
                className="w-full bg-black/5 border border-black/5 rounded-xl px-5 py-4 text-sm focus:border-black/20 outline-none transition-all placeholder:text-black/20 font-sans"
              />
            </div>
          </div>

          {/* Brief */}
          <div className="flex flex-col gap-3">
            <label className="text-[10px] font-bold uppercase tracking-widest text-black/40">Brief Summary*</label>
            <input
              type="text"
              required
              value={brief}
              onChange={(e) => setBrief(e.target.value)}
              placeholder="e.g. A monolithic concrete home capturing desert light..."
              className="w-full bg-black/5 border border-black/5 rounded-xl px-5 py-4 text-sm focus:border-black/20 outline-none transition-all placeholder:text-black/20 font-sans"
            />
          </div>

          {/* Description */}
          <div className="flex flex-col gap-3">
            <label className="text-[10px] font-bold uppercase tracking-widest text-black/40">Description*</label>
            <textarea
              required
              rows={6}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Provide a detailed narrative of the project design, materiality, and context..."
              className="w-full bg-black/5 border border-black/5 rounded-xl px-5 py-4 text-sm focus:border-black/20 outline-none transition-all placeholder:text-black/20 resize-none font-sans"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Location */}
            <div className="flex flex-col gap-3">
              <label className="text-[10px] font-bold uppercase tracking-widest text-black/40">Location*</label>
              <input
                type="text"
                required
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="e.g. Nakhatrana, Gujarat"
                className="w-full bg-black/5 border border-black/5 rounded-xl px-5 py-4 text-sm focus:border-black/20 outline-none transition-all placeholder:text-black/20 font-sans"
              />
            </div>

            {/* Year */}
            <div className="flex flex-col gap-3">
              <label className="text-[10px] font-bold uppercase tracking-widest text-black/40">Year*</label>
              <input
                type="text"
                required
                value={year}
                onChange={(e) => setYear(e.target.value)}
                placeholder="e.g. 2024"
                className="w-full bg-black/5 border border-black/5 rounded-xl px-5 py-4 text-sm focus:border-black/20 outline-none transition-all placeholder:text-black/20 font-sans"
              />
            </div>

            {/* Area */}
            <div className="flex flex-col gap-3">
              <label className="text-[10px] font-bold uppercase tracking-widest text-black/40">Area*</label>
              <input
                type="text"
                required
                value={area}
                onChange={(e) => setArea(e.target.value)}
                placeholder="e.g. 7,500 sq ft"
                className="w-full bg-black/5 border border-black/5 rounded-xl px-5 py-4 text-sm focus:border-black/20 outline-none transition-all placeholder:text-black/20 font-sans"
              />
            </div>
          </div>

          {/* Team Members */}
          <div className="flex flex-col gap-3">
            <label className="text-[10px] font-bold uppercase tracking-widest text-black/40">Project Team (comma-separated)</label>
            <input
              type="text"
              value={teamInput}
              onChange={(e) => setTeamInput(e.target.value)}
              placeholder="e.g. Ar. Yash Patel, Ar. Rathin Shah, R. Dave (Landscape)"
              className="w-full bg-black/5 border border-black/5 rounded-xl px-5 py-4 text-sm focus:border-black/20 outline-none transition-all placeholder:text-black/20 font-sans"
            />
          </div>

          {/* Main Cover Image */}
          <div className="flex flex-col gap-3">
            <label className="text-[10px] font-bold uppercase tracking-widest text-black/40">Main Cover Image Link (imagekit.io)*</label>
            <input
              type="url"
              required
              value={mainImage}
              onChange={(e) => setMainImage(e.target.value)}
              placeholder="e.g. https://ik.imagekit.io/username/cover.jpg"
              className="w-full bg-black/5 border border-black/5 rounded-xl px-5 py-4 text-sm focus:border-black/20 outline-none transition-all placeholder:text-black/20 font-sans"
            />
          </div>

          {/* Gallery Images */}
          <div className="flex flex-col gap-3">
            <label className="text-[10px] font-bold uppercase tracking-widest text-black/40">Gallery Image Links (one link per line)</label>
            <textarea
              rows={5}
              value={galleryInput}
              onChange={(e) => setGalleryInput(e.target.value)}
              placeholder="e.g.&#10;https://ik.imagekit.io/username/image1.jpg&#10;https://ik.imagekit.io/username/image2.jpg"
              className="w-full bg-black/5 border border-black/5 rounded-xl px-5 py-4 text-sm focus:border-black/20 outline-none transition-all placeholder:text-black/20 resize-none font-sans"
            />
          </div>

          {/* Submit Button */}
          <div className="flex justify-end pt-4">
            <button
              type="submit"
              disabled={loading}
              className="bg-black text-white hover:bg-black/85 disabled:opacity-50 px-12 py-4.5 rounded-full text-xs font-bold uppercase tracking-[0.2em] transition-all flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-black/5"
            >
              {loading ? (
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                isEditMode ? 'Update Project' : 'Create Project'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
