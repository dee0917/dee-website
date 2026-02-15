import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, AlertTriangle, MapPin, Lightbulb, Code, CheckCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import { api, Insight } from '../lib/supabase';
import { INSIGHTS } from '../data/mock';

const ArticleDetail = () => {
    const { id } = useParams();
    const [article, setArticle] = useState<Insight | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (id) {
            fetchArticle(parseInt(id));
        }
    }, [id]);

    const fetchArticle = async (articleId: number) => {
        setLoading(true);
        const data = await api.getInsightById(articleId);
        if (data) {
            setArticle(data);
        } else {
            // Fallback to mock data
            const mockArticle = INSIGHTS.find(insight => insight.id === articleId);
            if (mockArticle) {
                // Convert mock article to Insight type
                const convertedArticle: Insight = {
                    id: mockArticle.id,
                    category: mockArticle.category,
                    title: mockArticle.title,
                    summary: (mockArticle as any).summary || null,
                    content: mockArticle.content || null,
                    read_time: (mockArticle as any).readTime || '5 分鐘',
                    is_published: true,
                    published_at: mockArticle.date ? `${mockArticle.date}T00:00:00Z` : null,
                    created_at: new Date().toISOString(),
                    updated_at: new Date().toISOString(),
                    seo_title: (mockArticle as any).seo_title || null,
                    keywords: mockArticle.keywords || null,
                    search_intent: mockArticle.search_intent || null,
                    target_audience: mockArticle.target_audience || null,
                    pain_point: mockArticle.pain_point || null,
                    scenario: mockArticle.scenario || null,
                    solution: mockArticle.solution || null,
                    example: mockArticle.example || null,
                    faq: mockArticle.faq || null,
                    semantic_tags: (mockArticle as any).semantic_tags || null,
                    relevance_score: (mockArticle as any).relevance_score || null,
                    popularity_score: (mockArticle as any).popularity_score || null,
                    last_analyzed_at: null
                };
                setArticle(convertedArticle);
            } else {
                setArticle(null);
            }
        }
        setLoading(false);
    };

    if (loading) return <div className="text-center pt-32 text-white">載入中...</div>;
    if (!article) return <div className="text-center pt-32 text-white">文章不存在</div>;

    return (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="pt-32 pb-20 px-6 max-w-4xl mx-auto min-h-screen">
            {/* 返回按鈕 */}
            <Link to="/insights" className="inline-flex items-center gap-2 text-zinc-400 hover:text-white transition-colors mb-8">
                <ArrowLeft size={18} /> 返回文章列表
            </Link>

            {/* 文章頭部 */}
            <header className="mb-12">
                <div className="flex items-center gap-3 mb-6">
                    <span className="text-emerald-500 font-bold uppercase tracking-widest text-xs">{article.category}</span>
                    <span className="text-zinc-600 text-xs">•</span>
                    <span className="text-zinc-500 text-xs font-mono">{article.read_time || (article as any).readTime}</span>
                </div>
                <h1 className="text-3xl md:text-5xl font-bold text-white mb-6 leading-tight font-serif">{article.title}</h1>
                <p className="text-xl text-zinc-400 leading-relaxed font-light">{article.summary || ''}</p>
            </header>

            {/* 結構化內容區塊 */}
            {(article.pain_point || (article as any).painPoint) && (
                <motion.section
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-8"
                >
                    <div className="bg-gradient-to-r from-red-500/10 to-orange-500/10 border border-red-500/20 rounded-2xl p-6">
                        <div className="flex items-start gap-4">
                            <div className="w-12 h-12 rounded-xl bg-red-500/10 flex items-center justify-center flex-shrink-0">
                                <AlertTriangle size={24} className="text-red-400" />
                            </div>
                            <div className="flex-1">
                                <h2 className="text-xl font-bold text-white mb-3 flex items-center gap-2">
                                    生活痛點
                                </h2>
                                <p className="text-zinc-300 leading-relaxed">{article.pain_point || (article as any).painPoint}</p>
                            </div>
                        </div>
                    </div>
                </motion.section>
            )}

            {article.scenario && (
                <motion.section
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="mb-8"
                >
                    <div className="bg-gradient-to-r from-amber-500/10 to-yellow-500/10 border border-amber-500/20 rounded-2xl p-6">
                        <div className="flex items-start gap-4">
                            <div className="w-12 h-12 rounded-xl bg-amber-500/10 flex items-center justify-center flex-shrink-0">
                                <MapPin size={24} className="text-amber-400" />
                            </div>
                            <div className="flex-1">
                                <h2 className="text-xl font-bold text-white mb-3 flex items-center gap-2">
                                    應用場景
                                </h2>
                                <p className="text-zinc-300 leading-relaxed">{article.scenario}</p>
                            </div>
                        </div>
                    </div>
                </motion.section>
            )}

            {article.solution && (
                <motion.section
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="mb-8"
                >
                    <div className="bg-gradient-to-r from-emerald-500/10 to-teal-500/10 border border-emerald-500/20 rounded-2xl p-6">
                        <div className="flex items-start gap-4">
                            <div className="w-12 h-12 rounded-xl bg-emerald-500/10 flex items-center justify-center flex-shrink-0">
                                <Lightbulb size={24} className="text-emerald-400" />
                            </div>
                            <div className="flex-1">
                                <h2 className="text-xl font-bold text-white mb-3 flex items-center gap-2">
                                    AI 解決方案
                                </h2>
                                <p className="text-zinc-300 leading-relaxed">{article.solution}</p>
                            </div>
                        </div>
                    </div>
                </motion.section>
            )}

            {article.example && (
                <motion.section
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="mb-12"
                >
                    <div className="bg-[#111] border border-white/10 rounded-2xl p-6">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="w-10 h-10 rounded-lg bg-violet-500/10 flex items-center justify-center flex-shrink-0">
                                <Code size={20} className="text-violet-400" />
                            </div>
                            <h2 className="text-xl font-bold text-white">簡單實例</h2>
                        </div>

                        <div className="space-y-4">
                            {article.example.wrong && (
                                <div className="bg-red-500/5 border border-red-500/20 rounded-xl p-5">
                                    <div className="flex items-center gap-2 mb-3">
                                        <span className="text-red-400 font-bold text-sm">❌ 錯誤示範</span>
                                    </div>
                                    <p className="text-zinc-400 text-sm whitespace-pre-line">{article.example.wrong}</p>
                                </div>
                            )}

                            {article.example.right && (
                                <div className="bg-emerald-500/5 border border-emerald-500/20 rounded-xl p-5">
                                    <div className="flex items-center gap-2 mb-3">
                                        <CheckCircle size={18} className="text-emerald-400" />
                                        <span className="text-emerald-400 font-bold text-sm">✅ 正確用法</span>
                                    </div>
                                    <p className="text-zinc-300 text-sm whitespace-pre-line">{article.example.right}</p>
                                </div>
                            )}
                        </div>
                    </div>
                </motion.section>
            )}

            {/* FAQ 區塊 */}
            {article.faq && article.faq.length > 0 && (
                <motion.section
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="mb-12"
                >
                    <div className="bg-[#111] border border-white/10 rounded-2xl p-6">
                        <h2 className="text-xl font-bold text-white mb-6">常見問題</h2>
                        <div className="space-y-4">
                            {article.faq.map((item, index) => (
                                <div key={index} className="bg-white/5 border border-white/10 rounded-xl p-5">
                                    <h3 className="text-lg font-bold text-white mb-2">Q: {item.question}</h3>
                                    <p className="text-zinc-300 text-sm whitespace-pre-line">A: {item.answer}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </motion.section>
            )}

            {/* 完整文章內容 */}
            <motion.article
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="article-content prose prose-invert max-w-none"
                dangerouslySetInnerHTML={{ __html: article.content || '' }}
            />

            {/* 底部CTA */}
            <div className="mt-16 pt-8 border-t border-white/10 text-center">
                <p className="text-zinc-500 mb-4">覺得這篇文章有幫助嗎？</p>
                <Link
                    to="/insights"
                    className="inline-flex items-center gap-2 text-emerald-500 hover:text-emerald-400 font-medium transition-colors"
                >
                    繼續閱讀更多文章
                </Link>
            </div>
        </motion.div>
    );
};
export default ArticleDetail;