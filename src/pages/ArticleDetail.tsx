import React, { useState, useEffect, useRef, useMemo } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, ArrowRight, Copy, Check, ChevronDown, Lock, Sparkles, MousePointer2, Smartphone, Gamepad2, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import { api } from '../lib/supabase';
import { INSIGHTS } from '../data/mock';
import { MAIN_QUEST_ORDER, CHAPTERS, SIDE_QUEST_IDS } from '../data/insights';
import SEO from '../components/ui/SEO';
import { ChatGPTLogo, ClaudeLogo, GeminiLogo } from '../components/AILogos';
import { useIdentity } from '../context/IdentityContext';

const fadeUp = {
    initial: { opacity: 0, y: 10 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: "-20px" },
    transition: { duration: 0.3 }
};

const ArticleDetail = () => {
    const { id } = useParams();
    const { persona } = useIdentity();
    const [article, setArticle] = useState<any | null>(null);
    const [loading, setLoading] = useState(true);
    const [copied, setCopied] = useState(false);
    const [progress, setProgress] = useState(0);
    const [currentStep, setCurrentStep] = useState(0);
    const [stepsCompleted, setStepsCompleted] = useState<boolean[]>([]);
    const [quizAnswer, setQuizAnswer] = useState<number | null>(null);
    const [quizSubmitted, setQuizSubmitted] = useState(false);
    const [badgeEarned, setBadgeEarned] = useState(false);
    const [treasurePhase, setTreasurePhase] = useState<'locked' | 'falling' | 'impact' | 'exploding' | 'revealed'>('locked');
    const [freeMode, setFreeMode] = useState(false);
    const [showAiJumpModal, setShowAiJumpModal] = useState(false);
    
    const stepRefs = useRef<(HTMLDivElement | null)[]>([]);
    const treasureRef = useRef<HTMLDivElement>(null);
    const hookRef = useRef<HTMLDivElement>(null);

    // 🚀 身分內容計算器
    const displayContent = useMemo(() => {
        if (!article) return null;
        const base = {
            pain_point: article.pain_point,
            example: article.example,
            practice_kit: article.practice_kit
        };
        const override = article.persona_overrides?.[persona];
        return override ? { ...base, ...override } : base;
    }, [article, persona]);

    const getColorClasses = (themeColor: string) => {
        const colors: Record<string, any> = {
            emerald: { text: 'text-emerald-500', lightText: 'text-emerald-400', bg: 'bg-emerald-500/10', border: 'border-emerald-500/20', gradient: 'from-emerald-500/20 to-teal-500/10', glow: 'shadow-emerald-500/20', solid: 'bg-emerald-500' },
            yellow: { text: 'text-yellow-500', lightText: 'text-yellow-400', bg: 'bg-yellow-500/10', border: 'border-yellow-500/20', gradient: 'from-yellow-500/10 to-orange-500/10', glow: 'shadow-emerald-500/20', solid: 'bg-yellow-500' },
            amber: { text: 'text-amber-500', lightText: 'text-amber-400', bg: 'bg-amber-500/10', border: 'border-amber-500/20', gradient: 'from-amber-500/20 to-yellow-500/10', glow: 'shadow-emerald-500/20', solid: 'bg-amber-500' },
            blue: { text: 'text-blue-500', lightText: 'text-blue-400', bg: 'bg-blue-500/10', border: 'border-blue-500/20', gradient: 'from-blue-500/20 to-indigo-500/10', glow: 'shadow-blue-500/20', solid: 'bg-blue-500' },
            violet: { text: 'text-violet-500', lightText: 'text-violet-400', bg: 'bg-violet-500/10', border: 'border-violet-500/20', gradient: 'from-violet-500/20 to-purple-500/10', glow: 'shadow-violet-500/20', solid: 'bg-violet-500' },
            rose: { text: 'text-rose-500', lightText: 'text-rose-400', bg: 'bg-rose-500/10', border: 'border-rose-500/20', gradient: 'from-rose-500/20 to-pink-500/10', glow: 'shadow-rose-500/20', solid: 'bg-rose-500' },
            pink: { text: 'text-pink-500', lightText: 'text-pink-400', bg: 'bg-pink-500/10', border: 'border-pink-500/20', gradient: 'from-pink-500/20 to-rose-500/10', glow: 'shadow-pink-500/20', solid: 'bg-pink-500' },
            teal: { text: 'text-teal-500', lightText: 'text-teal-400', bg: 'bg-teal-500/10', border: 'border-teal-500/20', gradient: 'from-teal-500/20 to-cyan-500/10', glow: 'shadow-teal-500/20', solid: 'bg-teal-500' },
            cyan: { text: 'text-cyan-500', lightText: 'text-cyan-400', bg: 'bg-cyan-500/10', border: 'border-cyan-500/20', gradient: 'from-cyan-500/20 to-blue-500/10', glow: 'shadow-cyan-500/20', solid: 'bg-cyan-500' },
            zinc: { text: 'text-zinc-300', lightText: 'text-zinc-200', bg: 'bg-white/5', border: 'border-white/10', gradient: 'from-white/5 to-zinc-900', glow: 'shadow-white/10', solid: 'bg-zinc-500' }
        };
        return colors[themeColor] || colors.emerald;
    };

    useEffect(() => {
        const handler = () => {
            const scrollTop = window.scrollY;
            const docHeight = document.documentElement.scrollHeight - window.innerHeight;
            setProgress(docHeight > 0 ? scrollTop / docHeight : 0);
        };
        window.addEventListener('scroll', handler, { passive: true });
        return () => window.removeEventListener('scroll', handler);
    }, []);

    useEffect(() => {
        if (id) fetchArticle(parseInt(id));
    }, [id]);

    useEffect(() => {
        if (article?.steps) {
            const isFree = localStorage.getItem('dee_view_preference') === 'free';
            setFreeMode(isFree);
            setStepsCompleted(new Array(article.steps.length).fill(false));
            setCurrentStep(0);
            setTreasurePhase('locked');
            stepRefs.current = new Array(article.steps.length).fill(null);
        }
        setQuizAnswer(null);
        setQuizSubmitted(false);
        setBadgeEarned(false);
        setCopied(false);
        setShowAiJumpModal(false);
    }, [article?.id, article?.steps?.length]);

    const fetchArticle = async (articleId: number) => {
        try {
            setLoading(true);
            const localArticle = INSIGHTS.find(i => i.id === articleId);
            const dbData = await api.getInsightById(articleId);
            if (localArticle) setArticle({ ...dbData, ...localArticle });
            else if (dbData) setArticle(dbData);
            else setArticle(null);
        } catch (e) {
            setArticle(null);
        } finally {
            setLoading(false);
        }
    };

    const handleClaimCommand = () => {
        if (displayContent?.practice_kit?.command) {
            navigator.clipboard.writeText(displayContent.practice_kit.command);
            setCopied(true);
            setTimeout(() => setCopied(false), 3000);
            setTimeout(() => setShowAiJumpModal(true), 500);
        }
    };

    const scrollToHook = () => {
        hookRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    };

    const handleStepComplete = (idx: number) => {
        const updated = [...stepsCompleted];
        updated[idx] = true;
        setStepsCompleted(updated);
        
        if (idx < (article?.steps?.length || 0) - 1) {
            const nextIdx = idx + 1;
            setCurrentStep(nextIdx);
            setTimeout(() => {
                const element = stepRefs.current[nextIdx];
                if (element) {
                    const rect = element.getBoundingClientRect();
                    const absoluteElementTop = rect.top + window.pageYOffset;
                    const middle = absoluteElementTop - (window.innerHeight / 2) + (rect.height / 2);
                    window.scrollTo({ top: middle, behavior: 'smooth' });
                }
            }, 300);
        } else {
            setTimeout(() => {
                const element = treasureRef.current;
                if (element) {
                    const rect = element.getBoundingClientRect();
                    const absoluteElementTop = rect.top + window.pageYOffset;
                    const middle = absoluteElementTop - (window.innerHeight / 2) + (rect.height / 2);
                    window.scrollTo({ top: middle, behavior: 'smooth' });
                }
                setTimeout(() => setTreasurePhase('falling'), 500);
                setTimeout(() => {
                    setTreasurePhase('impact');
                    confetti({ particleCount: 40, spread: 30, origin: { y: 0.55 }, colors: ['#fbbf24', '#f59e0b'] });
                }, 1200);
                setTimeout(() => {
                    setTreasurePhase('exploding');
                    confetti({ particleCount: 300, spread: 160, origin: { y: 0.5 }, colors: ['#fbbf24', '#f59e0b', '#10b981', '#ffffff', '#a855f7', '#ec4899'] });
                }, 1800);
                setTimeout(() => setTreasurePhase('revealed'), 2600);
            }, 200);
        }
    };

    const handleQuizSubmit = () => {
        if (quizAnswer === null) return;
        setQuizSubmitted(true);
        if (quizAnswer === article?.quiz?.answer) {
            confetti({ particleCount: 150, spread: 70, origin: { y: 0.6 } });
        }
    };

    const handleEarnBadge = () => {
        setBadgeEarned(true);
        if (article?.id) {
            const savedCompleted = localStorage.getItem('dee_ai_completed');
            let completed = savedCompleted ? JSON.parse(savedCompleted) : [];
            if (!completed.includes(article.id)) {
                completed.push(article.id);
                localStorage.setItem('dee_ai_completed', JSON.stringify(completed));
            }
        }
    };

    if (loading) return <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center text-white font-mono text-xs tracking-widest animate-pulse">SYNCING_DATA...</div>;
    if (!article) return <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center text-white font-bold">404</div>;

    const theme = getColorClasses(article.themeColor || 'emerald');
    const hasSteps = article.steps && article.steps.length > 0;
    const hasQuiz = article.quiz && article.quiz.question;
    const allStepsDone = stepsCompleted.every(s => s === true);

    const mainIndex = MAIN_QUEST_ORDER.indexOf(article.id);
    const isMainQuest = mainIndex !== -1;
    const nextArticleId = isMainQuest ? MAIN_QUEST_ORDER[mainIndex + 1] : null;
    const nextArticle: any = nextArticleId ? (INSIGHTS.find(i => i.id === nextArticleId) || null) : null;

    return (
        <div className="min-h-screen bg-[#0a0a0a] text-zinc-300 selection:bg-emerald-500/30">
            <SEO title={article.title} description={article.summary} path={`/insights/${article.id}`} />
            
            {/* Progress Bar */}
            <div className="fixed top-0 left-0 w-full h-1 z-[60] bg-white/5">
                <motion.div className="h-full bg-emerald-500 shadow-[0_0_10px_#10b981]" style={{ width: `${progress * 100}%` }} />
            </div>

            {/* 1. Header (Clean & Pro) */}
            <section className="relative min-h-[80vh] flex flex-col items-center justify-center px-6 overflow-hidden border-b border-white/5">
                <div className={`absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-gradient-to-b ${theme.gradient} opacity-20 pointer-events-none`} />
                
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-4xl w-full text-center relative z-10 pt-32 pb-20">
                    <Link to="/insights" className="inline-flex items-center gap-2 text-zinc-500 hover:text-white transition-colors mb-8 group text-[10px] font-black uppercase tracking-[0.3em]">
                        <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" /> 返回修煉地圖
                    </Link>
                    
                    <div className="flex items-center justify-center gap-4 mb-8">
                        <span className={`text-[10px] font-black px-4 py-1.5 rounded-full uppercase tracking-[0.2em] bg-white/5 border border-white/10 text-zinc-400`}>
                            {article.category}
                        </span>
                        <div className="flex gap-1">
                            {[...Array(5)].map((_, i) => (
                                <StarIcon key={i} size={10} className={i < (article.difficulty_level || 1) ? 'text-amber-500' : 'text-zinc-800'} fill="currentColor" />
                            ))}
                        </div>
                    </div>

                    <h1 className="text-4xl md:text-6xl lg:text-7xl font-black text-white mb-10 tracking-tighter leading-[1.1] text-center px-4">
                        {article.title}
                    </h1>

                    <p className="text-xl md:text-2xl text-zinc-400 mb-12 max-w-2xl mx-auto leading-relaxed font-medium">
                        {article.summary}
                    </p>

                    <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={scrollToHook}
                        className="bg-white text-black font-black py-5 px-12 rounded-[2rem] text-xl flex items-center gap-4 mx-auto shadow-2xl hover:bg-emerald-500 hover:text-white transition-all group">
                        <Gamepad2 size={24} /> 開始修煉 <ArrowRight size={22} className="group-hover:translate-x-1 transition-transform" />
                    </motion.button>
                </motion.div>
            </section>

            {/* 2. Hook Section */}
            <section className="py-32 px-6 bg-zinc-950/50" ref={hookRef}>
                <div className="max-w-4xl mx-auto text-center">
                    <motion.div {...fadeUp} className="mb-20">
                        <span className="text-emerald-500 font-black text-[10px] tracking-[0.4em] uppercase mb-4 block">THE PAIN POINT</span>
                        <h2 className="text-3xl md:text-5xl font-black text-white mb-8 tracking-tight">你也正為了這件事煩惱嗎？</h2>
                        <p className="text-xl md:text-3xl text-zinc-300 leading-relaxed font-serif italic text-center px-6">
                            「{displayContent?.pain_point}」
                        </p>
                    </motion.div>

                    <div className="grid md:grid-cols-2 gap-6">
                        <motion.div {...fadeUp} className="bg-white/[0.02] border border-white/5 rounded-[2.5rem] p-10 text-left relative overflow-hidden group">
                            <span className="text-zinc-600 font-black text-[10px] block mb-4 uppercase tracking-widest">過去的你</span>
                            <p className="text-zinc-400 text-lg md:text-xl leading-relaxed">{displayContent?.example?.wrong}</p>
                            <div className="absolute -right-4 -bottom-4 text-8xl opacity-5 font-black grayscale rotate-12">❌</div>
                        </motion.div>
                        <motion.div {...fadeUp} transition={{ delay: 0.1 }} className="bg-emerald-500/[0.03] border border-emerald-500/20 rounded-[2.5rem] p-10 text-left relative overflow-hidden group shadow-2xl shadow-emerald-500/5">
                            <span className="text-emerald-400 font-black text-[10px] block mb-4 uppercase tracking-widest">現在的你</span>
                            <p className="text-white text-lg md:text-xl leading-relaxed font-bold">{displayContent?.example?.right}</p>
                            <div className="absolute -right-4 -bottom-4 text-8xl opacity-10 font-black text-emerald-500 -rotate-12">✅</div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* 3. Steps Section */}
            {hasSteps && (
                <section className="py-32 px-6 border-t border-white/5">
                    <div className="max-w-4xl mx-auto">
                        <div className="text-center mb-20">
                            <span className="text-emerald-500 font-black text-[10px] tracking-[0.4em] uppercase mb-4 block">THE PRACTICE</span>
                            <h2 className="text-3xl md:text-5xl font-black text-white tracking-tight">一步一步跟著做</h2>
                        </div>
                        
                        <div className="space-y-6">
                            {article.steps.map((step: any, idx: number) => {
                                const isDone = stepsCompleted[idx];
                                const isActive = idx === currentStep;
                                const isLocked = !freeMode && idx > currentStep;
                                
                                return (
                                    <motion.div key={idx} ref={el => stepRefs.current[idx] = el}
                                        initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                                        className={`relative rounded-[3rem] border p-8 md:p-12 transition-all duration-700 overflow-hidden ${isDone ? 'bg-white/[0.01] border-emerald-500/20' : isActive ? 'bg-zinc-900 border-white/20 shadow-2xl' : 'border-white/5 opacity-20'}`}>
                                        
                                        <div className={`flex flex-col md:flex-row items-start gap-10 ${isLocked ? 'blur-md pointer-events-none' : ''}`}>
                                            <div className={`w-14 h-14 rounded-2xl flex items-center justify-center flex-shrink-0 text-2xl font-black transition-all duration-500 ${isDone ? 'bg-emerald-500 text-black shadow-[0_0_20px_#10b981]' : isActive ? 'bg-white text-black' : 'bg-white/5 text-zinc-700'}`}>
                                                {isDone ? '✓' : idx + 1}
                                            </div>
                                            <div className="flex-1 text-left">
                                                <h3 className={`text-2xl md:text-4xl font-black mb-6 tracking-tighter ${isDone ? 'text-emerald-400' : 'text-white'}`}>{step.title}</h3>
                                                <p className="text-lg md:text-2xl text-zinc-300 leading-relaxed font-medium mb-8">{step.body}</p>
                                                
                                                {step.dee_tip && (
                                                    <div className="bg-emerald-500/5 border-l-4 border-emerald-500 p-6 rounded-r-3xl mb-8">
                                                        <p className="text-emerald-400 text-lg md:text-xl italic font-black leading-relaxed">💡 Dee's Tip: {step.dee_tip}</p>
                                                    </div>
                                                )}

                                                {isActive && !isDone && (
                                                    <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} onClick={() => handleStepComplete(idx)}
                                                        className="py-5 px-10 rounded-2xl bg-emerald-500 text-black font-black text-lg shadow-2xl flex items-center gap-3">
                                                        我了解了，下一個 <MousePointer2 size={20} className="animate-bounce" />
                                                    </motion.button>
                                                )}
                                            </div>
                                        </div>

                                        {isLocked && (
                                            <div className="absolute inset-0 z-10 bg-black/40 flex items-center justify-center">
                                                <div className="w-16 h-16 rounded-full bg-white/10 flex items-center justify-center backdrop-blur-xl border border-white/20">
                                                    <Lock size={24} className="text-white/50" />
                                                </div>
                                            </div>
                                        )}
                                    </motion.div>
                                );
                            })}
                        </div>
                    </div>
                </section>
            )}

            {/* 4. Treasure Box Section */}
            <section className="py-32 px-6 border-t border-white/5 relative overflow-hidden" ref={treasureRef}>
                <div className={`absolute inset-0 bg-gradient-to-b ${theme.gradient} opacity-5 pointer-events-none`} />
                <motion.div {...fadeUp} className="max-w-4xl mx-auto text-center relative z-10">
                    {!allStepsDone ? (
                        <div className="py-20 grayscale opacity-20 flex flex-col items-center gap-8">
                            <div className="text-8xl">🎁</div>
                            <h2 className="text-2xl font-black text-white uppercase tracking-[0.6em]">Treasure Locked</h2>
                            <p className="text-zinc-500">完成所有練習步驟後解鎖專屬指令寶箱</p>
                        </div>
                    ) : (
                        <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="space-y-12">
                            <div className="inline-block px-6 py-2 rounded-full bg-emerald-500 text-black font-black text-[10px] uppercase tracking-[0.4em] mb-4">Masterpiece Unlocked</div>
                            <h2 className="text-4xl md:text-6xl font-black text-white tracking-tighter leading-tight">{displayContent?.practice_kit?.title}</h2>
                            
                            <div className="bg-zinc-900 border-2 border-emerald-500/30 rounded-[3rem] p-10 md:p-16 shadow-2xl relative overflow-hidden text-left">
                                <p className="text-xl md:text-2xl text-zinc-300 leading-relaxed italic mb-10 border-l-4 border-emerald-500 pl-8">
                                    {displayContent?.practice_kit?.description}
                                </p>
                                <div className="bg-black/80 rounded-3xl p-8 border border-white/5 relative group">
                                    <pre className="text-emerald-400 whitespace-pre-wrap font-mono text-sm md:text-lg leading-relaxed">
                                        {displayContent?.practice_kit?.command}
                                    </pre>
                                    <button onClick={handleClaimCommand} className="absolute top-6 right-6 p-3 rounded-xl bg-white/5 text-zinc-400 hover:text-emerald-500 hover:bg-emerald-500/10 transition-all">
                                        {copied ? <Check size={20} /> : <Copy size={20} />}
                                    </button>
                                </div>
                                <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} onClick={handleClaimCommand}
                                    className="w-full mt-10 bg-emerald-500 text-black font-black py-6 rounded-2xl text-xl flex items-center justify-center gap-4 shadow-2xl">
                                    <Copy size={24} /> 領取指令寶箱
                                </motion.button>
                            </div>
                        </motion.div>
                    )}
                </motion.div>
            </section>

            {/* 5. Footer & Navigation */}
            <section className="py-32 px-6 border-t border-white/10">
                <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-center justify-between gap-12">
                    <Link to="/insights" className="text-zinc-500 hover:text-white font-black text-sm uppercase tracking-widest flex items-center gap-3 transition-all">
                        <ArrowLeft size={16} /> 返回冒險地圖
                    </Link>
                    {nextArticle && (
                        <Link to={`/insights/${nextArticle.id}`} className="group bg-white/5 border border-white/10 p-8 rounded-[2.5rem] flex-1 w-full hover:bg-white/10 transition-all text-left">
                            <span className="text-emerald-500 font-black text-[10px] uppercase tracking-widest block mb-4">下一篇修煉</span>
                            <h3 className="text-2xl md:text-3xl font-black text-white mb-2 tracking-tighter group-hover:text-emerald-400 transition-colors">{nextArticle.title}</h3>
                            <p className="text-zinc-500 line-clamp-1">{nextArticle.summary}</p>
                        </Link>
                    )}
                </div>
            </section>

            <AnimatePresence>
                {showAiJumpModal && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[110] flex items-center justify-center px-6 bg-black/90 backdrop-blur-xl">
                        <motion.div initial={{ scale: 0.85, y: 30, opacity: 0 }} animate={{ scale: 1, y: 0, opacity: 1 }} exit={{ scale: 0.85, y: 30, opacity: 0 }} 
                            className="bg-zinc-900 border border-white/20 p-8 md:p-12 rounded-[3.5rem] max-w-md w-full shadow-2xl relative overflow-hidden">
                            
                            <div className="text-center mb-10">
                                <div className="w-20 h-20 bg-emerald-500 text-black rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-[0_0_40px_rgba(16,185,129,0.4)]">
                                    <Check size={40} strokeWidth={3} />
                                </div>
                                <h3 className="text-3xl font-black text-white mb-2 tracking-tighter">指令已複製！</h3>
                                <p className="text-zinc-500 font-bold">請選擇要開啟的 AI 平台進行實戰</p>
                            </div>

                            <div className="grid grid-cols-3 gap-4">
                                {[
                                    { name: 'GPT', logo: ChatGPTLogo, web: 'https://chat.openai.com', color: 'hover:border-[#10a37f]' },
                                    { name: 'Claude', logo: ClaudeLogo, web: 'https://claude.ai', color: 'hover:border-[#D97757]' },
                                    { name: 'Gemini', logo: GeminiLogo, web: 'https://gemini.google.com', color: 'hover:border-[#1C7DEB]' }
                                ].map((ai, i) => (
                                    <a key={i} href={ai.web} target="_blank" rel="noopener noreferrer" onClick={() => setShowAiJumpModal(false)}
                                        className={`flex flex-col items-center justify-center aspect-square rounded-[2rem] bg-white/5 border border-white/5 transition-all group ${ai.color}`}>
                                        <ai.logo size={40} className="mb-4 group-hover:scale-110 transition-transform" />
                                        <span className="text-white font-black text-xs uppercase tracking-tighter">{ai.name}</span>
                                    </a>
                                ))}
                            </div>

                            <button onClick={() => setShowAiJumpModal(false)} className="w-full mt-10 py-4 text-zinc-600 hover:text-white font-black uppercase tracking-widest text-sm transition-colors">暫不跳轉</button>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default ArticleDetail;
