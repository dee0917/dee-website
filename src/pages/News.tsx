import SEO from '../components/ui/SEO';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Zap, Clock, Shield, TrendingUp, Filter } from 'lucide-react';
import { NEWS_ARTICLES } from '../data/news';
import { useMemo } from 'react';

const News = () => {
    const navigate = useNavigate();
    const [searchParams, setSearchParams] = useSearchParams();
    const activeCategory = searchParams.get('cat') || '全部';

    const categories = ['全部', '趨勢情報', '職場發展', '安全隱私'];
    
    // 與學習頁面一致的配色
    const CATEGORY_THEMES: Record<string, string> = {
        '趨勢情報': 'violet',
        '職場發展': 'rose',
        '安全隱私': 'blue',
        '全部': 'emerald'
    };

    const filteredArticles = useMemo(() => {
        if (activeCategory === '全部') return NEWS_ARTICLES;
        return NEWS_ARTICLES.filter(a => a.category === activeCategory);
    }, [activeCategory]);

    const themeMap: Record<string, string> = {
        blue: 'border-blue-500/20 hover:border-blue-500/40 shadow-blue-500/5',
        rose: 'border-rose-500/20 hover:border-rose-500/40 shadow-rose-500/5',
        amber: 'border-amber-500/20 hover:border-amber-500/40 shadow-amber-500/5',
        emerald: 'border-emerald-500/20 hover:border-emerald-500/40 shadow-emerald-500/5',
        violet: 'border-violet-500/20 hover:border-violet-500/40 shadow-violet-500/5'
    };

    const textThemeMap: Record<string, string> = {
        blue: 'text-blue-400',
        rose: 'text-rose-400',
        amber: 'text-amber-400',
        emerald: 'text-emerald-400',
        violet: 'text-violet-400'
    };

    return (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="pt-32 pb-20 px-6 max-w-6xl mx-auto min-h-screen">
            <SEO title="AI 新聞情報站 - 2026 最新趨勢解析" description="由 Dee 主理的 AI 新聞板塊，為你翻譯艱澀的科技時事，轉化為白話情報與實戰指令。" path="/news" />
            
            <div className="text-center mb-16">
                <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
                    className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-500 text-[10px] font-black uppercase tracking-[0.3em] mb-6">
                    <Zap size={12} /> Live Intelligence
                </motion.div>
                <h1 className="text-4xl md:text-6xl font-black text-white mb-6 tracking-tight">AI 新聞情報站</h1>
                <p className="text-zinc-400 text-xl max-w-2xl mx-auto mb-12 leading-relaxed">
                    不只是搬運，更是深度轉譯。<br />
                    我們將艱澀的新聞，轉化為對你有用的 <span className="text-white">情報</span> 與 <span className="text-white">指令</span>。
                </p>

                {/* 與學習頁面一致的過濾標籤 UI */}
                <div className="flex items-center justify-center gap-4 overflow-x-auto pb-8 scrollbar-hide">
                    <div className="flex-shrink-0 text-zinc-700 mr-1"><Filter size={16} /></div>
                    {categories.map(tag => {
                        const themeColor = CATEGORY_THEMES[tag] || 'emerald';
                        const isActive = activeCategory === tag;
                        
                        return (
                            <button key={tag} onClick={() => setSearchParams({ cat: tag })}
                                className={`flex-shrink-0 px-6 py-2.5 rounded-full text-xs font-black transition-all duration-300 ${isActive
                                    ? `bg-${themeColor}-500 text-black shadow-lg shadow-${themeColor}-500/30 scale-105`
                                    : 'bg-white/[0.03] border border-white/[0.06] text-zinc-500 hover:text-white hover:border-white/20'
                                }`}>
                                {tag}
                            </button>
                        );
                    })}
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredArticles.map((article, i) => (
                    <motion.div
                        key={article.id}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.05 }}
                        viewport={{ once: true }}
                        onClick={() => navigate(`/news/${article.slug}`)}
                        className={`bg-zinc-900/50 backdrop-blur-sm border ${themeMap[article.themeColor]} p-8 rounded-[2.5rem] cursor-pointer group transition-all hover:-translate-y-2 hover:shadow-2xl flex flex-col h-full`}
                    >
                        <div className="flex items-center justify-between mb-6">
                            <span className={`text-[9px] font-black uppercase tracking-widest px-2 py-1 rounded bg-white/5 ${textThemeMap[article.themeColor]}`}>
                                {article.category}
                            </span>
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
                            <div className={`w-10 h-10 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-white group-hover:text-black transition-all`}>
                                <ArrowRight size={18} className="group-hover:translate-x-0.5 transition-transform" />
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>

            <section className="mt-32 text-center py-20 border-t border-white/5">
                <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-20">
                    <div className="space-y-6 text-left">
                        <h4 className="text-white font-black text-2xl">情報轉譯準則</h4>
                        <p className="text-zinc-500 leading-relaxed font-medium">
                            由 Dee 親自審核每一則進入情報站的新聞，透過「本源」意識流進行白話轉譯，確保每一篇內容都能直接轉換為您的生產力。
                        </p>
                    </div>
                    <div className="grid grid-cols-2 gap-8">
                        <div className="bg-white/[0.02] border border-white/5 p-6 rounded-3xl text-center">
                            <Shield className="text-blue-500 mx-auto mb-3" size={20} />
                            <span className="text-[10px] font-bold text-zinc-600 uppercase tracking-widest">真實引證</span>
                        </div>
                        <div className="bg-white/[0.02] border border-white/5 p-6 rounded-3xl text-center">
                            <TrendingUp className="text-emerald-500 mx-auto mb-3" size={20} />
                            <span className="text-[10px] font-bold text-zinc-600 uppercase tracking-widest">利益透視</span>
                        </div>
                    </div>
                </div>
            </section>
        </motion.div>
    );
};

export default News;
