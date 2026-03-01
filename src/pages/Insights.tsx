import SEO from '../components/ui/SEO';
import { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
    ArrowRight, Star, BookOpen, Lock, CheckCircle2, Sparkles,
    Zap, Gamepad2, Trophy, ChevronDown, ChevronRight, Filter,
    Compass, Map, Shield, Search, X
} from 'lucide-react';
import { CHAPTERS, MAIN_QUEST_ORDER, INSIGHTS_LIST } from '../data/insights';
import { ChatGPTLogo, ClaudeLogo, GeminiLogo } from '../components/AILogos';

const CATEGORY_THEMES: Record<string, string> = {
    '啟航入口': 'teal',
    '心法重塑': 'emerald',
    '指令進化': 'violet',
    '生活實戰': 'blue',
    '職涯躍遷': 'rose',
    '戰略演進': 'indigo'
};

const THEME_CONFIG: Record<string, any> = {
    emerald: { text: 'text-emerald-500', lightText: 'text-emerald-400', tag: 'bg-emerald-500/10 text-emerald-500', border: 'hover:border-emerald-500/20', glow: 'group-hover:shadow-emerald-500/10' },
    yellow: { text: 'text-yellow-500', lightText: 'text-yellow-400', tag: 'bg-yellow-500/10 text-yellow-500', border: 'hover:border-yellow-500/20', glow: 'group-hover:shadow-yellow-500/10' },
    amber: { text: 'text-amber-500', lightText: 'text-amber-400', tag: 'bg-amber-500/10 text-amber-400', border: 'hover:border-amber-500/20', glow: 'group-hover:shadow-amber-500/10' },
    blue: { text: 'text-blue-500', lightText: 'text-blue-400', tag: 'bg-blue-500/10 text-blue-500', border: 'hover:border-blue-500/20', glow: 'group-hover:shadow-blue-500/10' },
    violet: { text: 'text-violet-500', lightText: 'text-violet-400', tag: 'bg-violet-500/10 text-violet-500', border: 'hover:border-violet-500/20', glow: 'group-hover:shadow-violet-500/10' },
    rose: { text: 'text-rose-500', lightText: 'text-rose-400', tag: 'bg-rose-500/10 text-rose-500', border: 'hover:border-rose-500/20', glow: 'group-hover:shadow-rose-500/10' },
    teal: { text: 'text-teal-500', lightText: 'text-teal-400', tag: 'bg-teal-500/10 text-teal-500', border: 'hover:border-teal-500/20', glow: 'group-hover:shadow-teal-500/10' },
    zinc: { text: 'text-zinc-300', lightText: 'text-zinc-200', tag: 'bg-white/5 text-zinc-400', border: 'hover:border-zinc-300/20', glow: '' },
    indigo: { text: 'text-indigo-500', lightText: 'text-indigo-400', tag: 'bg-indigo-500/10 text-indigo-500', border: 'hover:border-indigo-500/20', glow: 'group-hover:shadow-indigo-500/10' },
};

const OnboardingScreen = ({ onComplete }: { onComplete: (mode: 'guided' | 'free', chapter?: number) => void }) => {
    const [phase, setPhase] = useState<'welcome' | 'platform' | 'never-used' | 'experience' | 'result'>('welcome');
    const [platform, setPlatform] = useState('');
    const [resultChapter, setResultChapter] = useState(0);

    const handlePlatform = (p: string) => {
        setPlatform(p);
        localStorage.setItem('dee_ai_platform', p);
        if (p === 'none') {
            setResultChapter(0);
            setPhase('never-used');
        } else {
            setPhase('experience');
        }
    };

    const handleExperience = (level: number) => {
        const ch = level === 0 ? 1 : level === 1 ? 2 : 3;
        setResultChapter(ch);
        setPhase('result');
    };

    const chapterEmojis: Record<number, string> = { 0: '🚀', 1: '🧠', 2: '🔧', 3: '🎯', 4: '🏆' };
    const chapterNames: Record<number, string> = { 0: '🚀 Ch.0 啟航入口', 1: '🧠 Ch.1 心法重塑', 2: '🔧 Ch.2 指令進化', 3: '🎯 Ch.3 生活實戰', 4: '🏆 Ch.4 職涯躍遷' };
    const chapterDescs: Record<number, string> = {
        0: "沒關係，我們先來認識三大 AI，完成你的第一段對話。",
        1: "完美的起點！從最基本的夥伴思維開始。",
        2: "你有基礎了！直接學習結構化指令技巧。",
        3: "不錯喔！直接用 AI 解決生活中的實際問題。",
        4: "高手！直接挑戰職場自動化與管理任務。"
    };

    const ModalShell = ({ children, kkey }: { children: React.ReactNode; kkey: string }) => (
        <motion.div key={kkey} initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }}
            className="bg-zinc-900/90 border border-white/10 p-8 md:p-12 rounded-[2.5rem] max-w-lg w-full shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-emerald-500 via-teal-400 to-emerald-600" />
            <div className="relative z-10">{children}</div>
        </motion.div>
    );

    return (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="fixed inset-0 z-[100] flex items-center justify-center px-6 bg-black/90 backdrop-blur-xl">
            <AnimatePresence mode="wait">
                {phase === 'welcome' && (
                    <ModalShell kkey="w">
                        <div className="text-center mb-10">
                            <div className="text-6xl mb-6 text-center">👋</div>
                            <h2 className="text-2xl md:text-3xl font-black text-white mb-3 tracking-tight text-center">嗨！歡迎來到 Dee's AI Lab</h2>
                            <p className="text-zinc-400 text-base md:text-lg leading-relaxed text-center">這裡有精心設計的 15 篇基礎必修課，帶你從零開始掌握 AI 核心主權。</p>
                        </div>
                        <div className="space-y-4">
                            <button onClick={() => setPhase('platform')}
                                className="w-full py-5 px-6 rounded-2xl bg-emerald-500 text-black font-black text-lg flex items-center justify-center gap-3 hover:bg-emerald-400 shadow-lg shadow-emerald-500/20">
                                <Sparkles size={22} /> 開始修煉
                            </button>
                            <button onClick={() => onComplete('free')}
                                className="w-full py-4 px-6 rounded-2xl bg-transparent border border-white/5 text-zinc-500 font-bold text-base hover:text-white transition-all text-center text-center">
                                <BookOpen size={20} /> 直接看全部教學
                            </button>
                        </div>
                    </ModalShell>
                )}

                {phase === 'platform' && (
                    <ModalShell kkey="p">
                        <div className="text-center mb-8">
                            <h3 className="text-xl md:text-2xl font-black text-white mb-2 text-center">你目前有在用哪個 AI 嗎？</h3>
                            <p className="text-zinc-500 text-sm text-center">我們會根據你的經驗安排起點。</p>
                        </div>
                        <div className="space-y-3">
                            {['chatgpt', 'claude', 'gemini', 'none'].map((p) => (
                                <button key={p} onClick={() => handlePlatform(p)}
                                    className="w-full py-5 px-6 rounded-2xl bg-white/5 border border-white/5 hover:bg-emerald-500/10 text-white font-bold text-lg text-left flex items-center gap-4">
                                    <span className="text-2xl">{p === 'none' ? '😶' : '🤖'}</span>
                                    <div><div className="font-black uppercase">{p}</div><div className="text-zinc-500 text-xs">{p === 'none' ? '完全沒關係，從頭開始' : '已有使用經驗'}</div></div>
                                </button>
                            ))}
                        </div>
                    </ModalShell>
                )}

                {phase === 'never-used' && (
                    <ModalShell kkey="n">
                        <div className="text-center">
                            <div className="text-6xl mb-6 text-center">🚀</div>
                            <h3 className="text-2xl font-black text-white mb-3 text-center">太好了，從頭開始最棒！</h3>
                            <p className="text-zinc-400 text-base mb-10 leading-relaxed text-center">只需要 15 分鐘，你就能建立起對 AI 的正確認知並發送第一則高效指令。</p>
                            <div className="space-y-3">
                                <button onClick={() => onComplete('guided', 0)} className="w-full py-5 px-6 rounded-2xl bg-emerald-500 text-black font-black text-lg hover:bg-emerald-400 shadow-lg">🎮 開始冒險模式</button>
                                <button onClick={() => onComplete('free', 0)} className="w-full py-4 px-6 rounded-2xl bg-white/5 border border-white/10 text-zinc-400 font-bold text-base hover:text-white">📚 全部教學</button>
                            </div>
                        </div>
                    </ModalShell>
                )}

                {phase === 'experience' && (
                    <ModalShell kkey="e">
                        <div className="text-center mb-8">
                            <h3 className="text-xl md:text-2xl font-black text-white mb-2 text-center">你的 AI 熟練度？</h3>
                        </div>
                        <div className="space-y-3">
                            <button onClick={() => handleExperience(0)} className="w-full py-5 px-6 rounded-2xl bg-white/5 border border-white/10 hover:bg-emerald-500/10 text-white font-bold text-left">🌱 剛聽說，不太會用</button>
                            <button onClick={() => handleExperience(1)} className="w-full py-5 px-6 rounded-2xl bg-white/5 border border-white/10 hover:bg-emerald-500/10 text-white font-bold text-left">🔧 寫文案、做過簡單翻譯</button>
                            <button onClick={() => handleExperience(2)} className="w-full py-5 px-6 rounded-2xl bg-white/5 border border-white/10 hover:bg-emerald-500/10 text-white font-bold text-left">🏆 已經很熟了，想學戰略應用</button>
                        </div>
                    </ModalShell>
                )}

                {phase === 'result' && (
                    <ModalShell kkey="r">
                        <div className="text-center">
                            <div className="text-6xl mb-6 text-center">{chapterEmojis[resultChapter]}</div>
                            <h3 className="text-2xl font-black text-white mb-3 text-center">你的起始章節</h3>
                            <p className="text-emerald-400 font-black text-xl mb-4 text-center">{chapterNames[resultChapter]}</p>
                            <p className="text-zinc-400 text-base mb-10 leading-relaxed text-center">{chapterDescs[resultChapter]}</p>
                            <div className="space-y-3">
                                <button onClick={() => onComplete('guided', resultChapter)} className="w-full py-5 px-6 rounded-2xl bg-emerald-500 text-black font-black text-lg shadow-lg">🎮 開始冒險</button>
                                <button onClick={() => onComplete('free', resultChapter)} className="w-full py-4 px-6 rounded-2xl bg-white/5 border border-white/10 text-zinc-400 font-bold text-base hover:text-white">📚 自由模式</button>
                            </div>
                        </div>
                    </ModalShell>
                )}
            </AnimatePresence>
        </motion.div>
    );
};

const Insights = () => {
    const [viewMode, setViewMode] = useState<'adventure' | 'free'>('adventure');
    const [loading, setLoading] = useState(true);
    const [showOnboarding, setShowOnboarding] = useState(false);
    const [unlockedChapter, setUnlockedChapter] = useState(1);
    const [completedIds, setCompletedIds] = useState<number[]>([]);
    const [searchQuery, setSearchQuery] = useState<string>('');
    const [expandedChapters, setExpandedChapters] = useState<Set<number>>(new Set());

    useEffect(() => {
        const done = localStorage.getItem('dee_onboarding_done');
        const saved = localStorage.getItem('dee_ai_level');
        const mode = localStorage.getItem('dee_view_preference');
        const comp = localStorage.getItem('dee_ai_completed');

        if (!done) setShowOnboarding(true);
        else {
            if (saved) setUnlockedChapter(parseInt(saved));
            if (mode === 'free') setViewMode('free');
        }
        if (comp) {
            try { setCompletedIds(JSON.parse(comp)); } catch(e) { setCompletedIds([]); }
        }
        setLoading(false);
    }, []);

    const allInsights = useMemo(() => INSIGHTS_LIST, []);

    useEffect(() => {
        if (viewMode === 'adventure') {
            setExpandedChapters(new Set([unlockedChapter]));
        }
    }, [unlockedChapter, viewMode]);

    const handleOnboardingComplete = (mode: 'guided' | 'free', chapter?: number) => {
        const ch = chapter || 0;
        setUnlockedChapter(ch);
        setViewMode(mode === 'free' ? 'free' : 'adventure');
        localStorage.setItem('dee_onboarding_done', 'true');
        localStorage.setItem('dee_ai_level', ch.toString());
        localStorage.setItem('dee_view_preference', mode);
        setShowOnboarding(false);
    };

    const handleModeSwitch = (m: 'adventure' | 'free') => {
        setViewMode(m);
        localStorage.setItem('dee_view_preference', m);
    };

    const toggleChapter = (id: number) => {
        setExpandedChapters(prev => {
            const next = new Set(prev);
            if (next.has(id)) next.delete(id); else next.add(id);
            return next;
        });
    };

    const filteredInsights = useMemo(() => {
        if (!searchQuery || searchQuery.trim() === '') return allInsights;
        const q = searchQuery.toLowerCase();
        return allInsights.filter(i => (i.title + i.summary + i.category).toLowerCase().includes(q));
    }, [allInsights, searchQuery]);

    const progressPct = completedIds.length / allInsights.length;

    if (loading) return <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center text-white font-mono text-xs tracking-widest animate-pulse">SYNCING...</div>;

    return (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="pt-24 pb-20 min-h-screen text-left relative z-0">
            <SEO title="免費 AI 實用教學" description="15 篇基礎必修課 + 無限戰略演進庫" path="/insights" />
            <AnimatePresence>{showOnboarding && <OnboardingScreen onComplete={handleOnboardingComplete} />}</AnimatePresence>

            <div className="relative px-6 max-w-5xl mx-auto mb-12">
                <div className="flex flex-col sm:flex-row items-center justify-between gap-6 mb-10 text-left">
                    <div className="flex items-center gap-4 text-left">
                        <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-left"><Map size={22} className="text-emerald-400" /></div>
                        <div className="text-left"><h1 className="text-2xl md:text-3xl font-black text-white text-left tracking-tight">AI 修煉地圖</h1><span className="text-emerald-500/60 font-mono text-[9px] tracking-[0.4em] uppercase block text-left">Skill Matrix 2.0</span></div>
                    </div>
                    <div className="bg-black/40 p-1.5 rounded-2xl border border-white/[0.08] flex items-center shadow-inner">
                        <button onClick={() => handleModeSwitch('adventure')} className={`px-6 py-2.5 rounded-xl text-xs font-black transition-all ${viewMode === 'adventure' ? 'bg-emerald-500 text-black' : 'text-zinc-500 hover:text-white'}`}>冒險</button>
                        <button onClick={() => handleModeSwitch('free')} className={`px-6 py-2.5 rounded-xl text-xs font-black transition-all ${viewMode === 'free' ? 'bg-emerald-500 text-black' : 'text-zinc-500 hover:text-white'}`}>自由</button>
                    </div>
                </div>

                <div className="relative z-10 text-left">
                    <div className="flex items-center justify-between mb-3 text-left">
                        <span className="text-zinc-500 text-[10px] font-black uppercase tracking-widest text-left">Progress</span>
                        <span className="text-emerald-400 text-xs font-black font-mono text-left">{Math.round(progressPct * 100)}%</span>
                    </div>
                    <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden border border-white/5">
                        <motion.div className="h-full bg-emerald-500" initial={{ width: 0 }} animate={{ width: `${progressPct * 100}%` }} />
                    </div>
                </div>
            </div>

            <div className="px-6 max-w-5xl mx-auto relative z-10 text-left">
                {viewMode === 'adventure' ? (
                    <div className="space-y-4 text-left">
                        {CHAPTERS.map((chapter, ci) => {
                            const items = chapter.articleIds.map(id => allInsights.find(i => i.id === id)).filter(Boolean);
                            const done = items.filter(i => completedIds.includes(i!.id)).length;
                            const isLocked = chapter.id > unlockedChapter;
                            const isComplete = done >= items.length;
                            return (
                                <ChapterNode key={chapter.id} chapter={chapter} items={items as any[]} completedIds={completedIds} isLocked={isLocked} isComplete={isComplete} isExpanded={expandedChapters.has(chapter.id)} onToggle={() => toggleChapter(chapter.id)} index={ci} />
                            );
                        })}
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 text-left">
                        {filteredInsights.map((item, i) => (
                            <InsightCard key={item.id} insight={item} idx={i} completed={completedIds.includes(item.id)} />
                        ))}
                    </div>
                )}
            </div>
        </motion.div>
    );
};

const ChapterNode = ({ chapter, items, completedIds, isLocked, isComplete, isExpanded, onToggle, index }: any) => {
    const themeColor = CATEGORY_THEMES[chapter.title] || 'emerald';
    return (
        <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: index * 0.05 }} className={`relative text-left ${isLocked ? 'opacity-30' : ''}`}>
            <div className={`border rounded-2xl transition-all cursor-pointer text-left ${isExpanded ? 'bg-white/[0.02] border-white/10' : 'border-white/5 hover:border-white/10'}`} onClick={isLocked ? undefined : onToggle}>
                <div className="p-6 md:p-8 flex items-center justify-between text-left">
                    <div className="flex items-center gap-5 text-left flex-1">
                        <span className="text-3xl text-left">{chapter.emoji}</span>
                        <div className="text-left"><h2 className="text-xl md:text-2xl font-black text-white text-left">{chapter.title}</h2><p className="text-zinc-500 text-xs md:text-sm text-left">{chapter.subtitle}</p></div>
                    </div>
                    {!isLocked && <ChevronDown size={18} className={`transition-transform text-zinc-600 ${isExpanded ? 'rotate-180' : ''}`} />}
                </div>
                <AnimatePresence>
                    {isExpanded && !isLocked && (
                        <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden border-t border-white/5 text-left">
                            <div className="p-4 space-y-2 text-left">
                                {items.map((item: any, i: number) => {
                                    const isDone = completedIds.includes(item.id);
                                    return (
                                        <Link key={item.id} to={`/insights/${item.id}`} className={`flex items-center gap-4 p-4 rounded-xl transition-all text-left ${isDone ? 'bg-emerald-500/5' : 'hover:bg-white/5'}`}>
                                            <div className={`w-8 h-8 rounded-lg flex items-center justify-center text-xs font-black flex-shrink-0 text-left ${isDone ? 'bg-emerald-500 text-black' : 'bg-zinc-800 text-zinc-500'}`}>{isDone ? '✓' : i + 1}</div>
                                            <div className="flex-1 text-left min-w-0"><h4 className="text-sm md:text-base font-bold text-white text-left truncate">{item.title}</h4></div>
                                            <ChevronRight size={14} className="text-zinc-700" />
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
        <Link to={`/insights/${insight.id}`} className="block h-full text-left">
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: idx * 0.03 }}
                className={`bg-zinc-900 border p-5 rounded-2xl h-full flex flex-col transition-all text-left ${completed ? 'border-emerald-500/30' : 'border-white/5 hover:border-white/10'}`}>
                <div className="flex justify-between items-start mb-3 text-left">
                    <span className="text-[9px] font-black px-2 py-0.5 rounded bg-white/5 text-zinc-500 uppercase text-left">{insight.category}</span>
                    {completed && <CheckCircle2 size={14} className="text-emerald-500" />}
                </div>
                <h4 className="text-sm font-black text-white mb-2 line-clamp-2 text-left">{insight.title}</h4>
                <p className="text-zinc-500 text-[11px] line-clamp-2 leading-relaxed text-left">{insight.summary}</p>
            </motion.div>
        </Link>
    );
};

export default Insights;
