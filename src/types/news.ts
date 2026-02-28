export interface NewsArticle {
    id: number;
    slug: string;
    category: "吃瓜特報" | "腦洞大開" | "懶人神器" | "產業脈動" | "政策法規" | "實戰應用" | "安全防禦" | "職場轉型";
    themeColor: "blue" | "rose" | "emerald" | "violet" | "amber" | "indigo" | "teal" | "orange";
    title: string;
    summary: string;
    date: string;
    publish_time: string; // TST 格式: YYYY-MM-DD HH:mm
    readTime: string;
    source_name: string;
    source_url: string;
    tags: string[];
    
    // 關鍵情報
    flash_summary: string[];
    
    // 事件解析
    event_breakdown: {
        title: string;
        content: string;
    }[];
    
    // 利益相關透視 (Why It Matters)
    impact_analysis: {
        target: "你的工作" | "你的荷包" | "你的隱私";
        description: string;
    }[];
    
    // Dee 的點評
    dee_insight: string;
    
    // 實踐指令
    action_prompt: {
        title: string;
        description: string;
        command: string;
    };

    // 🚀 因地制宜的引流 CTA
    cta_override?: {
        title: string;
        description: string;
        button_text: string;
    };

    // 🚀 視覺化衝擊指標
    impact_scores?: {
        work_threat: number;
        wealth_opportunity: number;
        privacy_risk: number;
    };

    // 🚀 記者設定
    author?: "Echo";
    
    // 🚀 艾可的自由發揮空間 (自由 HTML 內容)
    custom_content?: string;
}
