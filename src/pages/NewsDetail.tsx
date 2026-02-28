import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, ArrowRight, Copy, Check, Sparkles, Smartphone, Share2, ExternalLink, Zap, Shield, TrendingUp, Info, Rocket, Clock } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { NEWS_ARTICLES } from '../data/news';
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

    // 獲取相關新聞（排除當前文章，取最近 3 篇）
    const moreNews = NEWS_ARTICLES.filter(a => a.slug !== slug).slice(0, 3);
    // 獲取熱門側欄新聞（取 5 篇）
    const trendingNews = NEWS_ARTICLES.slice(0, 5);

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
            <SEO title={article.title} description={article.summary} path={`/news/${article.slug}`} />

            {/* Header / Hero */}
            <section className="relative pt-32 pb-20 px-6 overflow-hidden border-b border-white/5">
                <div className={`absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-gradient-to-b ${themeMap[article.themeColor]} opacity-20 pointer-events-none`} />
                <div className="max-w-6xl mx-auto relative z-10">
                    <button onClick={() => navigate(-1)} className="inline-flex items-center gap-2 text-zinc-500 hover:text-white transition-colors mb-10 group">
                        <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" /> 返回上一頁
                    </button>
                    
                    <div className="flex flex-wrap items-center gap-3 mb-6">
                        <span className="text-[10px] font-black px-3 py-1 rounded-full bg-white/5 border border-white/10 uppercase tracking-widest text-zinc-400">
                            {article.category}
                        </span>
                        {article.author === "Echo" && (
                            <span className="text-[10px] font-black px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 uppercase tracking-widest text-indigo-400">
                                🕵️ 艾可 AI 記者
                            </span>
                        )}
                        <span className="text-[10px] font-bold text-zinc-600">{article.date} · {article.readTime}</span>
                    </div>

                    <h1 className="text-3xl md:text-5xl lg:text-6xl font-black text-white mb-10 tracking-tight leading-[1.15]">
                        {article.title}
                    </h1>
                </div>
            </section>

            {/* Main Content with Sidebar */}
            <div className="max-w-6xl mx-auto px-6 py-20 lg:grid lg:grid-cols-12 gap-16">
                
                {/* Left Column: News Body */}
                <div className="lg:col-span-8 space-y-20">
                    
                    <p className="text-xl md:text-2xl text-zinc-300 leading-relaxed border-l-4 border-emerald-500 pl-8 italic mb-16">
                        {article.summary}
                    </p>

                    {/* 1. 關鍵情報 */}
                    <motion.section {...fadeUp} className="bg-white/[0.02] border border-white/5 rounded-[2.5rem] p-8 md:p-12">
                        <div className="flex items-center gap-3 mb-8">
                            <Zap size={20} className="text-amber-400" />
                            <h2 className="text-2xl font-black text-white uppercase tracking-tight">關鍵情報</h2>
                        </div>
                        <ul className="space-y-6">
                            {article.flash_summary.map((item: string, i: number) => (
                                <li key={i} className="flex gap-4 text-lg text-zinc-300 leading-relaxed">
                                    <span className="text-emerald-500 font-bold font-mono">0{i+1}.</span>
                                    {item}
                                </li>
                            ))}
                        </ul>
                    </motion.section>

                    {/* 2. 事件解析 */}
                    <motion.section {...fadeUp} className="space-y-12">
                        {article.event_breakdown.map((item: any, i: number) => (
                            <div key={i} className="space-y-6">
                                <h3 className="text-2xl font-black text-white flex items-center gap-3">
                                    <div className="w-2 h-8 bg-emerald-500 rounded-full" /> {item.title}
                                </h3>
                                <p className="text-lg text-zinc-400 leading-relaxed">
                                    {item.content}
                                </p>
                            </div>
                        ))}
                    </motion.section>

                    {/* 3. 利益相關透視 */}
                    <motion.section {...fadeUp} className="grid md:grid-cols-2 gap-6">
                        {article.impact_analysis.map((impact: any, i: number) => (
                            <div key={i} className="bg-zinc-900/50 border border-white/5 p-8 rounded-3xl relative overflow-hidden">
                                <span className="text-[10px] font-black uppercase tracking-widest text-emerald-500 mb-4 block">對 {impact.target} 的影響</span>
                                <p className="text-white text-lg font-bold leading-relaxed">{impact.description}</p>
                            </div>
                        ))}
                    </motion.section>

                    {/* 4. Dee 的評語 */}
                    <motion.section {...fadeUp} className="bg-emerald-500/5 p-10 rounded-[3rem] border border-emerald-500/10">
                        <div className="flex items-center gap-4 mb-6">
                            <span className="text-4xl">🧪</span>
                            <h2 className="text-2xl font-black text-white">Dee's 實驗室碎碎念</h2>
                        </div>
                        <p className="text-xl text-zinc-300 leading-relaxed font-medium">「 {article.dee_insight} 」</p>
                    </motion.section>

                    {/* 5. 今日實踐指令 */}
                    <motion.section {...fadeUp} className="bg-gradient-to-br from-violet-900/20 to-black border border-violet-500/30 rounded-[3rem] p-10 md:p-16 text-center shadow-2xl">
                        <Sparkles size={32} className="text-violet-400 mx-auto mb-6" />
                        <h2 className="text-3xl font-black text-white mb-4">{article.action_prompt.title}</h2>
                        <p className="text-zinc-400 text-lg mb-10">{article.action_prompt.description}</p>
                        <div className="bg-black/60 border border-white/5 rounded-2xl p-8 mb-10 text-left">
                            <pre className="text-violet-200 whitespace-pre-wrap font-mono text-sm leading-relaxed">{article.action_prompt.command}</pre>
                        </div>
                        <button onClick={handleCopy} className="bg-white text-black px-10 py-5 rounded-2xl font-black text-xl hover:bg-violet-500 hover:text-white transition-all shadow-xl flex items-center gap-3 mx-auto">
                            {copied ? <Check size={24} /> : <Copy size={24} />} {copied ? '指令已複製' : '複製實踐指令'}
                        </button>
                    </motion.section>

                    {/* 艾可自由內容 */}
                    {article.custom_content && (
                        <motion.section {...fadeUp} dangerouslySetInnerHTML={{ __html: article.custom_content }} />
                    )}

                    {/* 底部引流 CTA */}
                    <motion.section {...fadeUp} className="relative py-20 px-8 rounded-[3.5rem] bg-[#0f0f0f] border border-emerald-500/20 overflow-hidden text-center mx-[-10px] md:mx-0">
                        <div className="relative z-10">
                            <h2 className="text-3xl md:text-5xl font-black text-white mb-6 tracking-tight">{article.cta_override?.title || '想學習 AI？'}</h2>
                            <p className="text-zinc-400 text-lg mb-10 max-w-2xl mx-auto">{article.cta_override?.description}</p>
                            <Link to="/insights" className="bg-emerald-500 text-black px-12 py-6 rounded-2xl font-black text-2xl inline-flex items-center gap-4 hover:bg-emerald-400 transition-all shadow-2xl">
                                {article.cta_override?.button_text || '立即開始學習'}
                                <ArrowRight size={28} />
                            </Link>
                        </div>
                    </motion.section>

                </div>

                {/* Right Column: Sidebar */}
                <aside className="hidden lg:block lg:col-span-4 space-y-12">
                    <div className="sticky top-32 space-y-12">
                        {/* Trending Section */}
                        <section className="bg-white/[0.02] border border-white/5 rounded-3xl p-8">
                            <h4 className="text-white font-black text-lg mb-8 flex items-center gap-2">
                                <TrendingUp size={18} className="text-emerald-500" /> 熱門情報
                            </h4>
                            <div className="space-y-8">
                                {trendingNews.map((news, i) => (
                                    <Link key={news.slug} to={`/news/${news.slug}`} className="group block">
                                        <div className="flex gap-4">
                                            <span className="text-2xl font-black text-zinc-800 group-hover:text-emerald-500 transition-colors">0{i+1}</span>
                                            <div className="space-y-2">
                                                <h5 className="text-sm font-bold text-zinc-300 group-hover:text-white line-clamp-2 leading-snug">{news.title}</h5>
                                                <span className="text-[10px] text-zinc-600 font-mono uppercase">{news.date}</span>
                                            </div>
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        </section>

                        {/* Lab Info Card */}
                        <section className="bg-emerald-500 text-black rounded-3xl p-8 relative overflow-hidden">
                            <div className="relative z-10">
                                <h4 className="text-xl font-black mb-4 leading-tight">掌握 AI 核心領魂，<br/>拒絕數位焦慮。</h4>
                                <p className="text-sm font-bold opacity-80 mb-8 leading-relaxed">我們已為你整理 20 篇高質量 AI 教學，從完全不會到熟練指揮。</p>
                                <Link to="/insights" className="bg-black text-white px-6 py-3 rounded-xl text-xs font-black inline-flex items-center gap-2 hover:bg-zinc-900 transition-colors">
                                    免費加入學習 <ArrowRight size={14} />
                                </Link>
                            </div>
                            <Sparkles className="absolute -right-4 -bottom-4 opacity-10" size={120} />
                        </section>
                    </div>
                </aside>

            </div>

            {/* 🔗 延伸閱讀: 其他新聞 (Bottom Section) */}
            <section className="max-w-6xl mx-auto px-6 mt-32 pt-20 border-t border-white/5">
                <div className="flex items-center justify-between mb-12">
                    <h2 className="text-3xl font-black text-white flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center">
                            <BookOpenIcon size={20} className="text-emerald-500" />
                        </div>
                        延伸閱讀
                    </h2>
                    <Link to="/news" className="text-zinc-500 hover:text-white font-bold text-sm flex items-center gap-2 transition-colors">
                        查看全部新聞 <ArrowRight size={16} />
                    </Link>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {moreNews.map((article, i) => (
                        <NewsCard key={article.id} article={article} idx={i} />
                    ))}
                </div>
            </section>

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

const BookOpenIcon = ({ size, className }: any) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path>
        <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path>
    </svg>
);

const NewsCard = ({ article, idx }: any) => {
    const navigate = useNavigate();
    // 與 News.tsx 相同的卡片邏輯
    return (
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: idx * 0.05 }} viewport={{ once: true }}
            onClick={() => navigate(`/news/${article.slug}`)}
            className="bg-zinc-900/50 border border-white/5 p-8 rounded-[2rem] cursor-pointer group transition-all hover:-translate-y-2 hover:border-emerald-500/20 h-full flex flex-col shadow-xl">
            <div className="flex justify-between mb-4">
                <span className="text-[9px] font-black uppercase text-emerald-500 tracking-widest">{article.category}</span>
                <span className="text-[9px] text-zinc-700 font-mono font-bold">{article.date}</span>
            </div>
            <h3 className="text-xl font-black text-white mb-4 line-clamp-2 leading-tight group-hover:text-emerald-300 transition-colors">{article.title}</h3>
            <p className="text-zinc-500 text-sm mb-6 line-clamp-3 leading-relaxed">{article.summary}</p>
            <div className="mt-auto pt-6 border-t border-white/5 flex items-center justify-between">
                <span className="flex items-center gap-1.5 text-[10px] text-zinc-600 font-bold"><Clock size={12} /> {article.readTime}</span>
                <ArrowRight size={18} className="text-zinc-800 group-hover:text-emerald-500 group-hover:translate-x-1 transition-all" />
            </div>
        </motion.div>
    );
};

export default NewsDetail;
