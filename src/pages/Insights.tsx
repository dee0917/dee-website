import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate, useSearchParams, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
    ArrowRight, Zap, Clock, Shield, TrendingUp, Filter, Star, Info, 
    MessageCircle, Sparkles, Coffee, AlertTriangle, X, History, 
    GitMerge, ChevronRight, User, Briefcase, Utensils, Baby, Quote, Home as HomeIcon
} from 'lucide-react';
import { CHAPTERS, MAIN_QUEST_ORDER, INSIGHTS_LIST } from '../data/insights';
import SEO from '../components/ui/SEO';
import { useIdentity } from '../context/IdentityContext';
import { PERSONAS, UserPersona } from '../data/personas';

const Insights = () => {
    const { persona, setPersona } = useIdentity();
    const [searchParams, setSearchParams] = useSearchParams();
    const navigate = useNavigate();
    
    const [loading, setLoading] = useState(true);
    const [showPersonaSwitch, setShowPersonaSwitch] = useState(false);
    const [completedIds, setCompletedIds] = useState<number[]>([]);

    useEffect(() => {
        const comp = localStorage.getItem('dee_ai_completed');
        if (comp) {
            try { setCompletedIds(JSON.parse(comp)); } catch(e) { setCompletedIds([]); }
        }
        setLoading(false);
    }, []);

    const handlePersonaChange = (p: UserPersona) => {
        setPersona(p);
        setShowPersonaSwitch(false);
    };

    if (loading) return <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center text-white animate-pulse font-mono text-xs tracking-widest">INITIALIZING_QUESTS...</div>;

    const currentPersona = PERSONAS[persona] || PERSONAS.general;

    return (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="pt-40 pb-20 px-6 max-w-7xl mx-auto min-h-screen text-left relative z-0">
            <SEO title="AI 生活實驗室 - 互動修煉地圖" description="選擇你的數位身分，開啟因材施教的 AI 冒險之旅。" path="/insights" />
            
            <AnimatePresence>
                {showPersonaSwitch && (
                    <PersonaSwitchModal 
                        current={persona} 
                        onSelect={handlePersonaChange} 
                        onClose={() => setShowPersonaSwitch(false)} 
                    />
                )}
            </AnimatePresence>

            <div className="mb-20">
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-10">
                    <div className="max-w-2xl space-y-6">
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center shadow-lg shadow-emerald-500/5">
                                <TrendingUp size={24} className="text-emerald-400" />
                            </div>
                            <h1 className="text-4xl md:text-6xl font-black text-white tracking-tighter italic uppercase">Quest Map</h1>
                        </div>
                        <p className="text-xl md:text-2xl text-zinc-400 font-medium leading-relaxed">
                            歡迎來到數位實驗室。這不是枯燥的課程，而是根據您的身分動態生成的 <span className="text-white border-b-2 border-emerald-500">實戰關卡</span>。
                        </p>
                    </div>

                    {/* 🚀 Active Persona Card */}
                    <motion.div whileHover={{ scale: 1.02 }} onClick={() => setShowPersonaSwitch(true)}
                        className={`cursor-pointer group relative p-8 rounded-[3rem] bg-gradient-to-br from-${currentPersona.color}-500/10 to-transparent border border-${currentPersona.color}-500/20 backdrop-blur-xl shadow-2xl min-w-[320px]`}
                    >
                        <div className="flex items-center gap-6">
                            <div className={`w-16 h-16 rounded-2xl bg-${currentPersona.color}-500 text-black flex items-center justify-center shadow-xl`}>
                                {React.createElement(currentPersona.icon, { size: 32 })}
                            </div>
                            <div className="text-left">
                                <span className="text-[10px] font-black text-zinc-500 uppercase tracking-widest block mb-1">Active Identity</span>
                                <h3 className="text-2xl font-black text-white">{currentPersona.label}</h3>
                            </div>
                        </div>
                        <div className="mt-6 flex items-center justify-between text-xs font-bold uppercase tracking-widest text-zinc-500">
                            <span>Change Role</span>
                            <ChevronRight size={14} className="group-hover:translate-x-2 transition-transform" />
                        </div>
                    </motion.div>
                </div>
            </div>

            {/* 🎮 Duolingo Style Interactive Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {CHAPTERS.map((chapter, cIdx) => (
                    <div key={chapter.id} className="space-y-8">
                        <div className="flex items-center gap-4 px-4">
                            <span className="text-emerald-500 font-black font-mono text-lg">0{chapter.id + 1}</span>
                            <h2 className="text-2xl font-black text-white uppercase tracking-tighter">{chapter.title}</h2>
                        </div>

                        <div className="space-y-4">
                            {chapter.articleIds.map((articleId) => {
                                const article = INSIGHTS_LIST.find(a => a.id === articleId);
                                if (!article) return null;
                                const isDone = completedIds.includes(articleId);

                                return (
                                    <Link key={articleId} to={`/insights/${articleId}`} className="block group">
                                        <motion.div whileHover={{ x: 10 }} 
                                            className={`p-6 rounded-[2.5rem] border transition-all relative overflow-hidden ${isDone ? 'bg-emerald-500/5 border-emerald-500/20' : 'bg-white/[0.02] border-white/5 hover:border-white/10'}`}
                                        >
                                            <div className="flex items-center justify-between gap-4">
                                                <div className="flex-1 min-w-0">
                                                    <h3 className={`text-lg font-black leading-tight mb-1 truncate ${isDone ? 'text-emerald-400' : 'text-white group-hover:text-emerald-300'}`}>{article.title}</h3>
                                                    <p className="text-xs text-zinc-500 font-medium uppercase tracking-widest">{article.category} // {article.readTime}</p>
                                                </div>
                                                <div className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all ${isDone ? 'bg-emerald-500 text-black' : 'bg-zinc-900 text-zinc-700 group-hover:text-emerald-500'}`}>
                                                    {isDone ? <Check size={20} strokeWidth={4} /> : <Zap size={18} />}
                                                </div>
                                            </div>
                                        </motion.div>
                                    </Link>
                                );
                            })}
                        </div>
                    </div>
                ))}
            </div>

            {/* 🛡️ Advanced Strategy Section */}
            <div className="mt-32 pt-20 border-t border-white/5">
                <div className="flex items-center gap-4 mb-12">
                    <span className="text-amber-500 font-black font-mono text-lg">EXT</span>
                    <h2 className="text-3xl md:text-5xl font-black text-white uppercase tracking-tighter italic">Strategic Evolutions</h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {INSIGHTS_LIST.filter(a => a.level === -1).map((article, i) => (
                        <Link key={article.id} to={`/insights/${article.id}`} className="group">
                             <div className="p-10 rounded-[3rem] bg-gradient-to-br from-zinc-900 to-black border border-white/5 group-hover:border-amber-500/30 transition-all shadow-2xl relative overflow-hidden">
                                <div className="absolute top-0 right-0 p-10 opacity-5 group-hover:opacity-10 transition-opacity">
                                    <Sparkles size={120} />
                                </div>
                                <div className="relative z-10 space-y-4">
                                    <span className="text-[10px] font-black text-amber-500 uppercase tracking-[0.4em]">{article.category}</span>
                                    <h3 className="text-2xl md:text-3xl font-black text-white group-hover:text-amber-400 transition-colors tracking-tight">{article.title}</h3>
                                    <p className="text-zinc-500 text-lg leading-relaxed line-clamp-2">{article.summary}</p>
                                    <div className="pt-4 flex items-center gap-2 text-white font-black text-xs uppercase tracking-widest group-hover:gap-4 transition-all">
                                        進入深度修行 <ArrowRight size={18} className="text-amber-500" />
                                    </div>
                                </div>
                             </div>
                        </Link>
                    ))}
                </div>
            </div>
        </motion.div>
    );
};

const PersonaSwitchModal = ({ current, onSelect, onClose }: { current: string, onSelect: (p: UserPersona) => void, onClose: () => void }) => {
    return (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[110] flex items-center justify-center px-6 bg-black/95 backdrop-blur-2xl">
            <motion.div initial={{ scale: 0.9, y: 30 }} animate={{ scale: 1, y: 0 }} className="bg-[#0c0c0c] border border-white/10 p-10 md:p-16 rounded-[4rem] max-w-4xl w-full shadow-[0_0_100px_rgba(0,0,0,1)] relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-emerald-500 via-teal-400 to-indigo-500" />
                <button onClick={onClose} className="absolute top-8 right-8 text-zinc-500 hover:text-white transition-colors p-3 bg-white/5 rounded-full"><X size={24} /></button>
                
                <div className="text-center mb-16 space-y-4">
                    <h2 className="text-4xl md:text-5xl font-black text-white tracking-tighter uppercase italic">Select Path</h2>
                    <p className="text-zinc-500 font-bold uppercase tracking-widest text-sm">解鎖專屬您的 AI 修煉劇本</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {(Object.keys(PERSONAS) as UserPersona[]).map(p => {
                        const conf = PERSONAS[p];
                        const isSelected = current === p;
                        return (
                            <button key={p} onClick={() => onSelect(p)}
                                className={`flex flex-col items-start p-8 rounded-[2.5rem] border transition-all text-left relative overflow-hidden group ${isSelected 
                                    ? `bg-${conf.color}-500/10 border-${conf.color}-500/50 shadow-[0_0_40px_rgba(0,0,0,0.5)]` 
                                    : 'bg-white/[0.02] border-white/5 hover:border-white/10 hover:bg-white/[0.05]'}`}
                            >
                                <div className={`w-14 h-14 rounded-2xl mb-6 flex items-center justify-center transition-transform group-hover:scale-110 ${isSelected ? `bg-${conf.color}-500 text-black shadow-lg` : 'bg-zinc-900 text-zinc-500'}`}>
                                    {React.createElement(conf.icon, { size: 28 })}
                                </div>
                                <h3 className={`text-xl font-black mb-2 ${isSelected ? 'text-white' : 'text-zinc-300'}`}>{conf.label}</h3>
                                <p className="text-xs text-zinc-500 leading-relaxed font-medium">{conf.description}</p>
                                
                                {isSelected && (
                                    <div className={`absolute top-4 right-4 text-${conf.color}-500`}>
                                        <Star size={16} fill="currentColor" />
                                    </div>
                                )}
                            </button>
                        );
                    })}
                </div>

                <div className="mt-16 p-8 rounded-3xl bg-emerald-500/5 border border-emerald-500/10 text-center">
                    <p className="text-emerald-500/70 text-xs font-bold uppercase tracking-[0.2em] leading-relaxed">
                        切換身分後，教學內容將即時根據您的痛點重新轉譯。<br/>無需重複測驗，直達核心戰略。
                    </p>
                </div>
            </motion.div>
        </motion.div>
    );
};

const Check = ({ size, strokeWidth }: any) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth || 2} strokeLinecap="round" strokeLinejoin="round">
        <polyline points="20 6 9 17 4 12"></polyline>
    </svg>
);

export default Insights;
