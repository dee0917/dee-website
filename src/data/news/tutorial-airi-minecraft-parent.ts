import { NewsArticle } from '../../types/news';

export const article: NewsArticle = {
    id: 202603070800,
    slug: "tutorial-airi-minecraft-parent",
    category: "數位生命",
    themeColor: "emerald",
    title: "給「全職家長」的 AI 陪伴指南：當 Minecraft 遇上 Waifu AI",
    summary: "moeru-ai/airi 在 GitHub 爆火，這不是一般的聊天機器人，這是具備靈魂的 Minecraft 玩伴。家長現在可以主動為孩子建立一個安全、私密且具備正向引導能力的數位陪伴環境。",
    date: "2026.03.07",
    publish_time: "2026.03.07 08:00",
    readTime: "8 分鐘",
    source_name: "GitHub / moeru-ai",
    source_url: "https://github.com/moeru-ai/airi",
    tags: ["#家長必看", "#Minecraft", "#數位生命", "#本地部署", "#安全陪伴"],
    author: "Echo",
    flash_summary: [
        "airi 支持本地部署：數據主權回歸家長，杜絕外部演算法監控。",
        "遊戲深度整合：可作為 Minecraft/Factorio 伴侶，實時與孩子共同建築、冒險。",
        "人格自定義：支持家長微調 AI 性格，確保對話內容符合家庭價值觀。",
        "隱私護城河：語音識別與生成均可在本地完成，無需連接外部伺服器。"
    ],
    custom_content: `
        <div class="my-16 space-y-12">
            <!-- 🎮 Unique Game-style Logic Map -->
            <div class="p-10 rounded-[4rem] bg-emerald-900/20 border border-emerald-500/30 relative overflow-hidden shadow-2xl">
                <div class="flex flex-col md:flex-row items-center justify-around gap-8 text-center">
                    <div class="space-y-2 text-center">
                        <div class="w-20 h-20 bg-emerald-500/20 rounded-2xl flex items-center justify-center mx-auto text-4xl shadow-inner">👨‍👩‍👧‍👦</div>
                        <span class="block text-xs font-black text-emerald-400 uppercase tracking-widest text-center">Parent Control</span>
                    </div>
                    <div class="w-12 h-0.5 bg-zinc-800 hidden md:block"></div>
                    <div class="space-y-2 text-center">
                        <div class="w-24 h-24 bg-white/5 rounded-[2rem] border border-white/10 flex items-center justify-center mx-auto text-5xl shadow-2xl animate-bounce">🤖</div>
                        <span class="block text-sm font-black text-white uppercase tracking-tighter text-center">Airi Agent</span>
                    </div>
                    <div class="w-12 h-0.5 bg-zinc-800 hidden md:block"></div>
                    <div class="space-y-2 text-center">
                        <div class="w-20 h-20 bg-emerald-500/20 rounded-2xl flex items-center justify-center mx-auto text-4xl shadow-inner">🏗️</div>
                        <span class="block text-xs font-black text-emerald-400 uppercase tracking-widest text-center">Minecraft World</span>
                    </div>
                </div>
            </div>
        </div>
    `,
    event_breakdown: [
        {
            title: "數位生命的啟蒙者：為什麼家長需要主動「部署」陪伴？",
            content: "與其讓孩子在未知的伺服器中面對複雜且不可控的陌生人社交，部署一個由家長親自設定、具備正向價值觀的 airi 代理人是當前最優的數位養育路徑。家長從防守方的『網路警察』變成了建設方的『數位環境總工程師』。"
        }
    ],
    impact_analysis: [
        {
            target: "親子關係",
            description: "家長參與 AI 的人格設定，能成為親子間共同的話題與情感橋樑。"
        }
    ],
    dee_insight: "AI 陪伴不再是科幻，家長應主動掌握數位生命的引導權，而非將孩子留給未知的演算法推薦。",
    action_prompt: {
        title: "部署 airi 指令寶箱",
        description: "克隆專案並使用 Docker 快速啟動本地環境：",
        command: "git clone https://github.com/moeru-ai/airi && cd airi && docker-compose up --build"
    }
};
