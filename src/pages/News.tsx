import SEO from '../components/ui/SEO';
import React from 'react';
import { useNavigate, useSearchParams, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
    ArrowRight, Zap, Clock, Filter, Star, Info, Settings2, User,
    X, ChevronRight, Sparkles 
} from 'lucide-react';
import { NEWS_ARTICLES } from '../data/news';
import { useMemo, useState, useEffect } from 'react';
import { PERSONAS, UserPersona } from '../data/personas';
import { useIdentity } from '../context/IdentityContext';

// 確保字串完全匹配
const CAT_ALL = "全部";

const CATEGORY_THEMES: Record<string, string> = {
    "吃瓜特報": 'orange',
    "腦洞大開": 'teal',
    "懶人神器": 'indigo',
    "產業脈動": 'violet',
    "政策法規": 'rose',
    "實戰應用": 'amber',
    "安全防禦": 'blue',
    "職場轉型": 'emerald',
    "私有大腦": 'indigo',
    "數位補課": 'orange',
    "數位家教": 'pink',
    "生意興隆": 'amber',
    "自由人生": 'violet',
    [CAT_ALL]: 'emerald'
};

const BUTTON_THEMES: Record<string, string> = {
    orange: 'bg-orange-500 text-black border-orange-500 shadow-orange-500/20',
    teal: 'bg-teal-500 text-black border-teal-500 shadow-teal-500/20',
    indigo: 'bg-indigo-500 text-black border-indigo-500 shadow-indigo-500/20',
    violet: 'bg-violet-500 text-black border-violet-500 shadow-violet-500/20',
    rose: 'bg-rose-500 text-black border-rose-500 shadow-rose-500/20',
    amber: 'bg-amber-500 text-black border-amber-500 shadow-amber-500/20',
    blue: 'bg-blue-500 text-black border-blue-500 shadow-blue-500/20',
    emerald: 'bg-emerald-500 text-black border-emerald-500 shadow-emerald-500/20',
    pink: 'bg-pink-500 text-black border-pink-500 shadow-pink-500/20',
};

const News = () => {
    const { persona, setPersona } = useIdentity();
    const [searchParams, setSearchParams] = useSearchParams();
    const activeCategory = searchParams.get('cat') || CAT_ALL;
    const [isPersonaMenuOpen, setIsPersonaMenuOpen] = useState(false);

    // 同步 URL 參數
    useEffect(() => {
        const personaFromUrl = searchParams.get('persona');
        if (personaFromUrl && (PERSONAS[personaFromUrl as UserPersona] || personaFromUrl === 'general')) {
            setPersona(personaFromUrl as UserPersona);
        }
    }, [searchParams, setPersona]);

    const categories = useMemo(() => {
        const cats = new Set([CAT_ALL]);
        NEWS_ARTICLES.forEach(a => cats.add(a.category));
        return Array.from(cats);
    }, []);

    const filteredArticles = useMemo(() => {
        let items = [...NEWS_ARTICLES];
        
        // 1. 族群過濾
        if (persona && persona !== 'general') {
            items = items.filter(a => a.target_persona?.includes(persona));
        }

        // 2. 分類過濾
        if (activeCategory !== CAT_ALL) {
            items = items.filter(a => a.category.trim() === activeCategory.trim());
        }

        return items.sort((a, b) => b.id - a.id);
    }, [activeCategory, persona]);

    const currentPersona = PERSONAS[persona as UserPersona] || {
        label: '全球通識',
        description: '掌握全球 AI 核心脈動。',
        color: 'emerald',
        icon: User
    };

    const handlePersonaChange = (pId: string) => {
        setPersona(pId as UserPersona);
        const newParams: any = { persona: pId };
        if (activeCategory !== CAT_ALL) newParams.cat = activeCategory;
        setSearchParams(newParams);
        setIsPersonaMenuOpen(false);
    };

    return (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="pt-32 pb-8 px-6 max-w-7xl mx-auto min-h-screen text-left relative z-0">
            <SEO title="AI 新聞情報站" description="AI Agent 精確轉譯，助您快速掌握全球 AI 核心脈動。" path="/news" />
            
            <div className="mb-12">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
                    <div className="flex items-center gap-5">
                        <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center shadow-lg shadow-emerald-500/5">
                            <Zap size={24} className="text-emerald-400" />
                        </div>
                        <div className="text-left">
                            <h1 className="text-3xl font-black text-white tracking-tighter">AI 新聞情報站</h1>
                            <span className="text-emerald-500/60 font-mono text-[10px] tracking-[0.4em] uppercase block">Intelligence Hub 2026</span>
                        </div>
                    </div>

                    {/* 🚀 族群選擇器 (手動切換) */}
                    <div className="relative">
                        <button 
                            onClick={() => setIsPersonaMenuOpen(!isPersonaMenuOpen)}
                            className="flex items-center gap-3 px-6 py-3 rounded-2xl bg-white/5 border border-white/10 text-xs font-black hover:bg-white/10 transition-all text-white shadow-xl"
                        >
                            <div className={`w-6 h-6 rounded-lg bg-${currentPersona.color}-500/20 flex items-center justify-center text-${currentPersona.color}-400`}>
                                {React.createElement(currentPersona.icon as any, { size: 14 })}
                            </div>
                            {currentPersona.label} 新聞 <Settings2 size={14} className="ml-2 opacity-50" />
                        </button>

                        <AnimatePresence>
                            {isPersonaMenuOpen && (
                                <motion.div 
                                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                                    animate={{ opacity: 1, y: 0, scale: 1 }}
                                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                                    className="absolute top-full right-0 mt-4 w-72 bg-zinc-900 border border-white/10 rounded-3xl shadow-2xl z-50 overflow-hidden"
                                >
                                    <div className="p-4 grid grid-cols-1 gap-2">
                                        <button
                                            onClick={() => handlePersonaChange('general')}
                                            className={`flex items-center gap-4 p-4 rounded-2xl transition-all text-left group ${persona === 'general' ? 'bg-white/10' : 'hover:bg-white/5'}`}
                                        >
                                            <div className="w-10 h-10 rounded-xl bg-emerald-500/20 flex items-center justify-center text-emerald-400">
                                                <User size={20} />
                                            </div>
                                            <div>
                                                <p className="text-white font-bold text-sm">全球通識</p>
                                                <p className="text-[10px] text-zinc-500">不限身分，閱讀全部新聞</p>
                                            </div>
                                        </button>
                                        {Object.values(PERSONAS).map((p) => (
                                            <button
                                                key={p.id}
                                                onClick={() => handlePersonaChange(p.id)}
                                                className={`flex items-center gap-4 p-4 rounded-2xl transition-all text-left group ${persona === p.id ? 'bg-white/10' : 'hover:bg-white/5'}`}
                                            >
                                                <div className={`w-10 h-10 rounded-xl bg-${p.color}-500/20 flex items-center justify-center text-${p.color}-400`}>
                                                    {React.createElement(p.icon as any, { size: 20 })}
                                                </div>
                                                <div>
                                                    <p className="text-white font-bold text-sm">{p.label}</p>
                                                    <p className="text-[10px] text-zinc-500 truncate w-40">{p.description}</p>
                                                </div>
                                            </button>
                                        ))}
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </div>

                {/* 2. 分類過濾器 */}
                <div className="flex items-center gap-3 mb-6 overflow-x-auto pb-3 scrollbar-hide text-left">
                    <div className="flex-shrink-0 text-zinc-600 mr-1"><Filter size={18} /></div>
                    {categories.map(tag => {
                        const colorName = CATEGORY_THEMES[tag] || 'emerald';
                        const isActive = activeCategory === tag;
                        const themeClasses = BUTTON_THEMES[colorName];
                        return (
                            <button key={tag} onClick={() => {
                                const newParams: any = { cat: tag };
                                if (persona) newParams.persona = persona;
                                setSearchParams(newParams);
                            }}
                                className={`flex-shrink-0 px-6 py-2 rounded-xl text-xs font-black transition-all border ${isActive
                                    ? `${themeClasses} shadow-lg scale-105`
                                    : 'bg-white/[0.03] border-white/[0.08] text-zinc-400 hover:text-white hover:bg-white/5'
                                }`}>
                                {tag}
                            </button>
                        );
                    })}
                </div>
            </div>

            {/* 🚀 新聞網格 */}
            <div className="grid grid-cols-1 gap-6 items-start">
                <AnimatePresence mode="popLayout">
                    {filteredArticles.map((article, i) => (
                        <NewsCard key={article.slug} article={article} idx={i} />
                    ))}
                </AnimatePresence>
            </div>

            {filteredArticles.length === 0 && (
                <div className="col-span-full py-32 text-center bg-white/[0.02] rounded-[3rem] border border-white/5">
                    <p className="text-zinc-500 text-lg font-bold">目前暫無符合您身分的相關情報</p>
                    <button onClick={() => handlePersonaChange('general')} className="mt-4 text-emerald-400 font-black text-sm uppercase tracking-widest hover:underline">返回全球通識</button>
                </div>
            )}
        </motion.div>
    );
};

const NewsCard = ({ article, idx }: any) => {
    const navigate = useNavigate();

    return (
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: (idx % 5) * 0.05 }} viewport={{ once: true }}
            onClick={() => { navigate(`/news/${article.slug}`); window.scrollTo(0, 0); }}
            className="bg-[#0c0c0c] border border-white/[0.06] p-6 md:p-8 rounded-[2.5rem] cursor-pointer group transition-all hover:bg-zinc-900/80 hover:border-white/20 h-full flex flex-col md:flex-row gap-6 items-center text-left shadow-xl"
        >
            <div className="flex-1 w-full text-left">
                <div className="flex justify-between items-center mb-4 text-left">
                    <div className="flex items-center gap-3">
                        <span className="text-[10px] font-black px-3 py-1 rounded-lg uppercase tracking-widest text-zinc-400 bg-white/5">
                            {article.category}
                        </span>
                        {article.author === "Echo" && <span className="text-[10px] font-bold text-indigo-500/80 uppercase tracking-tight">🕵️ Echo Dispatch</span>}
                        {article.difficulty && (
                            <span className="text-[10px] font-black px-3 py-1 rounded-lg uppercase tracking-widest text-emerald-400 bg-emerald-500/5">
                                {article.difficulty} 星
                            </span>
                        )}
                    </div>
                    <span className="text-[11px] text-zinc-500 font-mono font-bold">{article.date}</span>
                </div>
                
                <h4 className="text-2xl md:text-3xl font-black text-white mb-4 line-clamp-2 leading-tight group-hover:text-emerald-300 transition-colors text-left tracking-tight">
                    {article.title}
                </h4>
                
                <p className="text-zinc-400 text-base md:text-lg line-clamp-2 leading-relaxed text-left mb-8 font-medium">
                    {article.summary}
                </p>
                
                <div className="mt-auto pt-6 border-t border-white/[0.05] flex items-center justify-between text-left">
                    <div className="flex items-center gap-6">
                        <span className="flex items-center gap-2 text-xs text-zinc-500 font-bold text-left"><Clock size={14} /> {article.readTime}</span>
                    </div>
                    <div className="flex items-center gap-2 text-white font-black text-xs uppercase tracking-widest group-hover:gap-4 transition-all">
                        閱讀情報 <ArrowRight size={18} className="text-emerald-500" />
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

export default News;
