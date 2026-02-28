import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Copy, Check, Filter, X, Sparkles, BookOpen, Send, ChevronRight, Zap } from 'lucide-react';
import { TEMPLATES } from '../data/templates';

const TemplateLab = () => {
    const [search, setSearch] = useState('');
    const [activeCategory, setActiveCategory] = useState('全部');
    const [copiedId, setCopiedId] = useState<string | null>(null);
    const [selectedTemplate, setSelectedTemplate] = useState<any>(null);

    const categories = ['全部', ...new Set(TEMPLATES.map(t => t.category))];

    const filtered = TEMPLATES.filter(t => 
        (activeCategory === '全部' || t.category === activeCategory) &&
        (t.title.includes(search) || t.description.includes(search) || t.tags.some(tag => tag.includes(search)))
    );

    const handleCopy = (id: string, text: string) => {
        navigator.clipboard.writeText(text);
        setCopiedId(id);
        setTimeout(() => setCopiedId(null), 2000);
    };

    return (
        <div className="bg-[#0a0a0a] min-h-screen pt-24 pb-20 px-6 max-w-6xl mx-auto text-left">
            {/* Header */}
            <div className="mb-12">
                <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-xl bg-violet-500/20 border border-violet-500/30 flex items-center justify-center">
                        <Zap size={20} className="text-violet-400" />
                    </div>
                    <h1 className="text-3xl md:text-4xl font-black text-white">指令復刻實驗室</h1>
                </div>
                <p className="text-zinc-400 text-lg max-w-2xl">
                    不需要從零開始想指令。這裡有超過 50 個經過實測的「黃金指令範本」，<br />
                    <span className="text-violet-400 font-bold">複製、填空、直接用。</span>
                </p>
            </div>

            {/* Search & Filter */}
            <div className="flex flex-col md:flex-row gap-4 mb-10">
                <div className="relative flex-1">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500" size={18} />
                    <input 
                        type="text" 
                        placeholder="搜尋場景或關鍵字..." 
                        className="w-full bg-white/5 border border-white/10 rounded-xl py-4 pl-12 pr-4 text-white outline-none focus:border-violet-500/50 transition-all"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                </div>
                <div className="flex items-center gap-2 overflow-x-auto pb-2 no-scrollbar">
                    {categories.map(cat => (
                        <button 
                            key={cat}
                            onClick={() => setActiveCategory(cat)}
                            className={`px-5 py-3 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                                activeCategory === cat 
                                ? 'bg-violet-500 text-white shadow-lg shadow-violet-500/20' 
                                : 'bg-white/5 text-zinc-500 hover:text-white border border-white/5'
                            }`}
                        >
                            {cat}
                        </button>
                    ))}
                </div>
            </div>

            {/* Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filtered.map((t) => (
                    <motion.div 
                        key={t.id}
                        layout
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="group bg-zinc-900/50 border border-white/5 p-6 rounded-2xl hover:border-violet-500/30 transition-all flex flex-col h-full"
                    >
                        <div className="flex items-center justify-between mb-4">
                            <span className="text-[10px] font-black px-2 py-1 rounded bg-violet-500/10 text-violet-400 uppercase tracking-widest">
                                {t.category}
                            </span>
                            <div className="flex gap-1">
                                {t.tags.slice(0, 2).map(tag => (
                                    <span key={tag} className="text-[10px] text-zinc-600 font-bold">{tag}</span>
                                ))}
                            </div>
                        </div>
                        <h3 className="text-xl font-bold text-white mb-2 group-hover:text-violet-300 transition-colors">{t.title}</h3>
                        <p className="text-zinc-500 text-sm mb-6 line-clamp-2">{t.description}</p>
                        
                        <div className="mt-auto pt-4 flex items-center justify-between">
                            <button 
                                onClick={() => setSelectedTemplate(null)}
                                className="text-xs font-bold text-zinc-400 hover:text-white flex items-center gap-1 group-hover:gap-2 transition-all"
                            >
                                預覽指令 <ChevronRight size={14} />
                            </button>
                            <button 
                                onClick={() => handleCopy(t.id, t.prompt)}
                                className={`p-3 rounded-xl transition-all ${
                                    copiedId === t.id ? 'bg-emerald-500 text-black' : 'bg-white/5 text-zinc-400 hover:bg-violet-500 hover:text-white'
                                }`}
                            >
                                {copiedId === t.id ? <Check size={18} /> : <Copy size={18} />}
                            </button>
                        </div>
                    </motion.div>
                ))}
            </div>

            {/* Quick Edit Modal (Simplified Preview) */}
            <AnimatePresence>
                {selectedTemplate && (
                    <div className="fixed inset-0 z-[110] flex items-center justify-center px-6 bg-black/80 backdrop-blur-sm">
                        <motion.div 
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            className="bg-zinc-900 border border-white/10 p-8 rounded-3xl max-w-2xl w-full shadow-2xl relative"
                        >
                            <button 
                                onClick={() => setSelectedTemplate(null)}
                                className="absolute top-6 right-6 text-zinc-500 hover:text-white"
                            >
                                <X size={24} />
                            </button>
                            <h2 className="text-2xl font-black text-white mb-2">{selectedTemplate.title}</h2>
                            <p className="text-zinc-500 mb-8">{selectedTemplate.description}</p>
                            
                            <div className="bg-black/50 p-6 rounded-2xl border border-white/5 mb-8">
                                <pre className="text-violet-300 whitespace-pre-wrap font-mono text-sm leading-relaxed">
                                    {selectedTemplate.prompt.split(/(\[.*?\])/).map((part: string, i: number) => 
                                        part.startsWith('[') ? <span key={i} className="bg-violet-500/20 text-violet-400 px-1 rounded mx-0.5 border border-violet-500/30">{part}</span> : part
                                    )}
                                </pre>
                            </div>

                            <div className="flex gap-4">
                                <button 
                                    onClick={() => handleCopy('modal', selectedTemplate.prompt)}
                                    className="flex-1 bg-violet-500 text-white py-4 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-violet-400 transition-all shadow-lg shadow-violet-500/20"
                                >
                                    {copiedId === 'modal' ? <Check size={20} /> : <Copy size={20} />} 複製指令
                                </button>
                                <button className="flex-1 bg-white/5 text-white py-4 rounded-xl font-bold border border-white/10 hover:bg-white/10 transition-all">
                                    教學說明
                                </button>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default TemplateLab;
