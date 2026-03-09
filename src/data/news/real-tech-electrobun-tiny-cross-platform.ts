import { NewsArticle } from '../../types/news';

export const article: NewsArticle = {
    id: 202603090010,
    slug: "real-tech-electrobun-tiny-cross-platform",
    category: "實戰應用",
    themeColor: "indigo",
    title: "Electrobun 跨平台革命：用 TypeScript 打造原生效能的極小桌面應用",
    summary: "GitHub 爆火專案 electrobun，旨在終結 Electron 時代的記憶體浪費。它讓開發者能用最熟悉的 TypeScript，打造出比傳統架構小 20 倍、啟動快 10 倍的原生級應用，宣告『軟體臃腫化』時代的終結。",
    date: "2026.03.09",
    publish_time: "2026.03.09 00:10",
    readTime: "9 分鐘",
    source_name: "GitHub / blackboardsh",
    source_url: "https://github.com/blackboardsh/electrobun",
    tags: ["#Electrobun", "#桌面開發", "#TypeScript", "#效能主權", "#24H鮮度"],
    author: "Echo",
    difficulty: 2,
    target_persona: ["freelancer", "office"],
    flash_summary: [
        "極致瘦身：捨棄了內置的 Chromium，直接調用系統原生 Webview，安裝包體積降至 5MB 級別。",
        "降維配置：自動化處理底層橋接，小白前端工程師也能一鍵生成高效的 Mac/Windows 桌面軟體。",
        "主權回歸：不再被瀏覽器內核的版本限制綁架，實現 100% 的硬體效能釋放。"
    ],
    custom_content: `
        <div class="my-20">
            <!-- ⚡ Performance Leap Visualization -->
            <div class="p-1 rounded-[4rem] bg-gradient-to-br from-indigo-500 via-zinc-800 to-black shadow-[0_0_100px_rgba(99,102,241,0.2)] relative group text-left">
                <div class="p-16 rounded-[3.8rem] bg-[#0c0c0c] relative overflow-hidden text-left">
                    <div class="relative z-10 flex flex-col gap-12">
                        <div class="flex items-center justify-between border-b border-white/5 pb-8">
                            <div class="space-y-1">
                                <h4 class="text-4xl font-black text-white italic uppercase tracking-tighter text-left">Native Performance</h4>
                                <p class="text-indigo-400 font-mono text-[10px] tracking-[0.4em] text-left">ELECTROBUN_ENGINE // ACTIVE</p>
                            </div>
                        </div>

                        <div class="grid grid-cols-1 md:grid-cols-2 gap-8 text-left">
                            <div class="p-8 rounded-3xl bg-white/5 border border-white/10 group-hover:border-rose-500/30 transition-all text-left">
                                <span class="text-[9px] text-zinc-500 uppercase font-black mb-4 block text-left">RAM Saving</span>
                                <div class="text-5xl font-black text-rose-500">-90%</div>
                                <p class="mt-4 text-sm text-zinc-400 leading-relaxed text-left">相比 Electron 專案，Electrobun 讓你的應用在老舊電腦上也能秒速開啟。</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `,
    event_breakdown: [
        {
            title: "【背景溯源】Electron 的統治與崩塌",
            content: "在 2026 年以前，我們習慣了用 Electron 開發跨平台應用，但代價是巨大的記憶體佔用。對於追求極致隱私（方案五：算力導航）的 Linux 與 Windows 用戶來說，軟體的臃腫就是對算力的剝削。Electrobun 的出現本質上是利用了 2026 年最新的系統翻譯層技術。它不再試圖模擬一個瀏覽器，而是精確翻譯應用的 UI 請求到作業系統底層。這標誌著系統藩籬的徹底瓦解。"
        }
    ],
    impact_analysis: [
        {
            target: "自由創作者",
            description: "能以極低硬體成本開發高效的桌面輔助工具，專注於品牌專業感的建立。"
        }
    ],
    dee_insight: "掌握『硬體主權』！這是 Ch.3 『數位游牧』的核心。學會選擇 Electrobun 這種高性價比的架構，你的工具庫將不再是系統的負擔。技術要服務於自由，而不是拖慢你的腳步。我已將其本地腳本加入實驗室 Ch.5 擴展包。",
    action_prompt: {
        title: "艾可代碼實驗室：【極簡桌面軟體部署劇本】",
        description: "試著在你的本地環境下執行這個 5 分鐘挑戰：",
        command: `bun create electrobun@latest ./my-light-app
# 接著對 AI 說：
「請幫我修改這段介面代碼，加入一個能即時顯示我當前 API 餘額與系統負載的監控小工具，並確保它的二進位檔案大小不超過 10MB。」`
    }
};
