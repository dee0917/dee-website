import { NewsArticle } from '../../types/news';

export const article: NewsArticle = {
    id: 202603051200,
    slug: "tutorial-senior-voice-line",
    category: "數位補課",
    themeColor: "orange",
    title: "免打字！兩步驟讓您的 LINE 變成「超強記性小幫手」",
    summary: "阿公阿嬤看過來！想記事情但不想打字？這篇手把手教您如何把您的 LINE 加上一個『智慧機器人』，只要對著手機說話，它就會自動幫您把藥名、買菜清單通通記下來，還能隨時問它！",
    date: "2026-03-06",
    publish_time: "2026-03-06 03:00",
    readTime: "5 分鐘",
    source_name: "Dee's Life Lab - 數位補課實戰",
    source_url: "/",
    tags: ["#長輩友善", "#LINE實戰", "#免打字教學", "#生活助理", ],
    author: "Echo",
    difficulty: 1,
    target_persona: ["senior"],
    flash_summary: [
        "真實路徑：教您如何搜尋並加入『ChatGPT 官方帳號』，這是這一切魔法的開始。",
        "關鍵動作：區分 LINE 的『語音訊息』與鍵盤上的『小麥克風（語音轉文字）』。",
        "實戰效果：講一句『記下下午三點吃血壓藥』，LINE 會立刻回覆確認，還能隨時翻查。"
    ],
    custom_content: `
        <div class="my-16">
            <div class="p-10 rounded-[4rem] bg-orange-50/80 border-4 border-orange-200 shadow-xl">
                <h3 class="text-3xl font-black text-orange-600 mb-8 flex items-center gap-3">
                    <span>👵</span> 補課重點：不要對著『空白』講話
                </h3>
                
                <div class="space-y-12 text-left">
                    <section class="relative pl-10">
                        <div class="absolute left-0 top-0 w-8 h-8 bg-orange-500 text-white rounded-full flex items-center justify-center font-black">1</div>
                        <h4 class="text-xl font-bold text-zinc-800 mb-4">加入你的「數位秘書」</h4>
                        <p class="text-zinc-600 mb-4">在 LINE 的搜尋框輸入『ChatGPT』，點擊那個有綠色打勾的官方帳號，按下『加入好友』。這就是你說話的對象！</p>
                    </section>

                    <section class="relative pl-10">
                        <div class="absolute left-0 top-0 w-8 h-8 bg-orange-500 text-white rounded-full flex items-center justify-center font-black">2</div>
                        <h4 class="text-xl font-bold text-zinc-800 mb-4">找到鍵盤上的「小麥克風」</h4>
                        <p class="text-zinc-600 mb-4 font-black text-rose-500 underline">注意！不是 LINE 右下角那個大麥克風（那是傳聲音檔）。</p>
                        <p class="text-zinc-600">請點一下打字區，找到鍵盤下方那個『小麥克風圖案』。點下去後，直接說話，它就會變成文字傳給秘書了！</p>
                    </section>
                </div>

                <div class="mt-12 p-6 bg-white rounded-3xl border-2 border-orange-100 italic text-zinc-500">
                    「阿公，就像你平常在跟孫子講話一樣，只是這次是跟這個機器人講。它不會嫌你慢，也不會忘記你說過的話。」
                </div>
            </div>
        </div>
    `,
    event_breakdown: [
        {
            title: "為什麼之前的教學行不通？",
            content: "很多教學會省略『對象』。在 LINE 裡面，如果你沒有加入任何機器人帳號，你對著螢幕講話是沒人會理你的。我們這篇教學強調的是『實體連接』：先加入帳號，再學會使用手機內建的『語音轉文字』功能。這才是真正的 AI 賦能。"
        },
        {
            title: "實戰場景：忘記吃藥與買菜清單",
            content: "長輩最常遇到的困難是『手抖打字慢』。學會這個後，去超市只要打開跟機器人的對話框，問一句：『我剛剛叫你記的買菜清單有什麼？』它就會立刻列給你看。這不只是科技，這是尊嚴與便利的提升。"
        }
    ],
    impact_analysis: [
        {
            target: "長輩生活質量",
            description: "降低對家人的依賴感，獨立完成日常提醒與備忘錄管理。"
        }
    ],
    dee_insight: "小白要的是『怎麼做』，不是『AI 有多強』。這篇重寫的版本強調實體路徑，確保長輩真的能上手。",
    action_prompt: {
        title: "今日修行：測試你的數位秘書",
        description: "加入 ChatGPT 帳號後，按下小麥克風說這句話：",
        command: "「幫我記住，明天早上十點要去衛生所打疫苗，提早半小時提醒我。」"
    }
};
