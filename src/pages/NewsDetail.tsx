import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, ArrowRight, Copy, Check, Sparkles, Smartphone, Share2, ExternalLink, Zap, Shield, TrendingUp, Info, Clock, Calendar, Rocket, X, Facebook, Twitter } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { NEWS_ARTICLES } from '../data/news';
import SEO from '../components/ui/SEO';
import { ChatGPTLogo, ClaudeLogo, GeminiLogo } from '../components/AILogos';

const fadeUp = {
    initial: { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.4 }
};

const NewsDetail = () => {
    const { slug } = useParams();
    const navigate = useNavigate();
    const [article, setArticle] = useState<any>(null);
    const [copied, setCopied] = useState(false);
    const [shareCopied, setShareCopied] = useState(false);
    const [showAiJumpModal, setShowAiJumpModal] = useState(false);

    // 獲取相關新聞 (Bottom Grid)
    const moreNews = NEWS_ARTICLES.filter(a => a.slug !== slug).slice(0, 3);
    // 獲取熱門側欄新聞
    const trendingNews = NEWS_ARTICLES.slice(0, 5);

    // 🔗 獲取知識圖譜關聯新聞 (Knowledge Graph)
    const connectedIntelligence = article?.related_slugs 
        ? NEWS_ARTICLES.filter(a => article.related_slugs.includes(a.slug))
        : NEWS_ARTICLES.filter(a => a.trend_cluster === article?.trend_cluster && a.slug !== slug).slice(0, 3);

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

    const currentUrl = window.location.href;

    const themeMap: Record<string, string> = {
        blue: 'from-blue-500/20 to-indigo-500/10 text-blue-400 border-blue-500/20',
        rose: 'from-rose-500/20 to-pink-500/10 text-rose-400 border-rose-500/20',
        amber: 'from-amber-500/20 to-yellow-500/10 text-amber-400 border-amber-500/20',
        emerald: 'from-emerald-500/20 to-teal-500/10 text-emerald-400 border-emerald-500/20',
        violet: 'from-violet-500/20 to-purple-500/10 text-violet-400 border-violet-500/20',
    };

    return (
        <div className="min-h-screen bg-[#0a0a0a] text-zinc-300 pb-20">
            <SEO title={article.title} description={article.summary} path={`/news/${article.slug}`} />

            {/* Header / Hero */}
            <section className="relative pt-24 pb-8 px-6 overflow-hidden border-b border-white/5 text-left">
                <div className={`absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-gradient-to-b ${themeMap[article.themeColor]} opacity-20 pointer-events-none`} />
                <div className="max-w-6xl mx-auto relative z-10">
                    <button onClick={() => navigate(-1)} className="inline-flex items-center gap-2 text-zinc-500 hover:text-white transition-colors mb-6 group text-xs font-bold">
                        <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" /> 返回上一頁
                    </button>
                    
                    <div className="flex flex-wrap items-center gap-3 mb-6">
                        <span className="text-[9px] font-black px-3 py-1 rounded-full bg-white/5 border border-white/10 uppercase tracking-widest text-zinc-400">
                            {article.category}
                        </span>
                        {article.trend_cluster && (
                            <span className="text-[9px] font-black px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 uppercase tracking-widest text-indigo-400">
                                🔗 {article.trend_cluster}
                            </span>
                        )}
                        {article.author === "Echo" && (
                            <span className="text-[9px] font-black px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 uppercase tracking-widest text-indigo-400">
                                🕵️ 艾可 AI 記者
                            </span>
                        )}
                        <div className="flex items-center gap-2 bg-black/40 px-3 py-1 rounded-full border border-white/5">
                            <Clock size={10} className="text-zinc-500" />
                            <span className="text-[9px] font-bold text-zinc-400 font-mono">{article.publish_time || article.date} (TST)</span>
                        </div>
                    </div>

                    <h1 className="text-3xl md:text-5xl lg:text-6xl font-black text-white mb-6 tracking-tight leading-[1.15]">
                        {article.title}
                    </h1>

                    {/* Social Share Buttons */}
                    <div className="flex items-center gap-3 mb-8">
                        <span className="text-zinc-600 text-[9px] font-black uppercase tracking-widest mr-2">分享新聞：</span>
                        <a 
                            href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(currentUrl)}`} 
                            target="_blank" rel="noopener noreferrer"
                            className="w-9 h-9 rounded-full bg-white/5 flex items-center justify-center text-zinc-400 hover:bg-[#1877F2] hover:text-white transition-all shadow-lg border border-white/5"
                        >
                            <Facebook size={16} />
                        </a>
                        <a 
                            href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(currentUrl)}&text=${encodeURIComponent(article.title)}`} 
                            target="_blank" rel="noopener noreferrer"
                            className="w-9 h-9 rounded-full bg-white/5 flex items-center justify-center text-zinc-400 hover:bg-black hover:text-white transition-all shadow-lg border border-white/5"
                        >
                            <Twitter size={16} />
                        </a>
                        <button 
                            onClick={() => {
                                navigator.clipboard.writeText(currentUrl);
                                setShareCopied(true);
                                setTimeout(() => setShareCopied(false), 2000);
                            }}
                            className={`w-9 h-9 rounded-full flex items-center justify-center transition-all shadow-lg border border-white/5 ${shareCopied ? 'bg-emerald-500 text-black border-emerald-500' : 'bg-white/5 text-zinc-400 hover:bg-emerald-500 hover:text-white'}`}
                        >
                            {shareCopied ? <Check size={16} /> : <Share2 size={16} />}
                        </button>
                    </div>
                </div>
            </section>

            {/* Main Content with Sidebar */}
            <div className="max-w-6xl mx-auto px-6 py-10 lg:grid lg:grid-cols-12 gap-12 text-left">
                
                <div className="lg:col-span-8 space-y-12">
                    <div className="mb-10">
                        <p className="text-xl md:text-2xl text-zinc-300 leading-relaxed border-l-4 border-emerald-500 pl-8 italic">
                            {article.summary}
                        </p>
                    </div>

                    <motion.section {...fadeUp} className="bg-white/[0.02] border border-white/5 rounded-[2.5rem] p-6 md:p-10">
                        <div className="flex items-center gap-3 mb-6">
                            <Zap size={18} className="text-amber-400" />
                            <h2 className="text-xl font-black text-white uppercase tracking-tight">關鍵情報摘要</h2>
                        </div>
                        <ul className="space-y-4">
                            {article.flash_summary.map((item: string, i: number) => (
                                <li key={i} className="flex gap-4 text-base md:text-lg text-zinc-300 leading-relaxed">
                                    <span className="text-emerald-500 font-bold font-mono">0{i+1}.</span>
                                    {item}
                                </li>
                            ))}
                        </ul>
                    </motion.section>

                    <motion.section {...fadeUp} className="space-y-10">
                        <div className="flex items-center gap-3">
                            <Info size={20} className="text-emerald-500" />
                            <h2 className="text-xl font-black text-white">深度事件解析</h2>
                        </div>
                        {article.event_breakdown.map((item: any, i: number) => (
                            <div key={i} className="space-y-6">
                                <h3 className="text-xl font-black text-white flex items-center gap-3 group">
                                    <div className="w-1 h-5 bg-emerald-500 rounded-full group-hover:h-7 transition-all" /> 
                                    {item.title}
                                </h3>
                                <div className="text-base md:text-lg text-zinc-400 leading-[1.7] space-y-3">
                                    {item.content.split('。').map((sentence: string, sidx: number) => (
                                        sentence.length > 2 && <p key={sidx}>{sentence}。</p>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </motion.section>

                    {/* 5. 今日實踐指令 */}
                    <motion.section {...fadeUp} className="relative rounded-[2.5rem] border border-white/10 bg-[#0f0f0f] overflow-hidden group shadow-2xl">
                        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-[0.03] pointer-events-none" />
                        
                        {article.action_prompt.image_url && (
                            <div className="w-full h-48 md:h-64 relative overflow-hidden">
                                <img src={article.action_prompt.image_url} alt="Instruction Preview" className="w-full h-full object-cover grayscale opacity-40 group-hover:grayscale-0 group-hover:opacity-60 transition-all duration-700" />
                                <div className="absolute inset-0 bg-gradient-to-t from-[#0f0f0f] to-transparent" />
                                <div className="absolute top-6 left-6 px-4 py-1.5 rounded-full bg-black/60 backdrop-blur-md border border-white/10 text-white text-[10px] font-black uppercase tracking-widest flex items-center gap-2">
                                    <Sparkles size={12} className="text-amber-400" /> Live Prototype
                                </div>
                            </div>
                        )}

                        <div className="p-8 md:p-12 text-center relative z-10">
                            <h2 className="text-2xl md:text-3xl font-black text-white mb-3">{article.action_prompt.title}</h2>
                            <p className="text-zinc-400 text-sm md:text-base mb-8 max-w-lg mx-auto">{article.action_prompt.description}</p>
                            
                            <div className="bg-black border border-white/5 rounded-2xl p-6 md:p-8 mb-8 text-left relative overflow-hidden group/box">
                                <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent" />
                                <pre className="text-violet-200 whitespace-pre-wrap font-mono text-sm leading-relaxed relative z-10">{article.action_prompt.command}</pre>
                            </div>

                            <button onClick={handleCopy} className="group/btn relative bg-white text-black px-10 py-4 rounded-2xl font-black text-lg hover:bg-emerald-500 hover:text-white transition-all shadow-xl flex items-center gap-3 mx-auto">
                                <div className="absolute -inset-2 bg-emerald-500/20 blur-xl rounded-full opacity-0 group-hover/btn:opacity-100 transition-all" />
                                <span className="relative z-10 flex items-center gap-3">
                                    {copied ? <Check size={20} /> : <Copy size={20} />} {copied ? '指令已複製' : '領取指令寶箱'}
                                </span>
                            </button>
                        </div>
                    </motion.section>

                    {article.custom_content && (
                        <motion.section {...fadeUp} dangerouslySetInnerHTML={{ __html: article.custom_content }} />
                    )}

                    {/* 6. 真實性查證 - 專業出處引證 */}
                    <section className="pt-10 border-t border-white/5 flex flex-wrap items-center justify-between gap-6 opacity-60 hover:opacity-100 transition-opacity">
                        <div className="flex items-center gap-4">
                            <span className="text-zinc-600 text-[10px] font-black uppercase tracking-[0.2em]">情報查證來源：</span>
                            <a 
                                href={article.source_url} 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="text-zinc-400 hover:text-emerald-400 font-bold text-sm transition-all flex items-center gap-2 border-b border-white/10 hover:border-emerald-500/50 pb-0.5"
                            >
                                {article.source_name} <ExternalLink size={14} />
                            </a>
                        </div>
                        <p className="text-[10px] text-zinc-600 font-medium italic">
                            * 所有情報均由 AI Agent 24h 監測並經人工審核，確保真實無誤。
                        </p>
                    </section>

                    {/* 🔗 手機端顯示：關聯情報 (Mobile Connected Intelligence) */}
                    <div className="block lg:hidden mt-12">
                        {connectedIntelligence.length > 0 && (
                            <section className="bg-indigo-500/5 border border-indigo-500/10 rounded-[2.5rem] p-8 relative overflow-hidden group">
                                <div className="absolute -top-10 -right-10 w-32 h-32 bg-indigo-500/10 blur-3xl rounded-full" />
                                <h4 className="text-indigo-400 font-black text-base mb-6 flex items-center gap-2">
                                    <Sparkles size={16} /> 關聯情報
                                </h4>
                                <div className="space-y-6 relative z-10">
                                    {connectedIntelligence.map((news) => (
                                        <Link key={news.slug} to={`/news/${news.slug}`} className="group/item block">
                                            <div className="space-y-2">
                                                <div className="flex items-center gap-2">
                                                    <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 group-hover/item:scale-150 transition-all" />
                                                    <span className="text-[10px] font-black text-indigo-500/60 uppercase tracking-widest">{news.trend_cluster || '延伸趨勢'}</span>
                                                </div>
                                                <h5 className="text-[16px] font-bold text-zinc-300 group-hover/item:text-white leading-snug transition-colors">{news.title}</h5>
                                            </div>
                                        </Link>
                                    ))}
                                </div>
                            </section>
                        )}
                    </div>

                    <motion.section 
                        {...fadeUp} 
                        className="relative py-12 px-6 md:px-12 rounded-[2.5rem] md:rounded-[4rem] bg-[#0c0c0c] border border-white/5 overflow-hidden text-center mx-[-4px] md:mx-0 shadow-2xl"
                    >
                        <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/10 via-transparent to-emerald-900/5" />
                        <div className="relative z-10 text-center">
                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-zinc-500 text-[8px] font-black uppercase tracking-[0.3em] mb-6">
                                <Rocket size={10} /> Next Level Evolution
                            </div>
                            <h2 className="text-2xl md:text-5xl font-black text-white mb-4 tracking-tight leading-tight max-w-xl mx-auto">
                                {article.cta_override?.title || '想學習 AI？'}
                            </h2>
                            <p className="text-zinc-400 text-sm md:text-lg mb-8 max-w-lg mx-auto leading-relaxed">
                                {article.cta_override?.description}
                            </p>
                            <div className="flex justify-center mb-10">
                                <Link to="/insights" className="group/btn relative inline-flex items-center justify-center">
                                    <div className="absolute -inset-4 bg-emerald-500/20 blur-2xl rounded-full opacity-0 group-hover/btn:opacity-100 transition-all duration-700 animate-pulse" />
                                    <div className="relative bg-emerald-500 text-black px-8 py-4 rounded-xl font-black text-lg flex items-center gap-3 shadow-xl hover:bg-emerald-400 transition-all">
                                        <span className="whitespace-nowrap">{article.cta_override?.button_text || '立即開始學習'}</span>
                                        <ArrowRight size={20} className="group-hover/btn:translate-x-1 transition-transform" />
                                    </div>
                                </Link>
                            </div>
                        </div>
                    </motion.section>
                </div>

                {/* Sidebar */}
                <aside className="hidden lg:block lg:col-span-4 space-y-10">
                    <div className="sticky top-32 space-y-10">
                        {/* 🔗 關聯情報 (Knowledge Graph) */}
                        {connectedIntelligence.length > 0 && (
                            <section className="bg-indigo-500/5 border border-indigo-500/10 rounded-[2rem] p-6 relative overflow-hidden group">
                                <div className="absolute -top-10 -right-10 w-32 h-32 bg-indigo-500/10 blur-3xl rounded-full group-hover:bg-indigo-500/20 transition-all" />
                                <h4 className="text-indigo-400 font-black text-base mb-6 flex items-center gap-2">
                                    <Sparkles size={16} /> 關聯情報
                                </h4>
                                <div className="space-y-6 relative z-10">
                                    {connectedIntelligence.map((news) => (
                                        <Link key={news.slug} to={`/news/${news.slug}`} className="group/item block">
                                            <div className="space-y-2">
                                                <div className="flex items-center gap-2">
                                                    <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 group-hover/item:scale-150 transition-all" />
                                                    <span className="text-[10px] font-black text-indigo-500/60 uppercase tracking-widest">{news.trend_cluster || '延伸趨勢'}</span>
                                                </div>
                                                <h5 className="text-[14px] font-bold text-zinc-300 group-hover/item:text-white leading-snug transition-colors">{news.title}</h5>
                                            </div>
                                        </Link>
                                    ))}
                                </div>
                            </section>
                        )}

                        <section className="bg-white/[0.02] border border-white/5 rounded-[2rem] p-6">
                            <h4 className="text-white font-black text-base mb-6 flex items-center gap-2">
                                <TrendingUp size={16} className="text-emerald-500" /> 熱門情報
                            </h4>
                            <div className="space-y-6">
                                {trendingNews.map((news, i) => (
                                    <Link key={news.slug} to={`/news/${news.slug}`} className="group block">
                                        <div className="flex gap-4">
                                            <span className="text-2xl font-black text-zinc-800 group-hover:text-emerald-500 transition-colors">0{i+1}</span>
                                            <div className="space-y-1">
                                                <h5 className="text-[13px] font-bold text-zinc-300 group-hover:text-white line-clamp-2 leading-snug transition-colors">{news.title}</h5>
                                                <div className="flex items-center gap-2 text-[8px] text-zinc-600 font-mono uppercase">
                                                    <span className="text-emerald-500/80">{news.category}</span>
                                                    <span>•</span>
                                                    <span>{news.publish_time || news.date}</span>
                                                </div>
                                            </div>
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        </section>
                    </div>
                </aside>
            </div>

            {/* AI Jump Modal */}
            <AnimatePresence>
                {showAiJumpModal && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[100] flex items-center justify-center px-6 bg-black/90 backdrop-blur-xl">
                        <motion.div initial={{ scale: 0.9, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.9, y: 20 }} className="bg-zinc-900 border border-white/10 p-8 md:p-10 rounded-[2rem] max-w-sm w-full shadow-2xl relative overflow-hidden">
                            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-emerald-500 to-blue-500" />
                            <button onClick={() => setShowAiJumpModal(false)} className="absolute top-6 right-6 text-zinc-500 hover:text-white transition-colors">
                                <X size={24} />
                            </button>
                            
                            <div className="text-center mb-8">
                                <div className="w-14 h-14 bg-emerald-500/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                                    <Smartphone className="text-emerald-400" size={28} />
                                </div>
                                <h3 className="text-xl md:text-2xl font-black text-white mb-2 tracking-tight">指令已複製！</h3>
                                <p className="text-zinc-500 text-sm font-medium">選一個工具直接貼上</p>
                            </div>

                            <div className="flex justify-center gap-4">
                                {[
                                    { name: 'GPT', logo: ChatGPTLogo, app: 'chatgpt://', web: 'https://chat.openai.com', color: 'hover:bg-[#10a37f]/10' },
                                    { name: 'Claude', logo: ClaudeLogo, app: 'claude://', web: 'https://claude.ai', color: 'hover:bg-[#D97757]/10' },
                                    { name: 'Gemini', logo: GeminiLogo, app: 'googlegemini://', web: 'https://gemini.google.com', color: 'hover:bg-[#1C7DEB]/10' }
                                ].map((ai, i) => (
                                    <a key={i} href={ai.web} target="_blank" rel="noopener noreferrer" onClick={(e) => {
                                        e.preventDefault();
                                        window.location.href = ai.app;
                                        setTimeout(() => {
                                            window.open(ai.web, '_blank');
                                            setShowAiJumpModal(false);
                                        }, 2500);
                                    }} className={`flex flex-col items-center gap-2 p-3 rounded-2xl bg-white/[0.03] border border-white/5 transition-all group flex-1 ${ai.color}`}>
                                        <ai.logo size={28} />
                                        <span className="text-white font-black text-[10px] uppercase tracking-tighter">{ai.name}</span>
                                    </a>
                                ))}
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* 延伸閱讀 */}
            <section className="max-w-6xl mx-auto px-6 mt-12 pt-10 border-t border-white/5 text-left">
                <div className="flex items-center justify-between mb-8">
                    <h2 className="text-2xl font-black text-white flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center">
                            <Rocket size={20} className="text-emerald-500" />
                        </div>
                        延伸閱讀
                    </h2>
                    <Link to="/news" className="text-zinc-500 hover:text-white font-bold text-xs flex items-center gap-2 transition-colors">
                        查看全部新聞 <ArrowRight size={14} />
                    </Link>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {moreNews.map((article, i) => (
                        <NewsCard key={article.slug} article={article} idx={i} />
                    ))}
                </div>
            </section>
        </div>
    );
};

const NewsCard = ({ article, idx }: any) => {
    const navigate = useNavigate();
    return (
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: idx * 0.05 }} viewport={{ once: true }}
            onClick={() => navigate(`/news/${article.slug}`)}
            className="bg-zinc-900/50 border border-white/5 p-6 rounded-[2rem] cursor-pointer group transition-all hover:-translate-y-2 hover:border-emerald-500/20 h-full flex flex-col shadow-xl">
            <div className="flex justify-between mb-4">
                <span className="text-[9px] font-black uppercase text-emerald-500 tracking-widest">{article.category}</span>
                <span className="text-[9px] text-zinc-700 font-mono font-bold">{article.publish_time || article.date}</span>
            </div>
            <h3 className="text-lg font-black text-white mb-3 line-clamp-2 leading-tight group-hover:text-emerald-300 transition-colors text-left">{article.title}</h3>
            <p className="text-zinc-500 text-xs mb-4 line-clamp-3 leading-relaxed text-left">{article.summary}</p>
            <div className="mt-auto pt-4 border-t border-white/5 flex items-center justify-between">
                <span className="flex items-center gap-1.5 text-[10px] text-zinc-600 font-bold"><Clock size={10} /> {article.readTime}</span>
                <ArrowRight size={16} className="text-zinc-800 group-hover:text-emerald-500 group-hover:translate-x-1 transition-all" />
            </div>
        </motion.div>
    );
};

export default NewsDetail;
