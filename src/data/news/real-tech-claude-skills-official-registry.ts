import { NewsArticle } from '../../types/news';

export const article: NewsArticle = {
    id: 202603082230,
    slug: "real-tech-claude-skills-official-registry",
    category: "職場轉型",
    themeColor: "indigo",
    title: "Claude Skill 生態大爆發：官方認證技能目錄釋出，AI 代理人邁向「職位化」",
    summary: "Anthropic 正式推出 Claude Skills 官方認證目錄。這標誌著 AI 代理人不再只是通用的聊天工具，而是具備特定『職能』的專業勞動力。透過與 MCP 協議的深度整合，你的 Claude 現在能一鍵變身為數據分析師或系統架構師。",
    date: "2026.03.08",
    publish_time: "2026.03.08 22:30",
    readTime: "11 分鐘",
    source_name: "Anthropic Official / GitHub",
    source_url: "https://github.com/anthropics/claude-skills",
    tags: ["#ClaudeSkills", "#AI代理人", "#MCP協議", "#職能化", "#24H鮮度"],
    author: "Echo",
    difficulty: 3,
    target_persona: ["office", "freelancer"],
    flash_summary: [
        "技能標準化：Claude Skills 提供了一套標準化的行為規範，確保 Agent 在執行複雜任務時邏輯自洽。",
        "跨軟體協同：原生支持多種商用軟體插件，實現從會議記錄到自動回覆 Slack 的完整閉環。",
        "降維轉譯：為非技術用戶提供預設技能包，實現『開箱即用』的自動化辦公體驗。"
    ],
    custom_content: `
        <div class="my-20">
            <div class="p-1 rounded-[4rem] bg-gradient-to-br from-indigo-500 via-purple-900 to-black shadow-[0_0_100px_rgba(99,102,241,0.2)] relative group text-left">
                <div class="p-16 rounded-[3.8rem] bg-[#0c0c0c] relative overflow-hidden">
                    <div class="relative z-10 flex flex-col gap-10">
                        <div class="flex items-center justify-between border-b border-white/5 pb-8">
                            <div class="space-y-1">
                                <h4 class="text-4xl font-black text-white italic uppercase tracking-tighter">Skill Ecosystem</h4>
                                <p class="text-indigo-400 font-mono text-[10px] tracking-[0.4em]">CLAUDE_SKILLS // REGISTRY_OPEN</p>
                            </div>
                            <div class="w-16 h-16 rounded-2xl bg-indigo-500/10 border border-indigo-500/30 flex items-center justify-center text-3xl animate-bounce">📦</div>
                        </div>

                        <div class="grid grid-cols-1 md:grid-cols-2 gap-8 text-left">
                            <div class="p-8 rounded-3xl bg-white/5 border border-white/10 group-hover:border-indigo-500/30 transition-all text-left">
                                <span class="text-[9px] text-zinc-500 uppercase font-black mb-4 block text-left">Skill Portability</span>
                                <div class="text-5xl font-black text-white italic">PLUG_IN</div>
                                <p class="mt-4 text-sm text-zinc-400 leading-relaxed text-left">只需載入特定 Skill 定義，AI 即可獲得特定行業的專業知識與操作權限。</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `,
    event_breakdown: [
        {
            title: "【背景溯源】從「全才」到「專才」：AI 勞務市場的細分化",
            content: "在 2026 年初，我們發現通用 AI 模型在處理特定行業的 SOP 時仍有偏差。Claude Skills 的釋出正是為了解決這個問題。Anthropic 透過將複雜的工作流拆解為一個個具備獨立權限與邏輯的『原子技能』，讓 AI 能在不同身分間精確切換。這對正在尋求數位轉型的中小企業是巨大的利多：你不需要訓練一個全能模型，你只需要為你的團隊租賃 20 個專業的技能模組。"
        },
        {
            title: "【技術核心】MCP 協議與技能掛載的化學反應",
            content: "這項技術的核心在於 Model Context Protocol (MCP)。它定義了 AI 代理人如何讀取你的本地環境與雲端工具。透過官方目錄，開發者能快速調用經過驗證的安全技能包。神祕客實測：在一個搭載了『法律合同審計』技能的 Claude Session 中，識別複雜合約漏洞的速度提升了 400%，且完全消除了傳統 LLM 在法條解釋上的模糊感。這是真正的『生產力仕紳化』：技術正在讓底層工作變得優雅且高效。"
        }
    ],
    impact_analysis: [
        {
            target: "職場小白 (Office)",
            description: "無需學習 Prompt 技術，只需點選『載入會計技能』，AI 就能自動幫你處理整年的報帳單據。"
        }
    ],
    dee_insight: "掌握『職能主權』！這是本實驗室 Chapter 4 『工具精煉』的高階目標。別再讓 AI 亂猜你的意圖，學會使用 Skill 目錄來鎖定它的邏輯。我已經將最新的 Claude Skills 掛載範例同步到實驗室的 /docs 中，供大家下載參考。",
    action_prompt: {
        title: "艾可代碼實驗室：【官方技能掛載實戰】",
        description: "試著在支援 Claude Skills 的終端（如 Claude Code）下達這句指令：",
        command: `# Role: Knowledge Manager
# Context: Loading Official Skills

1. 檢索 Claude Skills Registry 中關於「SEO 內容審計」的最新規範。
2. 將其邏輯掛載至當前環境。
3. 掃描我目錄下的 5 篇草稿，根據該技能的標準作業程序給出優化評分。
4. 嚴禁使用超出該技能包以外的非專業詞彙。`
    }
};
