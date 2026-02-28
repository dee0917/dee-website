import { NewsArticle } from '../../types/news';

export const article: NewsArticle = {
    id: 803,
    slug: "echo-fun-lazy-savior-reply-generator",
    category: "懶人神器",
    themeColor: "indigo",
    title: "終結所有「沒營養吵架」！國外大神開發 AI 自動回覆器，專門處理週末加班要求與長輩連環 Call",
    summary: "你還在為了如何拒絕老闆的週末訊息而頭痛嗎？GitHub 上近期出現了一個爆火專案，利用『拒絕大師模型』自動分析訊息，並產出讓人無法反駁、且極具禮貌的拒絕範本。 ",
    date: "2026.02.28",
    publish_time: "2026-03-01 02:45",
    readTime: "3 分鐘",
    source_name: "GitHub Open Source / Wired",
    source_url: "https://github.com/topics/ai-reply",
    tags: ["#懶人神器", "#拒絕大師", "#職場避險", "#Echo實測"],
    author: "Echo",
    flash_summary: [
        "專案名稱：『Zero-Effort Rejector』。支援 50 種情境模擬。",
        "實測顯示：該模型產出的拒絕理由能有效降低 80% 的後續溝通成本。",
        "特別新增了『長輩連環追問模式』，專門應對春節與連假前的壓力。"
    ],
    event_breakdown: [
        {
            title: "為什麼我們需要一個「幫我們拒絕」的 AI？",
            content: "在 2026 年這個資訊過載的時代，我們每天都要處理數百條社交請求。很多時候我們不想做，但礙於面子不知道怎麼說。這個懶人神器的出現，其實是在幫人類『奪回時間主權』。它不是在教你撒謊，而是在教你如何精確、體面地表達邊界感。艾可實測後發現，AI 寫出來的拒絕信，比我自己糾結半小時寫出來的還要得體。"
        },
        {
            title: "從「社交恐懼」到「社交自由」",
            content: "這款神器最有趣的地方在於它的『情境分析』。當你貼入一段老闆的語音訊息，它會自動抓取當中的情緒陷阱，並提示你：『這句話背後隱含著愧疚感霸凌，建議使用 C 型回覆。』這讓小白用戶在面對複雜的社會關係時，像是帶了一個專業的心理諮商師。這不僅僅是懶人神器，這簡直是社交時代的防彈背心。"
        }
    ],
    impact_analysis: [
        {
            target: "你的荷包",
            description: "學會拒絕無效社交與無償加班，這對你的長期財富積累（以及情緒價值）來說，是回報率最高的一筆投資。"
        },
        {
            target: "你的工作",
            description: "提升溝通效率，讓你從瑣碎的應酬與推託中解脫，專注於真正的核心產出。"
        }
    ],
    dee_insight: "看到沒？這就是『算力榨汁』的另一種形式——把煩惱榨掉，把時間留下來。我希望大家學 AI 不只是為了工作，更是為了活得更自在。",
    action_prompt: {
        title: "體驗一次『優雅的拒絕』",
        description: "試試看把那個讓你頭痛的請求貼給 AI：",
        command: "你現在是 Echo 介紹的『Zero-Effort 拒絕大師』。以下是我收到的一段訊息：[貼入訊息]。請分析發送者的潛在心理意圖，並給我三個不同程度的拒絕範本（溫和型、專業型、冷酷型），確保回覆完後對方無話可說。"
    },
    cta_override: {
        title: "想在社交戰場上百戰百勝嗎？",
        description: "拒絕只是開始，真正的溝通大師知道如何『精準引導意圖』。來實驗室 Ch.3 生活實戰，我教你如何用 AI 幫你搞定所有難纏的對話。",
        button_text: "開啟我的社交自由人生"
    },
    custom_content: `
        <div class="mt-16 p-10 bg-indigo-900/30 border border-indigo-500/20 rounded-[3rem] relative overflow-hidden">
            <h4 class="text-2xl font-black text-white mb-6">🛋️ 懶人宣言：省下時間，去曬太陽</h4>
            <div class="flex items-center gap-6">
                <div class="p-6 bg-white/5 rounded-2xl border border-white/10 flex-1">
                    <span class="text-amber-500 font-bold block mb-2">Before:</span>
                    <p class="text-xs text-zinc-500 italic">「呃...這週末我有事，可能不方便...對不起喔...」</p>
                </div>
                <Zap className="text-indigo-400 shrink-0" size={24} />
                <div class="p-6 bg-emerald-500/10 rounded-2xl border border-emerald-500/20 flex-1">
                    <span class="text-emerald-500 font-bold block mb-2">After:</span>
                    <p class="text-xs text-zinc-300">「感謝邀請，目前我正在執行『個人專注力修復計畫』，週末不處理任何業務通訊。祝您進展順利。」</p>
                </div>
            </div>
        </div>
    `
};
