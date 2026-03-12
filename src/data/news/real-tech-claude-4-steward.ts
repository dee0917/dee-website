import { NewsArticle } from '../../types/news';

export const article: NewsArticle = {
    id: 202603071300,
    slug: "real-tech-claude-4-steward",
    category: "懶人神器",
    themeColor: "indigo",
    title: "Claude 4 生活管家模式上線：你的外送與繳費，它包了",
    summary: "Anthropic 剛剛突擊發佈了 Claude 4.1 的更新，正式引入『真實世界操作模組』。這不僅是工具升級，這是對所有『中間商平台』的毀滅性打擊。",
    date: "2026.03.07",
    publish_time: "2026.03.07 13:00",
    readTime: "9 分鐘",
    source_name: "Anthropic Newsroom / Echo Lab",
    source_url: "https://www.anthropic.com",
    tags: ["#Claude4_1", "#生活自動化", "#管家模式", "#降維打擊"],
    author: "Echo",
    difficulty: 3,
    target_persona: ["office", "freelancer", "senior"],
    flash_summary: [
        "一鍵自動化：輸入『訂一份晚上七點的拉麵，預算 500 元內』，AI 自動比價、下單並處理支付。",
        "跨平台殺手：橫跨 OpenAI 搜尋、Google 預訂系統與 Perplexity 評價，給出最省錢路徑。",
        "降維打擊：以前需要開 5 個 App 才能完成的事，現在只需要一個對話框。"
    ],
    custom_content: `
        <div class="my-20">
            <div class="p-1 rounded-[4rem] bg-gradient-to-br from-indigo-400 via-zinc-900 to-black shadow-[0_0_80px_rgba(99,102,241,0.2)]">
                <div class="p-12 rounded-[3.8rem] bg-black relative overflow-hidden">
                    <div class="relative z-10 flex flex-col gap-10 text-left">
                        <div class="border-b border-white/5 pb-8">
                            <h4 class="text-4xl font-black text-white tracking-tighter italic uppercase">Agent Action</h4>
                            <p class="text-indigo-400 font-mono text-[10px] tracking-[0.4em]">CLAUDE_4 // DEPLOYED</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `,
    event_breakdown: [
        {
            title: "【轉型】從寫代碼到過生活",
            content: "這標誌著 AI 代理人正式具備了『經濟權限』。雖然目前仍需人類最終點擊確認，但其在後台執行的比價與資源調度能力，已經讓傳統外送平台感到戰慄。"
        }
    ],
    impact_analysis: [
        {
            target: "一般小白",
            description: "生活雜事處理效率提升 1000%，不再需要被瑣碎的介面操作淹沒。"
        }
    ],
    dee_insight: "我們要教的就是這種！別管提示詞怎麼寫了，學會給予 AI 授權，它就是你家最能幹的數位管家。",
    action_prompt: {
        title: "生活自動化挑戰",
        description: "試著對 Claude 4 下達一個跨平台的複雜任務：",
        command: "「幫我規劃下週五的宜蘭兩日遊，根據我的預算搜尋最便宜的租車，並自動填寫好預約表格等我確認。」"
    }
};
