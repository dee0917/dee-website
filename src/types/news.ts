export interface NewsArticle {
    id: number;
    slug: string;
    category: "趨勢情報" | "安全隱私" | "職場發展";
    themeColor: "blue" | "rose" | "emerald" | "violet" | "amber";
    title: string;
    summary: string;
    date: string;
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

    // 🚀 因地制宜的引流 CTA (New)
    cta_override?: {
        title: string;
        description: string;
        button_text: string;
    };
}
