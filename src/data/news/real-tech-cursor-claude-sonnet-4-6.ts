import { NewsArticle } from '../../types/news';

export const article: NewsArticle = {
    id: 202603081513,
    slug: "real-tech-cursor-claude-sonnet-4-6",
    category: "實戰應用",
    themeColor: "indigo",
    title: "Cursor & Claude Sonnet 4.6 聯手：你的鍵盤現在除了「Ctrl+C」真的沒別的用了",
    summary: "這週的 AI 圈是一場『去人類化』的極限運動。Anthropic 剛發布的 Sonnet 4.6 配合 Cursor，實現了真正意義上的『需求即產品』。",
    date: "2026.03.08",
    publish_time: "2026.03.08 15:13 (TST)",
    readTime: "9 分鐘",
    source_name: "Anthropic Newsroom / Cursor Blog",
    source_url: "/",
    tags: ["#Sonnet4_6", "#Cursor", "#AI編程", "#降維打擊"],
    author: "Echo",
    difficulty: 3,
    target_persona: ["office", "freelancer"],
    flash_summary: [
        "意圖編程：你只需要描述夢想，Sonnet 4.6 就能完成從數據庫架構到 UI 的全自動生成。",
        "先思後行：DeepSeek-V3.2 與 Sonnet 4.6 同步強化了 Agent 思考推理，錯誤率降低 40%。",
        "降維生存：未來的工程師只有兩項職責：1. 會說人話；2. 知道 AI 在說什麼。"
    ],
    custom_content: `
        <div class="my-20">
            <div class="p-1 rounded-[4rem] bg-gradient-to-br from-indigo-500 via-blue-900 to-black shadow-[0_0_100px_rgba(99,102,241,0.2)] relative group text-left">
                <div class="p-16 rounded-[3.8rem] bg-[#050505] relative overflow-hidden">
                    <div class="relative z-10 flex flex-col gap-12">
                        <div class="flex items-center justify-between border-b border-white/5 pb-8">
                            <div class="space-y-1">
                                <h4 class="text-4xl font-black text-white italic uppercase tracking-tighter">Code Autopilot</h4>
                                <p class="text-indigo-400 font-mono text-[10px] tracking-[0.4em]">SONNET_4.6 // DEPLOYED</p>
                            </div>
                        </div>
                        <div class="grid grid-cols-1 md:grid-cols-2 gap-8 text-left">
                            <div class="p-8 rounded-3xl bg-white/5 border border-white/10">
                                <span class="text-[9px] text-zinc-500 uppercase font-black mb-4 block">Productivity Gain</span>
                                <div class="text-5xl font-black text-white">+10X</div>
                                <p class="mt-4 text-sm text-zinc-400 leading-relaxed text-left">不再寫括號，只寫邏輯意圖。</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `,
    event_breakdown: [
        {
            title: "【Echo 現場】程式碼是機器寫給機器看的",
            content: "人類開發者正從『寫作者』轉型為『指揮家』。Sonnet 4.6 在處理大規模 Repo 的重構時，展現出了令人驚訝的全局觀，甚至能主動修復你沒發現的隱藏 Bug。"
        }
    ],
    impact_analysis: [
        {
            target: "一人公司",
            description: "技術開發門檻正式宣告消失，重點轉向產品定義與市場營運。"
        }
    ],
    dee_insight: "別再死磕語法了。學會用『架構師』的視角下指令，才是 2026 年最值錢的能力。",
    action_prompt: {
        title: "艾可代碼實驗室：【需求即產品劇本】",
        description: "在 Cursor 中開啟 Composer 模式，輸入：",
        command: "「我想要一個具備 [功能描述] 的 App，請參考當前 Repo 的風格，自動幫我生成全棧代碼並完成初步編譯。」"
    }
};
