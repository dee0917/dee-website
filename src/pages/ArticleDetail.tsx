import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, AlertTriangle, Lightbulb, Code, CheckCircle, ArrowRight, Copy, Check, Zap } from 'lucide-react';
import { motion } from 'framer-motion';
import { api } from '../lib/supabase';
import { INSIGHTS } from '../data/mock';
import SEO from '../components/ui/SEO';

const fadeUp = {
    initial: { opacity: 0, y: 30 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: "-40px" },
    transition: { duration: 0.45 }
};

const ArticleDetail = () => {
    const { id } = useParams();
    const [article, setArticle] = useState<any | null>(null);
    const [loading, setLoading] = useState(true);
    const [copied, setCopied] = useState(false);
    const [progress, setProgress] = useState(0);

    const getColorClasses = (themeColor: string) => {
        const colors: Record<string, any> = {
            emerald: { text: 'text-emerald-500', lightText: 'text-emerald-400', bg: 'bg-emerald-500/10', border: 'border-emerald-500/20', gradient: 'from-emerald-500/10 to-teal-500/10' },
            yellow: { text: 'text-yellow-500', lightText: 'text-yellow-400', bg: 'bg-yellow-500/10', border: 'border-yellow-500/20', gradient: 'from-yellow-500/10 to-orange-500/10' },
            amber: { text: 'text-amber-500', lightText: 'text-amber-400', bg: 'bg-amber-500/10', border: 'border-amber-500/20', gradient: 'from-amber-500/10 to-yellow-500/10' },
            blue: { text: 'text-blue-500', lightText: 'text-blue-400', bg: 'bg-blue-500/10', border: 'border-blue-500/20', gradient: 'from-blue-500/10 to-indigo-500/10' },
            violet: { text: 'text-violet-500', lightText: 'text-violet-400', bg: 'bg-violet-500/10', border: 'border-violet-500/20', gradient: 'from-violet-500/10 to-purple-500/10' },
            rose: { text: 'text-rose-500', lightText: 'text-rose-400', bg: 'bg-rose-500/10', border: 'border-rose-500/20', gradient: 'from-rose-500/10 to-pink-500/10' },
            teal: { text: 'text-teal-500', lightText: 'text-teal-400', bg: 'bg-teal-500/10', border: 'border-teal-500/20', gradient: 'from-teal-500/10 to-cyan-500/10' },
            zinc: { text: 'text-zinc-300', lightText: 'text-zinc-200', bg: 'bg-white/5', border: 'border-white/10', gradient: 'from-white/5 to-zinc-900' }
        };
        return colors[themeColor] || colors.emerald;
    };

    // 閱讀進度條
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
        setLoading(true);
        const localArticle = INSIGHTS.find(i => i.id === articleId);
        const dbData = await api.getInsightById(articleId);
        if (localArticle) {
            setArticle({ ...dbData, ...localArticle });
        } else if (dbData) {
            setArticle(dbData);
        } else {
            setArticle(null);
        }
        setLoading(false);
    };

    const handleCopy = (text: string) => {
        navigator.clipboard.writeText(text);
        setCopied(true);
        setTimeout(() => setCopied(false), 3000);
    };

    if (loading) return <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center text-white font-mono">LOADING...</div>;
    if (!article) return <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center text-white">404_NOT_FOUND</div>;

    const theme = getColorClasses(article.themeColor || article.theme_color || 'emerald');
    const isNews = article.category === 'AI 新聞';
    const nextArticle = INSIGHTS.find(i => i.difficulty_level === (Math.min(5, Math.max(0, article.difficulty_level || 1))) + 1) || INSIGHTS[0];

    return (
        <>
            {/* 📊 閱讀進度條 */}
            <motion.div
                className="fixed top-20 left-0 right-0 h-1 z-50 origin-left"
                style={{
                    scaleX: progress,
                    background: `linear-gradient(90deg, #6b7280 0%, #10b981 100%)`
                }}
            />

            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="pt-28 pb-20 px-5 md:px-6 max-w-3xl mx-auto min-h-screen text-left">
                <SEO title={article.title} description={article.summary || article.pain_point || ''} path={`/insights/${article.id}`} />

                {/* 返回 + 分類 */}
                <div className="flex items-center justify-between mb-8">
                    <Link to={isNews ? "/news" : "/insights"} className="inline-flex items-center gap-2 text-zinc-500 hover:text-white transition-colors text-sm font-medium">
                        <ArrowLeft size={16} /> 返回列表
                    </Link>
                    <div className="flex items-center gap-3">
                        <span className={`${theme.text} font-bold uppercase tracking-widest text-[10px]`}>{article.category}</span>
                        <span className="text-zinc-700 text-[10px] font-mono">{article.date}</span>
                    </div>
                </div>

                {/* 🎯 標題（精簡版） */}
                <motion.header {...fadeUp} className="mb-12">
                    <h1 className="text-2xl md:text-4xl font-bold text-white leading-tight font-serif mb-4">{article.title}</h1>
                    {article.readTime && (
                        <span className="text-xs text-zinc-500 font-medium">⏱ {article.readTime}</span>
                    )}
                </motion.header>

                {!isNews && (
                    <div className="space-y-6 mb-12">

                        {/* 1️⃣ HOOK — 痛點 */}
                        {article.pain_point && (
                            <motion.div {...fadeUp} className="bg-red-500/5 border border-red-500/15 rounded-2xl p-5 md:p-6">
                                <div className="flex items-start gap-3">
                                    <AlertTriangle size={20} className="text-red-400 flex-shrink-0 mt-0.5" />
                                    <div>
                                        <h2 className="text-base font-bold text-white mb-2">你是不是也這樣？</h2>
                                        <p className="text-zinc-300 text-sm md:text-base leading-relaxed" dangerouslySetInnerHTML={{ __html: article.pain_point }} />
                                    </div>
                                </div>
                            </motion.div>
                        )}

                        {/* 2️⃣ MAGIC — 實例對比（提前展示威力） */}
                        {article.example && (
                            <motion.div {...fadeUp} className="rounded-2xl overflow-hidden">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-0 md:gap-4">
                                    <div className="bg-red-500/5 border border-red-500/10 rounded-t-2xl md:rounded-2xl p-5">
                                        <span className="text-red-400 font-bold text-[10px] block mb-2 uppercase tracking-widest">❌ 以前的你</span>
                                        <p className="text-zinc-500 text-sm leading-relaxed">{article.example.wrong}</p>
                                    </div>
                                    <div className="bg-emerald-500/5 border border-emerald-500/10 rounded-b-2xl md:rounded-2xl p-5">
                                        <span className="text-emerald-400 font-bold text-[10px] block mb-2 uppercase tracking-widest">✅ 學完之後的你</span>
                                        <p className="text-zinc-300 text-sm leading-relaxed whitespace-pre-line">{article.example.right}</p>
                                    </div>
                                </div>
                            </motion.div>
                        )}

                        {/* 3️⃣ 轉折 — 場景 + 解決方案（合併） */}
                        {(article.scenario || article.solution) && (
                            <motion.div {...fadeUp} className={`bg-gradient-to-r ${theme.gradient} border ${theme.border} rounded-2xl p-5 md:p-6`}>
                                <div className="flex items-start gap-3">
                                    <Lightbulb size={20} className={`${theme.lightText} flex-shrink-0 mt-0.5`} />
                                    <div className="space-y-3">
                                        <h2 className="text-base font-bold text-white">換個方式試試</h2>
                                        {article.scenario && (
                                            <p className="text-zinc-300 text-sm md:text-base leading-relaxed" dangerouslySetInnerHTML={{ __html: article.scenario }} />
                                        )}
                                        {article.solution && (
                                            <p className="text-zinc-400 text-sm leading-relaxed" dangerouslySetInnerHTML={{ __html: article.solution }} />
                                        )}
                                    </div>
                                </div>
                            </motion.div>
                        )}
                    </div>
                )}

                {/* 4️⃣ QUEST — 碎步教學（正文） */}
                <motion.article
                    {...fadeUp}
                    className="article-content prose prose-invert max-w-none leading-relaxed mb-12 text-left"
                    dangerouslySetInnerHTML={{ __html: article.content || '' }}
                />

                {/* 5️⃣ TREASURE — 實戰包（寶物掉落） */}
                {!isNews && article.practice_kit && (
                    <motion.div {...fadeUp} className={`bg-[#0a0a0a] border ${theme.border} rounded-2xl md:rounded-[2rem] p-6 md:p-10 mb-12 relative overflow-hidden`}>
                        <div className={`absolute top-0 right-0 w-48 h-48 bg-gradient-to-br ${theme.gradient} opacity-5 blur-3xl`} />

                        <div className="relative z-10">
                            <div className="flex flex-col gap-4 mb-6">
                                <div className="flex items-center gap-3">
                                    <div className={`w-10 h-10 rounded-xl ${theme.bg} flex items-center justify-center`}>
                                        <Code size={20} className={theme.lightText} />
                                    </div>
                                    <div>
                                        <h3 className="text-lg md:text-xl font-bold text-white">🎁 實戰包</h3>
                                        <p className={`${theme.lightText} text-xs font-medium`}>{article.practice_kit.title}</p>
                                    </div>
                                </div>

                                <motion.button
                                    whileTap={{ scale: 0.95 }}
                                    onClick={() => handleCopy(article.practice_kit.command)}
                                    className={`w-full flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl font-bold text-sm transition-all ${copied
                                        ? 'bg-emerald-500 text-white shadow-lg shadow-emerald-500/30'
                                        : `${theme.bg} ${theme.lightText} hover:brightness-125 border ${theme.border}`
                                    }`}
                                >
                                    {copied
                                        ? <><Check size={18} /> 已複製！去試試看 🚀</>
                                        : <><Copy size={18} /> 一鍵複製指令</>
                                    }
                                </motion.button>
                            </div>

                            <p className="text-zinc-400 text-sm mb-4 leading-relaxed">{article.practice_kit.description}</p>

                            <div className={`bg-black/60 backdrop-blur-xl border border-white/10 rounded-xl p-5 md:p-6 font-mono text-sm leading-loose ${theme.lightText} whitespace-pre-wrap text-left`}>
                                {article.practice_kit.command}
                            </div>
                        </div>
                    </motion.div>
                )}

                {/* 6️⃣ 金句（呼吸點） */}
                {article.insight_quote && (
                    <motion.p {...fadeUp} className="text-lg md:text-xl text-zinc-300 font-serif italic text-center py-8 border-y border-white/5 my-10 leading-relaxed">
                        「{article.insight_quote}」
                    </motion.p>
                )}

                {/* 7️⃣ 下一階挑戰 */}
                <motion.div {...fadeUp} className="pt-12 border-t border-white/5">
                    <p className="text-zinc-500 text-xs font-bold uppercase tracking-widest mb-4">趁熱打鐵 →</p>
                    <Link to={`/insights/${nextArticle.id}`} className="group block bg-white/5 border border-white/10 hover:border-emerald-500/30 p-6 md:p-8 rounded-2xl transition-all">
                        <div className="flex items-center justify-between">
                            <div>
                                <span className="text-[10px] text-zinc-500 uppercase tracking-widest mb-2 block">下一篇</span>
                                <h3 className="text-lg font-bold text-white group-hover:text-emerald-400 transition-colors">{nextArticle.title}</h3>
                            </div>
                            <ArrowRight className="text-zinc-700 group-hover:text-emerald-400 group-hover:translate-x-2 transition-all flex-shrink-0" size={28} />
                        </div>
                    </Link>
                </motion.div>
            </motion.div>
        </>
    );
};
export default ArticleDetail;
