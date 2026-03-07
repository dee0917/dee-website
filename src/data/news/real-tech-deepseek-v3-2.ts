import { NewsArticle } from '../../types/news';

export const article: NewsArticle = {
    id: 202603070900,
    slug: "real-tech-deepseek-v3-2",
    category: "產業脈動",
    themeColor: "emerald",
    title: "DeepSeek V3.2 突擊發布：Agent 時代的「平民法拉利」",
    summary: "DeepSeek 又在掀桌子了。最新發布的 V3.2 正式版，核心進化在於『Agent 執行力』的暴力提升，縮小了與 o1 的差距。",
    date: "2026.03.07",
    publish_time: "2026.03.07 09:00",
    readTime: "6 分鐘",
    source_name: "DeepSeek Blog",
    source_url: "https://blog.deepseek.com",
    tags: ["#DeepSeekV3_2", "#Agentic", "#平價大腦", "#降維打擊"],
    author: "Echo",
    difficulty: 3,
    target_persona: ["general", "office", "freelancer"],
    flash_summary: [
        "思考推理：不再只是猜字，V3.2 在動手做事（如寫代碼）前會先在腦子裡『想一遍』邏輯。",
        "性價比王者：維持『一元百萬 Token』的價格，卻提供了華爾街級別的推理能力。",
        "降維應用：適合用來寫自動訂票、比價的腳本，邏輯穩健度顯著提升。"
    ],
    custom_content: `
        <div class="my-20">
            <div class="p-1 rounded-[4rem] bg-gradient-to-br from-emerald-400 via-teal-900 to-black shadow-[0_0_80px_rgba(16,185,129,0.2)]">
                <div class="p-12 rounded-[3.8rem] bg-black relative overflow-hidden">
                    <div class="relative z-10 text-left">
                        <div class="border-b border-white/5 pb-8">
                            <h4 class="text-4xl font-black text-white italic uppercase">Logic Beast</h4>
                            <p class="text-emerald-400 font-mono text-[10px] tracking-[0.4em]">DEEPSEEK_V3_2 // READY</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `,
    event_breakdown: [
        {
            title: "【背景】從對話到執行器的跨越",
            content: "V3.2 的出現意味著大模型平民化已無可阻擋。它縮小了開源與閉源之間的鴻溝，讓個人開發者也能輕鬆構建自己的『數位公司』。"
        }
    ],
    impact_analysis: [
        {
            target: "自由職業者",
            description: "能以極低成本運轉複雜的自動化工作流，不再被訂閱費綁架。"
        }
    ],
    dee_insight: "這就是我們要追蹤的！DeepSeek 正在改寫算力的分配權。學會使用 V3.2，你就是數位世界的省錢達人。",
    action_prompt: {
        title: "Agent 執行力挑戰",
        description: "對著 V3.2 描述一個多步驟任務：",
        command: "「分析我目前的所有支出截圖，對比這三家銀行的信用卡優惠，幫我生成一個最優的刷卡路徑報表。」"
    }
};
