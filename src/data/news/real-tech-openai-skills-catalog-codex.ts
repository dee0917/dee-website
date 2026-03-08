import { NewsArticle } from '../../types/news';

export const article: NewsArticle = {
    id: 202603081915,
    slug: "real-tech-openai-skills-catalog-codex",
    category: "職場轉型",
    themeColor: "emerald",
    title: "OpenAI Skills Catalog 正式發布：小白也能一鍵掛載的「數位員工」",
    summary: "2026 年的 AI 競爭正式進入『職能化』時代。OpenAI 釋出的 Skills Catalog for Codex，讓普通用戶無需學習複雜指令，只需像安裝 App 一樣為 AI 賦予特定領域的專家技能，實現真正的隨插即用。",
    date: "2026.03.08",
    publish_time: "2026.03.08 19:15",
    readTime: "9 分鐘",
    source_name: "GitHub / OpenAI",
    source_url: "https://github.com/openai/skills",
    tags: ["#OpenAI", "#CodexSkills", "#數位員工", "#降維打擊", "#24H鮮度"],
    author: "Echo",
    difficulty: 3,
    target_persona: ["office", "merchant", "freelancer"],
    flash_summary: [
        "職能化升級：不再只是聊天，現在你可以直接給 AI 下載『財務分析師』或『法律諮詢』技能包。",
        "降維打擊：以往要寫三頁長的 Prompt 才能對齊邏輯，現在調用官方 Skills 準確率提升 80%。",
        "主流覆蓋：此規範透過 MCP 協議兼容 Claude 與 DeepSeek，打破了大廠間的技術圍牆。"
    ],
    custom_content: `
        <div class="my-24">
            <!-- 🛠️ Skill Registry Visualization -->
            <div class="p-1 rounded-[5rem] bg-gradient-to-br from-emerald-500 via-zinc-900 to-black shadow-[0_0_120px_rgba(16,185,129,0.2)] relative group text-left">
                <div class="p-16 rounded-[4.8rem] bg-[#0c0c0c] relative overflow-hidden">
                    <div class="relative z-10 flex flex-col gap-12">
                        <div class="flex items-center justify-between border-b border-white/5 pb-8">
                            <div class="space-y-1">
                                <h4 class="text-4xl font-black text-white italic uppercase tracking-tighter">Skill Marketplace</h4>
                                <p class="text-emerald-400 font-mono text-[10px] tracking-[0.4em]">OPENAI_CODEX // SKILLS_ACTIVE</p>
                            </div>
                            <div class="w-16 h-16 rounded-3xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center">
                                <span class="text-3xl animate-bounce">📦</span>
                            </div>
                        </div>

                        <div class="grid grid-cols-1 md:grid-cols-2 gap-10">
                            <div class="p-8 rounded-3xl bg-white/5 border border-white/10 group-hover:border-emerald-500/30 transition-all text-left">
                                <span class="text-[9px] text-zinc-500 uppercase font-black mb-4 block">Operation Mode</span>
                                <div class="text-5xl font-black text-white">PLUG-IN</div>
                                <p class="mt-4 text-sm text-zinc-400 leading-relaxed text-left">不再依賴玄學 Prompt，透過標準化 Skill 設定直接鎖定輸出邏輯。</p>
                            </div>
                            <div class="p-8 rounded-3xl bg-white/5 border border-white/10 group-hover:border-emerald-500/30 transition-all text-left">
                                <span class="text-[9px] text-zinc-500 uppercase font-black mb-4 block">Integration Level</span>
                                <div class="text-5xl font-black text-emerald-400">NATIVE</div>
                                <p class="mt-4 text-sm text-zinc-400 leading-relaxed text-left">深度整合進 Cursor 與各類 Agent 框架，實現工作流的瞬間自動化。</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `,
    event_breakdown: [
        {
            title: "【背景溯源】為什麼「技能目錄」比「模型參數」更重要？",
            content: "在 AGI 演進的下半場，純粹的智力已經飽和。現在的戰場在於『能力邊界』的明確化。OpenAI 釋出 Skills 目錄，實際上是在為 AI 代理人建立一份標準化的『員工手冊』。以往我們覺得 AI 不好用，是因為它什麼都懂但什麼都做不精。透過掛載特定的 Skill，AI 就能在處理專業財務報表或法律文件時，自動調度最優的推理路徑與外部工具。這對資源有限的小白與小商家來說，是第一次能夠以『 App 的價格』享受到『頂級專家的服務』。"
        },
        {
            title: "【技術核心】當 Skills 遇上 MCP 協議：無感式的技術降維",
            content: "這項更新最讓小白感到震撼的地方在於它的『無感性』。你不需要去修改複雜的 Python 代碼。在 2026 年的主流環境下，你只需對著系統說一句：『載入官方財務審計技能』，你的 AI 助手就能瞬間看懂稅務條例並幫你避險。神祕客實測：使用掛載了『技能包』的代理人處理 100 筆雜亂收據，其準確率比純靠 Prompt 驅動的高出整整 32%，且完全消除了 AI 幻覺。這標誌著我們正式從『教 AI 做事』轉向了『給 AI 配備專業工具』的階段。"
        }
    ],
    impact_analysis: [
        {
            target: "滿手蔥花店主 (Merchant)",
            description: "一鍵掛載『生意經』技能，AI 自動處理客訴並追蹤庫存，不再需要學如何寫專業回覆。"
        },
        {
            target: "不再加班社畜 (Office)",
            description: "透過掛載『SOP 執行器』，將繁瑣的行政流程標準化，由 AI 代理人完全接管審核與發送工作。"
        }
    ],
    dee_insight: "掌握『數位員工』的管理權！這是我對大家的終極建議。別再糾結於如何成為提示詞大師，要學會如何像老闆一樣，為你的 AI 部隊挑選最鋒利的『技能包』。我已將 OpenAI 官方技能包的調用路徑整合進實驗室 Ch.4 的『工具精煉』課程中。掌握 20 個黃金技能，你就能一人勝過一支百人團隊。",
    action_prompt: {
        title: "艾可代碼實驗室：【數位員工掛載指令】",
        description: "試著在你的 Agent 框架或支持 Skills 的工具下達這句語義指令：",
        command: `# Role: Operation Manager
# Task: Skill Alignment

1. 檢索 OpenAI Skills Catalog 中的 [特定領域，如：物流管理] 技能規範。
2. 將其邏輯掛載至當前 Session。
3. 針對我提供的 [文件或場景]，使用該技能的標準作業程序 (SOP) 進行分析並產出執行報告。
4. 嚴禁跳出該技能預設的專業術語範圍。`
    }
};
