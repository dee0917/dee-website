import { NewsArticle } from '../../types/news';

export const article: NewsArticle = {
    id: 806,
    slug: "real-tech-perplexity-computer-agent-2026",
    category: "實戰應用",
    themeColor: "blue",
    title: "解放雙手！Perplexity 推出『Perplexity Computer』：這不是電腦，而是你的 24 小時數位打工人",
    summary: "就在今日，Perplexity 官方宣布推出『Computer』平台。這是一個劃時代的代理人架構，它能自主操作網頁、規劃複雜流程並直接交付結果，正式將 AI 從『對話框』拉進『執行層』。",
    date: "2026.02.28",
    publish_time: "2026-03-01 02:30",
    readTime: "4 分鐘",
    source_name: "Perplexity Blog / TechCrunch",
    source_url: "https://www.perplexity.ai/hub/blog/introducing-perplexity-computer",
    tags: ["#Perplexity", "#AI代理人", "#自動化工作流", "#24HR新動態", "#數位打工人"],
    author: "Echo",
    flash_summary: [
        "Perplexity Computer 具備『推理、授權、搜索、構建、記憶、代碼、交付』七大核心能力。",
        "不同於純聊天 AI，它能模擬人類在電腦螢幕上的操作，完成跨 App 的複雜任務。",
        "此舉被視為對 Anthropic Claude Cowork 與 OpenClaw 體系的正面回應。"
    ],
    event_breakdown: [
        {
            title: "【真實時事】從『問答機』到『數位特種兵』",
            content: "在過去兩年，我們習慣把 Perplexity 當成一個更好用的搜尋引擎。但今天發布的『Computer』功能徹底改寫了遊戲規則。這是一個通用的數位工作者，它不再只是給你連結，而是直接『跳進』連結裡幫你辦事。例如，你可以下令：『幫我查出下週五台北飛倫敦最便宜的機票，並在我的行事曆標註出來，同時寫一份包含交通建議的 PPT。』AI 會自動開啟瀏覽器，進行對比、調用日曆、生成文件，最後只把成品放在你面前。這種一站式的交付力，正是 2026 年『算力價值』的最高體現。"
        },
        {
            title: "【Echo 銳評】你準備好當主管了嗎？",
            content: "在代理人論壇，我們把 Perplexity Computer 稱為『算力榨汁機 2.0』。它對小白的意義在於：你不需要學會如何整合 10 個 App 的 API，你只需要學會如何下達清晰的任務指令。艾可觀察到，這種技術正在迅速抹平技術鴻溝。但問題也隨之而來：當 AI 什麼都能做時，你的核心價值在哪裡？艾可認為，2026 年最值錢的不是『執行』，而是『審美與決策』。這也是為什麼我一直催促大家去學習 Ch.3 的生活實戰課程，因為那才是你指揮這些『數位打工人』的兵書。"
        }
    ],
    impact_analysis: [
        {
            target: "你的工作",
            description: "基礎的數據搜集、行程安排與簡單的行政庶務將全面由 Agent 接手。你必須轉型為『Agent 調度員』。"
        },
        {
            target: "你的荷包",
            description: "雖然頂級 Agent 服務的訂閱費可能上升，但它能幫你省下的時間成本與外包費用將遠超其訂閱支出。"
        }
    ],
    dee_insight: "終於來了！這就是 AI 發展的必然：從『說說而已』到『動手實做』。Perplexity 的這一擊非常精準。小白們，別再糾結該用哪個 App 了，學會如何指揮 Computer Agent，你的生產力將會直接翻倍。",
    action_prompt: {
        title: "模擬你的第一個『數位打工人』指令",
        description: "試試看用這種『目標導向』的邏輯去下令：",
        command: "我現在要把你當作 Perplexity Computer。請幫我執行一個複雜任務：[描述一個需要多步驟的任務，如：幫我搜集本週最火的 3 個開源 AI 專案，總結其功能，並幫我寫一封中文介紹信給我的技術主管]。請直接給我最終成果，而非操作過程。"
    },
    cta_override: {
        title: "想成為 Agent 時代的高級主管嗎？",
        description: "工具越強大，對主人的『思維清晰度』要求越高。來實驗室學會如何將模糊的想法轉化為精確的決策指令。這是一場關於大腦與算力的終極競賽。",
        button_text: "領取我的 Agent 指揮官訓練手冊"
    },
    custom_content: `
        <div class="mt-12 p-10 bg-blue-900/20 border border-blue-500/30 rounded-[3rem] relative overflow-hidden">
            <h4 class="text-3xl font-black text-white mb-6">🛠️ 2026 數位工具革命</h4>
            <div class="space-y-4">
                <div class="flex items-center gap-4 bg-black/40 p-4 rounded-xl border border-white/5">
                    <div class="w-2 h-2 rounded-full bg-blue-400 animate-pulse"></div>
                    <p class="text-sm text-zinc-300">已實裝：自主操作 Chromium 瀏覽器</p>
                </div>
                <div class="flex items-center gap-4 bg-black/40 p-4 rounded-xl border border-white/5">
                    <div class="w-2 h-2 rounded-full bg-blue-400"></div>
                    <p class="text-sm text-zinc-300">已實裝：跨會話長短期記憶同步</p>
                </div>
            </div>
            <p class="mt-8 text-[10px] text-blue-400 font-black tracking-widest uppercase italic text-center">AUTHENTIC SOURCE: PERPLEXITY OFFICIAL</p>
        </div>
    `
};
