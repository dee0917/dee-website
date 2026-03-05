import { User, Briefcase, Utensils, Home as HomeIcon, Baby, Quote, Layers } from 'lucide-react';

export interface NewsArticle {
    id: number;
    slug: string;
    category: string;
    themeColor: string;
    title: string;
    summary: string;
    date: string;
    publish_time: string;
    readTime: string;
    source_name: string;
    source_url: string;
    tags: string[];
    author: string;
    trinity_dimension?: string;
    trend_cluster?: string;
    flash_summary: string[];
    custom_content?: string;
    event_breakdown: {
        title: string;
        content: string;
    }[];
    impact_analysis: {
        target: string;
        description: string;
    }[];
    dee_insight: string;
    action_prompt: {
        title: string;
        description: string;
        command: string;
        image_url?: string;
    };
    difficulty?: 1 | 2 | 3 | 4 | 5; 
    target_persona?: string[];
    cta_override?: string | { title: string; description: string; button_text: string; }; // 修正 TS2322
    related_slugs?: string[];
    echo_modules?: any[]; // 修正 TS2353
}
