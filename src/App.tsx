import { useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Home from './pages/Home';
import Insights from './pages/Insights';
import ArticleDetail from './pages/ArticleDetail';
import Solutions from './pages/Solutions';
import About from './pages/About';
import Lab from './pages/Lab';
import IHaveTimeTutorial from './pages/IHaveTimeTutorial';

// 管理後台
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminLogin from './pages/admin/AdminLogin';
import InsightsList from './pages/admin/InsightsList';
import InsightEditor from './pages/admin/InsightEditor';
import ContentStructureManager from './pages/admin/ContentStructureManager';
import DataSyncManager from './pages/admin/DataSyncManager';
import ContentReviewQueue from './pages/admin/ContentReviewQueue';
import SolutionsList from './pages/admin/SolutionsList';
import TestimonialsList from './pages/admin/TestimonialsList';
import SubscribersList from './pages/admin/SubscribersList';
import SiteSettingsPage from './pages/admin/SiteSettingsPage';
import AdminLayout from './components/admin/AdminLayout';

function App() {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith('/admin');

  // 每次路由切換時滾動到頂部
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  // 管理後台使用獨立佈局
  if (isAdminRoute) {
    return (
      <Routes location={location}>
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin/*" element={<AdminLayout />}>
          <Route index element={<AdminDashboard />} />
          <Route path="insights" element={<InsightsList />} />
          <Route path="insights/:id" element={<InsightEditor />} />
          <Route path="insights/structure" element={<ContentStructureManager />} />
          <Route path="insights/review" element={<ContentReviewQueue />} />
          <Route path="sync" element={<DataSyncManager />} />
          <Route path="solutions" element={<SolutionsList />} />
          <Route path="testimonials" element={<TestimonialsList />} />
          <Route path="subscribers" element={<SubscribersList />} />
          <Route path="settings" element={<SiteSettingsPage />} />
        </Route>
      </Routes>
    );
  }

  // 前台網站佈局
  return (
    <div className="flex flex-col min-h-screen relative text-[#E5E5E5] selection:bg-google-blue/30 selection:text-white">
      <div className="grid-bg"></div>

      <Navbar />

      <main className="flex-grow">
        {/* mode="wait" 確保前一個頁面消失後，新頁面才出現 */}
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<Home />} />
            <Route path="/insights" element={<Insights />} />
            <Route path="/insights/:id" element={<ArticleDetail />} />
            <Route path="/solutions" element={<Solutions />} />
            <Route path="/lab" element={<Lab />} />
            <Route path="/lab/ihavetime" element={<IHaveTimeTutorial />} />
            <Route path="/about" element={<About />} />
          </Routes>
        </AnimatePresence>
      </main>

      <Footer />
    </div>
  );
}

export default App;
