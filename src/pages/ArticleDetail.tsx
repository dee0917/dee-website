import React, { useState, useEffect, useRef, useMemo } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { 
    ArrowLeft, ArrowRight, Copy, Check, ChevronDown, Lock, Sparkles, 
    MousePointer2, Smartphone, Gamepad2, X, MessageSquare, Target, 
    Trophy, Flame, RotateCcw, Send
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import { api } from '../lib/supabase';
import { INSIGHTS } from '../data/mock';
import { MAIN_QUEST_ORDER, CHAPTERS, SIDE_QUEST_IDS } from '../data/insights';
import SEO from '../components/ui/SEO';
import { ChatGPTLogo, ClaudeLogo, GeminiLogo } from '../components/AILogos';
import { useIdentity } from '../context/IdentityContext';

const ArticleDetail = () => {
    const { id } = useParams();
    const { persona } = useIdentity();
    const [article, setArticle] = useState<any | null>(null);
    const [loading, setLoading] = useState(true);
    const [copied, setCopied] = useState(false);
    const [progress, setProgress] = useState(0);
    const [isPracticeMode, setIsPracticeMode] = useState(false);
    
    // Practice Mode State (Google Translate Style)
    const [messages, setMessages] = useState<{role: 'ai' | 'user', text: string}[]>([]);
    const [userInput, setUserInput] = useState('');
    const [practiceStep, setPracticeStep] = useState(0);
    const [showAiJumpModal, setShowAiJumpModal] = useState(false);

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
            
            // Initialize Practice Mode
            setMessages([
                { role: 'ai', text: `您好！我是您的 AI 導師。在這一關，我們將模擬「${finalData.title}」的真實場景。準備好了嗎？` }
            ]);
        } catch (e) {
            setArticle(null);
        } finally {
            setLoading(false);
        }
    };

    const handleSendMessage = () => {
        if (!userInput.trim()) return;
        const newMessages = [...messages, { role: 'user', text: userInput }];
        setMessages(newMessages as any);
        setUserInput('');
        
        // Mock AI Feedback (Duolingo Style)
        setTimeout(() => {
            setMessages([...newMessages, { 
                role: 'ai', 
                text: "太棒了！您的回覆非常得體。這正是我們在課程中提到的核心邏輯。讓我們繼續下一步..." 
            }] as any);
            setPracticeStep(prev => prev + 1);
            if (practiceStep >= 2) {
                confetti({ particleCount: 150, spread: 70, origin: { y: 0.6 } });
            }
        }, 1000);
    };

    if (loading) return <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center text-white font-mono text-xs tracking-widest animate-pulse">SYNCING_DATA...</div>;
    if (!article) return <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center text-white font-bold">404</div>;

    return (
        <div className="min-h-screen bg-[#0a0a0a] text-zinc-300 selection:bg-emerald-500/30">
            <SEO title={article.title} description={article.summary} path={`/insights/${article.id}`} />
            
            {/* 1. Header & Toggle */}
            <section className="pt-40 pb-10 px-6 max-w-5xl mx-auto flex flex-col items-center">
                <Link to="/insights" className="self-start inline-flex items-center gap-2 text-zinc-500 hover:text-white transition-colors mb-8 group text-[10px] font-black uppercase tracking-[0.3em]">
                    <ArrowLeft size={14} /> 返回修煉地圖
                </Link>

                <div className="text-center mb-12">
                    <h1 className="text-4xl md:text-6xl font-black text-white mb-6 tracking-tighter">{article.title}</h1>
                    <div className="flex items-center justify-center gap-4 bg-white/5 p-1.5 rounded-2xl border border-white/10 w-fit mx-auto">
                        <button onClick={() => setIsPracticeMode(false)} className={`px-6 py-2 rounded-xl text-xs font-black transition-all ${!isPracticeMode ? 'bg-white text-black shadow-lg' : 'text-zinc-500'}`}>經典模式</button>
                        <button onClick={() => setIsPracticeMode(true)} className={`px-6 py-2 rounded-xl text-xs font-black transition-all ${isPracticeMode ? 'bg-emerald-500 text-black shadow-lg' : 'text-zinc-500'} flex items-center gap-2`}>
                            <Flame size={14} /> 互動演練 (Beta)
                        </button>
                    </div>
                </div>

                {/* 🎮 Google Translate / Duolingo Style Practice Interface */}
                {isPracticeMode ? (
                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                        className="w-full max-w-2xl bg-zinc-900/50 border border-white/10 rounded-[3rem] overflow-hidden shadow-2xl"
                    >
                        {/* Status Bar */}
                        <div className="bg-white/5 px-8 py-4 flex items-center justify-between border-b border-white/5">
                            <div className="flex items-center gap-4">
                                <Target size={18} className="text-emerald-500" />
                                <span className="text-xs font-black text-white uppercase tracking-widest">目標 04 : {practiceStep}/4</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <Flame size={16} className="text-orange-500" />
                                <span className="text-xs font-bold text-orange-500">STREAK: 2</span>
                            </div>
                        </div>

                        {/* Chat Area */}
                        <div className="h-[400px] overflow-y-auto p-8 space-y-6 scrollbar-hide">
                            {messages.map((m, i) => (
                                <motion.div key={i} initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
                                    className={`flex ${m.role === 'ai' ? 'justify-start' : 'justify-end'}`}
                                >
                                    <div className={`max-w-[80%] p-5 rounded-3xl text-lg font-medium leading-relaxed ${m.role === 'ai' ? 'bg-white/5 text-zinc-200 rounded-tl-none' : 'bg-emerald-500 text-black font-black rounded-tr-none shadow-xl shadow-emerald-500/10'}`}>
                                        {m.text}
                                    </div>
                                </motion.div>
                            ))}
                        </div>

                        {/* Input Area */}
                        <div className="p-8 bg-black/40 border-t border-white/5">
                            <div className="relative">
                                <textarea 
                                    value={userInput}
                                    onChange={(e) => setUserInput(e.target.value)}
                                    placeholder="輸入您的回覆，模擬真實對話..."
                                    className="w-full bg-white/5 border border-white/10 rounded-2xl p-5 pr-16 text-white placeholder:text-zinc-600 focus:border-emerald-500 outline-none transition-all resize-none h-32"
                                />
                                <button onClick={handleSendMessage}
                                    className="absolute bottom-4 right-4 p-3 bg-emerald-500 text-black rounded-xl hover:bg-emerald-400 transition-all shadow-lg active:scale-95"
                                >
                                    <Send size={20} />
                                </button>
                            </div>
                            <p className="mt-4 text-[10px] text-zinc-500 text-center uppercase tracking-widest">說點什麼，或試著完成當前場景任務</p>
                        </div>
                    </motion.div>
                ) : (
                    /* 📖 Classic Content Mode */
                    <div className="w-full space-y-20">
                        <div className="text-center max-w-3xl mx-auto">
                            <p className="text-2xl md:text-3xl text-zinc-300 italic font-serif leading-relaxed border-l-4 border-emerald-500 pl-8 text-left">
                                {article.summary}
                            </p>
                        </div>
                        
                        <div className="bg-white/[0.02] border border-white/5 rounded-[4rem] p-12 text-left">
                             <h2 className="text-3xl font-black text-white mb-10 flex items-center gap-4">
                                <Sparkles className="text-emerald-500" /> 核心學習重點
                             </h2>
                             <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                {article.steps?.map((s: any, i: number) => (
                                    <div key={i} className="p-8 rounded-3xl bg-black/40 border border-white/5 hover:border-emerald-500/20 transition-all">
                                        <span className="text-emerald-500 font-mono text-xs font-black block mb-4">POINT 0{i+1}</span>
                                        <h3 className="text-xl font-black text-white mb-2">{s.title}</h3>
                                        <p className="text-zinc-400 leading-relaxed">{s.body}</p>
                                    </div>
                                ))}
                             </div>
                        </div>
                    </div>
                )}
            </section>

            {/* 6. Navigation */}
            <section className="pb-32 px-6">
                <div className="max-w-5xl mx-auto border-t border-white/5 pt-20 flex justify-center">
                     <button onClick={() => setIsPracticeMode(!isPracticeMode)}
                        className="group flex items-center gap-6 bg-white/5 border border-white/10 px-10 py-6 rounded-[2.5rem] hover:bg-white/10 transition-all"
                     >
                        <div className="w-12 h-12 rounded-2xl bg-emerald-500 flex items-center justify-center text-black shadow-lg shadow-emerald-500/20">
                            {isPracticeMode ? <MessageSquare size={24} /> : <Flame size={24} />}
                        </div>
                        <div className="text-left">
                            <span className="text-[10px] font-black text-zinc-500 uppercase tracking-widest block">Switch Methodology</span>
                            <h3 className="text-xl font-black text-white">{isPracticeMode ? '切換回經典文章閱讀' : '切換至 Google 互動練習'}</h3>
                        </div>
                     </button>
                </div>
            </section>
        </div>
    );
};

export default ArticleDetail;
