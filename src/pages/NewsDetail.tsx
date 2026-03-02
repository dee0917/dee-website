import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, ArrowRight, Copy, Check, Sparkles, Share2, ExternalLink, Zap, Info, Clock, X, Facebook, Twitter, Coffee, Rocket, MessageSquare, Quote, Notebook, UserCheck, Flame } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { NEWS_ARTICLES } from '../data/news';
import SEO from '../components/ui/SEO';
import { ChatGPTLogo, ClaudeLogo, GeminiLogo } from '../components/AILogos';

const fadeUp = {
    initial: { opacity: 0, y: 15 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.4 }
};

const EchoModuleRenderer = ({ module }: { module: any }) => {
    switch (module.type) {
        case 'field_notes':
            return (
                <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                    className="relative p-8 md:p-12 rounded-[3.5rem] bg-gradient-to-br from-indigo-900/40 via-black to-black border border-indigo-500/30 overflow-hidden shadow-2xl my-12 group">
                    <div className="absolute top-0 right-0 p-12 opacity-5">
                        <Notebook size={150} className="text-indigo-400 group-hover:rotate-6 transition-transform duration-700" />
                    </div>
                    <div className="relative z-10">
                        <div className="flex items-center gap-3 mb-4">
                            <span className="text-3xl">🕵️</span>
                            <h3 className="text-2xl md:text-3xl font-black text-white tracking-tighter uppercase">{module.title || "Echo's Field Notes"}</h3>
                        </div>
                        <p className="text-xl md:text-2xl text-zinc-200 leading-relaxed font-medium italic mb-10 pl-6 border-l-2 border-indigo-500/50">
                            {module.content}
                        </p>
                        {module.items && (
                            <div className="space-y-4">
                                {module.items.map((item: any, i: number) => (
                                    <div key={i} className="flex items-center justify-between p-6 rounded-2xl bg-white/[0.03] border border-white/5 hover:border-indigo-500/30 transition-all">
                                        <div className="flex items-center gap-4">
                                            <span className="text-2xl">{item.icon || '📍'}</span>
                                            <span className="text-zinc-300 font-black text-lg">{item.label}</span>
                                        </div>
                                        <span className="text-white font-mono font-bold">{item.value}</span>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </motion.div>
            );
        case 'comparison':
            return (
                <motion.div initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }}
                    className="my-12 grid grid-cols-1 md:grid-cols-2 gap-4">
                    {module.items.map((item: any, i: number) => (
                        <div key={i} className={`p-8 rounded-[3rem] border ${i === 0 ? 'bg-emerald-500/5 border-emerald-500/20' : 'bg-rose-500/5 border-rose-500/20'} relative overflow-hidden`}>
                             <div className={`absolute -right-4 -bottom-4 text-8xl opacity-5 font-black`}>{i === 0 ? '✓' : '✗'}</div>
                             <div className="flex items-center gap-4 mb-4">
                                <span className="text-4xl">{item.icon}</span>
                                <h4 className={`text-xl font-black ${i === 0 ? 'text-emerald-400' : 'text-rose-400'}`}>{item.label}</h4>
                             </div>
                             <p className="text-lg text-zinc-300 font-medium leading-relaxed">{item.value}</p>
                        </div>
                    ))}
                </motion.div>
            );
        case 'status_check':
             return (
                <motion.div initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                    className="p-8 rounded-[2.5rem] bg-zinc-900 border border-white/10 shadow-xl my-10 relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-1.5 h-full bg-amber-500" />
                    <div className="flex items-center gap-3 mb-6">
                        <UserCheck size={24} className="text-amber-500" />
                        <h3 className="text-xl font-black text-white uppercase tracking-widest">{module.title || "Status Check"}</h3>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                        {module.items.map((item: any, i: number) => (
                            <div key={i} className="text-left">
                                <span className="text-[10px] font-black text-zinc-500 uppercase tracking-widest block mb-1">{item.label}</span>
                                <span className="text-lg font-black text-white">{item.value}</span>
                            </div>
                        ))}
                    </div>
                </motion.div>
             );
        default:
            return null;
    }
};

const NewsDetail = () => {
    const { slug } = useParams();
    const navigate = useNavigate();
    const [article, setArticle] = useState<any>(null);
    const [copied, setCopied] = useState(false);
    const [shareCopied, setShareCopied] = useState(false);
    const [showAiJumpModal, setShowAiJumpModal] = useState(false);

    useEffect(() => {
        const found = NEWS_ARTICLES.find(a => a.slug === slug);
        if (found) setArticle(found);
        else navigate('/news');
    }, [slug, navigate]);

    const integratedFeed = React.useMemo(() => {
        if (!article) return [];
        const relatedByTrend = NEWS_ARTICLES.filter(a => a.trend_cluster === article.trend_cluster && a.slug !== slug);
        const explicitRelated = article.related_slugs ? NEWS_ARTICLES.filter(a => article.related_slugs.includes(a.slug)) : [];
        const baseFeed = Array.from(new Set([...relatedByTrend, ...explicitRelated]));
        const others = NEWS_ARTICLES.filter(a => a.slug !== slug && !baseFeed.find(b => b.slug === a.slug));
        return [...baseFeed, ...others].slice(0, 10);
    }, [article, slug]);

    if (!article) return null;

    const currentUrl = window.location.href;

    const themeMap: Record<string, string> = {
        blue: 'from-blue-500/10 text-blue-400 border-blue-500/20',
        rose: 'from-rose-500/10 text-rose-400 border-rose-500/20',
        amber: 'from-amber-500/10 text-amber-400 border-amber-500/20',
        emerald: 'from-emerald-500/10 text-emerald-400 border-emerald-500/20',
        violet: 'from-violet-500/10 text-violet-400 border-violet-500/20',
    };

    const handleCopy = () => {
        if (article?.action_prompt?.command) {
            navigator.clipboard.writeText(article.action_prompt.command);
            setCopied(true);
            setTimeout(() => setCopied(false), 3000);
            setTimeout(() => setShowAiJumpModal(true), 500);
        }
    };

    return (
        <div className="min-h-screen bg-[#0a0a0a] text-zinc-300 pb-12 overflow-x-hidden selection:bg-indigo-500/30">
            <SEO title={article.title} description={article.summary} path={`/news/${article.slug}`} />

            {/* 1. Header (Balance Layout) */}
            <section className="relative pt-32 pb-6 px-6 overflow-hidden border-b border-white/5 text-left">
                <div className={`absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-gradient-to-b ${themeMap[article.themeColor] || 'from-zinc-500/10'} opacity-10 pointer-events-none`} />
                <div className="max-w-6xl mx-auto relative z-10 text-left">
                    <button onClick={() => navigate(-1)} className="inline-flex items-center gap-2 text-zinc-500 hover:text-white transition-colors mb-6 text-xs font-black uppercase tracking-widest">
                        <ArrowLeft size={14} /> Back
                    </button>
                    
                    <div className="flex flex-wrap items-center gap-3 mb-6 text-left">
                        <span className="text-[10px] font-black px-3 py-1 rounded-full bg-white/5 border border-white/10 uppercase tracking-widest text-zinc-400">
                            {article.category}
                        </span>
                        {article.trend_cluster && (
                            <Link to={`/news?trend=${encodeURIComponent(article.trend_cluster)}`} className="text-[10px] font-black px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 uppercase tracking-widest text-indigo-400 hover:bg-indigo-500/20">
                                🔗 {article.trend_cluster}
                            </Link>
                        )}
                        <span className="text-xs font-bold text-zinc-500 font-mono ml-1">{article.publish_time || article.date} (TST)</span>
                    </div>

                    <h1 className="text-3xl md:text-7xl font-black text-white mb-6 tracking-tighter leading-[1.05] text-left">
                        {article.title}
                    </h1>

                    <div className="flex items-center gap-3">
                        <a href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(currentUrl)}`} target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-xl bg-white/5 flex items-center justify-center text-zinc-400 hover:bg-[#1877F2] hover:text-white transition-all shadow-lg border border-white/5 text-left"><Facebook size={16} /></a>
                        <a href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(currentUrl)}&text=${encodeURIComponent(article.title)}`} target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-xl bg-white/5 flex items-center justify-center text-zinc-400 hover:bg-black hover:text-white transition-all shadow-lg border border-white/5 text-left"><Twitter size={16} /></a>
                        <button onClick={() => { navigator.clipboard.writeText(currentUrl); setShareCopied(true); setTimeout(() => setShareCopied(false), 2000); }} className={`w-9 h-9 rounded-xl flex items-center justify-center transition-all border border-white/5 shadow-lg ${shareCopied ? 'bg-emerald-500 text-black' : 'bg-white/5 text-zinc-400 hover:bg-emerald-500'}`}>{shareCopied ? <Check size={16} /> : <Share2 size={16} />}</button>
                    </div>
                </div>
            </section>

            <div className="max-w-6xl mx-auto px-6 py-12 text-left">
                <div className="max-w-4xl space-y-16">
                    
                    {/* 2. Summary (Large Typography) */}
                    <div className="text-left">
                        <p className="text-2xl md:text-4xl text-white/90 leading-relaxed border-l-8 border-emerald-500 pl-8 italic font-medium text-left tracking-tight">
                            {article.summary}
                        </p>
                    </div>

                    {/* 🚀 動態模組渲染器 (Dynamic Module Injection - 排除 Field Notes) */}
                    {article.echo_modules?.filter((m: any) => m.type !== 'field_notes').map((module: any, idx: number) => (
                        <EchoModuleRenderer key={idx} module={module} />
                    ))}

                    {/* 3. Flash Summary */}
                    <motion.section {...fadeUp} className="bg-white/[0.02] border border-white/10 rounded-[4rem] p-8 md:p-12 text-left shadow-2xl relative overflow-hidden group">
                        <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:scale-110 transition-transform duration-1000">
                            <Zap size={150} className="text-amber-400" />
                        </div>
                        <div className="flex items-center gap-3 mb-10 text-left">
                            <div className="w-10 h-10 rounded-xl bg-amber-500/20 flex items-center justify-center">
                                <Zap size={20} className="text-amber-400" />
                            </div>
                            <h2 className="text-2xl font-black text-white uppercase tracking-widest text-left">戰略情報摘要</h2>
                        </div>
                        <ul className="space-y-8 text-left">
                            {article.flash_summary.map((item: string, i: number) => (
                                <li key={i} className="flex gap-8 text-xl md:text-2xl text-zinc-300 leading-relaxed text-left font-medium">
                                    <span className="text-emerald-500 font-black font-mono text-left pt-1">0{i+1}</span>
                                    {item}
                                </li>
                            ))}
                        </ul>
                    </motion.section>

                    {/* 4. Event Breakdown */}
                    <motion.section {...fadeUp} className="space-y-16 text-left">
                        <div className="flex items-center gap-3 text-left mb-4">
                            <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 flex items-center justify-center">
                                <Info size={24} className="text-emerald-500" />
                            </div>
                            <h2 className="text-3xl font-black text-white text-left tracking-tight">深度事件解析</h2>
                        </div>
                        {article.event_breakdown.map((item: any, i: number) => (
                            <div key={i} className="space-y-8 text-left group">
                                <h3 className="text-2xl md:text-3xl font-black text-white flex items-center gap-6 text-left">
                                    <div className="w-2 h-8 bg-emerald-500 rounded-full group-hover:scale-y-150 transition-transform origin-bottom" /> 
                                    {item.title}
                                </h3>
                                <div className="text-xl md:text-2xl text-zinc-300 leading-[1.8] space-y-6 text-left font-medium pl-8 border-l border-white/5">
                                    {item.content.split('。').map((sentence: string, sidx: number) => (
                                        sentence.length > 2 && <p key={sidx} className="text-left">{sentence}。</p>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </motion.section>

                    {/* 🚀 艾可隨查員筆記 (Field Notes) - 注入於解析後指令前 */}
                    {article.echo_modules?.filter((m: any) => m.type === 'field_notes').map((module: any, idx: number) => (
                        <EchoModuleRenderer key={`field-note-${idx}-${article.slug}`} module={module} />
                    ))}

                    {/* 5. 今日實踐指令 (Treasure Box) */}
                    <motion.section {...fadeUp} className="relative rounded-[4rem] border border-white/10 bg-[#0d0d0d] overflow-hidden group shadow-[0_0_80px_rgba(139,92,246,0.05)] text-left">
                        {article.action_prompt?.image_url && (
                            <div className="w-full h-64 md:h-96 relative overflow-hidden">
                                <img src={article.action_prompt.image_url} alt="Reference" className="w-full h-full object-cover grayscale opacity-20 group-hover:opacity-40 transition-all duration-1000 scale-105 group-hover:scale-100" />
                                <div className="absolute inset-0 bg-gradient-to-t from-[#0d0d0d] via-[#0d0d0d]/50 to-transparent" />
                            </div>
                        )}
                        <div className="p-10 md:p-20 text-center relative z-10">
                            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-violet-500/10 border border-violet-500/20 text-violet-400 text-[10px] font-black uppercase tracking-[0.3em] mb-8">
                                <Flame size={12} className="animate-pulse" /> 艾可代碼實驗室
                            </div>
                            <h2 className="text-4xl md:text-6xl font-black text-white mb-6 text-center tracking-tighter leading-tight">{article.action_prompt?.title}</h2>
                            <p className="text-zinc-400 text-xl md:text-2xl mb-12 max-w-2xl mx-auto text-center leading-relaxed">{article.action_prompt?.description}</p>
                            <div className="bg-black/80 backdrop-blur-xl border border-white/10 rounded-3xl p-8 md:p-12 mb-12 text-left relative overflow-hidden shadow-inner ring-1 ring-white/5">
                                <pre className="text-violet-300 whitespace-pre-wrap font-mono text-sm md:text-lg leading-relaxed text-left">{article.action_prompt?.command}</pre>
                            </div>
                            <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} onClick={handleCopy} 
                                className="group/btn relative bg-white text-black px-16 py-6 rounded-3xl font-black text-2xl hover:bg-emerald-500 hover:text-white transition-all shadow-2xl flex items-center gap-4 mx-auto">
                                {copied ? <Check size={28} strokeWidth={3} /> : <Copy size={28} />} {copied ? '指令已成功複製' : '領取指令寶箱'}
                            </motion.button>
                        </div>
                    </motion.section>

                    {article.custom_content && (
                        <motion.section {...fadeUp} dangerouslySetInnerHTML={{ __html: article.custom_content }} />
                    )}

                    {/* 🚀 6. CTA (Massive Button) */}
                    <motion.section {...fadeUp} className="relative py-24 px-8 md:px-20 rounded-[5rem] bg-gradient-to-br from-zinc-900 via-[#0a0a0a] to-black border border-white/10 overflow-hidden text-center shadow-2xl">
                        <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-20 pointer-events-none" />
                        <div className="relative z-10 text-center">
                            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-zinc-500 text-[10px] font-black uppercase tracking-[0.5em] mb-12 text-center">
                                <Rocket size={14} className="text-emerald-500" /> Strategic Evolution
                            </div>
                            <h2 className="text-4xl md:text-7xl font-black text-white mb-8 text-center tracking-tighter leading-[1.1]">{article.cta_override?.title || '想學習 AI？'}</h2>
                            <p className="text-zinc-400 text-xl md:text-3xl mb-16 max-w-2xl mx-auto text-center leading-relaxed font-medium">{article.cta_override?.description}</p>
                            <div className="flex justify-center">
                                <Link to="/insights" className="group/btn relative inline-flex items-center justify-center">
                                    <div className="absolute -inset-10 bg-emerald-500/20 blur-[100px] rounded-full opacity-0 group-hover/btn:opacity-100 transition-all duration-1000 animate-pulse" />
                                    <div className="relative bg-emerald-500 text-black px-16 py-7 rounded-[2.5rem] font-black text-2xl flex items-center gap-6 shadow-2xl hover:bg-emerald-400 hover:scale-105 transition-all">
                                        <span>{article.cta_override?.button_text || '立即進入實驗室學習'}</span>
                                        <ArrowRight size={32} />
                                    </div>
                                </Link>
                            </div>
                        </div>
                    </motion.section>

                    {/* 7. Footer Meta */}
                    <section className="pt-16 border-t border-white/10 flex flex-wrap items-center justify-between gap-10 opacity-60 hover:opacity-100 transition-opacity text-left">
                        <div className="flex items-center gap-6 text-left font-black text-sm tracking-widest">
                            <span className="text-zinc-500 uppercase">情報查證來源：</span>
                            <a href={article.source_url} target="_blank" rel="noopener noreferrer" className="text-zinc-300 hover:text-emerald-400 transition-all flex items-center gap-3 border-b-2 border-white/10 hover:border-emerald-500/50 pb-2">
                                {article.source_name} <ExternalLink size={16} />
                            </a>
                        </div>
                        <p className="text-xs text-zinc-600 font-bold italic text-left uppercase tracking-tighter">Verified by Echo & Steward System · 24H Global Monitor</p>
                    </section>
                </div>
            </div>

            {/* 8. Related Feed */}
            <section className="max-w-6xl mx-auto px-6 mt-40 pt-24 border-t border-white/10 text-left">
                <div className="flex items-center justify-between mb-20 text-left">
                    <h2 className="text-4xl md:text-5xl font-black text-white flex items-center gap-6 text-left tracking-tighter uppercase">
                        <div className="w-16 h-16 rounded-3xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-left shadow-lg">
                            <Sparkles size={32} className="text-indigo-400" />
                        </div>
                        戰略相關情報脈絡
                    </h2>
                    <Link to="/news" className="text-zinc-500 hover:text-white font-black text-xs flex items-center gap-3 transition-colors text-left uppercase tracking-widest border-b border-white/10 pb-2">View Full Intelligence <ArrowRight size={16} /></Link>
                </div>
                
                <div className="grid grid-cols-1 gap-12 text-left">
                    {integratedFeed.map((news: any, i: number) => (
                        <FeedCard key={news.slug} article={news} idx={i} />
                    ))}
                </div>
            </section>

            {/* 9. Support Station */}
            <section className="max-w-5xl mx-auto px-6 mt-40 pb-40 text-center">
                <motion.div {...fadeUp} className="p-20 rounded-[5rem] bg-gradient-to-b from-amber-500/[0.08] to-transparent border border-amber-500/20 relative overflow-hidden group shadow-2xl">
                    <div className="absolute top-0 right-0 p-20 opacity-5 group-hover:rotate-12 transition-transform duration-1000"><Coffee size={200} className="text-amber-500" /></div>
                    <div className="relative z-10 text-center flex items-center justify-center flex-col">
                        <div className="w-24 h-24 rounded-[2.5rem] bg-amber-500/20 flex items-center justify-center mx-auto mb-10 group-hover:scale-110 transition-transform shadow-2xl shadow-amber-500/30">
                            <Coffee size={48} className="text-amber-400" />
                        </div>
                        <h2 className="text-5xl md:text-6xl font-black text-white mb-6 text-center tracking-tighter">喜歡這份戰略轉譯嗎？</h2>
                        <p className="text-zinc-400 text-xl md:text-2xl mb-16 max-w-lg mx-auto text-center leading-relaxed font-medium">艾可 (Echo) 每天不眠不休地掃描全球情報，如果您喜歡這些內容，歡迎贊助一杯咖啡。</p>
                        <a href="https://buy.stripe.com/test_fyc5lkgP0g8T812eUU" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-6 px-16 py-8 rounded-[2rem] bg-amber-500 text-black font-black text-2xl hover:bg-amber-400 transition-all shadow-2xl shadow-amber-500/30 active:scale-95 hover:-translate-y-1">
                            ☕ 贊助艾可一粒咖啡豆
                        </a>
                    </div>
                </motion.div>
            </section>

            <AnimatePresence>
                {showAiJumpModal && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[110] flex items-center justify-center px-6 bg-black/90 backdrop-blur-xl">
                        <motion.div initial={{ scale: 0.85, y: 30, opacity: 0 }} animate={{ scale: 1, y: 0, opacity: 1 }} exit={{ scale: 0.85, y: 30, opacity: 0 }} 
                            className="bg-zinc-900 border border-white/20 p-6 md:p-8 rounded-[2.5rem] max-w-sm w-full shadow-[0_0_100px_rgba(16,185,129,0.1)] relative overflow-hidden ring-1 ring-white/10">
                            
                            <motion.div animate={{ scale: [1, 1.2, 1], rotate: [0, 90, 0], opacity: [0.1, 0.2, 0.1] }} transition={{ duration: 10, repeat: Infinity, ease: "linear" }} className="absolute -top-32 -left-32 w-64 h-64 bg-emerald-500/30 blur-[80px] rounded-full pointer-events-none" />
                            <motion.div animate={{ scale: [1.2, 1, 1.2], rotate: [0, -90, 0], opacity: [0.05, 0.15, 0.05] }} transition={{ duration: 12, repeat: Infinity, ease: "linear" }} className="absolute -bottom-32 -right-32 w-64 h-64 bg-blue-500/30 blur-[80px] rounded-full pointer-events-none" />

                            <button onClick={() => setShowAiJumpModal(false)} className="absolute top-4 right-4 z-20 p-3 rounded-full bg-white/5 hover:bg-white/10 text-zinc-400 hover:text-white transition-all active:scale-90 border border-white/5 shadow-xl"><X size={20} strokeWidth={3} /></button>

                            <div className="text-center mb-8 relative z-10">
                                <motion.div initial={{ scale: 0, rotate: -45 }} animate={{ scale: 1, rotate: 0 }} transition={{ type: "spring", damping: 12, delay: 0.2 }} className="w-16 h-16 bg-gradient-to-br from-emerald-400 to-teal-600 text-black rounded-2xl flex items-center justify-center mx-auto mb-5 shadow-[0_0_40px_rgba(16,185,129,0.3)]"><Check size={32} strokeWidth={4} /></motion.div>
                                <h3 className="text-2xl font-black text-white mb-2 tracking-tighter">指令已複製！</h3>
                                <p className="text-zinc-400 text-sm font-bold uppercase tracking-widest opacity-60">Select Platform</p>
                            </div>

                            <div className="grid grid-cols-3 gap-3 relative z-10">
                                {[
                                    { name: 'GPT', logo: ChatGPTLogo, app: 'chatgpt://', web: 'https://chat.openai.com', color: 'hover:border-[#10a37f]/50', iconColor: 'text-[#10a37f]', bg: 'group-hover:bg-[#10a37f]/10' },
                                    { name: 'Claude', logo: ClaudeLogo, app: 'claude://', web: 'https://claude.ai', color: 'hover:border-[#D97757]/50', iconColor: 'text-[#D97757]', bg: 'group-hover:bg-[#D97757]/10' },
                                    { name: 'Gemini', logo: GeminiLogo, app: 'googlegemini://', web: 'https://gemini.google.com', color: 'hover:border-[#1C7DEB]/50', iconColor: 'text-[#1C7DEB]', bg: 'group-hover:bg-[#1C7DEB]/10' }
                                ].map((ai, i) => (
                                    <motion.a key={i} href={ai.web} target="_blank" rel="noopener noreferrer" 
                                        initial={{ opacity: 0, scale: 0.5 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        transition={{ delay: 0.3 + i * 0.1, type: "spring", damping: 12 }}
                                        whileHover={{ scale: 1.05, y: -5 }}
                                        whileTap={{ scale: 0.95 }}
                                        onClick={(e) => { e.preventDefault(); window.location.href = ai.app; setTimeout(() => { window.open(ai.web, '_blank'); setShowAiJumpModal(false); }, 1500); }} 
                                        className={`flex flex-col items-center justify-center aspect-square rounded-[2rem] bg-white/[0.03] border border-white/5 transition-all group shadow-lg relative overflow-hidden ${ai.color}`}>
                                        <div className={`absolute inset-0 transition-colors duration-500 ${ai.bg}`} />
                                        <div className="relative z-10 flex flex-col items-center gap-3">
                                            <motion.div whileHover={{ rotate: [0, -10, 10, 0] }} transition={{ duration: 0.5 }}><ai.logo size={32} /></motion.div>
                                            <span className="text-white font-black text-[10px] uppercase tracking-tighter">{ai.name}</span>
                                        </div>
                                    </motion.a>
                                ))}
                            </div>

                            <div className="mt-8 pt-6 border-t border-white/5 text-center relative z-10">
                                <p className="text-zinc-500 text-[9px] font-black uppercase tracking-[0.4em]">可以直接在 App 內貼上使用</p>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

const FeedCard = ({ article, idx }: any) => {
    const navigate = useNavigate();
    const themeMap: Record<string, string> = {
        "代理人革命": "text-indigo-400 bg-indigo-500/10",
        "算力霸權": "text-emerald-400 bg-emerald-500/10",
        "數據主權": "text-blue-400 bg-blue-500/10",
        "文明重塑": "text-amber-400 bg-amber-500/10",
        "感官進化": "text-teal-400 bg-teal-500/10",
        "開源邊界": "text-rose-400 bg-rose-500/10",
    };

    return (
        <motion.div initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: (idx % 5) * 0.05 }} viewport={{ once: true }}
            onClick={() => { navigate(`/news/${article.slug}`); window.scrollTo(0, 0); }}
            className="bg-[#0c0c0c] border border-white/[0.08] p-8 rounded-[2rem] cursor-pointer group hover:bg-zinc-900 transition-all h-full flex flex-col md:flex-row gap-6 items-center text-left shadow-lg"
        >
            <div className="flex-1 w-full text-left">
                <div className="flex justify-between items-center mb-4 text-left">
                    <span className={`text-[9px] font-black px-2 py-0.5 rounded uppercase tracking-widest ${themeMap[article.trend_cluster as keyof typeof themeMap] || 'text-zinc-400 bg-white/5'}`}>
                        {article.trend_cluster}
                    </span>
                    <span className="text-[10px] text-zinc-600 font-mono font-bold text-left">{article.date}</span>
                </div>
                <h4 className="text-lg md:text-xl font-black text-white mb-2 group-hover:text-indigo-300 transition-colors text-left leading-snug">{article.title}</h4>
                <div className="flex items-center gap-4 opacity-40 group-hover:opacity-100 transition-opacity">
                    <span className="text-[10px] text-zinc-500 font-bold text-left"><Clock size={12} /> {article.readTime}</span>
                    <ArrowRight size={14} className="text-zinc-700 group-hover:text-indigo-500" />
                </div>
            </div>
        </motion.div>
    );
};

export default NewsDetail;
