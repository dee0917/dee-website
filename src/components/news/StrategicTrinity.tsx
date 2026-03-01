import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import { Shield, Zap, Users, Info } from 'lucide-react';
import { NewsArticle } from '../../types/news';

interface StrategicTrinityProps {
    articles: NewsArticle[];
    activeDimension: string | null;
    onDimensionClick: (dimension: string | null) => void;
}

export const StrategicTrinity: React.FC<StrategicTrinityProps> = ({ articles, activeDimension, onDimensionClick }) => {
    // 統計各維度的情報密度
    const stats = useMemo(() => {
        const counts = { "算力物權": 0, "生命具現": 0, "社會契約": 0 };
        articles.forEach(a => {
            if (a.trinity_dimension) counts[a.trinity_dimension]++;
        });
        return counts;
    }, [articles]);

    const dimensions = [
        { id: "算力物權", name: "算力物權", icon: Zap, color: "#10b981", sub: "Digital Resources", desc: "誰掌控了能源與隱私，誰就掌握生存權。" },
        { id: "生命具現", name: "生命具現", icon: Users, color: "#6366f1", sub: "Digital Presence", desc: "從工具變為物種，賦予 AI 靈魂與身體。" },
        { id: "社會契約", name: "社會契約", icon: Shield, color: "#f59e0b", sub: "Digital Contract", desc: "定義人類與 AI 的權力邊界與倫理秩序。" }
    ];

    return (
        <div className="mb-20">
            <div className="flex items-center gap-2 mb-8 opacity-50">
                <div className="w-10 h-px bg-zinc-800" />
                <span className="text-[10px] font-black uppercase tracking-[0.3em]">The Source Strategic Intelligence Dashboard</span>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                {/* 戰略三角視覺核心 */}
                <div className="lg:col-span-5 relative flex justify-center py-10">
                    <svg width="300" height="300" viewBox="0 0 100 100" className="drop-shadow-[0_0_20px_rgba(99,102,241,0.2)]">
                        {/* 背景三角形連線 */}
                        <motion.path 
                            d="M 50 10 L 90 80 L 10 80 Z" 
                            fill="none" 
                            stroke="rgba(255,255,255,0.05)" 
                            strokeWidth="0.5"
                        />
                        {/* 動態數據場 (Radar Area) */}
                        <motion.path 
                            initial={{ pathLength: 0, opacity: 0 }}
                            animate={{ pathLength: 1, opacity: 1 }}
                            d={`M 50 ${10 + (10 - stats["算力物權"]*2)} L ${90 - (10 - stats["生命具現"]*2)} ${80 - (10 - stats["生命具現"])} L ${10 + (10 - stats["社會契約"]*2)} ${80 - (10 - stats["社會契約"])} Z`}
                            fill="rgba(99,102,241,0.1)"
                            stroke="#6366f1"
                            strokeWidth="1"
                            className="drop-shadow-[0_0_8px_rgba(99,102,241,0.5)]"
                        />
                        {/* 頂點節點 */}
                        <circle cx="50" cy="10" r="2" fill="#10b981" />
                        <circle cx="90" cy="80" r="2" fill="#6366f1" />
                        <circle cx="10" cy="80" r="2" fill="#f59e0b" />
                    </svg>
                    
                    {/* 漂浮的小點 (代表情報點) */}
                    <div className="absolute inset-0 pointer-events-none">
                        {articles.slice(0, 5).map((_, i) => (
                            <motion.div
                                key={i}
                                animate={{ 
                                    y: [0, -10, 0],
                                    opacity: [0.2, 0.5, 0.2]
                                }}
                                transition={{ 
                                    duration: 3 + i, 
                                    repeat: Infinity,
                                    delay: i * 0.5
                                }}
                                className="absolute w-1 h-1 rounded-full bg-white/20"
                                style={{ 
                                    top: `${30 + i * 10}%`, 
                                    left: `${40 + (i % 3) * 15}%` 
                                }}
                            />
                        ))}
                    </div>
                </div>

                {/* 戰略指標說明區 */}
                <div className="lg:col-span-7 grid grid-cols-1 md:grid-cols-3 gap-4">
                    {dimensions.map((dim) => {
                        const Icon = dim.icon;
                        const isSelected = activeDimension === dim.id;
                        return (
                            <button
                                key={dim.id}
                                onClick={() => onDimensionClick(isSelected ? null : dim.id)}
                                className={`p-6 rounded-[2rem] border transition-all text-left relative overflow-hidden group ${
                                    isSelected 
                                    ? 'bg-zinc-900 border-indigo-500/50 shadow-2xl scale-[1.02]' 
                                    : 'bg-white/[0.02] border-white/5 hover:border-white/10'
                                }`}
                            >
                                <div className={`mb-4 w-10 h-10 rounded-xl flex items-center justify-center ${
                                    isSelected ? 'bg-indigo-500 text-black' : 'bg-white/5 text-zinc-500'
                                } group-hover:scale-110 transition-transform`}>
                                    <Icon size={20} />
                                </div>
                                <h3 className="text-white font-black text-sm mb-1 uppercase tracking-wider">{dim.name}</h3>
                                <p className="text-zinc-600 text-[9px] font-mono mb-3 uppercase tracking-widest">{dim.sub}</p>
                                <p className="text-zinc-500 text-xs leading-relaxed line-clamp-2 group-hover:text-zinc-300 transition-colors">{dim.desc}</p>
                                
                                {/* 密度顯示 */}
                                <div className="mt-4 flex items-center gap-2">
                                    <div className="flex-1 h-1 bg-white/5 rounded-full overflow-hidden">
                                        <motion.div 
                                            initial={{ width: 0 }}
                                            animate={{ width: `${(stats[dim.id as keyof typeof stats] / articles.length) * 100}%` }}
                                            className="h-full bg-indigo-500/50"
                                        />
                                    </div>
                                    <span className="text-[10px] font-mono text-zinc-600">{stats[dim.id as keyof typeof stats]}</span>
                                </div>
                            </button>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};
