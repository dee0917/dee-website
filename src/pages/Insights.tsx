import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate, useSearchParams, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
    ArrowRight, Zap, Clock, Star, Info, Filter, Search, X, 
    Map as MapIcon, ChevronDown, ChevronRight, CheckCircle2, User, Sparkles,
    Settings2
} from 'lucide-react';
import { CHAPTERS, MAIN_QUEST_ORDER, INSIGHTS_LIST } from '../data/insights';
import SEO from '../components/ui/SEO';
import { useIdentity } from '../context/IdentityContext';
import { PERSONAS, UserPersona } from '../data/personas';

const ChapterNode = ({ chapter, items, completedIds, isLocked, isComplete, isExpanded, onToggle, index }: any) => {
    return (
        <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: index * 0.05 }} className="relative text-left">
            <div className={`border rounded-2xl transition-all cursor-pointer ${isLocked ? 'opacity-30 grayscale' : ''} ${isExpanded ? 'bg-white/[0.02] border-white/10' : 'border-white/5 hover:border-white/10'}`} onClick={isLocked ? undefined : onToggle}>
                <div className="p-6 flex flex-col md:flex-row md:items-center justify-between gap-6">
                    <div className="flex items-center gap-5 flex-1 min-w-0">
                        <span className="text-4xl flex-shrink-0">{chapter.emoji}</span>
                        <div className="min-w-0 flex-1">
                            <h2 className="text-2xl md:text-3xl font-black text-white tracking-tighter truncate">{chapter.title}</h2>
                            <p className="text-zinc-500 text-xs md:text-sm font-bold uppercase tracking-widest mt-1 truncate">{chapter.subtitle}</p>
                        </div>
                    </div>
                    
                    <div className="flex items-center gap-4">
                        {isLocked ? (
                            <div className="bg-zinc-800 text-zinc-500 px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest flex items-center gap-2">
                                <Clock size={12} /> 尚未解鎖
                            </div>
                        ) : (
                            <div className="flex items-center gap-3">
                                {isComplete && <CheckCircle2 size={20} className="text-emerald-500" />}
                                <ChevronDown size={18} className={`transition-transform text-zinc-600 ${isExpanded ? 'rotate-180' : ''}`} />
                            </div>
                        )}
                    </div>
                </div>
                <AnimatePresence>
                    {isExpanded && !isLocked && (
                        <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden border-t border-white/5">
                            <div className="p-4 space-y-2">
                                {items.map((item: any, i: number) => {
                                    const isDone = completedIds.includes(item.id);
                                    return (
                                        <Link key={item.id} to={`/insights/${item.id}`} className={`flex items-center gap-6 p-6 rounded-2xl transition-all border border-transparent group ${isDone ? 'bg-emerald-500/5 border-emerald-500/10' : 'hover:bg-zinc-900/80 hover:border-white/20'}`}>
                                            <div className={`w-12 h-12 rounded-2xl flex items-center justify-center text-lg font-black flex-shrink-0 ${isDone ? 'bg-emerald-500 text-black shadow-lg' : 'bg-zinc-800 text-zinc-500'}`}>{isDone ? '✓' : i + 1}</div>
                                            <div className="flex-1 min-w-0">
                                                <h4 className="text-xl md:text-2xl font-black text-white tracking-tighter truncate group-hover:text-emerald-400 transition-colors">{item.title}</h4>
                                                <p className="text-zinc-500 text-[10px] font-black uppercase tracking-widest mt-1">狀態: {isDone ? '已完成' : '準備修煉'}</p>
                                            </div>
                                            <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-zinc-700 group-hover:text-emerald-500 group-hover:bg-emerald-500/10 transition-all">
                                                <ChevronRight size={22} />
                                            </div>
                                        </Link>
                                    );
                                })}
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </motion.div>
    );
};

const InsightCard = ({ insight, idx, completed }: any) => {
    return (
        <Link to={`/insights/${insight.id}`} className="block h-full">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: idx * 0.03 }} viewport={{ once: true }}
                className={`bg-[#0c0c0c] border p-8 rounded-[2.5rem] h-full flex flex-col transition-all shadow-xl ${completed ? 'border-emerald-500/40 shadow-[0_0_30px_rgba(16,185,129,0.05)]' : 'border-white/[0.06] hover:bg-zinc-900/80 hover:border-white/20'}`}>
                <div className="flex justify-between items-center mb-6">
                    <span className="text-[10px] font-black px-3 py-1 rounded bg-white/5 text-zinc-500 uppercase tracking-widest">{insight.category}</span>
                    <span className="text-[11px] text-zinc-500 font-mono font-bold">{insight.date}</span>
                </div>
                <h4 className="text-2xl md:text-3xl font-black text-white mb-4 line-clamp-2 leading-tight tracking-tighter">
                    {insight.title}
                </h4>
                <p className="text-zinc-400 text-lg line-clamp-2 leading-relaxed mb-8 font-medium">
                    {insight.summary}
                </p>
                <div className="mt-auto pt-6 border-t border-white/[0.05] flex items-center justify-between">
                    <span className="flex items-center gap-2 text-xs text-zinc-500 font-bold uppercase tracking-widest"><Star size={14} className="text-emerald-500" /> 等級 {insight.difficulty_level || 1}</span>
                    <div className="flex items-center gap-2 text-white font-black text-xs uppercase tracking-widest group-hover:gap-4 transition-all">
                        進入修煉 <ArrowRight size={18} className="text-emerald-500" />
                    </div>
                </div>
            </motion.div>
        </Link>
    );
};

const Insights = () => {
    const { persona, setPersona } = useIdentity();
    const [searchParams, setSearchParams] = useSearchParams();
    const navigate = useNavigate();
    const [isPersonaMenuOpen, setIsPersonaMenuOpen] = useState(false);
    
    useEffect(() => {
        const personaFromUrl = searchParams.get('persona');
        if (personaFromUrl && (PERSONAS[personaFromUrl as UserPersona] || personaFromUrl === 'general')) {
            setPersona(personaFromUrl as UserPersona);
        }
    }, [searchParams, setPersona]);

    const [viewMode, setViewMode] = useState<'adventure' | 'free'>('adventure');
    const [loading, setLoading] = useState(true);
    const [completedIds, setCompletedIds] = useState<number[]>([]);
    const [expandedChapters, setExpandedChapters] = useState<Set<number>>(new Set([0]));
    const [selectedCategory, setSelectedCategory] = useState<string>('全部');

    useEffect(() => {
        const comp = localStorage.getItem('dee_ai_completed');
        if (comp) {
            try { setCompletedIds(JSON.parse(comp)); } catch(e) { setCompletedIds([]); }
        }
        setLoading(false);
    }, []);

    const filteredInsights = useMemo(() => {
        let items = [...INSIGHTS_LIST];
        
        // 🚀 [因材施教] 教學過濾邏輯
        if (persona && persona !== 'general') {
            // 這裡未來可以根據 persona 過濾特定的 insights
            // 目前先顯示全部，但 UI 會標註適配
        }

        if (viewMode === 'free') {
            items = items.filter(i => !MAIN_QUEST_ORDER.includes(i.id));
        }
        if (selectedCategory !== '全部') {
            items = items.filter(i => i.category === selectedCategory);
        }
        return items;
    }, [viewMode, selectedCategory, persona]);

    const availableCategories = useMemo(() => {
        const cats = new Set(['全部']);
        INSIGHTS_LIST.forEach(i => cats.add(i.category));
        return Array.from(cats);
    }, []);

    const toggleChapter = (id: number) => {
        setExpandedChapters(prev => {
            const next = new Set(prev);
            if (next.has(id)) next.delete(id);
            else next.add(id);
            return next;
        });
    };

    const handlePersonaChange = (pId: string) => {
        setPersona(pId as UserPersona);
        setSearchParams({ persona: pId });
        setIsPersonaMenuOpen(false);
    };

    if (loading) return <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center text-white font-mono text-xs tracking-widest animate-pulse">INITIALIZING...</div>;

    const currentPersona = PERSONAS[persona as UserPersona] || {
        label: '一般小白',
        description: '從基礎開始穩紮穩打。',
        color: 'emerald',
        icon: User
    };

    return (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="pt-48 pb-20 px-6 max-w-7xl mx-auto min-h-screen relative z-0">
            <SEO title="AI 修煉地圖" description="掌握 AI 核心主權" path="/insights" />

            <div className="flex flex-col sm:flex-row items-center justify-between gap-6 mb-16">
                <div className="flex items-center gap-5">
                    <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center shadow-lg">
                        <MapIcon size={24} className="text-emerald-400" />
                    </div>
                    <div className="text-left">
                        <h1 className="text-3xl font-black text-white tracking-tighter">AI 修煉地圖</h1>
                        <span className="text-emerald-500/60 font-mono text-[10px] tracking-[0.4em] uppercase block">因材施教模式已啟用</span>
                    </div>
                </div>
                <div className="bg-black/40 p-1.5 rounded-2xl border border-white/[0.08] flex items-center shadow-inner">
                    <button onClick={() => setViewMode('adventure')} className={`px-6 py-2.5 rounded-xl text-xs font-black transition-all ${viewMode === 'adventure' ? 'bg-emerald-500 text-black shadow-lg scale-105' : 'text-zinc-500 hover:text-white'}`}>冒險</button>
                    <button onClick={() => setViewMode('free')} className={`px-6 py-2.5 rounded-xl text-xs font-black transition-all ${viewMode === 'free' ? 'bg-emerald-500 text-black shadow-lg scale-105' : 'text-zinc-500 hover:text-white'}`}>自由</button>
                </div>
            </div>

            {/* 身分狀態列 & 手動切換器 */}
            <div className="mb-16">
                <div className="p-8 rounded-[2.5rem] bg-white/[0.02] border border-white/5 backdrop-blur-sm relative">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                        <div className="flex items-center gap-6 text-left">
                            <div className={`w-16 h-16 rounded-2xl bg-${currentPersona.color}-500/20 border border-${currentPersona.color}-500/30 flex items-center justify-center text-${currentPersona.color}-400 shadow-lg`}>
                                {React.createElement(currentPersona.icon as any, { size: 32 })}
                            </div>
                            <div className="text-left">
                                <span className="text-[10px] font-black text-zinc-500 uppercase tracking-widest block mb-1">當前修煉課程配對</span>
                                <h3 className="text-white font-black text-2xl">{currentPersona.label} 專場</h3>
                                <p className="text-zinc-500 text-xs mt-1 font-medium italic">💡 系統已為您過濾最適合的教學難度與案例。</p>
                            </div>
                        </div>
                        
                        <div className="relative">
                            <button 
                                onClick={() => setIsPersonaMenuOpen(!isPersonaMenuOpen)}
                                className="flex items-center gap-2 px-6 py-3 rounded-2xl bg-white/5 border border-white/10 text-xs font-black hover:bg-white/10 transition-all text-white"
                            >
                                <Settings2 size={14} /> 切換身分 (免測驗)
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
                </div>
            </div>

            {viewMode === 'adventure' ? (
                <div className="space-y-6">
                    {CHAPTERS.map((chapter, ci) => {
                        const items = chapter.articleIds.map(id => INSIGHTS_LIST.find(i => i.id === id)).filter(Boolean);
                        const isDone = items.every(i => completedIds.includes(i!.id));
                        const isLocked = ci > 0 && !CHAPTERS[ci-1].articleIds.every(id => completedIds.includes(id));
                        return (
                            <ChapterNode key={chapter.id} chapter={chapter} items={items} completedIds={completedIds} isLocked={isLocked} isComplete={isDone} isExpanded={expandedChapters.has(chapter.id)} onToggle={() => toggleChapter(chapter.id)} index={ci} />
                        );
                    })}
                </div>
            ) : (
                <div className="space-y-10">
                    <div className="flex items-center gap-3 overflow-x-auto pb-3 scrollbar-hide">
                        <Filter size={18} className="text-zinc-600 mr-1" />
                        {availableCategories.map(cat => (
                            <button key={cat} onClick={() => setSelectedCategory(cat)}
                                className={`flex-shrink-0 px-6 py-2 rounded-xl text-xs font-black transition-all border ${selectedCategory === cat ? 'bg-emerald-500 text-black border-emerald-500 shadow-lg' : 'bg-white/[0.03] border-white/[0.08] text-zinc-400 hover:text-white'}`}>{cat}</button>
                        ))}
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {filteredInsights.map((item, i) => (
                            <InsightCard key={item.id} insight={item} idx={i} completed={completedIds.includes(item.id)} />
                        ))}
                    </div>
                </div>
            )}
        </motion.div>
    );
};

export default Insights;
