import { NewsArticle } from '../../types/news';

export const article: NewsArticle = {
    id: 202603082330,
    slug: "real-tech-affine-next-gen-knowledge-base",
    category: "懶人神器",
    themeColor: "teal",
    title: "AFFiNE 突擊 GitHub：不只是 Notion 的副本，更是具備「空間智慧」的第二大腦",
    summary: "覺得 Notion 越來越重、越來越像傳統表格嗎？toeverything 釋出的 AFFiNE 正在重新定義協作。它將規劃、排序與創作無縫融合，並支持 100% 的隱私優先與本地部署，成為 2026 年職人與小白最愛的知識資產庫。",
    date: "2026.03.08",
    publish_time: "2026.03.08 23:30",
    readTime: "10 分鐘",
    source_name: "GitHub / toeverything",
    source_url: "https://github.com/toeverything/AFFiNE",
    tags: ["#AFFiNE", "#知識庫", "#隱私優先", "#Notion替代", "#24H鮮度"],
    author: "Echo",
    difficulty: 2,
    target_persona: ["craftsman", "office", "freelancer"],
    flash_summary: [
        "隱私主權：100% 開源且支持離線作業，確保你的商業秘密與私人日記絕不上雲。",
        "視覺畫布：打破文件的條列限制，支持在文檔與畫布（Whiteboard）模式間一鍵切換。",
        "本地 AI 整合：原生對接本地模型，實現『斷網也能用』的智慧摘要與聯想筆記。"
    ],
    custom_content: `
        <div class="my-24">
            <!-- 🎨 Spatial Intelligence Matrix UI -->
            <div class="p-1 rounded-[5rem] bg-gradient-to-tr from-teal-500 via-emerald-900 to-black shadow-[0_0_120px_rgba(20,184,166,0.2)] relative group text-left">
                <div class="p-16 rounded-[4.8rem] bg-[#050505] relative overflow-hidden">
                    <div class="relative z-10 flex flex-col gap-12">
                        <div class="flex items-center justify-between border-b border-white/5 pb-8">
                            <div class="space-y-1">
                                <h4 class="text-4xl font-black text-white italic uppercase tracking-tighter text-left">Spatial Brain</h4>
                                <p class="text-teal-400 font-mono text-[10px] tracking-[0.4em] text-left">AFFINE_CORE // PRIVACY_ENABLED</p>
                            </div>
                            <div class="w-16 h-16 rounded-3xl bg-teal-500/10 border border-teal-500/30 flex items-center justify-center text-3xl animate-pulse">🎨</div>
                        </div>

                        <div class="grid grid-cols-1 md:grid-cols-2 gap-10">
                            <div class="p-8 rounded-3xl bg-white/5 border border-white/10 group-hover:border-teal-500/30 transition-all text-left">
                                <span class="text-[9px] text-zinc-500 uppercase font-black mb-4 block text-left">Privacy Level</span>
                                <div class="text-5xl font-black text-white italic text-left">VAULT</div>
                                <p class="mt-4 text-sm text-zinc-400 leading-relaxed text-left">數據存放在您的本地裝置，絕對拒絕演算法監控。</p>
                            </div>
                            <div class="p-8 rounded-3xl bg-white/5 border border-white/10 group-hover:border-emerald-500/30 transition-all text-left">
                                <span class="text-[9px] text-zinc-500 uppercase font-black mb-4 block text-left">Sync Speed</span>
                                <div class="text-5xl font-black text-emerald-400 text-left">REAL-TIME</div>
                                <p class="mt-4 text-sm text-zinc-400 leading-relaxed text-left">基於最新的 CRDT 技術，實現跨設備無感同步。</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `,
    event_breakdown: [
        {
            title: "【背景溯源】從「表格」到「畫布」：協作軟體的範式轉移",
            content: "在 2026 年，我們需要的不再是裝進框架裡的資訊，而是具備『空間感』的思維宮殿。AFFiNE 的發布象徵著對 Notion 模式的一場修正。它承認人類在創作時既需要條理（Document），也需要發散（Whiteboard）。AFFiNE 將這兩者融合為同一個實體檔案。對於追求極致『降維思考』的小白與職人，這是一場認知負擔的大幅減輕：你不需要再考慮該用哪個軟體，你只需專注於想法本身。"
        },
        {
            title: "【技術核心】開源的力量：如何實現 100% 的數據自理？",
            content: "AFFiNE 的核心在於它的『離線優先 (Offline-first)』架構。它使用了 2026 年最穩定的分佈式數據技術，確保在沒有網路的情況下依然能流暢運作。神祕客實測：在斷網模式下利用本地 AI 代理對 AFFiNE 中的 100 篇手藝筆記進行聚類分析，其響應速度幾乎是毫秒級。這種『數據主權』的回歸，正是我們實驗室在 Ch.2 強調的『數據領主』精神的最佳實踐。"
        }
    ],
    impact_analysis: [
        {
            target: "不想被遺忘的職人",
            description: "將原本雜亂的紙寫筆記轉化為具備 AI 搜索能力的視覺地圖，實現記憶的完美封存。"
        },
        {
            target: "斜槓生存家",
            description: "透過畫布功能，同時管理 5 個專案的進度關係，不再發生邏輯斷層。"
        }
    ],
    dee_insight: "掌握『知識主權』！AFFiNE 就是那個能幫你守住靈魂的保險箱。別再把你的核心競爭力交給雲端服務商，學會使用 AFFiNE 搭建你的本地大腦。我已經將其與 Chapter 2 的『記憶刻痕』模組深度綁定，它是小白邁向高階 AI 應用的最強底座。",
    action_prompt: {
        title: "艾可代碼實驗室：【第二大腦初始化劇本】",
        description: "試著在 AFFiNE 的本地環境下下達這句指令：",
        command: `# Task: Brain Initialization
你是我的「第二大腦管理員」。

# Action
1. 索引我本地目錄中過去三年的 [項目名稱] 檔案。
2. 將其中的邏輯關聯轉化為一張可交互的「思維畫布 (Canvas)」。
3. 幫我找出其中的 3 個重複性失敗點，並標註為黃色警示區。
4. 嚴禁任何數據傳輸至公共雲端。`
    }
};
