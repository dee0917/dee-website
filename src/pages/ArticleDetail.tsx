import React, { useState, useEffect, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, ArrowRight, Copy, Check, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import { api } from '../lib/supabase';
import { INSIGHTS } from '../data/mock';
import SEO from '../components/ui/SEO';

const fadeUp = {
    initial: { opacity: 0, y: 40 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: "-60px" },
    transition: { duration: 0.5, ease: "easeOut" }
};

const ArticleDetail = () => {
    const { id } = useParams();
    const [article, setArticle] = useState<any | null>(null);
    const [loading, setLoading] = useState(true);
    const [copied, setCopied] = useState(false);
    const [progress, setProgress] = useState(0);
    const [currentStep, setCurrentStep] = useState(0);
    const [stepsCompleted, setStepsCompleted] = useState<boolean[]>([]);
    const [quizAnswer, setQuizAnswer] = useState<number | null>(null);
    const [quizSubmitted, setQuizSubmitted] = useState(false);
    const [badgeEarned, setBadgeEarned] = useState(false);
    const treasureRef = useRef<HTMLDivElement>(null);

    const getColorClasses = (themeColor: string) => {
        const colors: Record<string, any> = {
            emerald: { text: 'text-emerald-500', lightText: 'text-emerald-400', bg: 'bg-emerald-500/10', border: 'border-emerald-500/20', gradient: 'from-emerald-500/20 to-teal-500/10', glow: 'shadow-emerald-500/20', solid: 'bg-emerald-500' },
            yellow: { text: 'text-yellow-500', lightText: 'text-yellow-400', bg: 'bg-yellow-500/10', border: 'border-yellow-500/20', gradient: 'from-yellow-500/20 to-orange-500/10', glow: 'shadow-yellow-500/20', solid: 'bg-yellow-500' },
            amber: { text: 'text-amber-500', lightText: 'text-amber-400', bg: 'bg-amber-500/10', border: 'border-amber-500/20', gradient: 'from-amber-500/20 to-yellow-500/10', glow: 'shadow-amber-500/20', solid: 'bg-amber-500' },
            blue: { text: 'text-blue-500', lightText: 'text-blue-400', bg: 'bg-blue-500/10', border: 'border-blue-500/20', gradient: 'from-blue-500/20 to-indigo-500/10', glow: 'shadow-blue-500/20', solid: 'bg-blue-500' },
            violet: { text: 'text-violet-500', lightText: 'text-violet-400', bg: 'bg-violet-500/10', border: 'border-violet-500/20', gradient: 'from-violet-500/20 to-purple-500/10', glow: 'shadow-violet-500/20', solid: 'bg-violet-500' },
            rose: { text: 'text-rose-500', lightText: 'text-rose-400', bg: 'bg-rose-500/10', border: 'border-rose-500/20', gradient: 'from-rose-500/20 to-pink-500/10', glow: 'shadow-rose-500/20', solid: 'bg-rose-500' },
            teal: { text: 'text-teal-500', lightText: 'text-teal-400', bg: 'bg-teal-500/10', border: 'border-teal-500/20', gradient: 'from-teal-500/20 to-cyan-500/10', glow: 'shadow-teal-500/20', solid: 'bg-teal-500' },
            zinc: { text: 'text-zinc-300', lightText: 'text-zinc-200', bg: 'bg-white/5', border: 'border-white/10', gradient: 'from-white/5 to-zinc-900', glow: 'shadow-white/10', solid: 'bg-zinc-500' }
        };
        return colors[themeColor] || colors.emerald;
    };

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

    useEffect(() => {
        if (article?.steps) {
            setStepsCompleted(new Array(article.steps.length).fill(false));
            setCurrentStep(0);
        }
        setQuizAnswer(null);
        setQuizSubmitted(false);
        setBadgeEarned(false);
        setCopied(false);
    }, [article?.id]);

    const fetchArticle = async (articleId: number) => {
        setLoading(true);
        const localArticle = INSIGHTS.find(i => i.id === articleId);
        const dbData = await api.getInsightById(articleId);
        if (localArticle) setArticle({ ...dbData, ...localArticle });
        else if (dbData) setArticle(dbData);
        else setArticle(null);
        setLoading(false);
    };

    const handleCopy = (text: string) => {
        navigator.clipboard.writeText(text);
        setCopied(true);
        confetti({ particleCount: 60, spread: 50, origin: { y: 0.7 }, colors: ['#10b981', '#34d399', '#6ee7b7'] });
        setTimeout(() => setCopied(false), 3000);
    };

    const handleStepComplete = (idx: number) => {
        const updated = [...stepsCompleted];
        updated[idx] = true;
        setStepsCompleted(updated);
        if (idx < (article?.steps?.length || 0) - 1) {
            setCurrentStep(idx + 1);
        }
    };

    const handleQuizSubmit = () => {
        if (quizAnswer === null) return;
        setQuizSubmitted(true);
        if (quizAnswer === article?.quiz?.answer) {
            confetti({ particleCount: 120, spread: 80, origin: { y: 0.6 } });
        }
    };

    const handleEarnBadge = () => {
        setBadgeEarned(true);
        confetti({ particleCount: 200, spread: 100, origin: { y: 0.5 }, colors: ['#fbbf24', '#f59e0b', '#d97706'] });
    };

    if (loading) return <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center text-white font-mono text-sm">LOADING...</div>;
    if (!article) return <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center text-white">404</div>;

    const theme = getColorClasses(article.themeColor || article.theme_color || 'emerald');
    const isNews = article.category === 'AI 新聞';
    const nextArticle = INSIGHTS.find(i => i.id !== article.id && i.difficulty_level >= (article.difficulty_level || 1)) || INSIGHTS[0];
    const hasSteps = article.steps && article.steps.length > 0;
    const hasQuiz = article.quiz;
    const allStepsDone = stepsCompleted.length > 0 && stepsCompleted.every(Boolean);

    return (
        <>
            {/* 進度條 */}
            <motion.div
                className="fixed top-20 left-0 right-0 h-1 z-50 origin-left"
                style={{ scaleX: progress, background: 'linear-gradient(90deg, #6b7280, #10b981)' }}
            />

            {/* ═══════════ SECTION 1: THE HOOK ═══════════ */}
            <section className="min-h-[85vh] flex flex-col justify-center items-center px-6 pt-28 pb-12 relative">
                <SEO title={article.title} description={article.summary || article.pain_point || ''} path={`/insights/${article.id}`} />

                <Link to={isNews ? "/news" : "/insights"} className="absolute top-24 left-6 inline-flex items-center gap-2 text-zinc-600 hover:text-white transition-colors text-xs font-medium z-10">
                    <ArrowLeft size={14} /> 返回
                </Link>

                <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="text-center max-w-2xl mx-auto">
                    <span className={`${theme.text} text-[10px] font-bold uppercase tracking-[0.3em] mb-4 block`}>{article.category} · {article.readTime}</span>

                    <h1 className="text-3xl md:text-5xl font-bold text-white leading-tight mb-8">{article.title}</h1>

                    {article.pain_point && (
                        <motion.p
                            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3, duration: 0.6 }}
                            className="text-lg md:text-xl text-zinc-400 leading-relaxed max-w-xl mx-auto"
                        >
                            {article.pain_point}
                        </motion.p>
                    )}
                </motion.div>

                <motion.div
                    initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8 }}
                    className="absolute bottom-8 flex flex-col items-center gap-2 text-zinc-600"
                >
                    <span className="text-[10px] uppercase tracking-widest">往下滑</span>
                    <motion.div animate={{ y: [0, 8, 0] }} transition={{ repeat: Infinity, duration: 1.5 }}>
                        <ChevronDown size={20} />
                    </motion.div>
                </motion.div>
            </section>

            {/* ═══════════ SECTION 2: THE MAGIC ═══════════ */}
            {!isNews && article.example && (
                <section className="min-h-[60vh] flex items-center px-5 md:px-6 py-16">
                    <motion.div {...fadeUp} className="max-w-3xl mx-auto w-full">
                        <p className="text-[10px] text-zinc-600 uppercase tracking-[0.3em] mb-6 text-center font-bold">以前 vs 現在</p>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <motion.div
                                initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }} transition={{ duration: 0.5 }}
                                className="bg-red-500/5 border border-red-500/15 rounded-2xl p-6 md:p-8"
                            >
                                <div className="text-red-400 text-3xl mb-3">❌</div>
                                <p className="text-red-300 font-bold text-sm mb-2">以前的你</p>
                                <p className="text-zinc-400 text-sm leading-relaxed">{article.example.wrong}</p>
                            </motion.div>

                            <motion.div
                                initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.2 }}
                                className="bg-emerald-500/5 border border-emerald-500/15 rounded-2xl p-6 md:p-8"
                            >
                                <div className="text-emerald-400 text-3xl mb-3">✅</div>
                                <p className="text-emerald-300 font-bold text-sm mb-2">學完之後的你</p>
                                <p className="text-zinc-300 text-sm leading-relaxed">{article.example.right}</p>
                            </motion.div>
                        </div>
                    </motion.div>
                </section>
            )}

            {/* ═══════════ SECTION 3: THE QUEST（碎步教學） ═══════════ */}
            {hasSteps && (
                <section className="py-16 px-5 md:px-6">
                    <motion.div {...fadeUp} className="max-w-2xl mx-auto">
                        <p className="text-[10px] text-zinc-600 uppercase tracking-[0.3em] mb-8 text-center font-bold">一步一步來</p>

                        <div className="space-y-4">
                            {article.steps.map((step: any, idx: number) => {
                                const isActive = idx <= currentStep;
                                const isDone = stepsCompleted[idx];

                                return (
                                    <motion.div
                                        key={idx}
                                        initial={{ opacity: 0, y: 20 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ duration: 0.4, delay: idx * 0.1 }}
                                        className={`rounded-2xl border p-5 md:p-6 transition-all duration-300 ${
                                            isDone
                                                ? `${theme.bg} ${theme.border} shadow-lg ${theme.glow}`
                                                : isActive
                                                ? 'bg-white/5 border-white/15'
                                                : 'bg-white/[0.02] border-white/5 opacity-40'
                                        }`}
                                    >
                                        <div className="flex items-start gap-4">
                                            <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 text-sm font-bold ${
                                                isDone ? `${theme.solid} text-white` : 'bg-white/10 text-zinc-400'
                                            }`}>
                                                {isDone ? '✓' : idx + 1}
                                            </div>
                                            <div className="flex-1">
                                                <p className="text-white font-bold mb-1">{step.title}</p>
                                                <p className="text-zinc-400 text-sm leading-relaxed mb-3">{step.body}</p>

                                                {step.dee_tip && (
                                                    <p className={`text-xs ${theme.lightText} italic mb-3`}>💡 {step.dee_tip}</p>
                                                )}

                                                {isActive && !isDone && (
                                                    <motion.button
                                                        initial={{ opacity: 0, scale: 0.9 }}
                                                        animate={{ opacity: 1, scale: 1 }}
                                                        whileTap={{ scale: 0.95 }}
                                                        onClick={() => handleStepComplete(idx)}
                                                        className={`text-xs font-bold px-4 py-2 rounded-full ${theme.bg} ${theme.lightText} border ${theme.border} hover:brightness-125 transition-all`}
                                                    >
                                                        我了解了 ✓
                                                    </motion.button>
                                                )}
                                            </div>
                                        </div>
                                    </motion.div>
                                );
                            })}
                        </div>

                        {allStepsDone && (
                            <motion.p
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className={`text-center ${theme.lightText} text-sm font-bold mt-6`}
                            >
                                🎉 全部完成！繼續往下看你的實戰包 ↓
                            </motion.p>
                        )}
                    </motion.div>
                </section>
            )}

            {/* 舊版 content HTML fallback（沒有 steps 的文章） */}
            {!hasSteps && article.content && (
                <section className="py-16 px-5 md:px-6">
                    <motion.article
                        {...fadeUp}
                        className="article-content prose prose-invert max-w-3xl mx-auto leading-relaxed text-left"
                        dangerouslySetInnerHTML={{ __html: article.content }}
                    />
                </section>
            )}

            {/* 場景 + 解決方案 */}
            {!isNews && (article.scenario || article.solution) && (
                <section className="py-12 px-5 md:px-6">
                    <motion.div {...fadeUp} className={`max-w-2xl mx-auto bg-gradient-to-br ${theme.gradient} border ${theme.border} rounded-2xl p-6 md:p-8`}>
                        {article.scenario && (
                            <p className="text-zinc-300 text-sm md:text-base leading-relaxed mb-4" dangerouslySetInnerHTML={{ __html: article.scenario }} />
                        )}
                        {article.solution && (
                            <p className={`${theme.lightText} text-sm font-medium leading-relaxed`} dangerouslySetInnerHTML={{ __html: article.solution }} />
                        )}
                    </motion.div>
                </section>
            )}

            {/* ═══════════ SECTION 4: THE TREASURE ═══════════ */}
            {!isNews && article.practice_kit && (
                <section className="py-16 px-5 md:px-6" ref={treasureRef}>
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, type: "spring" }}
                        className="max-w-2xl mx-auto relative"
                    >
                        <p className="text-[10px] text-zinc-600 uppercase tracking-[0.3em] mb-6 text-center font-bold">🎁 寶物掉落</p>

                        <div className={`bg-[#0a0a0a] border-2 ${theme.border} rounded-3xl p-6 md:p-8 relative overflow-hidden shadow-xl ${theme.glow}`}>
                            <div className={`absolute top-0 right-0 w-64 h-64 bg-gradient-to-br ${theme.gradient} opacity-10 blur-3xl`} />

                            <div className="relative z-10">
                                <h3 className="text-xl font-bold text-white mb-1">{article.practice_kit.title}</h3>
                                <p className="text-zinc-400 text-sm mb-5">{article.practice_kit.description}</p>

                                <div className={`bg-black/60 backdrop-blur-xl border border-white/10 rounded-xl p-5 font-mono text-sm leading-loose ${theme.lightText} whitespace-pre-wrap mb-5`}>
                                    {article.practice_kit.command}
                                </div>

                                <motion.button
                                    whileTap={{ scale: 0.95 }}
                                    onClick={() => handleCopy(article.practice_kit.command)}
                                    className={`w-full flex items-center justify-center gap-2 py-4 rounded-xl font-bold text-base transition-all ${
                                        copied
                                        ? 'bg-emerald-500 text-white shadow-lg shadow-emerald-500/30'
                                        : `${theme.solid} text-white hover:brightness-110`
                                    }`}
                                >
                                    {copied
                                        ? <><Check size={20} /> 指令已就緒！去試試看 🚀</>
                                        : <><Copy size={20} /> 一鍵複製指令</>
                                    }
                                </motion.button>
                            </div>
                        </div>
                    </motion.div>
                </section>
            )}

            {/* 金句 */}
            {article.insight_quote && (
                <section className="py-12 px-5 md:px-6">
                    <motion.p {...fadeUp} className="text-lg md:text-xl text-zinc-300 text-center max-w-xl mx-auto leading-relaxed">
                        「{article.insight_quote}」
                    </motion.p>
                </section>
            )}

            {/* ═══════════ SECTION 5: THE BOSS BATTLE ═══════════ */}
            {hasQuiz && (
                <section className="py-16 px-5 md:px-6">
                    <motion.div {...fadeUp} className="max-w-2xl mx-auto">
                        <p className="text-[10px] text-zinc-600 uppercase tracking-[0.3em] mb-6 text-center font-bold">⚔️ 小小挑戰</p>

                        <div className="bg-white/5 border border-white/10 rounded-2xl p-6 md:p-8">
                            <p className="text-white font-bold text-lg mb-6">{article.quiz.question}</p>

                            <div className="space-y-3 mb-6">
                                {article.quiz.options.map((opt: string, idx: number) => {
                                    const isSelected = quizAnswer === idx;
                                    const isCorrect = idx === article.quiz.answer;
                                    const showResult = quizSubmitted;

                                    return (
                                        <motion.button
                                            key={idx}
                                            whileTap={!quizSubmitted ? { scale: 0.98 } : {}}
                                            onClick={() => !quizSubmitted && setQuizAnswer(idx)}
                                            className={`w-full text-left p-4 rounded-xl border transition-all text-sm ${
                                                showResult && isCorrect
                                                    ? 'bg-emerald-500/15 border-emerald-500/30 text-emerald-300'
                                                    : showResult && isSelected && !isCorrect
                                                    ? 'bg-red-500/15 border-red-500/30 text-red-300'
                                                    : isSelected
                                                    ? `${theme.bg} ${theme.border} text-white`
                                                    : 'bg-white/[0.02] border-white/5 text-zinc-400 hover:bg-white/5'
                                            }`}
                                            disabled={quizSubmitted}
                                        >
                                            <span className="font-mono text-xs mr-3 opacity-50">{String.fromCharCode(65 + idx)}</span>
                                            {opt}
                                        </motion.button>
                                    );
                                })}
                            </div>

                            {!quizSubmitted ? (
                                <motion.button
                                    whileTap={{ scale: 0.95 }}
                                    onClick={handleQuizSubmit}
                                    disabled={quizAnswer === null}
                                    className={`w-full py-3 rounded-xl font-bold text-sm transition-all ${
                                        quizAnswer !== null ? `${theme.solid} text-white` : 'bg-white/5 text-zinc-600 cursor-not-allowed'
                                    }`}
                                >
                                    送出答案
                                </motion.button>
                            ) : (
                                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mt-4">
                                    <p className={`text-sm font-bold mb-2 ${quizAnswer === article.quiz.answer ? 'text-emerald-400' : 'text-amber-400'}`}>
                                        {quizAnswer === article.quiz.answer ? '🎉 答對了！' : '💡 差一點！'}
                                    </p>
                                    <p className="text-zinc-400 text-sm leading-relaxed">{article.quiz.explanation}</p>
                                </motion.div>
                            )}
                        </div>
                    </motion.div>
                </section>
            )}

            {/* ═══════════ SECTION 6: THE REWARD ═══════════ */}
            <section className="py-16 px-5 md:px-6">
                <motion.div {...fadeUp} className="max-w-md mx-auto text-center">
                    {!badgeEarned ? (
                        <motion.button
                            whileTap={{ scale: 0.95 }}
                            onClick={handleEarnBadge}
                            className={`${theme.solid} text-white font-bold py-4 px-8 rounded-2xl text-lg shadow-lg ${theme.glow} hover:brightness-110 transition-all`}
                        >
                            🏆 我學會了！
                        </motion.button>
                    ) : (
                        <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ type: "spring" }}>
                            <div className={`inline-block ${theme.bg} border-2 ${theme.border} rounded-3xl p-8 md:p-10 shadow-xl ${theme.glow}`}>
                                <p className="text-5xl mb-4">{article.skill_badge?.split(' ')[0] || '🏆'}</p>
                                <p className="text-white font-bold text-lg mb-1">恭喜你！</p>
                                <p className={`${theme.lightText} text-sm font-bold mb-1`}>你已掌握</p>
                                <p className="text-white text-xl font-bold">{article.skill_badge || article.title}</p>
                                <p className="text-zinc-600 text-[10px] mt-4 uppercase tracking-widest">Dee's AI Life Lab · {article.date}</p>
                            </div>
                        </motion.div>
                    )}
                </motion.div>
            </section>

            {/* 下一篇 */}
            <section className="pb-20 px-5 md:px-6">
                <div className="max-w-2xl mx-auto border-t border-white/5 pt-12">
                    <p className="text-zinc-600 text-[10px] font-bold uppercase tracking-[0.3em] mb-4">趁熱打鐵 →</p>
                    <Link to={`/insights/${nextArticle.id}`} className="group block bg-white/5 border border-white/10 hover:border-emerald-500/30 p-6 md:p-8 rounded-2xl transition-all">
                        <div className="flex items-center justify-between">
                            <div>
                                <span className="text-[10px] text-zinc-500 uppercase tracking-widest mb-2 block">下一篇</span>
                                <h3 className="text-lg font-bold text-white group-hover:text-emerald-400 transition-colors">{nextArticle.title}</h3>
                            </div>
                            <ArrowRight className="text-zinc-700 group-hover:text-emerald-400 group-hover:translate-x-2 transition-all flex-shrink-0" size={28} />
                        </div>
                    </Link>
                </div>
            </section>
        </>
    );
};
export default ArticleDetail;
