import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Database, RefreshCw, CheckCircle, AlertTriangle, Clock } from 'lucide-react';
import { supabase, Insight } from '../../lib/supabase';
import { INSIGHTS } from '../../data/mock';

interface SyncStatus {
    totalMock: number;
    totalDb: number;
    toInsert: number;
    toUpdate: number;
    upToDate: number;
}

const DataSyncManager = () => {
    const [loading, setLoading] = useState(true);
    const [syncing, setSyncing] = useState(false);
    const [syncProgress, setSyncProgress] = useState({ inserted: 0, updated: 0, total: 0 });
    const [status, setStatus] = useState<SyncStatus | null>(null);
    const [dbInsights, setDbInsights] = useState<Insight[]>([]);

    useEffect(() => {
        loadStatus();
    }, []);

    const loadStatus = async () => {
        setLoading(true);
        try {
            // 獲取數據庫現有文章
            const { data: dbData, error } = await supabase
                .from('insights')
                .select('id, title, updated_at')
                .order('id', { ascending: true });

            if (error) throw error;

            const dbInsightsPartial: Partial<Insight>[] = (dbData || []).map(item => ({
                id: item.id,
                title: item.title,
                summary: '',
                content: '',
                read_time: '',
                category: '',
                created_at: '',
                published_at: ''
            }));

            setDbInsights(dbInsightsPartial as Insight[]);

            const existingIds = new Set((dbData || []).map(i => i.id));

            // 分析同步狀態
            const toInsert: any[] = [];
            const toUpdate: any[] = [];
            const upToDate: any[] = [];

            for (const mockInsight of INSIGHTS) {
                if (!existingIds.has(mockInsight.id)) {
                    toInsert.push(mockInsight);
                } else {
                    upToDate.push(mockInsight);
                }
            }

            setStatus({
                totalMock: INSIGHTS.length,
                totalDb: existingIds.size,
                toInsert: toInsert.length,
                toUpdate: toUpdate.length,
                upToDate: upToDate.length,
            });
        } catch (error) {
            console.error('Error loading sync status:', error);
        }
        setLoading(false);
    };

    const parseDate = (dateStr: string) => {
        if (!dateStr) return null;
        const parts = dateStr.split('.');
        if (parts.length === 3) {
            return new Date(parseInt(parts[0]), parseInt(parts[1]) - 1, parseInt(parts[2])).toISOString();
        }
        return null;
    };

    const convertMockToDb = (mockInsight: any) => {
        return {
            id: mockInsight.id,
            category: mockInsight.category || '未分類',
            title: mockInsight.title,
            summary: mockInsight.summary || null,
            content: mockInsight.content || null,
            read_time: mockInsight.readTime || mockInsight.read_time || '5 分鐘',
            is_published: true,
            published_at: parseDate(mockInsight.date) || new Date().toISOString(),
            created_at: parseDate(mockInsight.date) || new Date().toISOString(),
            updated_at: new Date().toISOString(),

            // AEO 字段
            seo_title: mockInsight.seo_title || null,
            keywords: mockInsight.keywords || [],
            search_intent: mockInsight.search_intent || null,
            target_audience: mockInsight.target_audience || null,
            pain_point: mockInsight.pain_point || null,
            scenario: mockInsight.scenario || null,
            solution: mockInsight.solution || null,
            example: mockInsight.example || null,
            faq: mockInsight.faq || [],
            semantic_tags: (mockInsight as any).semantic_tags || [],
            relevance_score: (mockInsight as any).relevance_score || null,
            popularity_score: (mockInsight as any).popularity_score || null,
            last_analyzed_at: null,
        };
    };

    const handleSync = async () => {
        if (!status || (status.toInsert === 0 && status.toUpdate === 0)) {
            alert('沒有需要同步的文章');
            return;
        }

        if (!confirm(`確定要同步 ${status.toInsert} 篇新文章到數據庫嗎？`)) {
            return;
        }

        setSyncing(true);
        setSyncProgress({ inserted: 0, updated: 0, total: status.toInsert });

        try {
            const existingIds = new Set(dbInsights.map(i => i.id));

            // 準備要新增的文章
            const toInsertList = INSIGHTS.filter(
                mock => !existingIds.has(mock.id)
            ).map(convertMockToDb);

            // 執行批量插入
            for (const article of toInsertList) {
                const { error } = await supabase
                    .from('insights')
                    .insert([article]);

                if (error) {
                    console.error(`Insert failed for ID ${article.id}:`, error);
                } else {
                    setSyncProgress(prev => ({
                        ...prev,
                        inserted: prev.inserted + 1,
                    }));
                }
            }

            alert('同步完成！');
            await loadStatus();
        } catch (error) {
            console.error('Sync error:', error);
            alert('同步失敗：' + (error as Error).message);
        }

        setSyncing(false);
        setSyncProgress({ inserted: 0, updated: 0, total: 0 });
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center h-64">
                <div className="text-white">載入中...</div>
            </div>
        );
    }

    if (!status) {
        return (
            <div className="text-center py-20">
                <AlertTriangle size={48} className="text-red-400 mx-auto mb-4" />
                <p className="text-white mb-4">無法載入同步狀態</p>
                <button onClick={loadStatus} className="text-zinc-400 hover:text-white transition-colors">
                    重試
                </button>
            </div>
        );
    }

    const completionRate = Math.round((status.upToDate / status.totalMock) * 100);

    return (
        <div className="space-y-8">
            {/* 標題區域 */}
            <div className="flex items-center gap-4">
                <Link to="/admin" className="flex items-center gap-2 text-zinc-400 hover:text-white transition-colors">
                    <ArrowLeft size={18} />
                    返回儀表板
                </Link>
                <div className="h-6 w-px bg-white/10" />
                <div>
                    <h1 className="text-2xl font-bold text-white">數據同步管理</h1>
                    <p className="text-zinc-400 text-sm mt-1">將 Mock 數據同步到數據庫</p>
                </div>
            </div>

            {/* 統計卡片 */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div className="bg-[#111] border border-white/10 rounded-xl p-6">
                    <div className="flex items-center gap-3 mb-3">
                        <Database size={20} className="text-blue-400" />
                        <span className="text-zinc-400 text-sm">Mock 總數</span>
                    </div>
                    <div className="text-3xl font-bold text-white">{status.totalMock}</div>
                </div>

                <div className="bg-[#111] border border-white/10 rounded-xl p-6">
                    <div className="flex items-center gap-3 mb-3">
                        <CheckCircle size={20} className="text-emerald-400" />
                        <span className="text-zinc-400 text-sm">數據庫現有</span>
                    </div>
                    <div className="text-3xl font-bold text-emerald-400">{status.totalDb}</div>
                </div>

                <div className="bg-[#111] border border-white/10 rounded-xl p-6">
                    <div className="flex items-center gap-3 mb-3">
                        <Clock size={20} className="text-amber-400" />
                        <span className="text-zinc-400 text-sm">待同步</span>
                    </div>
                    <div className="text-3xl font-bold text-amber-400">{status.toInsert}</div>
                </div>

                <div className="bg-[#111] border border-white/10 rounded-xl p-6">
                    <div className="flex items-center gap-3 mb-3">
                        <RefreshCw size={20} className="text-violet-400" />
                        <span className="text-zinc-400 text-sm">同步率</span>
                    </div>
                    <div className="text-3xl font-bold text-violet-400">{completionRate}%</div>
                </div>
            </div>

            {/* 進度條 */}
            <div className="bg-[#111] border border-white/10 rounded-xl p-6">
                <div className="flex justify-between items-center mb-3">
                    <span className="text-white font-medium">同步進度</span>
                    <span className="text-zinc-400 text-sm">
                        {status.upToDate} / {status.totalMock} 篇
                    </span>
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

            {/* 同步中進度 */}
            {syncing && (
                <div className="bg-[#111] border border-white/10 rounded-xl p-6">
                    <div className="flex items-center justify-between mb-4">
                        <span className="text-white font-medium">同步中...</span>
                        <span className="text-zinc-400 text-sm">
                            {syncProgress.inserted} / {syncProgress.total}
                        </span>
                    </div>
                    <div className="w-full bg-white/10 rounded-full h-3">
                        <motion.div
                            animate={{ width: `${(syncProgress.inserted / syncProgress.total) * 100}%` }}
                            transition={{ duration: 0.3 }}
                            className="h-full rounded-full bg-blue-500"
                        />
                    </div>
                </div>
            )}

            {/* 操作按鈕 */}
            {status.toInsert > 0 && !syncing && (
                <div className="flex gap-4">
                    <button
                        onClick={handleSync}
                        disabled={syncing}
                        className="flex-1 bg-emerald-500 hover:bg-emerald-600 text-white py-4 rounded-xl font-medium text-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3"
                    >
                        <RefreshCw size={20} className={syncing ? 'animate-spin' : ''} />
                        開始同步 ({status.toInsert} 篇)
                    </button>
                    <button
                        onClick={loadStatus}
                        disabled={syncing}
                        className="px-6 py-4 bg-white/10 hover:bg-white/20 border border-white/10 rounded-xl font-medium text-lg transition-colors disabled:opacity-50"
                    >
                        刷新狀態
                    </button>
                </div>
            )}

            {/* 已完成狀態 */}
            {status.toInsert === 0 && !syncing && (
                <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-xl p-8 text-center">
                    <CheckCircle size={64} className="text-emerald-400 mx-auto mb-4" />
                    <h3 className="text-2xl font-bold text-white mb-3">
                        完美同步！所有文章已在數據庫中
                    </h3>
                    <p className="text-zinc-400 text-lg mb-6">
                        Mock 數據中的 {status.totalMock} 篇文章已全部同步到數據庫
                    </p>
                    <Link
                        to="/admin/insights"
                        className="inline-flex items-center gap-2 px-6 py-3 bg-emerald-500 hover:bg-emerald-600 text-white rounded-lg transition-colors"
                    >
                        查看免費教學
                    </Link>
                </div>
            )}

            {/* 待同步文章列表 */}
            {status.toInsert > 0 && !syncing && (
                <div className="bg-[#111] border border-amber-500/30 rounded-xl p-6">
                    <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                        <Clock size={20} className="text-amber-400" />
                        待同步文章列表
                    </h3>
                    <div className="space-y-3">
                        {INSIGHTS.filter(mock =>
                            !dbInsights.find(db => db.id === mock.id)
                        ).map(article => (
                            <div
                                key={article.id}
                                className="bg-white/5 border border-white/10 rounded-lg p-4 flex items-center justify-between"
                            >
                                <div className="flex-1">
                                    <div className="flex items-center gap-2 mb-1">
                                        <span className="text-xs text-amber-400 font-mono">ID:{article.id}</span>
                                        <span className="text-xs text-zinc-500 bg-white/5 px-2 py-1 rounded">
                                            {article.category}
                                        </span>
                                    </div>
                                    <h4 className="text-white font-medium">{article.title}</h4>
                                </div>
                                <span className="text-sm text-amber-400">待同步</span>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default DataSyncManager;
