import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Mail, Download, UserX, Trash2 } from 'lucide-react';
import { supabase, Subscriber } from '../../lib/supabase';

const SubscribersList = () => {
    const navigate = useNavigate();
    const [subscribers, setSubscribers] = useState<Subscriber[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        checkAuth();
        fetchSubscribers();
        // 訂閱實時更新
        const subscribersSubscription = supabase
            .channel('subscribers_changes')
            .on('postgres_changes', { event: '*', schema: 'public', table: 'subscribers' }, (payload) => {
                console.log('Subscriber change:', payload);
                fetchSubscribers();
            })
            .subscribe();

        return () => {
            supabase.removeChannel(subscribersSubscription);
        };
    }, []);

    const checkAuth = async () => {
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) navigate('/admin/login');
    };

    const fetchSubscribers = async () => {
        const { data, error } = await supabase
            .from('subscribers')
            .select('*')
            .order('subscribed_at', { ascending: false });

        if (!error && data) setSubscribers(data);
        setLoading(false);
    };

    const handleUnsubscribe = async (id: number) => {
        if (!confirm('確定要取消此訂閱者嗎？')) return;
        const { error } = await supabase
            .from('subscribers')
            .update({ status: 'unsubscribed', unsubscribed_at: new Date().toISOString() })
            .eq('id', id);
        if (!error) {
            setSubscribers(subscribers.map(s => s.id === id ? { ...s, status: 'unsubscribed' as const } : s));
        }
    };

    const handleDelete = async (id: number) => {
        if (!confirm('確定要刪除此訂閱者嗎？此操作無法復原。')) return;
        const { error } = await supabase.from('subscribers').delete().eq('id', id);
        if (!error) {
            setSubscribers(subscribers.filter(s => s.id !== id));
        }
    };

    const handleExport = () => {
        const activeSubscribers = subscribers.filter(s => s.status === 'active');
        const csv = 'Email,訂閱日期\n' + activeSubscribers.map(s => `${s.email},${new Date(s.subscribed_at).toLocaleDateString('zh-TW')}`).join('\n');
        const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = `subscribers_${new Date().toISOString().split('T')[0]}.csv`;
        link.click();
    };

    if (loading) {
        return <div className="flex items-center justify-center h-64 text-white">載入中...</div>;
    }

    const activeSubscribers = subscribers.filter(s => s.status === 'active');

    return (
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.2 }}>
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h1 className="text-3xl font-bold">訂閱者管理</h1>
                    <p className="text-sm text-zinc-500 mt-1">
                        共 {subscribers.length} 位訂閱者，其中 {activeSubscribers.length} 位活躍
                    </p>
                </div>
                <button onClick={handleExport} className="bg-emerald-500 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-blue-600">
                    <Download size={18} /> 匯出 CSV
                </button>
            </div>

            <div className="bg-[#111] border border-white/10 rounded-xl overflow-hidden">
                <table className="w-full">
                    <thead>
                        <tr className="border-b border-white/10">
                            <th className="text-left px-6 py-4 text-sm font-medium text-zinc-400">Email</th>
                            <th className="text-left px-6 py-4 text-sm font-medium text-zinc-400">狀態</th>
                            <th className="text-left px-6 py-4 text-sm font-medium text-zinc-400">來源</th>
                            <th className="text-left px-6 py-4 text-sm font-medium text-zinc-400">訂閱日期</th>
                            <th className="text-right px-6 py-4 text-sm font-medium text-zinc-400">操作</th>
                        </tr>
                    </thead>
                    <tbody>
                        {subscribers.map(subscriber => (
                            <tr key={subscriber.id} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                                <td className="px-6 py-4 text-white">{subscriber.email}</td>
                                <td className="px-6 py-4">
                                    <span className={`px-2 py-1 rounded text-xs ${subscriber.status === 'active'
                                            ? 'bg-green-500/20 text-green-400'
                                            : 'bg-zinc-500/20 text-zinc-400'
                                        }`}>
                                        {subscriber.status === 'active' ? '活躍' : '已取消'}
                                    </span>
                                </td>
                                <td className="px-6 py-4 text-zinc-400 text-sm">{subscriber.source}</td>
                                <td className="px-6 py-4 text-zinc-400 text-sm">
                                    {new Date(subscriber.subscribed_at).toLocaleDateString('zh-TW')}
                                </td>
                                <td className="px-6 py-4 text-right">
                                    <div className="flex items-center justify-end gap-1">
                                        {subscriber.status === 'active' && (
                                            <button
                                                onClick={() => handleUnsubscribe(subscriber.id)}
                                                className="p-2 text-zinc-400 hover:text-yellow-400 hover:bg-yellow-500/10 rounded transition-colors"
                                                title="取消訂閱"
                                            >
                                                <UserX size={16} />
                                            </button>
                                        )}
                                        <button
                                            onClick={() => handleDelete(subscriber.id)}
                                            className="p-2 text-zinc-400 hover:text-red-400 hover:bg-red-500/10 rounded transition-colors"
                                            title="刪除"
                                        >
                                            <Trash2 size={16} />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                {subscribers.length === 0 && (
                    <div className="text-center py-12 text-zinc-500">
                        <Mail size={48} className="mx-auto mb-4 opacity-50" />
                        <p>還沒有訂閱者</p>
                        <p className="text-sm">訂閱者會顯示在這裡</p>
                    </div>
                )}
            </div>
        </motion.div>
    );
};

export default SubscribersList;