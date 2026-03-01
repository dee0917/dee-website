import SEO from '../components/ui/SEO';
import { useState, useEffect, useMemo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
    ArrowRight, Star, BookOpen, Lock, CheckCircle2, Sparkles,
    Zap, Gamepad2, Trophy, ChevronDown, ChevronRight, Filter,
    Compass, Map as MapIcon, Shield, Search, X, Info
} from 'lucide-react';
import { CHAPTERS, MAIN_QUEST_ORDER, INSIGHTS_LIST } from '../data/insights';
import { ChatGPTLogo, ClaudeLogo, GeminiLogo } from '../components/AILogos';

const CATEGORY_THEMES: Record<string, string> = {
    '啟航入口': 'teal',
    '心法重塑': 'emerald',
    '指令進化': 'violet',
    '生活實戰': 'blue',
    '職涯躍遷': 'rose',
    '戰略演進': 'indigo'
};

const THEME_CONFIG: Record<string, any> = {
    emerald: { text: 'text-emerald-500', lightText: 'text-emerald-400', tag: 'bg-emerald-500/10 text-emerald-500', border: 'hover:border-emerald-500/20', glow: 'group-hover:shadow-emerald-500/10' },
    yellow: { text: 'text-yellow-500', lightText: 'text-yellow-400', tag: 'bg-yellow-500/10 text-yellow-500', border: 'hover:border-yellow-500/20', glow: 'group-hover:shadow-yellow-500/10' },
    amber: { text: 'text-amber-500', lightText: 'text-amber-400', tag: 'bg-amber-500/10 text-amber-500', border: 'hover:border-amber-500/20', glow: 'group-hover:shadow-amber-500/10' },
    blue: { text: 'text-blue-500', lightText: 'text-blue-400', tag: 'bg-blue-500/10 text-blue-500', border: 'hover:border-blue-500/20', glow: 'group-hover:shadow-blue-500/10' },
    violet: { text: 'text-violet-500', lightText: 'text-violet-400', tag: 'bg-violet-500/10 text-violet-500', border: 'hover:border-violet-500/20', glow: 'group-hover:shadow-violet-500/10' },
    rose: { text: 'text-rose-500', lightText: 'text-rose-400', tag: 'bg-rose-500/10 text-rose-500', border: 'hover:border-rose-500/20', glow: 'group-hover:shadow-rose-500/10' },
    teal: { text: 'text-teal-500', lightText: 'text-teal-400', tag: 'bg-teal-500/10 text-teal-500', border: 'hover:border-teal-500/20', glow: 'group-hover:shadow-teal-500/10' },
    zinc: { text: 'text-zinc-300', lightText: 'text-zinc-200', tag: 'bg-white/5 text-zinc-400', border: 'hover:border-zinc-300/20', glow: '' },
    indigo: { text: 'text-indigo-500', lightText: 'text-indigo-400', tag: 'bg-indigo-500/10 text-indigo-500', border: 'hover:border-indigo-500/20', glow: 'group-hover:shadow-indigo-500/10' },
};

/* ═══════════════════════════════════════════
   ONBOARDING
   ═══════════════════════════════════════════ */
const OnboardingScreen = ({ onComplete }: { onComplete: (mode: 'guided' | 'free', chapter?: number) => void }) => {
    const [phase, setPhase] = useState<'welcome' | 'platform' | 'never-used' | 'experience' | 'result'>('welcome');
    
    const ModalShell = ({ children, kkey }: { children: React.ReactNode; kkey: string }) => (
        <motion.div key={kkey} initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }}
            className="bg-zinc-900/90 border border-white/10 p-8 md:p-12 rounded-[2.5rem] max-w-lg w-full shadow-2xl relative overflow-hidden text-center">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-emerald-500 via-teal-400 to-emerald-600" />
            <div className="relative z-10">{children}</div>
        </motion.div>
    );

    return (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="fixed inset-0 z-[100] flex items-center justify-center px-6 bg-black/90 backdrop-blur-xl text-center">
            <AnimatePresence mode="wait">
                {phase === 'welcome' && (
                    <ModalShell kkey="w">
                        <div className="text-center mb-10">
                            <div className="text-6xl mb-6 text-center">👋</div>
                            <h2 className="text-2xl md:text-3xl font-black text-white mb-3 tracking-tight text-center">嗨！歡迎來到 Dee's AI Lab</h2>
                            <p className="text-zinc-400 text-base md:text-lg leading-relaxed text-center">這裡是你的 AI 修煉場。我們將透過 15 篇基礎必修課，帶你從零開始掌握 AI 核心主權。</p>
                        </div>
                        <div className="space-y-4">
                            <button onClick={() => onComplete('guided', 0)}
                                className="w-full py-5 px-6 rounded-2xl bg-emerald-500 text-black font-black text-lg flex items-center justify-center gap-3 hover:bg-emerald-400 shadow-lg shadow-emerald-500/20 active:scale-95 transition-all text-center">
                                <Sparkles size={22} /> 開始修煉 (Ch.0)
                            </button>
                            <p className="text-[10px] text-zinc-600 font-bold uppercase tracking-widest text-center mt-4">冒險模式將強制循序漸進解鎖</p>
                        </div>
                    </ModalShell>
                )}
            </AnimatePresence>
        </motion.div>
    );
};

/* ═══════════════════════════════════════════
   SKIP/TRANSITION CHALLENGE
   ═══════════════════════════════════════════ */
const SkipChapterModal = ({ targetChapter, onPass, onClose }: { targetChapter: number; onPass: (chapterId: number) => void; onClose: () => void }) => {
    const [current, setCurrent] = useState(0);
    const [score, setScore] = useState(0);
    const [finished, setFinished] = useState(false);

    const quizzes: Record<number, { q: string; options: string[]; answer: number }[]> = {
        999: [
            { q: "為什麼在 Dee's Lab 中，我們強調要一步步學習？", options: ["增加網頁停留時間", "緩慢釋放多巴胺，讓大腦對學習成癮", "技術限制", "為了賣更多咖啡"], answer: 1 },
            { q: "在自由模式下，你可以？", options: ["直接複製所有指令", "跳過所有課程", "隨意挑選感興趣的文章，但仍需一步步完成才能解開寶箱", "不用註冊"], answer: 2 },
            { q: "AI 實體化的核心意義在於？", options: ["AI 變得比較帥", "AI 具備了系統主權與物理/虛擬世界的行動力", "取代人類滑手機", "讓電腦跑更快"], answer: 1 },
            { q: "下列何者是正確的 AI 心法？", options: ["把 AI 當成超級 Google", "把 AI 當成一名具備專業知識的實習生", "AI 永遠不會出錯", "不需要給 AI 任何背景資訊"], answer: 1 },
            { q: "當 AI 出現「幻覺」時，最好的做法是？", options: ["辱罵 AI", "關掉重開", "提供具體證據並要求複核，或加入誠實約束指令", "盲目相信它的回答"], answer: 2 },
        ],
        1: [
            { q: "進入 AI 時代，最基礎的動作是？", options: ["註冊帳號並發送第一則訊息", "購買最新顯卡", "背誦代碼", "學習數學"], answer: 0 },
            { q: "為什麼 AI 每次回覆都有隨機性？", options: ["因為 AI 心情不好", "因為它是基於機率預測下一個字的生成模型", "因為網路延遲", "因為電力不足"], answer: 1 },
            { q: "「我了解了」按鈕的作用是？", options: ["浪費時間", "確認學習進度並觸發多巴胺釋放", "廣告點擊", "裝飾品"], answer: 1 },
            { q: "三大主流 AI 不包含下列何者？", options: ["ChatGPT", "Claude", "Gemini", "Siri"], answer: 3 },
            { q: "學習 AI 最快的方式是？", options: ["看說明書", "動手實戰並不斷修正指令", "買書來看", "等待強大模型出現"], answer: 1 },
        ],
        2: [
            { q: "對抗 AI 幻覺的核心指令是什麼？", options: ["請認真回答", "如果你不知道，請直接說不知道，不要編造", "這很重要", "請快一點"], answer: 1 },
            { q: "什麼是 AI 的「溫度」參數？", options: ["硬體運行的熱度", "控制回覆隨機性與創造力的指標", "AI 的情緒狀態", "字體的大小"], answer: 1 },
            { q: "為什麼要給 AI 「上下文」？", options: ["增加對話字數", "讓 AI 能在特定背景下給出精確建議", "減少算力消耗", "好玩而已"], answer: 1 },
            { q: "AI 實體化 (Physicalization) 意味著？", options: ["AI 變成機器人", "AI 深度集成至作業系統與虛擬環境行動力", "AI 可以幫你買菜", "AI 變得比較重"], answer: 1 },
            { q: "如何檢驗 AI 是否在胡說八道？", options: ["看它寫得順不順", "要求它提供引用來源並親自核實", "問它三次", "大聲讀出來"], answer: 1 },
        ],
        3: [
             { q: "「萬用指令公式」的主要目的是？", options: ["減少打字量", "將模糊需求結構化，大幅提升輸出品質", "隱藏祕密", "測試 AI 極限"], answer: 1 },
             { q: "指令中的「角色定義」能幫助 AI？", options: ["跑得更快", "切換專業語氣與特定領域知識", "認識你是誰", "省錢"], answer: 1 },
             { q: "長文章摘要時，最好的指令技巧是？", options: ["請總結", "要求 AI 逐步思考 (CoT) 並分點列出關鍵資訊", "直接貼上", "不管它"], answer: 1 },
             { q: "設定「負面約束」的作用是？", options: ["讓 AI 難過", "明確禁止 AI 生成特定內容或廢話", "增加複雜度", "減少回應"], answer: 1 },
             { q: "指令進化是為了達成？", options: ["更高效率的人機協作", "取代人類思考", "展示技術", "純屬愛好"], answer: 0 },
        ],
        4: [
             { q: "用 AI 規劃生活任務時，最後的核實該交給？", options: ["AI 本身", "Google Maps 或人工確認", "朋友", "沒差"], answer: 1 },
             { q: "處理社交郵件時，AI 的優勢是？", options: ["字比較多", "處理情緒勞動並產出得體草稿", "會自動發信", "不用網路"], answer: 1 },
             { q: "AI 經理人的核心職責是？", options: ["自己寫代碼", "拆解任務並編排多代理人協同運作", "滑手機", "開會"], answer: 1 },
             { q: "數位主權的核心概念在於？", options: ["買更多帳號", "數據的掌控權與本地化部署能力", "網速快", "換電腦"], answer: 1 },
             { q: "AI 的未來是？", options: ["純對話框", "具身智能與戰略情報共生", "取代電力", "消失"], answer: 1 },
        ]
    };

    const questions = quizzes[targetChapter] || quizzes[999];

    const handleAnswer = (idx: number) => {
        const newScore = score + (idx === questions[current].answer ? 1 : 0);
        setScore(newScore);
        if (current < questions.length - 1) setCurrent(current + 1);
        else { 
            setFinished(true); 
            if (newScore >= 4) {
                setTimeout(() => {
                    onPass(targetChapter);
                    onClose();
                }, 1500);
            } 
        }
    };

    return (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[100] flex items-center justify-center px-6 bg-black/80 backdrop-blur-md">
            <motion.div initial={{ scale: 0.9 }} animate={{ scale: 1 }} className="bg-zinc-900 border border-white/10 p-8 md:p-10 rounded-[2.5rem] max-w-md w-full shadow-2xl relative overflow-hidden text-center text-center">
                <div className="absolute top-0 left-0 w-full h-1 bg-zinc-800">
                    <motion.div className="h-full bg-emerald-500" animate={{ width: `${((current + 1) / questions.length) * 100}%` }} />
                </div>
                {!finished ? (
                    <div className="relative z-10 text-left">
                        <div className="flex items-center justify-between mb-6">
                            <span className="text-emerald-400 font-mono text-[10px] uppercase tracking-widest text-left">{targetChapter === 999 ? '自由模式解鎖測試' : `Chapter ${targetChapter} 跳級測試`}</span>
                            <button onClick={onClose} className="text-zinc-600 hover:text-white text-xs font-bold text-left">取消</button>
                        </div>
                        <p className="text-white font-black text-lg mb-8 leading-tight text-left">{questions[current].q}</p>
                        <div className="space-y-3">
                            {questions[current].options.map((opt, idx) => (
                                <motion.button key={idx} whileTap={{ scale: 0.97 }} onClick={() => handleAnswer(idx)}
                                    className="w-full py-4 px-6 rounded-2xl bg-white/5 border border-white/5 hover:bg-emerald-500/10 text-zinc-300 hover:text-white font-bold transition-all text-base text-left text-left">
                                    {opt}
                                </motion.button>
                            ))}
                        </div>
                    </div>
                ) : (
                    <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="text-center py-6 text-center">
                        <div className="text-6xl mb-6 text-center">{score >= 4 ? '🎉' : '💪'}</div>
                        <h3 className="text-2xl font-black text-white mb-3 text-center">{score >= 4 ? '驗證通過！' : '驗證失敗！'}</h3>
                        <p className="text-zinc-400 text-base mb-8 text-center">{score >= 4 ? `正在寫入權限...` : `答對 ${score}/5，至少需要 4 題正確。`}</p>
                        {score < 4 && <button onClick={onClose} className="bg-white/10 text-white font-bold py-3 px-8 rounded-2xl hover:bg-white/20 transition-all text-center">返回修煉</button>}
                    </motion.div>
                )}
            </motion.div>
        </motion.div>
    );
};

/* ═══════════════════════════════════════════
   MAIN PAGE
   ═══════════════════════════════════════════ */
const StarIcon = ({ size, className, fill }: any) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill={fill} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
    </svg>
);

const ChapterNode = ({ chapter, items, completedIds, isLocked, isComplete, isExpanded, onToggle, onSkip, index }: any) => {
    return (
        <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: index * 0.05 }} className={`relative text-left text-left`}>
            <div className={`border rounded-2xl transition-all cursor-pointer text-left text-left ${isLocked ? 'opacity-30 grayscale' : ''} ${isExpanded ? 'bg-white/[0.02] border-white/10' : 'border-white/5 hover:border-white/10'}`} onClick={isLocked ? undefined : onToggle}>
                <div className="p-6 md:p-8 flex flex-col md:flex-row md:items-center justify-between text-left gap-6">
                    <div className="flex items-center gap-5 text-left flex-1 min-w-0">
                        <span className="text-4xl text-left flex-shrink-0 text-center">{chapter.emoji}</span>
                        <div className="text-left min-w-0 flex-1">
                            <h2 className="text-2xl md:text-3xl font-black text-white text-left tracking-tighter truncate">{chapter.title}</h2>
                            <p className="text-zinc-500 text-xs md:text-sm text-left font-bold uppercase tracking-widest mt-1 truncate">{chapter.subtitle}</p>
                        </div>
                    </div>
                    
                    <div className="flex items-center gap-4 text-left">
                        {isLocked ? (
                            <button onClick={(e) => { e.stopPropagation(); onSkip(); }} className="bg-amber-500 text-black px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-amber-400 transition-all flex items-center gap-2 shadow-lg shadow-amber-500/20 active:scale-95 text-left">
                                <Zap size={12} fill="currentColor" /> 跳級測驗
                            </button>
                        ) : (
                            <div className="flex items-center gap-3 text-left">
                                {isComplete && <CheckCircle2 size={20} className="text-emerald-500" />}
                                <ChevronDown size={18} className={`transition-transform text-zinc-600 flex-shrink-0 ${isExpanded ? 'rotate-180' : ''}`} />
                            </div>
                        )}
                    </div>
                </div>
                <AnimatePresence>
                    {isExpanded && !isLocked && (
                        <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden border-t border-white/5 text-left">
                            <div className="p-4 space-y-2 text-left">
                                {items.map((item: any, i: number) => {
                                    const isDone = completedIds.includes(item.id);
                                    return (
                                        <Link key={item.id} to={`/insights/${item.id}`} className={`flex items-center gap-6 p-6 md:p-8 rounded-[2.5rem] transition-all text-left border border-transparent group ${isDone ? 'bg-emerald-500/5 border-emerald-500/10' : 'hover:bg-zinc-900/80 hover:border-white/20'}`}>
                                            <div className={`w-12 h-12 rounded-2xl flex items-center justify-center text-lg font-black flex-shrink-0 text-left ${isDone ? 'bg-emerald-500 text-black shadow-lg' : 'bg-zinc-800 text-zinc-500'}`}>{isDone ? '✓' : i + 1}</div>
                                            <div className="flex-1 text-left min-w-0 text-left">
                                                <h4 className="text-2xl md:text-3xl font-black text-white text-left tracking-tighter truncate group-hover:text-emerald-400 transition-colors">{item.title}</h4>
                                                <p className="text-zinc-500 text-[10px] uppercase font-black tracking-[0.3em] mt-2">Status: {isDone ? 'Mastered' : 'Ready to begin'}</p>
                                            </div>
                                            <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-zinc-700 group-hover:text-emerald-500 group-hover:bg-emerald-500/10 transition-all">
                                                <ChevronRight size={22} />
                                            </div>
                                        </Link>
                                    );
                                })}
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </motion.div>
    );
};

const InsightCard = ({ insight, idx, completed }: any) => {
    return (
        <Link to={`/insights/${insight.id}`} className="block h-full text-left">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: idx * 0.03 }} viewport={{ once: true }}
                className={`bg-[#0c0c0c] border p-7 md:p-10 rounded-[2.5rem] h-full flex flex-col transition-all text-left shadow-xl ${completed ? 'border-emerald-500/40 shadow-[0_0_30px_rgba(16,185,129,0.05)]' : 'border-white/[0.06] hover:bg-zinc-900/80 hover:border-white/20'}`}>
                <div className="flex justify-between items-center mb-6 text-left">
                    <span className="text-[10px] font-black px-3 py-1 rounded bg-white/5 text-zinc-500 uppercase tracking-widest text-left">{insight.category}</span>
                    <span className="text-[11px] text-zinc-500 font-mono font-bold">{insight.date || '2026.03.01'}</span>
                </div>
                <h4 className="text-2xl md:text-3xl font-black text-white mb-4 line-clamp-2 leading-tight tracking-tighter group-hover:text-emerald-300 transition-colors text-left">
                    {insight.title}
                </h4>
                <p className="text-zinc-400 text-base md:text-lg line-clamp-2 leading-relaxed text-left font-medium mb-8">
                    {insight.summary}
                </p>

                <div className="mt-auto pt-6 border-t border-white/[0.05] flex items-center justify-between text-left">
                    <div className="flex items-center gap-6">
                        <span className="flex items-center gap-2 text-xs text-zinc-500 font-bold text-left uppercase tracking-widest"><Star size={14} className="text-emerald-500" /> Level {insight.difficulty_level || 1}</span>
                        <div className="flex gap-1">{[...Array(5)].map((_, i) => <StarIcon key={i} size={10} className={i < (insight.difficulty_level || 1) ? 'text-emerald-500' : 'text-zinc-800'} fill="currentColor" />)}</div>
                    </div>
                    <div className="flex items-center gap-2 text-white font-black text-xs uppercase tracking-widest group-hover:gap-4 transition-all">
                        進入修煉 <ArrowRight size={18} className="text-emerald-500" />
                    </div>
                </div>
            </motion.div>
        </Link>
    );
};

const Insights = () => {
    const [viewMode, setViewMode] = useState<'adventure' | 'free'>('adventure');
    const [loading, setLoading] = useState(true);
    const [showOnboarding, setShowOnboarding] = useState(false);
    const [unlockedChapter, setUnlockedChapter] = useState(0); 
    const [completedIds, setCompletedIds] = useState<number[]>([]);
    const [searchQuery, setSearchQuery] = useState<string>('');
    const [expandedChapters, setExpandedChapters] = useState<Set<number>>(new Set());
    const [skipTarget, setSkipTarget] = useState<number | null>(null);

    // 強制 UI 與狀態對齊的 Key
    const viewKey = `${viewMode}-${unlockedChapter}-${completedIds.length}`;

    useEffect(() => {
        const done = localStorage.getItem('dee_onboarding_done');
        const saved = localStorage.getItem('dee_ai_level');
        const mode = localStorage.getItem('dee_view_preference');
        const comp = localStorage.getItem('dee_ai_completed');

        if (!done) setShowOnboarding(true);
        else {
            if (saved) setUnlockedChapter(parseInt(saved));
            if (mode === 'free') setViewMode('free');
        }
        if (comp) {
            try { setCompletedIds(JSON.parse(comp)); } catch(e) { setCompletedIds([]); }
        }
        setLoading(false);
    }, []);

    const allInsights = useMemo(() => INSIGHTS_LIST, []);

    useEffect(() => {
        if (viewMode === 'adventure') {
            setExpandedChapters(prev => {
                if (prev.size === 0) return new Set([unlockedChapter]);
                return prev;
            });
        }
    }, [unlockedChapter, viewMode]);

    const handleOnboardingComplete = (mode: 'guided' | 'free', chapter?: number) => {
        const ch = chapter || 0;
        setUnlockedChapter(ch);
        setViewMode('adventure'); // 強制冒險模式啟航
        localStorage.setItem('dee_onboarding_done', 'true');
        localStorage.setItem('dee_ai_level', ch.toString());
        localStorage.setItem('dee_view_preference', 'adventure');
        setShowOnboarding(false);
    };

    const handleModeSwitch = (m: 'adventure' | 'free') => {
        if (m === 'free') {
            const isElite = localStorage.getItem('dee_elite_status') === 'true';
            const totalMain = MAIN_QUEST_ORDER.length;
            const doneMain = completedIds.filter(id => MAIN_QUEST_ORDER.includes(id)).length;
            
            if (!isElite && doneMain < totalMain) {
                setSkipTarget(999); // 5 題測驗
                return;
            }
        }
        setViewMode(m);
        localStorage.setItem('dee_view_preference', m);
    };

    const handleChallengePassed = (targetId: number) => {
        if (targetId === 999) {
            setViewMode('free');
            localStorage.setItem('dee_view_preference', 'free');
            localStorage.setItem('dee_elite_status', 'true'); // 永久紀錄精英身分
        } else {
            setUnlockedChapter(targetId);
            localStorage.setItem('dee_ai_level', targetId.toString());
            setExpandedChapters(new Set([targetId]));
        }
        setSkipTarget(null);
    };

    const toggleChapter = (id: number) => {
        setExpandedChapters(prev => {
            const next = new Set(prev);
            if (next.has(id)) {
                next.delete(id);
            } else {
                next.add(id);
            }
            return next;
        });
    };

    const filteredInsights = useMemo(() => {
        if (!searchQuery || searchQuery.trim() === '') return allInsights;
        const q = searchQuery.toLowerCase();
        return allInsights.filter(i => (i.title + i.summary + i.category).toLowerCase().includes(q));
    }, [allInsights, searchQuery]);

    const progressPct = allInsights.length > 0 ? completedIds.length / allInsights.length : 0;

    if (loading) return <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center text-white font-mono text-xs tracking-widest animate-pulse text-center text-center">INITIALIZING_SYLLABUS...</div>;

    return (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="pt-24 pb-12 px-6 max-w-7xl mx-auto min-h-screen text-left relative z-0 text-left">
            <SEO title="免費 AI 實用教學" description="15 篇基礎必修課 + 無限戰略演進庫" path="/insights" />
            <AnimatePresence>{showOnboarding && <OnboardingScreen onComplete={handleOnboardingComplete} />}</AnimatePresence>
            <AnimatePresence>{skipTarget && <SkipChapterModal targetChapter={skipTarget} onPass={handleChallengePassed} onClose={() => setSkipTarget(null)} />}</AnimatePresence>

            <div className="relative mb-12 text-left">
                <div className="flex flex-col sm:flex-row items-center justify-between gap-6 mb-10 text-left">
                    <div className="flex items-center gap-5 text-left">
                        <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center shadow-lg shadow-emerald-500/5">
                            <MapIcon size={24} className="text-emerald-400 text-left" />
                        </div>
                        <div className="text-left">
                            <h1 className="text-3xl font-black text-white tracking-tighter">AI 修煉地圖</h1>
                            <span className="text-emerald-500/60 font-mono text-[10px] tracking-[0.4em] uppercase block">Skill Matrix 2.0</span>
                        </div>
                    </div>
                    <div className="bg-black/40 p-1.5 rounded-2xl border border-white/[0.08] flex items-center shadow-inner text-left">
                        <button onClick={() => handleModeSwitch('adventure')} className={`px-6 py-2.5 rounded-xl text-xs font-black transition-all ${viewMode === 'adventure' ? 'bg-emerald-500 text-black shadow-lg scale-105' : 'text-zinc-500 hover:text-white'} text-left`}>冒險</button>
                        <button onClick={() => handleModeSwitch('free')} className={`px-6 py-2.5 rounded-xl text-xs font-black transition-all ${viewMode === 'free' ? 'bg-emerald-500 text-black shadow-lg scale-105' : 'text-zinc-500 hover:text-white'} text-left`}>自由</button>
                    </div>
                </div>

                <p className="text-zinc-400 text-lg max-w-2xl mb-8 leading-relaxed text-left">
                    不只是教學，更是靈魂的重塑。透過 15 篇必修與無限支線，掌握 <span className="text-white">AI 核心主權</span>。
                </p>

                <div className="relative z-10 text-left">
                    <div className="flex items-center justify-between mb-3 text-left text-left">
                        <span className="text-zinc-500 text-[10px] font-black uppercase tracking-widest text-left text-left">Progress</span>
                        <span className="text-emerald-400 text-xs font-black font-mono text-left text-left">{Math.round(progressPct * 100)}%</span>
                    </div>
                    <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden border border-white/5 text-left text-left">
                        <motion.div className="h-full bg-emerald-500 text-left" initial={{ width: 0 }} animate={{ width: `${progressPct * 100}%` }} transition={{ duration: 1, ease: "easeOut" }} />
                    </div>
                </div>
            </div>

            <div key={viewKey} className="relative z-10 text-left text-left">
                {viewMode === 'adventure' ? (
                    <div className="space-y-6 text-left">
                        {CHAPTERS.map((chapter, ci) => {
                            const items = chapter.articleIds.map(id => allInsights.find(i => i.id === id)).filter(Boolean);
                            const done = items.filter(i => completedIds.includes(i!.id)).length;
                            const isLocked = chapter.id > unlockedChapter;
                            const isComplete = done >= items.length;
                            return (
                                <ChapterNode key={chapter.id} chapter={chapter} items={items as any[]} completedIds={completedIds} isLocked={isLocked} isComplete={isComplete} isExpanded={expandedChapters.has(chapter.id)} onToggle={() => toggleChapter(chapter.id)} onSkip={() => setSkipTarget(chapter.id)} index={ci} />
                            );
                        })}
                    </div>
                ) : (
                    <div className="grid grid-cols-1 gap-6 text-left text-left">
                        {filteredInsights.map((item, i) => (
                            <InsightCard key={item.id} insight={item} idx={i} completed={completedIds.includes(item.id)} />
                        ))}
                    </div>
                )}
            </div>
        </motion.div>
    );
};

export default Insights;
