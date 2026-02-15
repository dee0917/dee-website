import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { api } from '../lib/supabase';
import { INSIGHTS } from '../data/mock';

const Insights = () => {
    const navigate = useNavigate();
    const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
    const [insights, setInsights] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchInsights();
    }, []);

    const fetchInsights = async () => {
        setLoading(true);
        try {
            const data = await api.getInsights();
            if (data && data.length > 0) {
                // 合併 Mock 資料與 Supabase 資料
                const dbIds = new Set(data.map((i: any) => i.id));

                // 找出只存在於 Mock 的文章
                const uniqueMockInsights = INSIGHTS.filter(i => !dbIds.has(i.id));

                // 合併：DB 資料在前，Mock 獨有資料在後
                const combinedInsights = [...data, ...uniqueMockInsights].sort((a: any, b: any) => {
                    // 兼容不同欄位名稱 (mock: date, db: published_at)
                    const dateA = new Date(a.date || a.published_at).getTime();
                    const dateB = new Date(b.date || b.published_at).getTime();
                    return dateB - dateA;
                });

                setInsights(combinedInsights);
            } else {
                console.warn('No insights from Supabase, using mock data');
                setInsights(INSIGHTS);
            }
        } catch (error) {
            console.error('Failed to fetch insights, using mock data', error);
            setInsights(INSIGHTS);
        }
        setLoading(false);
    };

    // 取得所有不重複的分類
    const categories = Array.from(new Set(insights.map(insight => insight.category)));

    // 根據選擇的分類篩選文章
    const filteredInsights = selectedCategory
        ? insights.filter(insight => insight.category === selectedCategory)
        : insights;

    return (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="pt-32 pb-20 px-6 max-w-6xl mx-auto min-h-screen">
            {/* 標題區 - 與首頁風格一致 */}
            <div className="text-center mb-12">
                <span className="text-emerald-500 font-bold tracking-widest text-xs uppercase mb-4 block">FREE CONTENT</span>
                <h1 className="text-4xl md:text-5xl font-bold font-serif text-white mb-6">免費 AI 實用教學</h1>
                <p className="text-zinc-400 text-xl max-w-2xl mx-auto">
                    這些都是免費的！每一篇都是我親自實驗後整理的心得，幫助你更快上手 AI。
                </p>
            </div>

            {/* 分類篩選器 */}
            <div className="flex flex-wrap justify-center gap-3 mb-16 px-4">
                <button
                    onClick={() => setSelectedCategory(null)}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${selectedCategory === null
                        ? 'bg-emerald-500 text-black'
                        : 'bg-zinc-800 text-zinc-400 hover:bg-zinc-700 hover:text-white'
                        }`}
                >
                    全部文章
                </button>
                {categories.map(category => (
                    <button
                        key={category}
                        onClick={() => setSelectedCategory(category)}
                        className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${selectedCategory === category
                            ? 'bg-emerald-500 text-black'
                            : 'bg-zinc-800 text-zinc-400 hover:bg-zinc-700 hover:text-white'
                            }`}
                    >
                        {category}
                    </button>
                ))}
            </div>

            {/* 文章卡片 - 與首頁完全一致的風格 */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {filteredInsights.map((insight, i) => (
                    <Link
                        to={`/insights/${insight.id}`}
                        key={insight.id}
                        className="group block"
                    >
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.05 }}
                            viewport={{ once: true }}
                            className="bg-[#111] border border-white/5 hover:border-emerald-500/30 p-6 rounded-xl cursor-pointer transition-all hover:-translate-y-1 h-full"
                        >
                            {/* 類別標籤 + 免費閱讀 */}
                            <div className="flex items-center gap-2 mb-3">
                                <span
                                    onClick={(e) => {
                                        e.preventDefault();
                                        e.stopPropagation();
                                        setSelectedCategory(insight.category);
                                    }}
                                    className="text-xs text-emerald-500 font-medium px-2 py-1 bg-emerald-500/10 rounded hover:bg-emerald-500/20 transition-colors z-10 relative"
                                >
                                    {insight.category}
                                </span>
                                <span className="text-xs text-zinc-500">免費閱讀</span>
                            </div>

                            {/* 標題 */}
                            <h4 className="text-lg font-bold text-white mb-3 group-hover:text-emerald-400 transition-colors line-clamp-2">
                                {insight.title}
                            </h4>

                            {/* 摘要 */}
                            <p className="text-zinc-400 text-sm line-clamp-3 mb-4">{insight.summary || ''}</p>

                            {/* 底部：閱讀時間 + 箭頭 */}
                            <div className="flex items-center justify-between pt-4 border-t border-white/5">
                                <span className="text-xs text-zinc-500">{insight.read_time || insight.readTime}</span>
                                <ArrowRight size={16} className="text-zinc-600 group-hover:text-emerald-400 group-hover:translate-x-1 transition-all" />
                            </div>
                        </motion.div>
                    </Link>
                ))}
            </div>

            {/* 底部提示 */}
            <div className="text-center mt-16 py-12 border-t border-white/5">
                <p className="text-zinc-500 mb-4">想收到更多實用內容？</p>
                <Link
                    to="/"
                    className="inline-flex items-center gap-2 text-emerald-500 hover:underline font-medium"
                >
                    訂閱免費週報 <ArrowRight size={16} />
                </Link>
            </div>
        </motion.div>
    );
};

export default Insights;