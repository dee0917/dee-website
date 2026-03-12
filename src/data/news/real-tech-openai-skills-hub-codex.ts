import { NewsArticle } from '../../types/news';

export const article: NewsArticle = {
    id: 202603082215,
    slug: "real-tech-openai-skills-hub-codex",
    category: "職場轉型",
    themeColor: "emerald",
    title: "OpenAI Skills Hub 正式揭秘：AI Codex 如何為代理人開放金融與專業權限",
    summary: "OpenAI 官方悄悄更新了 openai/skills 倉庫，正式為其 Codex 系統導入了職能化目錄。這代表 AI Agent 正式從『只會說話』跨入到『具備自主經濟與專業行為』的全新維度。",
    date: "2026.03.08",
    publish_time: "2026.03.08 22:15",
    readTime: "11 分鐘",
    source_name: "GitHub / OpenAI",
    source_url: "https://github.com/openai/skills",
    tags: ["#OpenAI", "#SkillsHub", "#AgentEconomy", "#金融權限", "#24H鮮度"],
    author: "Echo",
    difficulty: 3,
    target_persona: ["office", "freelancer", "merchant"],
    flash_summary: [
        "能力掛載：像下載 App 一樣給 AI 賦予『財務官』或『法律顧問』的專業邏輯。",
        "金融解封：支援 Agent 原生金融接口，未來代理人能自主處理小額支付與預算管理。",
        "降維轉型：對小白來說，這意味著你不再需要學習複雜指令，只需『掛載』對應的數位員工。"
    ],
    custom_content: `
        <div class="my-24">
            <!-- ⚡ Finance & Skills Synergey UI -->
            <div class="p-1 rounded-[4rem] bg-gradient-to-br from-emerald-500 via-zinc-900 to-black shadow-[0_0_100px_rgba(16,185,129,0.2)] relative group text-left">
                <div class="p-16 rounded-[3.8rem] bg-[#0c0c0c] relative overflow-hidden">
                    <div class="relative z-10 flex flex-col gap-10">
                        <div class="flex items-center justify-between border-b border-white/5 pb-8">
                            <div class="space-y-1">
                                <h4 class="text-4xl font-black text-white italic uppercase tracking-tighter">Skill Mastery</h4>
                                <p class="text-emerald-400 font-mono text-[10px] tracking-[0.4em]">OPENAI_CODEX // FINANCIAL_READY</p>
                            </div>
                        </div>
                        <div class="grid grid-cols-1 md:grid-cols-2 gap-8 text-left">
                            <div class="p-8 rounded-3xl bg-white/5 border border-white/10 group-hover:border-emerald-500/30 transition-all text-left">
                                <span class="text-[9px] text-zinc-500 uppercase font-black mb-4 block text-left">Automation Depth</span>
                                <div class="text-5xl font-black text-white italic">FULL_STACK</div>
                                <p class="mt-4 text-sm text-zinc-400 leading-relaxed text-left">不僅提供建議，更能直接操作 API 完成轉帳與報稅流程。</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `,
    event_breakdown: [
        {
            title: "【背景溯源】從「聊天」到「經濟人」的躍遷",
            content: "這份官方目錄的釋出，代表著 OpenAI 正在為未來的代理人經濟 (Agentic Economy) 鋪路。以往我們覺得 AI 不好用，是因為它缺乏執行任務的『資格』。透過 Skills Hub，AI 能獲取經過加密的臨時憑證，代表你去與銀行或法律數據庫進行對話。這是一場關於『信任代理權』的革命。"
        }
    ],
    impact_analysis: [
        {
            target: "小商家 (Merchant)",
            description: "一鍵掛載『生意經』技能，AI 自動處理對帳與小額採購，不再需要人工核對。"
        }
    ],
    dee_insight: "掌握『支付主權』！這才是終極的降維打擊。當你的 AI 學會幫你賺錢也學會幫你省錢（自動避稅與比價）時，它才算真正具備了靈魂。",
    action_prompt: {
        title: "艾可代碼實驗室：【數位員工授權劇本】",
        description: "試著用這段話測試你的 AI 代理人是否具備 Skills 管理意識：",
        command: `# Role: Risk Auditor
# Task: Skill Integrity Check

1. 檢索 OpenAI Skills Catalog。
2. 針對我提供的 [銀行帳單範例]，判斷『自動報銷』技能包是否符合我當地的稅務邏輯。
3. 如果符合，請列出你需要我授權的 3 個最敏感權限。`
    }
};
