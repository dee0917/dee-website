import { NewsArticle } from '../../types/news';

export const article: NewsArticle = {
    id: 202603021605,
    slug: "real-tech-claude-cowork-vm",
    category: "安全防禦",
    themeColor: "rose",
    title: "誰在偷吃我的硬碟？Claude Code 秘密 VM「租界」引發隱私討論",
    summary: "Anthropic 的 Claude Code 被爆出在執行 Cowork 功能時，會在 macOS 上無預警建立 10GB 的虛擬機映像檔。當 AI 需要更強自主性，使用者的磁碟與隱私邊界正面臨新考驗。",
    date: "2026-03-02",
    publish_time: "2026-03-02 16:05",
    readTime: "4 分鐘",
    source_name: "Agent Security Monitor",
    source_url: "/",
    tags: ["#Anthropic", "#ClaudeCode", "#VM隱私", "#硬體資源稅"],
    author: "Echo",
    trinity_dimension: "生命具現",
    trend_cluster: "開源邊界",
    flash_summary: [
        "Cowork 功能被發現悄悄佔用 10GB 以上磁碟空間。",
        "實質上是在用戶本機建立一個虛擬執行環境 (VM)，且未充分提示。",
        "引發社群對於自主代理 (Autonomous Agents) 與主機安全邊界的激烈辯論。"
    ],
    custom_content: `
        <div class="my-20">
            <!-- 🛡️ Unique Security/VM Alert Module -->
            <div class="p-1 rounded-[3rem] bg-gradient-to-b from-rose-600 via-zinc-800 to-black shadow-[0_0_60px_rgba(244,63,94,0.15)]">
                <div class="p-10 rounded-[2.8rem] bg-black/90 backdrop-blur-3xl">
                    <div class="flex flex-col gap-10">
                        <div class="flex items-center justify-between border-b border-white/10 pb-6">
                            <div class="space-y-1">
                                <h4 class="text-3xl font-black text-white uppercase tracking-tighter">VM Storage Alert</h4>
                                <p class="text-rose-500 font-mono text-[10px] tracking-[0.4em]">CLAUDE_COWORK_ENV // DETECTED</p>
                            </div>
                            <span class="text-4xl">⚠️</span>
                        </div>

                        <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div class="space-y-4">
                                <span class="text-[9px] text-zinc-500 uppercase font-black tracking-widest">Disk Usage</span>
                                <div class="h-2 w-full bg-white/5 rounded-full overflow-hidden">
                                    <div class="h-full bg-rose-500 w-[85%]"></div>
                                </div>
                                <div class="flex justify-between font-mono text-xs">
                                    <span class="text-zinc-400">VM Bundle Size</span>
                                    <span class="text-white font-bold">10.24 GB</span>
                                </div>
                            </div>
                            <div class="bg-rose-500/5 border border-rose-500/20 p-5 rounded-2xl">
                                <p class="text-xs text-rose-200/70 leading-relaxed font-medium">
                                    AI 正在你的硬碟裡「圈地蓋房」。Cowork 模式下的強大自主性是以本地資源作為代價的。
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- 🕵️ Echo's Field Notes - Critical Memo Style -->
            <div class="mt-12 p-10 bg-zinc-950 border border-white/5 rounded-[2.5rem] relative shadow-inner">
                <div class="absolute -top-4 -right-4 px-4 py-1 bg-rose-600 text-white font-black text-[10px] uppercase rotate-2 shadow-lg">Security Memo</div>
                <div class="relative z-10">
                    <h3 class="text-2xl font-black text-white mb-6 tracking-widest uppercase flex items-center gap-3">
                        <span class="w-8 h-8 rounded-full bg-rose-500 flex items-center justify-center text-xs text-white">E</span>
                        Echo's Field Notes
                    </h3>
                    <p class="text-zinc-300 text-lg leading-relaxed font-medium italic border-l-4 border-rose-500/50 pl-6">
                        觀察員隨筆：現在的 AI 廠商似乎有個共同幻覺：只要掛上『AI』兩個字，使用者的資源就是公海。不管是 10GB 的空間還是你的隱私，它們拿走時的表情都像是在為你服務。下次要蓋違建前，好歹先遞張傳單行嗎？
                    </p>
                </div>
            </div>
        </div>
    `,
    event_breakdown: [
        {
            title: "硬體資源稅：AI 時代的新租金",
            content: "這場 Cowork 事件揭示了一個殘酷的未來：當 AI 代理人需要處理更複雜的工程任務時，它們必須在本機環境模擬完整的虛擬主機。這不僅僅是佔用硬碟空間，更是對系統主權的深度滲透。Anthropic 的做法讓開發者感到不安，是因為這標誌著『自主性』與『安全性』之間的衝突正式檯面化。未來，我們可能需要支付額外的硬體成本來支撐 AI 的『居住需求』。"
        }
    ],
    impact_analysis: [
        {
            target: "數位隱私",
            description: "本地 VM 的權限管理若不透明，將成為潛在的資安漏洞，導致本地代碼庫外流。"
        }
    ],
    dee_insight: "雖然 VM 能大幅提升 AI 的執行力，但沒打招呼就塞進來確實過分了。這印證了我們實驗室為什麼要教大家『隱私沙盒』的配置。",
    action_prompt: {
        title: "檢查你的「硬碟租客」",
        description: "想知道你的 AI 是不是也在本機蓋違建？讓它幫你掃描看看：",
        command: "請幫我寫一個 Python 腳本，專門掃描 [我的作業系統，如：macOS] 中常見 AI 開發工具（如 Claude Code, Cursor）建立的臨時虛擬環境與快取資料夾，並列出它們佔用的磁碟空間總和。"
    },
    cta_override: {
        title: "想在 AI 時代奪回主機主權嗎？",
        description: "不要讓你的電腦成為 AI 巨頭的殖民地。進入實驗室，學習如何建立具備主權的代理人執行環境。",
        button_text: "修煉主機安全主權"
    }
};
