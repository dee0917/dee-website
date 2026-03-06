import React, { useState, useEffect, useRef } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { 
    ArrowLeft, ArrowRight, Copy, Check, ChevronDown, Lock, Sparkles, 
    MousePointer2, Smartphone, Gamepad2, X, Target, Send, Flame,
    Terminal, BrainCircuit, ShieldCheck, HelpCircle, AlertCircle, Lightbulb,
    UserCheck, BookOpen
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
    const [treasurePhase, setTreasurePhase] = useState<'locked' | 'falling' | 'impact' | 'exploding' | 'revealed'>('locked');
    const [isPracticeMode, setIsPracticeMode] = useState(false);
    const [copied, setCopied] = useState(false);
    const [showAiJumpModal, setShowAiJumpModal] = useState(false);
    const [badgeEarned, setBadgeEarned] = useState(false);
    
    // 🧠 Optimized Mentor State
    const [messages, setMessages] = useState<{role: 'ai' | 'user', text: string}[]>([]);
    const [userInput, setUserInput] = useState('');
    const [practiceStep, setPracticeStep] = useState(0);
    const [isJudging, setIsJudging] = useState(false);
    const [currentHint, setCurrentHint] = useState('');

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
            
            // Initializing with clearer context
            setMessages([
                { 
                    role: 'ai', 
                    text: `我是您的 AI 助教。本關的目標是：\n「${finalData.practice_kit?.title}」\n\n具體實作任務：${finalData.practice_kit?.description}\n\n請直接輸入您的第一個操作動作（例如：搜尋...、點擊...）。如果您感到困惑，可以隨便輸入一個字，我會給您提示！` 
                }
            ]);
        } catch (e) {
            setArticle(null);
        } finally {
            setLoading(false);
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
            const result = await judgeUserResponse(
                article?.title || '', 
                text, 
                article?.practice_kit?.description || ''
            );
            
            setMessages(prev => [...prev, { role: 'ai', text: result.feedback }] as any);
            if (result.hint) setCurrentHint(result.hint);

            if (result.passed) {
                setPracticeStep(prev => prev + 1);
                if (practiceStep >= 1) {
                    triggerSuccess();
                }
            }
        } catch (e) {
            setMessages(prev => [...prev, { role: 'ai', text: "判官似乎被其他學員叫走了，請再試一次。" }] as any);
        } finally {
            setIsJudging(false);
        }
    };

    const triggerSuccess = () => {
        confetti({ particleCount: 150, spread: 70, origin: { y: 0.6 } });
        setTreasurePhase('revealed');
    };

    const handleClaimCommand = () => {
        if (article?.practice_kit?.command) {
            navigator.clipboard.writeText(article.practice_kit.command);
            setCopied(true);
            setTimeout(() => setCopied(false), 3000);
            setTimeout(() => setShowAiJumpModal(true), 500);
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

    if (loading) return <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center text-white font-mono text-xs tracking-widest animate-pulse">BOOTING_MENTOR...</div>;
    if (!article) return <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center text-white font-bold">404</div>;

    return (
        <div className="min-h-screen bg-[#0a0a0a] text-zinc-300">
            <SEO title={article.title} description={article.summary} path={`/insights/${article.id}`} />
            
            <section className="pt-32 pb-10 px-6 max-w-5xl mx-auto flex flex-col items-center">
                <Link to="/insights" className="self-start text-[10px] font-black uppercase tracking-[0.4em] text-zinc-600 hover:text-white mb-10 flex items-center gap-2">
                    <ArrowLeft size={14} /> Back to Map
                </Link>

                <h1 className="text-4xl md:text-7xl font-black text-white mb-12 tracking-tighter text-center leading-tight">
                    {article.title}
                </h1>

                <div className="bg-white/5 p-1.5 rounded-[2rem] border border-white/10 flex items-center gap-4 mb-16 shadow-2xl">
                    <button onClick={() => setIsPracticeMode(false)} className={`px-8 py-3 rounded-2xl text-xs font-black transition-all ${!isPracticeMode ? 'bg-white text-black shadow-xl' : 'text-zinc-500 hover:text-white'}`}>文章閱讀</button>
                    <button onClick={() => setIsPracticeMode(true)} className={`px-8 py-3 rounded-2xl text-xs font-black transition-all ${isPracticeMode ? 'bg-emerald-500 text-black shadow-xl' : 'text-zinc-500 hover:text-white'} flex items-center gap-2`}>
                        <Flame size={14} /> 互動演練
                    </button>
                </div>

                <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
                    <div className="lg:col-span-8">
                        {isPracticeMode ? (
                            <div className="bg-[#0f0f0f] border border-white/10 rounded-[3.5rem] overflow-hidden shadow-[0_0_80px_rgba(0,0,0,0.8)] relative">
                                <div className="bg-zinc-900 px-10 py-6 border-b border-white/5 flex items-center justify-between">
                                    <div className="flex items-center gap-5">
                                        <div className="w-12 h-12 rounded-2xl bg-emerald-500 flex items-center justify-center text-black">
                                            <UserCheck size={24} />
                                        </div>
                                        <div className="text-left">
                                            <h4 className="text-white font-black text-sm uppercase tracking-widest">Dee's Lab 專屬助教</h4>
                                            <p className="text-[10px] text-emerald-500 font-bold uppercase tracking-widest animate-pulse">Online & Analysis</p>
                                        </div>
                                    </div>
                                    <div className="flex gap-2 bg-black/40 px-4 py-2 rounded-xl border border-white/5">
                                        {[...Array(2)].map((_, i) => (
                                            <StarIcon key={i} size={14} className={i < practiceStep ? 'text-emerald-400' : 'text-zinc-800'} fill="currentColor" />
                                        ))}
                                    </div>
                                </div>

                                <div className="h-[450px] overflow-y-auto p-10 space-y-8 text-left scrollbar-hide">
                                    {messages.map((m, i) => (
                                        <motion.div key={i} initial={{ opacity: 0, x: m.role === 'ai' ? -10 : 10 }} animate={{ opacity: 1, x: 0 }}
                                            className={`flex ${m.role === 'ai' ? 'justify-start' : 'justify-end'}`}
                                        >
                                            <div className={`max-w-[85%] p-6 rounded-[2.2rem] text-base leading-relaxed ${
                                                m.role === 'ai' 
                                                ? 'bg-zinc-800 text-zinc-200 rounded-tl-none border border-white/5' 
                                                : 'bg-emerald-500 text-black font-bold rounded-tr-none'
                                            }`}>
                                                {m.text.split('\n').map((line, li) => <p key={li} className="mb-2 last:mb-0">{line}</p>)}
                                            </div>
                                        </motion.div>
                                    ))}
                                    {isJudging && (
                                        <div className="flex justify-start">
                                            <div className="bg-zinc-800/50 p-5 rounded-2xl rounded-tl-none border border-white/5 flex items-center gap-4">
                                                <div className="flex gap-1"><div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-bounce" /><div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-bounce delay-75" /><div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-bounce delay-150" /></div>
                                                <span className="text-[10px] font-black text-zinc-500 uppercase tracking-widest">助教正在審核邏輯...</span>
                                            </div>
                                        </div>
                                    )}
                                    <div ref={chatEndRef} />
                                </div>

                                <div className="p-8 bg-black/60 border-t border-white/5">
                                    <div className="relative">
                                        <textarea 
                                            value={userInput}
                                            onChange={(e) => setUserInput(e.target.value)}
                                            onKeyDown={(e) => {
                                                if (e.key === 'Enter' && !e.shiftKey) {
                                                    e.preventDefault();
                                                    handleSendMessage();
                                                }
                                            }}
                                            placeholder="在此輸入您的實體操作路徑（Enter 發送）..."
                                            className="w-full bg-white/[0.03] border border-white/10 rounded-[2.2rem] p-6 pr-20 text-white focus:border-emerald-500/50 outline-none resize-none h-24 transition-all"
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
                            <div className="bg-white/[0.02] border border-white/5 rounded-[4rem] p-12 text-left relative overflow-hidden">
                                <h2 className="text-3xl font-black text-white mb-10 flex items-center gap-4 relative z-10"><Sparkles className="text-emerald-500" /> 核心學習重點</h2>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 relative z-10">
                                    {article.steps?.map((s: any, i: number) => (
                                        <div key={i} className="p-8 rounded-3xl bg-black/40 border border-white/5 hover:border-emerald-500/30 transition-all group">
                                            <span className="text-emerald-500 font-mono text-[10px] font-black block mb-4 tracking-[0.5em]">POINT 0{i+1}</span>
                                            <h3 className="text-xl font-black text-white mb-2 group-hover:text-emerald-400 transition-colors">{s.title}</h3>
                                            <p className="text-zinc-400 leading-relaxed">{s.body}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>

                    <div className="lg:col-span-4 sticky top-40 space-y-8">
                        <div className="bg-zinc-900 border border-white/10 rounded-[3rem] p-8 text-left shadow-2xl relative overflow-hidden">
                            <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 to-transparent pointer-events-none" />
                            <h3 className="text-xl font-black text-white mb-6 flex items-center gap-3">
                                <Target className="text-emerald-500" size={20} /> 本關修煉任務
                            </h3>
                            <div className="space-y-4 mb-8">
                                <div className="p-5 rounded-2xl bg-white/[0.03] border border-white/5 shadow-inner">
                                    <p className="text-xs font-black text-emerald-500 uppercase tracking-widest mb-2">【目標操作】</p>
                                    <p className="text-zinc-300 text-sm leading-relaxed font-bold">{article.practice_kit?.description}</p>
                                </div>
                                <AnimatePresence>
                                    {currentHint && (
                                        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                                            className="p-5 rounded-2xl bg-amber-500/10 border border-amber-500/30"
                                        >
                                            <p className="text-xs text-amber-200/80 leading-relaxed italic font-medium">
                                                <Lightbulb className="inline-block mr-2 mb-1" size={12} />
                                                判官提示：{currentHint}
                                            </p>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>

                            <div className={`mt-10 pt-10 border-t border-white/10 text-center ${treasurePhase === 'revealed' ? 'opacity-100' : 'opacity-30'}`}>
                                <div className="text-7xl mb-8">{treasurePhase === 'revealed' ? '🔓' : '🔒'}</div>
                                {treasurePhase === 'revealed' ? (
                                    <div className="space-y-6">
                                        <p className="text-xs text-emerald-400 font-black uppercase tracking-widest animate-pulse">任務達成！祕術已解鎖</p>
                                        <button onClick={handleClaimCommand} className="w-full py-5 rounded-2xl bg-emerald-500 text-black font-black text-xs uppercase tracking-widest shadow-[0_0_30px_rgba(16,185,129,0.3)] hover:scale-105 transition-all">
                                            領取指令寶箱
                                        </button>
                                    </div>
                                ) : (
                                    <p className="text-[10px] text-zinc-600 font-bold uppercase tracking-widest">請先通過助教邏輯審核</p>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <AnimatePresence>
                {showAiJumpModal && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[100] flex items-center justify-center px-6 bg-black/95 backdrop-blur-2xl">
                        <motion.div initial={{ scale: 0.9, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.9, y: 20 }} className="bg-zinc-900 border border-white/10 p-10 rounded-[3.5rem] max-w-sm w-full shadow-2xl relative overflow-hidden">
                            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-emerald-500 to-blue-500" />
                            <button onClick={() => setShowAiJumpModal(false)} className="absolute top-8 right-8 text-zinc-500 hover:text-white transition-colors"><X size={28} /></button>
                            <div className="text-center mb-10">
                                <div className="w-16 h-16 bg-emerald-500/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
                                    <Smartphone className="text-emerald-400" size={32} />
                                </div>
                                <h3 className="text-2xl font-black text-white mb-3 tracking-tight">指令已複製！</h3>
                                <p className="text-zinc-500 text-sm font-medium">請切換至工具直接貼上</p>
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
