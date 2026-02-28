import SEO from '../components/ui/SEO';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Zap, Clock, Shield, TrendingUp } from 'lucide-react';
import { NEWS_ARTICLES } from '../data/news';

const News = () => {
    const navigate = useNavigate();

    const themeMap: Record<string, string> = {
        blue: 'border-blue-500/20 hover:border-blue-500/40 shadow-blue-500/5',
        rose: 'border-rose-500/20 hover:border-rose-500/40 shadow-rose-500/5',
        amber: 'border-amber-500/20 hover:border-amber-500/40 shadow-amber-500/5',
        emerald: 'border-emerald-500/20 hover:border-emerald-500/40 shadow-emerald-500/5',
    };

    const textThemeMap: Record<string, string> = {
        blue: 'text-blue-400',
        rose: 'text-rose-400',
        amber: 'text-amber-400',
        emerald: 'text-emerald-400',
    };

    return (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="pt-32 pb-20 px-6 max-w-6xl mx-auto min-h-screen">
            <SEO title="AI 新聞情報站 - 2026 最新趨勢解析" description="由 Dee 主理的 AI 新聞板塊，為你翻譯艱澀的科技時事，轉化為具備 SEO 與 AEO 優化的白話情報與實戰指令。" path="/news" />
            
            <div className="text-center mb-20">
                <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
                    className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-500 text-[10px] font-black uppercase tracking-[0.3em] mb-6">
                    <Zap size={12} /> Live Intelligence
                </motion.div>
                <h1 className="text-4xl md:text-6xl font-black text-white mb-6 tracking-tight">AI 新聞情報站</h1>
                <p className="text-zinc-400 text-xl max-w-2xl mx-auto leading-relaxed font-medium">
                    不只是搬運，更是深度轉譯。<br />
                    我們將艱澀的新聞，轉化為對你有用的 <span className="text-white">情報</span> 與 <span className="text-white">指令</span>。
                </p>
            </div>

            {NEWS_ARTICLES.length === 0 ? (
                <div className="text-center py-20 bg-white/[0.02] rounded-3xl border border-white/5">
                    <p className="text-zinc-500 text-lg">情報系統更新中，請稍後再試...</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {NEWS_ARTICLES.map((article, i) => (
                        <motion.div
                            key={article.id}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.1 }}
                            viewport={{ once: true }}
                            onClick={() => navigate(`/news/${article.slug}`)}
                            className={`bg-zinc-900/50 backdrop-blur-sm border ${themeMap[article.themeColor]} p-8 rounded-[2.5rem] cursor-pointer group transition-all hover:-translate-y-2 hover:shadow-2xl flex flex-col h-full`}
                        >
                            <div className="flex items-center justify-between mb-6">
                                <div className="flex items-center gap-2">
                                    <span className={`text-[9px] font-black uppercase tracking-widest px-2 py-1 rounded bg-white/5 ${textThemeMap[article.themeColor]}`}>
                                        {article.category}
                                    </span>
                                </div>
                                <span className="text-zinc-700 text-[10px] font-bold font-mono">{article.date}</span>
                            </div>

                            <h3 className="text-2xl font-black text-white mb-4 group-hover:text-emerald-300 transition-colors leading-tight">
                                {article.title}
                            </h3>
                            
                            <p className="text-zinc-500 text-sm mb-8 line-clamp-3 leading-relaxed font-medium">
                                {article.summary}
                            </p>

                            <div className="mt-auto pt-6 border-t border-white/5 flex items-center justify-between">
                                <div className="flex items-center gap-3 text-zinc-600">
                                    <span className="flex items-center gap-1.5 text-[10px] font-bold"><Clock size={12} /> {article.readTime}</span>
                                    <span className="w-1 h-1 rounded-full bg-zinc-800" />
                                    <span className="flex items-center gap-1.5 text-[10px] font-bold text-zinc-500 italic">{article.source_name.split(' / ')[0]}</span>
                                </div>
                                <div className={`w-10 h-10 rounded-full bg-white/5 flex items-center justify-center group-hover:${themeMap[article.themeColor].split(' ')[0].replace('border', 'bg')} group-hover:text-black transition-all`}>
                                    <ArrowRight size={18} className="group-hover:translate-x-0.5 transition-transform" />
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            )}

            {/* AEO/SEO Information Section */}
            <section className="mt-40 text-center py-20 border-t border-white/5">
                <div className="max-w-3xl mx-auto">
                    <h2 className="text-zinc-600 text-xs font-black uppercase tracking-[0.4em] mb-10 text-center">Dee's News Manifesto</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                        <div className="space-y-4">
                            <Shield className="text-blue-500 mx-auto" size={24} />
                            <h4 className="text-white font-bold">100% 真實引證</h4>
                            <p className="text-zinc-500 text-xs leading-relaxed">拒絕標題黨，所有新聞均具備主流媒體來源引證。</p>
                        </div>
                        <div className="space-y-4">
                            <TrendingUp className="text-rose-500 mx-auto" size={24} />
                            <h4 className="text-white font-bold">利益衝擊透視</h4>
                            <p className="text-zinc-500 text-xs leading-relaxed">我們不只告訴你發生了什麼，更告訴你這如何影響你的工作與荷包。</p>
                        </div>
                        <div className="space-y-4">
                            <Zap className="text-amber-500 mx-auto" size={24} />
                            <h4 className="text-white font-bold">即時行動指南</h4>
                            <p className="text-zinc-500 text-xs leading-relaxed">每則時事都附贈一組實踐指令，讓新聞變成你的生產力武器。</p>
                        </div>
                    </div>
                </div>
            </section>
        </motion.div>
    );
};

export default News;
