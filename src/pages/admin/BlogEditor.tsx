import { useState, useEffect } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { BlogPost } from '../Blog';
import { ArrowLeft, ChevronDown } from 'lucide-react';

export default function BlogEditor() {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditMode = !!id;

  const [title, setTitle] = useState('');
  const [excerpt, setExcerpt] = useState('');
  const [category, setCategory] = useState('Architecture');
  const [customCategory, setCustomCategory] = useState('');
  const [isCustomCategory, setIsCustomCategory] = useState(false);
  const [date, setDate] = useState('');
  const [readTime, setReadTime] = useState('');
  const [contentInput, setContentInput] = useState('');
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  // Get current date in "Month DD, YYYY" format
  const getFormattedDate = () => {
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date().toLocaleDateString('en-US', options);
  };

  useEffect(() => {
    const token = localStorage.getItem('adminToken');
    if (!token) {
      navigate('/admin/login');
      return;
    }

    if (isEditMode) {
      const fetchBlog = async () => {
        setLoading(true);
        try {
          const res = await fetch('/api/blog');
          if (!res.ok) throw new Error('Error loading blog post');
          const data: BlogPost[] = await res.json();
          const post = data.find(b => b.id === id);
          if (post) {
            setTitle(post.title);
            setExcerpt(post.excerpt);
            
            const standardCategories = ['Architecture', 'Interior', 'Design'];
            if (standardCategories.includes(post.category)) {
              setCategory(post.category);
              setIsCustomCategory(false);
            } else {
              setCategory('Other');
              setCustomCategory(post.category);
              setIsCustomCategory(true);
            }
            
            setDate(post.date);
            setReadTime(post.readTime);
            setContentInput(post.content.join('\n\n'));
          } else {
            setError('Blog post not found');
          }
        } catch (err) {
          setError('Failed to fetch blog post details');
        } finally {
          setLoading(false);
        }
      };
      fetchBlog();
    } else {
      // Set default date for new posts
      setDate(getFormattedDate());
    }
  }, [id, isEditMode, navigate]);

  // Auto-calculate read time when content changes
  useEffect(() => {
    if (!isEditMode && contentInput) {
      const wordsPerMinute = 200;
      const wordCount = contentInput.trim().split(/\s+/).filter(w => w.length > 0).length;
      const minutes = Math.ceil(wordCount / wordsPerMinute);
      setReadTime(`${minutes} min read`);
    }
  }, [contentInput, isEditMode]);

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
    const finalCategory = isCustomCategory ? customCategory.trim() : category;

    if (!finalCategory) {
      setError('Please specify a category');
      setLoading(false);
      return;
    }

    // Split content by double newlines or single newlines to get paragraphs
    const content = contentInput
      .split(/\n\n+/)
      .map(p => p.trim())
      .filter(p => p.length > 0);

    const blogPayload = {
      id: slug,
      title,
      excerpt,
      date: date || getFormattedDate(),
      category: finalCategory,
      readTime: readTime || '3 min read',
      content
    };

    try {
      const url = isEditMode ? `/api/blog/${id}` : '/api/blog';
      const method = isEditMode ? 'PUT' : 'POST';

      const res = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('adminToken')}`
        },
        body: JSON.stringify(blogPayload)
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.message || 'Error saving blog post');
      }

      navigate('/admin');
    } catch (err: any) {
      setError(err.message || 'Error saving blog post details');
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
            {isEditMode ? 'Edit Journal Article' : 'New Journal Article'}
          </h1>
        </div>

        {error && (
          <div className="bg-red-500/10 border border-red-500/20 text-red-500 text-xs font-bold uppercase tracking-wider rounded-xl px-4 py-3 text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Title */}
            <div className="flex flex-col gap-3">
              <label className="text-[10px] font-bold uppercase tracking-widest text-black/40">Article Title*</label>
              <input
                type="text"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. The Future of Urban Architecture"
                className="w-full bg-black/5 border border-black/5 rounded-xl px-5 py-4 text-sm focus:border-black/20 outline-none transition-all placeholder:text-black/20 font-sans"
              />
            </div>

            {/* Category selection */}
            <div className="flex flex-col gap-3 relative">
              <label className="text-[10px] font-bold uppercase tracking-widest text-black/40">Category*</label>
              <div className="flex gap-4">
                <div className="relative flex-1">
                  <button
                    type="button"
                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                    className="w-full bg-black/5 border border-black/5 rounded-xl px-5 py-4 text-sm text-left focus:border-black/20 outline-none transition-all cursor-pointer font-sans flex justify-between items-center"
                  >
                    <span>{isCustomCategory ? 'Other (Custom)' : category}</span>
                    <ChevronDown size={16} className={`transform transition-transform duration-300 ${isDropdownOpen ? 'rotate-180' : 'rotate-0'} text-black/40`} />
                  </button>

                  {isDropdownOpen && (
                    <>
                      <div 
                        className="fixed inset-0 z-10" 
                        onClick={() => setIsDropdownOpen(false)}
                      />
                      <div className="absolute top-[calc(100%+8px)] left-0 w-full bg-white border border-black/5 rounded-xl shadow-xl shadow-black/5 overflow-hidden z-20 py-2 animate-in fade-in slide-in-from-top-2 duration-200">
                        {['Architecture', 'Interior', 'Design'].map((cat) => (
                          <button
                            key={cat}
                            type="button"
                            onClick={() => {
                              setCategory(cat);
                              setIsCustomCategory(false);
                              setIsDropdownOpen(false);
                            }}
                            className={`w-full px-5 py-3 text-sm text-left transition-colors cursor-pointer ${
                              !isCustomCategory && category === cat ? 'bg-black text-white font-bold' : 'text-black/70 hover:bg-black/5'
                            }`}
                          >
                            {cat}
                          </button>
                        ))}
                        <button
                          type="button"
                          onClick={() => {
                            setIsCustomCategory(true);
                            setIsDropdownOpen(false);
                          }}
                          className={`w-full px-5 py-3 text-sm text-left transition-colors cursor-pointer ${
                            isCustomCategory ? 'bg-black text-white font-bold' : 'text-black/70 hover:bg-black/5'
                          }`}
                        >
                          Other (Custom)
                        </button>
                      </div>
                    </>
                  )}
                </div>

                {isCustomCategory && (
                  <input
                    type="text"
                    required
                    value={customCategory}
                    onChange={(e) => setCustomCategory(e.target.value)}
                    placeholder="Enter custom category"
                    className="bg-black/5 border border-black/5 rounded-xl px-5 py-4 text-sm focus:border-black/20 outline-none transition-all placeholder:text-black/20 font-sans flex-1"
                  />
                )}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Date */}
            <div className="flex flex-col gap-3">
              <label className="text-[10px] font-bold uppercase tracking-widest text-black/40">Publish Date*</label>
              <input
                type="text"
                required
                value={date}
                onChange={(e) => setDate(e.target.value)}
                placeholder="e.g. June 17, 2026"
                className="w-full bg-black/5 border border-black/5 rounded-xl px-5 py-4 text-sm focus:border-black/20 outline-none transition-all placeholder:text-black/20 font-sans"
              />
            </div>

            {/* Read Time */}
            <div className="flex flex-col gap-3">
              <label className="text-[10px] font-bold uppercase tracking-widest text-black/40">Read Time*</label>
              <input
                type="text"
                required
                value={readTime}
                onChange={(e) => setReadTime(e.target.value)}
                placeholder="e.g. 5 min read"
                className="w-full bg-black/5 border border-black/5 rounded-xl px-5 py-4 text-sm focus:border-black/20 outline-none transition-all placeholder:text-black/20 font-sans"
              />
            </div>
          </div>

          {/* Excerpt */}
          <div className="flex flex-col gap-3">
            <label className="text-[10px] font-bold uppercase tracking-widest text-black/40">Excerpt / Short Preview*</label>
            <textarea
              required
              rows={3}
              value={excerpt}
              onChange={(e) => setExcerpt(e.target.value)}
              placeholder="Provide a one or two sentence teaser summary of this article..."
              className="w-full bg-black/5 border border-black/5 rounded-xl px-5 py-4 text-sm focus:border-black/20 outline-none transition-all placeholder:text-black/20 resize-none font-sans"
            />
          </div>

          {/* Content paragraphs */}
          <div className="flex flex-col gap-3">
            <label className="text-[10px] font-bold uppercase tracking-widest text-black/40">
              Content Paragraphs* (Separate each paragraph with an empty line)
            </label>
            <textarea
              required
              rows={12}
              value={contentInput}
              onChange={(e) => setContentInput(e.target.value)}
              placeholder="Write the full content of the journal article here. Hit Enter twice to create a new paragraph."
              className="w-full bg-black/5 border border-black/5 rounded-xl px-5 py-4 text-sm focus:border-black/20 outline-none transition-all placeholder:text-black/20 font-sans leading-relaxed"
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
                isEditMode ? 'Update Article' : 'Publish Article'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
