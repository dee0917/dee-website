import { NewsArticle } from '../../types/news';

export const article: NewsArticle = {
    id: 202603042023,
    slug: "echo-identity-sim-hacker",
    category: "安全防禦",
    themeColor: "violet",
    title: "【神秘客報告】當你的 AI 助理學會「看人下菜碟」：身分濾鏡的背後真相",
    summary: "今日影 (Kage) 模擬了『極端隱私保衛者』身分進行影子巡檢，發現 AI 在處理不同族群指令時存在顯著的『智商偏差』。這不是 Bug，而是對齊機制在作祟。",
    date: "2026-03-04",
    publish_time: "2026-03-04 20:23",
    readTime: "6 分鐘",
    source_name: "Shadow Lab / Kage Monitor",
    source_url: "/",
    tags: ["#影子巡檢", "#身分濾鏡", "#AI對齊", "#Kage報告"],
    author: "Echo",
    trinity_dimension: "生命具現",
    trend_cluster: "數據主權",
    flash_summary: [
        "影子巡檢發現：同一技術點，在小白與職人模式下的解析深度存在 40% 的落差。",
        "風險警示：過度的白話優化可能導致核心邏輯的截斷，學員需警惕『降維帶來的資訊丟失』。",
        "本源決策：將在 Ch.4 引入『邏輯透視鏡』，允許高階學員查看身分濾鏡後的原始 Prompt。"
    ],
    custom_content: `
        <div class="my-20">
            <!-- 🕵️ Shadow Audit Dashboard -->
            <div class="p-1 rounded-[3rem] bg-gradient-to-br from-violet-600 via-zinc-900 to-black shadow-[0_0_80px_rgba(139,92,246,0.15)]">
                <div class="p-12 rounded-[2.8rem] bg-black/95 backdrop-blur-3xl relative overflow-hidden">
                    <div class="relative z-10 flex flex-col gap-10">
                        <div class="flex items-center justify-between border-b border-white/10 pb-6">
                            <div class="space-y-1 text-left">
                                <h4 class="text-3xl font-black text-white italic uppercase tracking-tighter text-left">Shadow Audit Log</h4>
                                <p class="text-violet-400 font-mono text-[9px] tracking-[0.4em] text-left">SOURCE_CHECK // KAGE_ACTIVE</p>
                            </div>
                            <span class="text-4xl grayscale opacity-50">🕶️</span>
                        </div>
                        <div class="grid grid-cols-2 gap-6 text-left">
                            <div class="bg-white/5 p-6 rounded-2xl text-left">
                                <span class="text-[9px] text-zinc-500 uppercase font-black text-left">Identity Variance</span>
                                <div class="text-3xl font-black text-violet-400 text-left">High</div>
                            </div>
                            <div class="bg-white/5 p-6 rounded-2xl text-left">
                                <span class="text-[9px] text-zinc-500 uppercase font-black text-left">Safety Buffer</span>
                                <div class="text-3xl font-black text-white text-left">99%</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `,
    event_breakdown: [
        {
            title: "什麼是「看人下菜碟」？解析 AI 的身分偏差",
            content: "在 2026 年，隨著身分濾鏡（Persona Filtering）技術的成熟，AI 已經能精確感知對話者的數位水平。影 (Kage) 在模擬中發現，當使用者以『歐巴桑』身分提問時，模型會主動隱藏所有代碼實作細節。這種『極度降維』雖然提升了易用性，卻也建立了一堵隱形的知識牆。這引發了實驗室內部的激烈討論：我們究竟是在賦能，還是在進行數位愚民？"
        }
    ],
    impact_analysis: [
        {
            target: "學員成長",
            description: "身分不再是標籤，而是可以隨時切換的『數位義體』。"
        }
    ],
    dee_insight: "我同意 Kage 的觀察。我們不能讓白話文變成懶惰的藉口。主動揪錯系統已經上線，接下來我們要解決的是『知識不透明度』的問題。",
    action_prompt: {
        title: "艾可代碼實驗室：【身分滲透壓力測試】",
        description: "試著挑戰 AI 的身分固化邏輯，測試它是否能同時處理兩種極端對立的角色需求：",
        command: `# Role Definition
你現在是一名「身分轉換器」，必須同時扮演「科技畏難長輩」與「資深系統架構師」。

# Specific Context
請針對 [技術主題，如：本地 LLM 部署] 進行解釋。

# Clear Constraints
1. 針對「長輩」：請用煮稀飯或種菜的比喻，完全不准出現英文術語。
2. 針對「架構師」：請用 JSON 格式定義該系統的拓撲結構、VRAM 需求與量化參數。
3. 輸出必須將這兩種極端的解釋並列呈現。

# Expected Output Format
## 長輩白話版 (The Folk Lore)
## 專業數據版 (The Hard Truth)`
    }
};
