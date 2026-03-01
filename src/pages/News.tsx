import SEO from '../components/ui/SEO';
import { useNavigate, useSearchParams, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Zap, Clock, Shield, TrendingUp, Filter, Star, Info, MessageCircle, Sparkles, Coffee, AlertTriangle, X, History, GitMerge, ChevronRight } from 'lucide-react';
import { NEWS_ARTICLES } from '../data/news';
import { useMemo } from 'react';

// 確保字串完全匹配
const CAT_GOSSIP = "吃瓜特報";
const CAT_BRAIN = "腦洞大開";
const CAT_LAZY = "懶人神器";
const CAT_INDUSTRY = "產業脈動";
const CAT_POLICY = "政策法規";
const CAT_APP = "實戰應用";
const CAT_SECURITY = "安全防禦";
const CAT_CAREER = "職場轉型";
const CAT_ALL = "全部";

const CATEGORY_THEMES: Record<string, string> = {
    [CAT_GOSSIP]: 'orange',
    [CAT_BRAIN]: 'teal',
    [CAT_LAZY]: 'indigo',
    [CAT_INDUSTRY]: 'violet',
    [CAT_POLICY]: 'rose',
    [CAT_APP]: 'amber',
    [CAT_SECURITY]: 'blue',
    [CAT_CAREER]: 'emerald',
    [CAT_ALL]: 'emerald'
};

const BUTTON_THEMES: Record<string, string> = {
    orange: 'bg-orange-500 text-black border-orange-500 shadow-orange-500/20',
    teal: 'bg-teal-500 text-black border-teal-500 shadow-teal-500/20',
    indigo: 'bg-indigo-500 text-black border-indigo-500 shadow-indigo-500/20',
    violet: 'bg-violet-500 text-black border-violet-500 shadow-violet-500/20',
    rose: 'bg-rose-500 text-black border-rose-500 shadow-rose-500/20',
    amber: 'bg-amber-500 text-black border-amber-500 shadow-amber-500/20',
    blue: 'bg-blue-500 text-black border-blue-500 shadow-blue-500/20',
    emerald: 'bg-emerald-500 text-black border-emerald-500 shadow-emerald-500/20',
};

const THEME_CONFIG: Record<string, any> = {
    emerald: { text: 'text-emerald-500', lightText: 'text-emerald-400', tag: 'bg-emerald-500/10 text-emerald-500', border: 'hover:border-emerald-500/20', glow: 'group-hover:shadow-emerald-500/10' },
    blue: { text: 'text-blue-500', lightText: 'text-blue-400', tag: 'bg-blue-500/10 text-blue-500', border: 'hover:border-blue-500/20', glow: 'group-hover:shadow-blue-500/10' },
    violet: { text: 'text-violet-500', lightText: 'text-violet-400', tag: 'bg-violet-500/10 text-violet-500', border: 'hover:border-violet-500/20', glow: 'group-hover:shadow-violet-500/10' },
    rose: { text: 'text-rose-500', lightText: 'text-rose-400', tag: 'bg-rose-500/10 text-rose-500', border: 'hover:border-rose-500/20', glow: 'group-hover:shadow-rose-500/10' },
    amber: { text: 'text-amber-500', lightText: 'text-amber-400', tag: 'bg-amber-500/10 text-amber-400', border: 'hover:border-blue-500/20', glow: 'group-hover:shadow-amber-500/10' },
    orange: { text: 'text-orange-500', lightText: 'text-orange-400', tag: 'bg-orange-500/10 text-orange-500', border: 'hover:border-orange-500/20', glow: 'group-hover:shadow-orange-500/10' },
    teal: { text: 'text-teal-500', lightText: 'text-teal-400', tag: 'bg-teal-500/10 text-teal-500', border: 'hover:border-teal-500/20', glow: 'group-hover:shadow-teal-500/10' },
    indigo: { text: 'text-indigo-500', lightText: 'text-indigo-400', tag: 'bg-indigo-500/10 text-indigo-500', border: 'hover:border-indigo-500/20', glow: 'group-hover:shadow-indigo-500/10' },
};

const TREND_METADATA: Record<string, { description: string; subtext: string }> = {
    "代理人革命": {
        description: "艾可正在為您溯源「代理人革命」的崛起。從早期的指令自動化到今日具備主權的 Agent OS，我們見證了 AI 從工具化向實體化的跨越。",
        subtext: "核心指標：自治率、OS 滲透度、數位生命連續性。"
    },
    "算力霸權": {
        description: "這是一場關於「電費與晶片」的無聲戰爭。艾可為您追蹤全球算力資本的流動，揭示頂級巨頭如何透過硬體牆建立起 AI 時代的新邊界。",
        subtext: "核心指標：TPU/GPU 產能、算力成本曲線、能源主權。"
    },
    "數據主權": {
        description: "拒絕被偷看！艾可正在監控「數據主權」的攻防戰。當隱私沙盒與本地運算成為標配，我們正在重新定義數位世界的人權標準。",
        subtext: "核心指標：本地化模型比率、隱私沙盒普及度、法規對抗。"
    },
    "文明重塑": {
        description: "18 個月的職場窗口期正在倒數。艾可為您分析 AI 如何深度切除社會中間層，並在廢墟中孵化出「AI 經理人」等新型社會結構。",
        subtext: "核心指標：自動化替代率、AI 轉崗率、倫理紅線位移。"
    },
    "感官進化": {
        description: "當 AI 具備了立體透視眼與多模態感知力，現實與虛擬的邊界已徹底模糊。艾可帶您領略技術降維後的視覺、聽覺與空間革命。",
        subtext: "核心指標：3D 遮擋算法、跨模態延遲、具身智能成熟度。"
    },
    "開源邊界": {
        description: "這是一場關於「技術民主」的最後守望。艾可正在記錄開源社群如何與中心化霸權進行百億級的遊說與代碼博弈。",
        subtext: "核心指標：Llama 影響力、PAC 遊說資金、模型透明度。"
    }
};

const News = () => {
    const navigate = useNavigate();
    const [searchParams, setSearchParams] = useSearchParams();
    const activeCategory = searchParams.get('cat') || CAT_ALL;
    const activeTrend = searchParams.get('trend');

    const availableTrends = useMemo(() => {
        const trends = new Set(NEWS_ARTICLES.map(a => a.trend_cluster).filter(Boolean));
        return Array.from(trends) as string[];
    }, []);

    const categories = [CAT_ALL, CAT_GOSSIP, CAT_BRAIN, CAT_LAZY, CAT_INDUSTRY, CAT_POLICY, CAT_APP, CAT_SECURITY, CAT_CAREER];

    const filteredArticles = useMemo(() => {
        let items = [...NEWS_ARTICLES];
        if (activeTrend) {
            return items.filter(a => a.trend_cluster === activeTrend).sort((a, b) => b.id - a.id);
        }
        if (activeCategory === CAT_ALL) return items;
        return items.filter(a => a.category.trim() === activeCategory.trim());
    }, [activeCategory, activeTrend]);

    const currentTrendData = activeTrend ? TREND_METADATA[activeTrend] : null;

    return (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="pt-20 pb-10 px-6 max-w-7xl mx-auto min-h-screen text-left relative z-0">
            <SEO title="AI 新聞情報站 - 2026 最新趨勢解析" description="由 Dee 主理的 AI 新聞板塊，透過頂尖 AI Agent 系統進行精確轉譯，助您快速掌握全球 AI 核心脈動。" path="/news" />
            
            <div className="mb-8">
                <div className="flex items-center gap-4 mb-4 text-left">
                    <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center shadow-lg shadow-emerald-500/5">
                        <Zap size={20} className="text-emerald-400" />
                    </div>
                    <div className="text-left">
                        <h1 className="text-2xl font-black text-white tracking-tighter">AI 新聞情報站</h1>
                        <span className="text-emerald-500/60 font-mono text-[8px] tracking-[0.4em] uppercase block">Intelligence Intelligence Hub</span>
                    </div>
                </div>

                <p className="text-zinc-400 text-base max-w-2xl mb-6 leading-snug text-left">
                    不只是搬運，更是深度轉譯。我們將艱澀的新聞轉化為對你有用的 <span className="text-white">情報</span> 與 <span className="text-white">指令</span>。
                </p>

                {/* 1. 分類過濾器 (極簡) */}
                {!activeTrend && (
                    <div className="flex items-center gap-2 mb-4 overflow-x-auto pb-2 scrollbar-hide text-left">
                        <div className="flex-shrink-0 text-zinc-700 mr-1"><Filter size={14} /></div>
                        {categories.map(tag => {
                            const colorName = CATEGORY_THEMES[tag] || 'emerald';
                            const isActive = activeCategory === tag;
                            const themeClasses = BUTTON_THEMES[colorName];
                            return (
                                <button key={tag} onClick={() => setSearchParams({ cat: tag })}
                                    className={`flex-shrink-0 px-4 py-1.5 rounded-lg text-[10px] font-black transition-all border ${isActive
                                        ? `${themeClasses} shadow-md`
                                        : 'bg-white/[0.02] border-white/[0.04] text-zinc-500 hover:text-white'
                                    }`}>
                                    {tag}
                                </button>
                            );
                        })}
                    </div>
                )}

                {/* 🚀 2.0 戰略雷達 (更加緊湊) */}
                <div className="mb-6 p-0.5 bg-white/5 border border-white/10 rounded-xl overflow-hidden backdrop-blur-md">
                    <div className="flex gap-2 p-1.5 overflow-x-auto scrollbar-hide text-left">
                        {availableTrends.map((trend: string) => (
                            <button key={trend} onClick={() => setSearchParams({ trend })}
                                className={`flex-shrink-0 px-3 py-1.5 rounded-lg text-[10px] font-bold transition-all flex items-center gap-1.5 ${
                                    activeTrend === trend 
                                    ? 'bg-indigo-500 text-white' 
                                    : 'bg-black/20 text-zinc-600 hover:text-zinc-300'
                                }`}
                            >
                                <History size={10} /> {trend}
                            </button>
                        ))}
                    </div>
                </div>
                
                {activeTrend ? (
                    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                        className="mb-8 p-6 rounded-[2rem] bg-gradient-to-br from-indigo-900/40 via-black to-black border border-indigo-500/20 relative overflow-hidden text-left shadow-2xl"
                    >
                         <div className="relative z-10 text-left">
                            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6 text-left">
                                <div className="text-left">
                                    <div className="inline-flex items-center gap-2 px-2 py-0.5 rounded-full bg-indigo-500/20 border border-indigo-500/30 text-indigo-400 text-[8px] font-black uppercase tracking-widest mb-2">
                                        <GitMerge size={10} /> 技術演進
                                    </div>
                                    <h2 className="text-white font-black text-2xl tracking-tighter mb-2 text-left">{activeTrend}</h2>
                                    <p className="text-zinc-500 text-xs max-w-xl leading-relaxed text-left">{currentTrendData?.description}</p>
                                </div>
                                <button onClick={() => setSearchParams({})} className="px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-white font-bold text-[11px] border border-white/10 flex items-center gap-2 h-fit">
                                    <X size={12} /> 離開
                                </button>
                            </div>

                            <div className="flex items-stretch gap-3 overflow-x-auto pb-4 scrollbar-hide text-left">
                                {filteredArticles.map((article, idx) => (
                                    <div key={article.slug} className="flex-shrink-0 w-64 flex flex-col group/step text-left">
                                        <div className="flex items-center mb-3">
                                            <div className="w-6 h-6 rounded-full bg-indigo-500 text-black flex items-center justify-center font-black text-[10px] z-10">{filteredArticles.length - idx}</div>
                                            {idx < filteredArticles.length - 1 && <div className="flex-1 h-px bg-indigo-500/20" />}
                                        </div>
                                        <div onClick={() => navigate(`/news/${article.slug}`)} className="p-4 rounded-xl bg-white/[0.02] border border-white/5 hover:border-indigo-500/40 transition-all text-left h-full">
                                            <span className="text-[8px] font-mono text-indigo-500/60 block mb-1">{article.publish_time}</span>
                                            <h4 className="text-xs font-bold text-white leading-tight line-clamp-2 text-left">{article.title}</h4>
                                        </div>
                                    </div>
                                ))}
                            </div>
                         </div>
                    </motion.div>
                ) : null}
            </div>

            {/* 🚀 新聞網格 (一行一則，極致密集) */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2 items-start">
                <AnimatePresence mode="popLayout">
                    {filteredArticles.map((article, i) => (
                        <NewsCard key={article.slug} article={article} idx={i} />
                    ))}
                </AnimatePresence>
            </div>

            {filteredArticles.length === 0 && (
                <div className="col-span-full py-20 text-center bg-white/[0.01] rounded-3xl border border-white/5">
                    <p className="text-zinc-600 text-sm font-bold">暫無最新情報</p>
                    <button onClick={() => setSearchParams({})} className="mt-2 text-emerald-400 font-black text-xs uppercase tracking-widest hover:underline">返回全部</button>
                </div>
            )}
        </motion.div>
    );
};

const NewsCard = ({ article, idx }: any) => {
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
        <motion.div initial={{ opacity: 0, scale: 0.98 }} whileInView={{ opacity: 1, scale: 1 }} transition={{ delay: (idx % 10) * 0.03 }} viewport={{ once: true }}
            onClick={() => { navigate(`/news/${article.slug}`); window.scrollTo(0, 0); }}
            className="bg-[#0d0d0d] border border-white/[0.05] p-4 rounded-2xl cursor-pointer group transition-all hover:bg-zinc-900 h-full flex flex-col text-left"
        >
            <div className="flex justify-between items-start mb-3 text-left">
                <span className={`text-[8px] font-black px-1.5 py-0.5 rounded uppercase tracking-tighter ${themeMap[article.trend_cluster as keyof typeof themeMap] || 'text-zinc-500 bg-white/5'}`}>
                    {article.trend_cluster || article.category}
                </span>
                <span className="text-[8px] text-zinc-700 font-mono font-bold">{article.date}</span>
            </div>
            <h4 className="text-sm font-black text-white mb-2 line-clamp-2 leading-snug group-hover:text-indigo-300 transition-colors text-left">{article.title}</h4>
            <p className="text-zinc-600 text-[10px] line-clamp-2 leading-relaxed text-left mb-4">{article.summary}</p>
            <div className="mt-auto pt-3 border-t border-white/[0.03] flex items-center justify-between text-left opacity-40 group-hover:opacity-100 transition-opacity">
                <span className="flex items-center gap-1 text-[8px] text-zinc-600 font-bold text-left"><Clock size={10} /> {article.readTime}</span>
                <ArrowRight size={12} className="text-zinc-800 group-hover:text-indigo-500 transition-all" />
            </div>
        </motion.div>
    );
};

export default News;
