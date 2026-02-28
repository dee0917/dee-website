import SEO from '../components/ui/SEO';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Zap, Clock, Shield, TrendingUp, Filter, Star } from 'lucide-react';
import { NEWS_ARTICLES } from '../data/news';
import { useMemo } from 'react';

// 與 Insights.tsx 保持 100% 一致的配色與設定
const CATEGORY_THEMES: Record<string, string> = {
    '趨勢情報': 'violet',
    '職場發展': 'rose',
    '安全隱私': 'blue',
    '全部': 'emerald'
};

const THEME_CONFIG: Record<string, any> = {
    emerald: { text: 'text-emerald-500', lightText: 'text-emerald-400', tag: 'bg-emerald-500/10 text-emerald-500', border: 'hover:border-emerald-500/20', glow: 'group-hover:shadow-emerald-500/10' },
    blue: { text: 'text-blue-500', lightText: 'text-blue-400', tag: 'bg-blue-500/10 text-blue-500', border: 'hover:border-blue-500/20', glow: 'group-hover:shadow-blue-500/10' },
    violet: { text: 'text-violet-500', lightText: 'text-violet-400', tag: 'bg-violet-500/10 text-violet-500', border: 'hover:border-violet-500/20', glow: 'group-hover:shadow-violet-500/10' },
    rose: { text: 'text-rose-500', lightText: 'text-rose-400', tag: 'bg-rose-500/10 text-rose-500', border: 'hover:border-rose-500/20', glow: 'group-hover:shadow-rose-500/10' },
    amber: { text: 'text-amber-500', lightText: 'text-amber-400', tag: 'bg-amber-500/10 text-amber-500', border: 'hover:border-amber-500/20', glow: 'group-hover:shadow-amber-500/10' },
};

const News = () => {
    const navigate = useNavigate();
    const [searchParams, setSearchParams] = useSearchParams();
    const activeCategory = searchParams.get('cat') || '全部';

    const categories = ['全部', '趨勢情報', '職場發展', '安全隱私'];

    const filteredArticles = useMemo(() => {
        if (activeCategory === '全部') return NEWS_ARTICLES;
        return NEWS_ARTICLES.filter(a => a.category === activeCategory);
    }, [activeCategory]);

    return (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="pt-32 pb-20 px-6 max-w-6xl mx-auto min-h-screen text-left relative z-0">
            <SEO title="AI 新聞情報站 - 2026 最新趨勢解析" description="由 Dee 主理的 AI 新聞板塊，為你翻譯艱澀的科技時事，轉化為具備 SEO 與 AEO 優化的白話情報與實戰指令。" path="/news" />
            
            <div className="mb-16">
                <div className="flex items-center gap-4 mb-6">
                    <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center shadow-lg shadow-emerald-500/5">
                        <Zap size={22} className="text-emerald-400" />
                    </div>
                    <div>
                        <h1 className="text-2xl md:text-3xl font-black text-white tracking-tight">AI 新聞情報站</h1>
                        <span className="text-emerald-500/60 font-mono text-[9px] tracking-[0.4em] uppercase block mt-1">Intelligence Hub</span>
                    </div>
                </div>
                
                <p className="text-zinc-400 text-lg md:text-xl max-w-2xl mb-12 leading-relaxed">
                    不只是搬運，更是深度轉譯。<br />
                    我們將艱澀的新聞，轉化為對你有用的 <span className="text-white">情報</span> 與 <span className="text-white">指令</span>。
                </p>

                {/* 與學習頁面一致的過濾標籤 UI */}
                <div className="flex items-center gap-4 mb-10 overflow-x-auto pb-4 scrollbar-hide">
                    <div className="flex-shrink-0 text-zinc-700"><Filter size={16} /></div>
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
                    <NewsCard key={article.id} article={article} idx={i} />
                ))}
            </div>

            <section className="mt-40 text-center py-20 border-t border-white/5">
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

/* ═══════════════════════════════════════════
   NEWS CARD — 確保與 InsightCard 結構完全一致
   ═══════════════════════════════════════════ */
const NewsCard = ({ article, idx }: any) => {
    const navigate = useNavigate();
    const themeColor = CATEGORY_THEMES[article.category] || article.themeColor || 'emerald';
    const theme = THEME_CONFIG[themeColor] || THEME_CONFIG.emerald;

    return (
        <motion.div initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: idx * 0.04 }} viewport={{ once: true }}
            onClick={() => navigate(`/news/${article.slug}`)}
            className={`bg-zinc-900/50 backdrop-blur-sm border border-white/[0.05] ${theme.border} p-6 md:p-7 rounded-[2rem] h-full flex flex-col relative transition-all duration-500 group group-hover:shadow-2xl ${theme.glow} cursor-pointer`}>
            
            <div className="flex flex-wrap items-center gap-2 mb-5">
                <button 
                    onClick={(e) => { e.preventDefault(); e.stopPropagation(); }}
                    className={`text-[9px] font-black px-3 py-1.5 rounded-lg tracking-[0.1em] uppercase transition-all hover:brightness-125 ${theme.tag}`}
                >
                    {article.category}
                </button>
                {article.tags?.slice(0, 2).map((tag: string, ti: number) => (
                    <span key={ti}
                        className={`text-[9px] font-bold text-zinc-500 bg-white/[0.02] px-3 py-1.5 rounded-lg border border-white/[0.04]`}
                    >
                        {tag}
                    </span>
                ))}
            </div>

            <h4 className="text-xl font-black text-white mb-3 line-clamp-2 leading-tight group-hover:text-emerald-100 transition-colors text-left">{article.title}</h4>
            <p className="text-zinc-500 text-sm line-clamp-3 mb-8 leading-relaxed font-medium text-left">{article.summary}</p>
            
            <div className="mt-auto">
                <div className="flex items-center justify-between mb-5">
                    <div className="flex gap-0.5">{[...Array(5)].map((_, i) => <Star key={i} size={8} className={i < 1 ? theme.text : 'text-zinc-800'} fill="currentColor" />)}</div>
                    <span className="text-zinc-600 text-[10px] font-black tracking-widest uppercase font-mono">{article.date}</span>
                </div>
                <div className="pt-5 border-t border-white/[0.05] flex items-center justify-between group-hover:border-white/[0.12] transition-colors">
                    <span className="text-zinc-700 text-[10px] font-mono flex items-center gap-1.5">
                        <Zap size={10} className="text-amber-500/50" /> {article.readTime}
                    </span>
                    <div className={`flex items-center gap-1.5 text-${themeColor}-500/50 group-hover:text-${themeColor}-400 transition-all`}>
                        <span className="text-[10px] font-black uppercase tracking-widest opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all">Read</span>
                        <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

export default News;
