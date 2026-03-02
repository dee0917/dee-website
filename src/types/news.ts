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
    
    // 事件解析 (核心：字數需達 500+)
    event_breakdown: {
        title: string;
        content: string;
    }[];
    
    // 利益相關透視 (Why It Matters)
    impact_analysis: {
        target: string; // 允許客製化目標，不侷限於初始三項
        description: string;
    }[];
    
    // Dee 的點評
    dee_insight: string;
    
    // 🚀 實踐指令
    action_prompt: {
        title: string;
        description: string;
        command: string;
        image_url?: string;
    };

    // 🚀 因地制宜的引流 CTA (絕對要求：必須針對新聞內容客製化)
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

    // 🚀 艾可的特派模組 (Echo's Special Modules)
    echo_modules?: {
        type: 'field_notes' | 'comparison' | 'quote' | 'status_check';
        title?: string;
        content?: string;
        items?: { label: string, value: string, icon?: string }[];
        style?: 'purple' | 'indigo' | 'emerald';
        inject_at?: number; // 🚀 新增：指定模組在解析段落中的注入位置
    }[];

    // 🔗 知識圖譜關聯 (Knowledge Graph)
    related_slugs?: string[];
    trend_cluster?: "代理人革命" | "算力霸權" | "數據主權" | "文明重塑" | "感官進化" | "開源邊界";
    trinity_dimension?: "算力物權" | "生命具現" | "社會契約";
}
