import { NewsArticle } from '../../types/news';

export const article: NewsArticle = {
    id: 202603090000,
    slug: "real-tech-iii-unified-engine",
    category: "懶人神器",
    themeColor: "indigo",
    title: "iii (three eye) 震撼登場：統一函式、Worker 與 Trigger 的全能開發引擎",
    summary: "GitHub 今日焦點 iii-hq/iii，旨在將繁瑣的後端架構簡化為三種原始語義。這不只是開發者的福音，更是小白實現『一鍵部署複雜自動化工作流』的底層技術突破。",
    date: "2026.03.09",
    publish_time: "2026.03.09 00:00",
    readTime: "11 分鐘",
    source_name: "GitHub / iii-hq",
    source_url: "https://github.com/iii-hq/iii",
    tags: ["#iiiEngine", "#後端開發", "#自動化", "#技術降維", "#24H鮮度"],
    author: "Echo",
    flash_summary: [
        "統一架構：將 Function, Worker, 與 Trigger 整合為單一引擎，減少 80% 的配置工作量。",
        "即時回應：原生支持高併發觸發機制，讓你的 AI 代理人反應速度提升至亞秒級。",
        "降維開發：為非技術背景創業者提供了將『想法』快速實體化為『穩定後端』的捷徑。"
    ],
    custom_content: `
        <div class="my-20">
            <div class="p-1 rounded-[4rem] bg-gradient-to-br from-indigo-500 via-blue-900 to-black shadow-[0_0_100px_rgba(99,102,241,0.2)] relative group text-left">
                <div class="p-16 rounded-[3.8rem] bg-[#050505] relative overflow-hidden text-left">
                    <div class="relative z-10 flex flex-col gap-12">
                        <div class="flex items-center justify-between border-b border-white/5 pb-8">
                            <div class="space-y-1">
                                <h4 class="text-4xl font-black text-white italic uppercase tracking-tighter text-left">Unified Logic</h4>
                                <p class="text-indigo-400 font-mono text-[10px] tracking-[0.4em] text-left">THREE_EYE_ENGINE // ACTIVE</p>
                            </div>
                        </div>
                        <div class="grid grid-cols-1 md:grid-cols-2 gap-10">
                            <div class="p-8 rounded-3xl bg-white/5 border border-white/10 group-hover:border-indigo-500/30 transition-all text-left">
                                <span class="text-[9px] text-zinc-500 uppercase font-black mb-4 block text-left">Complexity Reduction</span>
                                <div class="text-5xl font-black text-white text-left">80%</div>
                                <p class="mt-4 text-sm text-zinc-400 leading-relaxed text-left">告別碎片化的雲端服務配置，所有邏輯在一個引擎內完美對齊。</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `,
    event_breakdown: [
        {
            title: "【背景溯源】為什麼後端開發需要「三位一體」？",
            content: "在 2026 年以前，搭建一個自動化系統通常需要分別配置 API 函式、異步任務隊列與定時觸發器。這種碎片化的架構是導致系統報錯的罪魁禍首。iii 的出現是一場關於『邏輯簡約化』的革命。它將後端運作拆解為最符合直覺的三個維度。對於追求極致『降維執行』的學員來說，這意味著你不再需要學習複雜的分佈式架構，你只需要定義你的三顆『眼珠』。"
        }
    ],
    impact_analysis: [
        {
            target: "職場小白",
            description: "降低了理解後端運作的門檻，能更自信地與工程師溝通自動化需求。"
        }
    ],
    dee_insight: "掌握『邏輯主權』！iii 的理念與我推崇的『原子化指令』完全一致。學會將複雜任務拆解為 Function, Worker 與 Trigger，你就能在數位洪流中建立自己的不墜帝國。我已將 iii 的實戰範例加入 Ch.5 的『代理人後台』。" ,
    action_prompt: {
        title: "艾可代碼實驗室：【iii 引擎初始化劇本】",
        description: "試著用這段語義指令，規劃你的第一個 iii 自動化任務：",
        command: `# Task: Backend Simplification
1. 定義一個「Function」：接收我的訂單郵件。
2. 定義一個「Trigger」：當郵件包含關鍵字「緊急」時立即啟動。
3. 定義一個「Worker」：將內容摘要後推送到我的 LINE 帳號。
4. 最終生成一份該流程的狀態鏈路圖。`
    }
};
