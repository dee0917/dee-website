import { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate, Outlet } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Home,
  FileText,
  Package,
  MessageSquare,
  Mail,
  Settings,
  LogOut,
  Menu,
  X,
  User,
  ChevronRight,
  Layers,
  Database,
  ShieldCheck
} from 'lucide-react';
import { supabase } from '../../lib/supabase';

const AdminLayout = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [user, setUser] = useState<any>(null);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

  // 檢查螢幕尺寸
  useEffect(() => {
    const checkMobile = () => {
      const mobile = window.innerWidth < 1024;
      setIsMobile(mobile);
      setSidebarOpen(!mobile);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // 檢查登入狀態
  useEffect(() => {
    checkUser();
  }, []);

  const checkUser = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      navigate('/admin/login');
    } else {
      setUser(user);
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate('/admin/login');
  };

  const navItems = [
    { path: '/admin', label: '儀表板', icon: Home, exact: true },
    { path: '/admin/insights', label: '免費教學', icon: FileText },
    { path: '/admin/insights/review', label: '內容審核', icon: ShieldCheck },
    { path: '/admin/insights/structure', label: '結構化管理', icon: Layers },
    { path: '/admin/sync', label: '數據同步', icon: Database },
    { path: '/admin/solutions', label: '學習方案', icon: Package },
    { path: '/admin/testimonials', label: '學員回饋', icon: MessageSquare },
    { path: '/admin/subscribers', label: '訂閱者', icon: Mail },
    { path: '/admin/settings', label: '網站設定', icon: Settings },
  ];

  const currentPage = navItems.find(item => 
    location.pathname === item.path || 
    (item.exact ? false : location.pathname.startsWith(item.path))
  )?.label || '管理後台';

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="min-h-screen bg-[#0a0a0a] text-white flex">
      {/* 側邊欄遮罩（手機版） */}
      {isMobile && sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/60 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* 側邊欄 */}
      <aside className={`
        fixed lg:static h-screen bg-[#111] border-r border-white/10 z-50
        transition-transform duration-300 ease-in-out
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        w-64 flex-shrink-0 flex flex-col
      `}>
        {/* 標題區 */}
        <div className="p-6 border-b border-white/10">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="font-signature text-2xl">Dee.</span>
              <span className="text-sm text-zinc-500">管理後台</span>
            </div>
            <button 
              onClick={toggleSidebar}
              className="lg:hidden text-zinc-400 hover:text-white"
            >
              <X size={20} />
            </button>
          </div>
          {user && (
            <div className="mt-4 flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-google-blue/20 flex items-center justify-center">
                <User size={16} className="text-google-blue" />
              </div>
              <div>
                <div className="text-sm font-medium">{user.email}</div>
                <div className="text-xs text-zinc-500">管理員</div>
              </div>
            </div>
          )}
        </div>

        {/* 導航 */}
        <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
          {navItems.map((item) => {
            const isActive = item.exact 
              ? location.pathname === item.path
              : location.pathname.startsWith(item.path);
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`
                  flex items-center gap-3 px-4 py-3 rounded-lg transition-colors
                  ${isActive 
                    ? 'bg-google-blue/10 text-google-blue border border-google-blue/20' 
                    : 'text-zinc-400 hover:text-white hover:bg-white/5'
                  }
                `}
                onClick={() => isMobile && setSidebarOpen(false)}
              >
                <item.icon size={20} />
                <span className="flex-1">{item.label}</span>
                {isActive && <ChevronRight size={16} className="text-google-blue" />}
              </Link>
            );
          })}
        </nav>

        {/* 底部操作 */}
        <div className="p-4 border-t border-white/10 space-y-2">
          <Link 
            to="/" 
            target="_blank"
            className="flex items-center gap-3 px-4 py-3 rounded-lg text-zinc-400 hover:text-white hover:bg-white/5 transition-colors"
          >
            <Home size={20} />
            查看網站
          </Link>
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-zinc-400 hover:text-red-400 hover:bg-red-500/10 transition-colors"
          >
            <LogOut size={20} />
            登出
          </button>
        </div>
      </aside>

      {/* 主內容區 */}
      <main className="flex-1 flex flex-col overflow-hidden">
        {/* 頂部欄 */}
        <header className="bg-[#111] border-b border-white/10 sticky top-0 z-40">
          <div className="h-16 px-6 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button 
                onClick={toggleSidebar}
                className="text-zinc-400 hover:text-white lg:hidden"
              >
                <Menu size={24} />
              </button>
              <h1 className="text-xl font-bold">{currentPage}</h1>
            </div>
            <div className="flex items-center gap-4">
              <div className="hidden sm:flex items-center gap-2 text-sm text-zinc-400">
                <User size={16} />
                <span>{user?.email}</span>
              </div>
            </div>
          </div>
        </header>

        {/* 頁面內容 */}
        <div className="flex-1 overflow-y-auto p-6">
          <Outlet />
        </div>
      </main>
    </motion.div>
  );
};

export default AdminLayout;