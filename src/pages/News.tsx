import SEO from '../components/ui/SEO';
import React, { useState, useMemo, useEffect } from 'react';
import { useNavigate, useSearchParams, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
    ArrowRight, Zap, Clock, Filter, Star, Info, Settings2, User,
    X, ChevronRight, Sparkles 
} from 'lucide-react';
import { NEWS_ARTICLES } from '../data/news';
import { PERSONAS, UserPersona } from '../data/personas';
import { useIdentity } from '../context/IdentityContext';
import DifficultyStars from '../components/ui/DifficultyStars';

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
    "數位生命": 'emerald',
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
        if (persona && persona !== 'general') {
            items = items.filter(a => a.target_persona?.includes(persona));
        }
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
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="pt-32 pb-20 px-6 max-w-7xl mx-auto min-h-screen text-left relative z-0">
            <SEO title="AI 新聞情報站" description="AI Agent 精確轉譯，助您快速掌握全球 AI 核心脈動。" path="/news" />
            
            <div className="mb-12">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 mb-12">
                    <div className="flex items-center gap-6">
                        <div className="w-16 h-16 rounded-[2rem] bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center shadow-2xl shadow-emerald-500/10">
                            <Zap size={32} className="text-emerald-400" />
                        </div>
                        <div className="text-left">
                            <h1 className="text-4xl md:text-5xl font-black text-white tracking-tighter uppercase italic">Intelligence Hub</h1>
                            <div className="flex items-center gap-2 mt-1">
                                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                                <span className="text-emerald-500/60 font-mono text-[10px] tracking-[0.4em] uppercase">Real-time Global Monitor // 2026</span>
                            </div>
                        </div>
                    </div>

                    {/* 🚀 Persona Switcher on News Page */}
                    <div className="relative">
                        <button 
                            onClick={() => setIsPersonaMenuOpen(!isPersonaMenuOpen)}
                            className="flex items-center gap-4 px-8 py-4 rounded-[2rem] bg-zinc-900 border border-white/10 text-xs font-black hover:border-emerald-500/50 transition-all text-white shadow-2xl group"
                        >
                            <div className={`w-8 h-8 rounded-xl bg-${currentPersona.color}-500/20 flex items-center justify-center text-${currentPersona.color}-400 group-hover:scale-110 transition-transform`}>
                                {React.createElement(currentPersona.icon as any, { size: 16 })}
                            </div>
                            <div className="text-left">
                                <p className="text-zinc-500 text-[9px] uppercase tracking-widest">Reading As</p>
                                <p className="text-sm font-black tracking-tight">{currentPersona.label}</p>
                            </div>
                            <Settings2 size={16} className="ml-4 opacity-30 group-hover:opacity-100 transition-opacity" />
                        </button>

                        <AnimatePresence>
                            {isPersonaMenuOpen && (
                                <motion.div 
                                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                                    animate={{ opacity: 1, y: 0, scale: 1 }}
                                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                                    className="absolute top-full right-0 mt-4 w-80 bg-[#0d0d0d] border border-white/10 rounded-[2.5rem] shadow-[0_0_100px_rgba(0,0,0,0.8)] z-50 overflow-hidden backdrop-blur-2xl"
                                >
                                    <div className="p-4 grid grid-cols-1 gap-2">
                                        <button
                                            onClick={() => handlePersonaChange('general')}
                                            className={`flex items-center gap-4 p-5 rounded-3xl transition-all text-left group ${persona === 'general' ? 'bg-white/5 border border-white/10' : 'hover:bg-white/5'}`}
                                        >
                                            <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 flex items-center justify-center text-emerald-400">
                                                <User size={24} />
                                            </div>
                                            <div>
                                                <p className="text-white font-black text-sm uppercase">全球通識</p>
                                                <p className="text-[10px] text-zinc-500">不限身分，閱讀全方位 AI 情報</p>
                                            </div>
                                        </button>
                                        <div className="h-px bg-white/5 my-2 mx-4" />
                                        {Object.values(PERSONAS).map((p) => (
                                            <button
                                                key={p.id}
                                                onClick={() => handlePersonaChange(p.id)}
                                                className={`flex items-center gap-4 p-5 rounded-3xl transition-all text-left group ${persona === p.id ? 'bg-white/5 border border-white/10' : 'hover:bg-white/5'}`}
                                            >
                                                <div className={`w-12 h-12 rounded-2xl bg-${p.color}-500/10 flex items-center justify-center text-${p.color}-400 group-hover:scale-110 transition-transform`}>
                                                    {React.createElement(p.icon as any, { size: 24 })}
                                                </div>
                                                <div>
                                                    <p className="text-white font-black text-sm uppercase">{p.label}</p>
                                                    <p className="text-[10px] text-zinc-500 truncate w-44">{p.description}</p>
                                                </div>
                                            </button>
                                        ))}
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </div>

                {/* Categories Filter */}
                <div className="flex items-center gap-4 mb-16 overflow-x-auto pb-4 scrollbar-hide text-left">
                    <div className="flex-shrink-0 text-zinc-600 mr-2"><Filter size={20} /></div>
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
                                className={`flex-shrink-0 px-8 py-3 rounded-2xl text-xs font-black transition-all border uppercase tracking-widest ${isActive
                                    ? `${themeClasses} shadow-2xl scale-105`
                                    : 'bg-white/[0.02] border-white/5 text-zinc-500 hover:text-white hover:bg-white/5'
                                }`}>
                                {tag}
                            </button>
                        );
                    })}
                </div>
            </div>

            {/* News Grid - Optimized Card Layout */}
            <div className="grid grid-cols-1 gap-8 items-start">
                <AnimatePresence mode="popLayout">
                    {filteredArticles.map((article, i) => (
                        <NewsCard key={article.slug} article={article} idx={i} />
                    ))}
                </AnimatePresence>
            </div>

            {filteredArticles.length === 0 && (
                <div className="col-span-full py-40 text-center bg-white/[0.01] rounded-[4rem] border border-dashed border-white/5">
                    <p className="text-zinc-600 text-xl font-black uppercase tracking-widest">目前暫無符合條件之情報</p>
                    <button onClick={() => handlePersonaChange('general')} className="mt-8 px-10 py-4 bg-emerald-500 text-black rounded-2xl font-black text-xs uppercase tracking-widest hover:scale-105 transition-all shadow-2xl shadow-emerald-500/20">查看全部情報</button>
                </div>
            )}
        </motion.div>
    );
};

const NewsCard = ({ article, idx }: any) => {
    const navigate = useNavigate();

    return (
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: (idx % 4) * 0.05 }} viewport={{ once: true }}
            onClick={() => { navigate(`/news/${article.slug}`); window.scrollTo(0, 0); }}
            className="bg-[#0b0b0b] border border-white/5 p-8 md:p-12 rounded-[3.5rem] cursor-pointer group transition-all hover:bg-[#111] hover:border-emerald-500/30 flex flex-col md:flex-row gap-10 items-start text-left shadow-2xl relative overflow-hidden"
        >
            <div className="absolute top-0 right-0 p-12 opacity-0 group-hover:opacity-5 transition-opacity duration-1000">
                <Zap size={180} className="text-emerald-500" />
            </div>

            <div className="flex-1 w-full text-left relative z-10">
                <div className="flex flex-wrap justify-between items-center mb-8 gap-4 text-left">
                    <div className="flex items-center gap-4">
                        <span className="text-[10px] font-black px-4 py-1.5 rounded-full uppercase tracking-[0.2em] bg-white/5 text-zinc-400 border border-white/5 group-hover:border-emerald-500/30 group-hover:text-emerald-400 transition-colors">
                            {article.category}
                        </span>
                        {article.author === "Echo" && (
                            <div className="flex items-center gap-2 text-indigo-400">
                                <span className="text-[10px] font-black uppercase tracking-tighter italic">Echo Dispatch</span>
                            </div>
                        )}
                        {article.difficulty && (
                            <DifficultyStars level={article.difficulty} />
                        )}
                    </div>
                    <span className="text-[11px] text-zinc-600 font-mono font-bold tracking-widest">{article.publish_time || article.date} (TST)</span>
                </div>
                
                <h4 className="text-3xl md:text-5xl font-black text-white mb-6 line-clamp-2 leading-[1.1] group-hover:text-emerald-300 transition-colors text-left tracking-tighter uppercase italic">
                    {article.title}
                </h4>
                
                <p className="text-zinc-500 text-lg md:text-xl line-clamp-3 leading-relaxed text-left mb-10 font-medium max-w-4xl">
                    {article.summary}
                </p>
                
                <div className="mt-auto pt-8 border-t border-white/5 flex flex-wrap items-center justify-between gap-6 text-left">
                    <div className="flex items-center gap-8">
                        <span className="flex items-center gap-2 text-xs text-zinc-600 font-black uppercase tracking-widest"><Clock size={16} /> {article.readTime}</span>
                    </div>
                    <div className="flex items-center gap-4 text-white font-black text-xs uppercase tracking-[0.3em] group-hover:translate-x-2 transition-transform duration-500">
                        Deep Dive <ArrowRight size={20} className="text-emerald-500" />
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

export default News;
