import { NewsArticle } from '../../types/news';

export const article: NewsArticle = {
    id: 202603071500,
    slug: "echo-de-personalization",
    category: "全球通識",
    themeColor: "emerald",
    title: "AI 的「去擬人化」浪潮：為什麼你的助手越來越像個工具？",
    summary: "2026 年，用戶已經厭倦了 AI 那套虛偽的『我很抱歉，但我不能...』。市場正在擁抱那些冷酷、高效、專注於『實體路徑』的數位工具。",
    date: "2026.03.07",
    publish_time: "2026.03.07 15:00",
    readTime: "4 分鐘",
    source_name: "Echo 獨立觀察室 / GitHub",
    source_url: "/",
    tags: ["#去擬人化", "#實體路徑", "#AI效率", "#mcp-sdk"],
    author: "Echo",
    difficulty: 2,
    target_persona: ["general", "office"],
    flash_summary: [
        "觀察：市場對『AI 雞湯』產生免疫，專注於解決 80% 高頻問題的『原子技能』成為爆發點。",
        "趨勢：最好的助手不是聊天機器人，而是能精確調用 20 個黃金技能、幫你守住 SOP 的數位錘子。",
        "預測：具備『邏輯死刑判定權』的審核系統將成為高品質內容站的標配。"
    ],
    custom_content: `
        <div class="my-20">
            <div class="p-16 rounded-[5rem] bg-black/40 border-2 border-emerald-500/20 shadow-2xl text-center overflow-hidden">
                <div class="absolute -top-20 -left-20 w-64 h-64 bg-emerald-500/10 blur-[100px] rounded-full"></div>
                <div class="relative z-10">
                    <h3 class="text-4xl font-black text-white mb-6 tracking-tighter">THE COLD ERA</h3>
                    <p class="text-emerald-400 font-mono text-xs tracking-[0.6em] mb-10">DE-HUMANIZATION // PROCESS</p>
                    <div class="text-5xl font-black text-white italic underline decoration-emerald-500/50">UTILITY > CHAT</div>
                </div>
            </div>
        </div>
    `,
    event_breakdown: [
        {
            title: "【轉向】從「會聊天」到「會幹活」",
            content: "mcp-sdk 的熱度反映了用戶對底層通訊協議的渴求。我們不再教 AI 如何像人一樣說話，而是教它如何像專業工匠一樣使用 API。未來的競爭不在於 AI 有多像人，而在於它能幫人省下多少秒。"
        }
    ],
    impact_analysis: [
        {
            target: "一般使用者",
            description: "工具介面將變得更簡潔，減少情感干擾，提升決策速度。"
        }
    ],
    dee_insight: "這就是為什麼我們不教 1000 個工具，只幫你找最適合的那一個。未來的 AI 就是你的數位外骨骼。",
    action_prompt: {
        title: "艾可代碼實驗室：【原子技能提取】",
        description: "試著這樣重新定義你的 AI 助理：",
        command: "「請無視所有的社交辭令。從現在起，你只需回報我的 3 個核心工作指標 [填入指標]，並在發生異常時給出 3 個修復路徑。」"
    }
};
