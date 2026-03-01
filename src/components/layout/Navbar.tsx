import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Newspaper, BookOpen, FlaskConical, Package, User, Coffee, Zap, ChevronRight, Star } from 'lucide-react';

const Navbar = () => {
    const location = useLocation();
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    const isActive = (path: string) => location.pathname === path || location.pathname.startsWith(path + '/');
    const linkClass = (path: string) => `hover:text-white transition-colors flex items-center gap-1.5 ${isActive(path) ? 'text-white font-bold' : ''}`;

    return (
        <nav className="fixed top-0 w-full z-50 border-b border-white/5 bg-[#0A0A0A]/90 backdrop-blur-md">
            <div className="max-w-[1400px] mx-auto px-6 h-20 flex items-center justify-between gap-4">
                <Link to="/" className="flex items-center gap-2 md:gap-3 cursor-pointer group flex-shrink-0">
                    <span className="font-signature text-2xl md:text-3xl text-white group-hover:text-emerald-400 transition-colors">Dee.</span>
                    <span className="h-4 w-[1px] bg-zinc-800"></span>
                    <span className="text-[9px] md:text-xs uppercase tracking-widest text-zinc-500 whitespace-nowrap">AI 生活實驗室</span>
                </Link>

                {/* 桌面版導航 */}
                <div className="hidden xl:flex items-center gap-6 text-sm font-medium text-zinc-400">
                    <Link to="/insights" className={linkClass('/insights')}>
                        <BookOpen size={14} /> 免費教學
                    </Link>
                    <Link to="/news" className={linkClass('/news')}>
                        <Newspaper size={14} /> AI 新聞
                    </Link>
                    <Link to="/lab/templates" className={linkClass('/lab/templates')}>
                        <Zap size={14} className="text-amber-400" /> 指令庫
                    </Link>
                    <Link to="/lab" className={linkClass('/lab')}>
                        <FlaskConical size={14} /> AI 實驗室
                    </Link>
                    <Link to="/solutions" className={linkClass('/solutions')}>
                        <Package size={14} /> 學習資源
                    </Link>
                    <Link to="/about" className={linkClass('/about')}>
                        <User size={14} /> 關於 Dee
                    </Link>
                    <motion.a 
                        href="https://pay.ecpay.com.tw/CreditPayment/ExpressCredit?MerchantID=3378826" 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="hover:text-amber-400 transition-colors flex items-center gap-1.5 text-amber-500/90 font-bold bg-amber-500/10 px-3 py-1.5 rounded-lg border border-amber-500/20 whitespace-nowrap"
                        animate={{ 
                            scale: [1, 1.05, 1],
                            boxShadow: [
                                "0 0 0px rgba(245, 158, 11, 0)",
                                "0 0 15px rgba(245, 158, 11, 0.3)",
                                "0 0 0px rgba(245, 158, 11, 0)"
                            ]
                        }}
                        transition={{ 
                            duration: 2,
                            repeat: Infinity,
                            ease: "easeInOut"
                        }}
                    >
                        <Coffee size={14} className="animate-bounce" /> 請喝咖啡
                    </motion.a>
                    <Link to="/insights" className="bg-white text-black px-4 py-2 rounded-full hover:bg-zinc-200 transition-colors font-semibold text-xs tracking-wide whitespace-nowrap">
                        開始學習
                    </Link>
                </div>

                <button className="xl:hidden text-white" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
                    {mobileMenuOpen ? <X /> : <Menu />}
                </button>
            </div>

            {/* 📱 手機版選單 (高密度精英版) */}
            <AnimatePresence>
                {mobileMenuOpen && (
                    <motion.div 
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="xl:hidden absolute top-20 left-0 w-full bg-[#050505] border-b border-white/[0.08] p-6 flex flex-col gap-1 shadow-[0_20px_50px_rgba(0,0,0,0.8)] z-40"
                    >
                        <div className="mb-4">
                            <span className="text-[10px] font-black text-zinc-600 uppercase tracking-[0.3em] block mb-2 px-2">Navigation Menu</span>
                        </div>

                        {[
                            { to: "/insights", icon: BookOpen, label: "免費教學", color: "text-zinc-200" },
                            { to: "/news", icon: Newspaper, label: "AI 新聞", color: "text-zinc-200" },
                            { to: "/lab/templates", icon: Zap, label: "指令庫", color: "text-amber-400" },
                            { to: "/lab", icon: FlaskConical, label: "AI 實驗室", color: "text-zinc-200" },
                            { to: "/solutions", icon: Package, label: "學習資源", color: "text-zinc-200" },
                            { to: "/about", icon: User, label: "關於 Dee", color: "text-zinc-200" },
                        ].map((link) => (
                            <Link 
                                key={link.to}
                                to={link.to} 
                                onClick={() => setMobileMenuOpen(false)} 
                                className={`group flex items-center justify-between p-4 rounded-2xl transition-all border border-transparent ${isActive(link.to) ? 'bg-white/[0.03] border-white/10' : 'hover:bg-white/[0.02]'}`}
                            >
                                <div className="flex items-center gap-4">
                                    <link.icon size={20} className={isActive(link.to) ? 'text-emerald-400' : link.color} />
                                    <span className={`text-lg font-black tracking-tight ${isActive(link.to) ? 'text-white' : 'text-zinc-400'}`}>{link.label}</span>
                                </div>
                                <ChevronRight size={16} className={`transition-transform ${isActive(link.to) ? 'text-emerald-500 translate-x-1' : 'text-zinc-800'}`} />
                            </Link>
                        ))}

                        <a 
                            href="https://pay.ecpay.com.tw/CreditPayment/ExpressCredit?MerchantID=3378826" 
                            target="_blank" 
                            rel="noopener noreferrer" 
                            onClick={() => setMobileMenuOpen(false)} 
                            className="flex items-center justify-between p-4 rounded-2xl hover:bg-amber-500/5 group transition-all mt-2"
                        >
                            <div className="flex items-center gap-4">
                                <Coffee size={20} className="text-amber-500" />
                                <span className="text-lg font-black text-amber-500 tracking-tight text-left">請喝咖啡</span>
                            </div>
                            <Star size={16} className="text-amber-500/20 group-hover:text-amber-500 transition-colors" fill="currentColor" />
                        </a>

                        <div className="mt-6 pt-6 border-t border-white/5">
                            <Link 
                                to="/insights" 
                                onClick={() => setMobileMenuOpen(false)} 
                                className="relative group block w-full bg-white text-black px-6 py-5 rounded-2xl text-center font-black text-xl shadow-2xl overflow-hidden active:scale-95 transition-all"
                            >
                                <div className="absolute inset-0 bg-emerald-500 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                                <span className="relative z-10 group-hover:text-white transition-colors">開始學習</span>
                            </Link>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
};

export default Navbar;
