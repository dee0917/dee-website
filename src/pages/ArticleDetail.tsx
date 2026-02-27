import React, { useState, useEffect, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, ArrowRight, Copy, Check, ChevronDown, Lock, Sparkles, MousePointer2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import { api } from '../lib/supabase';
import { INSIGHTS } from '../data/mock';
import SEO from '../components/ui/SEO';

const fadeUp = {
    initial: { opacity: 0, y: 40 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: "-60px" },
    transition: { duration: 0.5, ease: "easeOut" }
};

const ArticleDetail = () => {
    const { id } = useParams();
    const [article, setArticle] = useState<any | null>(null);
    const [loading, setLoading] = useState(true);
    const [copied, setCopied] = useState(false);
    const [progress, setProgress] = useState(0);
    const [currentStep, setCurrentStep] = useState(0);
    const [stepsCompleted, setStepsCompleted] = useState<boolean[]>([]);
    const [quizAnswer, setQuizAnswer] = useState<number | null>(null);
    const [quizSubmitted, setQuizSubmitted] = useState(false);
    const [badgeEarned, setBadgeEarned] = useState(false);
    const [isTreasureUnlocking, setIsTreasureUnlocking] = useState(false);
    
    // Refs for auto-scrolling
    const stepRefs = useRef<(HTMLDivElement | null)[]>([]);
    const treasureRef = useRef<HTMLDivElement>(null);
    const quizRef = useRef<HTMLDivElement>(null);
    const rewardRef = useRef<HTMLDivElement>(null);

    const getColorClasses = (themeColor: string) => {
        const colors: Record<string, any> = {
            emerald: { text: 'text-emerald-500', lightText: 'text-emerald-400', bg: 'bg-emerald-500/10', border: 'border-emerald-500/20', gradient: 'from-emerald-500/20 to-teal-500/10', glow: 'shadow-emerald-500/20', solid: 'bg-emerald-500' },
            yellow: { text: 'text-yellow-500', lightText: 'text-yellow-400', bg: 'bg-yellow-500/10', border: 'border-yellow-500/20', gradient: 'from-yellow-500/10 to-orange-500/10', glow: 'shadow-yellow-500/20', solid: 'bg-yellow-500' },
            amber: { text: 'text-amber-500', lightText: 'text-amber-400', bg: 'bg-amber-500/10', border: 'border-amber-500/20', gradient: 'from-amber-500/20 to-yellow-500/10', glow: 'shadow-amber-500/20', solid: 'bg-amber-500' },
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
            setStepsCompleted(new Array(article.steps.length).fill(false));
            setCurrentStep(0);
            stepRefs.current = new Array(article.steps.length).fill(null);
        }
        setQuizAnswer(null);
        setQuizSubmitted(false);
        setBadgeEarned(false);
        setCopied(false);
        setIsTreasureUnlocking(false);
    }, [article?.id, article?.steps?.length]);

    const fetchArticle = async (articleId: number) => {
        setLoading(true);
        const localArticle = INSIGHTS.find(i => i.id === articleId);
        const dbData = await api.getInsightById(articleId);
        if (localArticle) setArticle({ ...dbData, ...localArticle });
        else if (dbData) setArticle(dbData);
        else setArticle(null);
        setLoading(false);
    };

    const handleCopy = (text: string) => {
        navigator.clipboard.writeText(text);
        setCopied(true);
        confetti({ particleCount: 60, spread: 50, origin: { y: 0.7 }, colors: ['#ffffff', '#10b981'] });
        setTimeout(() => setCopied(false), 3000);
    };

    const handleStepComplete = (idx: number) => {
        const updated = [...stepsCompleted];
        updated[idx] = true;
        setStepsCompleted(updated);
        
        if (idx < (article?.steps?.length || 0) - 1) {
            const nextIdx = idx + 1;
            setCurrentStep(nextIdx);
            // 延遲滾動，確保 UI 已更新
            setTimeout(() => {
                stepRefs.current[nextIdx]?.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }, 100);
        } else {
            // 所有步驟完成
            setIsTreasureUnlocking(true);
            setTimeout(() => {
                treasureRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
                setTimeout(() => {
                    confetti({ 
                        particleCount: 200, 
                        spread: 100, 
                        origin: { y: 0.6 },
                        colors: ['#fbbf24', '#f59e0b', '#10b981', '#ffffff'] 
                    });
                }, 500);
            }, 800);
        }
    };

    const handleQuizSubmit = () => {
        if (quizAnswer === null) return;
        setQuizSubmitted(true);
        if (quizAnswer === article?.quiz?.answer) {
            confetti({ particleCount: 120, spread: 80, origin: { y: 0.6 } });
            // 答對後滾動到獎勵區
            setTimeout(() => {
                rewardRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }, 1500);
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
            const savedLevel = localStorage.getItem('dee_ai_level');
            const currentLevel = savedLevel ? parseInt(savedLevel) : 1;
            if (article.level >= currentLevel) {
                localStorage.setItem('dee_ai_level', (article.level + 1).toString());
            }
        }
        confetti({ particleCount: 200, spread: 100, origin: { y: 0.5 }, colors: ['#fbbf24', '#f59e0b', '#d97706'] });
    };

    if (loading) return <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center text-white font-mono text-sm tracking-widest animate-pulse">INIT_REVOLUTION_SYSTEM...</div>;
    if (!article) return <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center text-white font-bold">404: CONTENT_DELETED</div>;

    const theme = getColorClasses(article.themeColor || article.theme_color || 'emerald');
    const isNews = article.category === 'AI 新聞';
    const nextArticle = INSIGHTS.find(i => i.id !== article.id && i.difficulty_level >= (article.difficulty_level || 1)) || INSIGHTS[0];
    const hasSteps = article.steps && article.steps.length > 0;
    const hasQuiz = article.quiz;
    const allStepsDone = stepsCompleted.length > 0 && stepsCompleted.every(Boolean);

    return (
        <motion.div 
            animate={isTreasureUnlocking && !allStepsDone ? { x: [-3, 3, -3, 3, 0], y: [-2, 2, -2, 2, 0] } : {}}
            transition={{ duration: 0.1, repeat: 10 }}
            className="overflow-x-hidden"
        >
            {/* 📊 進度條 - 更加顯眼 */}
            <motion.div
                className="fixed top-20 left-0 right-0 h-1.5 z-50 origin-left"
                style={{ scaleX: progress, background: 'linear-gradient(90deg, #333, #10b981, #34d399)' }}
            />

            {/* ═══════════ SECTION 1: THE HOOK ═══════════ */}
            <section className="min-h-[90vh] flex flex-col justify-center items-center px-6 pt-32 pb-12 relative text-center">
                <SEO title={article.title} description={article.summary || article.pain_point || ''} path={`/insights/${article.id}`} />
                <Link to={isNews ? "/news" : "/insights"} className="absolute top-24 left-6 inline-flex items-center gap-2 text-zinc-500 hover:text-white transition-all text-xs font-black uppercase tracking-widest z-10">
                    <ArrowLeft size={16} strokeWidth={3} /> 返回列表
                </Link>
                <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.8 }} className="max-w-3xl mx-auto">
                    <span className={`${theme.text} text-xs md:text-sm font-black uppercase tracking-[0.5em] mb-6 block drop-shadow-glow`}>{article.category} · {article.readTime}</span>
                    <h1 className="text-4xl md:text-7xl font-black text-white leading-[1.1] mb-12 tracking-tight font-serif">{article.title}</h1>
                    {article.pain_point && (
                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5, duration: 0.8 }}>
                             <span className="transition-label">目前的困擾</span>
                             <p className="text-xl md:text-3xl text-zinc-400 leading-relaxed max-w-2xl mx-auto font-light">
                                {article.pain_point}
                             </p>
                        </motion.div>
                    )}
                </motion.div>
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.2 }} className="absolute bottom-10 flex flex-col items-center gap-4 text-zinc-700">
                    <span className="text-xs font-black uppercase tracking-[0.4em]">開始進化</span>
                    <motion.div animate={{ y: [0, 10, 0] }} transition={{ repeat: Infinity, duration: 2 }}><ChevronDown size={32} strokeWidth={3} /></motion.div>
                </motion.div>
            </section>

            {/* ═══════════ SECTION 2: THE MAGIC ═══════════ */}
            {!isNews && article.example && (
                <section className="min-h-[70vh] flex flex-col justify-center items-center px-5 md:px-6 py-20 text-left bg-white/[0.01]">
                    <motion.div {...fadeUp} className="max-w-4xl mx-auto w-full">
                        <div className="text-center mb-16">
                            <span className="transition-label">奇蹟展示</span>
                            <h2 className="text-3xl md:text-5xl font-black text-white text-center justify-center">為什麼你一定要學？</h2>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10">
                            <motion.div initial={{ opacity: 0, x: -40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="bg-red-500/5 border-2 border-red-500/10 rounded-[2.5rem] p-10 md:p-12 relative overflow-hidden group">
                                <div className="text-red-500/10 text-9xl font-black absolute -right-4 -bottom-4 rotate-12 group-hover:scale-110 transition-transform">❌</div>
                                <span className="text-red-400 font-black text-xs md:text-sm block mb-4 uppercase tracking-[0.3em]">BEFORE / 以前的你</span>
                                <p className="text-zinc-400 text-lg md:text-2xl leading-relaxed relative z-10">{article.example.wrong}</p>
                            </motion.div>
                            <motion.div initial={{ opacity: 0, x: 40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }} className="bg-emerald-500/5 border-2 border-emerald-500/20 rounded-[2.5rem] p-10 md:p-12 relative overflow-hidden group shadow-[0_0_50px_rgba(16,185,129,0.05)]">
                                <div className="text-emerald-500/10 text-9xl font-black absolute -right-4 -bottom-4 -rotate-12 group-hover:scale-110 transition-transform">✅</div>
                                <span className="text-emerald-400 font-black text-xs md:text-sm block mb-4 uppercase tracking-[0.3em]">AFTER / 現在的你</span>
                                <p className="text-white text-lg md:text-2xl leading-relaxed font-bold relative z-10">{article.example.right}</p>
                            </motion.div>
                        </div>
                    </motion.div>
                </section>
            )}

            {/* ═══════════ SECTION 3: THE QUEST ═══════════ */}
            {hasSteps && (
                <section className="py-24 px-5 md:px-6 text-left max-w-4xl mx-auto">
                    <div className="text-center mb-16">
                        <span className="transition-label">實戰演練</span>
                        <h2 className="text-3xl md:text-5xl font-black text-white text-center justify-center">一步一步跟著做</h2>
                    </div>
                    <div className="space-y-10">
                        {article.steps.map((step: any, idx: number) => {
                            const isActive = idx <= currentStep;
                            const isDone = stepsCompleted[idx];
                            const isCurrentTask = idx === currentStep && !isDone;

                            return (
                                <motion.div
                                    key={idx} ref={el => stepRefs.current[idx] = el}
                                    initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                                    className={`relative rounded-[2.5rem] border-2 p-8 md:p-12 transition-all duration-700 ${isDone ? 'bg-white/[0.03] border-emerald-500/40 shadow-[0_0_60px_rgba(16,185,129,0.1)]' : isActive ? 'bg-white/5 border-white/10 shadow-xl' : 'bg-white/[0.01] border-white/5 opacity-20'}`}
                                >
                                    <div className="flex flex-col md:flex-row items-start gap-8">
                                        <div className={`w-16 h-16 rounded-2xl flex items-center justify-center flex-shrink-0 text-2xl font-black transition-all duration-500 ${isDone ? 'bg-emerald-500 text-black' : isActive ? 'bg-white text-black' : 'bg-white/5 text-zinc-700'}`}>
                                            {isDone ? '✓' : idx + 1}
                                        </div>
                                        <div className="flex-1">
                                            <h3 className={`text-2xl md:text-3xl font-black mb-4 ${isDone ? 'text-emerald-400' : 'text-white'}`}>{step.title}</h3>
                                            <p className="text-zinc-300 text-lg md:text-xl leading-relaxed mb-8">{step.body}</p>
                                            {step.dee_tip && (
                                                <div className="bg-emerald-500/10 border-l-4 border-emerald-500 p-6 rounded-r-2xl mb-8">
                                                    <p className="text-emerald-400 text-base md:text-lg italic font-medium leading-relaxed">💡 Dee's Tip: {step.dee_tip}</p>
                                                </div>
                                            )}
                                            {isCurrentTask && (
                                                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-col items-start gap-4">
                                                    <motion.button
                                                        whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
                                                        onClick={() => handleStepComplete(idx)}
                                                        className="relative group py-5 px-10 rounded-2xl bg-emerald-500 text-black font-black text-xl shadow-[0_10px_30px_rgba(16,185,129,0.3)] transition-all overflow-hidden btn-glow"
                                                    >
                                                        <span className="relative z-10 flex items-center gap-3">
                                                            我了解了，下一步 <MousePointer2 size={24} className="animate-bounce" />
                                                        </span>
                                                        <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity" />
                                                    </motion.button>
                                                    <span className="text-emerald-500/60 text-xs font-black uppercase tracking-widest animate-pulse ml-2">點擊按鈕以解鎖下一章節</span>
                                                </motion.div>
                                            )}
                                        </div>
                                    </div>
                                </motion.div>
                            );
                        })}
                    </div>
                </section>
            )}

            {/* ═══════════ SECTION 4: THE TREASURE ═══════════ */}
            {!isNews && article.practice_kit && (
                <section className="py-32 px-5 md:px-6 scroll-mt-32 text-left" ref={treasureRef}>
                    <AnimatePresence>
                        {allStepsDone ? (
                            <motion.div
                                key="treasure-chest"
                                initial={{ opacity: 0, scale: 0.2, y: -300, rotate: -30 }}
                                animate={{ opacity: 1, scale: 1, y: 0, rotate: 0 }}
                                transition={{ type: "spring", stiffness: 450, damping: 12, mass: 1.8 }}
                                className="max-w-3xl mx-auto relative"
                            >
                                <div className="absolute -inset-20 bg-emerald-500/10 blur-[120px] rounded-full animate-pulse" />
                                <div className="text-center mb-10 relative z-10">
                                     <span className="transition-label !bg-white !text-black !border-white !animate-none px-8 py-3">🎉 恭喜！修煉完成</span>
                                     <h2 className="text-4xl md:text-6xl font-black text-white mt-6 drop-shadow-glow">領取你的指令寶物</h2>
                                </div>
                                <div className={`bg-zinc-950 border-4 ${theme.border} rounded-[3rem] p-8 md:p-16 relative overflow-hidden shadow-[0_0_80px_rgba(16,185,129,0.3)] border-emerald-500/50 z-10`}>
                                    <div className="relative z-10">
                                        <div className="flex items-center gap-6 mb-10">
                                            <motion.div animate={{ scale: [1, 1.2, 1], rotate: [0, -10, 10, -10, 10, 0] }} transition={{ duration: 1, repeat: Infinity, repeatDelay: 2 }} className="w-20 h-20 bg-emerald-500/20 rounded-[2rem] flex items-center justify-center text-5xl">🎁</motion.div>
                                            <div>
                                                <h3 className="text-3xl md:text-4xl font-black text-white mb-2">{article.practice_kit.title}</h3>
                                                <p className="text-zinc-400 text-lg font-medium">{article.practice_kit.description}</p>
                                            </div>
                                        </div>
                                        <div className="relative group mb-10">
                                            <div className="absolute -inset-2 bg-emerald-500/20 rounded-3xl blur opacity-30 group-hover:opacity-60 transition duration-1000" />
                                            <div className="relative bg-black/90 backdrop-blur-3xl border-2 border-white/10 rounded-[2rem] p-8 md:p-12 font-mono text-base md:text-xl leading-[1.8] text-emerald-300 whitespace-pre-wrap shadow-inner overflow-x-auto">
                                                {article.practice_kit.command}
                                            </div>
                                        </div>
                                        <motion.button
                                            whileHover={{ scale: 1.05, y: -5 }} whileTap={{ scale: 0.95 }}
                                            onClick={() => handleCopy(article.practice_kit.command)}
                                            className={`w-full flex items-center justify-center gap-4 py-8 rounded-[2rem] font-black text-2xl transition-all ${copied ? 'bg-white text-black' : 'bg-emerald-500 text-black shadow-[0_20px_40px_rgba(16,185,129,0.4)]'}`}
                                        >
                                            {copied ? <><Check size={32} strokeWidth={4} /> 已複製到剪貼簿</> : <><Copy size={32} strokeWidth={3} /> 一鍵領取指令寶物</>}
                                        </motion.button>
                                    </div>
                                </div>
                            </motion.div>
                        ) : (
                            <div className="max-w-3xl mx-auto py-32 border-4 border-dashed border-white/5 rounded-[4rem] flex flex-col items-center justify-center text-zinc-800">
                                <motion.div animate={{ y: [0, -15, 0] }} transition={{ repeat: Infinity, duration: 2.5 }}><Lock size={100} className="mb-8 opacity-5" /></motion.div>
                                <p className="text-lg font-black uppercase tracking-[0.6em] opacity-10">完成所有步驟以召喚寶物</p>
                            </div>
                        )}
                    </AnimatePresence>
                </section>
            )}

            {/* ═══════════ SECTION 5: THE BOSS BATTLE ═══════════ */}
            {hasQuiz && (
                <section className="py-24 px-5 md:px-6 bg-white/[0.01]" ref={quizRef}>
                    <motion.div {...fadeUp} className="max-w-3xl mx-auto">
                        <div className="text-center mb-16">
                            <span className="transition-label !bg-amber-500/10 !text-amber-500 !border-amber-500/20">最終考核</span>
                            <h2 className="text-3xl md:text-5xl font-black text-white mt-6 drop-shadow-glow text-center justify-center">你真的學會了嗎？</h2>
                        </div>
                        <div className="bg-zinc-900 border-2 border-white/10 rounded-[3rem] p-8 md:p-16 shadow-2xl relative overflow-hidden">
                            <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-amber-500 to-yellow-500" />
                            <p className="text-white font-black text-xl md:text-3xl mb-12 leading-tight">{article.quiz.question}</p>
                            <div className="space-y-5 mb-12">
                                {article.quiz.options.map((opt: string, idx: number) => {
                                    const isSelected = quizAnswer === idx;
                                    const isCorrect = idx === article.quiz.answer;
                                    const showResult = quizSubmitted;
                                    return (
                                        <motion.button
                                            key={idx} whileTap={!quizSubmitted ? { scale: 0.98 } : {}} onClick={() => !quizSubmitted && setQuizAnswer(idx)}
                                            className={`w-full text-left p-6 md:p-8 rounded-3xl border-2 transition-all text-lg md:text-xl font-bold ${showResult && isCorrect ? 'bg-emerald-500/10 border-emerald-500/50 text-emerald-400' : showResult && isSelected && !isCorrect ? 'bg-red-500/10 border-red-500/50 text-red-400' : isSelected ? 'bg-white/10 border-white/30 text-white shadow-lg' : 'bg-white/[0.02] border-white/5 text-zinc-500 hover:bg-white/5'}`}
                                            disabled={quizSubmitted}
                                        >
                                            <span className="font-mono text-sm mr-6 opacity-30">{String.fromCharCode(65 + idx)}</span>
                                            {opt}
                                        </motion.button>
                                    );
                                })}
                            </div>
                            {!quizSubmitted ? (
                                <motion.button
                                    whileTap={{ scale: 0.95 }} onClick={handleQuizSubmit} disabled={quizAnswer === null}
                                    className={`w-full py-6 md:py-8 rounded-3xl font-black text-2xl transition-all ${quizAnswer !== null ? 'bg-white text-black shadow-2xl' : 'bg-white/5 text-zinc-800 cursor-not-allowed'}`}
                                >
                                    提交答案
                                </motion.button>
                            ) : (
                                <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className={`mt-8 p-8 rounded-3xl border-2 ${quizAnswer === article.quiz.answer ? 'bg-emerald-500/10 border-emerald-500/20' : 'bg-amber-500/10 border-amber-500/20'}`}>
                                    <p className={`text-xl md:text-2xl font-black mb-4 ${quizAnswer === article.quiz.answer ? 'text-emerald-400' : 'text-amber-400'}`}>{quizAnswer === article.quiz.answer ? '🎉 完美答對！你已經具備大師潛力' : '💡 差一點點！再思考看看'}</p>
                                    <p className="text-zinc-400 text-lg md:text-xl leading-relaxed font-medium">{article.quiz.explanation}</p>
                                </motion.div>
                            )}
                        </div>
                    </motion.div>
                </section>
            )}

            {/* ═══════════ SECTION 6: THE REWARD ═══════════ */}
            <section className="py-32 px-5 md:px-6 text-center" ref={rewardRef}>
                <motion.div {...fadeUp} className="max-w-md mx-auto text-center">
                    {!badgeEarned ? (
                        <motion.button
                            whileTap={{ scale: 0.95 }} onClick={handleEarnBadge} disabled={!allStepsDone || (hasQuiz && !quizSubmitted)}
                            className={`bg-emerald-500 text-black font-black py-8 px-16 rounded-[2.5rem] text-2xl shadow-[0_30px_60px_rgba(16,185,129,0.3)] hover:scale-110 transition-all disabled:opacity-20 disabled:grayscale btn-glow`}
                        >
                            🏆 領取學習勳章
                        </motion.button>
                    ) : (
                        <motion.div initial={{ opacity: 0, scale: 0.5 }} animate={{ opacity: 1, scale: 1 }} transition={{ type: "spring", damping: 10 }}>
                            <div className="inline-block bg-zinc-900 border-4 border-emerald-500/40 rounded-[4rem] p-12 md:p-20 shadow-2xl relative overflow-hidden">
                                <div className="absolute top-0 left-0 w-full h-3 bg-emerald-500" />
                                <motion.p animate={{ scale: [1, 1.2, 1], rotate: [0, -10, 10, 0] }} transition={{ duration: 2.5, repeat: Infinity }} className="text-8xl md:text-9xl mb-10 drop-shadow-glow">🏆</motion.p>
                                <p className="text-emerald-500 font-black text-base tracking-[0.6em] mb-4 uppercase">Achievement Unlocked</p>
                                <p className="text-white text-3xl md:text-5xl font-black mb-12 leading-tight tracking-tighter">{article.skill_badge || article.title}</p>
                                <div className="pt-10 border-t border-white/10 flex flex-col items-center gap-6">
                                    <p className="text-zinc-600 text-xs md:text-sm uppercase tracking-[0.5em] font-black">Dee's AI Life Lab · 2026</p>
                                    <div className="flex gap-4">
                                        <div className="w-3 h-3 rounded-full bg-emerald-500 animate-pulse" />
                                        <div className="w-3 h-3 rounded-full bg-emerald-500/50" />
                                        <div className="w-3 h-3 rounded-full bg-emerald-500/20" />
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    )}
                </motion.div>
            </section>

            {/* 下一篇 */}
            <section className="pb-40 px-5 md:px-6 text-left">
                <div className="max-w-4xl mx-auto border-t-2 border-white/5 pt-24">
                    <p className="text-zinc-600 text-xs md:text-sm font-black uppercase tracking-[0.5em] mb-12">下一場進化挑戰 →</p>
                    <Link to={`/insights/${nextArticle.id}`} className="group block bg-white/[0.03] border-2 border-white/5 hover:border-emerald-500/40 p-12 md:p-20 rounded-[3.5rem] transition-all shadow-2xl hover:shadow-emerald-500/20 hover:-translate-y-3">
                        <div className="flex items-center justify-between gap-10">
                            <div>
                                <span className="text-emerald-500/60 font-black text-xs md:text-sm uppercase tracking-[0.4em] mb-6 block">Next Level Evolution</span>
                                <h3 className="text-3xl md:text-5xl font-black text-white group-hover:text-emerald-400 transition-colors leading-[1.2] tracking-tighter">{nextArticle.title}</h3>
                            </div>
                            <ArrowRight className="text-zinc-800 group-hover:text-emerald-400 group-hover:translate-x-6 transition-all flex-shrink-0" size={60} strokeWidth={4} />
                        </div>
                    </Link>
                </div>
            </section>
        </motion.div>
    );
};
export default ArticleDetail;
