import React, { useState, useEffect } from 'react';
import { PERSONAS } from '../data/personas';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const Home: React.FC = () => {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-black text-white p-6 font-sans">
            <header className="py-12 text-center">
                <motion.h1 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-6xl font-black italic tracking-tighter mb-4"
                >
                    DEE'S AI LIFE LAB
                </motion.h1>
                <p className="text-zinc-500 font-medium text-lg uppercase tracking-widest">
                    AI 不是工具，是你的生活夥伴
                </p>
            </header>

            <main className="max-w-6xl mx-auto mt-12">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {Object.values(PERSONAS).map((persona) => (
                        <motion.button
                            key={persona.id}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={() => navigate(`/insights?persona=${persona.id}`)}
                            className={`p-10 rounded-[3rem] bg-zinc-900/50 border-2 border-white/5 hover:border-${persona.color}-500/50 text-left transition-all relative overflow-hidden group`}
                        >
                            <div className={`absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 transition-opacity`}>
                                <persona.icon size={120} />
                            </div>
                            
                            <div className="relative z-10">
                                <span className={`inline-block px-4 py-1 rounded-full bg-${persona.color}-500/10 text-${persona.color}-500 text-xs font-black uppercase mb-6 tracking-widest`}>
                                    {persona.quest_line}
                                </span>
                                <h3 className="text-3xl font-black mb-4">{persona.label}</h3>
                                <p className="text-zinc-400 text-lg leading-relaxed mb-8">
                                    {persona.description}
                                </p>
                                <div className="flex items-center gap-2 text-white font-bold group-hover:translate-x-2 transition-transform">
                                    開始修煉 <span className="text-xl">→</span>
                                </div>
                            </div>
                        </motion.button>
                    ))}
                </div>
            </main>
            
            <footer className="mt-32 border-t border-white/5 py-12 text-center opacity-30">
                <p className="font-mono text-[10px] tracking-[0.5em] uppercase">
                    Evolution Engine v1 // Report-to-Live Sync // Persona-First
                </p>
            </footer>
        </div>
    );
};

export default Home;
