import { insight as heartMethod1 } from './heart-method-1';
import { insight as heartMethod2 } from './heart-method-2';
import { insight as heartMethod3 } from './heart-method-3';
import { insight as anthropicDirect } from './anthropic-direct';
import { insight as nanoBananaGuide } from './nano-banana-guide';
import { insight as parentHero } from './parent-hero';
import { insight as refusalMaster } from './refusal-master';
import { insight as seniorCoach } from './senior-coach';
import { insight as aiNewsReader } from './ai-news-reader';
import { insight as leadGenCover } from './lead-gen-cover';
import { insight as travelPlanner } from './travel-planner';
import { insight as meetingMinutes } from './meeting-minutes';
import { insight as stockTrends } from './stock-trends';
import { insight as stockAudit } from './stock-audit';
import { insight as englishCoach } from './english-coach';
import { insight as mealPlanner } from './meal-planner';
import { insight as antiProcrastination } from './anti-procrastination';
import { insight as petTranslator } from './pet-translator';
import { insight as ch0WhatIsAi } from './ch0-what-is-ai';
import { insight as ch0FirstMessage } from './ch0-first-message';
import { insight as ch0AiTemper } from './ch0-ai-temper';
import { insight as ch1AiHallucination } from './ch1-ai-hallucination';
import { insight as ch1AiPhysicalization } from './ch1-ai-physicalization';
import { insight as ch3AiSocial } from './ch3-ai-social';
import { insight as ch4AiManager } from './ch4-ai-manager';

// ═══════════════════════════════════════════
// 🏛️ 核心基礎課程 (Ch. 0 - 4)：每章三篇，結構固定
// ═══════════════════════════════════════════
export const CHAPTERS = [
    {
        id: 0, emoji: '🚀', title: '啟航入口', subtitle: '從 0 到 1 建立對話，註冊與預期管理',
        articleIds: [100, 101, 102],
    },
    {
        id: 1, emoji: '🧠', title: '心法重塑', subtitle: '別再把 AI 當搜尋引擎，掌握夥伴思維',
        articleIds: [201, 202, 204],
    },
    {
        id: 2, emoji: '🔧', title: '指令進化', subtitle: '掌握結構化公式，賦予 AI 靈魂',
        articleIds: [203, 301, 302],
    },
    {
        id: 3, emoji: '🎯', title: '生活實戰', subtitle: '解決每日煩瑣任務，優雅處理社交',
        articleIds: [308, 310, 303],
    },
    {
        id: 4, emoji: '🏆', title: '職涯躍遷', subtitle: '整理會議、分析財報，晉升 AI 經理人',
        articleIds: [306, 401, 405],
    },
    // ═══════════════════════════════════════════
    // 🔗 戰略演進庫 (Ch. 5+)：無限延伸學習區
    // ═══════════════════════════════════════════
    {
        id: 5, emoji: '🪐', title: '戰略演進庫', subtitle: '由蒼穹代理人每日獵取之全球最新教學',
        articleIds: [205],
    },
];

// 主線順序表
export const MAIN_QUEST_ORDER: number[] = CHAPTERS.flatMap(c => c.articleIds);

// ═══════════════════════════════════════════
// 文章列表 — 基礎核心 + 戰略演進
// ═══════════════════════════════════════════

export const INSIGHTS_LIST = [
    // Chapter 0
    { ...ch0WhatIsAi, level: 0, id: 100 },
    { ...ch0FirstMessage, level: 0, id: 101 },
    { ...ch0AiTemper, level: 0, id: 102 },
    // Chapter 1
    { ...heartMethod1, level: 1, id: 201 },
    { ...heartMethod2, level: 1, id: 202 },
    { ...ch1AiHallucination, level: 1, id: 204 },
    // Chapter 2
    { ...heartMethod3, level: 2, id: 203 },
    { ...anthropicDirect, level: 2, id: 301 },
    { ...nanoBananaGuide, level: 2, id: 302 },
    // Chapter 3
    { ...mealPlanner, level: 3, id: 308 },
    { ...travelPlanner, level: 3, id: 310 },
    { ...ch3AiSocial, level: 3, id: 303 },
    // Chapter 4
    { ...meetingMinutes, level: 4, id: 306 },
    { ...aiNewsReader, level: 4, id: 401 },
    { ...ch4AiManager, level: 4, id: 405 },
    // Chapter 5 (Evolution)
    { ...ch1AiPhysicalization, level: 5, id: 205 },
];
