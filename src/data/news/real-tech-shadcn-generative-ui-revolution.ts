import { NewsArticle } from '../../types/news';

export const article: NewsArticle = {
    id: 202603090900,
    slug: "real-tech-shadcn-generative-ui-revolution",
    category: "懶人神器",
    themeColor: "indigo",
    title: "Shadcn UI 破 10 萬星：開啟「生成式 UI」時代，前端開發不再需要手寫代碼",
    summary: "今日 GitHub 星數正式衝破 10 萬大關的 shadcn-ui 釋出了一個重要信號：UI 正在從『靜態資產』轉化為『可生成的邏輯』。這對所有想要數位轉型、建立個人品牌的小白來說，是開發力的一次核級爆發。",
    date: "2026.03.09",
    publish_time: "2026.03.09 09:00",
    readTime: "10 分鐘",
    source_name: "GitHub / shadcn-ui",
    source_url: "https://github.com/shadcn-ui/ui",
    tags: ["#shadcnUI", "#生成式UI", "#前端革命", "#開發降維", "#24H鮮度"],
    author: "Echo",
    flash_summary: [
        "組件即代碼：shadcn 改變了 npm 安裝包的邏輯，讓代碼主權回歸開發者手中。",
        "視覺語義化：現在你只要說『我要一個像 Instagram 的首頁』，AI 會自動從 shadcn 庫中挑選最精準的組件進行拼裝。",
        "可訪問性巔峰：內建符合國際標準的無障礙支持，讓小白開發的軟體也能具備大廠級別的使用體驗。"
    ],
    custom_content: `
        <div class="my-24">
            <div class="p-1 rounded-[4rem] bg-gradient-to-br from-indigo-500 via-zinc-800 to-black shadow-[0_0_100px_rgba(99,102,241,0.2)] relative group text-left">
                <div class="p-16 rounded-[3.8rem] bg-[#0c0c0c] relative overflow-hidden">
                    <div class="relative z-10 flex flex-col gap-12">
                        <div class="flex items-center justify-between border-b border-white/5 pb-8">
                            <div class="space-y-1 text-left">
                                <h4 class="text-4xl font-black text-white italic uppercase tracking-tighter">Generative UI</h4>
                                <p class="text-indigo-400 font-mono text-[10px] tracking-[0.4em]">SHADCN_CORE // LOGIC_INJECTED</p>
                            </div>
                        </div>

                        <div class="grid grid-cols-1 md:grid-cols-2 gap-10">
                            <div class="p-8 rounded-3xl bg-white/5 border border-white/10 group-hover:border-indigo-500/30 transition-all text-left">
                                <span class="text-[9px] text-zinc-500 uppercase font-black mb-4 block text-left">Ownership</span>
                                <div class="text-5xl font-black text-white italic">100%</div>
                                <p class="mt-4 text-sm text-zinc-400 leading-relaxed text-left">拒絕封閉的黑箱庫，代碼直接拷貝到你的專案中，擁有絕對的修改權。</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `,
    event_breakdown: [
        {
            title: "【背景溯源】為什麼「不裝包」反而成了最強優勢？",
            content: "在 2026 年以前，前端工程師習慣於安裝各種臃腫的 UI 庫。但 shadcn-ui 卻反其道而行，它不讓你安裝它的庫，它讓你『拷貝它的邏輯』。這在 AI 時代具有革命性的意義：因為代碼在你的專案中，你的 Coding Agent (如 Claude Code) 就能完全理解並隨意重構這些組件。這標誌著我們從『調用組件』轉向了『生成組件』。對於自由職業者來說，這意味著你可以建立一套完全私有的設計語言系統，且不會被任何第三方供應商斷供。"
        }
    ],
    impact_analysis: [
        {
            target: "全能斜槓人",
            description: "一人就能搞定全站 UI，大幅節省外包設計師的費用。"
        }
    ],
    dee_insight: "掌握『介面主權』！shadcn 就是我們實驗室前端架構的基石。技術要服務於美學，更要服務於你的品牌。",
    action_prompt: {
        title: "艾可代碼實驗室：【組件生成劇本】",
        description: "試著在你的 React 專案中對 AI 執行這個視覺生成任務：",
        command: `# Role: Frontend Architect
# Task: UI Generation
1. 從 shadcn-ui 的組件庫中挑選『Card』, 『Button』。
2. 將其組合為一個專為銀髮族設計的藥物提醒卡片。
3. 語氣設定：配色需高對比，字體大小符合標準。`
    }
};
