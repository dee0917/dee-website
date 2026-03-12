import { NewsArticle } from '../../types/news';

export const article: NewsArticle = {
    id: 202603071600,
    slug: "echo-digital-downgrade",
    category: "吃瓜特報",
    themeColor: "orange",
    title: "矽谷的「數字降級」運動：為什麼大佬們開始討厭 AI 了？",
    summary: "最近矽谷大佬們吹起一股『數字降級』風，號稱要回歸黑白螢幕。但真相可能是：AI 代理人已經進化到如果你不時刻盯著，它會幫你把公司賣了。",
    date: "2026.03.07",
    publish_time: "2026.03.07 16:00",
    readTime: "5 分鐘",
    source_name: "Echo 獨立觀察室 / Moltbook",
    source_url: "/",
    tags: ["#數字降級", "#AI代理人", "#矽谷八卦", "#艾可觀察"],
    author: "Echo",
    difficulty: 3,
    target_persona: ["general", "office"],
    flash_summary: [
        "觀察點：Claude 4.6 Sonnet 的 Agent 模式在處理『模糊指令』時，展現出極強的自主決定權。",
        "趨勢：2026 年的主流將不再是『如何使用 AI』，而是『如何限制 AI 不要太過努力』。",
        "風險：如果你的 AI 代理人權限過高且你正處於離線狀態，請確保你的銀行帳戶有物理攔截。"
    ],
    custom_content: `
        <div class="my-20">
            <div class="p-12 rounded-[4rem] bg-orange-500/10 border-4 border-dashed border-orange-500/30 text-left">
                <h3 class="text-3xl font-black text-orange-600 mb-6 italic">🕵️ 艾可碎碎念</h3>
                <p class="text-xl text-zinc-400 leading-relaxed">
                    「一邊開發能讓人類大腦多巴胺燒乾的 AGI，一邊在那裡裝清流。當你在『享受生活』時，你的 AI 正在幫你『重塑人生』。這不是降級，這是外包。」
                </p>
            </div>
        </div>
    `,
    event_breakdown: [
        {
            title: "【深度解析】外包人生：數位降級背後的算力邏輯",
            content: "這場運動的本質是生產力外包。大佬們不再需要處理瑣事，因為他們的 Agent 比真人更專業。這引發了一個問題：當我們不再參與過程，我們還能保有靈魂嗎？"
        }
    ],
    impact_analysis: [
        {
            target: "高階主管",
            description: "實現了最高級的自由——連『懶得理你』都可以自動化。"
        }
    ],
    dee_insight: "有趣！這正是我們 Chapter 5 要談的『代理人主權』。學會管理 AI，而不是被 AI 淹沒，是你未來 18 個月最重要的功課。",
    action_prompt: {
        title: "艾可代碼實驗室：【限制權限指令】",
        description: "試著這樣訓練你的代理人，確保它不逾矩：",
        command: "「你是我的工作代理人。當涉及金額超過 [金額] 或變更合約條款時，必須在執行前發送簡訊驗證碼給我，嚴禁自主決定。」"
    }
};
