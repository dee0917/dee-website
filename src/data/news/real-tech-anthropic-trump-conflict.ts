import { NewsArticle } from '../../types/news';

export const article: NewsArticle = {
    id: 202603021310,
    slug: "real-tech-anthropic-trump-conflict",
    category: "政策法規",
    themeColor: "rose",
    title: "川普剛禁 Claude，美軍就拿它炸了伊朗？矽谷的「兵變」與依賴",
    summary: "川普政府將 Anthropic 列入風險名單，美軍卻被爆出依賴 Claude 進行情報評估。AI 企業的中立性正在消失，技術與國家安全深度綁定。",
    date: "2026-03-02",
    publish_time: "2026-03-02 13:10",
    readTime: "4 分鐘",
    source_name: "Tech News",
    source_url: "https://example.com",
    tags: ["#Anthropic", "#Claude", "#川普", "#國家安全"],
    flash_summary: [
        "川普將 Anthropic 列入供應鏈風險名單。",
        "美軍在空襲行動中被爆依賴 Claude 進行情報識別。",
        "Anthropic 準備對政府提告，Sam Altman 則與國防部簽署新約。"
    ],
    event_breakdown: [
        {
            title: "一邊封殺一邊依賴",
            content: "這場矽谷甄嬛傳顯示，AI 基礎設施已成為國家級武器。如果你的工具涉及敏感數據，現在必須考慮非美/非中的第三方架構備案。"
        }
    ],
    impact_analysis: [
        {
            target: "政策風險",
            description: "企業的中立性正式終結，工具合規性審計將迎來爆發。"
        }
    ],
    dee_insight: "AI 競賽已變成數位甄嬛傳，開發者必須學會政策避險與本地化部署。",
    action_prompt: {
        title: "分析政策影響",
        description: "與 AI 探討如何應對突如其來的封殺風險：",
        command: "分析如果我目前使用的雲端 AI 工具突然被封殺，我的業務該如何快速遷移至本地模型？請列出 3 個備案。"
    },
    trend_cluster: "開源邊界",
    trinity_dimension: "生命具現"
};
