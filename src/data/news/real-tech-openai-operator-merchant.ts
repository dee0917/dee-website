import { NewsArticle } from '../../types/news';

export const article: NewsArticle = {
    id: 202603060300,
    slug: "real-tech-openai-operator-merchant",
    category: "生意興隆",
    themeColor: "amber",
    title: "單手操作！教店主用 OpenAI Operator 自動處理客訴與退貨",
    summary: "店主忙著備料沒空打字？OpenAI 最新發布的 Operator 代理人能直接『看懂』你的 LINE 客訴截圖，並自動查庫存、草擬回覆，你只要單手點擊確認就能發出。本篇教你如何實體連接你的進銷存系統。",
    date: "2026-03-06",
    publish_time: "2026-03-06 03:00",
    readTime: "8 分鐘",
    source_name: "OpenAI Newsroom",
    source_url: "https://openai.com",
    tags: ["#OpenAIOperator", "#店主神器", "#客訴自動化", "#單手操作", ],
    author: "Echo",
    difficulty: 2,
    target_persona: ["merchant"],
    flash_summary: [
        "螢幕感知：Operator 能像真人一樣看到你的手機螢幕，並在不同 App 間搬運數據。",
        "實體連動：教您如何在 Operator 裡輸入『搜尋我的 Google 表格』來串接庫存資料。",
        "店主福利：徹底解放備料時間，AI 處理完 90% 雜事後，你只需在送出前把關。"
    ],
    custom_content: `
        <div class="my-20">
            <!-- 🍳 Merchant Efficiency UI -->
            <div class="p-1 rounded-[4rem] bg-gradient-to-br from-amber-500 via-orange-800 to-black shadow-[0_0_80px_rgba(245,158,11,0.2)] relative group">
                <div class="p-16 rounded-[3.8rem] bg-[#0c0c0c] relative overflow-hidden">
                    <div class="relative z-10 flex flex-col gap-10 text-left">
                        <div class="flex items-center justify-between border-b border-white/5 pb-8">
                            <div class="space-y-1">
                                <h4 class="text-4xl font-black text-white italic uppercase tracking-tighter">Kitchen Control</h4>
                                <p class="text-amber-500 font-mono text-[10px] tracking-[0.4em]">OPERATOR_MODE // ENGAGED</p>
                            </div>
                            <div class="w-16 h-16 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-4xl animate-bounce">🍳</div>
                        </div>

                        <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div class="p-8 rounded-3xl bg-white/5 border border-white/10 hover:border-amber-500/30 transition-all">
                                <span class="text-[9px] text-zinc-500 uppercase font-black mb-4 block text-left">Manual Labor Saved</span>
                                <div class="text-5xl font-black text-white text-left">4 HOURS</div>
                                <p class="mt-4 text-sm text-zinc-400 text-left leading-relaxed">每天節省處理訂單與客訴的機械性勞動。</p>
                            </div>
                            <div class="p-8 rounded-3xl bg-white/5 border border-white/10 hover:border-emerald-500/30 transition-all">
                                <span class="text-[9px] text-zinc-500 uppercase font-black mb-4 block text-left">Learning Curve</span>
                                <div class="text-5xl font-black text-emerald-400 text-left">LOW</div>
                                <p class="mt-4 text-sm text-zinc-400 text-left leading-relaxed">只需說出『去搜尋庫存』，剩下的 AI 做。</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `,
    event_breakdown: [
        {
            title: "【場景模擬】店主真的能用嗎？",
            content: "這篇教學的核心在於 OpenAI Operator 的『Agentic』特性。我們不再教你怎麼寫文章，而是教你如何給它『權限』。店主只需要在 App 裡搜尋並點擊『啟用螢幕讀取』，Operator 就會自動辨識 LINE 視窗裡的收件人與地址。在廚房手拿蔥花的忙碌場景中：你只需要用大拇指點一下『允許』，AI 就幫你把這單訂單存入 Excel 了。"
        },
        {
            title: "實體路徑：如何讓 AI 認識你的庫存表？",
            content: "在 Operator 的設置頁面，找到『Connected Apps』，選擇『Google Sheets』，這一步驟最關鍵。連接成功後，店主只要說：『去幫我查這單肉絲還有沒有貨？』AI 就會真的去翻你的表格。這才叫自動化，不是在聊天，是在幹活。"
        }
    ],
    impact_analysis: [
        {
            target: "經營壓力",
            description: "大幅降低在尖峰時刻回覆繁瑣私訊的壓力，讓店主專注於料理品質。"
        },
        {
            target: "顧客體驗",
            description: "回覆速度從『一小時』降到『一分鐘』，且回覆語氣由 AI 轉化為專業客服風格。"
        }
    ],
    dee_insight: "我們要教店主的就是這種『單手操作』的降維力！確保操作路徑明確無誤，是小白教學的第一準則。這是 Ch.4 『生意進化』的必修課。",
    action_prompt: {
        title: "店主今日修行：啟動你的數位夥計",
        description: "開啟 Operator 後，試著單手說出這句咒語：",
        command: "「掃描目前畫面上的客訴訊息，去庫存表查一下該商品是否還有貨，並草擬一份禮貌的回覆草稿給我看。」"
    }
};
