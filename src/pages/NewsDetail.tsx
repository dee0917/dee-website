import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, ArrowRight, Copy, Check, Sparkles, Smartphone, Share2, ExternalLink, Zap, Shield, TrendingUp, Info, Clock, Calendar, Rocket, X, Facebook, Twitter, Coffee, History } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { NEWS_ARTICLES } from '../data/news';
import SEO from '../components/ui/SEO';
import { ChatGPTLogo, ClaudeLogo, GeminiLogo } from '../components/AILogos';

const fadeUp = {
    initial: { opacity: 0, y: 10 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.3 }
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
        return [...baseFeed, ...others].slice(0, 12); // 展示 12 篇更加密集
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
        <div className="min-h-screen bg-[#0a0a0a] text-zinc-300 pb-10 overflow-x-hidden">
            <SEO title={article.title} description={article.summary} path={`/news/${article.slug}`} />

            {/* 1. Header (極簡密集) */}
            <section className="relative pt-16 pb-6 px-6 overflow-hidden border-b border-white/5 text-left">
                <div className={`absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-gradient-to-b ${themeMap[article.themeColor] || 'from-zinc-500/10'} opacity-10 pointer-events-none`} />
                <div className="max-w-6xl mx-auto relative z-10">
                    <button onClick={() => navigate(-1)} className="inline-flex items-center gap-2 text-zinc-600 hover:text-white transition-colors mb-4 text-[10px] font-bold">
                        <ArrowLeft size={12} /> 返回
                    </button>
                    
                    <div className="flex flex-wrap items-center gap-2 mb-4 text-left">
                        <span className="text-[8px] font-black px-2 py-0.5 rounded bg-white/5 border border-white/10 uppercase tracking-tighter text-zinc-500">
                            {article.category}
                        </span>
                        {article.trend_cluster && (
                            <Link to={`/news?trend=${encodeURIComponent(article.trend_cluster)}`} className="text-[8px] font-black px-2 py-0.5 rounded bg-indigo-500/10 border border-indigo-500/20 uppercase tracking-tighter text-indigo-400 hover:bg-indigo-500/20">
                                🔗 {article.trend_cluster}
                            </Link>
                        )}
                        <div className="flex items-center gap-1.5 bg-black/40 px-2 py-0.5 rounded border border-white/5 text-left">
                            <Clock size={8} className="text-zinc-600" />
                            <span className="text-[8px] font-bold text-zinc-500 font-mono">{article.publish_time || article.date} (TST)</span>
                        </div>
                    </div>

                    <h1 className="text-2xl md:text-5xl font-black text-white mb-4 tracking-tighter leading-tight text-left">
                        {article.title}
                    </h1>

                    <div className="flex items-center gap-2">
                        <span className="text-zinc-600 text-[8px] font-black uppercase tracking-widest mr-1">分享：</span>
                        <a href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(currentUrl)}`} target="_blank" rel="noopener noreferrer" className="w-7 h-7 rounded-lg bg-white/5 flex items-center justify-center text-zinc-500 hover:bg-[#1877F2] hover:text-white transition-all shadow-lg border border-white/5"><Facebook size={12} /></a>
                        <a href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(currentUrl)}&text=${encodeURIComponent(article.title)}`} target="_blank" rel="noopener noreferrer" className="w-7 h-7 rounded-lg bg-white/5 flex items-center justify-center text-zinc-500 hover:bg-black hover:text-white transition-all shadow-lg border border-white/5"><Twitter size={12} /></a>
                        <button onClick={() => { navigator.clipboard.writeText(currentUrl); setShareCopied(true); setTimeout(() => setShareCopied(false), 2000); }} className={`w-7 h-7 rounded-lg flex items-center justify-center transition-all border border-white/5 shadow-lg ${shareCopied ? 'bg-emerald-500 text-black' : 'bg-white/5 text-zinc-500 hover:bg-emerald-500'}`}>{shareCopied ? <Check size={12} /> : <Share2 size={12} />}</button>
                    </div>
                </div>
            </section>

            <div className="max-w-6xl mx-auto px-6 py-6 text-left">
                <div className="max-w-3xl space-y-10">
                    {/* 2. Summary */}
                    <div className="text-left">
                        <p className="text-lg md:text-xl text-zinc-400 leading-relaxed border-l-2 border-emerald-500 pl-6 italic text-left">
                            {article.summary}
                        </p>
                    </div>

                    {/* 3. Flash Summary (密集化) */}
                    <motion.section {...fadeUp} className="bg-white/[0.01] border border-white/5 rounded-3xl p-6 text-left">
                        <div className="flex items-center gap-2 mb-4 text-left">
                            <Zap size={16} className="text-amber-400" />
                            <h2 className="text-sm font-black text-white uppercase tracking-wider text-left">情報摘要</h2>
                        </div>
                        <ul className="space-y-3 text-left">
                            {article.flash_summary.map((item: string, i: number) => (
                                <li key={i} className="flex gap-3 text-sm md:text-base text-zinc-400 leading-relaxed text-left">
                                    <span className="text-emerald-500 font-bold font-mono text-left">{i+1}.</span>
                                    {item}
                                </li>
                            ))}
                        </ul>
                    </motion.section>

                    {/* 4. Event Breakdown */}
                    <motion.section {...fadeUp} className="space-y-8 text-left">
                        {article.event_breakdown.map((item: any, i: number) => (
                            <div key={i} className="space-y-4 text-left">
                                <h3 className="text-lg font-black text-white flex items-center gap-2 text-left">
                                    <div className="w-1 h-4 bg-emerald-500 rounded-full" /> 
                                    {item.title}
                                </h3>
                                <div className="text-sm md:text-base text-zinc-500 leading-relaxed space-y-2 text-left">
                                    {item.content.split('。').map((sentence: string, sidx: number) => (
                                        sentence.length > 2 && <p key={sidx} className="text-left">{sentence}。</p>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </motion.section>

                    {/* 5. 今日實踐指令 (收縮高度) */}
                    <motion.section {...fadeUp} className="relative rounded-3xl border border-white/5 bg-[#0d0d0d] overflow-hidden group shadow-xl text-left">
                        {article.action_prompt.image_url && (
                            <div className="w-full h-32 md:h-48 relative overflow-hidden">
                                <img src={article.action_prompt.image_url} alt="Preview" className="w-full h-full object-cover grayscale opacity-20 group-hover:opacity-40 transition-all duration-700" />
                                <div className="absolute inset-0 bg-gradient-to-t from-[#0d0d0d] to-transparent" />
                                <div className="absolute top-4 left-4 px-2 py-0.5 rounded bg-black/60 border border-white/10 text-white text-[8px] font-black uppercase tracking-widest flex items-center gap-1">
                                    <Sparkles size={10} className="text-amber-400" /> Live Prototype
                                </div>
                            </div>
                        )}
                        <div className="p-6 md:p-8 text-center relative z-10">
                            <h2 className="text-lg font-black text-white mb-2 text-center">{article.action_prompt.title}</h2>
                            <p className="text-zinc-500 text-xs mb-6 max-w-lg mx-auto text-center">{article.action_prompt.description}</p>
                            <div className="bg-black border border-white/5 rounded-xl p-4 md:p-6 mb-6 text-left relative overflow-hidden">
                                <pre className="text-violet-300 whitespace-pre-wrap font-mono text-xs leading-relaxed text-left">{article.action_prompt.command}</pre>
                            </div>
                            <button onClick={handleCopy} className="group/btn relative bg-white text-black px-8 py-3 rounded-xl font-black text-sm hover:bg-emerald-500 hover:text-white transition-all shadow-xl flex items-center gap-2 mx-auto">
                                {copied ? <Check size={16} /> : <Copy size={16} />} {copied ? '已複製' : '領取指令'}
                            </button>
                        </div>
                    </motion.section>

                    {/* 6. CTA (升級在參考上方) */}
                    <motion.section {...fadeUp} className="relative py-10 px-6 md:px-10 rounded-3xl bg-[#0d0d0d] border border-white/5 overflow-hidden text-center">
                        <div className="relative z-10 text-center">
                            <div className="inline-flex items-center gap-2 px-2 py-0.5 rounded bg-white/5 border border-white/10 text-zinc-600 text-[8px] font-black uppercase tracking-widest mb-4">
                                <Rocket size={8} /> Evolution
                            </div>
                            <h2 className="text-xl md:text-3xl font-black text-white mb-3 text-center tracking-tighter">{article.cta_override?.title || '想學習 AI？'}</h2>
                            <p className="text-zinc-500 text-xs md:text-sm mb-6 max-w-md mx-auto text-center">{article.cta_override?.description}</p>
                            <div className="flex justify-center">
                                <Link to="/insights" className="group/btn relative inline-flex items-center justify-center">
                                    <div className="relative bg-emerald-500 text-black px-6 py-3 rounded-xl font-black text-sm flex items-center gap-2 shadow-xl hover:bg-emerald-400">
                                        <span>立即開始</span>
                                        <ArrowRight size={16} />
                                    </div>
                                </Link>
                            </div>
                        </div>
                    </motion.section>

                    {/* 7. 參考資料 (CTA 下方) */}
                    <section className="pt-6 border-t border-white/5 flex flex-wrap items-center justify-between gap-4 opacity-40 hover:opacity-100 transition-opacity text-left">
                        <div className="flex items-center gap-3 text-left">
                            <span className="text-zinc-600 text-[8px] font-black uppercase tracking-widest text-left">查證來源：</span>
                            <a href={article.source_url} target="_blank" rel="noopener noreferrer" className="text-zinc-500 hover:text-emerald-400 font-bold text-xs transition-all flex items-center gap-1.5 border-b border-white/5 hover:border-emerald-500/50 pb-0.5 text-left">
                                {article.source_name} <ExternalLink size={10} />
                            </a>
                        </div>
                    </section>
                </div>
            </div>

            {/* 🚀 8. 整合延伸閱讀 (4 欄位，極致密集) */}
            <section className="max-w-7xl mx-auto px-6 mt-20 pt-10 border-t border-white/5 text-left">
                <div className="flex items-center justify-between mb-8 text-left">
                    <h2 className="text-xl font-black text-white flex items-center gap-3 text-left tracking-tighter">
                        <div className="w-8 h-8 rounded-lg bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center">
                            <Sparkles size={16} className="text-indigo-400" />
                        </div>
                        戰略相關情報脈絡
                    </h2>
                    <Link to="/news" className="text-zinc-600 hover:text-white font-bold text-[10px] transition-colors">查看全部</Link>
                </div>
                
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 text-left">
                    {integratedFeed.map((news: any, i: number) => (
                        <FeedCard key={news.slug} article={news} idx={i} />
                    ))}
                </div>
            </section>

            {/* 🚀 9. 請喝咖啡 (最底部，密集化) */}
            <section className="max-w-3xl mx-auto px-6 mt-24 text-center">
                <motion.div {...fadeUp} className="p-8 rounded-[2.5rem] bg-zinc-900/40 border border-white/5 relative overflow-hidden group">
                    <div className="relative z-10 text-center">
                        <div className="w-12 h-12 rounded-2xl bg-amber-500/10 flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                            <Coffee size={24} className="text-amber-500" />
                        </div>
                        <h2 className="text-xl font-black text-white mb-2 text-center tracking-tighter">喜歡這份轉譯？</h2>
                        <p className="text-zinc-500 text-[10px] mb-6 max-w-xs mx-auto text-center">艾可 (Echo) 每日高頻掃描情報，歡迎贊助一杯咖啡。</p>
                        <a href="https://buy.stripe.com/test_fyc5lkgP0g8T812eUU" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-amber-500 text-black font-black text-xs hover:bg-amber-400 transition-all shadow-xl">
                            ☕ 贊助艾可一粒咖啡豆
                        </a>
                    </div>
                </motion.div>
            </section>

            <AnimatePresence>
                {showAiJumpModal && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[100] flex items-center justify-center px-6 bg-black/90 backdrop-blur-xl">
                        <motion.div initial={{ scale: 0.9, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.9, y: 20 }} className="bg-zinc-900 border border-white/10 p-8 rounded-3xl max-w-sm w-full shadow-2xl relative text-center">
                            <button onClick={() => setShowAiJumpModal(false)} className="absolute top-4 right-4 text-zinc-600 hover:text-white"><X size={20} /></button>
                            <h3 className="text-lg font-black text-white mb-6 tracking-tighter text-center">指令已複製！</h3>
                            <div className="flex justify-center gap-3">
                                {[
                                    { name: 'GPT', logo: ChatGPTLogo, app: 'chatgpt://', web: 'https://chat.openai.com' },
                                    { name: 'Claude', logo: ClaudeLogo, app: 'claude://', web: 'https://claude.ai' },
                                    { name: 'Gemini', logo: GeminiLogo, app: 'googlegemini://', web: 'https://gemini.google.com' }
                                ].map((ai, i) => (
                                    <a key={i} href={ai.web} target="_blank" rel="noopener noreferrer" onClick={(e) => { e.preventDefault(); window.location.href = ai.app; setTimeout(() => { window.open(ai.web, '_blank'); setShowAiJumpModal(false); }, 2500); }} className="flex flex-col items-center gap-2 p-2 rounded-xl bg-white/[0.02] border border-white/5 hover:bg-white/5 transition-all flex-1">
                                        <ai.logo size={24} />
                                        <span className="text-white font-black text-[8px] uppercase">{ai.name}</span>
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

const FeedCard = ({ article, idx }: any) => {
    const navigate = useNavigate();
    return (
        <motion.div initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: (idx % 8) * 0.03 }} viewport={{ once: true }}
            onClick={() => { navigate(`/news/${article.slug}`); window.scrollTo(0, 0); }}
            className="bg-[#0d0d0d] border border-white/[0.03] p-4 rounded-2xl cursor-pointer group hover:bg-zinc-900 h-full flex flex-col text-left"
        >
            <div className="flex justify-between items-center mb-3 text-left">
                <span className="text-[7px] font-black px-1.5 py-0.5 rounded bg-white/5 uppercase text-zinc-500">{article.category}</span>
                <span className="text-[7px] text-zinc-800 font-mono text-left">{article.date}</span>
            </div>
            <h4 className="text-xs font-black text-zinc-300 mb-2 line-clamp-2 leading-tight group-hover:text-indigo-400 transition-colors text-left">{article.title}</h4>
            <div className="mt-auto flex items-center justify-between text-left pt-2 opacity-30 group-hover:opacity-100 transition-opacity">
                <span className="text-[7px] text-zinc-600 font-bold text-left">{article.readTime}</span>
                <ArrowRight size={10} className="text-zinc-800 group-hover:text-indigo-500" />
            </div>
        </motion.div>
    );
};

export default NewsDetail;
