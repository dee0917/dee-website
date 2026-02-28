import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
    FileText, Package, MessageSquare, Settings, Mail,
    Plus, Edit, Eye, Trash2, LogOut, Home, Save, X, Star,
    Download, UserX
} from 'lucide-react';
import { supabase, Insight, Solution, Testimonial, SiteSettings, Subscriber } from '../../lib/supabase';
import RichTextEditor from '../../components/admin/RichTextEditor';

type TabType = 'insights' | 'solutions' | 'testimonials' | 'subscribers' | 'settings';

const AdminDashboard = () => {
    const navigate = useNavigate();

    // 狀態宣告
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState<TabType>('insights');

    // 資料狀態
    const [insights, setInsights] = useState<Insight[]>([]);
    const [solutions, setSolutions] = useState<Solution[]>([]);
    const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
    const [subscribers, setSubscribers] = useState<Subscriber[]>([]);
    const [siteSettings, setSiteSettings] = useState<SiteSettings | null>(null);

    // 編輯狀態
    const [editingInsight, setEditingInsight] = useState<Partial<Insight> | null>(null);
    const [editingSolution, setEditingSolution] = useState<Partial<Solution> | null>(null);
    const [editingTestimonial, setEditingTestimonial] = useState<Partial<Testimonial> | null>(null);
    const [typewriterText, setTypewriterText] = useState('');
    const [saving, setSaving] = useState(false);

    useEffect(() => {
        checkUser();
        fetchAllData();
    }, []);

    const checkUser = async () => {
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) {
            navigate('/admin/login');
        }
        setLoading(false);
    };

    const fetchAllData = async () => {
        const [insightsRes, solutionsRes, testimonialsRes, subscribersRes, settingsRes] = await Promise.all([
            supabase.from('insights').select('*').order('created_at', { ascending: false }),
            supabase.from('solutions').select('*').order('sort_order'),
            supabase.from('testimonials').select('*').order('sort_order'),
            supabase.from('subscribers').select('*').order('subscribed_at', { ascending: false }),
            supabase.from('site_settings').select('*').eq('id', 'main').single()
        ]);

        if (insightsRes.data) setInsights(insightsRes.data);
        if (solutionsRes.data) setSolutions(solutionsRes.data);
        if (testimonialsRes.data) setTestimonials(testimonialsRes.data);
        if (subscribersRes.data) setSubscribers(subscribersRes.data);
        if (settingsRes.data) {
            setSiteSettings(settingsRes.data);
            setTypewriterText(settingsRes.data.hero_typewriter_texts?.join(', ') || '');
        }
    };

    const handleLogout = async () => {
        await supabase.auth.signOut();
        navigate('/admin/login');
    };

    // ===== 文章操作 =====
    const handleNewInsight = () => {
        setEditingInsight({
            category: '入門心法',
            title: '',
            summary: '',
            content: '',
            read_time: '5 分鐘',
            is_published: false
        });
    };

    const handleEditInsight = (insight: Insight) => {
        setEditingInsight(insight);
    };

    const handleSaveInsight = async (sendNotification: boolean = false) => {
        if (!editingInsight) return;
        setSaving(true);

        const isNew = !editingInsight.id;
        let error;
        let savedInsight: Insight | null = null;

        if (isNew) {
            const { error: e, data } = await supabase.from('insights').insert([editingInsight]).select().single();
            error = e;
            if (data) {
                savedInsight = data;
                setInsights([data, ...insights]);
            }
        } else {
            const { error: e } = await supabase.from('insights').update(editingInsight).eq('id', editingInsight.id);
            error = e;
            if (!e) {
                savedInsight = editingInsight as Insight;
                setInsights(insights.map(i => i.id === editingInsight.id ? { ...i, ...editingInsight } as Insight : i));
            }
        }

        if (error) {
            alert('儲存失敗：' + error.message);
        } else {
            // 如果選擇發送通知且文章已發布
            if (sendNotification && savedInsight && editingInsight.is_published) {
                try {
                    const { data: { session } } = await supabase.auth.getSession();
                    const response = await fetch(
                        `${import.meta.env.VITE_SUPABASE_URL || 'https://fnymjffskndfgcpcydsh.supabase.co'}/functions/v1/send-newsletter`,
                        {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json',
                                'Authorization': `Bearer ${session?.access_token}`
                            },
                            body: JSON.stringify({
                                type: 'new_insight',
                                insight_id: savedInsight.id
                            })
                        }
                    );
                    const result = await response.json();
                    if (result.success) {
                        alert(`文章已發布並通知 ${result.sent} 位訂閱者！`);
                    } else {
                        alert('文章已發布，但通知發送失敗：' + (result.error || '未知錯誤'));
                    }
                } catch (err) {
                    console.error('Notification error:', err);
                    alert('文章已發布，但通知發送失敗');
                }
            }
            setEditingInsight(null);
        }
        setSaving(false);
    };

    const handleDeleteInsight = async (id: number) => {
        if (!confirm('確定要刪除這篇文章嗎？')) return;
        const { error } = await supabase.from('insights').delete().eq('id', id);
        if (!error) setInsights(insights.filter(i => i.id !== id));
    };

    const handlePublishInsight = async (id: number, publish: boolean) => {
        const { error } = await supabase.from('insights').update({
            is_published: publish,
            published_at: publish ? new Date().toISOString() : null
        }).eq('id', id);
        if (!error) setInsights(insights.map(i => i.id === id ? { ...i, is_published: publish } : i));
    };

    // ===== 方案操作 =====
    const handleNewSolution = async () => {
        const { data, error } = await supabase.from('solutions').insert([{
            title: '新方案',
            type: '免費資源',
            description: '',
            detail: '',
            action_text: '了解詳情',
            sort_order: solutions.length + 1
        }]).select().single();
        if (!error && data) {
            setSolutions([...solutions, data]);
            setEditingSolution(data);
        }
    };

    const handleSaveSolution = async () => {
        if (!editingSolution?.id) return;
        setSaving(true);
        const { error } = await supabase.from('solutions').update(editingSolution).eq('id', editingSolution.id);
        if (error) alert('儲存失敗：' + error.message);
        else {
            setSolutions(solutions.map(s => s.id === editingSolution.id ? { ...s, ...editingSolution } as Solution : s));
            setEditingSolution(null);
        }
        setSaving(false);
    };

    const handleDeleteSolution = async (id: number) => {
        if (!confirm('確定要刪除此方案嗎？')) return;
        const { error } = await supabase.from('solutions').delete().eq('id', id);
        if (!error) setSolutions(solutions.filter(s => s.id !== id));
    };

    // ===== 回饋操作 =====
    const handleNewTestimonial = async () => {
        const { data, error } = await supabase.from('testimonials').insert([{
            name: '新學員',
            role: '職業・年齡',
            content: '',
            is_featured: true,
            sort_order: testimonials.length + 1
        }]).select().single();
        if (!error && data) {
            setTestimonials([...testimonials, data]);
            setEditingTestimonial(data);
        }
    };

    const handleSaveTestimonial = async () => {
        if (!editingTestimonial?.id) return;
        setSaving(true);
        const { error } = await supabase.from('testimonials').update(editingTestimonial).eq('id', editingTestimonial.id);
        if (error) alert('儲存失敗：' + error.message);
        else {
            setTestimonials(testimonials.map(t => t.id === editingTestimonial.id ? { ...t, ...editingTestimonial } as Testimonial : t));
            setEditingTestimonial(null);
        }
        setSaving(false);
    };

    const handleDeleteTestimonial = async (id: number) => {
        if (!confirm('確定要刪除此回饋嗎？')) return;
        const { error } = await supabase.from('testimonials').delete().eq('id', id);
        if (!error) setTestimonials(testimonials.filter(t => t.id !== id));
    };

    const handleToggleFeatured = async (id: number, current: boolean) => {
        const { error } = await supabase.from('testimonials').update({ is_featured: !current }).eq('id', id);
        if (!error) setTestimonials(testimonials.map(t => t.id === id ? { ...t, is_featured: !current } : t));
    };

    // ===== 設定操作 =====
    const handleSaveSettings = async () => {
        if (!siteSettings) return;
        setSaving(true);
        const updated = { ...siteSettings, hero_typewriter_texts: typewriterText.split(',').map(t => t.trim()).filter(t => t) };
        const { error } = await supabase.from('site_settings').update(updated).eq('id', 'main');
        if (error) alert('儲存失敗：' + error.message);
        else {
            setSiteSettings(updated);
            alert('設定已儲存！');
        }
        setSaving(false);
    };

    if (loading) {
        return <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center text-white">載入中...</div>;
    }

    // 訂閱者操作
    const handleUnsubscribe = async (id: number) => {
        if (!confirm('確定要取消此訂閱者嗎？')) return;
        const { error } = await supabase.from('subscribers').update({ status: 'unsubscribed', unsubscribed_at: new Date().toISOString() }).eq('id', id);
        if (!error) setSubscribers(subscribers.map(s => s.id === id ? { ...s, status: 'unsubscribed' as const } : s));
    };

    const handleDeleteSubscriber = async (id: number) => {
        if (!confirm('確定要刪除此訂閱者嗎？此操作無法復原。')) return;
        const { error } = await supabase.from('subscribers').delete().eq('id', id);
        if (!error) setSubscribers(subscribers.filter(s => s.id !== id));
    };

    const handleExportSubscribers = () => {
        const activeSubscribers = subscribers.filter(s => s.status === 'active');
        const csv = 'Email,訂閱日期\n' + activeSubscribers.map(s => `${s.email},${new Date(s.subscribed_at).toLocaleDateString()}`).join('\n');
        const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = `subscribers_${new Date().toISOString().split('T')[0]}.csv`;
        link.click();
    };

    const activeSubscribers = subscribers.filter(s => s.status === 'active');

    const tabs = [
        { id: 'insights' as TabType, label: '免費教學', icon: FileText, count: insights.length, color: 'emerald-500' },
        { id: 'solutions' as TabType, label: '學習方案', icon: Package, count: solutions.length, color: 'green-500' },
        { id: 'testimonials' as TabType, label: '學員回饋', icon: MessageSquare, count: testimonials.length, color: 'yellow-500' },
        { id: 'settings' as TabType, label: '網站設定', icon: Settings, count: 1, color: 'purple-500' }
    ];

    return (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-white">
            <main className="max-w-6xl mx-auto px-6 py-8">
                {/* 分類選項卡 */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                    {tabs.map(tab => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={`bg-[#111] border rounded-xl p-6 text-left transition-all ${activeTab === tab.id
                                ? 'border-emerald-500 bg-emerald-500/5'
                                : 'border-white/10 hover:border-white/20'
                                }`}
                        >
                            <div className="flex items-center justify-between mb-4">
                                <tab.icon className={activeTab === tab.id ? 'text-emerald-500' : 'text-zinc-400'} size={24} />
                                <span className="text-3xl font-bold text-white">{tab.count}</span>
                            </div>
                            <h3 className={activeTab === tab.id ? 'text-white font-medium' : 'text-zinc-400'}>{tab.label}</h3>
                        </button>
                    ))}
                </div>

                {/* 內容區域 */}
                <AnimatePresence mode="wait">
                    <motion.div
                        key={activeTab}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.2 }}
                    >
                        {/* 洞察文章 */}
                        {activeTab === 'insights' && (
                            <div className="bg-[#111] border border-white/10 rounded-xl p-6">
                                <div className="flex items-center justify-between mb-6">
                                    <h2 className="text-xl font-bold">洞察文章</h2>
                                    <button onClick={handleNewInsight} className="bg-emerald-500 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-blue-600">
                                        <Plus size={18} /> 新增文章
                                    </button>
                                </div>

                                {/* 編輯區域 */}
                                {editingInsight && (
                                    <div className="mb-6 p-6 bg-white/5 rounded-xl border border-emerald-500/30">
                                        <div className="flex items-center justify-between mb-6">
                                            <h3 className="font-bold text-lg">{editingInsight.id ? '編輯文章' : '新增文章'}</h3>
                                            <button onClick={() => setEditingInsight(null)} className="text-zinc-400 hover:text-white">
                                                <X size={20} />
                                            </button>
                                        </div>
                                        <div className="space-y-4">
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                <div>
                                                    <label className="block text-sm text-zinc-400 mb-1">標題</label>
                                                    <input
                                                        type="text"
                                                        value={editingInsight.title || ''}
                                                        onChange={(e) => setEditingInsight({ ...editingInsight, title: e.target.value })}
                                                        className="w-full bg-[#0a0a0a] border border-white/10 rounded-lg px-4 py-2 text-white"
                                                        placeholder="文章標題"
                                                    />
                                                </div>
                                                <div className="grid grid-cols-2 gap-4">
                                                    <div>
                                                        <label className="block text-sm text-zinc-400 mb-1">分類</label>
                                                        <select
                                                            value={editingInsight.category || ''}
                                                            onChange={(e) => setEditingInsight({ ...editingInsight, category: e.target.value })}
                                                            className="w-full bg-[#0a0a0a] border border-white/10 rounded-lg px-4 py-2 text-white"
                                                        >
                                                            <option value="入門心法">入門心法</option>
                                                            <option value="生活應用">生活應用</option>
                                                            <option value="工作效率">工作效率</option>
                                                            <option value="長輩友善">長輩友善</option>
                                                            <option value="進階技巧">進階技巧</option>
                                                        </select>
                                                    </div>
                                                    <div>
                                                        <label className="block text-sm text-zinc-400 mb-1">閱讀時間</label>
                                                        <input
                                                            type="text"
                                                            value={editingInsight.read_time || ''}
                                                            onChange={(e) => setEditingInsight({ ...editingInsight, read_time: e.target.value })}
                                                            className="w-full bg-[#0a0a0a] border border-white/10 rounded-lg px-4 py-2 text-white"
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                            <div>
                                                <label className="block text-sm text-zinc-400 mb-1">摘要</label>
                                                <textarea
                                                    value={editingInsight.summary || ''}
                                                    onChange={(e) => setEditingInsight({ ...editingInsight, summary: e.target.value })}
                                                    className="w-full bg-[#0a0a0a] border border-white/10 rounded-lg px-4 py-2 text-white resize-none"
                                                    rows={2}
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-sm text-zinc-400 mb-1">內容</label>
                                                <RichTextEditor
                                                    content={editingInsight.content || ''}
                                                    onChange={(html) => setEditingInsight({ ...editingInsight, content: html })}
                                                />
                                            </div>
                                            <div className="flex items-center justify-between pt-4 border-t border-white/10">
                                                <label className="flex items-center gap-2 cursor-pointer">
                                                    <input
                                                        type="checkbox"
                                                        checked={editingInsight.is_published || false}
                                                        onChange={(e) => setEditingInsight({ ...editingInsight, is_published: e.target.checked })}
                                                        className="w-4 h-4"
                                                    />
                                                    <span className="text-sm">立即發布</span>
                                                </label>
                                                <div className="flex gap-2">
                                                    <button onClick={() => setEditingInsight(null)} className="px-4 py-2 text-zinc-400 hover:text-white">取消</button>
                                                    <button onClick={() => handleSaveInsight(false)} disabled={saving} className="px-4 py-2 bg-zinc-700 rounded-lg flex items-center gap-2 hover:bg-zinc-600 disabled:opacity-50">
                                                        <Save size={16} /> 僅儲存
                                                    </button>
                                                    {editingInsight.is_published && activeSubscribers.length > 0 && (
                                                        <button onClick={() => handleSaveInsight(true)} disabled={saving} className="px-4 py-2 bg-emerald-500 rounded-lg flex items-center gap-2 hover:bg-blue-600 disabled:opacity-50">
                                                            <Mail size={16} /> 發布並通知 ({activeSubscribers.length})
                                                        </button>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {/* 文章列表 */}
                                <div className="space-y-3">
                                    {insights.map(insight => (
                                        <div key={insight.id} className="flex items-center justify-between p-4 bg-white/5 rounded-lg hover:bg-white/10 transition-colors">
                                            <div className="flex-1">
                                                <div className="flex items-center gap-2 mb-1">
                                                    <span className={`px-2 py-0.5 rounded text-xs ${insight.is_published ? 'bg-green-500/20 text-green-400' : 'bg-yellow-500/20 text-yellow-400'}`}>
                                                        {insight.is_published ? '已發布' : '草稿'}
                                                    </span>
                                                    <span className="text-xs text-zinc-500">{insight.category}</span>
                                                </div>
                                                <h3 className="text-white font-medium">{insight.title}</h3>
                                            </div>
                                            <div className="flex items-center gap-1">
                                                <button onClick={() => handleEditInsight(insight)} className="p-2 text-zinc-400 hover:text-white hover:bg-white/10 rounded">
                                                    <Edit size={16} />
                                                </button>
                                                {insight.is_published ? (
                                                    <Link to={`/insights/${insight.id}`} target="_blank" className="p-2 text-zinc-400 hover:text-white hover:bg-white/10 rounded">
                                                        <Eye size={16} />
                                                    </Link>
                                                ) : null}
                                                <button onClick={() => handleDeleteInsight(insight.id)} className="p-2 text-zinc-400 hover:text-red-400 hover:bg-red-500/10 rounded">
                                                    <Trash2 size={16} />
                                                </button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* 學習方案 */}
                        {activeTab === 'solutions' && (
                            <div className="bg-[#111] border border-white/10 rounded-xl p-6">
                                <div className="flex items-center justify-between mb-6">
                                    <h2 className="text-xl font-bold">學習方案</h2>
                                    <button onClick={handleNewSolution} className="bg-emerald-500 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-blue-600">
                                        <Plus size={18} /> 新增方案
                                    </button>
                                </div>

                                <div className="space-y-4">
                                    {solutions.map(solution => (
                                        <div key={solution.id} className="bg-white/5 rounded-xl overflow-hidden">
                                            {editingSolution?.id === solution.id ? (
                                                <div className="p-6 space-y-4">
                                                    <div className="grid grid-cols-2 gap-4">
                                                        <div>
                                                            <label className="block text-sm text-zinc-400 mb-1">標題</label>
                                                            <input type="text" value={editingSolution.title || ''} onChange={(e) => setEditingSolution({ ...editingSolution, title: e.target.value })} className="w-full bg-[#0a0a0a] border border-white/10 rounded-lg px-4 py-2 text-white" />
                                                        </div>
                                                        <div>
                                                            <label className="block text-sm text-zinc-400 mb-1">類型</label>
                                                            <select value={editingSolution.type || ''} onChange={(e) => setEditingSolution({ ...editingSolution, type: e.target.value })} className="w-full bg-[#0a0a0a] border border-white/10 rounded-lg px-4 py-2 text-white">
                                                                <option value="免費資源">免費資源</option>
                                                                <option value="線上課程">線上課程</option>
                                                                <option value="個人指導">個人指導</option>
                                                            </select>
                                                        </div>
                                                    </div>
                                                    <div>
                                                        <label className="block text-sm text-zinc-400 mb-1">簡短描述</label>
                                                        <textarea value={editingSolution.description || ''} onChange={(e) => setEditingSolution({ ...editingSolution, description: e.target.value })} className="w-full bg-[#0a0a0a] border border-white/10 rounded-lg px-4 py-2 text-white resize-none" rows={2} />
                                                    </div>
                                                    <div>
                                                        <label className="block text-sm text-zinc-400 mb-1">詳細內容</label>
                                                        <textarea value={editingSolution.detail || ''} onChange={(e) => setEditingSolution({ ...editingSolution, detail: e.target.value })} className="w-full bg-[#0a0a0a] border border-white/10 rounded-lg px-4 py-2 text-white resize-none" rows={3} />
                                                    </div>
                                                    <div className="flex justify-end gap-2 pt-4 border-t border-white/10">
                                                        <button onClick={() => setEditingSolution(null)} className="px-4 py-2 text-zinc-400 hover:text-white">取消</button>
                                                        <button onClick={handleSaveSolution} disabled={saving} className="px-4 py-2 bg-emerald-500 rounded-lg flex items-center gap-2 hover:bg-blue-600 disabled:opacity-50">
                                                            <Save size={16} /> 儲存
                                                        </button>
                                                    </div>
                                                </div>
                                            ) : (
                                                <div className="p-4 flex items-center justify-between">
                                                    <div>
                                                        <div className="flex items-center gap-2 mb-1">
                                                            <span className="px-2 py-0.5 rounded text-xs bg-white/10 text-zinc-300">{solution.type}</span>
                                                            {!solution.is_active && <span className="text-xs text-zinc-500">（已隱藏）</span>}
                                                        </div>
                                                        <h3 className="text-white font-medium">{solution.title}</h3>
                                                        <p className="text-zinc-500 text-sm mt-1">{solution.description}</p>
                                                    </div>
                                                    <div className="flex items-center gap-1">
                                                        <button onClick={() => setEditingSolution(solution)} className="p-2 text-zinc-400 hover:text-white hover:bg-white/10 rounded"><Edit size={16} /></button>
                                                        <button onClick={() => handleDeleteSolution(solution.id)} className="p-2 text-zinc-400 hover:text-red-400 hover:bg-red-500/10 rounded"><Trash2 size={16} /></button>
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* 學員回饋 */}
                        {activeTab === 'testimonials' && (
                            <div className="bg-[#111] border border-white/10 rounded-xl p-6">
                                <div className="flex items-center justify-between mb-6">
                                    <h2 className="text-xl font-bold">學員回饋</h2>
                                    <button onClick={handleNewTestimonial} className="bg-emerald-500 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-blue-600">
                                        <Plus size={18} /> 新增回饋
                                    </button>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {testimonials.map(testimonial => (
                                        <div key={testimonial.id} className="bg-white/5 rounded-xl p-4">
                                            {editingTestimonial?.id === testimonial.id ? (
                                                <div className="space-y-4">
                                                    <div className="grid grid-cols-2 gap-4">
                                                        <div>
                                                            <label className="block text-sm text-zinc-400 mb-1">姓名</label>
                                                            <input type="text" value={editingTestimonial.name || ''} onChange={(e) => setEditingTestimonial({ ...editingTestimonial, name: e.target.value })} className="w-full bg-[#0a0a0a] border border-white/10 rounded-lg px-4 py-2 text-white" />
                                                        </div>
                                                        <div>
                                                            <label className="block text-sm text-zinc-400 mb-1">職業・年齡</label>
                                                            <input type="text" value={editingTestimonial.role || ''} onChange={(e) => setEditingTestimonial({ ...editingTestimonial, role: e.target.value })} className="w-full bg-[#0a0a0a] border border-white/10 rounded-lg px-4 py-2 text-white" />
                                                        </div>
                                                    </div>
                                                    <div>
                                                        <label className="block text-sm text-zinc-400 mb-1">回饋內容</label>
                                                        <textarea value={editingTestimonial.content || ''} onChange={(e) => setEditingTestimonial({ ...editingTestimonial, content: e.target.value })} className="w-full bg-[#0a0a0a] border border-white/10 rounded-lg px-4 py-2 text-white resize-none" rows={3} />
                                                    </div>
                                                    <div className="flex justify-end gap-2">
                                                        <button onClick={() => setEditingTestimonial(null)} className="px-4 py-2 text-zinc-400 hover:text-white">取消</button>
                                                        <button onClick={handleSaveTestimonial} disabled={saving} className="px-4 py-2 bg-emerald-500 rounded-lg flex items-center gap-2 hover:bg-blue-600 disabled:opacity-50">
                                                            <Save size={16} /> 儲存
                                                        </button>
                                                    </div>
                                                </div>
                                            ) : (
                                                <>
                                                    <div className="flex items-start justify-between mb-3">
                                                        <div className="flex items-center gap-3">
                                                            <div className="w-10 h-10 rounded-full bg-zinc-800 flex items-center justify-center text-sm font-bold">{testimonial.name.charAt(0)}</div>
                                                            <div>
                                                                <div className="font-bold text-white">{testimonial.name}</div>
                                                                <div className="text-xs text-zinc-500">{testimonial.role}</div>
                                                            </div>
                                                        </div>
                                                        <button onClick={() => handleToggleFeatured(testimonial.id, testimonial.is_featured)} className={testimonial.is_featured ? 'text-yellow-400' : 'text-zinc-600'}>
                                                            <Star size={16} fill={testimonial.is_featured ? 'currentColor' : 'none'} />
                                                        </button>
                                                    </div>
                                                    <p className="text-zinc-300 text-sm mb-3">"{testimonial.content}"</p>
                                                    <div className="flex justify-end gap-1 pt-3 border-t border-white/10">
                                                        <button onClick={() => setEditingTestimonial(testimonial)} className="p-2 text-zinc-400 hover:text-white hover:bg-white/10 rounded"><Edit size={14} /></button>
                                                        <button onClick={() => handleDeleteTestimonial(testimonial.id)} className="p-2 text-zinc-400 hover:text-red-400 hover:bg-red-500/10 rounded"><Trash2 size={14} /></button>
                                                    </div>
                                                </>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* 訂閱者管理 */}
                        {activeTab === 'subscribers' && (
                            <div className="bg-[#111] border border-white/10 rounded-xl p-6">
                                <div className="flex items-center justify-between mb-6">
                                    <div>
                                        <h2 className="text-xl font-bold">訂閱者管理</h2>
                                        <p className="text-sm text-zinc-500 mt-1">
                                            共 {subscribers.length} 位訂閱者，其中 {activeSubscribers.length} 位活躍
                                        </p>
                                    </div>
                                    <button onClick={handleExportSubscribers} className="bg-emerald-500 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-blue-600">
                                        <Download size={18} /> 匯出 CSV
                                    </button>
                                </div>

                                <div className="overflow-x-auto">
                                    <table className="w-full">
                                        <thead>
                                            <tr className="border-b border-white/10">
                                                <th className="text-left py-3 px-4 text-sm text-zinc-400 font-medium">Email</th>
                                                <th className="text-left py-3 px-4 text-sm text-zinc-400 font-medium">狀態</th>
                                                <th className="text-left py-3 px-4 text-sm text-zinc-400 font-medium">來源</th>
                                                <th className="text-left py-3 px-4 text-sm text-zinc-400 font-medium">訂閱日期</th>
                                                <th className="text-right py-3 px-4 text-sm text-zinc-400 font-medium">操作</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {subscribers.map(subscriber => (
                                                <tr key={subscriber.id} className="border-b border-white/5 hover:bg-white/5">
                                                    <td className="py-3 px-4 text-white">{subscriber.email}</td>
                                                    <td className="py-3 px-4">
                                                        <span className={`px-2 py-0.5 rounded text-xs ${subscriber.status === 'active'
                                                            ? 'bg-green-500/20 text-green-400'
                                                            : 'bg-zinc-500/20 text-zinc-400'
                                                            }`}>
                                                            {subscriber.status === 'active' ? '活躍' : '已取消'}
                                                        </span>
                                                    </td>
                                                    <td className="py-3 px-4 text-zinc-400 text-sm">{subscriber.source}</td>
                                                    <td className="py-3 px-4 text-zinc-400 text-sm">
                                                        {new Date(subscriber.subscribed_at).toLocaleDateString('zh-TW')}
                                                    </td>
                                                    <td className="py-3 px-4 text-right">
                                                        <div className="flex items-center justify-end gap-1">
                                                            {subscriber.status === 'active' && (
                                                                <button
                                                                    onClick={() => handleUnsubscribe(subscriber.id)}
                                                                    className="p-2 text-zinc-400 hover:text-yellow-400 hover:bg-yellow-500/10 rounded"
                                                                    title="取消訂閱"
                                                                >
                                                                    <UserX size={16} />
                                                                </button>
                                                            )}
                                                            <button
                                                                onClick={() => handleDeleteSubscriber(subscriber.id)}
                                                                className="p-2 text-zinc-400 hover:text-red-400 hover:bg-red-500/10 rounded"
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
                                </div>

                                {subscribers.length === 0 && (
                                    <div className="text-center py-12 text-zinc-500">
                                        <Mail size={48} className="mx-auto mb-4 opacity-50" />
                                        <p>還沒有訂閱者</p>
                                        <p className="text-sm">訂閱者會顯示在這裡</p>
                                    </div>
                                )}
                            </div>
                        )}

                        {/* 網站設定 */}
                        {activeTab === 'settings' && siteSettings && (
                            <div className="bg-[#111] border border-white/10 rounded-xl p-6">
                                <div className="flex items-center justify-between mb-6">
                                    <h2 className="text-xl font-bold">網站設定</h2>
                                    <button onClick={handleSaveSettings} disabled={saving} className="bg-emerald-500 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-blue-600 disabled:opacity-50">
                                        <Save size={18} /> 儲存設定
                                    </button>
                                </div>

                                <div className="space-y-6">
                                    <div>
                                        <label className="block text-sm text-zinc-400 mb-2">頭銜標籤</label>
                                        <input type="text" value={siteSettings.hero_badge} onChange={(e) => setSiteSettings({ ...siteSettings, hero_badge: e.target.value })} className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white" />
                                    </div>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-sm text-zinc-400 mb-2">主標題第一行</label>
                                            <input type="text" value={siteSettings.hero_title_line1} onChange={(e) => setSiteSettings({ ...siteSettings, hero_title_line1: e.target.value })} className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white" />
                                        </div>
                                        <div>
                                            <label className="block text-sm text-zinc-400 mb-2">主標題第二行</label>
                                            <input type="text" value={siteSettings.hero_title_line2} onChange={(e) => setSiteSettings({ ...siteSettings, hero_title_line2: e.target.value })} className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white" />
                                        </div>
                                    </div>
                                    <div>
                                        <label className="block text-sm text-zinc-400 mb-2">打字機效果文字（逗號分隔）</label>
                                        <input type="text" value={typewriterText} onChange={(e) => setTypewriterText(e.target.value)} className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white" placeholder="思考, 生活, 家人, 創意" />
                                    </div>
                                    <div>
                                        <label className="block text-sm text-zinc-400 mb-2">描述文字</label>
                                        <textarea value={siteSettings.hero_description} onChange={(e) => setSiteSettings({ ...siteSettings, hero_description: e.target.value })} className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white resize-none" rows={3} />
                                    </div>

                                    {/* 預覽 */}
                                    <div className="mt-8 pt-6 border-t border-white/10">
                                        <h3 className="text-sm text-zinc-400 mb-4">預覽</h3>
                                        <div className="bg-[#0a0a0a] rounded-lg p-6">
                                            <div className="inline-flex items-center gap-2 border border-emerald-500/30 bg-emerald-500/10 text-emerald-500 px-3 py-1 rounded text-xs mb-3">{siteSettings.hero_badge}</div>
                                            <h3 className="text-2xl font-bold text-white mb-1">{siteSettings.hero_title_line1}</h3>
                                            <h3 className="text-2xl font-serif italic text-zinc-400 mb-3">{siteSettings.hero_title_line2} <span className="text-emerald-500">{typewriterText.split(',')[0]?.trim()}</span></h3>
                                            <p className="text-zinc-400 text-sm">{siteSettings.hero_description}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </motion.div>
                </AnimatePresence>
            </main>
        </motion.div>
    );
};

export default AdminDashboard;
