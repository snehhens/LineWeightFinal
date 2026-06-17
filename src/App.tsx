import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';
import CustomCursor from './components/CustomCursor';

// Pages
import Home from './pages/Home';
import Portfolio from './pages/Portfolio';
import CategoryProjects from './pages/CategoryProjects';
import ProjectDetail from './pages/ProjectDetail';
import About from './pages/About';
import Contact from './pages/Contact';
import Blog from './pages/Blog';
import BlogDetail from './pages/BlogDetail';

// Admin Pages
import Login from './pages/admin/Login';
import Dashboard from './pages/admin/Dashboard';
import ProjectEditor from './pages/admin/ProjectEditor';
import BlogEditor from './pages/admin/BlogEditor';

function AppLayout() {
  const location = useLocation();
  const isHomePage = location.pathname === '/';
  const isAdminPage = location.pathname.startsWith('/admin');
  const isProjectDetailPage = /^\/portfolio\/[^/]+\/[^/]+\/?$/.test(location.pathname);

  return (
    <div className="relative min-h-screen flex flex-col justify-between">
      {!isAdminPage && !isProjectDetailPage && <Navbar />}
      
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/portfolio" element={<Portfolio />} />
          <Route path="/portfolio/:category" element={<CategoryProjects />} />
          <Route path="/portfolio/:category/:id" element={<ProjectDetail />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/:id" element={<BlogDetail />} />

          {/* Admin Routes */}
          <Route path="/admin/login" element={<Login />} />
          <Route path="/admin" element={<Dashboard />} />
          <Route path="/admin/project/new" element={<ProjectEditor />} />
          <Route path="/admin/project/edit/:id" element={<ProjectEditor />} />
          <Route path="/admin/blog/new" element={<BlogEditor />} />
          <Route path="/admin/blog/edit/:id" element={<BlogEditor />} />
        </Routes>
      </main>

      {/* Conditionally hide the footer on the Home Page and Admin panel */}
      {!isHomePage && !isAdminPage && <Footer />}
      
      <CustomCursor />
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <ScrollToTop />
      <AppLayout />
    </Router>
  );
}
