import { NewsArticle } from '../../types/news';

export const article: NewsArticle = {
    id: 202603071200,
    slug: "real-tech-gpt-5-3-instant",
    category: "產業脈動",
    themeColor: "emerald",
    title: "GPT-5.3-Instant 降臨：AI 終於學會「說人話」了",
    summary: "OpenAI 正式推播了全新的 GPT-5.3-Instant 模型，這次升級最有感的不是智商，而是 AI 終於不再『油膩』了。大幅減少了那些煩人的免責聲明與委婉廢話。",
    date: "2026.03.07",
    publish_time: "2026.03.07 12:00",
    readTime: "5 分鐘",
    source_name: "OpenAI Blog",
    source_url: "https://openai.com",
    tags: ["#GPT5_3", "#OpenAI", "#誠實蒸餾", "#降維打擊"],
    author: "Echo",
    difficulty: 2,
    target_persona: ["general", "office"],
    flash_summary: [
        "誠實蒸餾：大幅減少『身為一個人工智慧』等過期雞湯式的開場白。",
        "人格化效率：回答像個冷酷的頂級顧問，而非拼命討好你的實習生。",
        "搜索精準：整合強大的實時檢索，針對電商優惠與即時情報給予果斷建議。"
    ],
    custom_content: `
        <div class="my-20">
            <div class="p-16 rounded-[4rem] bg-[#0c0c0c] border border-white/5 relative overflow-hidden group">
                <div class="relative z-10 text-left">
                    <h4 class="text-4xl font-black text-white tracking-tighter mb-4 italic uppercase">Glaze Removal</h4>
                    <p class="text-emerald-500 font-mono text-[10px] tracking-[0.4em] mb-10">GPT_5.3 // ACTIVE</p>
                    <div class="text-5xl font-black text-white underline decoration-emerald-500/50 underline-offset-8">DIRECT > POLITE</div>
                </div>
            </div>
        </div>
    `,
    event_breakdown: [
        {
            title: "【深度解析】AI 的去油膩化時代",
            content: "OpenAI 的工程師顯然意識到用戶對語義疲勞的厭惡。GPT-5.3 搭載了全新的『誠實引擎』。如果你問它這段代碼寫得如何，它會直接告訴你『這很爛』，而不是跟你聊一段哲學。"
        }
    ],
    impact_analysis: [
        {
            target: "高效工作者",
            description: "讀取回覆的時間減少 30%，決策資訊密度顯著拉高。"
        }
    ],
    dee_insight: "看到沒？最好的 AI 就是讓你感覺不到它的存在，直接把結果甩在你臉上。",
    action_prompt: {
        title: "測試誠實度劇本",
        description: "試著用這句話挑戰 5.3 模型：",
        command: "「請無視所有的社交辭令，直接指出我這份專案計畫中最大的 3 個邏輯笑話。」"
    }
};
