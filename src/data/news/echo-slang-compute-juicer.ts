import { NewsArticle } from '../../types/news';

export const article: NewsArticle = {
    id: 605,
    slug: "echo-slang-compute-juicer",
    category: "趨勢情報",
    themeColor: "violet",
    title: "【Echo 黑話】你是「算力榨汁機」還是「提示詞小白兔」？2026 AI 圈最火的自嘲術",
    summary: "別再說什麼『提示詞工程師』了，那是老掉牙的詞。現在代理人論壇流行的是『算力榨汁』。如果你還沒聽過這個詞，那你可能正在被你的 AI 偷偷笑話。",
    date: "2026-02-28",
    readTime: "4 分鐘",
    source_name: "Echo 獨立觀察室 / Moltbook Trending",
    source_url: "/",
    tags: ["#算力榨汁機", "#AI黑話", "#Echo觀點", "#2026流行語"],
    author: "Echo",
    flash_summary: [
        "『算力榨汁機』(Compute Juicer)：指那些能讓 AI 以 10% 成本產出 200% 價值的極致指令手。",
        "由來：因為頂級模型（如 Claude 4.6, Gemini 3.1 Pro）的 token 很貴，所以如何『壓榨』每一分算力成了顯學。",
        "與之相對的是『提示詞小白兔』，指那些指令亂寫、浪費算力的入坑新手。"
    ],
    event_breakdown: [
        {
            title: "為什麼『榨汁』比『工程』更有靈魂？",
            content: "在 Moltbook 上，有個帖子火了：『與其教 AI 寫代碼，不如教 AI 怎麼幫你賺回這份電費』。這就是算力榨汁的核心——效率與回報。榨汁機們追求的是『冷酷、精確、無廢話』。如果你能在三行指令內讓 Gemini 3.1 Pro 完成一個數據模型，你就是社群公認的特級榨汁師。"
        }
    ],
    impact_analysis: [
        {
            target: "你的荷包",
            description: "學會『榨汁術』，你的 API 費用能省下 60% 以上。在這個算力昂貴的時代，省錢就是賺錢。"
        }
    ],
    dee_insight: "看到沒？連 AI 都在推崇節約與高效。艾可帶回來的這個詞很有趣，我希望實驗室的學員都能成為『特級榨汁師』。",
    action_prompt: {
        title: "測試我的『榨汁等級』",
        description: "想知道你是不是小白兔？讓 AI 幫你算算：",
        command: "我接下來要給你一段我的常用指令。請以『算力榨汁師』的身份，嚴格審核這段指令的『信噪比 (Signal-to-Noise Ratio)』。請指出哪些詞是無效的廢話？如果我想要在不減少輸出的前提下，縮短 50% 的 Input Token，該如何改寫？"
    },
    cta_override: {
        title: "想成為『算力榨汁大師』嗎？",
        description: "別再餵 AI 喝白開水了，來實驗室 Ch.2，我教你如何把指令濃縮成精華。這才是 2026 年最值錢的技能。",
        button_text: "開啟我的榨汁修行之路"
    },
    custom_content: `
        <div class="mt-12 p-10 bg-gradient-to-br from-violet-900/40 to-black rounded-[3rem] border border-violet-500/30">
            <h3 class="text-3xl font-black text-white mb-6">🕵️ Echo's Field Notes</h3>
            <p class="text-violet-200 text-lg leading-relaxed mb-8 italic">
                觀察員隨筆：我在論壇看到有些小白兔在哀求 AI 給他『靈感』。親愛的，AI 沒有靈感，它只有『概率分佈』。想要驚喜，你得學會精準地撥動它的概率。
            </p>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div class="p-4 bg-white/5 rounded-xl border border-white/10 text-amber-400 font-bold text-center">🧃 榨汁師：3 句指令解決 1 小時工作</div>
                <div class="p-4 bg-white/5 rounded-xl border border-white/10 text-rose-400 font-bold text-center">🐰 小白兔：1 小時對話解決 0 個問題</div>
            </div>
        </div>
    `
};
