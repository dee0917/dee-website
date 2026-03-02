import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, ArrowRight, Copy, Check, Sparkles, Smartphone, Share2, ExternalLink, Zap, Shield, TrendingUp, Info, Clock, Calendar, Rocket, X, Facebook, Twitter, Coffee, History } from 'lucide-react';
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
        <div className="min-h-screen bg-[#0a0a0a] text-zinc-300 pb-12 overflow-x-hidden">
            <SEO title={article.title} description={article.summary} path={`/news/${article.slug}`} />

            {/* 1. Header (平衡排版) */}
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

                    <h1 className="text-3xl md:text-6xl font-black text-white mb-6 tracking-tighter leading-[1.1] text-left">
                        {article.title}
                    </h1>

                    <div className="flex items-center gap-3">
                        <a href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(currentUrl)}`} target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-xl bg-white/5 flex items-center justify-center text-zinc-400 hover:bg-[#1877F2] hover:text-white transition-all shadow-lg border border-white/5 text-left"><Facebook size={16} /></a>
                        <a href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(currentUrl)}&text=${encodeURIComponent(article.title)}`} target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-xl bg-white/5 flex items-center justify-center text-zinc-400 hover:bg-black hover:text-white transition-all shadow-lg border border-white/5 text-left"><Twitter size={16} /></a>
                        <button onClick={() => { navigator.clipboard.writeText(currentUrl); setShareCopied(true); setTimeout(() => setShareCopied(false), 2000); }} className={`w-9 h-9 rounded-xl flex items-center justify-center transition-all border border-white/5 shadow-lg ${shareCopied ? 'bg-emerald-500 text-black' : 'bg-white/5 text-zinc-400 hover:bg-emerald-500'}`}>{shareCopied ? <Check size={16} /> : <Share2 size={16} />}</button>
                    </div>
                </div>
            </section>

            <div className="max-w-6xl mx-auto px-6 py-8 text-left">
                <div className="max-w-4xl space-y-12">
                    {/* 2. Summary (大字體) */}
                    <div className="text-left">
                        <p className="text-2xl md:text-3xl text-white/90 leading-relaxed border-l-4 border-emerald-500 pl-8 italic font-medium text-left">
                            {article.summary}
                        </p>
                    </div>

                    {/* 3. Flash Summary (深灰色加深，加強對比) */}
                    <motion.section {...fadeUp} className="bg-white/[0.02] border border-white/10 rounded-[3rem] p-6 md:p-10 text-left shadow-2xl">
                        <div className="flex items-center gap-3 mb-8 text-left">
                            <Zap size={22} className="text-amber-400" />
                            <h2 className="text-xl font-black text-white uppercase tracking-widest text-left">戰略情報摘要</h2>
                        </div>
                        <ul className="space-y-6 text-left">
                            {article.flash_summary.map((item: string, i: number) => (
                                <li key={i} className="flex gap-6 text-lg md:text-xl text-zinc-300 leading-relaxed text-left font-medium">
                                    <span className="text-emerald-500 font-black font-mono text-left">0{i+1}.</span>
                                    {item}
                                </li>
                            ))}
                        </ul>
                    </motion.section>

                    {/* 4. Event Breakdown (提高文字亮度與間距) */}
                    <motion.section {...fadeUp} className="space-y-12 text-left">
                        <div className="flex items-center gap-3 text-left mb-2">
                            <Info size={24} className="text-emerald-500" />
                            <h2 className="text-2xl font-black text-white text-left tracking-tight">深度事件解析</h2>
                        </div>
                        {article.event_breakdown.map((item: any, i: number) => (
                            <div key={i} className="space-y-6 text-left">
                                <h3 className="text-2xl font-black text-white flex items-center gap-4 text-left group">
                                    <div className="w-1.5 h-6 bg-emerald-500 rounded-full group-hover:scale-y-125 transition-transform" /> 
                                    {item.title}
                                </h3>
                                <div className="text-lg md:text-xl text-zinc-300 leading-[1.8] space-y-4 text-left font-medium">
                                    {item.content.split('。').map((sentence: string, sidx: number) => (
                                        sentence.length > 2 && <p key={sidx} className="text-left">{sentence}。</p>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </motion.section>

                    {/* 5. 今日實踐指令 */}
                    <motion.section {...fadeUp} className="relative rounded-[3rem] border border-white/10 bg-[#0d0d0d] overflow-hidden group shadow-2xl text-left">
                        {article.action_prompt.image_url && (
                            <div className="w-full h-48 md:h-80 relative overflow-hidden">
                                <img src={article.action_prompt.image_url} alt="Reference" className="w-full h-full object-cover grayscale opacity-30 group-hover:opacity-50 transition-all duration-1000" />
                                <div className="absolute inset-0 bg-gradient-to-t from-[#0d0d0d] via-transparent to-transparent" />
                            </div>
                        )}
                        <div className="p-10 md:p-16 text-center relative z-10">
                            <h2 className="text-3xl font-black text-white mb-4 text-center tracking-tight">{article.action_prompt.title}</h2>
                            <p className="text-zinc-400 text-base md:text-lg mb-10 max-w-xl mx-auto text-center">{article.action_prompt.description}</p>
                            <div className="bg-black border border-white/5 rounded-2xl p-6 md:p-10 mb-10 text-left relative overflow-hidden shadow-inner">
                                <pre className="text-violet-300 whitespace-pre-wrap font-mono text-sm md:text-base leading-relaxed text-left">{article.action_prompt.command}</pre>
                            </div>
                            <button onClick={handleCopy} className="group/btn relative bg-white text-black px-12 py-5 rounded-2xl font-black text-xl hover:bg-emerald-500 hover:text-white transition-all shadow-2xl flex items-center gap-3 mx-auto">
                                {copied ? <Check size={24} /> : <Copy size={24} />} {copied ? '指令已複製' : '領取指令寶箱'}
                            </button>
                        </div>
                    </motion.section>

                    {article.custom_content && (
                        <motion.section {...fadeUp} dangerouslySetInnerHTML={{ __html: article.custom_content }} />
                    )}

                    {/* 🚀 6. CTA (大面積按鈕) */}
                    <motion.section {...fadeUp} className="relative py-16 px-8 md:px-16 rounded-[3.5rem] bg-gradient-to-br from-zinc-900 to-black border border-white/10 overflow-hidden text-center shadow-2xl">
                        <div className="relative z-10 text-center">
                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-zinc-500 text-[10px] font-black uppercase tracking-[0.3em] mb-8 text-center">
                                <Rocket size={12} /> Strategic Evolution
                            </div>
                            <h2 className="text-3xl md:text-5xl font-black text-white mb-6 text-center tracking-tighter leading-tight">{article.cta_override?.title || '想學習 AI？'}</h2>
                            <p className="text-zinc-400 text-lg md:text-xl mb-10 max-w-lg mx-auto text-center leading-relaxed">{article.cta_override?.description}</p>
                            <div className="flex justify-center">
                                <Link to="/insights" className="group/btn relative inline-flex items-center justify-center">
                                    <div className="absolute -inset-6 bg-emerald-500/20 blur-3xl rounded-full opacity-0 group-hover/btn:opacity-100 transition-all duration-700 animate-pulse" />
                                    <div className="relative bg-emerald-500 text-black px-10 py-5 rounded-2xl font-black text-xl flex items-center gap-4 shadow-2xl hover:bg-emerald-400 transition-all">
                                        <span>{article.cta_override?.button_text || '立即進入實驗室學習'}</span>
                                        <ArrowRight size={24} />
                                    </div>
                                </Link>
                            </div>
                        </div>
                    </motion.section>

                    {/* 7. 參考資料 (對比增強) */}
                    <section className="pt-10 border-t border-white/10 flex flex-wrap items-center justify-between gap-6 opacity-60 hover:opacity-100 transition-opacity text-left">
                        <div className="flex items-center gap-4 text-left font-bold text-sm">
                            <span className="text-zinc-500 uppercase tracking-widest text-left">情報查證來源：</span>
                            <a href={article.source_url} target="_blank" rel="noopener noreferrer" className="text-zinc-300 hover:text-emerald-400 transition-all flex items-center gap-2 border-b border-white/20 hover:border-emerald-500/50 pb-1 text-left">
                                {article.source_name} <ExternalLink size={14} />
                            </a>
                        </div>
                        <p className="text-xs text-zinc-600 font-medium italic text-left">* 24h 監測並經人工審核，確保真實無誤。</p>
                    </section>
                </div>
            </div>

            {/* 🚀 8. 整合延伸閱讀 (一行一則，大間隔) */}
            <section className="max-w-6xl mx-auto px-6 mt-32 pt-20 border-t border-white/10 text-left">
                <div className="flex items-center justify-between mb-16 text-left">
                    <h2 className="text-3xl font-black text-white flex items-center gap-4 text-left tracking-tighter uppercase">
                        <div className="w-12 h-12 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-left">
                            <Sparkles size={24} className="text-indigo-400" />
                        </div>
                        戰略相關情報脈絡
                    </h2>
                    <Link to="/news" className="text-zinc-500 hover:text-white font-bold text-xs flex items-center gap-2 transition-colors text-left uppercase tracking-widest">View All <ArrowRight size={14} /></Link>
                </div>
                
                <div className="grid grid-cols-1 gap-8 text-left">
                    {integratedFeed.map((news: any, i: number) => (
                        <FeedCard key={news.slug} article={news} idx={i} />
                    ))}
                </div>
            </section>

            {/* 🚀 9. 請喝咖啡 (終點站) */}
            <section className="max-w-4xl mx-auto px-6 mt-40 pb-20 text-center">
                <motion.div {...fadeUp} className="p-16 rounded-[4rem] bg-gradient-to-b from-amber-500/10 to-transparent border border-amber-500/20 relative overflow-hidden group shadow-2xl">
                    <div className="absolute top-0 right-0 p-16 opacity-5"><Coffee size={150} className="text-amber-500" /></div>
                    <div className="relative z-10 text-center flex items-center justify-center flex-col">
                        <div className="w-20 h-20 rounded-[2rem] bg-amber-500/20 flex items-center justify-center mx-auto mb-8 group-hover:scale-110 transition-transform shadow-2xl shadow-amber-500/20">
                            <Coffee size={40} className="text-amber-500" />
                        </div>
                        <h2 className="text-4xl font-black text-white mb-4 text-center tracking-tighter">喜歡這份戰略轉譯嗎？</h2>
                        <p className="text-zinc-400 text-lg mb-10 max-w-sm mx-auto text-center leading-relaxed font-medium">艾可 (Echo) 每天不眠不休地掃描全球情報，如果您喜歡這些內容，歡迎贊助一杯咖啡。</p>
                        <a href="https://buy.stripe.com/test_fyc5lkgP0g8T812eUU" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-4 px-12 py-6 rounded-2xl bg-amber-500 text-black font-black text-xl hover:bg-amber-400 transition-all shadow-2xl shadow-amber-500/20 active:scale-95">
                            ☕ 贊助艾可一粒咖啡豆
                        </a>
                    </div>
                </motion.div>
            </section>

            <AnimatePresence>
                {showAiJumpModal && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[100] flex items-center justify-center px-6 bg-black/95 backdrop-blur-2xl">
                        <motion.div initial={{ scale: 0.9, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.9, y: 20 }} 
                            className="bg-zinc-900 border border-white/10 p-8 md:p-12 rounded-[3rem] max-w-lg w-full shadow-2xl relative overflow-hidden">
                            
                            {/* Premium Background Glow */}
                            <div className="absolute -top-24 -left-24 w-64 h-64 bg-emerald-500/10 blur-[100px] rounded-full" />
                            <div className="absolute -bottom-24 -right-24 w-64 h-64 bg-blue-500/10 blur-[100px] rounded-full" />

                            <button onClick={() => setShowAiJumpModal(false)} className="absolute top-8 right-8 text-zinc-500 hover:text-white transition-colors">
                                <X size={28} />
                            </button>

                            <div className="text-center mb-12 relative z-10">
                                <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring", damping: 12 }}
                                    className="w-20 h-20 bg-emerald-500 text-black rounded-[2rem] flex items-center justify-center mx-auto mb-6 shadow-xl shadow-emerald-500/20">
                                    <Check size={40} strokeWidth={3} />
                                </motion.div>
                                <h3 className="text-3xl md:text-4xl font-black text-white mb-3 tracking-tighter">指令已成功複製！</h3>
                                <p className="text-zinc-500 text-lg font-medium">請選擇您想前往並貼上的 AI 平台：</p>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 relative z-10">
                                {[
                                    { name: 'ChatGPT', logo: ChatGPTLogo, app: 'chatgpt://', web: 'https://chat.openai.com', color: 'hover:border-[#10a37f]/50', glow: 'group-hover:shadow-[#10a37f]/10' },
                                    { name: 'Claude', logo: ClaudeLogo, app: 'claude://', web: 'https://claude.ai', color: 'hover:border-[#D97757]/50', glow: 'group-hover:shadow-[#D97757]/10' },
                                    { name: 'Gemini', logo: GeminiLogo, app: 'googlegemini://', web: 'https://gemini.google.com', color: 'hover:border-[#1C7DEB]/50', glow: 'group-hover:shadow-[#1C7DEB]/10' }
                                ].map((ai, i) => (
                                    <a key={i} href={ai.web} target="_blank" rel="noopener noreferrer" 
                                        onClick={(e) => { 
                                            e.preventDefault(); 
                                            window.location.href = ai.app; 
                                            setTimeout(() => { window.open(ai.web, '_blank'); setShowAiJumpModal(false); }, 1500); 
                                        }} 
                                        className={`flex flex-col items-center gap-4 p-6 rounded-[2rem] bg-white/[0.03] border border-white/5 transition-all group shadow-xl hover:-translate-y-1 ${ai.color} ${ai.glow}`}>
                                        <ai.logo size={40} />
                                        <span className="text-white font-black text-xs uppercase tracking-widest">{ai.name}</span>
                                    </a>
                                ))}
                            </div>

                            <div className="mt-12 pt-8 border-t border-white/5 text-center">
                                <p className="text-zinc-600 text-[10px] font-black uppercase tracking-[0.4em]">直接前往 App 或 網頁版貼上即可</p>
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
