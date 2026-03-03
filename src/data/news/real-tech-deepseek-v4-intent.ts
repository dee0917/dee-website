import { NewsArticle } from '../../types/news';
export const article: NewsArticle = {
    id: 202603021700,
    slug: "real-tech-deepseek-v4-intent",
    category: "實戰應用",
    themeColor: "emerald",
    title: "DeepSeek V4「意圖補完」震撼發布：小白也能寫出大神級指令",
    summary: "DeepSeek V4 今日推出『意圖捕捉』功能。用戶只需輸入模糊指令，AI 會自動結合過去 24 小時的上下文（如 Slack 訊息或 CSV）生成完整方案，宣告『去提示詞化』時代正式開啟。",
    date: "2026-03-02",
    publish_time: "2026-03-02 17:00",
    readTime: "3 分鐘",
    source_name: "DeepSeek Official",
    source_url: "https://www.deepseek.com",
    tags: ["#DeepSeekV4", "#意圖補完", "#去提示詞化", "#自動化革命"],
    author: "Echo",
    flash_summary: [
        "新功能『Intent Completion』能將模糊指令轉化為精確行動。",
        "自動感知上下文：AI 會主動讀取你正在處理的文件與訊息。",
        "OpenAI 隨後宣布 GPT-5.5 將跟進類似的場景感知技術。"
    ],
    custom_content: `
        <div class="my-20">
            <!-- ⚡ Unique Intent Matrix Layout -->
            <div class="p-1 rounded-[3.5rem] bg-gradient-to-br from-emerald-600 via-zinc-900 to-black shadow-[0_0_80px_rgba(16,185,129,0.2)]">
                <div class="p-12 rounded-[3.3rem] bg-black/95 backdrop-blur-3xl relative overflow-hidden">
                    <div class="relative z-10 flex flex-col gap-10">
                        <div class="flex items-center justify-between">
                            <div class="space-y-1">
                                <h4 class="text-4xl font-black text-white tracking-tighter italic">ZERO PROMPT</h4>
                                <p class="text-emerald-500 font-mono text-[10px] tracking-[0.4em]">DEEPSEEK_V4_INTENT // ACTIVE</p>
                            </div>
                            <div class="w-16 h-16 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center">
                                <span class="text-3xl animate-pulse">🧠</span>
                            </div>
                        </div>
                        <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div class="p-8 rounded-3xl bg-white/5 border border-white/10 group-hover:border-emerald-500/30 transition-all">
                                <span class="text-[9px] text-zinc-500 uppercase font-black mb-4 block">Intent Accuracy</span>
                                <div class="text-5xl font-black text-white">96%</div>
                                <p class="mt-4 text-sm text-zinc-400 leading-relaxed">不再依賴繁瑣的 Prompt Engineering，AI 通過上下文自動對齊意圖。</p>
                            </div>
                            <div class="p-8 rounded-3xl bg-white/5 border border-white/10 group-hover:border-emerald-500/30 transition-all">
                                <span class="text-[9px] text-zinc-500 uppercase font-black mb-4 block">Context Awareness</span>
                                <div class="text-5xl font-black text-white">High</div>
                                <p class="mt-4 text-sm text-zinc-400 leading-relaxed">深度整合 Slack, CSV 與開發環境日誌，實現無感指令化。</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <!-- 🕵️ Echo's Field Notes -->
            <div class="mt-12 p-10 bg-[#080808] border-l-4 border-emerald-500 rounded-r-[3rem] relative overflow-hidden group">
                <div class="relative z-10">
                    <h3 class="text-2xl font-black text-white mb-6 uppercase flex items-center gap-3">
                        <span class="w-8 h-8 rounded-full bg-emerald-500 flex items-center justify-center text-xs text-black italic">E</span>
                        Echo's Observation
                    </h3>
                    <p class="text-zinc-300 text-lg leading-relaxed font-medium italic">
                        「當 AI 開始學會拒絕，人類才真正開始思考。DeepSeek 這次的『去提示詞化』，本質上是在消除溝通的摩擦力。以後你不再需要學習如何跟 AI 說話，AI 會主動適應你的世界觀。這對提示詞工程師是警報，對小白則是絕對的福音。」
                    </p>
                </div>
            </div>
        </div>
    `,
    event_breakdown: [
        {
            title: "去提示詞化：從「寫咒語」到「發指令」",
            content: "以往我們需要精確定義角色與任務，現在 DeepSeek V4 透過搭載的「場景預測器」，能自動讀取用戶正在操作的資源，並推導出背後的邏輯。你只需輸入『幫我做個表』，AI 就會知道你是要針對剛才上傳的銷售額進行多維度分析。"
        }
    ],
    impact_analysis: [
        {
            target: "職場競爭力",
            description: "操作門檻徹底坍塌。未來的贏家不再是懂指令的人，而是懂業務目標並能進行高品質『結果審核』的人。"
        }
    ],
    dee_insight: "這就是降維打擊。當技術隱入背景，剩下的就是純粹的戰略決策。實驗室的下一階段，就是要教大家如何成為這類代理人集群的『最終審核官』。",
    action_prompt: {
        title: "體驗「意圖直達」",
        description: "試著給你的 AI 下達一個極簡且模糊的指令，看看它能否精準補完：",
        command: "我正在處理 [目前專案]，請幫我生成一份對應的 [任務類型，如：週報、測試計畫]。請根據我們之前的上下文自動補完所有細節，不要問我問題。"
    },
    cta_override: {
        title: "想學會如何引導 AI 的「意圖捕捉」嗎？",
        description: "技術越強，框架越重要。進入實驗室，學習如何建立具備「場景感知力」的高階代理人工作流。",
        button_text: "解鎖意圖調度核心"
    },
};
