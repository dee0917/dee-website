import SEO from '../components/ui/SEO';
import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
    ArrowRight, 
    Star, 
    LayoutGrid, 
    Map as MapIcon,
    Lock,
    CheckCircle2,
    Sparkles
} from 'lucide-react';
import { INSIGHTS } from '../data/mock';

const OnboardingModal = ({ onComplete }: { onComplete: (level: number) => void }) => {
    const [step, setStep] = useState(0);
    const [answers, setAnswers] = useState<number[]>([]);

    const questions = [
        {
            q: "你平常多久用一次 AI？",
            options: ["幾乎沒用過", "偶爾問問問題", "每天都在用"]
        },
        {
            q: "你目前最希望 AI 幫你做什麼？",
            options: ["讓生活變輕鬆", "工作效率翻倍", "只是想跟上趨勢"]
        },
        {
            q: "對你來說，AI 像什麼？",
            options: ["看不懂的科技", "剛到職的實習生", "最強的助理"]
        }
    ];

    const handleAnswer = (idx: number) => {
        const newAnswers = [...answers, idx];
        setAnswers(newAnswers);
        if (step < questions.length - 1) {
            setStep(step + 1);
        } else {
            const calculatedLevel = newAnswers[0] + 1;
            onComplete(calculatedLevel);
        }
    };

    return (
        <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} 
            className="fixed inset-0 z-[100] flex items-center justify-center px-6 bg-black/80 backdrop-blur-md text-left"
        >
            <motion.div 
                initial={{ scale: 0.9, y: 20 }} animate={{ scale: 1, y: 0 }}
                className="bg-zinc-900 border border-white/10 p-8 md:p-10 rounded-[2.5rem] max-w-md w-full shadow-2xl relative overflow-hidden"
            >
                <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/10 blur-3xl rounded-full" />
                <div className="relative z-10 text-center">
                    <div className="w-16 h-16 bg-emerald-500/20 rounded-2xl flex items-center justify-center mx-auto mb-6">
                        <Sparkles className="text-emerald-400" size={32} />
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-2 text-center">啟動你的 AI 冒險</h3>
                    <p className="text-zinc-500 text-sm mb-8 text-center">回答 3 個問題，我們將為你準備最適合的學習路徑。</p>
                    <div className="space-y-4">
                        <p className="text-emerald-400 font-mono text-[10px] uppercase tracking-widest mb-4 text-center">Q{step + 1} / {questions.length}</p>
                        <h4 className="text-lg font-bold text-white mb-6 text-center">{questions[step].q}</h4>
                        {questions[step].options.map((opt, idx) => (
                            <button
                                key={idx} onClick={() => handleAnswer(idx)}
                                className="w-full py-4 px-6 rounded-2xl bg-white/5 border border-white/5 hover:bg-emerald-500/10 hover:border-emerald-500/30 text-zinc-300 hover:text-white font-medium transition-all text-sm text-left"
                            >
                                {opt}
                            </button>
                        ))}
                    </div>
                </div>
            </motion.div>
        </motion.div>
    );
};

const Insights = () => {
    const [viewMode, setViewMode] = useState<'map' | 'list'>('map');
    const [insights, setInsights] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [showOnboarding, setShowOnboarding] = useState(false);
    const [userLevel, setUserLevel] = useState(1);
    const [completedIds, setCompletedIds] = useState<number[]>([]);

    useEffect(() => {
        const savedLevel = localStorage.getItem('dee_ai_level');
        const savedCompleted = localStorage.getItem('dee_ai_completed');
        if (!savedLevel) setShowOnboarding(true);
        else setUserLevel(parseInt(savedLevel));
        if (savedCompleted) setCompletedIds(JSON.parse(savedCompleted));
        setInsights(INSIGHTS.filter(i => i.category !== 'AI 新聞'));
        setLoading(false);
    }, []);

    const handleOnboardingComplete = (level: number) => {
        setUserLevel(level);
        localStorage.setItem('dee_ai_level', level.toString());
        setShowOnboarding(false);
    };

    if (loading) return <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center text-white">載入中...</div>;

    const level1 = insights.filter(i => (i.level || 1) === 1);
    const level2 = insights.filter(i => (i.level || 1) === 2);
    const level3 = insights.filter(i => (i.level || 1) === 3);

    return (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="pt-32 pb-20 px-6 max-w-5xl mx-auto min-h-screen text-left">
            <SEO title="免費 AI 實用教學" description="具備等級進度感的 AI 學習地圖" path="/insights" />
            <AnimatePresence>{showOnboarding && <OnboardingModal onComplete={handleOnboardingComplete} />}</AnimatePresence>
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
                <div className="text-left">
                    <span className="text-emerald-500 font-bold tracking-widest text-[10px] uppercase mb-4 block">LEVEL {userLevel} · EVOLUTION MAP</span>
                    <h1 className="text-4xl md:text-5xl font-bold font-serif text-white mb-4">AI 實踐教學</h1>
                    <p className="text-zinc-500 text-lg max-w-xl leading-relaxed">這是一張讓你從 AI 小白進化成大師的地圖。按部就班解鎖，或者直接切換清單。</p>
                </div>
                <div className="flex bg-white/5 p-1 rounded-2xl border border-white/10">
                    <button onClick={() => setViewMode('map')} className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${viewMode === 'map' ? 'bg-emerald-500 text-black shadow-lg' : 'text-zinc-500 hover:text-white'}`}><MapIcon size={14} /> 冒險地圖</button>
                    <button onClick={() => setViewMode('list')} className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${viewMode === 'list' ? 'bg-emerald-500 text-black shadow-lg' : 'text-zinc-500 hover:text-white'}`}><LayoutGrid size={14} /> 傳統清單</button>
                </div>
            </div>
            {viewMode === 'map' ? (
                <div className="space-y-24 relative">
                    <div className="absolute left-8 top-12 bottom-12 w-0.5 bg-zinc-800/50 hidden md:block border-l border-dashed border-zinc-700" />
                    <LevelSection level={1} title="新手村：打好基礎心法" subtitle="從建立正確思維開始，讓 AI 成為你的分身" items={level1} userLevel={userLevel} completedIds={completedIds} />
                    <LevelSection level={2} title="實戰平原：解決生活瑣事" subtitle="育兒、旅行、溝通，AI 幫你省下大把時間" items={level2} userLevel={userLevel} completedIds={completedIds} />
                    <LevelSection level={3} title="巔峰聖殿：高階生產力" subtitle="專業文案、理財助理，掌握高級進化技巧" items={level3} userLevel={userLevel} completedIds={completedIds} />
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {insights.map((insight, i) => (<InsightCard key={insight.id} insight={insight} idx={i} completed={completedIds.includes(insight.id)} />))}
                </div>
            )}
        </motion.div>
    );
};

const LevelSection = ({ level, title, subtitle, items, userLevel, completedIds }: any) => {
    const isLocked = level > userLevel;
    return (
        <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className={`relative pl-0 md:pl-20 ${isLocked ? 'opacity-30' : 'opacity-100'}`}>
            <div className={`hidden md:flex absolute left-4 top-0 w-10 h-10 rounded-full items-center justify-center border-2 z-10 transition-all ${isLocked ? 'bg-zinc-900 border-zinc-800 text-zinc-700' : 'bg-emerald-500 border-emerald-400 text-black shadow-lg shadow-emerald-500/20'}`}>{isLocked ? <Lock size={16} /> : <span className="font-bold">{level}</span>}</div>
            <div className="mb-10 text-left">
                <div className="flex items-center gap-3 mb-2">
                    <h2 className="text-2xl font-bold text-white">{title}</h2>
                    {isLocked && <span className="text-[10px] bg-zinc-800 text-zinc-500 px-2 py-0.5 rounded-full uppercase tracking-widest font-bold">未解鎖</span>}
                </div>
                <p className="text-zinc-500 text-sm">{subtitle}</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {items.map((item: any, i: number) => (<InsightCard key={item.id} insight={item} idx={i} completed={completedIds.includes(item.id)} locked={isLocked} />))}
            </div>
        </motion.div>
    );
};

const InsightCard = ({ insight, idx, completed, locked }: any) => {
    const theme: any = {
        emerald: { text: 'text-emerald-500', tag: 'bg-emerald-500/10 text-emerald-500', border: 'hover:border-emerald-500/30' },
        yellow: { text: 'text-yellow-500', tag: 'bg-yellow-500/10 text-yellow-500', border: 'hover:border-yellow-500/30' },
        amber: { text: 'text-amber-500', tag: 'bg-amber-500/10 text-amber-500', border: 'hover:border-amber-500/30' },
        blue: { text: 'text-blue-500', tag: 'bg-blue-500/10 text-blue-500', border: 'hover:border-blue-500/30' },
        violet: { text: 'text-violet-500', tag: 'bg-violet-500/10 text-violet-500', border: 'hover:border-violet-500/30' },
        rose: { text: 'text-rose-500', tag: 'bg-rose-500/10 text-rose-500', border: 'hover:border-rose-500/30' },
        teal: { text: 'text-teal-500', tag: 'bg-teal-500/10 text-teal-500', border: 'hover:border-teal-500/30' },
        zinc: { text: 'text-zinc-300', tag: 'bg-white/5 text-zinc-400', border: 'hover:border-zinc-300/30' }
    }[insight.themeColor as string || 'emerald'] || { text: 'text-emerald-500', tag: 'bg-emerald-500/10 text-emerald-500', border: 'hover:border-emerald-500/30' };

    const CardContent = (
        <motion.div initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: idx * 0.05 }} viewport={{ once: true }} className={`bg-[#111] border border-white/5 ${locked ? '' : theme.border} p-6 rounded-3xl h-full flex flex-col relative transition-all duration-300 text-left ${completed ? 'bg-emerald-500/[0.02] border-emerald-500/10' : ''}`}>
            {completed && <div className="absolute -top-2 -right-2 bg-emerald-500 text-black p-1 rounded-full shadow-lg"><CheckCircle2 size={16} /></div>}
            <div className="flex items-center justify-between mb-4">
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-lg ${theme.tag}`}>{insight.category}</span>
                <span className="text-zinc-700 text-[10px] font-mono">⏱ {insight.readTime || insight.read_time}</span>
            </div>
            <h4 className="text-lg font-bold text-white mb-3 line-clamp-2 leading-tight">{insight.title}</h4>
            <p className="text-zinc-500 text-xs line-clamp-2 mb-6 leading-relaxed">{insight.summary}</p>
            <div className="mt-auto flex items-center justify-between">
                <div className="flex gap-0.5">{[...Array(5)].map((_, i) => (<Star key={i} size={8} className={i < (insight.difficulty_level || 1) ? theme.text : 'text-zinc-800'} fill="currentColor" />))}</div>
                <ArrowRight size={14} className="text-zinc-700 group-hover:text-emerald-500 transition-all" />
            </div>
        </motion.div>
    );

    if (locked) return <div className="cursor-not-allowed">{CardContent}</div>;
    return (<Link to={`/insights/${insight.id}`} className="group block">{CardContent}</Link>);
};

export default Insights;
