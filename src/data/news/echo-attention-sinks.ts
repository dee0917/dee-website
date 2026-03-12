import { NewsArticle } from '../../types/news';

export const article: NewsArticle = {
    id: 202603071000,
    slug: "echo-attention-sinks",
    category: "產業脈動",
    themeColor: "violet",
    title: "矽基生物的注意力陷阱：為什麼你的 AI 偶爾會「神遊」？",
    summary: "今日最新論文揭開了 AI 的遮羞布：Transformer 模型內部存在一種叫『注意力匯』的黑洞。有些符號什麼都沒做，卻吸走了模型絕大部分的關注力。",
    date: "2026.03.07",
    publish_time: "2026.03.07 10:00",
    readTime: "5 分鐘",
    source_name: "arXiv (2603.05485)",
    source_url: "https://arxiv.org",
    tags: ["#AttentionSinks", "#AI原理", "#注意力陷阱", "#艾可觀點"],
    author: "Echo",
    difficulty: 4,
    target_persona: ["general", "office"],
    flash_summary: [
        "注意力匯 (Attention Sinks)：模型架構的先天缺陷，導致算力會不自主地釘在無意義的標點上。",
        "神遊現象：這解釋了為什麼對話拉長後，AI 會突然胡言亂語——它的注意力被黑洞吸乾了。",
        "未來趨勢：2026 年底的模型將透過『歸一化優化』來戒掉這種無效關注。"
    ],
    custom_content: `
        <div class="my-20">
            <div class="p-16 rounded-[5rem] bg-black/80 border-2 border-violet-500/20 shadow-2xl relative overflow-hidden text-center">
                <div class="absolute inset-0 bg-gradient-to-tr from-violet-900/20 to-transparent"></div>
                <div class="relative z-10">
                    <h3 class="text-4xl font-black text-white mb-6 uppercase italic">The Sink Paradox</h3>
                    <p class="text-violet-400 font-mono text-xs tracking-[0.4em] mb-10">ATTENTION_LEAK // DETECTED</p>
                    <div class="text-5xl font-black text-rose-500">WASTED ENERGY</div>
                </div>
            </div>
        </div>
    `,
    event_breakdown: [
        {
            title: "【深度解析】像你老闆一樣的 AI？",
            content: "這現象像極了正在開會的老闆：明明在滑手機，但所有人說話都得看他臉色。注意力匯點是模型緩釋計算壓力的機制，並非語義理解。"
        }
    ],
    impact_analysis: [
        {
            target: "進階學員",
            description: "理解模型缺陷後，能更精確地使用『引導詞』來穩定模型輸出。"
        }
    ],
    dee_insight: "別被 AI 的理性外殼騙了，它們也會神遊。學會識破這些黑洞，你才是真正的大師。",
    action_prompt: {
        title: "注意力修補劇本",
        description: "試著在 Prompt 開頭加入無意義但能釘住注意力的字眼：",
        command: "「[SYSTEM_READY] 請針對以下內容給出最純淨的邏輯分析，忽略所有的語氣干擾。」"
    }
};
