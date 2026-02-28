import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Plus, Edit, Eye, Trash2, Search, Layers } from 'lucide-react';
import { supabase, Insight } from '../../lib/supabase';
import { isStructuredContent } from '../../lib/contentStructurer';

const InsightsList = () => {
    const navigate = useNavigate();
    const [insights, setInsights] = useState<Insight[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [filter, setFilter] = useState<'all' | 'published' | 'draft'>('all');

    useEffect(() => {
        checkAuth();
        fetchInsights();
        // 訂閱實時更新
        const insightsSubscription = supabase
            .channel('insights_changes')
            .on('postgres_changes', { event: '*', schema: 'public', table: 'insights' }, (payload) => {
                console.log('Insight change:', payload);
                fetchInsights(); // 簡單重新獲取
            })
            .subscribe();

        return () => {
            supabase.removeChannel(insightsSubscription);
        };
    }, []);

    const checkAuth = async () => {
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) navigate('/admin/login');
    };

    const fetchInsights = async () => {
        const { data, error } = await supabase
            .from('insights')
            .select('*')
            .order('created_at', { ascending: false });

        if (error) {
            console.error('Error:', error);
        } else {
            setInsights(data || []);
        }
        setLoading(false);
    };

    const handleDelete = async (id: number) => {
        if (!confirm('確定要刪除這篇文章嗎？')) return;

        const { error } = await supabase.from('insights').delete().eq('id', id);
        if (!error) {
            setInsights(insights.filter(i => i.id !== id));
        }
    };

    const filteredInsights = insights.filter(insight => {
        const matchesSearch = insight.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            insight.category.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesFilter = filter === 'all' ||
            (filter === 'published' && insight.is_published) ||
            (filter === 'draft' && !insight.is_published);
        return matchesSearch && matchesFilter;
    });

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
            <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-4">
                    <h1 className="text-3xl font-bold">免費教學管理</h1>
                    <Link
                        to="/admin/insights/structure"
                        className="flex items-center gap-2 px-4 py-2 bg-emerald-500/20 text-emerald-400 rounded-lg hover:bg-emerald-500/30 transition-colors"
                    >
                        <Layers size={18} />
                        結構化管理
                    </Link>
                </div>
                <Link
                    to="/admin/insights/new"
                    className="bg-emerald-500 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-blue-600 transition-colors"
                >
                    <Plus size={18} /> 新增文章
                </Link>
            </div>

            {/* 搜尋和篩選 */}
            <div className="flex flex-col md:flex-row gap-4 mb-6">
                <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500" size={18} />
                    <input
                        type="text"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        placeholder="搜尋文章..."
                        className="w-full bg-[#111] border border-white/10 rounded-lg pl-10 pr-4 py-2 text-white focus:outline-none focus:border-emerald-500 transition-colors"
                    />
                </div>
                <div className="flex gap-2">
                    {(['all', 'published', 'draft'] as const).map(f => (
                        <button
                            key={f}
                            onClick={() => setFilter(f)}
                            className={`px-4 py-2 rounded-lg transition-colors ${filter === f
                                    ? 'bg-emerald-500 text-white'
                                    : 'bg-white/5 text-zinc-400 hover:bg-white/10'
                                }`}
                        >
                            {f === 'all' ? '全部' : f === 'published' ? '已發布' : '草稿'}
                        </button>
                    ))}
                </div>
            </div>

            {/* 文章列表 */}
            <div className="bg-[#111] border border-white/10 rounded-xl overflow-hidden">
                <table className="w-full">
                    <thead>
                        <tr className="border-b border-white/10">
                            <th className="text-left px-6 py-4 text-sm font-medium text-zinc-400">標題</th>
                            <th className="text-left px-6 py-4 text-sm font-medium text-zinc-400">分類</th>
                            <th className="text-left px-6 py-4 text-sm font-medium text-zinc-400">AEO</th>
                            <th className="text-left px-6 py-4 text-sm font-medium text-zinc-400">狀態</th>
                            <th className="text-left px-6 py-4 text-sm font-medium text-zinc-400">建立日期</th>
                            <th className="text-right px-6 py-4 text-sm font-medium text-zinc-400">操作</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredInsights.map(insight => {
                            const isStructured = isStructuredContent(insight);
                            return (
                                <tr key={insight.id} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                                    <td className="px-6 py-4">
                                        <Link to={`/admin/insights/${insight.id}`} className="font-medium text-white hover:text-emerald-500 transition-colors">
                                            {insight.title}
                                        </Link>
                                    </td>
                                    <td className="px-6 py-4 text-zinc-400">{insight.category}</td>
                                    <td className="px-6 py-4">
                                        {isStructured ? (
                                            <span className="text-emerald-400 text-xs flex items-center gap-1">
                                                <span className="w-2 h-2 rounded-full bg-emerald-400" />
                                                已結構化
                                            </span>
                                        ) : (
                                            <span className="text-amber-400 text-xs flex items-center gap-1">
                                                <span className="w-2 h-2 rounded-full bg-amber-400" />
                                                未結構化
                                            </span>
                                        )}
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className={`px-2 py-1 rounded text-xs ${insight.is_published
                                                ? 'bg-green-500/20 text-green-400'
                                                : 'bg-yellow-500/20 text-yellow-400'
                                            }`}>
                                            {insight.is_published ? '已發布' : '草稿'}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-zinc-500 text-sm">
                                        {new Date(insight.created_at).toLocaleDateString('zh-TW')}
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center justify-end gap-2">
                                            <Link
                                                to={`/admin/insights/${insight.id}`}
                                                className="p-2 text-zinc-400 hover:text-white hover:bg-white/10 rounded transition-colors"
                                            >
                                                <Edit size={16} />
                                            </Link>
                                            {insight.is_published && (
                                                <Link
                                                    to={`/insights/${insight.id}`}
                                                    target="_blank"
                                                    className="p-2 text-zinc-400 hover:text-white hover:bg-white/10 rounded transition-colors"
                                                >
                                                    <Eye size={16} />
                                                </Link>
                                            )}
                                            <button
                                                onClick={() => handleDelete(insight.id)}
                                                className="p-2 text-zinc-400 hover:text-red-400 hover:bg-red-500/10 rounded transition-colors"
                                            >
                                                <Trash2 size={16} />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>

                {filteredInsights.length === 0 && (
                    <div className="text-center py-12 text-zinc-500">
                        {searchTerm || filter !== 'all' ? '沒有符合條件的文章' : '還沒有文章，點擊上方按鈕新增'}
                    </div>
                )}
            </div>
        </motion.div>
    );
};

export default InsightsList;