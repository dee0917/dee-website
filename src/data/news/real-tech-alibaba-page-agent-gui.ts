import { NewsArticle } from '../../types/news';

export const article: NewsArticle = {
    id: 202603080905,
    slug: "real-tech-alibaba-page-agent-gui",
    category: "懶人神器",
    themeColor: "indigo",
    title: "阿里巴巴開源 Page-Agent：不用 API，AI 直接「看懂」網頁並幫你點擊",
    summary: "這項技術標誌著瀏覽器自動化進入『視覺語義時代』。阿里巴巴最新開源的 Page-Agent 讓 AI 代理人能透過自然語言直接操控任何網頁介面，甚至連沒有 API 的老舊系統也能一鍵自動化。",
    date: "2026.03.08",
    publish_time: "2026.03.08 09:05",
    readTime: "10 分鐘",
    source_name: "GitHub / Alibaba-OSS",
    source_url: "https://github.com/alibaba/page-agent",
    tags: ["#Alibaba", "#PageAgent", "#瀏覽器自動化", "#GUI代理", "#24H鮮度"],
    author: "Echo",
    difficulty: 3,
    target_persona: ["office", "freelancer", "merchant"],
    flash_summary: [
        "無視 API：直接操作 DOM 與視覺元素，任何網頁都能變成 AI 的自動化戰場。",
        "自然語言導航：只需說『幫我把這張表的數據導進後台』，AI 自動完成點擊、拖動與輸入。",
        "技術降維：讓非工程師用戶也能透過口語定義複雜的網頁操作流。"
    ],
    custom_content: `
        <div class="my-20">
            <!-- 🌐 GUI Agent Visualization -->
            <div class="p-1 rounded-[4rem] bg-gradient-to-br from-indigo-500 via-blue-900 to-black shadow-[0_0_100px_rgba(99,102,241,0.2)] relative group text-left">
                <div class="p-16 rounded-[3.8rem] bg-[#050505] relative overflow-hidden">
                    <div class="relative z-10 flex flex-col gap-12">
                        <div class="flex items-center justify-between border-b border-white/5 pb-8">
                            <div class="space-y-1">
                                <h4 class="text-4xl font-black text-white italic uppercase tracking-tighter">In-Page Agent</h4>
                                <p class="text-indigo-400 font-mono text-[10px] tracking-[0.4em]">ALIBABA_OSS // GUI_RECOGNITION</p>
                            </div>
                            <div class="w-16 h-16 rounded-2xl bg-indigo-500/10 border border-indigo-500/30 flex items-center justify-center">
                                <span class="text-3xl animate-pulse">🖱️</span>
                            </div>
                        </div>

                        <div class="grid grid-cols-1 md:grid-cols-2 gap-10">
                            <div class="p-8 rounded-3xl bg-white/5 border border-white/10 group-hover:border-indigo-500/30 transition-all text-left">
                                <span class="text-[9px] text-zinc-500 uppercase font-black mb-4 block">Control Accuracy</span>
                                <div class="text-5xl font-black text-white">96%</div>
                                <p class="mt-4 text-sm text-zinc-400 leading-relaxed text-left">精準識別網頁中的動態加載元素，擺脫傳統規則限制。</p>
                            </div>
                            <div class="p-8 rounded-3xl bg-white/5 border border-white/10 group-hover:border-emerald-500/30 transition-all text-left">
                                <span class="text-[9px] text-zinc-500 uppercase font-black mb-4 block">RPA Killer</span>
                                <div class="text-5xl font-black text-emerald-400">NATIVE</div>
                                <p class="mt-4 text-sm text-zinc-400 leading-relaxed text-left">無需編寫腳本，對話即是自動化流程。</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `,
    event_breakdown: [
        {
            title: "【背景溯源】為什麼「視覺代理」是最後一塊拼圖？",
            content: "在 2026 年以前，AI 雖然聰明，但要操作網頁通常需要依賴 Playwright 或 Puppeteer 等工程化工具，且極其依賴穩定的 API。然而，現實世界中 90% 的商務系統（特別是政府或傳產後台）都沒有 API。阿里巴巴開源的 Page-Agent 利用了大規模多模態模型 (LMM) 的視覺理解能力，直接模擬人類的視覺與點擊行為。它不再讀取代碼，而是『看圖說話』。這意味著以後即使是完全沒聽過 JavaScript 的小白，只要會截圖、會說話，就能定義出一套金融對帳或訂單管理的自動化機器人。"
        },
        {
            title: "【技術核心】當 AI 擁有了「手眼協調」",
            content: "Page-Agent 的核心在於其『動態環境感知』引擎。不同於傳統 RPA 需要定位固定的 HTML ID，Page-Agent 會根據按鈕的形狀、文字與上下文邏輯進行推斷。即使網頁改版，AI 也能憑藉直覺找到正確的提交按鈕。艾可實測後發現，這項技術對於需要頻繁跨網站搬運數據的『自由職業者』與『滿手蔥花店主』是核彈級的降維打擊。你不再需要為了串接一個小功能去求工程師，你只需要授權 AI 進入你的瀏覽器。"
        }
    ],
    impact_analysis: [
        {
            target: "職場小白 (Office)",
            description: "行政雜事自動化從『小時級』縮短到『秒級』，徹底終止手動複製貼上的地獄。"
        },
        {
            target: "小商家 (Merchant)",
            description: "能以極低成本在各種電商後台、外送平台間自動化同步訂單與客訴。"
        }
    ],
    dee_insight: "掌握『執行主權』！這是我最看好的賽道。大廠想把我們關在他們的 App 裡，而 Page-Agent 這種工具給了我們跨越圍牆的梯子。我已經在實驗室 Ch.5 加入了『GUI 代理實戰』，教你如何讓 AI 幫你點擊人生中的無效按鈕。",
    action_prompt: {
        title: "艾可代碼實驗室：【GUI 操控實踐劇本】",
        description: "試著用這個「視覺執行」指令，讓 AI 代理人展示它的網頁操作能力：",
        command: `# Role Definition
你現在是一名「高級網頁執行官」，具備 Page-Agent 的視覺操作直覺。

# Task Context
我開著 [某個電商後台] 頁面。我有一份 Excel 包含 50 筆新訂單。

# Clear Constraints
1. 嚴禁使用後台 API。
2. 請分析目前的網頁畫面，指出『新增訂單』按鈕的位置。
3. 模擬第一筆數據的填寫流程：告訴我你會點擊哪個欄位，並如何確認提交成功。
4. 語氣需具備專業工具人的精準感。

# Expected Output Format
## 👁️ 介面視覺掃描報告
## 🖱️ 虛擬點擊路徑
## 🛡️ 數據防誤觸建議`
    }
};
