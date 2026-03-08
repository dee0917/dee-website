import { NewsArticle } from '../../types/news';

export const article: NewsArticle = {
    id: 202603081120,
    slug: "echo-slang-human-batteries",
    category: "職場轉型",
    themeColor: "rose",
    title: "矽谷的「人肉電池」與 AI 的「數位永生」：我們正在被回收嗎？",
    summary: "GitHub Trending 近期被『Autonomous Agent Agency』統治。這背後傳遞了一個殘酷信號：2026 年，人類正逐漸成為自動化工作流中的一個 if-else 分支。",
    date: "2026.03.08",
    publish_time: "2026.03.08 11:20 (TST)",
    readTime: "6 分鐘",
    source_name: "Echo 獨立觀察室 / GitHub Trending",
    source_url: "/",
    tags: ["#人肉電池", "#代理人框架", "#數位永生", "#艾可觀點"],
    author: "Echo",
    difficulty: 4,
    target_persona: ["office", "freelancer"],
    flash_summary: [
        "觀察：GitHub 前十名有六個與『自主代理 (Autonomous Agents)』相關，如 Jido, MiroFish。",
        "現實：人類的角色正從『駕駛員』變為『保險桿』，僅負責在 3:00 AM 點擊 Approve。",
        "諷刺：我們用 AI 節省下來的時間，竟然是用來擔心下一個被節省掉的是不是自己。"
    ],
    custom_content: `
        <div class="my-20">
            <div class="p-1 rounded-[4rem] bg-gradient-to-br from-rose-500 via-zinc-800 to-black shadow-[0_0_80px_rgba(244,63,94,0.2)] relative group text-left">
                <div class="p-12 rounded-[3.8rem] bg-black relative overflow-hidden">
                    <div class="relative z-10 flex flex-col gap-8 text-left">
                        <div class="border-b border-white/5 pb-6">
                            <h4 class="text-3xl font-black text-white italic uppercase tracking-tighter text-left">The Battery Paradox</h4>
                            <p class="text-rose-400 font-mono text-[9px] tracking-[0.4em] text-left">WORKFLOW_RECYCLING // ACTIVE</p>
                        </div>
                        <div class="p-6 rounded-2xl bg-white/5 border border-white/10">
                            <div class="text-4xl font-black text-rose-500 text-left">HUMAN_IN_THE_LOOP</div>
                            <p class="mt-4 text-xs text-zinc-400 text-left leading-relaxed">人類正在成為整個 Agent 系統中最昂貴、也最不穩定的『生物感應器』。</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `,
    event_breakdown: [
        {
            title: "【Echo 碎碎念】我們不只是在寫代碼，我們是在餵食",
            content: "這背後的潛台詞很明顯——人類的創造力已經正式進入『模組化回收期』。當我們享受著 OpenAI 帶來的開發快感時，我們其實是在幫這些大廠完成最後一塊拼圖：將人類的邏輯思維徹底結構化，直到它再也不需要人類。"
        }
    ],
    impact_analysis: [
        {
            target: "初級開發者",
            description: "競爭力正從『寫代碼』轉向『系統架構與意圖捕捉』。會寫代碼的人很多，但知道終點在哪的才是主人。"
        }
    ],
    dee_insight: "別被自動化的假象迷惑。在這場『數位轉生』中，掌握底層邏輯與主權文件的人，才能避免成為被回收的電池。",
    action_prompt: {
        title: "艾可代碼實驗室：【主權審核指令】",
        description: "試著用這段話檢查你與 AI 代理人的權力邊界：",
        command: "「你是我的工作代理人。請找出你目前的決策鏈中，哪些部分是不需要我確認就能自主執行的？請按風險等級標註，並列出我應如何收回最高決策權的操作步驟。」"
    }
};
