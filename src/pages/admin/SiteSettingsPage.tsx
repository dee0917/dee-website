import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Save, RefreshCw } from 'lucide-react';
import { supabase, SiteSettings } from '../../lib/supabase';

const SiteSettingsPage = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [settings, setSettings] = useState<SiteSettings | null>(null);
    const [typewriterText, setTypewriterText] = useState('');

    useEffect(() => {
        checkAuth();
        fetchSettings();
    }, []);

    const checkAuth = async () => {
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) navigate('/admin/login');
    };

    const fetchSettings = async () => {
        const { data, error } = await supabase
            .from('site_settings')
            .select('*')
            .eq('id', 'main')
            .single();

        if (!error && data) {
            setSettings(data);
            setTypewriterText(data.hero_typewriter_texts?.join(', ') || '');
        }
        setLoading(false);
    };

    const handleSave = async () => {
        if (!settings) return;
        setSaving(true);

        const updatedSettings = {
            ...settings,
            hero_typewriter_texts: typewriterText.split(',').map(t => t.trim()).filter(t => t)
        };

        const { error } = await supabase
            .from('site_settings')
            .update(updatedSettings)
            .eq('id', 'main');

        if (error) {
            alert('儲存失敗：' + error.message);
        } else {
            alert('設定已儲存！');
            setSettings(updatedSettings);
        }
        setSaving(false);
    };

    if (loading) {
        return <div className="flex items-center justify-center h-64 text-white">載入中...</div>;
    }

    if (!settings) {
        return <div className="flex items-center justify-center h-64 text-white">無法載入設定</div>;
    }

    return (
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.2 }}>
            <div className="flex items-center justify-between mb-8">
                <h1 className="text-3xl font-bold">網站設定</h1>
                <button
                    onClick={handleSave}
                    disabled={saving}
                    className="bg-emerald-500 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-blue-600 disabled:opacity-50"
                >
                    {saving ? <RefreshCw size={16} className="animate-spin" /> : <Save size={16} />}
                    儲存設定
                </button>
            </div>

            <div className="space-y-8">
                {/* Hero 區塊設定 */}
                <section className="bg-[#111] border border-white/10 rounded-xl p-6">
                    <h2 className="text-xl font-bold mb-6 pb-4 border-b border-white/10">首頁主視覺</h2>

                    <div className="space-y-6">
                        <div>
                            <label className="block text-sm text-zinc-400 mb-2">頭銜標籤</label>
                            <input
                                type="text"
                                value={settings.hero_badge}
                                onChange={(e) => setSettings({ ...settings, hero_badge: e.target.value })}
                                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-emerald-500"
                                placeholder="例如：AI 學習引路人"
                            />
                            <p className="text-xs text-zinc-500 mt-1">顯示在主標題上方的小標籤</p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm text-zinc-400 mb-2">主標題第一行</label>
                                <input
                                    type="text"
                                    value={settings.hero_title_line1}
                                    onChange={(e) => setSettings({ ...settings, hero_title_line1: e.target.value })}
                                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-emerald-500"
                                />
                            </div>
                            <div>
                                <label className="block text-sm text-zinc-400 mb-2">主標題第二行</label>
                                <input
                                    type="text"
                                    value={settings.hero_title_line2}
                                    onChange={(e) => setSettings({ ...settings, hero_title_line2: e.target.value })}
                                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-emerald-500"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm text-zinc-400 mb-2">打字機效果文字</label>
                            <input
                                type="text"
                                value={typewriterText}
                                onChange={(e) => setTypewriterText(e.target.value)}
                                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-emerald-500"
                                placeholder="思考, 生活, 家人, 創意"
                            />
                            <p className="text-xs text-zinc-500 mt-1">用逗號分隔多個詞彙，會輪流顯示</p>
                        </div>

                        <div>
                            <label className="block text-sm text-zinc-400 mb-2">描述文字</label>
                            <textarea
                                value={settings.hero_description}
                                onChange={(e) => setSettings({ ...settings, hero_description: e.target.value })}
                                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-emerald-500 resize-none"
                                rows={3}
                            />
                        </div>
                    </div>
                </section>

                {/* 預覽 */}
                <section className="bg-[#111] border border-white/10 rounded-xl p-6">
                    <h2 className="text-xl font-bold mb-6 pb-4 border-b border-white/10">預覽</h2>
                    <div className="bg-[#0a0a0a] rounded-lg p-8">
                        <div className="inline-flex items-center gap-2 border border-emerald-500/30 bg-emerald-500/10 text-emerald-500 px-3 py-1 rounded text-xs mb-4 font-medium">
                            {settings.hero_badge}
                        </div>
                        <h3 className="text-3xl font-bold text-white mb-2">{settings.hero_title_line1}</h3>
                        <h3 className="text-3xl font-serif italic text-zinc-400 mb-4">
                            {settings.hero_title_line2} <span className="text-emerald-500">{typewriterText.split(',')[0]?.trim()}</span>
                        </h3>
                        <p className="text-zinc-400">{settings.hero_description}</p>
                    </div>
                </section>
            </div>
        </motion.div>
    );
};

export default SiteSettingsPage;