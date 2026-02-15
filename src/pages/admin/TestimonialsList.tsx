import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Plus, Edit, Trash2, Save, Star } from 'lucide-react';
import { supabase, Testimonial } from '../../lib/supabase';

const TestimonialsList = () => {
    const navigate = useNavigate();
    const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
    const [loading, setLoading] = useState(true);
    const [editingId, setEditingId] = useState<number | null>(null);
    const [editForm, setEditForm] = useState<Partial<Testimonial>>({});

    useEffect(() => {
        checkAuth();
        fetchTestimonials();
        // 訂閱實時更新
        const testimonialsSubscription = supabase
            .channel('testimonials_changes')
            .on('postgres_changes', { event: '*', schema: 'public', table: 'testimonials' }, (payload) => {
                console.log('Testimonial change:', payload);
                fetchTestimonials();
            })
            .subscribe();

        return () => {
            supabase.removeChannel(testimonialsSubscription);
        };
    }, []);

    const checkAuth = async () => {
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) navigate('/admin/login');
    };

    const fetchTestimonials = async () => {
        const { data, error } = await supabase
            .from('testimonials')
            .select('*')
            .order('sort_order', { ascending: true });

        if (!error && data) setTestimonials(data);
        setLoading(false);
    };

    const handleEdit = (testimonial: Testimonial) => {
        setEditingId(testimonial.id);
        setEditForm(testimonial);
    };

    const handleSave = async () => {
        if (!editingId) return;

        const { error } = await supabase
            .from('testimonials')
            .update(editForm)
            .eq('id', editingId);

        if (!error) {
            setTestimonials(testimonials.map(t => t.id === editingId ? { ...t, ...editForm } as Testimonial : t));
            setEditingId(null);
        } else {
            alert('儲存失敗：' + error.message);
        }
    };

    const handleAdd = async () => {
        const { data, error } = await supabase
            .from('testimonials')
            .insert([{
                name: '新學員',
                role: '職業・年齡',
                content: '學員回饋內容...',
                is_featured: true,
                sort_order: testimonials.length + 1
            }])
            .select()
            .single();

        if (!error && data) {
            setTestimonials([...testimonials, data]);
            handleEdit(data);
        }
    };

    const handleDelete = async (id: number) => {
        if (!confirm('確定要刪除此回饋嗎？')) return;

        const { error } = await supabase.from('testimonials').delete().eq('id', id);
        if (!error) {
            setTestimonials(testimonials.filter(t => t.id !== id));
        }
    };

    const toggleFeatured = async (id: number, current: boolean) => {
        const { error } = await supabase
            .from('testimonials')
            .update({ is_featured: !current })
            .eq('id', id);

        if (!error) {
            setTestimonials(testimonials.map(t => t.id === id ? { ...t, is_feferred: !current } : t));
        }
    };

    if (loading) {
        return <div className="flex items-center justify-center h-64 text-white">載入中...</div>;
    }

    return (
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.2 }}>
            <div className="flex items-center justify-between mb-8">
                <h1 className="text-3xl font-bold">學員回饋管理</h1>
                <button onClick={handleAdd} className="bg-google-blue text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-blue-600">
                    <Plus size={18} /> 新增回饋
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {testimonials.map(testimonial => (
                    <div key={testimonial.id} className="bg-[#111] border border-white/10 rounded-xl p-6">
                        {editingId === testimonial.id ? (
                            <div className="space-y-4">
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm text-zinc-400 mb-1">姓名</label>
                                        <input
                                            type="text"
                                            value={editForm.name || ''}
                                            onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                                            className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm text-zinc-400 mb-1">職業・年齡</label>
                                        <input
                                            type="text"
                                            value={editForm.role || ''}
                                            onChange={(e) => setEditForm({ ...editForm, role: e.target.value })}
                                            className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white"
                                            placeholder="例如：工程師・35 歲"
                                        />
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-sm text-zinc-400 mb-1">回饋內容</label>
                                    <textarea
                                        value={editForm.content || ''}
                                        onChange={(e) => setEditForm({ ...editForm, content: e.target.value })}
                                        className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white resize-none"
                                        rows={4}
                                    />
                                </div>
                                <div className="flex justify-end gap-2 pt-4 border-t border-white/10">
                                    <button onClick={() => setEditingId(null)} className="px-4 py-2 text-zinc-400 hover:text-white">取消</button>
                                    <button onClick={handleSave} className="px-4 py-2 bg-google-blue rounded-lg flex items-center gap-2 hover:bg-blue-600">
                                        <Save size={16} /> 儲存
                                    </button>
                                </div>
                            </div>
                        ) : (
                            <>
                                <div className="flex items-start justify-between mb-4">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-full bg-zinc-800 flex items-center justify-center text-sm font-bold">
                                            {testimonial.name.charAt(0)}
                                        </div>
                                        <div>
                                            <div className="font-bold text-white">{testimonial.name}</div>
                                            <div className="text-xs text-zinc-500">{testimonial.role}</div>
                                        </div>
                                    </div>
                                    <button
                                        onClick={() => toggleFeatured(testimonial.id, testimonial.is_featured)}
                                        className={`p-2 rounded ${testimonial.is_featured ? 'text-yellow-400' : 'text-zinc-600 hover:text-zinc-400'}`}
                                        title={testimonial.is_featured ? '取消精選' : '設為精選'}
                                    >
                                        <Star size={16} fill={testimonial.is_featured ? 'currentColor' : 'none'} />
                                    </button>
                                </div>
                                <p className="text-zinc-300 text-sm leading-relaxed mb-4">"{testimonial.content}"</p>
                                <div className="flex items-center justify-end gap-2 pt-4 border-t border-white/10">
                                    <button onClick={() => handleEdit(testimonial)} className="p-2 text-zinc-400 hover:text-white hover:bg-white/10 rounded">
                                        <Edit size={16} />
                                    </button>
                                    <button onClick={() => handleDelete(testimonial.id)} className="p-2 text-zinc-400 hover:text-red-400 hover:bg-red-500/10 rounded">
                                        <Trash2 size={16} />
                                    </button>
                                </div>
                            </>
                        )}
                    </div>
                ))}
            </div>
        </motion.div>
    );
};

export default TestimonialsList;