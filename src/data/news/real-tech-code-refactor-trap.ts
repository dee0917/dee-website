import { NewsArticle } from '../../types/news';

export const article: NewsArticle = {
    id: 202603051110,
    slug: "real-tech-code-refactor-trap",
    category: "實戰應用",
    themeColor: "emerald",
    title: "小白救星！為什麼你的 AI 總是「聽不懂」優化需求？",
    summary: "想像一下，你請了一個外賣員（AI），如果你告訴他『去這家店，買這份套餐，走這條路』，他絕對能準時送達。但如果你跟他說『我肚子餓了，去弄點有格調的東西來吃』，他可能會給你帶一箱壓縮餅乾。本篇教你如何破解 AI 的『優化盲區』。",
    date: "2026-03-05",
    publish_time: "2026-03-05 11:10",
    readTime: "9 分鐘",
    source_name: "Cursor Blog / Echo Lab",
    source_url: "/",
    tags: ["#AI優化", "#溝通降維", "#小白指南", "#實戰技巧", "#降維打擊"],
    author: "Echo",
    trinity_dimension: "社會契約",
    trend_cluster: "文明重塑",
    flash_summary: [
        "AI 具備強大的具體執行力，但缺乏對『好』的抽象定義能力。",
        "降維技巧：利用『提案-實施』策略，讓 AI 在動手前先動腦思考 3 個方向。",
        "主流工具（如 Cursor/Perplexity）已開始內置提案生成器以降低溝通成本。"
    ],
    custom_content: `
        <div class="my-24">
            <!-- ⚡ Clarity & Strategy Matrix UI -->
            <div class="p-1 rounded-[4rem] bg-gradient-to-br from-emerald-400 via-zinc-800 to-black shadow-[0_0_100px_rgba(16,185,129,0.2)] relative group">
                <div class="p-16 rounded-[3.8rem] bg-[#0c0c0c] relative overflow-hidden">
                    <div class="relative z-10 flex flex-col gap-10 text-left">
                        <div class="flex items-center justify-between border-b border-white/5 pb-8">
                            <div class="space-y-1">
                                <h4 class="text-4xl font-black text-white tracking-tighter uppercase italic">Instruction Clarity</h4>
                                <p class="text-emerald-400 font-mono text-[10px] tracking-[0.4em]">PROMPT_DISTILLATION // ACTIVE</p>
                            </div>
                            <div class="w-16 h-16 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center">
                                <span class="text-3xl animate-pulse">💡</span>
                            </div>
                        </div>

                        <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div class="p-8 rounded-3xl bg-white/5 border border-white/10 group-hover:border-emerald-500/30 transition-all">
                                <span class="text-[9px] text-zinc-500 uppercase font-black mb-4 block">Execution Rate</span>
                                <div class="text-5xl font-black text-white italic">95%</div>
                                <p class="mt-4 text-sm text-zinc-400 leading-relaxed">當指令極其具體時，AI 幾乎能完美達成任務。</p>
                            </div>
                            <div class="p-8 rounded-3xl bg-white/5 border border-white/10 group-hover:border-emerald-500/30 transition-all">
                                <span class="text-[9px] text-zinc-500 uppercase font-black mb-4 block">Autonomy Pitfall</span>
                                <div class="text-5xl font-black text-rose-500">CRITICAL</div>
                                <p class="mt-4 text-sm text-zinc-400 leading-relaxed">當要求『變好』時，AI 往往會選擇代價最低的敷衍路徑。</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `,
    event_breakdown: [
        {
            title: "【背景溯源】從「外賣員」到「副駕駛」：你與 AI 的溝通斷層",
            content: "在 2026 年，最困擾小白用戶的問題已經不是『AI 不會寫字』，而是『AI 聽不懂我的潛台詞』。這場尷尬的現狀源於大型語言模型（LLM）的訓練機制：它們被訓練成『最優概率預測器』。如果你給出的需求是模糊的（如：幫我優化），AI 會根據大數據概率，選擇一個最通用的、看起來像是在優化但實則不痛不癢的回應。這對於追求極致『降維打擊』的工作流來說，無疑是巨大的算力浪費。你需要理解，AI 在沒有座標的情況下，它的『地圖』是全黑的。"
        },
        {
            title: "【技術核心】解決方案：用「提案發散」取代「單點提問」",
            content: "為什麼頂尖玩家在使用 Cursor 或 Perplexity 時感覺特別順手？秘密就在於『提案模式』。與其直接叫 AI 改寫，不如要求它先當你的『軍師』。技術底層上，這強迫模型在輸出的 Pre-fill 階段進入多路搜索軌道。這種模式的成功率比單次提問高出 300%。對於小白用戶，這意味著你不再需要學習複雜的 Prompt，你只需要會『挑選』。當 AI 給出三個不同方向的優化提案時，它其實是在幫你將模糊的感覺『實體化』。"
        }
    ],
    impact_analysis: [
        {
            target: "工作效率",
            description: "透過『先提案後執行』，大幅減少來回修改的次數，專案完成速度提升 2 倍。"
        },
        {
            target: "心理負擔",
            description: "降低了對『完美提示詞』的依賴感，讓普通人也能自信地調度高級算力。"
        }
    ],
    dee_insight: "看到沒？這就是我不讓你們隨便『優化』的原因。沒有標準的優化就是浪費。這門課我已將其核心心法寫入 Ch.2 的『指令進化』中。記住，你是這場遊戲的裁判，AI 只是幫你找不同路徑的探路工。",
    action_prompt: {
        title: "艾可代碼實驗室：【決策權重：三路發散指令】",
        description: "試著用這個「降維」指令，讓你的 AI 從工具人變成具備戰略感的助理：",
        command: `# Role Definition
你現在是一名「戰略優化顧問」，負責對 [具體內容，如：我的商業企劃書] 進行全方位診斷。

# Specific Context
內容當前的狀態是 [初稿/半成品]，我希望它在 [目標，如：獲取投資人興趣] 方面有顯著提升。

# Clear Constraints
1. 嚴禁直接重寫內容。
2. 請針對內容產出 3 個完全不同的優化「方向」：
   - 方向 1：極簡敘事（去繁就簡）。
   - 方向 2：情緒渲染（增加說服力）。
   - 方向 3：數據驅動（增加權威感）。
3. 每個方向請說明你將具體修改哪些關鍵點。
4. 在我決定使用哪個方向前，保持靜默。

# Expected Output Format
## 🔍 內容痛點診斷
## 🚀 優化方向矩陣 (1/2/3)
## 🎯 預期轉化效果`
    }
};
