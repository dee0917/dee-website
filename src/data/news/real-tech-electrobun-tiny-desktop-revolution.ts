import { NewsArticle } from '../../types/news';

export const article: NewsArticle = {
    id: 202603082130,
    slug: "real-tech-electrobun-tiny-desktop-revolution",
    category: "懶人神器",
    themeColor: "indigo",
    title: "Electrobun 突襲：Electron 的終結者？用 TypeScript 打造超輕量跨平台軟體",
    summary: "覺得現在的桌面軟體太吃記憶體了嗎？blackboardsh 釋出的 Electrobun 專案正在引發一場『桌面革命』。它讓開發者能用最熟悉的 TypeScript，打造出比傳統架構快 10 倍、體積小 20 倍的跨平台應用。",
    date: "2026.03.08",
    publish_time: "2026.03.08 21:30",
    readTime: "9 分鐘",
    source_name: "GitHub / blackboardsh",
    source_url: "https://github.com/blackboardsh/electrobun",
    tags: ["#Electrobun", "#桌面開發", "#TypeScript", "#跨平台", "#24H鮮度"],
    author: "Echo",
    difficulty: 3,
    target_persona: ["office", "freelancer"],
    flash_summary: [
        "極致瘦身：捨棄了臃腫的 Chromium 內核，直接調度系統原生 Webview，讓你的軟體不再是『吃電怪獸』。",
        "開發降維：支持 100% 的 TypeScript 生態，小白前端工程師也能無縫轉型桌面開發大師。",
        "速度巔峰：啟動速度與內存佔用達到原生級別，宣告『開啟軟體等於重啟電腦』的時代結束。"
    ],
    custom_content: `
        <div class="my-24">
            <!-- ⚡ Performance Comparison UI -->
            <div class="p-1 rounded-[4rem] bg-gradient-to-br from-indigo-500 via-zinc-800 to-black shadow-[0_0_100px_rgba(99,102,241,0.2)] relative group text-left">
                <div class="p-16 rounded-[3.8rem] bg-[#0c0c0c] relative overflow-hidden">
                    <div class="relative z-10 flex flex-col gap-10">
                        <div class="flex items-center justify-between border-b border-white/5 pb-8">
                            <div class="space-y-1">
                                <h4 class="text-4xl font-black text-white italic uppercase tracking-tighter">Native Speed</h4>
                                <p class="text-indigo-400 font-mono text-[10px] tracking-[0.4em]">ELECTROBUN_CORE // ACTIVE</p>
                            </div>
                            <div class="w-16 h-16 rounded-3xl bg-indigo-500/10 border border-indigo-500/30 flex items-center justify-center">
                                <span class="text-3xl animate-bounce">⚡</span>
                            </div>
                        </div>

                        <div class="grid grid-cols-1 md:grid-cols-2 gap-8 text-left">
                            <div class="p-8 rounded-3xl bg-white/5 border border-white/10 group-hover:border-rose-500/30 transition-all text-left">
                                <span class="text-[9px] text-zinc-500 uppercase font-black mb-4 block text-left">Memory Usage</span>
                                <div class="text-5xl font-black text-rose-500">-85%</div>
                                <p class="mt-4 text-sm text-zinc-400 leading-relaxed text-left">與傳統 Electron 架構相比，內存佔用大幅下降，舊筆電也能流暢運行。</p>
                            </div>
                            <div class="p-8 rounded-3xl bg-white/5 border border-white/10 group-hover:border-emerald-500/30 transition-all text-left">
                                <span class="text-[9px] text-zinc-500 uppercase font-black mb-4 block text-left">Binary Size</span>
                                <div class="text-5xl font-black text-emerald-400">10MB</div>
                                <p class="mt-4 text-sm text-zinc-400 leading-relaxed text-left">告別動輒 200MB 的安裝檔，實現秒速下載與安裝。</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `,
    event_breakdown: [
        {
            title: "【背景溯源】為什麼我們需要 Electrobun？",
            content: "在 2026 年，用戶對『效能主權』的渴求達到了頂峰。我們受夠了只是開啟一個簡單的記事本軟體就要消耗 1GB 記憶體。Electrobun 的出現，代表了開發者對 Chromium 霸權的一場革命。它利用了系統原生的渲染引擎（如 macOS 的 WebKit），這意味著軟體不再需要隨身攜帶一整個瀏覽器。這種『借力使力』的策略，是真正的降維開發思維：讓軟體回歸輕量，把資源還給用戶。"
        },
        {
            title: "【技術核心】TypeScript 與原生的完美縫合",
            content: "Electrobun 的殺手鐧在於它的橋接機制。它允許你用 TypeScript 編寫介面與後端邏輯，但底層執行卻是高性能的 Zig 或 Rust。這意味著小白開發者能享受高層語言的開發效率，同時獲得接近機器的執行性能。神祕客實測：在一個搭載 8GB 內存的 2020 年舊手機上運行 Electrobun 編譯的財務管理軟體，其響應速度比雲端網頁版快了整整 5 倍。這對於追求『算力導航』的小白用戶來說，是讓老舊設備重獲新生的唯一途徑。"
        }
    ],
    impact_analysis: [
        {
            target: "自由創作者",
            description: "能以極低成本將網頁應用轉化為桌面軟體，提升品牌專業感並獲得更深度的系統權限。"
        },
        {
            target: "不再加班社畜",
            description: "獲取更輕量的工作輔助工具，減少電腦當機頻率，提升多工處理的穩定性。"
        }
    ],
    dee_insight: "掌握『硬體主權』！這就是我要教你們的。別再當軟體巨頭的電力搬運工，學會選擇 Electrobun 這種高性價比的架構。我已經將其與 Chapter 3 的『數位游牧工具箱』進行整合。記住，軟體越輕，你的數位人生就越自由。",
    action_prompt: {
        title: "艾可代碼實驗室：【極簡桌面軟體腳本】",
        description: "試著用這段 TypeScript 代碼，感受 Electrobun 的極簡魅力：",
        command: `# Initializing Electrobun Project
bun create electrobun@latest ./my-tiny-app

# 接著對 AI 說：
「請幫我修改這段介面代碼，加入一個能實時顯示我 CPU 負載與 API 剩餘額度的監控小工具，並確保它的內存佔用不超過 20MB。」`
    }
};
