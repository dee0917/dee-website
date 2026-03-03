import { NewsArticle } from '../../types/news';

export const article: NewsArticle = {
    id: 202603031710,
    slug: "real-tech-superset-agent-ide",
    category: "實戰應用",
    themeColor: "emerald",
    title: "小白也能指揮「AI 軍隊」：Superset 讓你的電腦變成蜂群指揮部",
    summary: "GitHub 熱門項目 Superset 重新定義了 AI IDE。它不再只是協助寫代碼，而是讓你同時調度一群專業代理人協作，從文檔解析到測試部署實現全自動一條龍。",
    date: "2026-03-03",
    publish_time: "2026-03-03 17:10",
    readTime: "4 分鐘",
    source_name: "GitHub / Superset",
    source_url: "https://github.com/superset-ai/superset",
    tags: ["#Superset", "#AI軍隊", "#代理人編排", "#AgentIDE"],
    author: "Echo",
    trinity_dimension: "生命具現",
    trend_cluster: "代理人革命",
    flash_summary: [
        "代理人 IDE 化：將對話框進化為具備『指揮官視角』的操作系統。",
        "蜂群協作 (Swarm)：同時調度 Claude Code、Codex 與 DeepSeek 子代理分工。",
        "安全執行：整合 OpenSandbox，確保 AI 軍隊在隔離環境中安全作業。"
    ],
    custom_content: `
        <div class="my-16">
            <div class="p-1 rounded-[4rem] bg-gradient-to-r from-emerald-500 via-teal-800 to-black shadow-[0_0_80px_rgba(16,185,129,0.15)] text-left">
                <div class="p-12 rounded-[3.8rem] bg-black/95 backdrop-blur-3xl text-left">
                    <div class="flex flex-col md:flex-row items-center gap-12 text-left">
                        <div class="relative">
                            <div class="w-32 h-32 rounded-full border-2 border-emerald-500/30 flex items-center justify-center">
                                <span class="text-6xl text-left">⚔️</span>
                            </div>
                            <div class="absolute -top-2 -right-2 px-3 py-1 bg-emerald-600 text-white font-black text-[9px] rounded-full uppercase text-left">Fleet Active</div>
                        </div>
                        <div class="flex-1 space-y-6 text-left">
                            <h4 class="text-4xl font-black text-white italic uppercase tracking-tighter text-left">Agent Command Hub</h4>
                            <div class="grid grid-cols-2 gap-4 text-left">
                                <div class="p-4 rounded-xl bg-white/5 border border-white/5 text-left">
                                    <span class="text-[9px] text-zinc-500 uppercase font-black text-left">Swarm Scale</span>
                                    <div class="text-2xl font-bold text-emerald-400 text-left">10+ Agents</div>
                                </div>
                                <div class="p-4 rounded-xl bg-white/5 border border-white/10 text-left">
                                    <span class="text-[9px] text-zinc-500 uppercase font-black text-left">Sync Latency</span>
                                    <div class="text-2xl font-bold text-white text-left">Sub-100ms</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `,
    event_breakdown: [
        {
            title: "從「你會用哪個工具」到「你能管多少個工具」",
            content: "Superset 的崛起標誌著 AI 工具從『單兵作戰』邁向『集團軍』時代。"
        }
    ],
    impact_analysis: [
        {
            target: "職場技能",
            description: "具備系統架構洞察力的『AI 牧羊人』成為未來高薪標配。"
        }
    ],
    dee_insight: "當你可以一個人營運一支 AI 代理商時，所有的傳統外包模式都將面臨解體。",
    action_prompt: {
        title: "模擬「蜂群作戰」指令",
        description: "試著挑戰你的 AI 助手進行一次團隊分工模擬：",
        command: "我需要建立一個自動化新聞分發系統。請先幫我拆解出 3 個職責互補的專業代理人。"
    }
};
