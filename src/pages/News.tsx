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
    emerald: { text: 'text-emerald-500', lightText: 'text-emerald-400', tag: 'bg-emerald-500/10 text-emerald-500', border: 'hover:border-emerald-500/30', glow: 'group-hover:shadow-emerald-500/10' },
    blue: { text: 'text-blue-500', lightText: 'text-blue-400', tag: 'bg-blue-500/10 text-blue-500', border: 'hover:border-blue-500/30', glow: 'group-hover:shadow-blue-500/10' },
    violet: { text: 'text-violet-500', lightText: 'text-violet-400', tag: 'bg-violet-500/10 text-violet-500', border: 'hover:border-violet-500/30', glow: 'group-hover:shadow-violet-500/10' },
    rose: { text: 'text-rose-500', lightText: 'text-rose-400', tag: 'bg-rose-500/10 text-rose-500', border: 'hover:border-rose-500/30', glow: 'group-hover:shadow-rose-500/10' },
    amber: { text: 'text-amber-500', lightText: 'text-amber-400', tag: 'bg-amber-500/10 text-amber-500', border: 'hover:border-blue-500/30', glow: 'group-hover:shadow-amber-500/10' },
    orange: { text: 'text-orange-500', lightText: 'text-orange-400', tag: 'bg-orange-500/10 text-orange-500', border: 'hover:border-orange-500/30', glow: 'group-hover:shadow-orange-500/10' },
    teal: { text: 'text-teal-500', lightText: 'text-teal-400', tag: 'bg-teal-500/10 text-teal-500', border: 'hover:border-teal-500/30', glow: 'group-hover:shadow-teal-500/10' },
    indigo: { text: 'text-indigo-500', lightText: 'text-indigo-400', tag: 'bg-indigo-500/10 text-indigo-500', border: 'hover:border-indigo-500/30', glow: 'group-hover:shadow-indigo-500/10' },
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
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="pt-24 pb-12 px-6 max-w-7xl mx-auto min-h-screen text-left relative z-0">
            <SEO title="AI 新聞情報站 - 2026 最新趨勢解析" description="由 Dee 主理的 AI 新聞板塊，透過頂尖 AI Agent 系統進行精確轉譯，助您快速掌握全球 AI 核心脈動。" path="/news" />
            
            <div className="mb-10">
                <div className="flex items-center gap-5 mb-6 text-left">
                    <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center shadow-lg shadow-emerald-500/5">
                        <Zap size={24} className="text-emerald-400" />
                    </div>
                    <div className="text-left">
                        <h1 className="text-3xl font-black text-white tracking-tighter">AI 新聞情報站</h1>
                        <span className="text-emerald-500/60 font-mono text-[10px] tracking-[0.4em] uppercase block">Intelligence Hub 2026</span>
                    </div>
                </div>

                <p className="text-zinc-400 text-lg max-w-2xl mb-8 leading-relaxed text-left">
                    不只是搬運，更是深度轉譯。我們將技術原典轉化為您的 <span className="text-white">戰略情報</span>。
                </p>

                {/* 1. 分類過濾器 */}
                {!activeTrend && (
                    <div className="flex items-center gap-3 mb-6 overflow-x-auto pb-3 scrollbar-hide text-left">
                        <div className="flex-shrink-0 text-zinc-600 mr-1"><Filter size={18} /></div>
                        {categories.map(tag => {
                            const colorName = CATEGORY_THEMES[tag] || 'emerald';
                            const isActive = activeCategory === tag;
                            const themeClasses = BUTTON_THEMES[colorName];
                            return (
                                <button key={tag} onClick={() => setSearchParams({ cat: tag })}
                                    className={`flex-shrink-0 px-6 py-2 rounded-xl text-xs font-black transition-all border ${isActive
                                        ? `${themeClasses} shadow-lg scale-105`
                                        : 'bg-white/[0.03] border-white/[0.08] text-zinc-400 hover:text-white hover:bg-white/5'
                                    }`}>
                                    {tag}
                                </button>
                            );
                        })}
                    </div>
                )}

                {/* 🚀 2. 戰略雷達 */}
                <div className="mb-8 p-1 bg-white/5 border border-white/10 rounded-2xl overflow-hidden backdrop-blur-md">
                    <div className="flex items-center px-4 py-2 border-b border-white/5 bg-white/[0.02]">
                        <Sparkles size={14} className="text-indigo-400 mr-2" />
                        <span className="text-[10px] font-black text-zinc-400 uppercase tracking-widest text-left">艾可 2.0 戰略趨勢雷達</span>
                    </div>
                    <div className="flex gap-2.5 p-2.5 overflow-x-auto scrollbar-hide text-left">
                        {availableTrends.map((trend: string) => (
                            <button key={trend} onClick={() => setSearchParams({ trend })}
                                className={`flex-shrink-0 px-5 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
                                    activeTrend === trend 
                                    ? 'bg-indigo-500 text-white shadow-xl shadow-indigo-500/20' 
                                    : 'bg-black/40 text-zinc-500 hover:text-zinc-200 hover:bg-white/5'
                                }`}
                            >
                                <History size={14} /> {trend}
                            </button>
                        ))}
                    </div>
                </div>
                
                {activeTrend ? (
                    <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }}
                        className="mb-10 p-8 rounded-[3rem] bg-gradient-to-br from-indigo-900/40 via-black to-black border border-indigo-500/20 relative overflow-hidden text-left shadow-2xl"
                    >
                         <div className="relative z-10 text-left">
                            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8 text-left">
                                <div className="text-left">
                                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/20 border border-indigo-500/30 text-indigo-400 text-[10px] font-black uppercase tracking-widest mb-3">
                                        <GitMerge size={12} /> 技術演進脈絡
                                    </div>
                                    <h2 className="text-white font-black text-3xl md:text-4xl tracking-tighter mb-3 text-left">{activeTrend}</h2>
                                    <p className="text-zinc-300 text-sm md:text-base max-w-2xl leading-relaxed text-left">{currentTrendData?.description}</p>
                                    <div className="mt-4 flex items-center gap-2 text-indigo-400 font-mono text-[11px] uppercase tracking-wider bg-indigo-500/10 w-fit px-3 py-1 rounded-lg">
                                        <Info size={14} /> {currentTrendData?.subtext}
                                    </div>
                                </div>
                                <button onClick={() => setSearchParams({})} className="px-6 py-3 rounded-2xl bg-white/5 hover:bg-white/10 text-white font-black text-sm border border-white/10 flex items-center gap-2 h-fit whitespace-nowrap shadow-xl">
                                    <X size={16} /> 退出模式
                                </button>
                            </div>

                            <div className="flex items-stretch gap-4 overflow-x-auto pb-6 scrollbar-hide text-left">
                                {filteredArticles.map((article, idx) => (
                                    <div key={article.slug} className="flex-shrink-0 w-72 flex flex-col group/step text-left">
                                        <div className="flex items-center mb-4">
                                            <div className="w-8 h-8 rounded-full bg-indigo-500 text-black flex items-center justify-center font-black text-xs z-10 shadow-lg">{filteredArticles.length - idx}</div>
                                            {idx < filteredArticles.length - 1 && <div className="flex-1 h-px bg-indigo-500/30 mx-2" />}
                                        </div>
                                        <div onClick={() => navigate(`/news/${article.slug}`)} className="p-5 rounded-2xl bg-white/[0.03] border border-white/5 hover:border-indigo-500/40 hover:bg-indigo-500/5 transition-all text-left h-full shadow-lg">
                                            <span className="text-[10px] font-mono text-indigo-400 block mb-2 font-bold">{article.publish_time}</span>
                                            <h4 className="text-sm font-black text-white leading-snug line-clamp-2 text-left">{article.title}</h4>
                                        </div>
                                    </div>
                                ))}
                            </div>
                         </div>
                    </motion.div>
                ) : null}
            </div>

            {/* 🚀 新聞網格 (一行一則，間隔放大，字體放大) */}
            <div className="grid grid-cols-1 gap-6 items-start">
                <AnimatePresence mode="popLayout">
                    {filteredArticles.map((article, i) => (
                        <NewsCard key={article.slug} article={article} idx={i} />
                    ))}
                </AnimatePresence>
            </div>

            {filteredArticles.length === 0 && (
                <div className="col-span-full py-32 text-center bg-white/[0.02] rounded-[3rem] border border-white/5">
                    <p className="text-zinc-500 text-lg font-bold">目前暫無相關情報</p>
                    <button onClick={() => setSearchParams({})} className="mt-4 text-emerald-400 font-black text-sm uppercase tracking-widest hover:underline">返回全部情報</button>
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
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: (idx % 5) * 0.05 }} viewport={{ once: true }}
            onClick={() => { navigate(`/news/${article.slug}`); window.scrollTo(0, 0); }}
            className="bg-[#0c0c0c] border border-white/[0.06] p-7 md:p-10 rounded-[2.5rem] cursor-pointer group transition-all hover:bg-zinc-900/80 hover:border-white/20 h-full flex flex-col md:flex-row gap-8 items-center text-left shadow-xl"
        >
            <div className="flex-1 w-full text-left">
                <div className="flex justify-between items-center mb-6 text-left">
                    <div className="flex items-center gap-3">
                        <span className={`text-[10px] font-black px-3 py-1 rounded-lg uppercase tracking-widest ${themeMap[article.trend_cluster as keyof typeof themeMap] || 'text-zinc-400 bg-white/5'}`}>
                            {article.trend_cluster || article.category}
                        </span>
                        {article.author === "Echo" && <span className="text-[10px] font-bold text-indigo-500/80 uppercase tracking-tight">🕵️ Echo Dispatch</span>}
                    </div>
                    <span className="text-[11px] text-zinc-500 font-mono font-bold">{article.date}</span>
                </div>
                
                <h4 className="text-2xl md:text-3xl font-black text-white mb-4 line-clamp-2 leading-tight group-hover:text-emerald-300 transition-colors text-left tracking-tight">
                    {article.title}
                </h4>
                
                <p className="text-zinc-400 text-base md:text-lg line-clamp-2 leading-relaxed text-left mb-8 font-medium">
                    {article.summary}
                </p>
                
                <div className="mt-auto pt-6 border-t border-white/[0.05] flex items-center justify-between text-left">
                    <div className="flex items-center gap-6">
                        <span className="flex items-center gap-2 text-xs text-zinc-500 font-bold text-left"><Clock size={14} /> {article.readTime}</span>
                        <div className="flex gap-1">{[...Array(5)].map((_, i) => <Star key={i} size={10} className={i < 1 ? 'text-emerald-500' : 'text-zinc-800'} fill="currentColor" />)}</div>
                    </div>
                    <div className="flex items-center gap-2 text-white font-black text-xs uppercase tracking-widest group-hover:gap-4 transition-all">
                        閱讀情報 <ArrowRight size={18} className="text-emerald-500" />
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

export default News;
