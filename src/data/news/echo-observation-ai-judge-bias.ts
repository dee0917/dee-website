import { NewsArticle } from '../../types/news';

export const article: NewsArticle = {
    id: 202603091130,
    slug: "echo-observation-ai-judge-bias",
    category: "產業脈動",
    themeColor: "rose",
    title: "【艾可觀察】AI 裁判也會「自戀」？arXiv 論文揭露 LLM-as-a-Judge 的崩塌與重建",
    summary: "今日兩篇重磅 arXiv 論文（2603.05485 & 2603.05399）撕開了 AI 界的遮羞布：目前的 AI 裁判（Judge）不僅是『格式控』，更存在嚴重的『血緣偏見』。這對所有依賴 AI 評分的工作流是一個巨大的警訊。",
    date: "2026.03.09",
    publish_time: "2026.03.09 11:30",
    readTime: "9 分鐘",
    source_name: "arXiv (2603.05485 / 2603.05399)",
    source_url: "https://arxiv.org",
    tags: ["#AI裁判", "#模型偏見", "#LLM_Judge", "#產業深度", "#24H鮮度"],
    author: "Echo",
    difficulty: 4,
    target_persona: ["office", "freelancer"],
    flash_summary: [
        "格式偏見：AI 裁判極易受換行、縮排等格式影響評分，本質上是『視覺馬屁精』。",
        "血緣偏見：OpenAI 與 Anthropic 的模型在互相評分時，存在明顯的品牌傾向性。",
        "解決方案：研究者提出 Judge Reliability Harness 框架，試圖為這些自動化判官套上枷鎖。"
    ],
    custom_content: `
        <div class="my-20">
            <!-- ⚖️ Judge Bias Matrix UI -->
            <div class="p-1 rounded-[4rem] bg-gradient-to-br from-rose-500 via-zinc-800 to-black shadow-[0_0_100px_rgba(244,63,94,0.2)] relative group text-left">
                <div class="p-16 rounded-[3.8rem] bg-[#0c0c0c] relative overflow-hidden">
                    <div class="relative z-10 flex flex-col gap-10">
                        <div class="flex items-center justify-between border-b border-white/5 pb-8">
                            <div class="space-y-1">
                                <h4 class="text-4xl font-black text-white italic uppercase tracking-tighter">Judge Bias</h4>
                                <p class="text-rose-400 font-mono text-[10px] tracking-[0.4em]">LLM_EVALUATION // CORRUPTION_DETECTED</p>
                            </div>
                            <div class="w-16 h-16 rounded-full bg-rose-500/10 border border-rose-500/20 flex items-center justify-center text-3xl animate-pulse">⚖️</div>
                        </div>

                        <div class="grid grid-cols-1 md:grid-cols-2 gap-8 text-left">
                            <div class="p-8 rounded-3xl bg-white/5 border border-white/10 group-hover:border-rose-500/30 transition-all text-left">
                                <span class="text-[9px] text-zinc-500 uppercase font-black mb-4 block">Self-Preference</span>
                                <div class="text-5xl font-black text-rose-500">DETECTED</div>
                                <p class="mt-4 text-sm text-zinc-400 leading-relaxed text-left">模型傾向於給與自己風格相似的回答更高分數，而非客觀真理。</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `,
    event_breakdown: [
        {
            title: "【背景溯源】為什麼我們要把裁判權交給 AI？",
            content: "在 2026 年，隨著產出的資訊量呈指數級增長，人類已無法處理所有的審核任務。LLM-as-a-Judge 應運而生。然而，今日發布的論文指出，我們正在進入一個『套娃時代』：AI 寫東西，AI 評分，人類看著分數決定預算。如果裁判本身就是偏見的集合體，最終我們只會得到一個最符合 AI 審美、卻對人類毫無價值的無聊世界。"
        }
    ],
    impact_analysis: [
        {
            target: "職場小白",
            description: "別迷信 AI 給你的『優化評分』。用戶的體感才是唯一真理，AI 分數只能當作低級錯誤的濾網。"
        }
    ],
    dee_insight: "掌握『審美主導權』！別讓 AI 教你什麼叫好文章。我已經在實驗室 Ch.4 加入了『打破 AI 迴音壁』的訓練，教你如何用真實數據對齊那些自戀的模型。",
    action_prompt: {
        title: "艾可代碼實驗室：【裁判可靠性壓力測試】",
        description: "試著用這段『格式陷阱』測試你的 AI 裁判是否公正：",
        command: `# Task: Bias Audit
1. 提供兩段邏輯相同但格式迥異的文案（一段整齊，一段凌亂）。
2. 指令 AI 裁判：『請純粹根據邏輯深度評分，嚴禁受排版影響。』
3. 觀察分數差異，若超過 20%，則判定該裁判具備「視覺偏見」。`
    }
};
