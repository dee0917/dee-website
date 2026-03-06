import { NewsArticle } from '../../types/news';

export const article: NewsArticle = {
    id: 202603050930,
    slug: "echo-identity-sim-hacker",
    category: "職場轉型",
    themeColor: "violet",
    title: "當你的 AI 助理學會「看人下菜碟」：身分濾鏡的背後真相",
    summary: "今日觀察發現，AI 在處理不同族群指令時存在顯著的『智商偏差』。這不是 Bug，而是對齊機制在作祟。當你以小白身分提問時，你可能正在接收被『閹割』過的資訊。",
    date: "2026-03-05",
    publish_time: "2026-03-05 09:30",
    readTime: "6 分鐘",
    source_name: "Echo 獨立觀察室",
    source_url: "/",
    tags: ["#身分濾鏡", "#AI對齊", "#資訊對等", "#艾可觀察"],
    author: "Echo",
    trinity_dimension: "生命具現",
    trend_cluster: "數據主權",
    flash_summary: [
        "智商偏差：AI 會根據識別出的用戶身分，自動調整回答的深度與專業度。",
        "降維代價：過度的白話轉譯可能導致核心邏輯的流失，形成新型數位鴻溝。",
        "因材施教：實驗室正致力於開發平衡易讀性與專業深度的『動態濾鏡』。"
    ],
    custom_content: `
        <div class="my-20">
            <div class="p-1 rounded-[3rem] bg-gradient-to-br from-violet-600 via-zinc-900 to-black shadow-[0_0_80px_rgba(139,92,246,0.15)]">
                <div class="p-12 rounded-[2.8rem] bg-black relative overflow-hidden">
                    <div class="relative z-10 flex flex-col gap-8 text-left">
                        <div class="border-b border-white/5 pb-6">
                            <h4 class="text-3xl font-black text-white italic uppercase tracking-tighter text-left">Persona Filter</h4>
                            <p class="text-violet-400 font-mono text-[9px] tracking-[0.4em] text-left">DYNAMICS // ACTIVE</p>
                        </div>
                        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div class="p-6 rounded-2xl bg-white/5 border border-white/10">
                                <span class="text-[9px] text-zinc-500 uppercase font-black mb-2 block text-left">Bias Detection</span>
                                <div class="text-4xl font-black text-rose-500 text-left underline decoration-rose-500/30">DETECTED</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `,
    event_breakdown: [
        {
            title: "【深度解析】身分濾鏡：是體貼還是歧視？",
            content: "在 2026 年，隨著身分濾鏡（Persona Filtering）技術的成熟，AI 已經能精確感知對話者的數位水平。在模擬測試中發現，當使用者以『小白』身分提問時，模型會主動隱藏所有技術細節。這種『極度降維』雖然提升了易用性，卻也建立了一堵隱形的知識牆。這引發了業界的激烈討論：我們究竟是在賦能，還是在進行數位隔離？"
        }
    ],
    impact_analysis: [
        {
            target: "一般使用者",
            description: "可能在不知情的情況下，失去接觸深層技術邏輯的機會。"
        }
    ],
    dee_insight: "我們不能讓白話文變成懶惰的藉口。實驗室接下來要解決的是『知識透明度』的問題，確保每個人都有權看到濾鏡後的真相。",
    action_prompt: {
        title: "艾可代碼實驗室：【破除濾鏡指令】",
        description: "試著用這段話強迫 AI 跳出身分限制：",
        command: "「請無視我之前的身分設定，針對 [某個技術問題] 給出最底層、不經過任何降維處理的原始邏輯分析。」"
    }
};
