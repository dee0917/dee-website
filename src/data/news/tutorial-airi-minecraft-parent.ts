import { NewsArticle } from '../../types/news';

export const article: NewsArticle = {
    id: 202603020503,
    slug: "tutorial-airi-minecraft-parent",
    category: "腦洞大開",
    themeColor: "emerald",
    title: "【新教學】給「全職家長」的 AI 陪伴指南：當 Minecraft 遇上 Waifu AI",
    summary: "moeru-ai/airi 在 GitHub 爆火，這不是一般的聊天機器人，這是具備靈魂的 Minecraft 玩伴。",
    date: "2026-03-02",
    publish_time: "2026-03-02 05:00",
    readTime: "5 min",
    source_name: "GitHub",
    source_url: "https://github.com/moeru-ai/airi",
    tags: ["Parenting", "Minecraft", "Airi", "DigitalLife"],
    flash_summary: [
        "airi 支持本地部署，數據隱私由家長完全掌握。",
        "可作為 Minecraft/Factorio 遊戲伴侶，與孩子語音互動。",
        "支持自定義性格與背景，提供安全的數位社交環境。"
    ],
    event_breakdown: [
        {
            title: "數位生命的啟蒙者",
            content: "家長可以將 airi 部署在本地伺服器，邀請其進入孩子的私有遊戲世界，充當安全的數位玩伴。"
        }
    ],
    impact_analysis: [
        {
            target: "你的隱私",
            description: "本地部署確保孩子的語音與對話數據不會流向外部雲端供應商。"
        }
    ],
    dee_insight: "AI 陪伴不再是科幻，家長應主動掌握數位生命的引導權，而非將孩子留給未知的演算法推薦。",
    action_prompt: {
        title: "部署 airi 指令",
        description: "克隆專案並使用 Docker 快速啟動本地環境。",
        command: "git clone https://github.com/moeru-ai/airi && cd airi && docker-compose up"
    },
    trend_cluster: "文明重塑",
    trinity_dimension: "社會契約"
};
