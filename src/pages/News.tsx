import SEO from '../components/ui/SEO';
import { useNavigate, useSearchParams, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Zap, Clock, Shield, TrendingUp, Filter, Star, Info, MessageCircle, Sparkles, Coffee, AlertTriangle, X, History, GitMerge, ChevronRight } from 'lucide-react';
import { NEWS_ARTICLES } from '../data/news';
import { useMemo, useState } from 'react';
import { StrategicTrinity } from '../components/news/StrategicTrinity';

// 確保字串完全匹配，杜絕空格或編碼問題
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
    amber: { text: 'text-amber-500', lightText: 'text-amber-400', tag: 'bg-amber-500/10 text-amber-400', border: 'hover:border-amber-500/20', glow: 'group-hover:shadow-amber-500/10' },
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
    const [activeDimension, setActiveDimension] = useState<string | null>(null);

    const availableTrends = useMemo(() => {
        const trends = new Set(NEWS_ARTICLES.map(a => a.trend_cluster).filter(Boolean));
        return Array.from(trends) as string[];
    }, []);

    const categories = [CAT_ALL, CAT_GOSSIP, CAT_BRAIN, CAT_LAZY, CAT_INDUSTRY, CAT_POLICY, CAT_APP, CAT_SECURITY, CAT_CAREER];

    const filteredArticles = useMemo(() => {
        let items = [...NEWS_ARTICLES];

        // 1. 三位一體維度過濾
        if (activeDimension && !activeTrend) {
            items = items.filter(a => a.trinity_dimension === activeDimension);
        }

        // 2. 趨勢集群過濾
        if (activeTrend) {
            return items.filter(a => a.trend_cluster === activeTrend).sort((a, b) => a.id - b.id);
        }

        if (activeCategory === CAT_ALL) return items;
        return items.filter(a => a.category.trim() === activeCategory.trim());
    }, [activeCategory, activeTrend, activeDimension]);

    const currentTrendData = activeTrend ? TREND_METADATA[activeTrend] : null;

    return (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="pt-32 pb-20 px-6 max-w-6xl mx-auto min-h-screen text-left relative z-0">
            <SEO title="AI 新聞情報站 - 2026 最新趨勢解析" description="由 Dee 主理的 AI 新聞板塊，透過頂尖 AI Agent 系統進行精確轉譯，助您快速掌握全球 AI 核心脈動。" path="/news" />
            
            <div className="mb-16">
                <div className="flex items-center gap-4 mb-6">
                    <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center shadow-lg shadow-emerald-500/5">
                        <Zap size={22} className="text-emerald-400" />
                    </div>
                    <div>
                        <h1 className="text-2xl md:text-3xl font-black text-white tracking-tight">AI 新聞情報站</h1>
                        <span className="text-emerald-500/60 font-mono text-[9px] tracking-[0.4em] uppercase block mt-1">Intelligence Intelligence Hub</span>
                    </div>
                </div>

                {/* 🚀 三位一體戰略看板 (The Trinity Dashboard) */}
                {!activeTrend && activeCategory === CAT_ALL && (
                    <StrategicTrinity 
                        articles={NEWS_ARTICLES} 
                        activeDimension={activeDimension} 
                        onDimensionClick={setActiveDimension} 
                    />
                )}

                {/* 🚀 2.0 高級組件：趨勢雷達入口 (Trend Radar) */}
                <div className="mb-10 p-1 bg-white/5 border border-white/10 rounded-2xl overflow-hidden backdrop-blur-md">
                    <div className="flex items-center px-4 py-2 border-b border-white/5 bg-white/[0.02]">
                        <Sparkles size={14} className="text-indigo-400 mr-2" />
                        <span className="text-[10px] font-black text-zinc-400 uppercase tracking-widest">艾可 2.0 戰略趨勢雷達 · 深度演進導航</span>
                    </div>
                    <div className="flex gap-2 p-2 overflow-x-auto scrollbar-hide">
                        {availableTrends.map((trend: string) => (
                            <button 
                                key={trend}
                                onClick={() => {
                                    setSearchParams({ trend });
                                    setActiveDimension(null);
                                }}
                                className={`flex-shrink-0 px-4 py-2 rounded-xl text-[11px] font-bold transition-all flex items-center gap-2 ${
                                    activeTrend === trend 
                                    ? 'bg-indigo-500 text-white shadow-lg shadow-indigo-500/20' 
                                    : 'bg-black/40 text-zinc-500 hover:text-zinc-300 hover:bg-white/5'
                                }`}
                            >
                                <History size={12} className={activeTrend === trend ? 'animate-spin-slow' : ''} />
                                {trend}
                            </button>
                        ))}
                    </div>
                </div>
                
                {activeTrend ? (
                    <motion.div 
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="mb-12 p-8 md:p-12 rounded-[3rem] bg-gradient-to-br from-indigo-500/10 via-zinc-900/80 to-black border border-indigo-500/20 relative overflow-hidden shadow-2xl"
                    >
                         <div className="absolute inset-0 opacity-10 pointer-events-none">
                            <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]" />
                            <div className="absolute top-1/2 left-0 w-full h-px bg-indigo-500/30" />
                         </div>

                         <div className="relative z-10">
                            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
                                <div>
                                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/20 border border-indigo-500/30 text-indigo-400 text-[9px] font-black uppercase tracking-widest mb-4">
                                        <GitMerge size={12} /> 技術演進脈絡 (Evolutionary Path)
                                    </div>
                                    <h2 className="text-white font-black text-3xl md:text-5xl tracking-tighter mb-4">
                                        {activeTrend}
                                    </h2>
                                    <p className="text-zinc-400 text-base md:text-lg max-w-2xl leading-relaxed mb-4">
                                        {currentTrendData?.description}
                                    </p>
                                    <div className="flex items-center gap-2 text-indigo-400/60 font-mono text-[10px] uppercase tracking-wider">
                                        <Info size={12} /> {currentTrendData?.subtext}
                                    </div>
                                </div>
                                <button onClick={() => setSearchParams({})} className="px-6 py-3 rounded-2xl bg-white/5 hover:bg-white/10 text-white font-bold text-sm transition-all border border-white/10 flex items-center gap-2">
                                    <X size={16} /> 退出演進模式
                                </button>
                            </div>

                            <div className="flex flex-col md:flex-row items-stretch gap-4 relative overflow-x-auto pb-4 scrollbar-hide">
                                {filteredArticles.map((article, idx) => (
                                    <div key={article.slug} className="flex-shrink-0 w-full md:w-64 flex flex-col group/step">
                                        <div className="flex items-center mb-6">
                                            <div className="w-10 h-10 rounded-full bg-indigo-500 text-black flex items-center justify-center font-black text-sm z-10 group-hover/step:scale-125 transition-all shadow-lg shadow-indigo-500/40">
                                                {filteredArticles.length - idx}
                                            </div>
                                            {idx < filteredArticles.length - 1 && (
                                                <div className="hidden md:block flex-1 h-px bg-gradient-to-r from-indigo-500 to-transparent opacity-30" />
                                            )}
                                        </div>
                                        <div 
                                            onClick={() => navigate(`/news/${article.slug}`)}
                                            className="p-5 rounded-2xl bg-white/[0.03] border border-white/5 hover:border-indigo-500/40 hover:bg-indigo-500/[0.02] cursor-pointer transition-all h-full"
                                        >
                                            <span className="text-[10px] font-mono text-indigo-500/60 block mb-2">{article.publish_time}</span>
                                            <h4 className="text-sm font-black text-white group-hover/step:text-indigo-300 transition-colors leading-snug line-clamp-2">
                                                {article.title}
                                            </h4>
                                            <div className="mt-4 flex items-center gap-2 text-zinc-600 text-[10px] font-bold">
                                                <ChevronRight size={12} /> 查看詳細情報
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                         </div>
                    </motion.div>
                ) : (
                    <p className="text-zinc-400 text-lg md:text-xl max-w-2xl mb-12 leading-relaxed">
                        不只是搬運，更是深度轉譯。<br />
                        我們將艱澀的新聞，轉化為對你有用的 <span className="text-white">情報</span> 與 <span className="text-white">指令</span>。
                    </p>
                )}

                {!activeTrend && (
                    <div className="flex items-center gap-4 mb-10 overflow-x-auto pb-4 scrollbar-hide">
                        <div className="flex-shrink-0 text-zinc-700 mr-1"><Filter size={16} /></div>
                        {categories.map(tag => {
                            const colorName = CATEGORY_THEMES[tag] || 'emerald';
                            const isActive = activeCategory === tag;
                            const themeClasses = BUTTON_THEMES[colorName];
                            
                            return (
                                <button key={tag} onClick={() => {
                                    setSearchParams({ cat: tag });
                                    setActiveDimension(null);
                                }}
                                    className={`flex-shrink-0 px-6 py-2.5 rounded-full text-xs font-black transition-all duration-300 border ${isActive
                                        ? `${themeClasses} shadow-lg scale-105`
                                        : 'bg-white/[0.03] border border-white/[0.06] text-zinc-500 hover:text-white hover:border-white/10'
                                    }`}>
                                    {tag}
                                </button>
                            );
                        })}
                    </div>
                )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-start min-h-[500px]">
                <AnimatePresence mode="popLayout">
                    {filteredArticles.map((article, i) => (
                        <NewsCard key={article.slug} article={article} idx={i} />
                    ))}
                </AnimatePresence>
                
                {filteredArticles.length === 0 && (
                    <div className="col-span-full py-40 text-center bg-white/[0.02] rounded-[3rem] border border-white/5 animate-fade-in">
                        <div className="text-5xl mb-6 grayscale opacity-20">🕳️</div>
                        <p className="text-zinc-500 text-lg font-bold">目前暫無符合條件的情報</p>
                        <button onClick={() => {
                            setSearchParams({});
                            setActiveDimension(null);
                        }} className="mt-4 text-emerald-400 font-black text-sm uppercase tracking-widest hover:underline">返回全部新聞</button>
                    </div>
                )}
            </div>

            <section className="mt-40 text-center py-20 border-t border-white/5">
                <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-20">
                    <div className="space-y-6 text-left">
                        <h4 className="text-white font-black text-2xl">情報轉譯準則</h4>
                        <p className="text-zinc-500 leading-relaxed font-medium">
                            由 Dee 親自審核每一則進入情報站的新聞，透過頂尖「AI Agent」系統進行高頻掃描與精準轉譯。我們致力於將複雜的科技動態轉化為易懂的白話重點。
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

const NewsCard = ({ article, idx }: any) => {
    const navigate = useNavigate();
    const themeColor = CATEGORY_THEMES[article.category] || article.themeColor || 'emerald';
    const theme = THEME_CONFIG[themeColor] || THEME_CONFIG.emerald;

    return (
        <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            onClick={() => navigate(`/news/${article.slug}`)}
            className={`bg-zinc-900/50 backdrop-blur-sm border border-white/[0.05] ${theme.border} p-6 md:p-7 rounded-[2rem] h-full flex flex-col relative transition-all duration-500 group group-hover:shadow-2xl ${theme.glow} cursor-pointer`}
        >
            <div className="flex flex-wrap items-center justify-between gap-2 mb-5">
                <span className={`text-[9px] font-black px-3 py-1.5 rounded-lg tracking-[0.1em] uppercase transition-all hover:brightness-125 ${theme.tag}`}>
                    {article.category}
                </span>
                <span className="text-zinc-700 text-[10px] font-bold font-mono">{article.publish_time || article.date}</span>
            </div>

            <h4 className="text-xl font-black text-white mb-3 line-clamp-2 leading-tight group-hover:text-emerald-100 transition-colors text-left">{article.title}</h4>
            <p className="text-zinc-500 text-sm line-clamp-3 mb-8 leading-relaxed font-medium text-left">{article.summary}</p>
            
            <div className="mt-auto">
                <div className="flex items-center justify-between mb-5">
                    <div className="flex gap-0.5">{[...Array(5)].map((_, i) => <Star key={i} size={8} className={i < 1 ? theme.text : 'text-zinc-800'} fill="currentColor" />)}</div>
                    <span className="text-zinc-600 text-[9px] font-black tracking-widest uppercase font-mono italic">{article.author === "Echo" ? 'Echo Reporting' : 'AI Verified'}</span>
                </div>
                <div className="pt-5 border-t border-white/[0.05] flex items-center justify-between group-hover:border-white/[0.12] transition-colors">
                    <span className="text-zinc-700 text-[10px] font-mono flex items-center gap-1.5">
                        <Clock size={10} className="text-zinc-500" /> {article.readTime}
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
