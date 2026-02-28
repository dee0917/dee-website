import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Plus, Edit, Trash2, GripVertical, Save } from 'lucide-react';
import { supabase, Solution } from '../../lib/supabase';

const SolutionsList = () => {
    const navigate = useNavigate();
    const [solutions, setSolutions] = useState<Solution[]>([]);
    const [loading, setLoading] = useState(true);
    const [editingId, setEditingId] = useState<number | null>(null);
    const [editForm, setEditForm] = useState<Partial<Solution>>({});

    useEffect(() => {
        checkAuth();
        fetchSolutions();
        // 訂閱實時更新
        const solutionsSubscription = supabase
            .channel('solutions_changes')
            .on('postgres_changes', { event: '*', schema: 'public', table: 'solutions' }, (payload) => {
                console.log('Solution change:', payload);
                fetchSolutions();
            })
            .subscribe();

        return () => {
            supabase.removeChannel(solutionsSubscription);
        };
    }, []);

    const checkAuth = async () => {
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) navigate('/admin/login');
    };

    const fetchSolutions = async () => {
        const { data, error } = await supabase
            .from('solutions')
            .select('*')
            .order('sort_order', { ascending: true });

        if (!error && data) setSolutions(data);
        setLoading(false);
    };

    const handleEdit = (solution: Solution) => {
        setEditingId(solution.id);
        setEditForm(solution);
    };

    const handleSave = async () => {
        if (!editingId) return;

        const { error } = await supabase
            .from('solutions')
            .update(editForm)
            .eq('id', editingId);

        if (!error) {
            setSolutions(solutions.map(s => s.id === editingId ? { ...s, ...editForm } as Solution : s));
            setEditingId(null);
        } else {
            alert('儲存失敗：' + error.message);
        }
    };

    const handleAdd = async () => {
        const { data, error } = await supabase
            .from('solutions')
            .insert([{
                title: '新方案',
                type: '免費資源',
                description: '方案描述',
                detail: '詳細內容',
                action_text: '了解詳情',
                sort_order: solutions.length + 1
            }])
            .select()
            .single();

        if (!error && data) {
            setSolutions([...solutions, data]);
            handleEdit(data);
        }
    };

    const handleDelete = async (id: number) => {
        if (!confirm('確定要刪除此方案嗎？')) return;

        const { error } = await supabase.from('solutions').delete().eq('id', id);
        if (!error) {
            setSolutions(solutions.filter(s => s.id !== id));
        }
    };

    if (loading) {
        return <div className="flex items-center justify-center h-64 text-white">載入中...</div>;
    }

    return (
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.2 }}>
            <div className="flex items-center justify-between mb-8">
                <h1 className="text-3xl font-bold">學習方案管理</h1>
                <button onClick={handleAdd} className="bg-emerald-500 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-blue-600">
                    <Plus size={18} /> 新增方案
                </button>
            </div>

            <div className="space-y-4">
                {solutions.map(solution => (
                    <div key={solution.id} className="bg-[#111] border border-white/10 rounded-xl p-6">
                        {editingId === solution.id ? (
                            <div className="space-y-4">
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm text-zinc-400 mb-1">標題</label>
                                        <input
                                            type="text"
                                            value={editForm.title || ''}
                                            onChange={(e) => setEditForm({ ...editForm, title: e.target.value })}
                                            className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm text-zinc-400 mb-1">類型</label>
                                        <select
                                            value={editForm.type || ''}
                                            onChange={(e) => setEditForm({ ...editForm, type: e.target.value })}
                                            className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white"
                                        >
                                            <option value="免費資源">免費資源</option>
                                            <option value="線上課程">線上課程</option>
                                            <option value="個人指導">個人指導</option>
                                        </select>
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-sm text-zinc-400 mb-1">簡短描述</label>
                                    <textarea
                                        value={editForm.description || ''}
                                        onChange={(e) => setEditForm({ ...editForm, description: e.target.value })}
                                        className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white resize-none"
                                        rows={2}
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm text-zinc-400 mb-1">詳細內容</label>
                                    <textarea
                                        value={editForm.detail || ''}
                                        onChange={(e) => setEditForm({ ...editForm, detail: e.target.value })}
                                        className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white resize-none"
                                        rows={3}
                                    />
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm text-zinc-400 mb-1">按鈕文字</label>
                                        <input
                                            type="text"
                                            value={editForm.action_text || ''}
                                            onChange={(e) => setEditForm({ ...editForm, action_text: e.target.value })}
                                            className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm text-zinc-400 mb-1">連結網址</label>
                                        <input
                                            type="text"
                                            value={editForm.action_url || ''}
                                            onChange={(e) => setEditForm({ ...editForm, action_url: e.target.value })}
                                            className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white"
                                            placeholder="https://..."
                                        />
                                    </div>
                                </div>
                                <div className="flex items-center gap-4 pt-4">
                                    <label className="flex items-center gap-2 cursor-pointer">
                                        <input
                                            type="checkbox"
                                            checked={editForm.is_active}
                                            onChange={(e) => setEditForm({ ...editForm, is_active: e.target.checked })}
                                            className="w-4 h-4"
                                        />
                                        <span className="text-sm">顯示在網站上</span>
                                    </label>
                                </div>
                                <div className="flex justify-end gap-2 pt-4 border-t border-white/10">
                                    <button onClick={() => setEditingId(null)} className="px-4 py-2 text-zinc-400 hover:text-white">取消</button>
                                    <button onClick={handleSave} className="px-4 py-2 bg-emerald-500 rounded-lg flex items-center gap-2 hover:bg-blue-600">
                                        <Save size={16} /> 儲存
                                    </button>
                                </div>
                            </div>
                        ) : (
                            <div className="flex items-start justify-between">
                                <div className="flex items-start gap-4">
                                    <GripVertical className="text-zinc-600 mt-1 cursor-move" size={20} />
                                    <div>
                                        <div className="flex items-center gap-2 mb-1">
                                            <span className={`px-2 py-0.5 rounded text-xs ${solution.is_active ? 'bg-green-500/20 text-green-400' : 'bg-zinc-500/20 text-zinc-400'}`}>
                                                {solution.type}
                                            </span>
                                            {!solution.is_active && <span className="text-xs text-zinc-500">（已隱藏）</span>}
                                        </div>
                                        <h3 className="text-lg font-bold text-white">{solution.title}</h3>
                                        <p className="text-zinc-400 text-sm mt-1">{solution.description}</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-2">
                                    <button onClick={() => handleEdit(solution)} className="p-2 text-zinc-400 hover:text-white hover:bg-white/10 rounded">
                                        <Edit size={16} />
                                    </button>
                                    <button onClick={() => handleDelete(solution.id)} className="p-2 text-zinc-400 hover:text-red-400 hover:bg-red-500/10 rounded">
                                        <Trash2 size={16} />
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </motion.div>
    );
};

export default SolutionsList;