import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Menu, X, Newspaper, BookOpen, FlaskConical, Package, User, Coffee, Zap } from 'lucide-react';

const Navbar = () => {
    const location = useLocation();
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    const isActive = (path: string) => location.pathname === path || location.pathname.startsWith(path + '/');
    const linkClass = (path: string) => `hover:text-white transition-colors flex items-center gap-1.5 ${isActive(path) ? 'text-white font-bold' : ''}`;

    return (
        <nav className="fixed top-0 w-full z-50 border-b border-white/5 bg-[#0A0A0A]/90 backdrop-blur-md">
            <div className="max-w-7xl mx-auto px-4 md:px-6 h-20 flex items-center justify-between gap-4">
                <Link to="/" className="flex items-center gap-2 md:gap-3 cursor-pointer group flex-shrink-0">
                    <span className="font-signature text-2xl md:text-3xl text-white group-hover:text-emerald-400 transition-colors">Dee.</span>
                    <span className="hidden sm:block h-4 w-[1px] bg-zinc-800"></span>
                    <span className="hidden sm:block text-[10px] uppercase tracking-widest text-zinc-500 whitespace-nowrap">AI 生活實驗室</span>
                </Link>

                {/* 桌面版導航 */}
                <div className="hidden lg:flex items-center gap-4 xl:gap-6 text-[13px] font-medium text-zinc-400">
                    <Link to="/insights" className={linkClass('/insights')}>
                        教學
                    </Link>
                    <Link to="/news" className={linkClass('/news')}>
                        新聞
                    </Link>
                    <Link to="/lab/templates" className={linkClass('/lab/templates')}>
                        <Zap size={13} className="text-amber-400" /> 指令庫
                    </Link>
                    <Link to="/lab" className={linkClass('/lab')}>
                        實驗室
                    </Link>
                    <Link to="/solutions" className={linkClass('/solutions')}>
                        資源
                    </Link>
                    <Link to="/about" className={linkClass('/about')}>
                        關於
                    </Link>
                    
                    <motion.a 
                        href="https://pay.ecpay.com.tw/CreditPayment/ExpressCredit?MerchantID=3378826" 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="hover:text-amber-400 transition-colors flex items-center gap-1.5 text-amber-500 font-bold bg-amber-500/10 px-3 py-1.5 rounded-lg border border-amber-500/20 flex-shrink-0"
                        animate={{ 
                            scale: [1, 1.03, 1],
                            boxShadow: [
                                "0 0 0px rgba(245, 158, 11, 0)",
                                "0 0 12px rgba(245, 158, 11, 0.2)",
                                "0 0 0px rgba(245, 158, 11, 0)"
                            ]
                        }}
                        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                    >
                        <Coffee size={13} className="animate-bounce" /> 喝杯咖啡
                    </motion.a>

                    <Link to="/insights" className="bg-white text-black px-4 py-2 rounded-full hover:bg-zinc-200 transition-all font-bold text-xs flex-shrink-0 whitespace-nowrap">
                        開始學習
                    </Link>
                </div>

                <button className="lg:hidden text-white p-2" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
                    {mobileMenuOpen ? <X /> : <Menu />}
                </button>
            </div>

            {/* 手機版選單 */}
            {mobileMenuOpen && (
                <div className="md:hidden absolute top-20 left-0 w-full bg-[#0A0A0A] border-b border-white/10 p-6 flex flex-col gap-6 animate-fade-in shadow-2xl">
                    <Link to="/insights" onClick={() => setMobileMenuOpen(false)} className="text-lg text-zinc-300 flex items-center gap-2">
                        <BookOpen size={18} /> 免費教學
                    </Link>
                    <Link to="/news" onClick={() => setMobileMenuOpen(false)} className="text-lg text-zinc-300 flex items-center gap-2">
                        <Newspaper size={18} /> AI 新聞
                    </Link>
                    <Link to="/lab" onClick={() => setMobileMenuOpen(false)} className="text-lg text-zinc-300 flex items-center gap-2">
                        <FlaskConical size={18} /> AI 實驗室
                    </Link>
                    <Link to="/solutions" onClick={() => setMobileMenuOpen(false)} className="text-lg text-zinc-300 flex items-center gap-2">
                        <Package size={18} /> 學習資源
                    </Link>
                    <Link to="/about" onClick={() => setMobileMenuOpen(false)} className="text-lg text-zinc-300 flex items-center gap-2">
                        <User size={18} /> 關於 Dee
                    </Link>
                </div>
            )}
        </nav>
    );
};

export default Navbar;
