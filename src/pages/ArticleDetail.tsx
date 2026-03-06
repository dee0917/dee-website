import React, { useState, useEffect, useRef } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { 
    ArrowLeft, ArrowRight, Copy, Check, ChevronDown, Lock, Sparkles, 
    MousePointer2, Smartphone, Gamepad2, X, Target, Send, Flame,
    Terminal, BrainCircuit, ShieldCheck, HelpCircle, AlertCircle, Lightbulb
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import { api } from '../lib/supabase';
import { INSIGHTS } from '../data/mock';
import { MAIN_QUEST_ORDER, CHAPTERS, SIDE_QUEST_IDS } from '../data/insights';
import SEO from '../components/ui/SEO';
import { ChatGPTLogo, ClaudeLogo, GeminiLogo } from '../components/AILogos';
import { useIdentity } from '../context/IdentityContext';
import { judgeUserResponse } from '../lib/khojJudge';
import DifficultyStars from '../components/ui/DifficultyStars';

const fadeUp = {
    initial: { opacity: 0, y: 40 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: "-60px" },
    transition: { duration: 0.5, ease: "easeOut" }
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
    const [rippleStep, setRippleStep] = useState<number | null>(null);
    const [showAiJumpModal, setShowAiJumpModal] = useState(false);
    
    // 🎮 Practice Mode State
    const [isPracticeMode, setIsPracticeMode] = useState(false);
    const [messages, setMessages] = useState<{role: 'ai' | 'user', text: string}[]>([]);
    const [userInput, setUserInput] = useState('');
    const [practiceStep, setPracticeStep] = useState(0);
    const [failCount, setFailCount] = useState(0);
    const [showHint, setShowHint] = useState(false);
    const [isJudging, setIsJudging] = useState(false);
    const [currentHint, setCurrentHint] = useState('');

    // Refs
    const stepRefs = useRef<(HTMLDivElement | null)[]>([]);
    const treasureRef = useRef<HTMLDivElement>(null);
    const quizRef = useRef<HTMLDivElement>(null);
    const rewardRef = useRef<HTMLDivElement>(null);
    const hookRef = useRef<HTMLDivElement>(null);
    const chatEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        if (isPracticeMode) scrollToBottom();
    }, [messages, isJudging]);

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

    const fetchArticle = async (articleId: number) => {
        try {
            setLoading(true);
            const localArticle = INSIGHTS.find(i => i.id === articleId);
            const dbData = await api.getInsightById(articleId);
            const finalData = localArticle ? { ...dbData, ...localArticle } : dbData;
            setArticle(finalData);
            
            setMessages([
                { role: 'ai', text: `修煉開始！我是您的 AI 導師。\n\n本關目標：【${finalData.practice_kit?.title || '實戰操作'}】\n\n提示：${finalData.practice_kit?.description}\n\n請在下方輸入您打算如何具體執行這項任務？（例如：我會搜尋...或是點擊...）` }
            ]);
        } catch (e) {
            setArticle(null);
        } finally {
            setLoading(false);
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSendMessage();
        }
    };

    const handleSendMessage = async () => {
        if (!userInput.trim() || isJudging) return;
        
        const userText = userInput;
        const newMessages = [...messages, { role: 'user', text: userText }];
        setMessages(newMessages as any);
        setUserInput('');
        setIsJudging(true);
        
        try {
            const result = await judgeUserResponse(article?.title || '未知任務', userText);
            
            setMessages(prev => [...prev, { role: 'ai', text: result.feedback }] as any);

            if (result.passed) {
                setPracticeStep(prev => prev + 1);
                setFailCount(0);
                setShowHint(false);
                if (practiceStep >= 1) { 
                    triggerSuccessSequence();
                }
            } else {
                setFailCount(prev => prev + 1);
                if (result.hint) setCurrentHint(result.hint);
                if (failCount >= 0) setShowHint(true); // 錯一次就給提示
            }
        } catch (error) {
            setMessages(prev => [...prev, { role: 'ai', text: "判官分神了，請再試一次。" }] as any);
        } finally {
            setIsJudging(false);
        }
    };

    const triggerSuccessSequence = () => {
        confetti({ particleCount: 150, spread: 70, origin: { y: 0.6 } });
        setTreasurePhase('falling');
        setTimeout(() => setTreasurePhase('impact'), 700);
        setTimeout(() => setTreasurePhase('exploding'), 1300);
        setTimeout(() => setTreasurePhase('revealed'), 2100);
    };

    const handleClaimCommand = () => {
        if (article?.practice_kit?.command) {
            navigator.clipboard.writeText(article.practice_kit.command);
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
            setTreasurePhase('revealed'); // 直接解鎖
            setTimeout(() => {
                treasureRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }, 200);
        }
    };

    const handleQuizSubmit = () => {
        if (quizAnswer === null) return;
        setQuizSubmitted(true);
        if (quizAnswer === article?.quiz?.answer) {
            rewardRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
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

    useEffect(() => {
        if (article?.steps) {
            const isFree = localStorage.getItem('dee_view_preference') === 'free';
            setFreeMode(isFree);
            setStepsCompleted(new Array(article.steps.length).fill(isFree));
            setCurrentStep(isFree ? article.steps.length - 1 : 0);
            stepRefs.current = new Array(article.steps.length).fill(null);
        }
    }, [article?.id]);

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

    if (loading) return <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center text-white font-mono text-xs tracking-widest animate-pulse">SYNCING_DATA...</div>;
    if (!article) return <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center text-white font-bold">404</div>;

    const theme = getColorClasses(article.themeColor || 'emerald');
    const hasSteps = article.steps && article.steps.length > 0;
    const hasQuiz = article.quiz && article.quiz.question;
    const allStepsDone = stepsCompleted.every(s => s === true);

    return (
        <div className="min-h-screen bg-[#0a0a0a] text-zinc-300 selection:bg-emerald-500/30">
            <SEO title={article.title} description={article.summary} path={`/insights/${article.id}`} />
            
            <section className="relative min-h-[95vh] flex flex-col items-center justify-center px-6 overflow-hidden pt-32">
                <div className={`absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-gradient-to-b ${theme.gradient} opacity-20 pointer-events-none`} />
                
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-4xl w-full text-center relative z-10">
                    <Link to="/insights" className="inline-flex items-center gap-2 text-zinc-500 hover:text-white transition-colors mb-10 group text-[10px] font-black uppercase tracking-[0.3em]">
                        <ArrowLeft size={14} /> 返回修煉地圖
                    </Link>

                    <div className="mb-10 text-left md:text-center">
                        <h1 className="text-4xl md:text-7xl font-black text-white mb-8 tracking-tight leading-[1.1]">{article.title}</h1>
                        
                        <div className="flex items-center justify-center gap-4 bg-white/5 p-1.5 rounded-2xl border border-white/10 w-fit mx-auto mb-12 shadow-2xl">
                            <button onClick={() => setIsPracticeMode(false)} className={`px-6 py-2.5 rounded-xl text-xs font-black transition-all ${!isPracticeMode ? 'bg-white text-black shadow-lg' : 'text-zinc-500 hover:text-white'}`}>經典模式</button>
                            <button onClick={() => setIsPracticeMode(true)} className={`px-6 py-2.5 rounded-xl text-xs font-black transition-all ${isPracticeMode ? 'bg-emerald-500 text-black shadow-lg' : 'text-zinc-500 hover:text-white'} flex items-center gap-2`}>
                                <Flame size={14} /> 互動演練 (Beta)
                            </button>
                        </div>
                    </div>

                    {isPracticeMode ? (
                        <div className="w-full max-w-2xl mx-auto bg-[#0d0d0d]/90 backdrop-blur-3xl border border-white/10 rounded-[3.5rem] overflow-hidden shadow-[0_0_120px_rgba(0,0,0,0.9)]">
                            <div className="bg-emerald-500/10 px-10 py-6 flex items-center justify-between border-b border-white/5">
                                <div className="flex items-center gap-4 text-left">
                                    <div className="w-10 h-10 rounded-xl bg-emerald-500 flex items-center justify-center text-black shadow-lg shadow-emerald-500/20">
                                        <BrainCircuit size={20} />
                                    </div>
                                    <div>
                                        <span className="text-[10px] font-black text-emerald-500/60 uppercase tracking-widest block">判官邏輯審核中</span>
                                        <h4 className="text-white font-black text-sm uppercase tracking-tighter">修行進度 ({practiceStep}/2)</h4>
                                    </div>
                                </div>
                                <div className="flex gap-1.5 bg-black/40 p-2 rounded-xl">
                                    {[...Array(2)].map((_, i) => (
                                        <StarIcon key={i} size={16} className={i < practiceStep ? 'text-emerald-400' : 'text-zinc-800'} fill="currentColor" />
                                    ))}
                                </div>
                            </div>

                            <div className="h-[400px] overflow-y-auto p-10 space-y-8 text-left scrollbar-hide bg-gradient-to-b from-transparent to-emerald-950/10">
                                {messages.map((m, i) => (
                                    <motion.div key={i} initial={{ opacity: 0, x: m.role === 'ai' ? -20 : 20 }} animate={{ opacity: 1, x: 0 }}
                                        className={`flex ${m.role === 'ai' ? 'justify-start' : 'justify-end'}`}
                                    >
                                        <div className={`max-w-[90%] p-6 rounded-[2.2rem] text-base leading-relaxed shadow-xl ${
                                            m.role === 'ai' 
                                            ? 'bg-zinc-900 text-zinc-200 rounded-tl-none border border-white/5' 
                                            : 'bg-emerald-500 text-black font-black rounded-tr-none'
                                        }`}>
                                            {m.text.split('\n').map((line, li) => <p key={li} className="mb-2 last:mb-0">{line}</p>)}
                                        </div>
                                    </motion.div>
                                ))}
                                {isJudging && (
                                    <div className="flex justify-start">
                                        <div className="bg-zinc-900 p-5 rounded-3xl rounded-tl-none border border-white/5 flex items-center gap-4">
                                            <motion.div animate={{ opacity: [0.3, 1, 0.3] }} transition={{ repeat: Infinity, duration: 1 }} className="flex gap-1.5">
                                                <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full" />
                                                <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full" />
                                                <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full" />
                                            </motion.div>
                                            <span className="text-[10px] font-black text-zinc-500 uppercase tracking-widest">判官正在分析您的邏輯...</span>
                                        </div>
                                    </div>
                                )}
                                <div ref={chatEndRef} />
                            </div>

                            <AnimatePresence>
                                {showHint && (
                                    <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }}
                                        className="bg-amber-500/5 border-y border-amber-500/10 px-10 py-6 flex items-start gap-4 text-left"
                                    >
                                        <Lightbulb className="text-amber-400 mt-1 flex-shrink-0" size={18} />
                                        <div>
                                            <span className="text-[10px] font-black text-amber-500 uppercase tracking-widest block mb-1">判官提示</span>
                                            <p className="text-sm text-amber-100/60 leading-relaxed italic">{currentHint || "請嘗試描述具體的『搜尋』或『點擊』動作。"}</p>
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>

                            <div className="p-8 bg-black/60 border-t border-white/5">
                                <div className="relative group">
                                    <textarea 
                                        value={userInput}
                                        onChange={(e) => setUserInput(e.target.value)}
                                        onKeyDown={handleKeyDown}
                                        placeholder="在此輸入您的操作計畫（Enter 發送）..."
                                        className="w-full bg-white/[0.03] border border-white/10 rounded-[2rem] p-6 pr-20 text-white placeholder:text-zinc-600 focus:border-emerald-500/40 outline-none resize-none h-28 transition-all group-hover:border-white/20 shadow-inner"
                                    />
                                    <button onClick={handleSendMessage} disabled={!userInput.trim() || isJudging}
                                        className={`absolute bottom-5 right-5 p-4 rounded-2xl transition-all ${userInput.trim() && !isJudging ? 'bg-emerald-500 text-black shadow-lg hover:scale-105 active:scale-95' : 'bg-zinc-800 text-zinc-500 opacity-50 cursor-not-allowed'}`}
                                    >
                                        <Send size={22} />
                                    </button>
                                </div>
                                <div className="mt-4 flex items-center justify-center gap-6 opacity-30">
                                    <span className="text-[9px] font-black text-zinc-500 uppercase tracking-[0.2em] flex items-center gap-1.5"><Terminal size={10}/> Khoj Judge Protocol</span>
                                    <span className="text-[9px] font-black text-zinc-500 uppercase tracking-[0.2em] flex items-center gap-1.5"><ShieldCheck size={10}/> Verified Answer System</span>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className="text-left md:text-center">
                            <p className="text-xl md:text-2xl text-zinc-400 mb-12 max-w-2xl mx-auto leading-relaxed">{article.summary}</p>
                            <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={scrollToHook}
                                className="bg-white text-black font-black py-5 px-10 rounded-2xl text-lg flex items-center gap-3 mx-auto shadow-2xl hover:bg-emerald-500 transition-colors group">
                                <Gamepad2 size={24} /> 開始修煉 <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                            </motion.button>
                        </div>
                    )}
                </motion.div>
                <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce opacity-20"><ChevronDown size={32} /></div>
            </section>

            {/* Classic Content Parts */}
            <section className="py-32 px-5 md:px-6 bg-zinc-900/30" ref={hookRef}>
                <motion.div {...fadeUp} className="max-w-3xl mx-auto text-center mb-24">
                    <span className="transition-label">痛點切入</span>
                    <h2 className="text-3xl md:text-5xl font-black text-white mb-8 tracking-tight text-left md:text-center">你也正為了這件事煩惱嗎？</h2>
                    <p className="text-zinc-400 text-xl md:text-2xl leading-relaxed text-left md:text-center">{article.pain_point}</p>
                </motion.div>
                <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-10">
                    <motion.div {...fadeUp} className="bg-white/[0.02] border border-white/5 rounded-[3rem] p-10 relative overflow-hidden group">
                        <div className="text-white/5 text-9xl font-black absolute -right-6 -bottom-6 rotate-12">❌</div>
                        <p className="text-zinc-400 text-lg md:text-xl leading-relaxed relative z-10">{article.example?.wrong}</p>
                    </motion.div>
                    <motion.div {...fadeUp} transition={{ delay: 0.1 }} className="bg-emerald-500/[0.03] border border-emerald-500/20 rounded-[3rem] p-10 relative overflow-hidden group shadow-[0_0_50px_rgba(16,185,129,0.05)]">
                        <div className="text-emerald-500/10 text-9xl font-black absolute -right-6 -bottom-6 -rotate-12">✅</div>
                        <p className="text-white text-lg md:text-xl leading-relaxed font-bold relative z-10">{article.example?.right}</p>
                    </motion.div>
                </div>
            </section>

            {hasSteps && (
                <section className="py-32 px-5 md:px-6 text-left max-w-4xl mx-auto">
                    <div className="text-center mb-24">
                        <span className="transition-label">實戰演練</span>
                        <h2 className="text-3xl md:text-5 font-black text-white tracking-tight">一步一步跟著做</h2>
                    </div>
                    <div className="space-y-12">
                        {article.steps.map((step: any, idx: number) => {
                            const isDone = stepsCompleted[idx];
                            const isActive = freeMode ? !isDone : idx === currentStep;
                            return (
                                <motion.div key={idx} ref={el => stepRefs.current[idx] = el}
                                    className={`relative rounded-[3.5rem] border p-8 md:p-14 transition-all duration-500 overflow-hidden ${isDone ? 'bg-white/[0.01] border-emerald-500/20' : isActive ? 'bg-zinc-900 border-white/20 shadow-2xl scale-[1.01]' : 'border-white/5 opacity-10 pointer-events-none'}`}>
                                    <div className="flex flex-col md:flex-row items-start gap-10">
                                        <div className={`w-16 h-16 rounded-2xl flex items-center justify-center flex-shrink-0 text-2xl font-black transition-all duration-500 ${isDone ? 'bg-emerald-500 text-black' : isActive ? 'bg-white text-black' : 'bg-white/5 text-zinc-700'}`}>
                                            {isDone ? '✓' : idx + 1}
                                        </div>
                                        <div className="flex-1">
                                            <h3 className={`text-2xl md:text-4xl font-black mb-6 tracking-tight ${isDone ? 'text-emerald-400' : 'text-white'}`}>{step.title}</h3>
                                            <p className="text-zinc-300 text-lg md:text-xl leading-relaxed mb-10 font-medium">{step.body}</p>
                                            {isActive && !isDone && (
                                                <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} onClick={() => handleStepComplete(idx)}
                                                    className="relative group py-5 px-10 rounded-2xl bg-emerald-500 text-black font-black text-xl shadow-xl flex items-center gap-3">
                                                    我了解了，下一個 <MousePointer2 size={24} className="animate-bounce" />
                                                </motion.button>
                                            )}
                                        </div>
                                    </div>
                                </motion.div>
                            );
                        })}
                    </div>
                </section>
            )}

            <section className="py-40 px-5 md:px-6 text-center border-t border-white/5 relative overflow-hidden" ref={treasureRef}>
                <div className={`absolute inset-0 bg-gradient-to-b ${theme.gradient} opacity-5 pointer-events-none`} />
                <motion.div {...fadeUp} className="max-w-3xl mx-auto relative z-10">
                    {treasurePhase === 'revealed' ? (
                        <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ type: "spring" }}>
                            <div className="bg-zinc-900 border-2 border-emerald-500/30 rounded-[4rem] p-10 md:p-20 shadow-2xl relative overflow-hidden mb-16">
                                <div className="absolute top-0 left-0 w-full h-2 bg-emerald-500 shadow-[0_0_20px_rgba(16,185,129,0.5)]" />
                                <span className="text-emerald-500 font-black text-sm tracking-[0.8em] mb-10 block uppercase opacity-60">Ready to execute</span>
                                <h2 className="text-3xl md:text-6xl font-black text-white mb-10 tracking-tight leading-tight">{article.practice_kit?.title}</h2>
                                <p className="text-zinc-400 text-xl md:text-2xl mb-12 leading-relaxed">{article.practice_kit?.description}</p>
                                <div className="bg-black/50 border border-white/5 rounded-[2.5rem] p-8 md:p-12 mb-12 text-left relative group">
                                    <pre className="text-zinc-300 text-base md:text-lg whitespace-pre-wrap font-mono leading-relaxed">{article.practice_kit?.command}</pre>
                                </div>
                                <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={handleClaimCommand}
                                    className="bg-emerald-500 text-black font-black py-6 px-12 rounded-2xl text-xl flex items-center gap-3 mx-auto shadow-2xl hover:bg-emerald-400">
                                    <Copy size={24} /> 領取指令寶箱
                                </motion.button>
                            </div>
                        </motion.div>
                    ) : (
                        <div className="flex flex-col items-center gap-12 py-20 grayscale opacity-30">
                            <div className="text-9xl">{treasurePhase === 'locked' ? '🎁' : '💥'}</div>
                            <h2 className="text-2xl font-black text-white uppercase tracking-[0.5em]">Treasure Locked</h2>
                            <p className="text-zinc-500 italic font-medium">完成對話演練以解鎖</p>
                        </div>
                    )}
                </motion.div>
            </section>

            <section className="py-40 px-5 md:px-6 text-center" ref={rewardRef}>
                <motion.div {...fadeUp} className="max-w-xl mx-auto">
                    {badgeEarned ? (
                        <motion.div initial={{ opacity: 0, scale: 0.5 }} animate={{ opacity: 1, scale: 1 }}>
                            <div className="inline-block bg-zinc-900 border-2 border-emerald-500/40 rounded-[4rem] p-12 md:p-20 shadow-2xl relative overflow-hidden">
                                <div className="absolute top-0 left-0 w-full h-2 bg-emerald-500" />
                                <motion.p animate={{ scale: [1, 1.1, 1], rotate: [0, -5, 5, 0] }} transition={{ duration: 3, repeat: Infinity }} className="text-9xl mb-12">🏆</motion.p>
                                <p className="text-white text-3xl md:text-5xl font-black mb-12 tracking-tight">{article.skill_badge || article.title}</p>
                            </div>
                        </motion.div>
                    ) : (
                        <motion.button whileTap={{ scale: 0.95 }} onClick={handleEarnBadge} disabled={!allStepsDone || (hasQuiz && !quizSubmitted)}
                            className="bg-emerald-500 text-black font-black py-8 px-16 rounded-[2.5rem] text-2xl shadow-2xl disabled:opacity-20 hover:scale-105 transition-all">
                            🏆 領取修行勳章
                        </motion.button>
                    )}
                </motion.div>
            </section>

            <AnimatePresence>
                {showAiJumpModal && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[100] flex items-center justify-center px-6 bg-black/95 backdrop-blur-2xl">
                        <motion.div initial={{ scale: 0.9, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.9, y: 20 }} className="bg-zinc-900 border border-white/10 p-10 rounded-[3rem] max-w-sm w-full shadow-2xl relative overflow-hidden">
                            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-emerald-500 to-blue-500" />
                            <button onClick={() => setShowAiJumpModal(false)} className="absolute top-8 right-8 text-zinc-500 hover:text-white transition-colors"><X size={28} /></button>
                            <div className="text-center mb-10">
                                <div className="w-16 h-16 bg-emerald-500/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
                                    <Smartphone className="text-emerald-400" size={32} />
                                </div>
                                <h3 className="text-2xl font-black text-white mb-3 tracking-tight">指令已複製！</h3>
                                <p className="text-zinc-500 text-sm font-medium">選一個工具直接貼上</p>
                            </div>
                            <div className="grid grid-cols-3 gap-4">
                                {[
                                    { name: 'GPT', logo: ChatGPTLogo, app: 'chatgpt://', web: 'https://chat.openai.com' },
                                    { name: 'Claude', logo: ClaudeLogo, app: 'claude://', web: 'https://claude.ai' },
                                    { name: 'Gemini', logo: GeminiLogo, app: 'googlegemini://', web: 'https://gemini.google.com' }
                                ].map((ai, i) => (
                                    <a key={i} href={ai.web} target="_blank" rel="noopener noreferrer" className={`flex flex-col items-center gap-3 p-4 rounded-2xl bg-white/[0.03] border border-white/5 transition-all group hover:bg-emerald-500/10 hover:border-emerald-500/30`}>
                                        <ai.logo size={32} />
                                        <span className="text-white font-black text-[10px] uppercase tracking-tighter">{ai.name}</span>
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

const StarIcon = ({ size, className, fill }: any) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill={fill} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
    </svg>
);

export default ArticleDetail;
