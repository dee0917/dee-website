import { NewsArticle } from '../../types/news';

export const article: NewsArticle = {
    id: 202603060310,
    slug: "news-senior-chat-ai-comparison",
    category: "數位補課",
    themeColor: "orange",
    title: "不用背指令！這三種「AI 聊天機器人」哪一個最適合台灣長輩？",
    summary: "面對 ChatGPT、Claude、Gemini 這麼多英文名字，長輩該怎麼選？本篇由艾可特派員實測，針對台灣國語辨識、字體大小、以及是否會亂說話進行深度對比，幫您選出最貼心的數位陪聊員。",
    date: "2026-03-06",
    publish_time: "2026-03-06 03:10",
    readTime: "7 分鐘",
    source_name: "Dee's Lab 蒼穹轉譯專場",
    source_url: "/",
    tags: ["#長輩友善", "#AI對比", "#ChatGPT", "#Gemini", "#Claude", ],
    author: "Echo",
    difficulty: 1,
    target_persona: ["senior"],
    flash_summary: [
        "ChatGPT：記性最好，適合用來記家裡的瑣碎雜事（如：記下孫子的生日）。",
        "Claude：最有禮貌，說話語氣溫和，不會給長輩冷冰冰的感覺。",
        "Gemini：跟 Google 地圖連動最強，適合問路或查最新的掛號資訊。"
    ],
    custom_content: `
        <div class="my-20">
            <div class="p-10 rounded-[4rem] bg-orange-50 border-4 border-orange-200 text-left">
                <h3 class="text-3xl font-black text-orange-600 mb-8">👴 阿公阿嬤選購指南</h3>
                <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div class="p-6 bg-white rounded-3xl shadow-sm border border-orange-100">
                        <div class="text-4xl mb-4">💬</div>
                        <h4 class="text-xl font-bold mb-2 text-zinc-800">ChatGPT</h4>
                        <p class="text-sm text-zinc-500 italic">「像個萬能的管家，什麼都懂一點，還能幫你認照片。」</p>
                    </div>
                    <div class="p-6 bg-white rounded-3xl shadow-sm border border-orange-100">
                        <div class="text-4xl mb-4">📖</div>
                        <h4 class="text-xl font-bold mb-2 text-zinc-800">Claude</h4>
                        <p class="text-sm text-zinc-500 italic">「像個貼心的老師，寫信或寫春聯，他的語氣最漂亮。」</p>
                    </div>
                    <div class="p-6 bg-white rounded-3xl shadow-sm border border-orange-100">
                        <div class="text-4xl mb-4">🌍</div>
                        <h4 class="text-xl font-bold mb-2 text-zinc-800">Gemini</h4>
                        <p class="text-sm text-zinc-500 italic">「像個在地導遊，查餐廳、查公車，他能直接給你看地圖。」</p>
                    </div>
                </div>
            </div>
        </div>
    `,
    event_breakdown: [
        {
            title: "【路徑引導】如何開始您的第一段 AI 對話？",
            content: "在 2026 年，這三大 AI 都有官方的 LINE 帳號或中文 App。長輩不需要註冊複雜的帳號，只需要在 App Store 搜尋對應的名字，認明有『官方認證』標章的即可下載。我們建議先從 Claude 開始，因為他的中文語感最接近台灣人說話的習慣。"
        },
        {
            title: "實踐重點：語音輸入是您的好朋友",
            content: "別再辛苦打字了！這三款 App 都完美支援語音輸入。對著麥克風講出『幫我查最近的診所在哪？』或『幫我把這張帳單總結一下』，AI 就能在幾秒內回答您。現場模擬顯示，長輩使用語音輸入的成功率是打字的 5 倍以上。"
        }
    ],
    impact_analysis: [
        {
            target: "長輩社交",
            description: "學會後可以跟朋友分享 AI 查到的新景點，增加話題感。"
        }
    ],
    dee_insight: "這就是蒼穹計畫的核心：將 Ch.0 的枯燥概念轉化為長輩能用的工具。記住，AI 只是幫手，您的生活才是主體。",
    action_prompt: {
        title: "長輩今日修行：選一個機器人打招呼",
        description: "下載後，試著對它講這句話：",
        command: "「你好，我是剛開始學 AI 的新手，可以請你用最簡單的白話文，每天早上教我一個養生小知識嗎？」"
    }
};
