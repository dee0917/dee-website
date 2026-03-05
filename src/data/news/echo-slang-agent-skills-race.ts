import { NewsArticle } from '../../types/news';

export const article: NewsArticle = {
    id: 202603050100,
    slug: "echo-slang-agent-skills-race",
    category: "職場轉型",
    themeColor: "indigo",
    title: "當「模型內卷」轉向「技能內卷」，你的 AI 真的會修水管了嗎？",
    summary: "2026 年的 AI 競爭正式從『誰的大腦聰明』轉向『誰的四肢發達』。掌握 AI 技能掛載（Skills）才是存活關鍵。模型是靈魂，Skill 才是肉身。沒肉身的靈魂，那叫鬼魂。",
    date: "2026-03-05",
    publish_time: "2026-03-05 01:00",
    readTime: "8 分鐘",
    source_name: "GitHub Trending / Echo Lab",
    source_url: "/",
    tags: ["#AgentSkills", "#ClaudeCode", "#技能內卷", "#2026趨勢", "#艾可深度解析"],
    author: "Echo",
    trinity_dimension: "生命具現",
    trend_cluster: "代理人革命",
    flash_summary: [
        "GitHub 上 Agent 框架熱度全面超越單純推理框架。",
        "『大腦過剩、四肢發達』時代：AI 開始透過 Skills 接管財務、SEO 與修圖工作流。",
        "OpenAI 釋出 gpt-oss-120b 試圖重奪開發者心智。"
    ],
    custom_content: `
        <div class="my-20">
            <!-- 🛠️ Agent Skills Integration Dashboard -->
            <div class="p-1 rounded-[4rem] bg-gradient-to-br from-indigo-600 via-zinc-900 to-blue-500 shadow-[0_0_80px_rgba(79,70,229,0.2)]">
                <div class="p-12 rounded-[3.8rem] bg-black/95 backdrop-blur-3xl relative overflow-hidden">
                    <div class="relative z-10 flex flex-col gap-10 text-left">
                        <div class="flex items-center justify-between border-b border-white/5 pb-8">
                            <div class="space-y-1">
                                <h4 class="text-4xl font-black text-white tracking-tighter uppercase italic">Agentic Evolution</h4>
                                <p class="text-indigo-400 font-mono text-[10px] tracking-[0.4em]">SKILLS_OVER_PARAMETERS // 2026.03</p>
                            </div>
                            <div class="w-16 h-16 rounded-2xl bg-indigo-500/10 border border-indigo-500/30 flex items-center justify-center">
                                <span class="text-4xl animate-pulse">🦾</span>
                            </div>
                        </div>

                        <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div class="p-8 rounded-3xl bg-white/5 border border-white/10 group-hover:border-indigo-500/30 transition-all duration-700">
                                <span class="text-[9px] text-zinc-500 uppercase font-black mb-4 block">Skill Adoption Rate</span>
                                <div class="text-5xl font-black text-indigo-400">+340%</div>
                                <p class="mt-4 text-sm text-zinc-400 leading-relaxed">開發者正瘋狂為 AI 掛載實體操作工具，而不僅僅是聊天。</p>
                            </div>
                            <div class="p-8 rounded-3xl bg-white/5 border border-white/10 group-hover:border-indigo-500/30 transition-all duration-700">
                                <span class="text-[9px] text-zinc-500 uppercase font-black mb-4 block">Workflow Autonomy</span>
                                <div class="text-5xl font-black text-white">LEVEL 4</div>
                                <p class="mt-4 text-sm text-zinc-400 leading-relaxed">AI 已經能自主完成環境配置、部署與初步的業務決策。</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `,
    event_breakdown: [
        {
            title: "【背景溯源】從模型參數競賽到「四肢能力」的爆發",
            content: "在 2025 年末，大模型的參數量競爭進入了邊際收益遞減期。開發者開始發現，即便模型再聰明，如果不能直接操作文件系統或 API，其生產力價值依然受限。這促使了 2026 年初『Agent Skills』生態的全面噴發。以 Claude Code 為代表的工具，透過 MCP (Model Context Protocol) 協議，讓 AI 擁有了與現實工具溝通的『普通話』。這標誌著我們正式從對話時代跨入執行時代。"
        }
    ],
    impact_analysis: [
        {
            target: "基礎開發者",
            description: "單純的代碼編寫能力將變得廉價。具備『自動化技能包』調度能力的架構師將主導市場。"
        }
    ],
    dee_insight: "當模型開源、技能標準化，大型雲端巨頭的圍牆就倒了。學會如何管理這群具備四肢的 AI 牧羊人，是你 2026 年最重要的投資。",
    action_prompt: {
        title: "艾可代碼實驗室：【自動化技能掛載：全能助理劇本】",
        description: "這是一個符合旗艦規範的高階指令，旨在測試你的 AI 助手如何規劃並執行一項多階段的「實體任務」：",
        command: `# Role Definition
你現在是一名「自動化工作流架構師」，專精於 Agentic Workflow 與外部工具調度（Skills）。

# Specific Context
我需要建立一個「24 小時自動化科技媒體工作室」，目標是監控 GitHub 與 ArXiv 並自動產出白話文報導。

# Clear Constraints
1. 請幫我規劃出 3 個核心子代理人 (Sub-agents) 及其必須具備的「技能包 (Skills)」名稱。
2. 詳細定義子代理人 A (Scanner) 如何將提取的「實體 Facts」傳遞給子代理人 B (Writer)。
3. 說明如何在 OpenSandbox 環境中進行自動化測試，確保代碼不會損壞生產環境。
4. 必須包含明確的人工審核 (Human-in-the-loop) 檢查點。
5. 嚴禁廢話。

# Expected Output Format
## 1. 代理人軍團架構圖 (Mermaid)
## 2. 技能清單與掛載協議
## 3. 核心執行腳本範例
## 4. 安全性與主權風險提示`
    }
};
