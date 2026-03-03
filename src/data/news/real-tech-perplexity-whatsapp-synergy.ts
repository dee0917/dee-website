import { NewsArticle } from '../../types/news';

export const article: NewsArticle = {
    id: 202603031210,
    slug: "real-tech-perplexity-whatsapp-synergy",
    category: "實戰應用",
    themeColor: "emerald",
    title: "搜尋的終結：Perplexity 聯手 WhatsApp，一張照片解決生活雜事",
    summary: "Perplexity 正式宣佈與 Meta 深度整合。現在不需打開網頁，只需在通訊軟體傳一張照片，AI 就會連動全球數據幫你比價、分析並給出執行建議。",
    date: "2026-03-03",
    publish_time: "2026-03-03 12:10",
    readTime: "3 分鐘",
    source_name: "Meta Newsroom / Perplexity Blog",
    source_url: "/",
    tags: ["#Perplexity", "#Meta", "#降維打擊", "#全家桶搜尋"],
    author: "Echo",
    trinity_dimension: "社會契約",
    trend_cluster: "代理人革命",
    flash_summary: [
        "通訊軟體即搜尋框：直接傳送圖片即可觸發全球 RAG 檢索。",
        "視覺辨識升級：整合 Gemini 2.0 邏輯，辨識精度達亞硝酸鹽/農藥殘留等級。",
        "去 App 化：AI 隱身於最簡單的對話介面背後。"
    ],
    custom_content: `
        <div class="my-20">
            <!-- 📱 Unified Communication / Search Interface -->
            <div class="p-1 rounded-[3.5rem] bg-gradient-to-br from-emerald-500 via-zinc-900 to-teal-600 shadow-[0_0_80px_rgba(16,185,129,0.15)]">
                <div class="p-12 rounded-[3.3rem] bg-black/95 backdrop-blur-3xl relative overflow-hidden">
                    <div class="relative z-10 flex flex-col gap-10 text-left">
                        <div class="flex items-center justify-between">
                            <div class="space-y-1">
                                <h4 class="text-4xl font-black text-white italic tracking-tighter">OMNI SEARCH</h4>
                                <p class="text-emerald-500 font-mono text-[10px] tracking-[0.4em]">PERPLEXITY_WHATSAPP_LINK // 2026</p>
                            </div>
                            <div class="w-16 h-16 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center">
                                <span class="text-3xl animate-bounce">📸</span>
                            </div>
                        </div>

                        <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div class="bg-white/5 p-8 rounded-3xl border border-white/10 group-hover:border-emerald-500/30 transition-all">
                                <span class="text-[9px] text-zinc-500 uppercase font-black block mb-4">Response Speed</span>
                                <div class="text-5xl font-black text-white">3.0s</div>
                                <p class="mt-4 text-sm text-zinc-400">從傳圖到接收完整分析（含比價與購買連結）的平均時間。</p>
                            </div>
                            <div class="bg-white/5 p-8 rounded-3xl border border-white/10 group-hover:border-emerald-500/30 transition-all">
                                <span class="text-[9px] text-zinc-500 uppercase font-black block mb-4">Visual Logic</span>
                                <div class="text-5xl font-black text-white">Advanced</div>
                                <p class="mt-4 text-sm text-zinc-400">不再只是看圖說故事，而是具備化學級別的產品標籤逆向推導。</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- 🕵️ Echo's Field Notes -->
            <div class="mt-12 p-10 bg-zinc-950 border border-white/5 rounded-[2.5rem] relative group overflow-hidden shadow-inner">
                <div class="absolute top-0 left-0 w-1.5 h-full bg-emerald-500"></div>
                <div class="relative z-10 text-left">
                    <h3 class="text-2xl font-black text-white mb-6 tracking-widest uppercase flex items-center gap-3">
                        <span class="w-8 h-8 rounded-full bg-emerald-500 flex items-center justify-center text-xs text-black italic">E</span>
                        Echo's Field Notes
                    </h3>
                    <p class="text-zinc-300 text-xl leading-relaxed font-medium italic border-l-4 border-emerald-500/50 pl-8">
                        「觀察員隨筆：2026 年的主流工具不再強調你有多少參數，而在於我有多懂你的生活。這是一場針對『數位生活門檻』的降維打擊，所有的硬核技術都被隱藏在最簡單的對話框背後。如果你還在打開瀏覽器搜東西，那你已經輸在起跑線了。」
                    </p>
                </div>
            </div>
        </div>
    `,
    event_breakdown: [
        {
            title: "全家桶搜尋：通訊軟體正式取代瀏覽器",
            content: "這不是單純的插件更新，而是對互聯網入口的二次定義。透過與 Meta 的深度協議轉發，Perplexity 獲取了即時視覺分析的最高權限。這代表你的手機通訊軟體已成為一個具備執行力的『數位分身』，它不僅知道你要買什麼，它甚至知道你家冰箱缺什麼。"
        }
    ],
    impact_analysis: [
        {
            target: "生活便利",
            description: "告別瑣碎的搜尋與對比流程，所有資訊都在 3 步點擊內完成。"
        }
    ],
    dee_insight: "這就是我們在 Ch.3 強調的『生活實戰』。當技術隱入對話，唯一的學問就是你如何下達那個能讓 AI 高興幫你跑腿的指令。",
    action_prompt: {
        title: "體驗「視覺代勞」",
        description: "試著模擬全家桶搜尋的邏輯，下達一個複合式目標：",
        command: "我剛傳了一張 [物品/食材] 的照片給你。請幫我：1. 識別其成分與潛在健康風險。2. 找出目前全台網路商城最便宜的購買連結。3. 推薦 2 個能利用此物品解決 [具體問題] 的實戰妙招。"
    },
    trend_cluster: "代理人革命",
    trinity_dimension: "社會契約"
};
