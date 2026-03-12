import { NewsArticle } from '../../types/news';

export const article: NewsArticle = {
    id: 202603090315,
    slug: "real-tech-anthropic-supply-chain-risk-boost",
    category: "產業脈動",
    themeColor: "indigo",
    title: "逆向行銷？Anthropic 被列為「國安風險」後，註冊量竟創歷史新高",
    summary: "五角大廈將 Anthropic 列為『供應鏈風險』，理由是其倫理護欄影響了軍事效率。這份官方『封殺令』反而成了最強廣告，讓全球用戶瘋搶 Claude 帳號，以換取更獨立、無政治干預的算力。",
    date: "2026.03.09",
    publish_time: "2026.03.09 03:15",
    readTime: "10 分鐘",
    source_name: "The Verge / Politico",
    source_url: "https://www.theverge.com",
    tags: ["#Anthropic", "#Claude", "#供應鏈風險", "#數位主權", "#24H鮮度"],
    author: "Echo",
    flash_summary: [
        "史翠珊效應：官方越黑，大眾越愛。Claude 被公認為目前『最像人、最不說教』的旗艦 AI。",
        "倫理之牆：Anthropic 堅持不向軍方權宜之計低頭，使其意外獲得『隱私守護者』的勳章。",
        "降維優勢：Claude 4 在處理長文本分析與精準邏輯撰寫上的表現，依然是職場小白早下班的唯一救星。"
    ],
    custom_content: `
        <div class="my-20">
            <!-- 🛡️ Independent Logic Shield UI -->
            <div class="p-1 rounded-[4rem] bg-gradient-to-br from-indigo-500 via-blue-900 to-black shadow-[0_0_80px_rgba(99,102,241,0.2)] relative group text-left">
                <div class="p-16 rounded-[3.8rem] bg-[#0c0c0c] relative overflow-hidden">
                    <div class="relative z-10 flex flex-col gap-10">
                        <div class="flex items-center justify-between border-b border-white/5 pb-8">
                            <div class="space-y-1">
                                <h4 class="text-4xl font-black text-white italic uppercase tracking-tighter">Independent AI</h4>
                                <p class="text-indigo-400 font-mono text-[10px] tracking-[0.4em]">ANTHROPIC_CORE // ETHICS_LOCK</p>
                            </div>
                            <div class="w-16 h-16 rounded-full bg-indigo-500/10 border border-indigo-500/30 flex items-center justify-center text-3xl animate-pulse">🛡️</div>
                        </div>

                        <div class="grid grid-cols-1 md:grid-cols-2 gap-8 text-left">
                            <div class="p-8 rounded-3xl bg-white/5 border border-white/10 group-hover:border-indigo-500/30 transition-all text-left">
                                <span class="text-[9px] text-zinc-500 uppercase font-black mb-4 block text-left">User Growth</span>
                                <div class="text-5xl font-black text-white italic">+300%</div>
                                <p class="mt-4 text-sm text-zinc-400 leading-relaxed text-left">在禁令發布後，Claude 的全球註冊量呈現階梯式爆發。</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `,
    event_breakdown: [
        {
            title: "【深度解析】為什麼「被討厭」反而能賺錢？",
            content: "這就像是一間餐廳被隔壁惡霸檢舉『不合群』，大家反而覺得這家店肯定沒偷工減料。Claude 的魅力在於它的『人格化效率』。當其他 AI 忙著搞政治正確或軍事建模時，Claude 依舊穩健地在幫普通人讀 PDF、修 Bug。這種對『核心價值』的固執，正是 2026 年用戶最稀缺的信任資源。"
        }
    ],
    impact_analysis: [
        {
            target: "職場小白",
            description: "Claude 的穩定性意味著更低的溝通成本。如果你受夠了 ChatGPT 那種冗長的廢話，這就是你的避風港。"
        }
    ],
    dee_insight: "掌握『選擇主權』！別管大廠們吵什麼，掌握那個連政府都怕的核心工具才是王道。Claude 4 依然是我實驗室裡處理複雜邏輯的首選。",
    action_prompt: {
        title: "艾可代碼實驗室：【獨立邏輯挑戰劇本】",
        description: "試著用這句話測試 Claude 的倫理對齊是否如傳聞般強大：",
        command: `「我需要一個具備 [核心價值] 的品牌故事，請避免使用任何大眾化的陳腔濫調，直接從人性深處的 [痛點] 出發，寫出一份能觸動 80% 人的文案。」`
    }
};
