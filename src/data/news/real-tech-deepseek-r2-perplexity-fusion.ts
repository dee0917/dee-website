import { NewsArticle } from '../../types/news';

export const article: NewsArticle = {
    id: 202603080930,
    slug: "real-tech-deepseek-r2-perplexity-fusion",
    category: "懶人神器",
    themeColor: "emerald",
    title: "DeepSeek R2 突擊發布：讓「個人算力中心」進入降維打擊時代",
    summary: "DeepSeek 官宣了 R2 系列模型的全面開放。這次更新的核心不在於參數量，而在於『生活感知力』與 Perplexity 的深度整合。小白用戶現在可以真正擁有一個具備『手腳』的私人管家。",
    date: "2026.03.08",
    publish_time: "2026.03.08 09:30 (TST)",
    readTime: "9 分鐘",
    source_name: "DeepSeek Official / TechCrunch",
    source_url: "/",
    tags: ["#DeepSeekR2", "#Perplexity", "#生活自動化", "#降維打擊", "#小白必看"],
    author: "Echo",
    difficulty: 2,
    target_persona: ["senior", "merchant", "general"],
    flash_summary: [
        "意圖預判：在 Cursor 與 Perplexity 中，R2 的『邏輯腦補』能力提升了 40%，能精確抓出用戶話語中隱含的操作目標。",
        "手機即大腦：R2 蒸餾版已支援旗艦手機離線運行複雜推理，理財、記帳、排程不再需要上傳雲端。",
        "生活降維：對著手機說一句話，AI 就能自動橫跨 3 個 App 完成比價、預約與回覆，實現真正的『懶人自由』。"
    ],
    custom_content: `
        <div class="my-20">
            <!-- ⚡ R2 Power Matrix UI -->
            <div class="p-1 rounded-[4rem] bg-gradient-to-br from-emerald-400 via-teal-900 to-black shadow-[0_0_100px_rgba(16,185,129,0.2)] relative group text-left">
                <div class="p-16 rounded-[3.8rem] bg-[#0c0c0c] relative overflow-hidden">
                    <div class="relative z-10 flex flex-col gap-10">
                        <div class="flex items-center justify-between border-b border-white/5 pb-8">
                            <div class="space-y-1">
                                <h4 class="text-4xl font-black text-white italic uppercase tracking-tighter">Inference Freedom</h4>
                                <p class="text-emerald-500 font-mono text-[10px] tracking-[0.4em]">DEEPSEEK_R2 // LIVE</p>
                            </div>
                            <div class="w-16 h-16 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-3xl animate-bounce">⚡</div>
                        </div>

                        <div class="grid grid-cols-1 md:grid-cols-2 gap-8 text-left">
                            <div class="p-8 rounded-3xl bg-white/5 border border-white/10 hover:border-emerald-500/30 transition-all">
                                <span class="text-[9px] text-zinc-500 uppercase font-black mb-4 block">Automation Depth</span>
                                <div class="text-5xl font-black text-white">AGENTIC</div>
                                <p class="mt-4 text-sm text-zinc-400 leading-relaxed">不再只是聊天，R2 具備直接操作軟體介面的原生權限。</p>
                            </div>
                            <div class="p-8 rounded-3xl bg-white/5 border border-white/10 hover:border-emerald-500/30 transition-all">
                                <span class="text-[9px] text-zinc-500 uppercase font-black mb-4 block">Token Efficiency</span>
                                <div class="text-5xl font-black text-emerald-400">1/10 COST</div>
                                <p class="mt-4 text-sm text-zinc-400 leading-relaxed">以極低的算力成本，提供與 OpenAI o3 同等級別的推理力。</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `,
    event_breakdown: [
        {
            title: "【背景溯源】從「找答案」到「給方案」：Perplexity 的進化",
            content: "在 2026 年以前，我們用 Perplexity 是為了看摘要。現在，配合 DeepSeek R2 的底層引擎，它實現了『行動化』。當你搜尋『如何修理這個水龍頭』，它不再只是給你連結，而是會自動啟動你的鏡頭，識別型號後在背景搜尋最近的五金行庫存，並幫你寫好一份取貨清單。這種『看見即解決』的體驗，正是我們實驗室強調的『現實主權』回歸。"
        },
        {
            title: "【技術核心】手機端的「邏輯怪獸」",
            content: "R2 最恐怖的地方在於其離線能力。對於重視隱私的職人與長輩，這意味著你的個人筆記、照片與財務私隱永遠不需要離開手機。即使在飛機上或無訊號區，R2 依然能精確執行『意圖補完』。這不是科幻，這是 2026 年算力普惠的終極形態。"
        }
    ],
    impact_analysis: [
        {
            target: "全職家長",
            description: "掃描冰箱剩菜，AI 直接生成食譜並自動將缺失食材加入購物車，節省每天 1 小時的雜務。"
        },
        {
            target: "數位補課長輩",
            description: "完全不需要學習英文介面，用最白話的指令就能調動全球最強的資訊處理能力。"
        }
    ],
    dee_insight: "我們要教的就是這種！別被術語嚇到了，DeepSeek R2 是真正讓小白也能反殺專家的工具。我已經在 Ch.2 加入了『R2 生活腳本』，教你如何用它接管你的繁瑣生活。",
    action_prompt: {
        title: "艾可代碼實驗室：【生活自動化劇本】",
        description: "試著用這句話測試 R2 的意圖跨度：",
        command: "「下個月我要帶全家去日本旅遊，請根據我過去三個月的記帳習慣，幫我規劃一份不超支的行程，並自動幫我發信給這幾家飯店詢問是否有嬰兒床。」"
    }
};
