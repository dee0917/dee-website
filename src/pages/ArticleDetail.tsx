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

const XIcon = ({ size, className }: any) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <line x1="18" y1="6" x2="6" y2="18"></line>
        <line x1="6" y1="6" x2="18" y2="18"></line>
    </svg>
);

const StarIcon = ({ size, className, fill }: any) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill={fill} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
    </svg>
);

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
    const [rippleStep, setRippleStep] = useState<number | null>(null);
    const [showAiJumpModal, setShowAiJumpModal] = useState(false);
    
    const stepRefs = useRef<(HTMLDivElement | null)[]>([]);
    const treasureRef = useRef<HTMLDivElement>(null);
    const quizRef = useRef<HTMLDivElement>(null);
    const rewardRef = useRef<HTMLDivElement>(null);
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
            teal: { text: 'text-teal-500', lightText: 'text-teal-400', bg: 'bg-teal-500/10', border: 'border-teal-500/20', gradient: 'from-teal-500/20 to-cyan-500/10', glow: 'shadow-teal-500/20', solid: 'bg-teal-500' },
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
        setRippleStep(idx);
        setTimeout(() => setRippleStep(null), 800);
        
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
            setQuizStars(true);
            setTimeout(() => setQuizStars(false), 1500);
            setTimeout(() => {
                rewardRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }, 1000);
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
            const currentChapter = CHAPTERS.find(c => c.articleIds.includes(article.id));
            if (currentChapter) {
                const chapterArticles = currentChapter.articleIds;
                const allChapterDone = chapterArticles.every((id: number) => completed.includes(id));
                if (allChapterDone) {
                    const nextChapterId = currentChapter.id + 1;
                    const savedLevel = localStorage.getItem('dee_ai_level');
                    const currentLevel = savedLevel ? parseInt(savedLevel) : 1;
                    if (nextChapterId > currentLevel) {
                        localStorage.setItem('dee_ai_level', nextChapterId.toString());
                    }
                }
            }
        }
        setBadgeGlow(true);
        setTimeout(() => setBadgeGlow(false), 3000);
    };

    const [quizStars, setQuizStars] = useState(false);
    const [badgeGlow, setBadgeGlow] = useState(false);

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
    const isFinale = isMainQuest && mainIndex === MAIN_QUEST_ORDER.length - 1;

    let nextLabelText = "下一篇教學";
    if (nextArticle && nextArticle.id) {
        const nextChapter = CHAPTERS.find(c => c.articleIds.includes(nextArticle.id));
        const currentChapter = CHAPTERS.find(c => c.articleIds.includes(article.id));
        if (nextChapter && currentChapter && nextChapter.id > currentChapter.id) {
            nextLabelText = `🎉 進入新章節：${nextChapter.title}`;
        }
    }

    return (
        <div className="min-h-screen bg-[#0a0a0a] text-zinc-300 selection:bg-emerald-500/30">
            <SEO title={article.title} description={article.summary} path={`/insights/${article.id}`} />
            <div className="fixed top-0 left-0 w-full h-1 z-[60] bg-white/5">
                <motion.div className="h-full bg-emerald-500" style={{ width: `${progress * 100}%` }} />
            </div>

            <section className="relative min-h-screen flex flex-col items-center justify-center px-6 overflow-hidden border-b border-white/5">
                <div className={`absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-gradient-to-b ${theme.gradient} opacity-20 pointer-events-none`} />
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10 pointer-events-none" />
                
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-4xl w-full text-center relative z-10 pt-32">
                    <Link to="/insights" className="inline-flex items-center gap-2 text-zinc-500 hover:text-white transition-colors mb-4 group text-[10px] font-black uppercase tracking-widest">
                        <ArrowLeft size={12} className="group-hover:-translate-x-1 transition-transform" /> Back
                    </Link>
                    <div className="flex items-center justify-center gap-3 mb-4">
                        <span className={`text-[10px] font-black px-2 py-0.5 rounded-full uppercase tracking-widest ${theme.bg} ${theme.text} border ${theme.border}`}>{article.category}</span>
                        <div className="flex gap-1">{[...Array(5)].map((_, i) => <StarIcon key={i} size={8} className={i < (article.difficulty_level || 1) ? theme.text : 'text-zinc-800'} fill="currentColor" />)}</div>
                    </div>
                    <h1 className="text-3xl md:text-7xl font-black text-white mb-4 tracking-tighter leading-[1.1]">{article.title}</h1>
                    <p className="text-lg md:text-2xl text-zinc-400 mb-8 max-w-2xl mx-auto leading-relaxed font-medium">{article.summary}</p>
                    <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={scrollToHook}
                        className="bg-white text-black font-black py-4 px-10 rounded-2xl text-lg flex items-center gap-3 mx-auto shadow-2xl hover:bg-emerald-500 transition-colors group">
                        <Gamepad2 size={24} /> 開始修煉 <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                    </motion.button>
                </motion.div>

                <motion.div 
                    animate={{ y: [0, 10, 0], opacity: [0.2, 0.5, 0.2] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="absolute bottom-10 left-1/2 -translate-x-1/2 text-zinc-500"
                >
                    <ChevronDown size={32} />
                </motion.div>
            </section>

            <section className="py-4 px-5 md:px-6 bg-zinc-900/30" ref={hookRef}>
                <motion.div {...fadeUp} className="max-w-4xl mx-auto text-left mb-4 mt-2">
                    <span className="transition-label">痛點切入</span>
                    <h2 className="text-2xl md:text-5xl font-black text-white mb-4 tracking-tighter">你也正為了這件事煩惱嗎？</h2>
                    <p className="text-xl md:text-3xl text-white/90 leading-relaxed border-l-4 border-emerald-500 pl-6 italic font-medium">
                        {displayContent?.pain_point}
                    </p>
                </motion.div>

                <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-3 mb-2">
                    <motion.div {...fadeUp} className="bg-white/[0.02] border border-white/5 rounded-[2rem] p-5 md:p-6 relative overflow-hidden group">
                        <div className="text-white/5 text-6xl font-black absolute -right-4 -bottom-4 rotate-12">❌</div>
                        <span className="text-zinc-600 font-black text-[10px] block mb-2 uppercase tracking-[0.3em]">過去的你</span>
                        <p className="text-zinc-400 text-base md:text-xl leading-relaxed relative z-10">{displayContent?.example?.wrong}</p>
                    </motion.div>
                    <motion.div {...fadeUp} transition={{ delay: 0.1 }} className="bg-emerald-500/[0.03] border border-emerald-500/20 rounded-[2rem] p-5 md:p-6 relative overflow-hidden group shadow-[0_0_50px_rgba(16,185,129,0.05)]">
                        <div className="text-emerald-500/10 text-7xl font-black absolute -right-4 -bottom-4 -rotate-12">✅</div>
                        <span className="text-emerald-400 font-black text-[10px] block mb-2 uppercase tracking-[0.3em]">現在的你</span>
                        <p className="text-white text-base md:text-xl leading-relaxed font-bold relative z-10">{displayContent?.example?.right}</p>
                    </motion.div>
                </div>
            </section>

            {hasSteps && (
                <section className="py-4 px-5 md:px-6 text-left max-w-4xl mx-auto border-t border-white/5">
                    <div className="text-left mb-4 mt-2">
                        <span className="transition-label">實戰演練</span>
                        <h2 className="text-2xl md:text-5xl font-black text-white tracking-tighter">一步一步跟著做</h2>
                    </div>
                    <div className="space-y-3 mb-2">
                        {article.steps.map((step: any, idx: number) => {
                            const isDone = stepsCompleted[idx];
                            const isActive = idx === currentStep;
                            const isFuture = idx > currentStep;
                            return (
                                <motion.div key={idx} ref={el => stepRefs.current[idx] = el}
                                    initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                                    className={`relative rounded-[2rem] border p-5 md:p-8 transition-all duration-500 overflow-hidden ${isDone ? 'bg-white/[0.01] border-emerald-500/20' : isActive ? 'bg-zinc-900 border-white/20 shadow-2xl scale-[1.01]' : 'border-white/5 opacity-10 pointer-events-none'}`}>
                                    <div className="flex flex-col md:flex-row items-start gap-6">
                                        <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 text-lg font-black transition-all duration-500 ${isDone ? 'bg-emerald-500 text-black' : isActive ? 'bg-white text-black' : 'bg-white/5 text-zinc-700'}`}>
                                            {isDone ? '✓' : idx + 1}
                                        </div>
                                        <div className="flex-1">
                                            <h3 className={`text-xl md:text-4xl font-black mb-3 tracking-tighter ${isDone ? 'text-emerald-400' : 'text-white'}`}>{step.title}</h3>
                                            <p className="text-base md:text-xl text-zinc-300 leading-[1.6] font-medium">{step.body}</p>
                                            {step.external_links && step.external_links.length > 0 && (
                                                <div className="flex flex-wrap gap-2 mt-4 mb-4">
                                                    {step.external_links.map((link: any, lidx: number) => (
                                                        <a key={lidx} href={link.url} target="_blank" rel="noopener noreferrer"
                                                            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-white/10 border border-white/10 text-white text-xs font-bold hover:bg-white/20 transition-all">
                                                            {link.label} <ArrowRight size={12} />
                                                        </a>
                                                    ))}
                                                </div>
                                            )}
                                            {step.dee_tip && (
                                                <div className="bg-emerald-500/5 border-l-4 border-emerald-500 p-4 rounded-r-2xl mt-4 mb-4">
                                                    <p className="text-emerald-400 text-base md:text-xl italic font-black leading-relaxed">💡 Dee's Tip: {step.dee_tip}</p>
                                                </div>
                                            )}
                                            {isActive && !isDone && (
                                                <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} onClick={() => handleStepComplete(idx)}
                                                    className="relative group py-3 px-6 rounded-xl bg-emerald-500 text-black font-black text-base shadow-xl transition-all overflow-hidden flex items-center gap-2 mt-4">
                                                    我了解了，下一個 <MousePointer2 size={18} className="animate-bounce" />
                                                </motion.button>
                                            )}
                                        </div>
                                    </div>
                                    {isFuture && (
                                        <div className="absolute inset-0 z-10 bg-black/60 backdrop-blur-[4px] flex items-center justify-center pointer-events-none">
                                            <Lock size={24} className="text-emerald-500/20" />
                                        </div>
                                    )}
                                </motion.div>
                            );
                        })}
                    </div>
                </section>
            )}

            <section className="py-8 px-5 md:px-6 text-center border-t border-white/5 relative overflow-hidden" ref={treasureRef}>
                <div className={`absolute inset-0 bg-gradient-to-b ${theme.gradient} opacity-5 pointer-events-none`} />
                <motion.div {...fadeUp} className="max-w-3xl mx-auto relative z-10">
                    {treasurePhase === 'locked' && (
                        <div className="flex flex-col items-center gap-6 py-4 grayscale opacity-30">
                            <div className="text-6xl">🎁</div>
                            <h2 className="text-lg font-black text-white uppercase tracking-[0.5em]">Treasure Locked</h2>
                        </div>
                    )}
                    {(treasurePhase === 'falling' || treasurePhase === 'impact') && (
                        <motion.div initial={{ y: -300, rotate: -20 }} animate={{ y: 0, rotate: 0 }} transition={{ type: "spring", damping: 12, stiffness: 100 }} className="text-7xl py-4 relative">🎁</motion.div>
                    )}
                    {treasurePhase === 'exploding' && ( <motion.div animate={{ scale: [1, 1.5, 0], opacity: [1, 1, 0] }} transition={{ duration: 0.6 }} className="text-7xl py-4">💥</motion.div> )}
                    {treasurePhase === 'revealed' && (
                        <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}>
                            <div className="bg-zinc-900 border-2 border-emerald-500/30 rounded-[2.5rem] p-6 md:p-8 shadow-2xl relative overflow-hidden mb-4">
                                <div className="absolute top-0 left-0 w-full h-1.5 bg-emerald-500" />
                                <span className="text-emerald-500 font-black text-[9px] tracking-[0.8em] mb-4 block uppercase opacity-60">Ready to execute</span>
                                <h2 className="text-2xl md:text-5xl font-black text-white mb-4 tracking-tighter leading-tight">
                                    {displayContent?.practice_kit?.title}
                                </h2>
                                <p className="text-lg md:text-2xl text-white/90 leading-relaxed border-l-4 border-emerald-500 pl-6 italic font-medium mb-6">
                                    {displayContent?.practice_kit?.description}
                                </p>
                                <div className="bg-black/50 border border-white/5 rounded-2xl p-5 md:p-6 mb-8 text-left">
                                    <pre className="text-zinc-300 text-xs md:text-base whitespace-pre-wrap font-mono leading-relaxed">
                                        {displayContent?.practice_kit?.command}
                                    </pre>
                                </div>
                                <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={handleClaimCommand}
                                    className="bg-emerald-500 text-black font-black py-4 px-8 rounded-2xl text-lg flex items-center gap-3 mx-auto shadow-2xl">
                                    <Copy size={20} /> 領取指令寶箱
                                </motion.button>
                            </div>
                        </motion.div>
                    )}
                </motion.div>
            </section>

            {hasQuiz && (
                <section className="py-8 px-5 md:px-6 bg-zinc-900/20 border-t border-white/5" ref={quizRef}>
                    <motion.div {...fadeUp} className="max-w-4xl mx-auto">
                        <div className="text-left mb-6">
                            <span className="transition-label">終極考驗</span>
                            <h2 className="text-2xl md:text-5xl font-black text-white tracking-tighter">驗收你的修行成果</h2>
                        </div>
                        <div className="bg-zinc-900 border border-white/10 rounded-[2.5rem] p-5 md:p-8 shadow-2xl relative">
                            <p className="text-xl md:text-4xl font-black text-white mb-8 leading-tight tracking-tighter">{article.quiz.question}</p>
                            <div className="space-y-2">
                                {article.quiz.options.map((opt: string, i: number) => (
                                    <motion.button key={i} whileHover={{ x: 5 }} whileTap={{ scale: 0.98 }} disabled={quizSubmitted} onClick={() => setQuizAnswer(i)}
                                        className={`w-full py-4 px-6 rounded-2xl text-left text-base font-bold transition-all border ${quizAnswer === i ? 'border-emerald-500 bg-emerald-500/10 text-white shadow-lg' : 'border-white/5 bg-white/[0.02] text-zinc-400 hover:border-white/20'}`}>
                                        <div className="flex items-center gap-3">
                                            <span className={`w-8 h-8 rounded-lg flex items-center justify-center text-[10px] font-black ${quizAnswer === i ? 'bg-emerald-500 text-black' : 'bg-zinc-800 text-zinc-500'}`}>{String.fromCharCode(65 + i)}</span>
                                            {opt}
                                        </div>
                                    </motion.button>
                                ))}
                            </div>
                            {!quizSubmitted ? (
                                <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={handleQuizSubmit} disabled={quizAnswer === null}
                                    className="w-full mt-6 py-4 rounded-2xl bg-white text-black font-black text-lg shadow-xl disabled:opacity-20 hover:bg-emerald-500 transition-colors">
                                    確認答案
                                </motion.button>
                            ) : (
                                <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className={`mt-6 p-6 rounded-2xl border relative overflow-hidden ${quizAnswer === article.quiz.answer ? 'bg-emerald-500/10 border-emerald-500/20' : 'bg-amber-500/10 border-amber-500/20'}`}>
                                    <p className={`text-xl md:text-3xl font-black mb-3 ${quizAnswer === article.quiz.answer ? 'text-emerald-400' : 'text-amber-400'}`}>{quizAnswer === article.quiz.answer ? '🎉 完美答對！' : '💡 差一點點！'}</p>
                                    <p className="text-zinc-300 text-sm md:text-xl leading-relaxed font-black">{article.quiz.explanation}</p>
                                </motion.div>
                            )}
                        </div>
                    </motion.div>
                </section>
            )}

            <section className="py-12 px-5 md:px-6 text-center" ref={rewardRef}>
                <motion.div {...fadeUp} className="max-w-xl mx-auto">
                    {badgeEarned ? (
                        <motion.div initial={{ opacity: 0, scale: 0.5 }} animate={{ opacity: 1, scale: 1 }} transition={{ type: "spring", damping: 10 }}>
                            <div className="inline-block bg-zinc-900 border-2 border-emerald-500/40 rounded-[2.5rem] p-8 md:p-12 shadow-2xl relative overflow-hidden">
                                <div className="absolute top-0 left-0 w-full h-1.5 bg-emerald-500 shadow-[0_0_30px_rgba(16,185,129,0.4)]" />
                                <motion.p animate={{ scale: [1, 1.1, 1], rotate: [0, -5, 5, 0] }} transition={{ duration: 3, repeat: Infinity }} className="text-7xl mb-6">🏆</motion.p>
                                <p className="text-emerald-500 font-black text-[10px] tracking-[0.8em] mb-4 uppercase opacity-60">Quest Mastered</p>
                                <p className="text-xl md:text-5xl font-black mb-6 tracking-tighter text-white">{article.skill_badge || article.title}</p>
                                <div className="pt-6 border-t border-white/10">
                                    <p className="text-zinc-600 text-[9px] uppercase tracking-[0.6em] font-black">Dee's AI Life Lab · 2026</p>
                                </div>
                            </div>
                        </motion.div>
                    ) : (
                        <motion.button whileTap={{ scale: 0.95 }} onClick={handleEarnBadge} disabled={!allStepsDone || (hasQuiz && !quizSubmitted)}
                            className="bg-emerald-500 text-black font-black py-5 px-10 rounded-2xl text-xl shadow-2xl hover:scale-105 transition-all disabled:opacity-20 disabled:grayscale btn-glow">
                            🏆 領取修行勳章
                        </motion.button>
                    )}
                </motion.div>
            </section>

            <section className="pb-12 px-5 md:px-6">
                <div className="max-w-4xl mx-auto border-t border-white/10 pt-10">
                    {isFinale ? (
                        <motion.div {...fadeUp} className="text-center py-10 bg-emerald-500/5 rounded-[2.5rem] border border-emerald-500/10">
                            <div className="text-6xl mb-6">🎓</div>
                            <h2 className="text-2xl md:text-5xl font-black text-white mb-4 tracking-tight">恭喜大圓滿！</h2>
                            <p className="text-zinc-400 text-base md:text-xl mb-8 max-w-lg mx-auto leading-relaxed font-medium">你已經完成了所有主線任務。</p>
                            <Link to="/insights" className="inline-flex items-center gap-3 bg-emerald-500 text-black font-black py-4 px-8 rounded-2xl text-xl hover:bg-emerald-400 transition-all shadow-2xl">🗺️ 探索更多支線</Link>
                        </motion.div>
                    ) : nextArticle ? (
                        <div className="space-y-4">
                            <span className="text-zinc-500 text-[9px] font-black uppercase tracking-[0.5em] block font-mono">{nextLabelText}</span>
                            <Link to={`/insights/${nextArticle.id}`} className="group block bg-zinc-900 border border-white/5 hover:border-emerald-500/40 p-5 md:p-10 rounded-[2rem] transition-all shadow-2xl hover:-translate-y-1">
                                <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
                                    <div className="min-w-0 flex-1">
                                        <span className="text-emerald-500/60 font-black text-[9px] uppercase tracking-[0.4em] mb-2 block font-mono">{isMainQuest ? `STAGE ${mainIndex + 2} / 12` : 'NEXT LEVEL'}</span>
                                        <h3 className="text-lg md:text-4xl font-black text-white mb-2 tracking-tighter leading-tight group-hover:text-emerald-400 transition-colors truncate">{nextArticle.title}</h3>
                                        <p className="text-zinc-400 text-sm md:text-lg line-clamp-2 font-medium leading-relaxed">{nextArticle.summary}</p>
                                    </div>
                                    <div className="w-10 h-10 md:w-14 md:h-14 rounded-full bg-emerald-500/10 flex items-center justify-center group-hover:bg-emerald-500 group-hover:text-black transition-all flex-shrink-0 shadow-lg border border-emerald-500/20"><ArrowRight size={20} /></div>
                                </div>
                            </Link>
                        </div>
                    ) : (
                        <div className="text-center py-8">
                            <Link to="/insights" className="inline-flex items-center gap-2 text-emerald-500 font-black text-lg hover:underline group">
                                <ArrowLeft size={20} className="group-hover:-translate-x-2 transition-transform" /> 返回冒險地圖
                            </Link>
                        </div>
                    )}
                </div>
            </section>
            
            <AnimatePresence>
                {showAiJumpModal && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[100] flex items-center justify-center px-6 bg-black/90 backdrop-blur-xl">
                        <motion.div initial={{ scale: 0.9, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.9, y: 20 }} className="bg-zinc-900 border border-white/10 p-6 md:p-8 rounded-[2rem] max-w-sm w-full shadow-2xl relative overflow-hidden">
                            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-emerald-500 to-blue-500" />
                            <button onClick={() => setShowAiJumpModal(false)} className="absolute top-4 right-4 text-zinc-500 hover:text-white transition-colors"><XIcon size={20} /></button>
                            <div className="text-center mb-6">
                                <div className="w-12 h-12 bg-emerald-500/10 rounded-xl flex items-center justify-center mx-auto mb-3"><Smartphone className="text-emerald-400" size={24} /></div>
                                <h3 className="text-lg md:text-xl font-black text-white mb-1 tracking-tight">指令已複製！</h3>
                            </div>
                            <div className="flex justify-center gap-3">
                                {[ { name: 'GPT', logo: ChatGPTLogo, app: 'chatgpt://', web: 'https://chat.openai.com', color: 'hover:bg-[#10a37f]/10' }, { name: 'Claude', logo: ClaudeLogo, app: 'claude://', web: 'https://claude.ai', color: 'hover:bg-[#D97757]/10' }, { name: 'Gemini', logo: GeminiLogo, app: 'googlegemini://', web: 'https://gemini.google.com', color: 'hover:bg-[#1C7DEB]/10' } ].map((ai, i) => (
                                    <a key={i} href={ai.web} target="_blank" rel="noopener noreferrer" onClick={(e) => { e.preventDefault(); window.location.href = ai.app; setTimeout(() => { window.open(ai.web, '_blank'); setShowAiJumpModal(false); }, 2500); }} className={`flex flex-col items-center gap-1.5 p-2.5 rounded-xl bg-white/[0.03] border border-white/5 transition-all group flex-1 ${ai.color}`}>
                                        <ai.logo size={24} />
                                        <span className="text-white font-black text-[9px] uppercase tracking-tighter">{ai.name}</span>
                                    </a>
                                ))}
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default ArticleDetail;
