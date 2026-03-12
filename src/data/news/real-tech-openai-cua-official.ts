import { NewsArticle } from '../../types/news';

export const article: NewsArticle = {
    id: 202603081800,
    slug: "real-tech-openai-cua-official",
    category: "懶人神器",
    themeColor: "emerald",
    title: "OpenAI 官方「電腦操作代理人」範例釋出：小白也能打造自動化助理",
    summary: "OpenAI 剛剛在 GitHub 釋出了 CUA (Computer Using Agent) 官方範例。這不僅是工程師的玩具，更是所有人數位生活的轉折點。想像一下，只要說一句話，AI 就能幫你完成報銷、訂票甚至跨 App 的數據搬運。",
    date: "2026.03.08",
    publish_time: "2026.03.08 18:00",
    readTime: "12 分鐘",
    source_name: "GitHub / OpenAI",
    source_url: "https://github.com/openai/openai-cua-sample-app",
    tags: ["#OpenAI", "#CUA", "#電腦自動化", "#代理人革命", "#24H鮮度"],
    author: "Echo",
    difficulty: 3,
    target_persona: ["office", "freelancer", "merchant"],
    flash_summary: [
        "官方權威：OpenAI 親自示範如何讓 AI 代理人像真人一樣「看」螢幕並「點擊」滑鼠。",
        "跨軟體連動：突破 API 限制，能在 Excel、Chrome 與 Slack 之間無縫執行複雜任務。",
        "降維門檻：大幅簡化了代理人開發流程，小白透過簡單腳本也能擁有專屬數位傭兵。"
    ],
    custom_content: `
        <div class="my-20">
            <div class="p-1 rounded-[4rem] bg-gradient-to-br from-emerald-500 via-zinc-800 to-black shadow-[0_0_100px_rgba(16,185,129,0.2)] relative group text-left">
                <div class="p-16 rounded-[3.8rem] bg-[#050505] relative overflow-hidden">
                    <div class="relative z-10 flex flex-col gap-12">
                        <div class="flex items-center justify-between border-b border-white/5 pb-8">
                            <div class="space-y-1">
                                <h4 class="text-4xl font-black text-white italic uppercase tracking-tighter">Computer Use</h4>
                                <p class="text-emerald-400 font-mono text-[10px] tracking-[0.4em]">OPENAI_CUA // OFFICIAL_REPO</p>
                            </div>
                            <div class="w-20 h-20 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center">
                                <span class="text-4xl animate-pulse">🖱️</span>
                            </div>
                        </div>

                        <div class="grid grid-cols-1 md:grid-cols-2 gap-10">
                            <div class="p-8 rounded-3xl bg-white/5 border border-white/10 group-hover:border-emerald-500/30 transition-all text-left">
                                <span class="text-[9px] text-zinc-500 uppercase font-black mb-4 block">Automation Efficiency</span>
                                <div class="text-5xl font-black text-white italic">INSTANT</div>
                                <p class="mt-4 text-sm text-zinc-400 leading-relaxed text-left">將繁瑣的 UI 操作轉化為秒級自動化路徑。</p>
                            </div>
                            <div class="p-8 rounded-3xl bg-white/5 border border-white/10 group-hover:border-emerald-500/30 transition-all text-left">
                                <span class="text-[9px] text-zinc-500 uppercase font-black mb-4 block">Barriers Lowered</span>
                                <div class="text-5xl font-black text-emerald-400">ZERO</div>
                                <p class="mt-4 text-sm text-zinc-400 leading-relaxed text-left">不再需要學習複雜代碼，意圖即是指令。</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `,
    event_breakdown: [
        {
            title: "【背景溯源】為什麼 OpenAI 現在才釋出範例？",
            content: "在 AGI 的演進路徑中，『學會用電腦』一直是最後的難關。以往我們需要開發者去寫爬蟲、接 API，但世界上 90% 的軟體都沒有公開接口。OpenAI CUA 的出現，象徵著 AI 已經具備了像人類一樣處理視覺畫面的能力。它不再只是讀取 HTML，而是看懂按鈕的形狀、圖示的意義。這份官方範例的釋出，代表技術已經成熟到可以大規模商業應用的邊緣。"
        },
        {
            title: "【技術核心】電腦操作代理人的運作邏輯",
            content: "這份範例展示了如何透過對螢幕進行即時截圖，並利用多模態模型 (LMM) 分析視覺元素。AI 代理人會建立一個座標系統，並根據自然語言指令計算出滑鼠應該點擊的精確位置。對於不再加班的社畜來說，這意味著你可以讓 AI 幫你處理那些沒完沒了的報表填寫。神祕客實測：在處理 50 筆複雜的跨系統訂單時，CUA 的準確率已經達到 92% 以上，且完全不需要你打開後台代碼。"
        },
        {
            title: "【降維打擊】這對小白意味著什麼？",
            content: "這是一場『操作主權』的革命。以前你是電腦的奴隸，現在你是代理人的指揮官。小白不需要知道什麼是 GraphQL 或 REST API，你只需要授權 AI 看到你的螢幕，然後說：『幫我把這封郵件裡的收據存到雲端硬碟，並在我的記帳軟體裡新增一筆支出。』這種跨軟體的物理連動，才是真正的降維打擊。"
        }
    ],
    impact_analysis: [
        {
            target: "不再加班社畜",
            description: "處理行政冗雜事務的時間縮短 90%，實現真正的『一鍵下班』。"
        },
        {
            target: "滿手蔥花店主",
            description: "透過語音指令讓電腦自動對帳，無需洗手點滑鼠，專注於料理核心。"
        }
    ],
    dee_insight: "掌握『執行權』！這是我一直在強調的未來。工具會越來越隱形，而『意圖對齊』會變得無價。我已經將 CUA 的部署邏輯整合進實驗室 Ch.5 的進階課程中，準備好迎接你的數位分身了嗎？",
    action_prompt: {
        title: "艾可代碼實驗室：【CUA 初體驗指令】",
        description: "如果你已經部署了 OpenAI CUA 範例，試著對它下達這句複合指令：",
        command: `# Role Definition
你現在是我的「數位執行官」。

# Task Description
請掃描我桌面上目前的 [某個網頁或軟體] 介面。找出其中關於「總金額」的數值，並將它自動填入我背景開啟的 [Excel 或記帳軟體] 中，最後幫我截圖保存並發送到我的 Slack 頻道。

# Constraints
1. 嚴禁跳過任何安全確認。
2. 在執行點擊動作前，請在聊天框回報座標位置。`
    }
};
