import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, ArrowRight, Copy, Check, Sparkles, Smartphone, Share2, ExternalLink, Zap, Shield, TrendingUp, Info, Clock, Calendar, Rocket } from 'lucide-react';
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
                    
                    <div className="flex flex-wrap items-center gap-4 mb-8">
                        <span className="text-[10px] font-black px-4 py-1.5 rounded-full bg-white/5 border border-white/10 uppercase tracking-widest text-zinc-400">
                            {article.category}
                        </span>
                        {article.author === "Echo" && (
                            <span className="text-[10px] font-black px-4 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 uppercase tracking-widest text-indigo-400">
                                🕵️ 艾可 AI 記者
                            </span>
                        )}
                        <div className="flex items-center gap-2 bg-black/40 px-4 py-1.5 rounded-full border border-white/5">
                            <Clock size={12} className="text-zinc-500" />
                            <span className="text-[10px] font-bold text-zinc-300 font-mono">發布時間：{article.publish_time || article.date} (TST)</span>
                        </div>
                    </div>

                    <h1 className="text-3xl md:text-5xl lg:text-6xl font-black text-white mb-10 tracking-tight leading-[1.15]">
                        {article.title}
                    </h1>
                </div>
            </section>

            {/* Main Content with Sidebar */}
            <div className="max-w-6xl mx-auto px-6 py-20 lg:grid lg:grid-cols-12 gap-16">
                
                {/* Left Column: News Body */}
                <div className="lg:col-span-8 space-y-20 text-left">
                    
                    <div className="space-y-8 mb-16">
                        <p className="text-xl md:text-2xl text-zinc-300 leading-relaxed border-l-4 border-emerald-500 pl-8 italic">
                            {article.summary}
                        </p>
                    </div>

                    {/* 1. 關鍵情報 */}
                    <motion.section {...fadeUp} className="bg-white/[0.02] border border-white/5 rounded-[2.5rem] p-8 md:p-12">
                        <div className="flex items-center gap-3 mb-8">
                            <Zap size={20} className="text-amber-400" />
                            <h2 className="text-2xl font-black text-white uppercase tracking-tight">關鍵情報摘要</h2>
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

                    {/* 2. 事件解析 (Enhanced Content) */}
                    <motion.section {...fadeUp} className="space-y-16">
                        <div className="flex items-center gap-3">
                            <Info size={24} className="text-emerald-500" />
                            <h2 className="text-2xl font-black text-white">深度事件解析</h2>
                        </div>
                        {article.event_breakdown.map((item: any, i: number) => (
                            <div key={i} className="space-y-8">
                                <h3 className="text-2xl font-black text-white flex items-center gap-3 group">
                                    <div className="w-1.5 h-6 bg-emerald-500 rounded-full group-hover:h-8 transition-all" /> 
                                    {item.title}
                                </h3>
                                <div className="text-lg text-zinc-400 leading-[1.8] space-y-4">
                                    {/* 這裡模擬將內文拉長，分段呈現 */}
                                    {item.content.split('。').map((sentence: string, sidx: number) => (
                                        sentence.length > 2 && <p key={sidx}>{sentence}。</p>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </motion.section>

                    {/* 3. 利益相關透視 */}
                    <motion.section {...fadeUp} className="grid md:grid-cols-2 gap-6">
                        {article.impact_analysis.map((impact: any, i: number) => (
                            <div key={i} className="bg-zinc-900/50 border border-white/5 p-8 rounded-3xl relative overflow-hidden group">
                                <div className="absolute -right-4 -bottom-4 opacity-5 group-hover:opacity-10 transition-opacity">
                                    <TrendingUp size={120} />
                                </div>
                                <span className="text-[10px] font-black uppercase tracking-widest text-emerald-500 mb-4 block">對 {impact.target} 的影響</span>
                                <p className="text-white text-lg font-bold leading-relaxed relative z-10">{impact.description}</p>
                            </div>
                        ))}
                    </motion.section>

                    {/* 4. Dee 的評語 */}
                    <motion.section {...fadeUp} className="bg-emerald-500/5 p-10 rounded-[3rem] border border-emerald-500/10 relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/5 blur-3xl rounded-full" />
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
                    <motion.section {...fadeUp} className="relative py-24 px-8 rounded-[4rem] bg-[#0f0f0f] border border-emerald-500/20 overflow-hidden text-center">
                        <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/5 to-teal-500/5" />
                        <div className="relative z-10">
                            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-[10px] font-black uppercase tracking-[0.3em] mb-8">
                                <Rocket size={12} /> Take the next step
                            </div>
                            <h2 className="text-3xl md:text-5xl font-black text-white mb-6 tracking-tight">{article.cta_override?.title || '想學習 AI？'}</h2>
                            <p className="text-zinc-400 text-lg md:text-xl mb-12 max-w-2xl mx-auto leading-relaxed font-medium">
                                {article.cta_override?.description}
                            </p>
                            <Link to="/insights" className="bg-emerald-500 text-black px-12 py-6 rounded-2xl font-black text-2xl inline-flex items-center gap-4 hover:bg-emerald-400 transition-all shadow-2xl">
                                {article.cta_override?.button_text || '立即開始學習'}
                                <ArrowRight size={28} />
                            </Link>
                        </div>
                    </motion.section>

                </div>

                {/* Right Column: Sidebar */}
                <aside className="hidden lg:block lg:col-span-4 space-y-12 text-left">
                    <div className="sticky top-32 space-y-12">
                        {/* Trending Section */}
                        <section className="bg-white/[0.02] border border-white/5 rounded-[2.5rem] p-8">
                            <h4 className="text-white font-black text-lg mb-8 flex items-center gap-2">
                                <TrendingUp size={18} className="text-emerald-500" /> 熱門情報
                            </h4>
                            <div className="space-y-10">
                                {trendingNews.map((news, i) => (
                                    <Link key={news.slug} to={`/news/${news.slug}`} className="group block">
                                        <div className="flex gap-5">
                                            <span className="text-3xl font-black text-zinc-800 group-hover:text-emerald-500 transition-colors">0{i+1}</span>
                                            <div className="space-y-2">
                                                <h5 className="text-[15px] font-bold text-zinc-300 group-hover:text-white line-clamp-2 leading-snug transition-colors">{news.title}</h5>
                                                <div className="flex items-center gap-2 text-[9px] text-zinc-600 font-mono uppercase">
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

                        {/* Lab Info Card */}
                        <section className="bg-gradient-to-br from-emerald-500 to-teal-600 text-black rounded-[2.5rem] p-10 relative overflow-hidden shadow-2xl">
                            <div className="relative z-10">
                                <h4 className="text-2xl font-black mb-4 leading-tight">掌握 AI 核心領魂，<br/>拒絕數位焦慮。</h4>
                                <p className="text-sm font-bold opacity-80 mb-8 leading-relaxed">我們已為你整理 20 篇高質量 AI 教學，從完全不會到熟練指揮。</p>
                                <Link to="/insights" className="bg-black text-white px-8 py-4 rounded-2xl text-xs font-black inline-flex items-center gap-2 hover:bg-zinc-900 transition-all shadow-lg">
                                    免費加入學習 <ArrowRight size={14} />
                                </Link>
                            </div>
                            <Sparkles className="absolute -right-4 -bottom-4 opacity-10" size={140} />
                        </section>
                    </div>
                </aside>

            </div>

            {/* 🔗 延伸閱讀: 其他新聞 (Bottom Section) */}
            <section className="max-w-6xl mx-auto px-6 mt-32 pt-20 border-t border-white/5 text-left">
                <div className="flex items-center justify-between mb-12">
                    <h2 className="text-3xl font-black text-white flex items-center gap-3">
                        <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center">
                            <Zap size={24} className="text-emerald-500" />
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

const NewsCard = ({ article, idx }: any) => {
    const navigate = useNavigate();
    return (
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: idx * 0.05 }} viewport={{ once: true }}
            onClick={() => navigate(`/news/${article.slug}`)}
            className="bg-zinc-900/50 border border-white/5 p-8 rounded-[2.5rem] cursor-pointer group transition-all hover:-translate-y-2 hover:border-emerald-500/20 h-full flex flex-col shadow-xl">
            <div className="flex justify-between mb-4">
                <span className="text-[9px] font-black uppercase text-emerald-500 tracking-widest">{article.category}</span>
                <span className="text-[9px] text-zinc-700 font-mono font-bold">{article.publish_time || article.date}</span>
            </div>
            <h3 className="text-xl font-black text-white mb-4 line-clamp-2 leading-tight group-hover:text-emerald-300 transition-colors text-left">{article.title}</h3>
            <p className="text-zinc-500 text-sm mb-6 line-clamp-3 leading-relaxed text-left">{article.summary}</p>
            <div className="mt-auto pt-6 border-t border-white/5 flex items-center justify-between">
                <span className="flex items-center gap-1.5 text-[10px] text-zinc-600 font-bold"><Clock size={12} /> {article.readTime}</span>
                <ArrowRight size={18} className="text-zinc-800 group-hover:text-emerald-500 group-hover:translate-x-1 transition-all" />
            </div>
        </motion.div>
    );
};

export default NewsDetail;
