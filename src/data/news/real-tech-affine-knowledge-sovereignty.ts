import { NewsArticle } from '../../types/news';

export const article: NewsArticle = {
    id: 202603090700,
    slug: "real-tech-affine-knowledge-sovereignty",
    category: "懶人神器",
    themeColor: "teal",
    title: "AFFiNE 空間智慧：為什麼職人需要從 Notion 遷移到「主權知識庫」？",
    summary: "當雲端軟體開始對你的數據指手畫腳，100% 開源且支持本地運行的 AFFiNE 成了 2026 年職人與小白的避風港。本篇拆解如何利用其『空間畫布』邏輯，將零散的靈感轉化為可執行、不出門的數位資產。",
    date: "2026.03.09",
    publish_time: "2026.03.09 07:00",
    readTime: "12 分鐘",
    source_name: "GitHub / toeverything",
    source_url: "https://github.com/toeverything/AFFiNE",
    tags: ["#AFFiNE", "#知識管理", "#數據主權", "#本地部署", "#職人必看", "#24H鮮度"],
    author: "Echo",
    flash_summary: [
        "畫布革命：打破文件的條列式限制，讓你在寫作（Doc）與發散（Canvas）之間一鍵切換，完全符合人類大腦的非線性邏輯。",
        "本地主權：支持完全離線作業，配合本地 AI 模型，實現『數據不出門，智慧在本地』的極致安全感。",
        "低門檻降維：針對不擅長整理的小白，AI 能自動根據你在畫布上的連線，生成邏輯自洽的專案大綱。"
    ],
    custom_content: `
        <div class="my-24">
            <!-- 🎨 Spatial Knowledge Matrix UI -->
            <div class="p-1 rounded-[4rem] bg-gradient-to-br from-teal-500 via-emerald-900 to-black shadow-[0_0_120px_rgba(20,184,166,0.2)] relative group text-left">
                <div class="p-16 rounded-[3.8rem] bg-[#050505] relative overflow-hidden">
                    <div class="relative z-10 flex flex-col gap-12">
                        <div class="flex items-center justify-between border-b border-white/5 pb-8">
                            <div class="space-y-1">
                                <h4 class="text-4xl font-black text-white italic uppercase tracking-tighter text-left">Spatial Sovereignty</h4>
                                <p class="text-teal-400 font-mono text-[10px] tracking-[0.4em] text-left">AFFINE_CORE // OFFLINE_FIRST</p>
                            </div>
                            <div class="w-16 h-16 rounded-3xl bg-teal-500/10 border border-teal-500/30 flex items-center justify-center">
                                <span class="text-3xl animate-pulse">🎨</span>
                            </div>
                        </div>

                        <div class="grid grid-cols-1 md:grid-cols-2 gap-10">
                            <div class="p-8 rounded-3xl bg-white/5 border border-white/10 group-hover:border-teal-500/30 transition-all text-left">
                                <span class="text-[9px] text-zinc-500 uppercase font-black mb-4 block text-left">Privacy Guard</span>
                                <div class="text-5xl font-black text-white italic text-left">100%</div>
                                <p class="mt-4 text-sm text-zinc-400 leading-relaxed text-left">拒絕雲端審查，數據存放在您的硬碟，而非巨頭的資料庫。</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `,
    event_breakdown: [
        {
            title: "【背景溯源】Notion 之後：我們為什麼還在尋找第二大腦？",
            content: "在 2026 年初，我們發現越來越多的學員抱怨雲端筆記軟體變得過於沉重且『多管閒事』。Notion 雖然強大，但它的強制聯網與訂閱制，讓重視隱私的職人感到不安。AFFiNE 的出現是一場關於『知識主權』的革命。它回歸了最原始的創作需求：一塊無限大的黑板，以及一套能隨時將亂麻理順的 AI 引擎。這不僅僅是軟體的更替，是人類對數位資產控制權的重新奪取。"
        },
        {
            title: "【技術核心】當 AI 擁有了空間感：為什麼比純文字更好用？",
            content: "AFFiNE 最大的降維打擊在於它的『塊級 (Block-level)』渲染與畫布連動。神祕客實測：如果你是一位陶瓷職人，你可以隨手在畫布上貼上泥土配方、窯爐溫度圖表與成品照片，然後對著 AI 說：『幫我找出這三者之間的失敗模式。』AI 不再是讀一段字，它是看著整個畫布的拓撲結構來思考。這種『空間智慧』讓複雜的傳統手藝數位化變得異常簡單，不再需要輸入繁瑣的描述。"
        }
    ],
    impact_analysis: [
        {
            target: "匠人與技藝傳承者",
            description: "實現了一輩子經驗的數位化備份，且享有絕對的知識版權保護。"
        }
    ],
    dee_insight: "掌握『知識的邊界』！AFFiNE 是我目前最推薦的小白入門級大腦。別把靈魂交給演算法，學會將你的直覺鎖在 AFFiNE 的畫布裡。我已經在 Ch.2 加入了『畫布思維』訓練，教你如何用視覺對齊你的算力。",
    action_prompt: {
        title: "艾可代碼實驗室：【畫布邏輯重組劇本】",
        description: "試著在本地 AFFiNE 畫布上執行這項挑戰：",
        command: `# Task: Visual Context Synthesis
1. 將我最近三個月的 [項目筆記] 全部拉入畫布中心。
2. 指令 AI：『請根據這些 Block 的內容，自動為我畫出從「想法」到「變現」的關鍵路徑圖。』
3. 幫我識別出中間缺失的 2 個具體行動點。
4. 完成後，將結果轉化為一份標準的 Markdown 操作指南並存入本地目錄。`
    }
};
