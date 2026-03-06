import { NewsArticle } from '../../types/news';

export const article: NewsArticle = {
    id: 202603051210,
    slug: "tutorial-parent-ai-tutor",
    category: "數位家教",
    themeColor: "pink",
    title: "【2星難度】拒絕電子奶嘴！教家長把 AI 變成「不給答案」的超強伴讀員",
    summary: "擔心小孩只會叫 AI 寫作業？這篇教您如何設定「伴讀模式」，讓 AI 變成一個會引導思考、但不直接給答案的高手家教。適合所有想讓孩子學好 AI 但不學壞的家長。",
    date: "2026-03-05",
    publish_time: "2026-03-05 12:10",
    readTime: "5 分鐘",
    source_name: "Dee's Life Lab - 親子實驗室",
    source_url: "/",
    tags: ["#家長必看", "#親子教育", "#引導思考", "#拒絕作弊", "#2星難度"],
    author: "Echo",
    difficulty: 2,
    target_persona: ["parent"],
    flash_summary: [
        "反轉作弊：教您設定指令，讓 AI 絕對不直接說出答案。",
        "引導提問：AI 會根據小孩的錯誤，像蘇格拉底一樣問問題帶領小孩思考。",
        "進度追蹤：家長可以隨時查看 AI 與小孩的對話紀錄，掌握學習盲點。"
    ],
    custom_content: `
        <div class="my-16">
            <div class="bg-gradient-to-br from-pink-50 to-white p-12 rounded-[4rem] border-2 border-pink-200 shadow-xl">
                <h3 class="text-3xl font-black text-pink-600 mb-8 italic">👩‍🏫 媽媽的心聲：我們不只要快，還要深</h3>
                <div class="space-y-6">
                    <div class="p-6 bg-white rounded-3xl border border-pink-100 shadow-sm">
                        <p class="text-pink-500 font-bold mb-2">❌ 錯誤用法 (電子奶嘴)：</p>
                        <p class="text-zinc-600 italic">「幫我寫出這題數學題的答案。」</p>
                    </div>
                    <div class="p-6 bg-emerald-50 rounded-3xl border border-emerald-100 shadow-sm">
                        <p class="text-emerald-600 font-bold mb-2">✅ 高手用法 (智慧家教)：</p>
                        <p class="text-zinc-700 font-medium italic">「我是一個小學五年級學生。請不要直接給我答案，請扮演一個有耐心的老師，問我問題來引導我解開這題數學。」</p>
                    </div>
                </div>
            </div>
        </div>
    `,
    event_breakdown: [
        {
            title: "家長的恐懼：AI 會讓小孩變懶嗎？",
            content: "事實上，AI 可能是人類史上最有耐心的老師。關鍵在於您給它的「初始指令 (Prompt)」。如果您把它設定為『引導者』，它能比家長更有耐心地解釋同一個觀點十遍，而且不會發脾氣。這就是我們 2 星教學的核心：學會如何「管理」AI 的角色。"
        }
    ],
    impact_analysis: [
        {
            target: "孩子認知發展",
            description: "從小練習如何向 AI 提問，培養邏輯思考而非死記硬背。"
        }
    ],
    dee_insight: "這篇寫得好！家長的痛點抓得很準。這正是我們實驗室 Ch.3 親子互動章節的核心心法。",
    action_prompt: {
        title: "家長專屬：AI 家教初始化指令",
        description: "請把這段話貼給 AI，然後再讓孩子開始問問題：",
        command: "「從現在起，你是我孩子的 24 小時伴讀員。當他問你問題時，請先檢查他理解到哪裡，用引導提問的方式幫助他，絕對不能直接給出答案或完整文章，除非我再次同意。」"
    }
};
