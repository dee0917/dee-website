import React, { useState } from 'react';
import { Calculator } from 'lucide-react';

const ROICalculator = () => {
    const [hours, setHours] = useState(5);
    const [rate, setRate] = useState(500);
    const totalSaved = hours * rate * 52;

    return (
        <section className="py-20 px-6 max-w-4xl mx-auto">
            <div className="bg-[#111] border border-white/10 rounded-2xl p-8 md:p-12 relative overflow-hidden">
                <div className="absolute top-0 right-0 p-32 bg-emerald-500/10 rounded-full blur-3xl -mr-16 -mt-16"></div>

                <div className="relative z-10 flex flex-col md:flex-row gap-12 items-center">
                    <div className="flex-1">
                        <div className="flex items-center gap-2 mb-4 text-emerald-500">
                            <Calculator size={20} />
                            <span className="text-xs font-bold uppercase tracking-widest">時間價值計算機</span>
                        </div>
                        <h2 className="text-3xl font-bold text-white mb-4">如果你每週能省下...</h2>
                        <p className="text-zinc-400 mb-8">拖動滑桿，看看自動化能為你創造多少價值。</p>

                        <div className="space-y-6">
                            <div>
                                <div className="flex justify-between text-sm mb-2 text-zinc-300">
                                    <span>每週省下時數</span>
                                    <span className="font-mono text-emerald-500">{hours} 小時</span>
                                </div>
                                <input type="range" min="1" max="20" value={hours} onChange={(e) => setHours(Number(e.target.value))} className="w-full h-2 bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-emerald-500" />
                            </div>
                            <div>
                                <div className="flex justify-between text-sm mb-2 text-zinc-300">
                                    <span>你的時薪 (TWD)</span>
                                    <span className="font-mono text-emerald-500">${rate}</span>
                                </div>
                                <input type="range" min="100" max="2000" step="50" value={rate} onChange={(e) => setRate(Number(e.target.value))} className="w-full h-2 bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-emerald-500" />
                            </div>
                        </div>
                    </div>

                    <div className="flex-1 bg-white/5 rounded-xl p-8 text-center border border-white/5 backdrop-blur-sm w-full">
                        <p className="text-zinc-400 text-sm mb-2">每年潛在收益</p>
                        <div className="text-4xl md:text-5xl font-bold text-white font-serif mb-4">
                            NT$ {totalSaved.toLocaleString()}
                        </div>
                        <p className="text-xs text-zinc-500 mb-6">更別提你省下的心力與焦慮。</p>
                        <button className="bg-emerald-500 text-white px-6 py-2 rounded-full text-sm font-bold hover:bg-[#3367D6] transition-colors">
                            開始打造你的系統
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
};
export default ROICalculator;