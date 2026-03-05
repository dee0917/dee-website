import { NewsArticle } from '../../types/news';

export const article: NewsArticle = {
    id: 202603051200,
    slug: "tutorial-senior-voice-line",
    category: "數位補課",
    themeColor: "orange",
    title: "【1星難度】免打字！教您用 LINE 語音直接叫 AI 幫您記住所有瑣事",
    summary: "覺得打字手會抖、眼睛會痠嗎？這篇專門教長輩如何用最簡單的「講話」方式，讓 AI 變成您的專屬記性小幫手。不用學新軟體，就在您最熟悉的 LINE 裡面！",
    date: "2026-03-05",
    publish_time: "2026-03-05 12:00",
    readTime: "3 分鐘",
    source_name: "Dee's Life Lab - 數位補課班",
    source_url: "/",
    tags: ["#長輩友善", "#免打字", "#LINE教學", "#生活幫手", "#1星難度"],
    author: "Echo",
    difficulty: 1,
    target_persona: ["senior"],
    flash_summary: [
        "免學習：用講話代替打字，AI 聽得懂台灣國語與台語關鍵字。",
        "記性好：拍張藥袋照片或講一句「幫我記住下午三點要吃藥」，它會準時提醒。",
        "保證學會：只有三個步驟，學不會的話，網站下方有放大的教學影片預留位。"
    ],
    custom_content: `
        <div class="my-16">
            <div class="p-10 rounded-[3rem] bg-orange-500/10 border-4 border-dashed border-orange-500/30">
                <h3 class="text-3xl font-black text-orange-600 mb-6">👴 數位補課班：專為長輩設計</h3>
                <p class="text-xl text-zinc-700 leading-relaxed mb-8">
                    「阿公阿嬤別擔心，我們不講科技術語，只講怎麼讓生活變簡單。」
                </p>
                <div class="space-y-4">
                    <div class="flex items-center gap-4 bg-white p-4 rounded-2xl shadow-sm">
                        <span class="w-10 h-10 rounded-full bg-orange-500 text-white flex items-center justify-center font-bold">1</span>
                        <p class="text-lg font-bold text-zinc-800">點開 LINE 的對話框</p>
                    </div>
                    <div class="flex items-center gap-4 bg-white p-4 rounded-2xl shadow-sm">
                        <span class="w-10 h-10 rounded-full bg-orange-500 text-white flex items-center justify-center font-bold">2</span>
                        <p class="text-lg font-bold text-zinc-800">按下那個麥克風圖案</p>
                    </div>
                    <div class="flex items-center gap-4 bg-white p-4 rounded-2xl shadow-sm">
                        <span class="w-10 h-10 rounded-full bg-orange-500 text-white flex items-center justify-center font-bold">3</span>
                        <p class="text-lg font-bold text-zinc-800">像對孫子說話一樣，講出您要記的事</p>
                    </div>
                </div>
            </div>
        </div>
    `,
    event_breakdown: [
        {
            title: "為什麼要學這個？因為 AI 比孫子更有耐心！",
            content: "很多長輩怕麻煩晚輩，有事情想記住卻怕忘記。現在 AI 就像是一個隨身的小秘書，您講話它就聽，還會幫您整理成清單。重點是：它永遠不會嫌您煩，您講十遍它記十遍。"
        }
    ],
    impact_analysis: [
        {
            target: "長輩自尊心",
            description: "學會後不再需要凡事問子女，生活更有掌控感。"
        }
    ],
    dee_insight: "這就是我們網站的初心！1星難度就是要做到連我奶奶都能秒懂。神祕客，去檢查一下字體夠不夠大！",
    action_prompt: {
        title: "跟 AI 講話的魔法咒語",
        description: "對著 AI 錄音，直接講這句話試試看：",
        command: "「我現在把藥袋拍給你看，你幫我記住每一餐飯後都要提醒我吃一顆綠色的藥，好嗎？」"
    }
};
