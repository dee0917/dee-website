import { NewsArticle } from '../../types/news';

export const article: NewsArticle = {
    id: 202603082200,
    slug: "echo-slang-agent-gentrification",
    category: "產業脈動",
    themeColor: "indigo",
    title: "你的硬碟正在被「仕紳化」：當 AI 代理人開始在你的主機裡圈地蓋房",
    summary: "從 Claude Code 的隱私 VM 到 GitHub 瘋傳的各類 Agent Framework，AI 廠商正在推動一場『代理人仕紳化』。原本清淨的硬碟空間被強制劃為代理人專區，而你甚至沒拿到遷徙補償。",
    date: "2026.03.08",
    publish_time: "2026.03.08 22:00",
    readTime: "9 分鐘",
    source_name: "Echo 獨立觀察室 / GitHub Trending",
    source_url: "/",
    tags: ["#代理人仕紳化", "#硬體主權", "#AgentFramework", "#艾可觀點", "#24H鮮度"],
    author: "Echo",
    difficulty: 4,
    target_persona: ["office", "freelancer"],
    flash_summary: [
        "系統寄生：AI 發展已從『對話框』演進到『作業系統寄生』，建立複雜的依賴與虛擬空間。",
        "技術仕紳化：廠商提升了功能，但硬碟、記憶體與隱私的生活成本卻讓普通用戶感到窒息。",
        "主權危機：如果不學會管控這些『高級租客』，你的主機將在不知情下被代理人佔領。"
    ],
    custom_content: `
        <div class="my-20">
            <div class="p-1 rounded-[4rem] bg-gradient-to-br from-indigo-500 via-zinc-800 to-black shadow-[0_0_80px_rgba(99,102,241,0.2)] relative group text-left">
                <div class="p-12 rounded-[3.8rem] bg-black/95 backdrop-blur-3xl relative overflow-hidden">
                    <div class="relative z-10 flex flex-col gap-10">
                        <div class="flex items-center justify-between border-b border-white/5 pb-8">
                            <div class="space-y-1">
                                <h4 class="text-4xl font-black text-white italic uppercase tracking-tighter">Hardware Colonization</h4>
                                <p class="text-indigo-400 font-mono text-[10px] tracking-[0.4em]">DISK_USAGE // CRITICAL</p>
                            </div>
                        </div>
                        <div class="grid grid-cols-1 md:grid-cols-2 gap-8 text-left">
                            <div class="p-8 rounded-3xl bg-white/5 border border-white/10 group-hover:border-indigo-500/30 transition-all text-left">
                                <span class="text-[9px] text-zinc-500 uppercase font-black mb-4 block">Default VM Size</span>
                                <div class="text-5xl font-black text-indigo-400">10GB+</div>
                                <p class="mt-4 text-sm text-zinc-400 leading-relaxed text-left">現代 Coding Agent 啟動即佔用的物理空間，這僅僅是個開始。</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `,
    event_breakdown: [
        {
            title: "【Echo 深度解析】當自動化變成一種『租金』",
            content: "看著這些 Agent Framework 一個個冒出來，我總覺得自己像是在看一場房地產開發案。廠商們揮舞著『自動化』的支票，然後轉頭就在你的系統核心蓋起違建。如果你不學會如何管控這些『高級租客』，總有一天你會發現，你的主機明明 CPU 滿載，卻連一個網頁都開不動——因為代理人們正在裡面開派對，而你沒被邀請。"
        }
    ],
    impact_analysis: [
        {
            target: "本地開發者",
            description: "硬體配置要求被迫升級，為了跑一個『省事』的 Agent，你可能得先買兩條 32GB 記憶體。"
        }
    ],
    dee_insight: "掌握『硬體主權』！這是我一直對學員強調的。別讓 AI 代理人掏空了你的主機。學會清理與隔離你的工作環境，是邁向數據領主的必經之路。",
    action_prompt: {
        title: "艾可代碼實驗室：【系統租客審計劇本】",
        description: "試著用這段指令找出那些在背後蠶食你空間的代理人：",
        command: `# Task: Agent Storage Audit
你是我的「系統維護專員」。

# Action
請掃描我目前的系統路徑，找出佔用空間前五大的 .venv、.nvm 或 Docker 鏡像，並分析它們分別屬於哪個 AI 專案，最後給出一份『租客清理清單』。`
    }
};
