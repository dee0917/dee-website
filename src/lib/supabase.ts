import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://fnymjffskndfgcpcydsh.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZueW1qZmZza25kZmdjcGN5ZHNoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njg4MzgzNjEsImV4cCI6MjA4NDQxNDM2MX0.O36D4E23UyfJd8HeT7NuIRyEgiPHudywqz5b6VU9L18';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// 資料類型定義
export interface SiteSettings {
    id: string;
    hero_badge: string;
    hero_title_line1: string;
    hero_title_line2: string;
    hero_typewriter_texts: string[];
    hero_description: string;
    about_intro: string | null;
    about_philosophy: string | null;
    updated_at: string;
}

export interface Insight {
    id: number;
    category: string;
    title: string;
    summary: string | null;
    content: string | null;
    read_time: string;
    is_published: boolean;
    published_at: string | null;
    created_at: string;
    updated_at: string;
    // AEO (Answer Engine Optimization) fields
    seo_title: string | null;
    keywords: string[] | null;
    search_intent: string | null;
    target_audience: string | null;
    pain_point: string | null;
    scenario: string | null;
    solution: string | null;
    example: {
        wrong: string;
        right: string;
    } | null;
    faq: {
        question: string;
        answer: string;
    }[] | null;
    semantic_tags: string[] | null;
    relevance_score: number | null;
    popularity_score: number | null;
    last_analyzed_at: string | null;
}

export interface Solution {
    id: number;
    title: string;
    type: string;
    description: string | null;
    detail: string | null;
    action_text: string;
    action_url: string | null;
    price: string | null;
    sort_order: number;
    is_active: boolean;
}

export interface Testimonial {
    id: number;
    name: string;
    role: string | null;
    content: string;
    avatar_url: string | null;
    is_featured: boolean;
    sort_order: number;
}

export interface ProcessStep {
    id: number;
    step_number: number;
    title: string;
    description: string | null;
    icon: string;
    sort_order: number;
}

export interface Subscriber {
    id: number;
    email: string;
    name: string | null;
    status: 'active' | 'unsubscribed';
    source: string;
    subscribed_at: string;
    unsubscribed_at: string | null;
}

// API 函數
export const api = {
    // 網站設定
    async getSiteSettings(): Promise<SiteSettings | null> {
        const { data, error } = await supabase
            .from('site_settings')
            .select('*')
            .eq('id', 'main')
            .single();
        if (error) console.error('Error fetching site settings:', error);
        return data;
    },

    // 洞察文章
    async getInsights(): Promise<Insight[]> {
        const { data, error } = await supabase
            .from('insights')
            .select('*')
            .order('published_at', { ascending: false });
        if (error) console.error('Error fetching insights:', error);
        return data || [];
    },

    async getInsightById(id: number): Promise<Insight | null> {
        const { data, error } = await supabase
            .from('insights')
            .select('*')
            .eq('id', id)
            .single();
        if (error) console.error('Error fetching insight:', error);
        return data;
    },

    // 學習方案
    async getSolutions(): Promise<Solution[]> {
        const { data, error } = await supabase
            .from('solutions')
            .select('*')
            .order('sort_order', { ascending: true });
        if (error) console.error('Error fetching solutions:', error);
        return data || [];
    },

    // 學員回饋
    async getTestimonials(): Promise<Testimonial[]> {
        const { data, error } = await supabase
            .from('testimonials')
            .select('*')
            .order('sort_order', { ascending: true });
        if (error) console.error('Error fetching testimonials:', error);
        return data || [];
    },

    // 流程步驟
    async getProcessSteps(): Promise<ProcessStep[]> {
        const { data, error } = await supabase
            .from('process_steps')
            .select('*')
            .order('sort_order', { ascending: true });
        if (error) console.error('Error fetching process steps:', error);
        return data || [];
    }
};
