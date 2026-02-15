import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, AlertTriangle, CheckCircle, RefreshCw, FileText, Zap, Loader2 } from 'lucide-react';
import { supabase, Insight } from '../../lib/supabase';
import { detectUnstructuredArticles, suggestStructuredContent, StructuredContent } from '../../lib/contentStructurer';

interface UnstructuredArticle {
    id: number;
    title: string;
    reason: string;
}

const ContentStructureManager = () => {
    const [loading, setLoading] = useState(true);
    const [articles, setArticles] = useState<Insight[]>([]);
    const [unstructured, setUnstructured] = useState<UnstructuredArticle[]>([]);
    const [converting, setConverting] = useState<number | null>(null);
    const [selectedArticle, setSelectedArticle] = useState<Insight | null>(null);
    const [suggestedContent, setSuggestedContent] = useState<StructuredContent | null>(null);
    const [showPreview, setShowPreview] = useState(false);

    useEffect(() => {
        loadArticles();
    }, []);

    const loadArticles = async () => {
        setLoading(true);
        const { data, error } = await supabase
            .from('insights')
            .select('*')
            .order('created_at', { ascending: false });

        if (error) {
            console.error('Error loading articles:', error);
        } else {
            setArticles(data || []);
            const unstructuredList = detectUnstructuredArticles(data || []);
            setUnstructured(unstructuredList);
        }
        setLoading(false);
    };

    const handlePreviewStructure = (articleId: number) => {
        const article = articles.find(a => a.id === articleId);
        if (!article) return;

        const suggested = suggestStructuredContent(
            article.content || '',
            article.title,
            article.category
        );

        setSelectedArticle(article);
        setSuggestedContent(suggested);
        setShowPreview(true);
    };

    const handleConvert = async (articleId: number) => {
        const article = articles.find(a => a.id === articleId);
        if (!article) return;

        setConverting(articleId);

        try {
            const suggested = suggestStructuredContent(
                article.content || '',
                article.title,
                article.category
            );

            const { error } = await supabase
                .from('insights')
                .update({
                    pain_point: suggested.pain_point || null,
                    scenario: suggested.scenario || null,
                    solution: suggested.solution || null,
                    example: suggested.example || null,
                    faq: suggested.faq || null,
                    updated_at: new Date().toISOString(),
                })
                .eq('id', articleId);

            if (error) {
                alert('轉換失敗：' + error.message);
            } else {
                alert('轉換成功！文章已結構化。');
                await loadArticles();
            }
        } catch (err) {
            console.error('Conversion error:', err);
            alert('轉換過程發生錯誤');
        }

        setConverting(null);
    };

    const handleClosePreview = () => {
        setShowPreview(false);
        setSelectedArticle(null);
        setSuggestedContent(null);
    };

    const handleEditDirectly = () => {
        if (selectedArticle) {
            window.open(`/admin/insights/${selectedArticle.id}`, '_blank');
        }
    };

    const totalArticles = articles.length;
    const structuredCount = totalArticles - unstructured.length;
    const completionRate = totalArticles > 0 ? Math.round((structuredCount / totalArticles) * 100) : 0;

    return (
        <div className="space-y-8">
            {/* 標題區域 */}
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <Link to="/admin/insights" className="flex items-center gap-2 text-zinc-400 hover:text-white transition-colors">
                        <ArrowLeft size={18} />
                        返回教學列表
                    </Link>
                    <div className="h-6 w-px bg-white/10" />
                    <div>
                        <h1 className="text-2xl font-bold text-white">內容結構化管理</h1>
                        <p className="text-zinc-400 text-sm mt-1">將非結構化內容轉換為 AEO 優化格式</p>
                    </div>
                </div>
                <button
                    onClick={loadArticles}
                    className="flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg transition-colors text-white"
                >
                    <RefreshCw size={16} />
                    重新檢測
                </button>
            </div>

            {/* 統計卡片 */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div className="bg-[#111] border border-white/10 rounded-xl p-6">
                    <div className="flex items-center gap-3 mb-3">
                        <FileText size={20} className="text-blue-400" />
                        <span className="text-zinc-400 text-sm">總文章數</span>
                    </div>
                    <div className="text-3xl font-bold text-white">{totalArticles}</div>
                </div>

                <div className="bg-[#111] border border-white/10 rounded-xl p-6">
                    <div className="flex items-center gap-3 mb-3">
                        <CheckCircle size={20} className="text-emerald-400" />
                        <span className="text-zinc-400 text-sm">已結構化</span>
                    </div>
                    <div className="text-3xl font-bold text-emerald-400">{structuredCount}</div>
                </div>

                <div className="bg-[#111] border border-white/10 rounded-xl p-6">
                    <div className="flex items-center gap-3 mb-3">
                        <AlertTriangle size={20} className="text-amber-400" />
                        <span className="text-zinc-400 text-sm">待處理</span>
                    </div>
                    <div className="text-3xl font-bold text-amber-400">{unstructured.length}</div>
                </div>

                <div className="bg-[#111] border border-white/10 rounded-xl p-6">
                    <div className="flex items-center gap-3 mb-3">
                        <Zap size={20} className="text-violet-400" />
                        <span className="text-zinc-400 text-sm">完成率</span>
                    </div>
                    <div className="text-3xl font-bold text-violet-400">{completionRate}%</div>
                </div>
            </div>

            {/* 進度條 */}
            <div className="bg-[#111] border border-white/10 rounded-xl p-6">
                <div className="flex justify-between items-center mb-3">
                    <span className="text-white font-medium">結構化進度</span>
                    <span className="text-zinc-400 text-sm">{structuredCount} / {totalArticles} 篇</span>
                </div>
                <div className="w-full bg-white/10 rounded-full h-3">
                    <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${completionRate}%` }}
                        transition={{ duration: 0.5 }}
                        className={`h-full rounded-full ${
                            completionRate === 100
                                ? 'bg-emerald-500'
                                : completionRate >= 70
                                ? 'bg-blue-500'
                                : 'bg-amber-500'
                        }`}
                    />
                </div>
            </div>

            {/* 載入中 */}
            {loading ? (
                <div className="flex items-center justify-center py-20">
                    <Loader2 size={32} className="animate-spin text-white" />
                </div>
            ) : (
                <>
                    {/* 已完成 */}
                    {unstructured.length === 0 && (
                        <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-xl p-8 text-center">
                            <CheckCircle size={48} className="text-emerald-400 mx-auto mb-4" />
                            <h3 className="text-xl font-bold text-white mb-2">太棒了！所有文章都已完成結構化</h3>
                            <p className="text-zinc-400">您的所有教學文章都已符合 AEO 優化格式</p>
                        </div>
                    )}

                    {/* 待處理列表 */}
                    {unstructured.length > 0 && (
                        <div className="space-y-4">
                            <div className="flex items-center justify-between">
                                <h2 className="text-lg font-bold text-white">待結構化文章</h2>
                                <span className="text-zinc-400 text-sm">{unstructured.length} 篇需要處理</span>
                            </div>

                            <div className="space-y-3">
                                {unstructured.map((article) => (
                                    <motion.div
                                        key={article.id}
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        className="bg-[#111] border border-amber-500/30 rounded-xl p-5"
                                    >
                                        <div className="flex items-start justify-between gap-4">
                                            <div className="flex-1">
                                                <div className="flex items-center gap-2 mb-2">
                                                    <AlertTriangle size={16} className="text-amber-400" />
                                                    <span className="text-sm text-amber-400">需要結構化</span>
                                                </div>
                                                <h3 className="text-lg font-bold text-white mb-2">
                                                    {article.title}
                                                </h3>
                                                <p className="text-sm text-zinc-400">{article.reason}</p>
                                            </div>

                                            <div className="flex items-center gap-2">
                                                <button
                                                    onClick={() => handlePreviewStructure(article.id)}
                                                    className="px-4 py-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg transition-colors text-sm text-white"
                                                >
                                                    預覽
                                                </button>
                                                <Link
                                                    to={`/admin/insights/${article.id}`}
                                                    className="px-4 py-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg transition-colors text-sm text-white"
                                                >
                                                    編輯
                                                </Link>
                                                <button
                                                    onClick={() => handleConvert(article.id)}
                                                    disabled={converting === article.id}
                                                    className="px-4 py-2 bg-emerald-500/20 hover:bg-emerald-500/30 border border-emerald-500/30 rounded-lg transition-colors text-sm text-emerald-400 disabled:opacity-50 flex items-center gap-2"
                                                >
                                                    {converting === article.id ? (
                                                        <>
                                                            <Loader2 size={14} className="animate-spin" />
                                                            轉換中
                                                        </>
                                                    ) : (
                                                        <>
                                                            <Zap size={14} />
                                                            自動轉換
                                                        </>
                                                    )}
                                                </button>
                                            </div>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* 已結構化文章列表 */}
                    {unstructured.length < totalArticles && (
                        <div className="space-y-4">
                            <div className="flex items-center justify-between">
                                <h2 className="text-lg font-bold text-white">已結構化文章</h2>
                                <span className="text-zinc-400 text-sm">{structuredCount} 篇已完成</span>
                            </div>

                            <div className="bg-[#111] border border-white/10 rounded-xl divide-y divide-white/5">
                                {articles
                                    .filter(article =>
                                        !unstructured.find(u => u.id === article.id)
                                    )
                                    .map((article) => (
                                        <div
                                            key={article.id}
                                            className="p-4 flex items-center justify-between hover:bg-white/5 transition-colors"
                                        >
                                            <div className="flex items-center gap-3">
                                                <CheckCircle size={16} className="text-emerald-400" />
                                                <span className="text-white">{article.title}</span>
                                            </div>
                                            <Link
                                                to={`/insights/${article.id}`}
                                                target="_blank"
                                                className="text-sm text-zinc-400 hover:text-white transition-colors"
                                            >
                                                查看前台
                                            </Link>
                                        </div>
                                    ))}
                            </div>
                        </div>
                    )}
                </>
            )}

            {/* 預覽對話框 */}
            {showPreview && selectedArticle && suggestedContent && (
                <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="bg-[#1a1a1a] border border-white/10 rounded-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden"
                    >
                        {/* 對話框標題 */}
                        <div className="flex items-center justify-between p-6 border-b border-white/10">
                            <div>
                                <h2 className="text-xl font-bold text-white">結構化預覽</h2>
                                <p className="text-zinc-400 text-sm mt-1">{selectedArticle.title}</p>
                            </div>
                            <button
                                onClick={handleClosePreview}
                                className="text-zinc-400 hover:text-white transition-colors"
                            >
                                ✕
                            </button>
                        </div>

                        {/* 預覽內容 */}
                        <div className="p-6 overflow-y-auto max-h-[calc(90vh-140px)] space-y-6">
                            {/* 生活痛點 */}
                            {suggestedContent.pain_point && (
                                <div className="bg-gradient-to-r from-red-500/10 to-orange-500/10 border border-red-500/20 rounded-xl p-5">
                                    <div className="flex items-center gap-2 mb-3">
                                        <AlertTriangle size={18} className="text-red-400" />
                                        <span className="text-white font-bold">生活痛點</span>
                                    </div>
                                    <p className="text-zinc-300 text-sm leading-relaxed">{suggestedContent.pain_point}</p>
                                </div>
                            )}

                            {/* 應用場景 */}
                            {suggestedContent.scenario && (
                                <div className="bg-gradient-to-r from-amber-500/10 to-yellow-500/10 border border-amber-500/20 rounded-xl p-5">
                                    <div className="flex items-center gap-2 mb-3">
                                        <span className="text-amber-400 font-bold">應用場景</span>
                                    </div>
                                    <p className="text-zinc-300 text-sm leading-relaxed">{suggestedContent.scenario}</p>
                                </div>
                            )}

                            {/* AI 解決方案 */}
                            {suggestedContent.solution && (
                                <div className="bg-gradient-to-r from-emerald-500/10 to-teal-500/10 border border-emerald-500/20 rounded-xl p-5">
                                    <div className="flex items-center gap-2 mb-3">
                                        <span className="text-emerald-400 font-bold">AI 解決方案</span>
                                    </div>
                                    <p className="text-zinc-300 text-sm leading-relaxed">{suggestedContent.solution}</p>
                                </div>
                            )}

                            {/* 實例範例 */}
                            {suggestedContent.example && (
                                <div className="bg-[#111] border border-white/10 rounded-xl p-5">
                                    <div className="text-white font-bold mb-4">簡單實例</div>
                                    <div className="space-y-3">
                                        {suggestedContent.example.wrong && (
                                            <div className="bg-red-500/5 border border-red-500/20 rounded-lg p-4">
                                                <span className="text-red-400 font-bold text-sm">❌ 錯誤示範</span>
                                                <p className="text-zinc-400 text-sm mt-2 whitespace-pre-line">{suggestedContent.example.wrong}</p>
                                            </div>
                                        )}
                                        {suggestedContent.example.right && (
                                            <div className="bg-emerald-500/5 border border-emerald-500/20 rounded-lg p-4">
                                                <span className="text-emerald-400 font-bold text-sm">✅ 正確用法</span>
                                                <p className="text-zinc-300 text-sm mt-2 whitespace-pre-line">{suggestedContent.example.right}</p>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            )}

                            {/* FAQ */}
                            {suggestedContent.faq && suggestedContent.faq.length > 0 && (
                                <div className="bg-[#111] border border-white/10 rounded-xl p-5">
                                    <div className="text-white font-bold mb-4">常見問題</div>
                                    <div className="space-y-3">
                                        {suggestedContent.faq.map((item, index) => (
                                            <div key={index} className="bg-white/5 border border-white/10 rounded-lg p-4">
                                                <h4 className="text-white font-medium text-sm mb-2">Q: {item.question}</h4>
                                                <p className="text-zinc-300 text-sm whitespace-pre-line">A: {item.answer}</p>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* 操作按鈕 */}
                        <div className="flex items-center justify-end gap-3 p-6 border-t border-white/10">
                            <button
                                onClick={handleClosePreview}
                                className="px-5 py-2 bg-white/10 hover:bg-white/20 rounded-lg transition-colors text-white"
                            >
                                關閉
                            </button>
                            <button
                                onClick={handleEditDirectly}
                                className="px-5 py-2 bg-white/10 hover:bg-white/20 rounded-lg transition-colors text-white"
                            >
                                編輯
                            </button>
                            <button
                                onClick={() => handleConvert(selectedArticle.id)}
                                disabled={converting === selectedArticle.id}
                                className="px-5 py-2 bg-emerald-500 hover:bg-emerald-600 rounded-lg transition-colors text-white disabled:opacity-50 flex items-center gap-2"
                            >
                                {converting === selectedArticle.id ? (
                                    <>
                                        <Loader2 size={16} className="animate-spin" />
                                        轉換中
                                    </>
                                ) : (
                                    <>
                                        <Zap size={16} />
                                        確認轉換
                                    </>
                                )}
                            </button>
                        </div>
                    </motion.div>
                </div>
            )}
        </div>
    );
};

export default ContentStructureManager;
