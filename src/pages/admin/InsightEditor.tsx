import { useState, useEffect } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Save, Eye, Trash2 } from 'lucide-react';
import { supabase, Insight } from '../../lib/supabase';
import RichTextEditor from '../../components/admin/RichTextEditor';

const InsightEditor = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const isNew = id === 'new';

    const [loading, setLoading] = useState(!isNew);
    const [saving, setSaving] = useState(false);
    const [insight, setInsight] = useState<Partial<Insight>>({
        category: '',
        title: '',
        summary: '',
        content: '',
        read_time: '5 分鐘',
        is_published: false,
        // AEO fields
        seo_title: '',
        keywords: [],
        search_intent: '',
        target_audience: '',
        pain_point: '',
        scenario: '',
        solution: '',
        example: null,
        faq: [],
        semantic_tags: [],
        relevance_score: null,
        popularity_score: null,
        last_analyzed_at: null,
    });

    useEffect(() => {
        if (!isNew && id) {
            fetchInsight(parseInt(id));
        }
    }, [id, isNew]);

    const fetchInsight = async (insightId: number) => {
        const { data, error } = await supabase
            .from('insights')
            .select('*')
            .eq('id', insightId)
            .single();

        if (error) {
            console.error('Error fetching insight:', error);
            navigate('/admin/insights');
        } else if (data) {
            setInsight(data);
        }
        setLoading(false);
    };

    const handleSave = async (publish: boolean = false) => {
        setSaving(true);

        const dataToSave = {
            ...insight,
            is_published: publish ? true : insight.is_published,
            published_at: publish ? new Date().toISOString() : insight.published_at,
        };

        let error: any;
        if (isNew) {
            const { error: insertError } = await supabase
                .from('insights')
                .insert([dataToSave]);
            error = insertError;
        } else {
            const { error: updateError } = await supabase
                .from('insights')
                .update(dataToSave)
                .eq('id', id);
            error = updateError;
        }

        if (error) {
            alert('儲存失敗：' + error.message);
        } else {
            alert(publish ? '文章已發布！' : '儲存成功！');
            navigate('/admin/insights');
        }
        setSaving(false);
    };

    const handleDelete = async () => {
        if (!confirm('確定要刪除這篇文章嗎？此操作無法復原。')) return;

        const { error } = await supabase
            .from('insights')
            .delete()
            .eq('id', id);

        if (error) {
            alert('刪除失敗：' + error.message);
        } else {
            navigate('/admin/insights');
        }
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center h-64">
                <div className="text-white">載入中...</div>
            </div>
        );
    }

    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2 }}
        >
            {/* 操作欄 */}
            <div className="flex items-center justify-between mb-8">
                <Link to="/admin/insights" className="flex items-center gap-2 text-zinc-400 hover:text-white transition-colors">
                    <ArrowLeft size={18} />
                    返回教學列表
                </Link>
                <div className="flex items-center gap-3">
                    {!isNew && (
                        <button
                            onClick={handleDelete}
                            className="px-4 py-2 text-red-400 hover:bg-red-500/10 rounded-lg transition-colors flex items-center gap-2"
                        >
                            <Trash2 size={18} /> 刪除
                        </button>
                    )}
                    {!isNew && insight.is_published && (
                        <Link
                            to={`/insights/${id}`}
                            target="_blank"
                            className="px-4 py-2 text-zinc-400 hover:bg-white/10 rounded-lg transition-colors flex items-center gap-2"
                        >
                            <Eye size={18} /> 預覽
                        </Link>
                    )}
                    <button
                        onClick={() => handleSave(false)}
                        disabled={saving}
                        className="px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg transition-colors flex items-center gap-2 disabled:opacity-50"
                    >
                        <Save size={18} /> 儲存草稿
                    </button>
                    <button
                        onClick={() => handleSave(true)}
                        disabled={saving}
                        className="px-4 py-2 bg-emerald-500 hover:bg-blue-600 rounded-lg transition-colors flex items-center gap-2 disabled:opacity-50"
                    >
                        發布
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* 主要編輯區 */}
                <div className="lg:col-span-2 space-y-6">
                    <div>
                        <label className="block text-sm text-zinc-400 mb-2">教學標題</label>
                        <input
                            type="text"
                            value={insight.title}
                            onChange={(e) => setInsight({ ...insight, title: e.target.value })}
                            className="w-full bg-[#111] border border-white/10 rounded-lg px-4 py-3 text-2xl font-bold text-white focus:outline-none focus:border-emerald-500 transition-colors"
                            placeholder="輸入教學標題..."
                        />
                    </div>

                    <div>
                        <label className="block text-sm text-zinc-400 mb-2">摘要</label>
                        <textarea
                            value={insight.summary || ''}
                            onChange={(e) => setInsight({ ...insight, summary: e.target.value })}
                            className="w-full bg-[#111] border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-emerald-500 transition-colors resize-none"
                            rows={3}
                            placeholder="簡短描述這篇教學的內容..."
                        />
                    </div>

                    <div>
                        <label className="block text-sm text-zinc-400 mb-2">教學內容</label>
                        <RichTextEditor
                            content={insight.content || ''}
                            onChange={(html) => setInsight({ ...insight, content: html })}
                            placeholder="開始撰寫你的教學..."
                        />
                    </div>
                </div>

                {/* 側邊欄設定 */}
                <div className="space-y-6">
                    <div className="bg-[#111] border border-white/10 rounded-xl p-6">
                        <h3 className="font-bold mb-4">教學設定</h3>

                        <div className="mb-4">
                            <label className="block text-sm text-zinc-400 mb-2">分類</label>
                            <select
                                value={insight.category}
                                onChange={(e) => setInsight({ ...insight, category: e.target.value })}
                                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-emerald-500 transition-colors"
                            >
                                <option value="">選擇分類</option>
                                <option value="入門心法">入門心法</option>
                                <option value="生活應用">生活應用</option>
                                <option value="工作效率">工作效率</option>
                                <option value="長輩友善">長輩友善</option>
                                <option value="進階技巧">進階技巧</option>
                            </select>
                        </div>

                        <div className="mb-4">
                            <label className="block text-sm text-zinc-400 mb-2">閱讀時間</label>
                            <input
                                type="text"
                                value={insight.read_time}
                                onChange={(e) => setInsight({ ...insight, read_time: e.target.value })}
                                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-emerald-500 transition-colors"
                                placeholder="例如：5 分鐘"
                            />
                        </div>

                        <div className="pt-4 border-t border-white/10">
                            <label className="flex items-center gap-3 cursor-pointer">
                                <input
                                    type="checkbox"
                                    checked={insight.is_published}
                                    onChange={(e) => setInsight({ ...insight, is_published: e.target.checked })}
                                    className="w-5 h-5 rounded border-white/20 bg-white/5 text-emerald-500 focus:ring-emerald-500 focus:ring-offset-0"
                                />
                                <span className="text-white">已發布</span>
                            </label>
                        </div>
                    </div>

                    <div className="bg-[#111] border border-white/10 rounded-xl p-6">
                        <h3 className="font-bold mb-4">答案引擎優化 (AEO)</h3>
                        
                        <div className="mb-4">
                            <label className="block text-sm text-zinc-400 mb-2">SEO 標題</label>
                            <input
                                type="text"
                                value={insight.seo_title || ''}
                                onChange={(e) => setInsight({ ...insight, seo_title: e.target.value })}
                                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-emerald-500 transition-colors"
                                placeholder="針對搜尋引擎優化的標題"
                            />
                        </div>

                        <div className="mb-4">
                            <label className="block text-sm text-zinc-400 mb-2">關鍵詞 (用逗號分隔)</label>
                            <input
                                type="text"
                                value={insight.keywords?.join(', ') || ''}
                                onChange={(e) => setInsight({ ...insight, keywords: e.target.value.split(',').map(k => k.trim()).filter(k => k) })}
                                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-emerald-500 transition-colors"
                                placeholder="AI教學, ChatGPT使用方法, AI提示詞"
                            />
                        </div>

                        <div className="mb-4">
                            <label className="block text-sm text-zinc-400 mb-2">搜尋意圖</label>
                            <textarea
                                value={insight.search_intent || ''}
                                onChange={(e) => setInsight({ ...insight, search_intent: e.target.value })}
                                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-emerald-500 transition-colors resize-none"
                                rows={2}
                                placeholder="學習者想要了解為什麼 AI 聽不懂指令，以及如何有效與 AI 溝通"
                            />
                        </div>

                        <div className="mb-4">
                            <label className="block text-sm text-zinc-400 mb-2">目標讀者</label>
                            <input
                                type="text"
                                value={insight.target_audience || ''}
                            onChange={(e) => setInsight({ ...insight, target_audience: e.target.value })}
                                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-emerald-500 transition-colors"
                                placeholder="AI 新手、初學者、剛開始使用 ChatGPT/GPT 的使用者"
                            />
                        </div>

                        <div className="mb-4">
                            <label className="block text-sm text-zinc-400 mb-2">生活痛點</label>
                            <textarea
                                value={insight.pain_point || ''}
                                onChange={(e) => setInsight({ ...insight, pain_point: e.target.value })}
                                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-emerald-500 transition-colors resize-none"
                                rows={2}
                                placeholder="你覺得 AI 笨笨的，回答總是不達標嗎？"
                            />
                        </div>

                        <div className="mb-4">
                            <label className="block text-sm text-zinc-400 mb-2">應用場景</label>
                            <textarea
                                value={insight.scenario || ''}
                                onChange={(e) => setInsight({ ...insight, scenario: e.target.value })}
                                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-emerald-500 transition-colors resize-none"
                                rows={2}
                                placeholder="想像你要讓實習生幫你寫一份報告..."
                            />
                        </div>

                        <div className="mb-4">
                            <label className="block text-sm text-zinc-400 mb-2">AI 解決方案</label>
                            <textarea
                                value={insight.solution || ''}
                                onChange={(e) => setInsight({ ...insight, solution: e.target.value })}
                                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-emerald-500 transition-colors resize-none"
                                rows={2}
                                placeholder="把 AI 想像成第一天報到的實習生..."
                            />
                        </div>

                        <div className="mb-4">
                            <label className="block text-sm text-zinc-400 mb-2">錯誤範例 (不該怎麼做)</label>
                            <textarea
                                value={insight.example?.wrong || ''}
                                onChange={(e) => setInsight({
                                        ...insight,
                                        example: insight.example 
                                            ? { ...insight.example, wrong: e.target.value }
                                            : { wrong: e.target.value, right: '' }
                                })}
                                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-emerald-500 transition-colors resize-none"
                                rows={2}
                                placeholder="錯誤的指令範例，例如：幫我寫個報告"
                            />
                        </div>

                        <div className="mb-4">
                            <label className="block text-sm text-zinc-400 mb-2">正確範例 (應該怎麼做)</label>
                            <textarea
                                value={insight.example?.right || ''}
                                onChange={(e) => setInsight({
                                        ...insight,
                                        example: insight.example 
                                            ? { ...insight.example, right: e.target.value }
                                            : { wrong: '', right: e.target.value }
                                })}
                                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-emerald-500 transition-colors resize-none"
                                rows={2}
                                placeholder="正確的指令範例，包含背景、角色、目標"
                            />
                        </div>

                        <div className="mb-4">
                            <label className="block text-sm text-zinc-400 mb-2">常見問答 (FAQ)</label>
                            <div className="space-y-4">
                                {insight.faq?.map((item, index) => (
                                    <div key={index} className="bg-white/5 border border-white/10 rounded-lg p-4">
                                        <div className="flex justify-between items-center mb-2">
                                            <label className="text-xs text-zinc-400">問題 #{index + 1}</label>
                                            <button
                                                type="button"
                                                onClick={() => {
                                                    const newFaq = [...(insight.faq || [])];
                                                    newFaq.splice(index, 1);
                                                    setInsight({ ...insight, faq: newFaq });
                                                }}
                                                className="text-red-400 hover:text-red-300 text-sm"
                                            >
                                                刪除
                                            </button>
                                        </div>
                                        <input
                                            type="text"
                                            value={item.question}
                                            onChange={(e) => {
                                                const newFaq = [...(insight.faq || [])];
                                                newFaq[index].question = e.target.value;
                                                setInsight({ ...insight, faq: newFaq });
                                            }}
                                            className="w-full bg-transparent border-none text-white focus:outline-none mb-2"
                                            placeholder="問題..."
                                        />
                                        <textarea
                                            value={item.answer}
                                            onChange={(e) => {
                                                const newFaq = [...(insight.faq || [])];
                                                newFaq[index].answer = e.target.value;
                                                setInsight({ ...insight, faq: newFaq });
                                            }}
                                            className="w-full bg-transparent border-none text-zinc-300 focus:outline-none resize-none"
                                            rows={2}
                                            placeholder="答案..."
                                        />
                                    </div>
                                ))}
                                <button
                                    type="button"
                                    onClick={() => {
                                        const newFaq = [...(insight.faq || [])];
                                        newFaq.push({ question: '', answer: '' });
                                        setInsight({ ...insight, faq: newFaq });
                                    }}
                                    className="w-full bg-white/5 border border-dashed border-white/20 rounded-lg px-4 py-3 text-white hover:bg-white/10 transition-colors"
                                >
                                    + 新增 FAQ
                                </button>
                            </div>
                        </div>

                        <div className="mb-4">
                            <label className="block text-sm text-zinc-400 mb-2">語義標籤 (用逗碼分隔)</label>
                            <input
                                type="text"
                                value={insight.semantic_tags?.join(', ') || ''}
                                onChange={(e) => setInsight({ ...insight, semantic_tags: e.target.value.split(',').map(k => k.trim()).filter(k => k) })}
                                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-emerald-500 transition-colors"
                                placeholder="AI入門, 指令技巧, 溝通方法"
                            />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm text-zinc-400 mb-2">相關性評分 (0-100)</label>
                                <input
                                    type="number"
                                    min="0"
                                    max="100"
                                    value={insight.relevance_score || ''}
                                    onChange={(e) => setInsight({ ...insight, relevance_score: e.target.value ? parseInt(e.target.value) : null })}
                                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-emerald-500 transition-colors"
                                    placeholder="85"
                                />
                            </div>
                            <div>
                                <label className="block text-sm text-zinc-400 mb-2">熱度評分</label>
                                <input
                                    type="number"
                                    min="0"
                                    value={insight.popularity_score || ''}
                                    onChange={(e) => setInsight({ ...insight, popularity_score: e.target.value ? parseInt(e.target.value) : null })}
                                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-emerald-500 transition-colors"
                                    placeholder="75"
                                />
                            </div>
                        </div>
                    </div>

                    <div className="bg-[#111] border border-white/10 rounded-xl p-6">
                        <h3 className="font-bold mb-4">教學撰寫提示</h3>
                        <ul className="text-sm text-zinc-400 space-y-2">
                            <li>• 使用清晰的標題和段落</li>
                            <li>• 加入實際範例讓讀者更好理解</li>
                            <li>• 用粗體強調重點</li>
                            <li>• 條列式清單更容易閱讀</li>
                            <li>• 保持語言簡單易懂</li>
                            <li>• 完整填寫生活痛點、應用場景、AI 解決方案</li>
                            <li>• 提供錯誤範例和正確範例對比</li>
                            <li>• 添加常見問答 (FAQ) 提升文章實用性</li>
                        </ul>
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

export default InsightEditor;