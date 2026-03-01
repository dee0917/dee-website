import React, { useState, useEffect, useRef } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, ArrowRight, Copy, Check, ChevronDown, Lock, Sparkles, MousePointer2, Smartphone, Gamepad2, X, Info, Zap, Coffee, Star as StarIcon } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import { api } from '../lib/supabase';
import { INSIGHTS_LIST, MAIN_QUEST_ORDER, CHAPTERS } from '../data/insights';
import SEO from '../components/ui/SEO';
import { ChatGPTLogo, ClaudeLogo, GeminiLogo } from '../components/AILogos';

const fadeUp = {
    initial: { opacity: 0, y: 30 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: "-60px" },
    transition: { duration: 0.4, ease: "easeOut" }
};

const ArticleDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
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
    const rewardRef = useRef<HTMLDivElement>(null);
    const hookRef = useRef<HTMLDivElement>(null);

    const getColorClasses = (themeColor: string) => {
        const colors: Record<string, any> = {
            emerald: { text: 'text-emerald-500', bg: 'bg-emerald-500/10', border: 'border-emerald-500/20', gradient: 'from-emerald-500/20 to-teal-500/10' },
            amber: { text: 'text-amber-500', bg: 'bg-amber-500/10', border: 'border-amber-500/20', gradient: 'from-amber-500/20 to-yellow-500/10' },
            blue: { text: 'text-blue-500', bg: 'bg-blue-500/10', border: 'border-blue-500/20', gradient: 'from-blue-500/20 to-indigo-500/10' },
            violet: { text: 'text-violet-500', bg: 'bg-violet-500/10', border: 'border-violet-500/20', gradient: 'from-violet-500/20 to-purple-500/10' },
            rose: { text: 'text-rose-500', bg: 'bg-rose-500/10', border: 'border-rose-500/20', gradient: 'from-rose-500/20 to-pink-500/10' },
            teal: { text: 'text-teal-500', bg: 'bg-teal-500/10', border: 'border-teal-500/20', gradient: 'from-teal-500/20 to-cyan-500/10' },
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
            setQuizAnswer(null);
            setQuizSubmitted(false);
            setBadgeEarned(false);
            setCopied(false);
            setShowAiJumpModal(false);
            
            stepRefs.current = new Array(article.steps.length).fill(null);
        }
    }, [article?.id, article?.steps?.length]);

    const fetchArticle = async (articleId: number) => {
        setLoading(true);
        
        // 🚀 關鍵權限校驗：判斷該文章所屬章節是否已解鎖
        const isFree = localStorage.getItem('dee_view_preference') === 'free';
        const savedLevel = localStorage.getItem('dee_ai_level') || '0';
        const currentLevel = parseInt(savedLevel);
        
        const localArticle = INSIGHTS_LIST.find(i => i.id === articleId);
        const articleToProcess = localArticle || await api.getInsightById(articleId);
        
        if (articleToProcess) {
            // 找到該文章所屬章節
            const chapter = CHAPTERS.find(c => c.articleIds.includes(articleToProcess.id));
            if (!isFree && chapter && chapter.id > currentLevel) {
                // 如果是冒險模式且章節未解鎖，強制退回地圖
                navigate('/insights');
                return;
            }
            setArticle(articleToProcess);
        } else {
            navigate('/insights');
        }
        setLoading(false);
    };

    const handleClaimCommand = () => {
        if (article?.practice_kit?.command) {
            navigator.clipboard.writeText(article.practice_kit.command);
            setCopied(true);
            setTimeout(() => setCopied(false), 3000);
            setShowAiJumpModal(true);
        }
    };

    const scrollToHook = () => hookRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });

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
                    const middle = (rect.top + window.pageYOffset) - (window.innerHeight / 2) + (rect.height / 2);
                    window.scrollTo({ top: middle, behavior: 'smooth' });
                }
            }, 100);
        } else {
            setTimeout(() => {
                treasureRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
                setTimeout(() => setTreasurePhase('falling'), 500);
                setTimeout(() => {
                    setTreasurePhase('impact');
                    confetti({ particleCount: 40, spread: 30, origin: { y: 0.6 }, colors: ['#fbbf24', '#f59e0b'] });
                }, 1200);
                setTimeout(() => {
                    setTreasurePhase('exploding');
                    confetti({ particleCount: 200, spread: 100, origin: { y: 0.5 } });
                }, 1800);
                setTimeout(() => setTreasurePhase('revealed'), 2500);
            }, 300);
        }
    };

    const handleQuizSubmit = () => {
        if (quizAnswer === null) return;
        setQuizSubmitted(true);
        if (quizAnswer === article?.quiz?.answer) {
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
            
            // 🚀 關鍵解鎖邏輯：
            // 如果這章的所有文章都完成了，解鎖下一章
            const currentChapter = CHAPTERS.find(c => c.articleIds.includes(article.id));
            if (currentChapter) {
                const allInChapter = currentChapter.articleIds;
                const isAllDone = allInChapter.every(id => completed.includes(id));
                if (isAllDone) {
                    const nextChapterId = currentChapter.id + 1;
                    const savedLevel = localStorage.getItem('dee_ai_level') || '0';
                    if (nextChapterId > parseInt(savedLevel)) {
                        localStorage.setItem('dee_ai_level', nextChapterId.toString());
                    }
                }
            }
        }
    };

    if (loading) return <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center text-zinc-500 font-mono text-xs tracking-widest animate-pulse text-center">INITIALIZING_SYLLABUS...</div>;
    if (!article) return null;

    const theme = getColorClasses(article.themeColor || 'emerald');
    const hasSteps = article.steps && article.steps.length > 0;
    const mainIndex = MAIN_QUEST_ORDER.indexOf(article.id);
    const nextArticleId = MAIN_QUEST_ORDER[mainIndex + 1];
    const nextArticle = INSIGHTS_LIST.find(i => i.id === nextArticleId);

    return (
        <div className="min-h-screen bg-[#0a0a0a] text-zinc-300 selection:bg-emerald-500/30 pb-20">
            <SEO title={article.title} description={article.summary} path={`/insights/${article.id}`} />
            <div className="fixed top-0 left-0 w-full h-1 z-[100] bg-white/5">
                <motion.div className="h-full bg-emerald-500" style={{ width: `${progress * 100}%` }} />
            </div>

            {/* HERO */}
            <section className="relative min-h-[80vh] flex flex-col items-center justify-center px-6 overflow-hidden border-b border-white/5">
                <div className={`absolute inset-0 bg-gradient-to-b ${theme.gradient} opacity-10 pointer-events-none`} />
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-4xl w-full text-center relative z-10">
                    <Link to="/insights" className="inline-flex items-center gap-2 text-zinc-500 hover:text-white transition-colors mb-12 text-xs font-black uppercase tracking-widest">
                        <ArrowLeft size={14} /> Back to Lab
                    </Link>
                    <div className="flex items-center justify-center gap-4 mb-6">
                        <span className={`text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-widest bg-white/5 border border-white/10 text-zinc-400`}>{article.category}</span>
                        <div className="flex gap-1">{[...Array(5)].map((_, i) => <StarIcon key={i} size={10} className={i < (article.difficulty_level || 1) ? theme.text : 'text-zinc-800'} fill="currentColor" />)}</div>
                    </div>
                    <h1 className="text-4xl md:text-7xl font-black text-white mb-8 tracking-tighter leading-[1.1] text-center">{article.title}</h1>
                    <p className="text-xl md:text-2xl text-zinc-400 mb-12 max-w-2xl mx-auto leading-relaxed text-center font-medium">{article.summary}</p>
                    <button onClick={scrollToHook} className="bg-white text-black font-black py-5 px-12 rounded-2xl text-lg flex items-center gap-3 mx-auto shadow-2xl hover:bg-emerald-500 transition-all active:scale-95">
                        開始修煉 <ArrowRight size={20} />
                    </button>
                </motion.div>
            </section>

            {/* HOOK */}
            <section className="py-32 px-6" ref={hookRef}>
                <div className="max-w-3xl mx-auto text-center mb-20">
                    <h2 className="text-3xl md:text-5xl font-black text-white mb-8 tracking-tight text-center">核心痛點</h2>
                    <p className="text-zinc-400 text-xl md:text-2xl leading-relaxed text-center font-medium">{article.pain_point}</p>
                </div>
            </section>

            {/* STEPS */}
            {hasSteps && (
                <section className="py-20 px-6 max-w-4xl mx-auto text-left">
                    <div className="space-y-12">
                        {article.steps.map((step: any, idx: number) => {
                            const isDone = stepsCompleted[idx];
                            const isActive = idx === currentStep;
                            const isLocked = idx > currentStep;
                            return (
                                <motion.div key={idx} ref={el => stepRefs.current[idx] = el}
                                    className={`relative rounded-[2.5rem] border p-10 md:p-16 transition-all duration-500 ${isDone ? 'bg-white/[0.01] border-emerald-500/20' : isActive ? 'bg-zinc-900 border-white/20 shadow-2xl' : 'opacity-10 border-transparent pointer-events-none'}`}>
                                    <div className="flex flex-col md:flex-row gap-10">
                                        <div className={`w-14 h-14 rounded-2xl flex items-center justify-center text-xl font-black ${isDone ? 'bg-emerald-500 text-black' : 'bg-white text-black'}`}>
                                            {isDone ? '✓' : idx + 1}
                                        </div>
                                        <div className="flex-1 text-left">
                                            <h3 className={`text-2xl md:text-4xl font-black mb-6 ${isDone ? 'text-emerald-400' : 'text-white'}`}>{step.title}</h3>
                                            <p className="text-zinc-300 text-lg md:text-xl leading-relaxed mb-10 font-medium text-left">{step.body}</p>
                                            {isActive && !isDone && (
                                                <button onClick={() => handleStepComplete(idx)} className="py-5 px-10 rounded-2xl bg-emerald-500 text-black font-black text-lg shadow-xl hover:bg-emerald-400 transition-all flex items-center gap-2 active:scale-95">
                                                    我了解了，下一步 <MousePointer2 size={20} />
                                                </button>
                                            )}
                                        </div>
                                    </div>
                                    {isLocked && (
                                        <div className="absolute inset-0 bg-black/40 backdrop-blur-md flex items-center justify-center rounded-[2.5rem] text-zinc-700 font-black uppercase tracking-[0.4em] text-xs">Locked Step</div>
                                    )}
                                </motion.div>
                            );
                        })}
                    </div>
                </section>
            )}

            {/* TREASURE */}
            <section className="py-40 px-6 text-center border-t border-white/5" ref={treasureRef}>
                <AnimatePresence mode="wait">
                    {treasurePhase === 'locked' ? (
                        <div className="opacity-20 grayscale flex flex-col items-center gap-8 py-20 text-center">
                            <div className="text-8xl text-center">🎁</div>
                            <h3 className="text-xl font-black text-white uppercase tracking-[0.5em] text-center">Treasure Locked</h3>
                        </div>
                    ) : treasurePhase === 'revealed' ? (
                        <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="max-w-4xl mx-auto">
                            <div className="bg-zinc-900 border-2 border-emerald-500/30 rounded-[3rem] p-10 md:p-20 shadow-2xl relative overflow-hidden text-center">
                                <h2 className="text-3xl md:text-5xl font-black text-white mb-8 tracking-tighter text-center">{article.practice_kit?.title}</h2>
                                <p className="text-zinc-400 text-xl md:text-2xl mb-12 text-center font-medium leading-relaxed">{article.practice_kit?.description}</p>
                                <div className="bg-black border border-white/5 rounded-2xl p-8 mb-12 text-left shadow-inner">
                                    <pre className="text-violet-300 whitespace-pre-wrap font-mono text-sm md:text-base leading-relaxed text-left">{article.practice_kit?.command}</pre>
                                </div>
                                <button onClick={handleClaimCommand} className="bg-emerald-500 text-black font-black py-6 px-12 rounded-2xl text-xl hover:bg-emerald-400 transition-all shadow-2xl active:scale-95 flex items-center gap-3 mx-auto">
                                    {copied ? <Check size={24} /> : <Copy size={24} />} {copied ? '指令已複製' : '領取指令寶箱'}
                                </button>
                            </div>
                        </motion.div>
                    ) : (
                        <div className="text-9xl py-20 animate-pulse text-center">🎁</div>
                    )}
                </AnimatePresence>
            </section>

            {/* QUIZ */}
            {article.quiz && (
                <section className="py-40 px-6 bg-zinc-900/20 border-t border-white/5" ref={rewardRef}>
                    <div className="max-w-3xl mx-auto">
                        <div className="text-center mb-16"><h2 className="text-3xl md:text-5xl font-black text-white tracking-tighter text-center">驗收修行成果</h2></div>
                        <div className="bg-zinc-900 border border-white/10 rounded-[3rem] p-8 md:p-16 shadow-2xl text-left">
                            <p className="text-2xl md:text-3xl font-black text-white mb-10 text-left leading-tight font-medium">{article.quiz.question}</p>
                            <div className="space-y-4">
                                {article.quiz.options.map((opt: string, i: number) => (
                                    <button key={i} disabled={quizSubmitted} onClick={() => setQuizAnswer(i)}
                                        className={`w-full py-6 px-8 rounded-2xl text-left text-lg font-bold border transition-all ${quizAnswer === i ? 'border-emerald-500 bg-emerald-500/10 text-white' : 'border-white/5 bg-white/[0.02] text-zinc-500 hover:border-white/20'}`}>
                                        {String.fromCharCode(65 + i)}. {opt}
                                    </button>
                                ))}
                            </div>
                            {!quizSubmitted && (
                                <button onClick={handleQuizSubmit} disabled={quizAnswer === null} className="w-full mt-10 py-6 rounded-2xl bg-white text-black font-black text-xl hover:bg-emerald-500 disabled:opacity-20 transition-all active:scale-95">確認答案</button>
                            )}
                            {quizSubmitted && (
                                <div className="mt-10 p-8 rounded-2xl bg-white/5 border border-white/10 text-left">
                                    <p className={`text-2xl font-black mb-4 ${quizAnswer === article.quiz.answer ? 'text-emerald-400' : 'text-amber-400'}`}>{quizAnswer === article.quiz.answer ? '🎉 答對了！' : '💡 再想一下'}</p>
                                    <p className="text-zinc-400 text-lg leading-relaxed text-left font-medium">{article.quiz.explanation}</p>
                                    {quizAnswer === article.quiz.answer && !badgeEarned && (
                                        <button onClick={handleEarnBadge} className="mt-8 w-full py-5 rounded-2xl bg-emerald-500 text-black font-black text-lg shadow-xl active:scale-95">🏆 領取修行勳章</button>
                                    )}
                                </div>
                            )}
                        </div>
                    </div>
                </section>
            )}

            {/* FOOTER NAV */}
            <section className="py-32 px-6 border-t border-white/5">
                <div className="max-w-4xl mx-auto text-center">
                    {nextArticle ? (
                        <Link to={`/insights/${nextArticle.id}`} className="group block bg-zinc-900 border border-white/5 p-10 md:p-16 rounded-[3.5rem] hover:border-emerald-500/30 transition-all shadow-2xl">
                            <span className="text-zinc-600 text-xs font-black uppercase tracking-[0.5em] mb-6 block">NEXT LESSON</span>
                            <h3 className="text-2xl md:text-5xl font-black text-white mb-4 group-hover:text-emerald-400 transition-colors text-center truncate">{nextArticle.title}</h3>
                            <ArrowRight size={40} className="mx-auto mt-8 text-emerald-500 group-hover:translate-x-3 transition-transform" />
                        </Link>
                    ) : (
                        <Link to="/insights" className="text-emerald-500 font-black text-2xl hover:underline text-center">🗺️ 返回冒險地圖</Link>
                    )}
                </div>
            </section>
        </div>
    );
};

export default ArticleDetail;
