import React, { useState, useEffect, useRef } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { 
    ArrowLeft, ArrowRight, Copy, Check, ChevronDown, Lock, Sparkles, 
    MousePointer2, Smartphone, Gamepad2, X, Target, Send, Flame,
    Terminal, BrainCircuit, ShieldCheck, HelpCircle, AlertCircle, Lightbulb,
    UserCheck, BookOpen, Star
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
    const [progress, setProgress] = useState(0);
    const [currentStep, setCurrentStep] = useState(0);
    const [stepsCompleted, setStepsCompleted] = useState<boolean[]>([]);
    const [badgeEarned, setBadgeEarned] = useState(false);
    const [treasurePhase, setTreasurePhase] = useState<'locked' | 'falling' | 'impact' | 'exploding' | 'revealed'>('locked');
    const [freeMode, setFreeMode] = useState(false);
    const [rippleStep, setRippleStep] = useState<number | null>(null);
    const [showAiJumpModal, setShowAiJumpModal] = useState(false);
    const [quizAnswer, setQuizAnswer] = useState<number | null>(null);
    const [quizSubmitted, setQuizSubmitted] = useState(false);
    
    // 🎮 Practice Mode State
    const [isPracticeMode, setIsPracticeMode] = useState(false);
    const [messages, setMessages] = useState<{role: 'ai' | 'user', text: string}[]>([]);
    const [userInput, setUserInput] = useState('');
    const [practiceStep, setPracticeStep] = useState(0);
    const [failCount, setFailCount] = useState(0);
    const [showHint, setShowHint] = useState(false);
    const [isJudging, setIsJudging] = useState(false);
    const [currentHint, setCurrentHint] = useState('');
    const [previousResponses, setPreviousResponses] = useState<string[]>([]);

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
                { 
                    role: 'ai', 
                    text: `我是您的 AI 助教。本關實踐目標：\n「${finalData.practice_kit?.title}」\n\n任務描述：${finalData.practice_kit?.description}\n\n請直接在下方輸入您的操作計畫（例如：我會搜尋...或是點擊...）。如果您感到困惑，可以隨便輸入一個字，我會給您具體的正確方向！` 
                }
            ]);

            if (finalData.steps) {
                setStepsCompleted(new Array(finalData.steps.length).fill(false));
            }
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
        
        const text = userInput;
        const newMessages = [...messages, { role: 'user', text }];
        setMessages(newMessages as any);
        setUserInput('');
        setIsJudging(true);
        
        try {
            const historyContext = previousResponses.slice(-3).join('|');
            const result = await judgeUserResponse(
                article?.title || '', 
                text, 
                `${article?.practice_kit?.description} (歷史提示：${historyContext})`
            );
            
            setMessages(prev => [...prev, { role: 'ai', text: result.feedback }] as any);
            setPreviousResponses(prev => [...prev, result.feedback]);
            if (result.hint) setCurrentHint(result.hint);

            if (result.passed) {
                setPracticeStep(prev => prev + 1);
                setFailCount(0);
                setShowHint(false);
                if (practiceStep >= 1) { 
                    triggerSuccess();
                }
            } else {
                setFailCount(prev => prev + 1);
                if (result.hint) setCurrentHint(result.hint);
                if (failCount >= 0) setShowHint(true);
            }
        } catch (error) {
            setMessages(prev => [...prev, { role: 'ai', text: "連線不穩，請再試一次。" }] as any);
        } finally {
            setIsJudging(false);
        }
    };

    const triggerSuccess = () => {
        confetti({ particleCount: 150, spread: 70, origin: { y: 0.6 } });
        setTreasurePhase('revealed');
        setTimeout(() => {
            treasureRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }, 100);
    };

    const handleClaimCommand = () => {
        if (article?.practice_kit?.command) {
            navigator.clipboard.writeText(article.practice_kit.command);
            setShowAiJumpModal(true);
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
                    const middle = rect.top + window.pageYOffset - (window.innerHeight / 2) + (rect.height / 2);
                    window.scrollTo({ top: middle, behavior: 'smooth' });
                }
            }, 300);
        } else {
            setTreasurePhase('revealed');
            setTimeout(() => {
                treasureRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }, 200);
        }
    };

    const getColorClasses = (themeColor: string) => {
        const colors: Record<string, any> = {
            emerald: { text: 'text-emerald-500', bg: 'bg-emerald-500/10', border: 'border-emerald-500/20', gradient: 'from-emerald-500/20 to-teal-500/10' },
            violet: { text: 'text-violet-500', bg: 'bg-violet-500/10', border: 'border-violet-500/20', gradient: 'from-violet-500/20 to-purple-500/10' },
            blue: { text: 'text-blue-500', bg: 'bg-blue-500/10', border: 'border-blue-500/20', gradient: 'from-blue-500/20 to-indigo-500/10' },
            amber: { text: 'text-amber-500', bg: 'bg-amber-500/10', border: 'border-amber-500/20', gradient: 'from-amber-500/20 to-yellow-500/10' },
            rose: { text: 'text-rose-500', bg: 'bg-rose-500/10', border: 'border-rose-500/20', gradient: 'from-rose-500/20 to-pink-500/10' },
            teal: { text: 'text-teal-500', bg: 'bg-teal-500/10', border: 'border-teal-500/20', gradient: 'from-teal-500/20 to-cyan-500/10' },
        };
        return colors[themeColor] || colors.emerald;
    };

    if (loading) return <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center text-white font-mono text-xs tracking-widest animate-pulse">SYNCING_DATA...</div>;
    if (!article) return <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center text-white font-bold">404</div>;

    const themeClasses = getColorClasses(article.themeColor || 'emerald');
    const hasSteps = article.steps && article.steps.length > 0;
    const hasQuiz = article.quiz && article.quiz.question;
    const allStepsDone = stepsCompleted.every(s => s === true);

    return (
        <div className="min-h-screen bg-[#0a0a0a] text-zinc-300">
            <SEO title={article.title} description={article.summary} path={`/insights/${article.id}`} />
            
            <section className="relative min-h-[90vh] flex flex-col items-center justify-center px-6 overflow-hidden pt-32">
                <div className={`absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-gradient-to-b ${themeClasses.gradient} opacity-20 pointer-events-none`} />
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-4xl w-full text-center relative z-10">
                    <Link to="/insights" className="inline-flex items-center gap-2 text-zinc-600 hover:text-white mb-10 text-[10px] font-black tracking-[0.4em]">
                        <ArrowLeft size={14} /> 返回地圖
                    </Link>
                    <div className="flex items-center justify-center gap-4 mb-6">
                        <span className={`text-xs font-black px-3 py-1 rounded-full uppercase tracking-widest ${themeClasses.bg} ${themeClasses.text} border ${themeClasses.border}`}>{article.category}</span>
                        <DifficultyStars level={article.difficulty_level || 1} />
                    </div>
                    <h1 className="text-4xl md:text-7xl font-black text-white mb-12 tracking-tight leading-tight">{article.title}</h1>
                    
                    <div className="flex items-center justify-center gap-4 bg-white/5 p-1.5 rounded-2xl border border-white/10 w-fit mx-auto mb-16 shadow-2xl">
                        <button onClick={() => setIsPracticeMode(false)} className={`px-8 py-3 rounded-xl text-xs font-black transition-all ${!isPracticeMode ? 'bg-white text-black shadow-lg' : 'text-zinc-500'}`}>文章閱讀</button>
                        <button onClick={() => setIsPracticeMode(true)} className={`px-8 py-3 rounded-xl text-xs font-black transition-all ${isPracticeMode ? 'bg-emerald-500 text-black shadow-lg' : 'text-zinc-500'} flex items-center gap-2`}>
                            <Flame size={14} /> 互動演練
                        </button>
                    </div>

                    {isPracticeMode ? (
                        <div className="w-full max-w-2xl mx-auto bg-[#0d0d0d] border border-white/10 rounded-[3.5rem] overflow-hidden shadow-[0_0_100px_rgba(0,0,0,0.9)]">
                            <div className="bg-zinc-900 px-10 py-6 border-b border-white/5 flex items-center justify-between">
                                <div className="flex items-center gap-4 text-left">
                                    <div className="w-10 h-10 rounded-xl bg-emerald-500 flex items-center justify-center text-black shadow-lg shadow-emerald-500/20">
                                        <BrainCircuit size={20} />
                                    </div>
                                    <div>
                                        <span className="text-[10px] font-black text-emerald-500/60 uppercase tracking-widest block">判官審核中</span>
                                        <h4 className="text-white font-black text-sm uppercase tracking-tighter">修行進度 ({practiceStep}/2)</h4>
                                    </div>
                                </div>
                                <div className="flex gap-1.5">
                                    {[...Array(2)].map((_, i) => (
                                        <div key={i} className={`w-3 h-3 rounded-full ${i < practiceStep ? 'bg-emerald-500' : 'bg-zinc-800'}`} />
                                    ))}
                                </div>
                            </div>

                            <div className="h-[400px] overflow-y-auto p-10 space-y-8 text-left scrollbar-hide">
                                {messages.map((m, i) => (
                                    <div key={i} className={`flex ${m.role === 'ai' ? 'justify-start' : 'justify-end'}`}>
                                        <div className={`max-w-[85%] p-6 rounded-[2.2rem] text-base leading-relaxed ${
                                            m.role === 'ai' ? 'bg-zinc-900 text-zinc-200 rounded-tl-none border border-white/5 shadow-inner' : 'bg-emerald-500 text-black font-bold rounded-tr-none shadow-xl'
                                        }`}>
                                            {m.text.split('\n').map((line, li) => <p key={li} className="mb-2 last:mb-0">{line}</p>)}
                                        </div>
                                    </div>
                                ))}
                                {isJudging && (
                                    <div className="flex justify-start">
                                        <div className="bg-zinc-900 p-5 rounded-2xl rounded-tl-none border border-white/5 flex items-center gap-4">
                                            <div className="flex gap-1"><div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-bounce" /><div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-bounce delay-75" /><div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-bounce delay-150" /></div>
                                            <span className="text-[10px] font-black text-zinc-500 uppercase tracking-widest">助教正在審核中...</span>
                                        </div>
                                    </div>
                                )}
                                <div ref={chatEndRef} />
                            </div>

                            <AnimatePresence>
                                {showHint && (
                                    <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }}
                                        className="bg-amber-500/10 border-y border-amber-500/20 px-10 py-6 flex items-start gap-4 text-left"
                                    >
                                        <Lightbulb className="text-amber-400 mt-1 flex-shrink-0" size={18} />
                                        <div>
                                            <span className="text-[10px] font-black text-amber-500 uppercase tracking-widest block mb-1">助教提示</span>
                                            <p className="text-sm text-amber-100/60 leading-relaxed italic">{currentHint || "試著描述具體的搜尋動作。"}</p>
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>

                            <div className="p-8 bg-black/40 border-t border-white/5">
                                <div className="relative group">
                                    <textarea 
                                        value={userInput}
                                        onChange={(e) => setUserInput(e.target.value)}
                                        onKeyDown={handleKeyDown}
                                        placeholder="輸入具體操作動作（Enter 發送）..."
                                        className="w-full bg-white/[0.03] border border-white/10 rounded-[2.2rem] p-6 pr-20 text-white focus:border-emerald-500/50 outline-none resize-none h-24 transition-all group-hover:border-white/20"
                                    />
                                    <button onClick={handleSendMessage} disabled={!userInput.trim() || isJudging}
                                        className={`absolute bottom-4 right-4 p-4 rounded-2xl transition-all ${userInput.trim() && !isJudging ? 'bg-emerald-500 text-black shadow-lg hover:scale-105 active:scale-95' : 'bg-zinc-800 text-zinc-500 opacity-50'}`}
                                    >
                                        <Send size={22} />
                                    </button>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <>
                            <p className="text-xl md:text-2xl text-zinc-400 mb-12 max-w-2xl mx-auto leading-relaxed">{article.summary}</p>
                            <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={scrollToHook}
                                className="bg-white text-black font-black py-5 px-10 rounded-2xl text-lg flex items-center gap-3 mx-auto shadow-2xl hover:bg-emerald-500 transition-colors group">
                                <Gamepad2 size={24} /> 開始修煉 <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                            </motion.button>
                        </>
                    )}
                </motion.div>
            </section>

            {/* 🎯 Content Section */}
            <section className="py-32 px-6 max-w-6xl mx-auto">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
                    <div className="lg:col-span-8 space-y-32">
                        <div id="pain-point" ref={hookRef}>
                            <motion.div {...fadeUp} className="text-left mb-16">
                                <span className="transition-label">痛點切入</span>
                                <h2 className="text-3xl md:text-5xl font-black text-white mb-8 tracking-tight italic">這是否是您的現狀？</h2>
                                <p className="text-zinc-400 text-xl leading-relaxed">{article.pain_point}</p>
                            </motion.div>
                            <div className="grid md:grid-cols-2 gap-8 text-left">
                                <motion.div {...fadeUp} className="bg-white/[0.02] border border-white/5 rounded-[3rem] p-10 relative overflow-hidden group">
                                    <div className="text-white/5 text-9xl font-black absolute -right-6 -bottom-6 rotate-12 text-left">❌</div>
                                    <p className="text-zinc-400 text-lg leading-relaxed relative z-10">{article.example?.wrong}</p>
                                </motion.div>
                                <motion.div {...fadeUp} transition={{ delay: 0.1 }} className="bg-emerald-500/[0.03] border border-emerald-500/20 rounded-[3rem] p-10 relative overflow-hidden group shadow-[0_0_50px_rgba(16,185,129,0.05)]">
                                    <div className="text-emerald-500/10 text-9xl font-black absolute -right-6 -bottom-6 -rotate-12">✅</div>
                                    <p className="text-white text-lg leading-relaxed font-bold relative z-10 text-left">{article.example?.right}</p>
                                </motion.div>
                            </div>
                        </div>

                        {hasSteps && (
                            <div id="steps" className="space-y-12 text-left">
                                <div className="text-left mb-16">
                                    <span className="transition-label">實戰演練</span>
                                    <h2 className="text-3xl md:text-5xl font-black text-white tracking-tight italic">跟著路徑走</h2>
                                </div>
                                {article.steps.map((step: any, idx: number) => {
                                    const isDone = stepsCompleted[idx];
                                    const isActive = freeMode ? !isDone : idx === currentStep;
                                    return (
                                        <motion.div key={idx} ref={el => stepRefs.current[idx] = el}
                                            className={`relative rounded-[3.5rem] border p-12 transition-all duration-500 overflow-hidden ${isDone ? 'bg-white/[0.01] border-emerald-500/20' : isActive ? 'bg-zinc-900 border-white/20 shadow-2xl scale-[1.01]' : 'border-white/5 opacity-10 pointer-events-none'}`}>
                                            <div className="flex flex-col md:flex-row items-start gap-10">
                                                <div className={`w-16 h-16 rounded-2xl flex items-center justify-center flex-shrink-0 text-2xl font-black transition-all ${isDone ? 'bg-emerald-500 text-black' : isActive ? 'bg-white text-black' : 'bg-white/5 text-zinc-700'}`}>
                                                    {isDone ? '✓' : idx + 1}
                                                </div>
                                                <div className="flex-1">
                                                    <h3 className={`text-2xl md:text-3xl font-black mb-6 tracking-tight ${isDone ? 'text-emerald-400' : 'text-white'}`}>{step.title}</h3>
                                                    <p className="text-zinc-300 text-lg md:text-xl leading-relaxed mb-10 font-medium">{step.body}</p>
                                                    {isActive && !isDone && (
                                                        <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} onClick={() => handleStepComplete(idx)}
                                                            className="relative py-4 px-10 rounded-2xl bg-emerald-500 text-black font-black text-lg shadow-xl flex items-center gap-3">
                                                            我了解了 <MousePointer2 size={24} className="animate-bounce" />
                                                        </motion.button>
                                                    )}
                                                </div>
                                            </div>
                                        </motion.div>
                                    );
                                })}
                            </div>
                        )}
                    </div>

                    <div className="lg:col-span-4 sticky top-40 space-y-8">
                        <div className="bg-zinc-900 border border-white/10 rounded-[3rem] p-10 text-left shadow-2xl relative overflow-hidden">
                            <h3 className="text-xl font-black text-white mb-8 flex items-center gap-3">
                                <Target className="text-emerald-500" size={24} /> 當前任務手冊
                            </h3>
                            <div className="space-y-6 mb-10">
                                <div className="p-6 rounded-[2rem] bg-white/[0.03] border border-white/5">
                                    <p className="text-[10px] font-black text-emerald-500 uppercase tracking-widest mb-3">正確操作方向</p>
                                    <p className="text-zinc-200 text-base leading-relaxed font-bold italic">
                                        「{article.practice_kit?.description}」
                                    </p>
                                </div>
                                <div className="p-6 rounded-[2rem] bg-white/[0.03] border border-white/5">
                                    <p className="text-[10px] font-black text-amber-500 uppercase tracking-widest mb-3">關鍵動作詞</p>
                                    <p className="text-zinc-500 text-xs font-mono">搜尋、開啟、下載、加入好友...</p>
                                </div>
                            </div>

                            <div className={`mt-10 pt-10 border-t border-white/10 text-center ${treasurePhase === 'revealed' ? 'opacity-100' : 'opacity-30'}`} ref={treasureRef}>
                                <div className="text-8xl mb-8">{treasurePhase === 'revealed' ? '🔓' : '🔒'}</div>
                                {treasurePhase === 'revealed' ? (
                                    <button onClick={handleClaimCommand} className="w-full py-6 rounded-[2rem] bg-emerald-500 text-black font-black text-sm uppercase tracking-widest shadow-2xl hover:scale-105 transition-all">
                                        領取修行寶箱
                                    </button>
                                ) : (
                                    <p className="text-xs text-zinc-600 font-black uppercase tracking-widest text-center">需通過助教邏輯判定</p>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <AnimatePresence>
                {showAiJumpModal && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[100] flex items-center justify-center px-6 bg-black/95 backdrop-blur-3xl">
                        <motion.div initial={{ scale: 0.9 }} animate={{ scale: 1 }} className="bg-zinc-900 border border-white/10 p-12 rounded-[4rem] max-w-sm w-full shadow-2xl text-center">
                            <div className="w-20 h-20 bg-emerald-500/10 rounded-3xl flex items-center justify-center mx-auto mb-8">
                                <Check className="text-emerald-400" size={40} />
                            </div>
                            <h3 className="text-2xl font-black text-white mb-2">指令已複製！</h3>
                            <p className="text-zinc-500 mb-10 text-center">修行成功，請至工具貼上。</p>
                            <button onClick={() => setShowAiJumpModal(false)} className="w-full py-5 rounded-2xl bg-white/5 border border-white/10 text-white font-bold hover:bg-white/10">關閉</button>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default ArticleDetail;
