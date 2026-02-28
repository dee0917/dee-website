import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, ArrowRight, Copy, Check, Sparkles, Smartphone, Share2, ExternalLink, Zap, Shield, TrendingUp, Info, Rocket } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { NEWS_ARTICLES } from '../data/news';
import { INSIGHTS_LIST } from '../data/insights';
import SEO from '../components/ui/SEO';
import { ChatGPTLogo, ClaudeLogo, GeminiLogo } from '../components/AILogos';

const fadeUp = {
    initial: { opacity: 0, y: 30 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.5 }
};

const NewsDetail = () => {
    const { slug } = useParams();
    const navigate = useNavigate();
    const [article, setArticle] = useState<any>(null);
    const [copied, setCopied] = useState(false);
    const [showAiJumpModal, setShowAiJumpModal] = useState(false);

    useEffect(() => {
        const found = NEWS_ARTICLES.find(a => a.slug === slug);
        if (found) setArticle(found);
        else navigate('/news');
    }, [slug, navigate]);

    const handleCopy = () => {
        if (article?.action_prompt?.command) {
            navigator.clipboard.writeText(article.action_prompt.command);
            setCopied(true);
            setTimeout(() => setCopied(false), 3000);
            setTimeout(() => setShowAiJumpModal(true), 500);
        }
    };

    if (!article) return null;

    const themeMap: Record<string, string> = {
        blue: 'from-blue-500/20 to-indigo-500/10 text-blue-400 border-blue-500/20',
        rose: 'from-rose-500/20 to-pink-500/10 text-rose-400 border-rose-500/20',
        amber: 'from-amber-500/20 to-yellow-500/10 text-amber-400 border-amber-500/20',
        emerald: 'from-emerald-500/20 to-teal-500/10 text-emerald-400 border-emerald-500/20',
        violet: 'from-violet-500/20 to-purple-500/10 text-violet-400 border-violet-500/20',
    };

    return (
        <div className="min-h-screen bg-[#0a0a0a] text-zinc-300 pb-32">
            <SEO 
                title={article.title} 
                description={article.summary} 
                path={`/news/${article.slug}`}
                // AEO: Optimized description for answer engines
            />

            {/* Header / Hero */}
            <section className="relative pt-32 pb-20 px-6 overflow-hidden">
                <div className={`absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-gradient-to-b ${themeMap[article.themeColor]} opacity-20 pointer-events-none`} />
                <div className="max-w-4xl mx-auto relative z-10">
                    <Link to="/news" className="inline-flex items-center gap-2 text-zinc-500 hover:text-white transition-colors mb-10 group">
                        <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" /> 返回新聞中心
                    </Link>
                    
                    <div className="flex flex-wrap items-center gap-3 mb-6">
                        <span className="text-[10px] font-black px-3 py-1 rounded-full bg-white/5 border border-white/10 uppercase tracking-widest text-zinc-400">
                            {article.category}
                        </span>
                        <span className="text-[10px] font-bold text-zinc-600">{article.date} · {article.readTime}</span>
                    </div>

                    <h1 className="text-3xl md:text-5xl lg:text-6xl font-black text-white mb-8 tracking-tight leading-[1.15]">
                        {article.title}
                    </h1>
                    
                    <p className="text-xl text-zinc-400 leading-relaxed border-l-4 border-white/10 pl-6 italic">
                        {article.summary}
                    </p>
                </div>
            </section>

            {/* Content Layout */}
            <div className="max-w-4xl mx-auto px-6 grid grid-cols-1 gap-20">
                
                {/* 1. 關鍵情報 (AEO Optimized List) */}
                <motion.section {...fadeUp} className="bg-white/[0.02] border border-white/5 rounded-[2.5rem] p-8 md:p-12">
                    <div className="flex items-center gap-3 mb-8">
                        <div className="w-10 h-10 rounded-xl bg-amber-500/10 flex items-center justify-center">
                            <Zap size={20} className="text-amber-400" />
                        </div>
                        <h2 className="text-2xl font-black text-white">關鍵情報</h2>
                    </div>
                    <ul className="space-y-6">
                        {article.flash_summary.map((item: string, i: number) => (
                            <li key={i} className="flex gap-4 text-lg text-zinc-300 leading-relaxed">
                                <span className="text-amber-500 font-bold">0{i+1}.</span>
                                {item}
                            </li>
                        ))}
                    </ul>
                </motion.section>

                {/* 2. 事件解析 */}
                <motion.section {...fadeUp} className="space-y-12">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center">
                            <Info size={20} className="text-blue-400" />
                        </div>
                        <h2 className="text-2xl font-black text-white">深入解析</h2>
                    </div>
                    {article.event_breakdown.map((item: any, i: number) => (
                        <div key={i} className="space-y-4">
                            <h3 className="text-xl font-bold text-white flex items-center gap-2">
                                <span className="w-1.5 h-1.5 rounded-full bg-blue-500" /> {item.title}
                            </h3>
                            <p className="text-lg text-zinc-400 leading-relaxed pl-4 border-l border-zinc-800">
                                {item.content}
                            </p>
                        </div>
                    ))}
                </motion.section>

                {/* 3. 利益相關透視 (SEO Target) */}
                <motion.section {...fadeUp} className="grid md:grid-cols-2 gap-6">
                    {article.impact_analysis.map((impact: any, i: number) => (
                        <div key={i} className="bg-zinc-900/50 border border-white/5 p-8 rounded-3xl relative overflow-hidden group">
                            <div className="absolute -right-4 -bottom-4 opacity-5 group-hover:opacity-10 transition-opacity">
                                {impact.target === "你的隱私" ? <Shield size={120} /> : impact.target === "你的荷包" ? <TrendingUp size={120} /> : <Zap size={120} />}
                            </div>
                            <span className="text-xs font-black uppercase tracking-widest text-emerald-500 mb-4 block">對 {impact.target} 的影響</span>
                            <p className="text-white text-lg font-bold leading-relaxed relative z-10">{impact.description}</p>
                        </div>
                    ))}
                </motion.section>

                {/* 4. Dee 的評語 */}
                <motion.section {...fadeUp} className="relative">
                    <div className="absolute -left-4 top-0 bottom-0 w-1 bg-gradient-to-b from-emerald-500 to-transparent" />
                    <div className="pl-8">
                        <div className="flex items-center gap-3 mb-6">
                            <span className="text-4xl">🧪</span>
                            <h2 className="text-2xl font-black text-white">Dee's 實驗室碎碎念</h2>
                        </div>
                        <p className="text-xl text-zinc-300 leading-relaxed font-medium bg-emerald-500/5 p-8 rounded-3xl border border-emerald-500/10">
                            「 {article.dee_insight} 」
                        </p>
                    </div>
                </motion.section>

                {/* 5. 今日實踐指令 (Interactive) */}
                <motion.section {...fadeUp} className="bg-gradient-to-br from-violet-900/20 to-black border border-violet-500/30 rounded-[3rem] p-10 md:p-16 text-center shadow-2xl">
                    <Sparkles size={32} className="text-violet-400 mx-auto mb-6" />
                    <h2 className="text-3xl font-black text-white mb-4">{article.action_prompt.title}</h2>
                    <p className="text-zinc-400 text-lg mb-10">{article.action_prompt.description}</p>
                    
                    <div className="bg-black/60 border border-white/5 rounded-2xl p-8 mb-10 text-left">
                        <pre className="text-violet-200 whitespace-pre-wrap font-mono text-sm leading-relaxed">
                            {article.action_prompt.command}
                        </pre>
                    </div>

                    <button 
                        onClick={handleCopy}
                        className="bg-white text-black px-10 py-5 rounded-2xl font-black text-xl hover:bg-violet-500 hover:text-white transition-all shadow-xl flex items-center gap-3 mx-auto"
                    >
                        {copied ? <Check size={24} /> : <Copy size={24} />} {copied ? '指令已複製' : '複製實踐指令'}
                    </button>
                </motion.section>

                {/* 🚀 互動型 CTA: 想學習 AI？點我！ */}
                <motion.section 
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    className="relative py-16 md:py-24 px-5 md:px-12 rounded-[2.5rem] md:rounded-[4rem] bg-[#0f0f0f] border border-emerald-500/20 overflow-hidden group mx-[-4px] md:mx-0"
                >
                    <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/5 via-transparent to-teal-500/5 opacity-50" />
                    <div className="absolute -top-24 -right-24 w-80 h-80 bg-emerald-500/10 blur-[100px] rounded-full group-hover:bg-emerald-500/20 transition-all duration-700" />
                    
                    <div className="relative z-10 text-center">
                        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-[10px] font-black uppercase tracking-[0.3em] mb-8">
                            <Rocket size={12} /> Take the next step
                        </div>
                        <h2 className="text-3xl md:text-5xl font-black text-white mb-6 tracking-tight">
                            {article.cta_override?.title || '覺得 AI 很難懂嗎？'}
                        </h2>
                        <p className="text-zinc-400 text-base md:text-xl mb-10 max-w-2xl mx-auto leading-relaxed font-medium px-2">
                            {article.cta_override?.description || (
                                <>看新聞只是「知道」，動手做才是「學會」。<br className="hidden md:block" />
                                我在實驗室準備了 <span className="text-white">20 篇免費互動教學</span>，帶你從零變高手。</>
                            )}
                        </p>
                        
                        <div className="flex justify-center">
                            <Link to="/insights" className="relative w-full max-w-[320px] md:w-auto group/btn">
                                <div className="absolute -inset-4 bg-emerald-500/20 blur-xl rounded-full opacity-0 group-hover/btn:opacity-100 transition-all duration-500 animate-pulse" />
                                <motion.div 
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    className="relative bg-emerald-500 text-black py-5 md:py-6 px-8 md:px-12 rounded-2xl font-black text-xl md:text-2xl flex items-center justify-center gap-3 shadow-2xl"
                                >
                                    <span className="whitespace-nowrap">{article.cta_override?.button_text || '想學習 AI？點我！'}</span>
                                    <ArrowRight size={24} className="group-hover/btn:translate-x-1 transition-transform flex-shrink-0" />
                                </motion.div>
                            </Link>
                        </div>
                        
                        <div className="mt-12 flex flex-wrap items-center justify-center gap-x-6 gap-y-4 grayscale opacity-40 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-700">
                            <span className="text-[9px] md:text-[10px] font-black text-zinc-500 tracking-widest uppercase">闖關式學習</span>
                            <div className="w-1 h-1 rounded-full bg-zinc-800 hidden sm:block" />
                            <span className="text-[9px] md:text-[10px] font-black text-zinc-500 tracking-widest uppercase">領取修行勳章</span>
                            <div className="w-1 h-1 rounded-full bg-zinc-800 hidden sm:block" />
                            <span className="text-[9px] md:text-[10px] font-black text-zinc-500 tracking-widest uppercase">100% 免費</span>
                        </div>
                    </div>
                </motion.section>

                {/* 6. 真實性查證 */}
                <section className="pt-10 border-t border-white/5 flex flex-wrap items-center justify-between gap-6">
                    <div className="flex items-center gap-4">
                        <span className="text-zinc-600 text-xs font-bold uppercase tracking-widest">情報來源：</span>
                        <span className="text-zinc-400 text-sm font-bold">{article.source_name}</span>
                    </div>
                    <div className="flex gap-4">
                        <button className="text-zinc-500 hover:text-white transition-colors"><Share2 size={20} /></button>
                        <a href={article.source_url} target="_blank" rel="noopener noreferrer" className="text-zinc-500 hover:text-white transition-colors">
                            <ExternalLink size={20} />
                        </a>
                    </div>
                </section>

            </div>

            {/* AI Jump Modal */}
            <AnimatePresence>
                {showAiJumpModal && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[100] flex items-center justify-center px-6 bg-black/90 backdrop-blur-xl">
                        <motion.div initial={{ scale: 0.9, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.9, y: 20 }} className="bg-zinc-900 border border-white/10 p-8 md:p-10 rounded-[2rem] max-w-sm w-full shadow-2xl relative overflow-hidden">
                            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-emerald-500 to-blue-500" />
                            <div className="text-center mb-8">
                                <div className="w-14 h-14 bg-emerald-500/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                                    <Smartphone className="text-emerald-400" size={28} />
                                </div>
                                <h3 className="text-xl md:text-2xl font-black text-white mb-2 tracking-tight">指令已複製！</h3>
                                <p className="text-zinc-500 text-sm font-medium">選一個工具直接貼上</p>
                            </div>

                            <div className="flex justify-center gap-4">
                                {[
                                    { name: 'GPT', logo: ChatGPTLogo, app: 'chatgpt://', web: 'https://chat.openai.com' },
                                    { name: 'Claude', logo: ClaudeLogo, app: 'claude://', web: 'https://claude.ai' },
                                    { name: 'Gemini', logo: GeminiLogo, app: 'googlegemini://', web: 'https://gemini.google.com' }
                                ].map((ai, i) => (
                                    <a key={i} href={ai.web} target="_blank" rel="noopener noreferrer" onClick={(e) => {
                                        e.preventDefault();
                                        window.location.href = ai.app;
                                        setTimeout(() => window.open(ai.web, '_blank'), 2000);
                                        setShowAiJumpModal(false);
                                    }} className="flex flex-col items-center gap-2 p-3 rounded-2xl bg-white/[0.03] border border-white/5 hover:bg-white/10 transition-all group flex-1">
                                        <ai.logo size={28} />
                                        <span className="text-white font-black text-[10px] tracking-tighter">{ai.name}</span>
                                    </a>
                                ))}
                            </div>
                            <button onClick={() => setShowAiJumpModal(false)} className="mt-8 w-full py-4 text-zinc-500 font-bold text-sm hover:text-white transition-colors">關閉視窗</button>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default NewsDetail;
